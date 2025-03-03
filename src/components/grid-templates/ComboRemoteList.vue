<template>
  <td v-if="canEdit" :style="'min-width: ' + tdWidth">
    <select
      :value="selectedValue"
      @input="setValue"
      style="width: 100%;"
      class="grid-combo"
    >
      <option
        :value="item[options.fieldKey]"
        :selected="item[options.fieldKey] === selectedValue"
        v-for="item in datasource"
        :key="item[options.fieldKey]"
      >{{ item[options.fieldText] }}
      </option
      >
    </select>
  </td>
  <td v-else :style="'min-width: ' + tdWidth">
    {{ selectedText }}
  </td>
</template>
<script>
import ResponseParser from 'src/utils/responseParser'

export default {
  data () {
    return {
      options: {},
      selectedValue: null,
      selectedText: '',
      datasource: []
    }
  },
  mounted () {
    this.createdatasource()
    this.bindComboText()
  },
  beforeMount () {
    this.options = this.column.options || {
      serviceUrl: '',
      responseKey: '',
      fieldKey: 'ID',
      fieldText: 'Title'
    }
  },
  inheritAttrs: false,
  props: {
    field: String,
    dataItem: Object,
    inEdit: Boolean,
    editable: Boolean,
    domain: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    column: Object,
    editor: String,
    mode: String
  },
  computed: {
    tdWidth () {
      return this.column.width || '160px'
    },
    canEdit () {
      return (
        this.inEdit &&
        (typeof this.editable === 'undefined' || this.editable) &&
        this.mode === 'e'
      )
    }
  },
  methods: {
    setValue (ev) {
      let value = ev.target.value
      this.toValue = value
      if (!Number.isNaN(Number(value))) value = Number(value)

      const payload = {
        field: this.options.from.field,
        value: value,
        dataItem: this.dataItem,
        event: ev
      }

      this.$emit('change', payload)
    },
    bindComboText () {
      this.selectedText = this.selectedValue =
        (this.dataItem && this.dataItem[this.field]) || ''

      if (this.selectedValue && this.datasource) {
        const selectedItem = this.datasource.filter(
          x => x[this.options.fieldKey] === this.selectedValue
        )[0]
        if (selectedItem) {
          this.selectedText = selectedItem[this.options.fieldText]
        }
      }
    },
    async createdatasource () {
      if (!this.options) return

      const { serviceUrl, responseKey } = this.options
      const res = await fetch(serviceUrl, {
        method: 'POST'
      })
      const data = await res.json()
      const result = new ResponseParser(data).get()

      if (result.success) {
        this.datasource = res.data[responseKey]
      }
    }
  },
  watch: {
    selectedText (newValue) {
      this.bindComboText()
      this.createToDatesource()
    },
    dataItem (newValue) {
      this.selectedText = this.selectedText =
        (this.dataItem && this.dataItem[this.options.from.field]) || ''

      this.bindComboText()
    },
    datasource () {
      this.bindComboText()
    },
    toDatasource () {
      this.bindComboText()
    }
  }
}
</script>
