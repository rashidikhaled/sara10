<template>
  <!--  <td :style="'min-width: ' + tdWidth">
      <div v-show="canEdit" class="row no-wrap items-center justify-space-between q-col-gutter-x-sm">
        <div :class="`${canEdit?'col':'col-auto'}`" style="min-width: 90px;">
          <safa-select @update:item="updateSelectedGroup" :ci-name="ciName" @input="updateGroup" :value="groupValue" :m="canEdit?'e':'r'"></safa-select>
        </div>
        <div class="col-auto" v-if="!canEdit">
          <q-icon name="arrow_left" size="20px" color="primary" />
        </div>
        <div class="col">
          <safa-select @update:item="updateSelectedType" source-type="local" :options="dependItems" :value="typeValue" @input="updateType" :m="canEdit?'e':'r'"></safa-select>
        </div>
      </div>
      <div v-show="!canEdit">
        <div class="flex q-gutter-x-sm items-center no-wrap">
          <div style="min-width: 38%;" class="ellipsis">
            {{comboGroupTitle}}
          </div>
          <div>
            <q-icon name="arrow_left" size="20px" color="primary" />
          </div>
          <div class="ellipsis">
            {{ comboTypeTitle }}
          </div>
        </div>
      </div>
    </td>-->
  <div class="grid-cell-template q-pa-none"
       :data-value="`${comboGroupTitle} (${groupValue}) - ${comboTypeTitle} (${typeValue})`"
       :class="`cell-${hasFocus?'has':'unset'}-focus`" v-if="canEdit">
    <div class="row full-height items-center" style="flex-grow: 1">
      <div class="col">
        <safa-combo2 :ci-name="ciName" class="grid-combo" v-model="groupValue"/>
      </div>
      <div class="col-auto">
        <q-separator vertical style="height: 12px"/>
      </div>
      <div class="col">
        <safa-combo2 source-type="local" :options="dependItems" class="grid-combo" v-model="typeValue"/>
      </div>
    </div>
  </div>
  <div v-else class="row full-height ellipsis items-center">
    <span class="grid-label q-px-xs ellipsis col text-no-wrap">{{ comboGroupTitle }}</span>
    <div class="col-auto">
      <q-separator vertical style="height: 12px"/>
    </div>
    <span class="grid-label q-px-xs ellipsis col text-no-wrap">{{ comboTypeTitle }}</span>
  </div>
</template>
<script>
const groupField = 'CI_UsingGroup'
// const typeField = 'CI_UsingType'
const serviceMethod = 'GetCI_UsingType_FromCI_UsingGroup'
const componentName = 'UsingGroupTemplate2'
const responseKey = 'CI_UsingType_FromCI_UsingGroup'
const paramName = 'pCI_UsingGroup'

export default {
  name: componentName,
  data () {
    return {
      groupValue: '',
      typeValue: '',
      dependItems: [],
      ciName: groupField,
      comboGroupTitle: '',
      comboTypeTitle: '',
      hasFocus: false,
      hasChanged: false
    }
  },
  inheritAttrs: false,
  props: {
    field: String,
    dataItem: Object,
    inEdit: Boolean,
    editable: Boolean,
    isCI: Boolean,
    domain: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    column: Object,
    ciAutoBind: Boolean,
    editor: String,
    mode: String
  },
  computed: {
    cacheKey () {
      return `cache_${groupField.toLowerCase()}_${paramName.toLowerCase()}_${responseKey.toLowerCase()}_${this.groupValue}`
    },
    tdWidth () {
      return this.column.width || '300px'
    },
    canEdit () {
      return this.inEdit && (typeof this.editable === 'undefined' || this.editable) && this.mode === 'e'
    },
    domainName () {
      return this.domain || window.getKaisOpt('global_domainName', '')
    }
  },
  methods: {
    insertCache (value) {
      if (!window.usingGroupCache) {
        window.usingGroupCache = {}
      }
      window.usingGroupCache[this.cacheKey] = value
      this.dependItems = value || []
      this.fetchTypeTitle()
    },
    restoreCache () {
      if (!window.usingGroupCache) return null
      const exist = window.usingGroupCache[this.cacheKey]
      if (!exist) return null
      this.dependItems = exist || []
      this.fetchTypeTitle()
      return true
    },
    fetchGroupTitle () {
      if (this.groupValue === undefined) return ''
      this.$ci.getName({ value: this.groupValue, domain: this.domainName, name: this.ciName }).then((title) => {
        this.comboGroupTitle = title
      })
    },
    fetchTypeTitle () {
      const typeFound = this.dependItems.find(item => item.ID === this.typeValue)
      this.comboTypeTitle = typeFound ? typeFound['Title'] : ''
    },
    fetchUsingType () {
      if (typeof this.groupValue === 'undefined') return
      if (this.restoreCache()) {
        return
      }
      this.$services.equipmentCI
        .getUsingTypeFromUsingGroup(serviceMethod, {
          [paramName]: this.groupValue
        })
        .then(({ data }) => {
          if (data) {
            this.insertCache(data[responseKey])
          }
          /* let cleanResponse = this.getResponse(data)
          if (!cleanResponse.hasError) {
            this.dependItems = cleanResponse.data[this.responseKey] || []
          } */
        })
    }
  },
  watch: {
    dataItem: {
      handler () {
        this.hasChanged = false
        this.typeValue = this.dataItem[this.column.options.to.field]
        this.groupValue = this.dataItem[this.column.options.from.field]
        this.$nextTick(() => {
          this.hasChanged = true
        })
      },
      deep: true
    },
    groupValue () {
      this.fetchGroupTitle()
      this.fetchUsingType()
      if (this.hasChanged) {
        this.typeValue = null
      }
    },
    typeValue () {
      this.fetchTypeTitle()
      if (this.hasChanged) {
        this.$emit('change', {
          field: [this.column.options.from.field, this.column.options.to.field],
          value: [this.groupValue, this.typeValue],
          dataItem: this.dataItem
        })
      }
    }
  },
  created () {
    this.hasChanged = false
    this.groupValue = this.dataItem[this.column.options.from.field]
    this.typeValue = this.dataItem[this.column.options.to.field]
    this.$nextTick(() => {
      this.hasChanged = true
    })
  }
}
</script>
