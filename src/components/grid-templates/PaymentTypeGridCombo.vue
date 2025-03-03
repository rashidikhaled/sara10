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
          ID: '1',
          Title: 'دستی'
        },
        {
          ID: '2',
          Title: 'پی سی پوز'
        },
        {
          ID: '3',
          Title: 'فایل بانک'
        },
        {
          ID: '4',
          Title: 'تایید آنی بانک'
        },
        {
          ID: '5',
          Title: 'وب سرویس بانک'
        },
        {
          ID: '6',
          Title: 'خدمات شهروندان'
        },
        {
          ID: '7',
          Title: 'شهروند سپاری'
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
