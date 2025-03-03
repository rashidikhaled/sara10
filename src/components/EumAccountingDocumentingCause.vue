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
      if (this.eumAccountingDocumentingCause === 1) {
        type = 'صدور'
      } else if (this.eumAccountingDocumentingCause === 2) {
        type = 'تأیید'
      } else if (this.eumAccountingDocumentingCause === 3) {
        type = 'چاپ'
      } else if (this.eumAccountingDocumentingCause === 4) {
        type = 'ابطال صدور'
      } else if (this.eumAccountingDocumentingCause === 5) {
        type = ' ابطال تأیید'
      } else if (this.eumAccountingDocumentingCause === 6) {
        type = 'استرداد'
      } else {
        type = ' چک'
      }
      return type
    },
    eumAccountingDocumentingCause () {
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
