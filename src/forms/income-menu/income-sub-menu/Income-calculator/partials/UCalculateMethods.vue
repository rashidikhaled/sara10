<template>
  <fit>
    <safa-datatable
      ref="grid"
      name="grid"
      helper="calculatorMethod"
      v-model="incomeDetailsResults.Income_LogMethod"
      cdcName="Income_LogMethod"
      title="روش های محاسبه"
      fit
      height="100%"
      max-height="100%"
      :bordered="false"
    />
  </fit>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  props: {
    incomeDetailsResults: Object
  }

}
</script>
