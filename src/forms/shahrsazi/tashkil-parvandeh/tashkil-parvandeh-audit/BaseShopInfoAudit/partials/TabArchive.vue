<template>
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
              <fit className="q-pb-sm q-pr-sm">
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
              <fit className="q-pb-sm q-pl-sm">
                <safa-datatable
                  title="سوابق شهرسازی پدر"
                  helper="baseShahrsaziArchiveHouse"
                  :m="m"
                  v-model="value.Base_ShahrsaziArchiveHouse"
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
            vertical
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit className="q-pt-sm q-pr-sm">
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
            <template v-slot:after>
              <fit className="q-pt-sm q-pl-sm">
                <safa-datatable
                  title="سوابق کمیسیون 77"
                  helper="baseCommission77History"
                  :m="m"
                  v-model="value.Base_Commission77History"
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
