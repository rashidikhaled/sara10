<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitterModel"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '800px' : '150px'"
    >
      <template v-slot:before>
        <safa-splitter
          v-model="firstVerticalSplitter"
          :horizontal="$q.screen.lt.lg"
          class="fit"
          margin="0"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                v-model="results.Base_OtherEquipment"
                cdcName="Base_OtherEquipment"
                :m="m"
                helper="extra_otherInTafsilTab"
                :loadingAnimation="false"
                title="سایر امکانات"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                v-model="results.Base_PlanMosavab"
                cdcName="Base_PlanMosavab"
                ref="grid"
                name="grid"
                m="r"
                helper="shahrsazi.tarhVaKarbaryeMosavab"
                title="طرح و کاربری مصوب"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <safa-splitter
          v-model="secondVerticalSplitter"
          :horizontal="$q.screen.lt.lg"
          class="fit"
          margin="0"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                v-model="results.Base_PlanMojaz"
                cdcName="Base_PlanMojaz"
                ref="grid"
                name="grid"
                m="r"
                helper="shahrsazi.tarhVaKarbaryeMojaz"
                title="طرح و کاربری مجاز"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                v-model="results.Base_PlanForWork"
                cdcName="Base_PlanForWork"
                ref="grid"
                name="grid"
                m="r"
                helper="shahrsazi.tarhVaKarbaryeMelakeAmal"
                title="طرح و کاربری ملاک عمل"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      horizontalSplitterModel: 50,
      firstVerticalSplitter: 50,
      secondVerticalSplitter: 50,
      otherItems: [],
      mosavvabItems: [],
      mojazItems: [],
      amalItems: []
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
