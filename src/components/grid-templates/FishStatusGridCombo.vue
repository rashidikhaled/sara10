<template>
  <td class="grid-template">
    <safa-combo
      ref="gcombo"
      :class="className"
      @input="change"
      :m="mode"
      sourceType="local"
      :options="fichStatus"
      v-model="selectedValue"
    />
  </td>
</template>
<script>

export default {
  data () {
    return {
      fichStatus: [
        {
          ID: '0',
          Title: 'صدور موقتی'
        },
        {
          ID: '1',
          Title: 'صدور قطعی'
        },
        {
          ID: '2',
          Title: 'چاپ فیش'
        },
        {
          ID: '3',
          Title: 'تایید'
        },
        {
          ID: '4',
          Title: 'ابطال'
        }
      ]
    }
  },
  computed: {
    mode () {
      return this.dataItem.inEdit ? 'e' : 'r'
    },
    selectedValue () {
      return this.dataItem[this.field]
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
      this.$emit('change', this.$refs.gcombo, value)
    }
  }
}
</script>
