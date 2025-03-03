<template>
  <fit>
    <safa-datatable
      helper="calculatorMethod"
      title="روش های محاسبه"
      v-model="value"
      cdcName="Income_LogMethod"
      fit
      paginate
      min-height="200px"
      height="100%"
      max-height="100%"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      :showRowNumber="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
    />
  </fit>
</template>

<script>
export default {
  data () {
    return {
      name: "CalculateMethods"
    }
  },
  props: ['value']
}
</script>
