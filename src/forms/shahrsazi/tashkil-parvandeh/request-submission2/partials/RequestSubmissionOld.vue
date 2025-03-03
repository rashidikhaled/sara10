<template>
  <safa-datatable
    v-model="allRequestListResults.AllRequestList"
    helper="requestSubmissionOld"
    class="fit"
    height="100%"
    max-height="100%"
    min-height="100%"
    margin="0"
    :bordered="false"
    title="درخواست های قبلی"
    :allowMultipleSelection="true"
  >
  </safa-datatable>
</template>
<script>
export default {
  computed: {
    mode () {
      return this.isEditable ? 'e' : 'r'
    }
  },
  props: {
    allRequestListResults: {}
  }
}
</script>
