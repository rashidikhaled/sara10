<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      cdcName="horizontalSplitter"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="horizontalSplitter"
            cdcName="horizontalSplitter"
            class="fit"
            horizontal
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_ShahrsaziArchive"
                  cdcName="Base_ShahrsaziArchive"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseShahrsaziArchive"
                  max-height="100%"
                  min-height="100px"
                  title="سوابق و اشتراکات"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.Base_CommissionHistory"
                  cdcName="Base_CommissionHistory"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseCommissionHistory"
                  max-height="100%"
                  min-height="100px"
                  title="سوابق کمیسیونها "
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="horizontalSplitter"
            cdcName="horizontalSplitter"
            class="fit"
            horizontal
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-splitter
                  v-model="verticalSplitter"
                  cdcName="verticalSplitter"
                  :horizontal="$q.screen.lt.lg"
                  class="fit"
                  margin="0"
                >
                  <template v-slot:before>
                    <fit>
                      <safa-datatable
                        v-model="value.Base_RenovationPaymentHistory"
                        cdcName="Base_RenovationPaymentHistory"
                        :m="m"
                        fit
                        height="100%"
                        helper="baseRenovationPaymentHistory"
                        max-height="100%"
                        min-height="100px"
                        title="پرداخت آخرین مفاصای نوسازی "
                      />
                    </fit>
                  </template>
                  <template v-slot:after>
                    <fit>
                      <safa-datatable
                        v-model="value.Base_ResourceInfo"
                        cdcName="Base_ResourceInfo"
                        :m="m"
                        fit
                        height="100%"
                        helper="baseResourceInfo"
                        max-height="100%"
                        min-height="100px"
                        title="منبع برداشت اطلاعات"
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
                  cdcName="verticalSplitter"
                  :horizontal="$q.screen.lt.lg"
                  class="fit"
                  margin="0"
                >
                  <template v-slot:before>
                    <fit>
                      <safa-datatable
                        v-model="value.Base_Commission77History"
                        cdcName="Base_Commission77History"
                        fit
                        height="100%"
                        helper="baseCommission77History"
                        max-height="100%"
                        min-height="100px"
                        title="سوابق کمیسیون 77 "
                      />
                    </fit>
                  </template>
                  <template v-slot:after>
                    <fit>
                      <safa-datatable
                        v-model="value.Base_Dig"
                        cdcName="Base_Dig"
                        fit
                        height="100%"
                        helper="baseDig"
                        max-height="100%"
                        min-height="100px"
                        title="حفاری "
                      />
                    </fit>
                  </template>
                </safa-splitter>
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
