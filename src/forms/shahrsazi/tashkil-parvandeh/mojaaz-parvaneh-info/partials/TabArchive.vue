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

    <q-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <q-splitter
            v-model="verticalSplitter"
            vertical
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit className="q-pb-sm q-pr-sm">
                <safa-datatable
                  title="منبع برداشت اطلاعات"
                  helper="baseResourceInfo"
                  :m="m"
                  v-model="value.Base_ResourceInfo"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit className="q-pb-sm q-pl-sm">
                <safa-datatable
                  helper="baseCommissionHistory"
                  :m="m"
                  v-model="value.Base_CommissionHistory"
                  title="سوابق کمیسیونها "
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                />
              </fit>
            </template>
          </q-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-splitter
            v-model="verticalSplitter"
            vertical
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit className="q-pt-sm q-pr-sm">
                <safa-datatable
                  title="پرداخت آخرین مفاصای نوسازی"
                  helper="baseRenovationPaymentHistory"
                  :m="m"
                  v-model="value.Base_RenovationPaymentHistory"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit className="q-pt-sm q-pl-sm">
                <safa-datatable
                  helper="baseSubscription"
                  :m="m"
                  v-model="value.Base_SubScription"
                  title="اشتراكات"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                />
              </fit>
            </template>
          </q-splitter>
        </fit>
      </template>
    </q-splitter>
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
