<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
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
                        title="سوابق شهرسازی"
                        fit
                        height="100%"
                        max-height="100%"
                        min-height="150px"
                        helper="baseShahrsaziArchive"
                        :m="m"
                        v-model="value.Base_ShahrsaziArchive"
                      />
                    </fit>
                  </template>
                  <template v-slot:after>
                    <fit>

                      <safa-datatable
                        title="سوابق شهرسازی ملک"
                        fit
                        height="100%"
                        max-height="100%"
                        min-height="150px"
                        helper="baseShahrsaziArchiveHouse"
                        :m="m"
                        v-model="value.Base_ShahrsaziArchiveHouse"
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
                        title="سوابق کمیسیون 77"
                        fit
                        height="100%"
                        max-height="100%"
                        min-height="150px"
                        helper="baseCommission77History"
                        :m="m"
                        v-model="value.Base_Commission77History"
                      />
                    </fit>
                  </template>
                </safa-splitter>
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit >
          <safa-datatable
            title="حفاری"
            helper="baseDig"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            v-model="value.Base_Dig"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseArchive',

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
      splitterModel: 70
    }
  }
}
</script>
