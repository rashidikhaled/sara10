<template>
  <div style="text-align: center !important">
    <q-icon
      name="attach_file"
      color="primary"
      size="sm"
      v-if="params?.data?.IsOthersReqAttached"
    >
      <q-tooltip> درخواست پیوست دارد. </q-tooltip>
    </q-icon>
  </div>
</template>

<script>
export default {
  name: "AgIsOthersReqAttached"
}
</script>
