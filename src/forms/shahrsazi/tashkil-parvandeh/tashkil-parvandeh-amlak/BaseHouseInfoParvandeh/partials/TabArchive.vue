<template>
  <safa-splitter
    v-model="splitterModel"
    horizontal
    class="fit"
    margin="0"
  >
    <template v-slot:before>
      <fit>
        <safa-datatable
          title="سوابق شهرسازی"
          class="col-12 col-sm-12 col-md-12"
          height="250px"
          helper="baseShahrsaziArchive"
          :m="m"
          v-model="value.Base_ShahrsaziArchive"
        />
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <safa-splitter
          v-model="horizontalSplitter"
          horizontal
          class="fit"
          margin="0"
        >
          <template v-slot:before>
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
                      title="سوابق کمیسیونها"
                      fit
                      height="100%"
                      max-height="100%"
                      min-height="150px"
                      helper="baseCommissionHistory"
                      :m="m"
                      v-model="value.Base_CommissionHistory"
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-datatable
                      title="پرداخت آخرین مفاصای نوسازی"
                      fit
                      height="100%"
                      max-height="100%"
                      min-height="150px"
                      helper="baseRenovationPaymentHistory"
                      :m="m"
                      v-model="value.Base_RenovationPaymentHistory"
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
                vertical
                class="fit"
                margin="0"
              >
                <template v-slot:before>
                  <fit>
                    <safa-datatable
                      title="اشتراكات"
                      fit
                      height="100%"
                      max-height="100%"
                      min-height="150px"
                      helper="baseSubscription"
                      :m="m"
                      v-model="value.Base_SubScription"
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-datatable
                      title="منبع برداشت اطلاعات"
                      fit
                      height="100%"
                      max-height="100%"
                      min-height="150px"
                      helper="baseResourceInfo"
                      :m="m"
                      v-model="value.Base_ResourceInfo"
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

  <!-- <safa-datatable
          title="سوابق کمیسیون 77"
          class="col-12 col-sm-12 col-md-6"
          height= "250px"
          helper="baseCommission77History"
          m="r"
          v-model="value.Base_Commission77History"
        />
        <safa-datatable
          title="حفاری"
          class="col-12 col-sm-12 col-md-6"
          height= "250px"
          helper="baseDig"
          v-model="value.Base_Dig"
        /> -->
  <!-- </div> -->
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
      verticalSplitter: 50,
      splitterModel: 35
    }
  }
}
</script>
