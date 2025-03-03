<template>
  <fit>
    <safa-grid
      title="لیست استعلام"
      helper="greenSpaceInquiry"
      v-model="value.lstSh_CutTreeOwnRequestDetails"
      cdcName="lstSh_CutTreeOwnRequestDetails"
      fit
      paginate
    />
  </fit>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          lstSh_CutTreeOwnRequestDetails: []
        }
      }
    }
  }
}
</script>
