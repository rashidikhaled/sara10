<template>
  <td>
    <div class="row justify-between items-center" style="pointer-events: none">
      <q-img
        style="width: 18px; height: 18px"
        :src="'http://dev.safarayaneh.com:7010/img/' + dataItem.IconUrl"
      />
      {{ dataItem.BizCode }}
    </div>
  </td>
</template>

<script>
export default {
  name: 'KartableBizCode',
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

<style scoped>

</style>
