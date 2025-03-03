<template>
  <td class="grid-template-enum">
    <safa-combo
      ref="gcombo"
      source-type="local"
      :options="options"
      :class="className"
      @input="change"
      :m="mode"
      v-model="dataItem[field]"
    />
  </td>
</template>
<script>
import enumDefs from './json/enumDefs'

export default {
  name: 'GridEnum',

  computed: {
    mode () {
      return this.dataItem.inEdit ? 'e' : 'r'
    },
    options () {
      return enumDefs[this.field] || []
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
    editor: String,
    values: String
  },

  methods: {
    change (value) {
      this.$emit('change', this.$refs.gcombo, value)
    }
  }
}
</script>
