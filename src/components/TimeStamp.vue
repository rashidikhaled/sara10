<template>
  <td v-if="!dataItem.inEdit" :class="className">{{ dataItem[field] }}</td>
  <td v-else class="grid-template">
    <safa-datepicker
      format="jYYYY/jMM/jDD"
      display-format="dddd jDD jMMMM jYYYY"
      @input="change"
      v-model="model"
      ref="date"
    >
    </safa-datepicker>
  </td>
</template>
<script>
export default {
  data: function () {
    return {
      model: ''
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
    this.model = this.dataItem && this.dataItem[this.field]

    // this.selectedValue = this.items.filter(item => {
    //   return item.Title.toString().toLowerCase() === (selectedValue && selectedValue.toString().toLowerCase())
    // })[0]
  },

  methods: {
    change (value) {
      this.$emit('change', {
        field: this.field,
        dataItem: this.dataItem,
        value: value
      })
    }
  }
}
</script>
