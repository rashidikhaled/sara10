<template>
  <td :class="className" style="text-align:center !important;">
    <q-icon name="attach_file" color="primary" size="sm" v-if="dataItem?.IsOthersReqAttached">
      <q-tooltip>
        درخواست پیوست دارد.
      </q-tooltip>
    </q-icon>
  </td>
</template>

<script>
export default {
  name: 'IsOthersReqAttached',
  props: {
    dataItem: Object,
    column: Object,
    className: String
  }
}
</script>

<style scoped>

</style>
