<template>
  <td class="grid-template">
    <safa-checkbox
      :class="className"
      v-model="checkedValue"
      val="primary"
      color="primary"
      @input="change"
      :m='mode'
    />
  </td>
</template>
<script>
export default {
  data: function () {
    return {
      checkedValue: false
    }
  },
  computed: {
    mode () {
      return this.dataItem.inEdit ? 'e' : 'r'
    }
    // defaultValue () {
    //   return this.dataItem[this.field]
    // }
  },
  mounted () {
    this.checkedValue = this.dataItem[this.field] || false
  },
  watch: {
    dataItem () {
      this.checkedValue = this.dataItem[this.field] || false
    }
  },
  props: {
    field: String,
    dataItem: Object,
    format: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    rowType: String,
    level: Number,
    expanded: Boolean,
    editor: String
  },
  methods: {
    change (value) {
      this.$emit('checkBoxSelectedChanged', {
        dataItem: this.dataItem,
        field: this.field,
        value: this.checkedValue
      })
    }
  }
}
</script>
