<template>
  <fit>
    <FormRow class="q-mt-sm">
      <FormControl>
        <safa-datepicker
          label="تاریخ اتمام مرمت(تحویل موقت)"
          label-width="170px"
          v-model="value.ClsLicense.ClsDelivery.ActualCompletion.ActualCompletionDate"
          cdcName="ActualCompletionDate"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ پایان دوره تضمین"
          label-width="130px"
          v-model="value.ClsLicense.ClsDelivery.ActualCompletion.GuaranteePeriodEndDate"
          cdcName="GuaranteePeriodEndDate"
          m="r"
        />
      </FormControl>
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object
  },

  data () {
    return {
      licenseAsphaltCoatingColumns: []
    }
  }
}
</script>
