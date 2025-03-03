<template>
  <safa-form
    id="f309a704-4f5b-4faa-a356-86acf69f5275"
    caption="شهرسازی- جزئیات ضابطه"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <fit>
      <safa-splitter
        v-model="splitterModel"
        vertical
        fit
        :min-height="$q.screen.lt.md ? '350px' : '150px'"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              :m="m"
              helper="extra_zavabetMojaz"
              title="طرح و کاربری مجاز"
              v-model="results.Base_PlanMojaz"
              cdcName="Base_PlanMojaz"
              fit
              height="100%"
              max-height="100%"
              min-height="100%"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-datatable
              :m="m"
              helper="zavabetMosavab"
              v-model="results.Base_PlanMosavab"
              cdcName="Base_PlanMosavab"
              title="طرح و کاربری مصوب"
              fit
              max-height="100%"
            />
          </fit>
        </template>
      </safa-splitter>
      <safa-datatable
        :m="m"
        helper="extra_zavabetMelak"
        v-model="results.Base_PlanForWork"
        cdcName="Base_PlanForWork"
        title="طرح و کاربری ملاک عمل"
        fit
        class="q-mt-sm"
      />
    </fit>
  </safa-form>
</template>
<script>
export default {
  data: function () {
    return {
      splitterModel: 50
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
