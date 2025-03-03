<template>
  <div class="ag-combo-editor row no-wrap fit">
    <div class="col-auto input-numeric" v-if="useInput">
      <input v-model="value"
             ref="eInput"
             class="full-height q-px-xs"
             onclick="this.select()"
             :size="10"
             @wheel.prevent
             style="max-width: 40px;"/>
    </div>
    <div class="col-auto flex items-center" style="width: 1px;" v-if="useInput">
      <q-separator style="height: 16px; margin: auto" vertical/>
    </div>
    <div class="col">
      <select v-model="comboValue" class="fit q-px-xs" :ref="!useInput?'eInput':undefined" @change="comboValueChanged">
        <option v-for="(item,i) in filteredDatasource" :key="i" :value="item[idField]">{{ item[titleField] }}</option>
      </select>
    </div>
    <div v-if="loading" style="background-color: rgba(255,255,255,.8); backdrop-filter: blur(1px)" class="absolute-full flex items-center justify-center">
      <q-spinner size="xs" color="grey"/>
    </div>
  </div>
</template>

<script>
import { uid } from 'quasar'
import Vue from 'vue'

export default {
  name: 'ADPGridTemplate',
  data () {
    return {
      // #region core_data
      value: null,
      comboValue: null,
      datasource: [],
      idField: 'ID',
      titleField: 'Title',
      useInput: true,
      searchTerm: '',
      comId: uid(),
      // #endregion
      loading: true,

      initValue: null
    }
  },
  computed: {
    filteredDatasource () {
      return this.initValue === this.value ? this.datasource : this.datasource.filter(e => e[this.titleField].includes(this.value)) || []
    },
    cacheKey () {
      if (!this.params.colDef.params) return ''
      const { groupField, serviceUrl, responseKey, paramName, serviceKey } = this.params.colDef.params
      const key = [groupField, serviceUrl, responseKey, paramName, this.groupValue, serviceKey].join('__')
      return key
    },
    groupField () {
      return (this.params.colDef.params && this.params.colDef.params.groupField) || 'CI_UsingGroup'
    },
    groupValue () {
      return this.params.data[this.groupField]
    }
  },
  methods: {
    // #region core_methods
    getValue () {
      return isNaN(this.comboValue) ? this.initValue : this.comboValue
    },
    comboValueChanged () {
      this.value = this.comboValue
      this.initValue = this.value
    },
    normalizeList (list) {
      list = list || []
      const first = list[0]
      if (!first) return list
      if (typeof first === 'string') {
        this.useInput = false
        list = list.map(x => ({
          Title: (`${x || ''}`).convertToPersian().trim(),
          Label: this.buildTitle(x),
          ID: (`${x || ''}`).convertToPersian().trim()
        }))
      } else if (typeof first === 'object') {
        list = list.map(x => ({
          Title: (`${x[this.titleField] || ''}`).convertToPersian().trim() + ` [${x[this.idField]}]`,
          Label: `${x[this.titleField]}`,
          ID: !isNaN(x[this.idField]) ? Number(x[this.idField]) : x[this.idField]
        }))
      }

      const sortedList = this.sortList(list)
      return sortedList
    },
    getItemTitle (item) {
      if (typeof item === 'object') return item[this.titleField]
      return item
    },
    getItemID (item) {
      if (typeof item === 'object') return item[this.idField]
      return item
    },
    selectItem (item) {
      this.value = this.getItemID(item)
      this.searchTerm = ''
    },
    onEnterKey () {
      this.$nextTick(() => {
        this.params.api.tabToNextCell()
      })
    },
    isSelected (item) {
      return this.value === this.getItemID(item)
    },
    sortList (list) {
      if (typeof this.params.comboSort === 'undefined') {
        return list.sort((a, b) => {
          if (!a[this.titleField]) return 1
          if (!b[this.titleField]) return -1
          const nameA = a[this.titleField].toUpperCase() // ignore upper and lowercase
          const nameB = b[this.titleField].toUpperCase() // ignore upper and lowercase

          if (nameB === 'نامشخص' || nameA === 'نامشخص') return 1

          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }

          // names must be equal
          return 0
        })
      }
      let sortFunc
      if (typeof this.params.comboSort === 'function') {
        sortFunc = this.params.comboSort
      } else {
        sortFunc = (a, b) => {
          const isAsc = this.params.comboSort.toLowerCase().indexOf('asc') > -1
          if (!a[this.titleField]) return 1
          if (!b[this.titleField]) return -1
          const nameA = a[this.titleField].toUpperCase() // ignore upper and lowercase
          const nameB = b[this.titleField].toUpperCase() // ignore upper and lowercase

          if (nameB === 'نامشخص' || nameA === 'نامشخص') return 1

          if (nameA < nameB) {
            return isAsc ? -1 : 1
          }
          if (nameA > nameB) {
            return isAsc ? 1 : -1
          }

          // names must be equal
          return 0
        }
      }
      return list.sort(sortFunc)
    }
    // #endregion
  },
  mounted () {
    // #region core_mounted
    this.comboValue = this.value = this.params.value
    this.initValue = this.params.value

    Vue.nextTick(() => {
      this.initialized = true
      if (this.$refs.eInput) {
        this.$refs.eInput.focus()
        this.$refs.eInput.select()
      }
    })
    // #endregion
  },
  created () {
    // #region core_created
    // useInput
    this.useInput = this.params.hasOwnProperty('useInput') ? this.params.useInput : (window.getKaisOpt('datatable_useInput', true))

    // (id,title) fields
    if (this.params.idField) this.idField = this.params.idField
    if (this.params.titleField) this.titleField = this.params.titleField
    // #endregion

    if (this.cacheKey) {
      const self = this
      self.loading = true
      window.$adp.get(this.cacheKey, (list) => {
        self.datasource = self.normalizeList(list)
        self.loading = false
      })
    }
  },
  watch: {
    value (value) {
      const foundedTitle = this.filteredDatasource.find(
        (e) => e['Label'] === value
      )
      const foundedID = this.datasource.find(e => e[this.idField] === Number(value))

      if (foundedTitle) {
        this.comboValue = foundedTitle[this.idField]
      } else if (this.initValue !== value && this.filteredDatasource.length === 1) {
        this.comboValue = this.filteredDatasource[0][this.idField]
      } else if (foundedID) {
        this.comboValue = Number(value)
      }
    }
  }
}
</script>
