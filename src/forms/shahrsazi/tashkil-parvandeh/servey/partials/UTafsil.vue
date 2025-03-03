<template>
  <fit>
    <safa-datatable
      v-model="results.Base_PlanMosavab"
      ref="grid"
      name="grid"
      helper="shahrsazi.tarhVaKarbaryeMosavab"
      :allowRemoveRow="false"
      :addRow="true"
      :allowCopy="false"
      title="طرح و کاربری مصوب"
      class="q-mb-sm"
      height="300px"
    />

    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      vertical
      margin="0"
      :min-height="$q.screen.lt.lg? '250px' : '100px'"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="results.Base_PlanMojaz"
            ref="grid"
            name="grid"
            helper="shahrsazi.tarhVaKarbaryeMojaz"
            :hideToolbar="true"
            :allowNewRow="false"
            :allowRemoveRow="false"
            :allowCopy="false"
            title="طرح و کاربری مجاز"
            fit
            margin="0"
            height="100%"
            min-height="50px"
          />
        </fit>
      </template>

      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="results.Base_PlanForWork"
            ref="grid"
            name="grid"
            helper="shahrsazi.tarhVaKarbaryeMelakeAmal"
            :hideToolbar="true"
            :allowNewRow="false"
            :allowRemoveRow="false"
            :allowCopy="false"
            title="طرح و کاربری ملاک عمل"
            fit
            margin="0"
            height="100%"
            min-height="50px"
          />
        </fit>
      </template>
    </safa-splitter>

  </fit>
</template>

<script>
export default {
  name: 'baro-kaf-info',
  title: 'اطلاعات برو کف',
  data () {
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
