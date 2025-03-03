<template>
  <safa-splitter
    v-model="gridSplitter"
    class="fit"
    horizontal
    margin="0"
    :min-height="$q.screen.gt.md ? '150px':'600px' "
  >
    <template v-slot:before>
      <safa-splitter
        v-model="gridSplitter"
        cdcName="gridSplitter"
        class="fit"
        :horizontal="$q.screen.lt.md"
        margin="0"
      >
        <template v-slot:before>
          <safa-datatable
            :m="m"
            helper="zavabetMosavab"
            v-model="results.Base_PlanMosavab"
            cdcName="Base_PlanMosavab"
            title="طرح و کاربری مصوب"
            class="fit"
            margin="0"
            height="100%"
            min-height="100px"
          />
        </template>

        <template v-slot:after>
          <safa-datatable
            :m="m"
            helper="extra_zavabetMojaz"
            v-model="results.Base_PlanMojaz"
            cdcName="Base_PlanMojaz"
            title="طرح و کاربری مجاز"
            class="fit"
            margin="0"
            height="100%"
            min-height="100px"
          />
          <!--
            :addRow="false"
            :deleteRow="false"
            -->
        </template>
      </safa-splitter>
    </template>
    <template v-slot:after>
      <safa-datatable
        :m="m"
        helper="extra_zavabetMelak"
        v-model="results.Base_PlanForWork"
        cdcName="Base_PlanForWork"
        title="طرح و کاربری ملاک عمل"
        class="fit"
        margin="0"
        height="100%"
        min-height="100px"
      />
    </template>
  </safa-splitter>
</template>
<script>
export default {
  data: function () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
