<template>
  <td>
    <span dir="ltr">{{dataItem.StartDate}} {{dataItem.StartTime}}</span>
  </td>
</template>

<script>
export default {
  name: 'KartableStartDateTemplate',
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
