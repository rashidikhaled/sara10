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
      if (this.eumManagerConfirm === 0) {
        type = 'بدون نظر'
      } else if (this.eumManagerConfirm === 1) {
        type = 'تأیید'
      } else if (this.eumManagerConfirm === 2) {
        type = 'ابطال'
      } else if (this.eumManagerConfirm === 3) {
        type = 'عدم تأیید'
      } else {
        type = ' تأیید نهایی شهروندسپاری'
      }
      return type
    },
    eumManagerConfirm () {
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
