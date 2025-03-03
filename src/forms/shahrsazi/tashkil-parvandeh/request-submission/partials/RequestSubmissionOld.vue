<template>
  <safa-datatable
    v-model="allRequestList"
    cdcName="allRequestList"
    helper="requestSubmissionOld"
    class="fit"
    height="100%"
    max-height="100%"
    min-height="100%"
    margin="0"
    :bordered="false"
    title="درخواست های قبلی"
    :allowMultipleSelection="true"
    paginate
  >
  </safa-datatable>
</template>
<script>
export default {
  props: {
    allRequestList: {
      type: Array,
      default: () => []
    }
  }
}
</script>
