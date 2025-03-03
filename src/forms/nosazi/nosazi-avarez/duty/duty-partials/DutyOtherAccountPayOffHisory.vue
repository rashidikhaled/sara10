<template>
  <fit>
    <safa-datatable
      v-model="payOfHistory"
      cdcName="dutyOtherAccountPayOffHistory"
      fit
      height="100%"
      helper="dutyOtherAccountPayOffHistory"
      max-height="100%"
      minHeight="100px"
      title="تاریخچه"
    />
  </fit>
</template>
<script>
export default {
  props: {
    payOfHistory: {
      type: Array,
      default: () => []
    }
  }
}
</script>
