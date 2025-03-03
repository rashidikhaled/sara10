<template>
  <safa-datatable
    v-model="shTechnicalStaff"
    cdcName="shTechnicalStaff"
    helper="Technicalstaff"
    class="fit"
    height="100%"
    max-height="100%"
    min-height="100%"
    margin="0"
    :bordered="false"
    title="هیات فنی"
    :allowMultipleSelection="true"
    paginate
  >
  </safa-datatable>
</template>
<script>
export default {
  props: {
    shTechnicalStaff: {
      type: Array,
      default: () => []
    }
  }
}
</script>
