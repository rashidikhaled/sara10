<template>
  <td class="grid-template">
    <safa-combo
      ref="gcombo"
      :class="className"
      @input="change"
      v-model="selectedValue"
      :ciName="field"
      :m="mode"
      domainName="CI_SaraM1"
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
      this.$emit('change', this.$refs.gcombo, value)
    }
  },
  watch: {
    dataItem: {
      handler (val) {
        // // console.log(val)
        this.selectedValue = this.dataItem[this.field]
      },
      deep: true
    }
  }
}
</script>
