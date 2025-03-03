<template>
  <safa-grid
    v-model="allRequestList"
    cdcName="allRequestList"
    helper="editRequestSubmissionOld"
    class=""
    height="100%"
    max-height="100%"
    min-height="100%"
    margin="0"
    :bordered="false"
    title="درخواست های قبلی"
    :allowMultipleSelection="true"
    paginate
    m="r"
  />
</template>
<script>
export default {
  props: {
    allRequestList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  }
}
</script>
