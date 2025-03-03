<template>
  <td
    :class="{ numeric: column.numeric, wrap: column.wrap }"
    :style="'min-width: ' + tdWidth"
    class="datatable-text-template"
    :title="dataItem[field]"
    v-if="canEdit"
  >
    <input
      type="number"
      class="grid-text"
      style="max-width: 100%; width: 100%;"
      dir="ltr"
      v-model.lazy="val"
    />
  </td>
  <td
    :class="{ numeric: column.numeric, wrap: column.wrap }"
    :style="`direction: ltr;width:${tdWidth}`"
    class="datatable-text-template"
    :title="val"
    v-else
  >
    {{ val }}
  </td>
</template>
<script>
import { convertNumberToDecimal } from '../common/accounting/moneyConverter'
export default {
  data () {
    return {
      val: ''
    }
  },
  computed: {
    tdWidth () {
      return this.column.width || 'auto'
    },
    canEdit () {
      return (
        this.inEdit &&
          (typeof this.editable === 'undefined' || this.editable) &&
          this.mode === 'e'
      )
    }
  },
  inheritAttrs: false,
  props: {
    field: String,
    dataItem: Object,
    inEdit: Boolean,
    editable: Boolean,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    column: Object,
    editor: String,
    mode: String
  },
  mounted () {
    this.val = this.dataItem[this.field] || '0.00'
  },
  methods: {
    change (value) {
      if (!value) value = '0'
      value = convertNumberToDecimal(value)
      this.val = value
      this.$emit('change', {
        field: this.field,
        value: value,
        dataItem: this.dataItem
      })
    }
  },
  watch: {
    val (newVal) {
      this.change(newVal)
    }
  }
}
</script>
<style lang="scss">
  .safa-datatable table td.datatable-text-template:not(.wrap) {
    white-space: nowrap;
  }
</style>
