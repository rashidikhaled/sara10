<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12">
      <safa-datatable
        helper="baseShahrsaziArchive"
        :m="m"
        title="سوابق شهرسازی"
        v-model="value.Base_ShahrsaziArchive"
        cdcName="Base_ShahrsaziArchive"
        max-height="200px"
      />
    </div>
    <div class="col-12 col-md-6">
      <safa-datatable
        helper="baseCommissionHistory"
        :m="m"
        v-model="value.Base_CommissionHistory"
        cdcName="Base_CommissionHistory"
        title="سوابق  کمیسیون ها"
        :delete-row="false"
        height="200px"
      />
    </div>
    <div class="col-12 col-md-6">
      <safa-datatable
        helper="baseRenovationPaymentHistory"
        :m="m"
        v-model="value.Base_RenovationPaymentHistory"
        cdcName="Base_RenovationPaymentHistory"
        title="پرداخت آخرین مفاصای نوسازی "
        height="200px"
      />
    </div>
    <div class="col-12 col-md-6">
      <safa-datatable
        title="اشتراكات "
        helper="baseSubscription"
        :m="m"
        v-model="value.Base_SubScription"
        cdcName="Base_SubScription"
        height="200px"
      />
    </div>
    <div class="col-12 col-md-6">
      <safa-datatable
        title="منبع برداشت اطلاعات "
        helper="baseResourceInfo"
        :m="m"
        v-model="value.Base_ResourceInfo"
        cdcName="Base_ResourceInfo"
        height="200px"
      />
    </div>
    <div class="col-12">
      <safa-datatable
        title="سوابق کمیسیون 77"
        helper="baseCommission77History"
        :m="m"
        v-model="value.Base_Commission77History"
        cdcName="Base_Commission77History"
        max-height="200px"
      />
    </div>
    <div class="col-12">
      <safa-datatable
        title="حفاری"
        helper="baseDig"
        :m="m"
        v-model="value.Base_Dig"
        cdcName="Base_Dig"
        max-height="200px"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabArchive',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
