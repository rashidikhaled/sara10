<template>
  <fit>
    <safa-splitter
      v-model="verticalSplitter"
       :horizontal="$q.screen.lt.lg"
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '300px' : '100px'"
    >
      <template v-slot:before>
        <fit className="q-pb-sm">
          <safa-datatable
            title="سوابق شهرسازی"
            helper="baseShahrsaziArchive"
            :m="m"
            v-model="value.Base_ShahrsaziArchive"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>

      </template>
      <template v-slot:after>
        <fit className="q-pb-sm">
          <safa-datatable
            title="سوابق کمیسیونها"
            helper="baseCommissionHistory"
            :m="m"
            v-model="value.Base_CommissionHistory"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>

      </template>
    </safa-splitter>

    <safa-splitter
      v-model="verticalSplitter"
       :horizontal="$q.screen.lt.lg"
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '300px' : '100px'"
    >
      <template v-slot:before>
        <fit className="q-pb-sm">
          <safa-datatable
            title="پرداخت آخرین مفاصای نوسازی"
            helper="baseRenovationPaymentHistory"
            :m="m"
            v-model="value.Base_RenovationPaymentHistory"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit className="q-pb-sm">
          <safa-datatable
            title="سوابق کمیسیون 77"
            helper="baseCommission77History"
            m="r"
            v-model="value.Base_Commission77History"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
    </safa-splitter>
    <safa-splitter
      v-model="verticalSplitter"
       :horizontal="$q.screen.lt.lg"
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '300px' : '100px'"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="اشتراكات"
            helper="baseSubscription"
            :m="m"
            v-model="value.Base_SubScription"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="منبع برداشت اطلاعات"
            helper="baseResourceInfo"
            :m="m"
            v-model="value.Base_ResourceInfo"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
    </safa-splitter>
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
