<template>

  <fit>
    <safa-datatable
      helper="baseShahrsaziArchive"
      :m="m"
      v-model="value.Base_ShahrsaziArchive"
      title="سوابق شهرسازی"
      height="150px"
      class="q-mb-sm"
    />

    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '600px' : '200px'"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            :horizontal="$q.screen.lt.lg"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
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
            <template v-slot:after>
              <fit>
                <safa-datatable
                  helper="baseCommissionHistory"
                  :m="m"
                  v-model="value.Base_CommissionHistory"
                  title="سوابق کمیسیونها "
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            :horizontal="$q.screen.lt.lg"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
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
              <fit>
                <safa-datatable
                  helper="baseSubscription"
                  :m="m"
                  v-model="value.Base_SubScription"
                  title="اشتراكات"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>
  </fit>
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
      horizontalSplitter: 50,
      verticalSplitter: 50
    }
  }
}
</script>
