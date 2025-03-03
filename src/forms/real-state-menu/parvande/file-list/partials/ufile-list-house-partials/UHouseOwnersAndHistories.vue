<template>
  <fit>
    <safa-splitter v-model="splitterModel" horizontal margin="0">
      <template v-slot:before>
        <fit>
          <safa-grid
            v-model="getHouseResult.Base_Owner"
            helper="OwnersColumns"
            :m="m"
            title="مالکین"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>

      <template v-slot:after>
        <fit>
          <safa-splitter v-model="splitterModel2" vertical margin="0">
            <template v-slot:before>
              <safa-grid
                v-model="getHouseResult.Base_SubScription"
                helper="SharedsColumns"
                :m="m"
                title="اشتراکات"
                fit
                min-height="150px"
                height="100%"
                max-height="100%"
                :showRowNumber="false"
                :show-selected-checkbox="false"
                :allowMultipleSelection="false"
              />
            </template>

            <template v-slot:after>
              <fit>
                <safa-splitter v-model="splitterModel" vertical margin="0">
                  <template v-slot:before>
                    <fit>
                      <safa-grid
                        v-model="getHouseResult.Base_ShahrsaziArchive"
                        helper="shahrSaziHistoryColumns"
                        :m="m"
                        title="سوابق شهرسازی"
                        fit
                        min-height="150px"
                        height="100%"
                        max-height="100%"
                        :showRowNumber="false"
                        :show-selected-checkbox="false"
                        :allowMultipleSelection="false"
                      />
                    </fit>
                  </template>

                  <template v-slot:after>
                    <fit>
                      <safa-grid
                        v-model="getHouseResult.Base_CommissionHistory"
                        helper="commissionHistoryColumns"
                        :m="m"
                        title="سوابق کمیسیونها"
                        fit
                        min-height="150px"
                        height="100%"
                        max-height="100%"
                        :showRowNumber="false"
                        :show-selected-checkbox="false"
                        :allowMultipleSelection="false"
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
  props: {
    getHouseResult: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      splitterModel: 50,
      splitterModel2: 35
    }
  }
}
</script>
