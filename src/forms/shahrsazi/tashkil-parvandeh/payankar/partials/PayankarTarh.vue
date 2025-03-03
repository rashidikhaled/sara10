<template>
  <fit>
    <safa-splitter v-model="gridsplitterTop" class="fit" horizontal margin="0">
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_PlanMosavab"
            ref="grid2"
            helper="payankarTarhUserAccept"
            title="طرح و کاربری مصوب"
            margin="0"
            height="100%"
            :bordered="false"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="gridsplitter"
            class="fit"
            horizontal
            margin="0"
            min-height="250px"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  class="fit"
                  v-model="value.Base_PlanMojaz"
                  ref="grid2"
                  helper="payankarTarhUserValid"
                  title="طرح و کاربری مجاز"
                  height="100%"
                  max-height="100%"
                  :bordered="false"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  class="fit"
                  v-model="value.Base_PlanForWork"
                  ref="grid2"
                  helper="payankarTarhUserMalek"
                  title="طرح و کاربری ملاک عمل"
                  height="100%"
                  max-height="100%"
                  :bordered="false"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>

    <q-separator class="q-mb-sm" />
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      gridsplitter: 50,
      gridsplitterTop: 50
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
