<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.md ? '800px' : '150px'"
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
                  helper="shahrsaziApartmentArchive"
                  :m="m"
                  v-model="value.Base_ShahrsaziArchive"
                  cdcName="Base_ShahrsaziArchive"
                  :allowCopy="true"
                  :copyWithCount="true"
                  :selectable="true"
                  :allowMultipleSelection="false"
                  title="سوابق شهرسازی"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="100px"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  helper="baseShahrsaziArchiveHouse"
                  :m="m"
                  v-model="value.Base_ShahrsaziArchiveHouse"
                  cdcName="Base_ShahrsaziArchiveHouse"
                  :allowCopy="true"
                  :copyWithCount="true"
                  :selectable="true"
                  :allowMultipleSelection="false"
                  title="سوابق شهرسازی ملک"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="100px"
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
                  helper="baseCommissionHistory"
                  :m="m"
                  v-model="value.Base_CommissionHistory"
                  cdcName="Base_CommissionHistory"
                  title="سوابق کمیسیون ها"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="100px"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  helper="baseCommission77History"
                  :m="m"
                  v-model="value.Base_Commission77History"
                  cdcName="Base_Commission77History"
                  title="سوابق کمیسیون 77"
                  :margin="null"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="100px"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>

    <safa-datatable
      helper="baseDig"
      :m="m"
      v-model="value.Base_Dig"
      cdcName="Base_Dig"
      title="سوابق حفاری"
      height="150px"
      class="q-mt-sm"
    />
  </fit>
</template>

<script>
export default {
  name: "TabBaseArchive",
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
