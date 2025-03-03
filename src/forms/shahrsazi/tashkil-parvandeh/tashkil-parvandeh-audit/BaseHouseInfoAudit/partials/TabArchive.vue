<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit >
          <safa-datatable
            title="سوابق شهرسازی"
            helper="baseShahrsaziArchive"
            :m="m"
            v-model="value.Base_ShahrsaziArchive"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            vertical
            class="fit"
            margin="0"
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
                  min-height="150px"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit >
                <safa-datatable
                  title="پرداخت آخرین مفاصای نوسازی "
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
    value: {
      type: Object,
      default: () => ({})
    },
    m: String
  },
  data () {
    return {
      horizontalSplitter: 50,
      verticalSplitter: 50
    }
  }
}
</script>
