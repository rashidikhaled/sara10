<template>
  <fit>
    <text-template
      label="نظرات برو کف"
      :label-shrink="false"
      formKey="ac307e96-e1a3-465a-b236-1808a36990c3"
      v-model="results.Sh_BaroKaf.BarKafComments"
      :m="m"
      class="q-mb-md"
    />

    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="mosavab"
            ref="grid"
            name="grid"
            helper="shahrsazi.tarhVaKarbaryeMosavab"
            :hideToolbar="true"
            :allowRemoveRow="false"
            :addRow="true"
            :allowCopy="false"
            title="طرح و کاربری مصوب"
            class="q-pb-sm"
            fit
            margin="0"
            height="100%"
            min-height="200px"
          />
        </fit>
      </template>

      <safa-splitter
        v-model="gridSplitter"
        class="fit"
        horizontal
        margin="0"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              :data-items="mojaz"
              ref="grid"
              name="grid"
              helper="shahrsazi.tarhVaKarbaryeMojaz"
              :hideToolbar="true"
              :allowNewRow="false"
              :allowRemoveRow="false"
              :allowCopy="false"
              title="طرح و کاربری مجاز"
              class="q-pt-sm q-pb-sm"
              fit
              margin="0"
              height="100%"
              min-height="200px"
            />
          </fit>
        </template>

        <template v-slot:after>
          <fit>
            <safa-datatable
              :data-items="amal"
              ref="grid"
              name="grid"
              helper="shahrsazi.tarhVaKarbaryeMelakeAmal"
              :hideToolbar="true"
              :allowNewRow="false"
              :allowRemoveRow="false"
              :allowCopy="false"
              title="طرح و کاربری ملاک عمل"
              class="q-pt-sm q-pb-sm"
              fit
              margin="0"
              height="100%"
              min-height="200px"
            />
          </fit>
        </template>
      </safa-splitter>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'baro-kaf-info',
  title: 'اطلاعات برو کف',
  data () {
    return {
      gridSplitter: 50,
      mosavab: [],
      mojaz: [],
      amal: [],
      splitterModel: 50
    }
  },
  props: {
    results: Object,
    m: String
  },
  mounted () {
    this.mosavab = this.results.Base_PlanMosavab

    this.mojaz = this.results.Base_PlanMojaz

    this.amal = this.results.Base_PlanForWork
  }
}
</script>
