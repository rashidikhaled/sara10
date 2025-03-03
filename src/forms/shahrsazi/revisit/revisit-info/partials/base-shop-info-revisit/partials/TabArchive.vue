<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      :min-height="$q.screen.lt.md ? '800px' : '150px'"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            :horizontal="$q.screen.lt.md"
            class="fit"
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
                  title="سوابق شهرسازی"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.Base_ShahrsaziArchiveHouse"
                  cdcName="Base_ShahrsaziArchiveHouse"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseShahrsaziArchiveHouse"
                  max-height="100%"
                  title="سوابق شهرسازی پدر"
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
            :horizontal="$q.screen.lt.md"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_CommissionHistory"
                  cdcName="Base_CommissionHistory"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseCommissionHistory"
                  max-height="100%"
                  title="سوابق کمیسیونها"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.Base_Commission77History"
                  cdcName="Base_Commission77History"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseCommission77History"
                  max-height="100%"
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
      verticalSplitter: 50,
      horizontalSplitter: 50
    }
  }
}
</script>
