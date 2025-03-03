<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="horizontalSplitter"
            class="fit"
            horizontal
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-splitter
                  v-model="verticalSplitter"
                  class="fit"
                  margin="0"
                  vertical
                >
                  <template v-slot:before>
                    <fit>
                      <safa-datatable
                        v-model="value.Base_ShahrsaziArchive"
                        :m="m"
                        fit
                        height="100%"
                        helper="baseShahrsaziArchive"
                        max-height="100%"
                        min-height="150px"
                        title="سوابق شهرسازی"
                      />
                    </fit>
                  </template>
                  <template v-slot:after>
                    <fit>

                      <safa-datatable
                        v-model="value.Base_ShahrsaziArchiveHouse"
                        :m="m"
                        fit
                        height="100%"
                        helper="baseShahrsaziArchiveHouse"
                        max-height="100%"
                        min-height="150px"
                        title="سوابق شهرسازی ملک"
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
                  class="fit"
                  margin="0"
                  vertical
                >
                  <template v-slot:before>
                    <fit>
                      <safa-datatable
                        v-model="value.Base_CommissionHistory"
                        :m="m"
                        fit
                        height="100%"
                        helper="baseCommissionHistory"
                        max-height="100%"
                        min-height="150px"
                        title="سوابق کمیسیونها"
                      />
                    </fit>
                  </template>
                  <template v-slot:after>
                    <fit>
                      <safa-datatable
                        v-model="value.Base_Commission77History"
                        :m="m"
                        fit
                        height="100%"
                        helper="baseCommission77History"
                        max-height="100%"
                        min-height="150px"
                        title="سوابق کمیسیون 77"
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
        <fit>
          <safa-datatable
            v-model="value.Base_Dig"
            fit
            height="100%"
            helper="baseDig"
            max-height="100%"
            min-height="150px"
            title="حفاری"
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
