<template>
  <td :style="'min-width: ' + tdWidth">
    <div
      v-show="canEdit"
      class="row no-wrap items-center justify-space-between q-col-gutter-x-sm"
    >
      <div
        :class="`${canEdit?'col':'col-auto'}`"
        style="min-width: 90px;"
      >
        <safa-select
          @update:item="updateSelectedGroup"
          :ci-name="ciName"
          @input="updateGroup"
          :value="groupValue"
          :m="canEdit?'e':'r'"
        ></safa-select>
      </div>
      <div
        class="col-auto"
        v-if="!canEdit"
      >
        <q-icon
          name="arrow_left"
          size="20px"
          color="primary"
        />
      </div>
      <div class="col">
        <safa-select
          @update:item="updateSelectedType"
          source-type="local"
          :options="dependItems"
          :value="typeValue"
          @input="updateType"
          :m="canEdit?'e':'r'"
        ></safa-select>
      </div>
    </div>
    <div v-show="!canEdit">
      <div class="flex q-gutter-x-sm items-center no-wrap">
        <div
          style="min-width: 38%;"
          class="ellipsis"
        >
          {{comboGroupTitle}}
        </div>
        <div>
          <q-icon
            name="arrow_left"
            size="20px"
            color="primary"
          />
        </div>
        <div class="ellipsis">
          {{ comboTypeTitle }}
        </div>
      </div>
    </div>
  </td>
</template>
<script>
const groupField = "CI_WarrantOrderResult"
const typeField = "CI_WarrantOrderResultSub"
const serviceMethod = "GetCI_UsingType_FromCI_UsingGroup"
const componentName = "WarrantOrderTemplate"
const responseKey = "CI_UsingType_FromCI_UsingGroup"
const paramName = "pCI_UsingGroup"

export default {
  name: componentName,
  data () {
    return {
      groupValue: "",
      typeValue: "",
      dependItems: [],
      ciName: groupField,
      comboGroupTitle: "",
      comboTypeTitle: ""
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
    tdWidth () {
      return this.column.width || "300px"
    },
    canEdit () {
      return (
        this.inEdit &&
        (typeof this.editable === "undefined" || this.editable) &&
        this.mode === "e"
      )
    },
    ciName () {
      if (!this.column.options) return ciName
      return this.column.options.from && this.column.options.from.ciName
    }
  },
  methods: {
    updateSelectedGroup (item) {
      this.comboGroupTitle = (item && item.Title) || "..."
    },
    updateSelectedType (item) {
      this.comboTypeTitle = (item && item.Title) || "..."
    },
    updateGroup (value) {
      if (!Number.isNaN(Number(value))) value = Number(value)

      const payload = {
        field: groupField,
        value: value,
        dataItem: this.dataItem
      }

      this.$emit("change", payload)
    },
    updateType (value) {
      if (!Number.isNaN(Number(value))) value = Number(value)

      const payload = {
        field: typeField,
        value: value,
        dataItem: this.dataItem
      }

      this.$emit("change", payload)
    },
    fetchUsingType () {
      if (typeof this.groupValue === "undefined") return
      this.$services.equipmentCI
        .getUsingTypeFromUsingGroup(serviceMethod, {
          [paramName]: this.groupValue
        })
        .then(({ data }) => {
          if (data) {
            this.dependItems = data[responseKey] || []
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
        this.typeValue = this.dataItem[typeField]
        this.groupValue = this.dataItem[groupField]
      },
      deep: true
    },
    groupValue () {
      this.fetchUsingType()
    }
  },
  mounted () {
    this.groupValue = this.dataItem[groupField]
    this.typeValue = this.dataItem[typeField]
    // this.fetchUsingType()
  }
}
</script>
