<template>
  <!-- <td v-if="!dataItem.inEdit" :class="className">{{ dataItem[field] }}</td> -->
    <td class="grid-template">
      <p >{{text}}</p>
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
    text () {
      let type = ''
      if (this.eumObjonPrice === 1) {
        type = 'درآمد'
      } else if (this.eumObjonPrice === 2) {
        type = 'نوسازی'
      } else if (this.eumObjonPrice === 3) {
        type = 'صنفی'
      } else if (this.eumObjonPrice === 4) {
        type = 'پسماند'
      } else if (this.eumObjonPrice === 5) {
        type = 'اشغال معابر'
      } else if (this.eumObjonPrice === 6) {
        type = 'کمیسیون 20'
      } else {
        type = 'درآمد های عمومی'
      }
      return type
    },
    eumObjonPrice () {
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
