<template>
  <td class="grid-template">
    <safa-datepicker
      ref="gDatepicker"
      :class="className"
      @input="change"
      v-model="selectedValue"
      :m="mode"
    />
  </td>
</template>
<script>

export default {
  data () {
    return {
      selectedValue: ''
    }
  },
  computed: {
    mode () {
      return this.dataItem.inEdit ? 'e' : 'r'
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
  mounted () {
    this.selectedValue = this.dataItem[this.field]
  },
  methods: {
    change (value) {
      this.$emit('change', this.$refs.gDatepicker, value)
    }
  }
}
</script>
