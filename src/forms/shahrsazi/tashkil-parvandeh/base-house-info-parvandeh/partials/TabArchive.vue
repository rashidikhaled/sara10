<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12">
      <safa-datatable
        helper="shahrsaziArchive"
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
       <!--:columns="columns"-->
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
        m="e"
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
  },
  data () {
    return {
      // columns: [
      //     // {
      //     //   field: 'CI_Commission',
      //     //   title: 'نوع کمیسیون',
      //     //   domain: 'CI_SaraM1',
      //     //   width: '136px'
      //     // },
      //     {
      //       field: 'CI_RequestType',
      //       title: 'نوع درخواست',
      //       domain: 'CI_SaraM1',
      //       editor: 'combo'
      //     },
      //     {
      //       field: 'CI_VoteTe',
      //       title: 'نوع رای',
      //       domain: 'CI_SaraM1',
      //       editor: 'combo',
      //       width: '131px'
      //     },
      //     {
      //       field: 'IsStatusRunVote',
      //       title: 'وضعیت اجرای رای',
      //       editor: 'checkbox',
      //       width: '98px'
      //     },
      //     {
      //       field: 'VoteNo',
      //       title: 'شماره رای',
      //       editor: 'texteditor',
      //       width: '70px'
      //     },
      //     {
      //       field: 'VoteDate',
      //       title: 'تاریخ رای',
      //       editor: 'date',
      //       width: '103px'
      //     },
      //     {
      //       field: 'SendNo',
      //       title: 'شماره ارسال',
      //       editor: 'texteditor',
      //       width: '77px'
      //     },
      //     {
      //       field: 'SendDate',
      //       title: 'تاریخ ارسال',
      //       editor: 'date',
      //       width: '109px'
      //     },
      //     {
      //       field: 'ProclamationDate',
      //       title: 'تاریخ ابلاغ',
      //       editor: 'date',
      //       width: 'auto'
      //     }

      //   ]
    }
  }
}
</script>
