<template>
  <td class="grid-template">
    <q-linear-progress
      stripe
      rounded
      size="10px"
      color="primary"
      class="q-mt-sm"
      ref="gProgressLine"
      :class="className"
      @input="change"
      v-model="selectedValue"
    >
    </q-linear-progress>
  </td>
</template>
<script>

export default {
  name: 'GridProgressLine',

  data () {
    return {
      selectedValue: 0
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
    this.selectedValue = Number((this.dataItem[this.field]) || 0) / 100
  },
  methods: {
    change (value) {
      this.$emit('change', this.$refs.gProgressLine, value)
    }
  }
}
</script>
