<template>
  <td>
    <BizCode :code="dataItem.BizCode" />
  </td>
</template>

<script>
import BizCode from './BizCode.vue'
export default {
  name: 'KartableBizCode',
  components: { BizCode },
  props: {
    field: String,
    dataItem: Object,
    inEdit: Boolean,
    editable: Boolean,
    domain: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    column: Object,
    editor: String,
    mode: String
  }
}
</script>
