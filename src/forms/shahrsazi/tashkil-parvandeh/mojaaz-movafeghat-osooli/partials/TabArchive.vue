<template>
  <fit>

    <safa-datatable
      title="سوابق شهرسازی"
      helper="baseShahrsaziArchive"
      :m="m"
      v-model="value.Base_ShahrsaziArchive"
      height="auto"
      min-height="90px"
      max-height="200px"
      class="q-mb-sm"
    />

    <safa-datatable
      title="سوابق کمیسیونها"
      helper="baseCommissionHistory"
      :m="m"
      v-model="value.Base_CommissionHistory"
      height="auto"
      min-height="90px"
      max-height="200px"
      class="q-mb-sm"
    />

    <safa-datatable
      title="پرداخت آخرین مفاصای نوسازی"
      helper="baseRenovationPaymentHistory"
      :m="m"
      v-model="value.Base_RenovationPaymentHistory"
      height="auto"
      min-height="90px"
      max-height="200px"
      class="q-mb-sm"
    />

    <safa-datatable
      title="سوابق کمیسیون 77"
      helper="baseCommission77History"
      m="r"
      v-model="value.Base_Commission77History"
      height="auto"
      min-height="90px"
      max-height="200px"
      class="q-mb-sm"
    />

    <safa-datatable
      title="اشتراكات"
      helper="baseSubscription"
      :m="m"
      v-model="value.Base_SubScription"
      height="auto"
      min-height="90px"
      max-height="200px"
      class="q-mb-sm"
    />

    <safa-datatable
      title="منبع برداشت اطلاعات"
      helper="baseResourceInfo"
      :m="m"
      v-model="value.Base_ResourceInfo"
      height="auto"
      min-height="90px"
      max-height="200px"
    />

  </fit>
</template>

<script>
export default {
  name: 'TabArchive',

  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    m: String
  },
  data () {
    return {
      verticalSplitter: 50
    }
  }
}
</script>
