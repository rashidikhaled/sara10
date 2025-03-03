<template>
  <fit>
    <safa-datatable
      helper="baseShahrsaziArchive"
      :m="m"
      v-model="value.Base_ShahrsaziArchive"
      title="سوابق و اشتراکات"
      :emptyRowLimit="1"
      :selectable="false"
      maxHeight="200px"
      minHeight="150px"
    />

    <safa-datatable
      helper="baseCommissionHistory"
      :m="m"
      v-model="value.Base_CommissionHistory"
      title="سوابق کمیسیونها"
      :emptyRowLimit="1"
      :selectable="false"
      class="q-my-sm"
      :margin="null"
      maxHeight="200px"
      minHeight="150px"
    />

    <safa-datatable
      helper="baseRenovationPaymentHistory"
      :m="m"
      v-model="value.Base_RenovationPaymentHistory"
      title="پرداخت آخرین مفاصای نوسازی"
      :emptyRowLimit="1"
      :selectable="false"
      maxHeight="200px"
      minHeight="150px"
    />
    <safa-datatable
      helper="baseResourceInfo"
      :m="m"
      v-model="value.Base_ResourceInfo"
      title="منبع برداشت اطلاعات"
      :emptyRowLimit="1"
      :selectable="false"
      class="q-mt-sm"
      :margin="null"
      maxHeight="200px"
      minHeight="150px"
    />
    <safa-datatable
      :m="m"
      helper="baseCommission77History"
      v-model="value.Base_Commission77History"
      title="سوابق کمیسیون 77 "
      :emptyRowLimit="1"
      :selectable="false"
      class="q-my-sm"
      maxHeight="200px"
      minHeight="150px"
    />
    <safa-datatable
      :m="m"
      helper="baseDig"
      v-model="value.Base_Dig"
      title="حفاری "
      :emptyRowLimit="1"
      :selectable="false"
      maxHeight="200px"
      minHeight="150px"
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
  }
}
</script>
