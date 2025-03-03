<template>
  <!-- <td v-if="!dataItem.inEdit" :class="className">{{ dataItem[field] }}</td> -->
    <td class="grid-template">
      <p>{{text}}</p>
    </td>
</template>
<script>
export default {
  data: function () {
    return {
      model: true
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    text () {
      if (this.isRecieved === 1) {
        return 'دریافت پرونده'
      } else if (this.isRecieved === 2) {
        return 'تحویل پرونده'
      }
    },
    isRecieved () {
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
    editor: String,
    values: String
  }
}
</script>
