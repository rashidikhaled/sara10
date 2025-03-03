<template>
  <section>
    <div class="row q-col-gutter-sm">
      <safa-datatable
        title="سوابق و اشتراکات"
        class="col-sm-12 col-md-6"
        height="200px"
        helper="baseShahrsaziArchive"
        :m="m"
        v-model="value.Base_ShahrsaziArchive"
      />
      <safa-datatable
        title="سوابق کمیسیونها"
        class="col-sm-12 col-md-6"
        height="200px"
        helper="baseCommissionHistory"
        :m="m"
        v-model="value.Base_CommissionHistory"
      />
      <safa-datatable
        title="پرداخت آخرین مفاصای نوسازی"
        class="col-sm-12 col-md-6"
        height="200px"
        helper="baseRenovationPaymentHistory"
        :m="m"
        v-model="value.Base_RenovationPaymentHistory"
      />
      <safa-datatable
        title="منبع برداشت اطلاعات"
        class="col-sm-12 col-md-6"
        height="200px"
        helper="baseResourceInfo"
        :m="m"
        v-model="value.Base_ResourceInfo"
      />
      <safa-datatable
        title="سوابق کمیسیون 77"
        class="col-sm-12 col-md-6"
        height="200px"
        helper="baseCommission77History"
        v-model="value.Base_Commission77History"
      />
      <safa-datatable
        title="حفاری"
        class="col-sm-12 col-md-6"
        height="200px"
        helper="baseDig"
        v-model="value.Base_Dig"
      />
    </div>
  </section>
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
