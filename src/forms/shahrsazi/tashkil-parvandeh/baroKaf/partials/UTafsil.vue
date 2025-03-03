<template>
  <fit>
    <safa-splitter v-model="gridSplitterHorizontal" horizontal>
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="mosavab"
            cdcName="mosavab"
            ref="grid"
            name="grid"
            helper="shahrsazi.tarhVaKarbaryeMosavab"
            :allowRemoveRow="false"
            :addRow="true"
            :allowCopy="false"
            title="طرح و کاربری مصوب"
            class="q-mb-sm"
            height="100%"
            min-height="150px"
          />
        </fit>
      </template>

      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="gridSplitter"
            class="fit"
            :horizontal="$q.screen.lt.lg"
            margin="0"
            :min-height="$q.screen.lt.lg ? '300px' : '150px'"
          >
            <template v-slot:before>
              <safa-datatable
                v-model="mojaz"
            cdcName="mojaz"
                :data-items="mojaz"
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
                min-height="150px"
              />
            </template>

            <template v-slot:after>
              <safa-datatable
                v-model="amal"
            cdcName="amal"
                :data-items="amal"
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
                min-height="150px"
              />
            </template>
          </safa-splitter>
          <fit>
            <div class="q-mt-sm q-ml-sm">
              <text-template
                label="نظرات برو کف"
                :label-shrink="false"
                :formKey="formKey"
                v-model="results.Sh_BaroKaf.BarKafComments"
                cdcName="BarKafComments"
                :m="m"
                :rows="4"
              />
            </div>
          </fit>
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
      gridSplitter: 50,
      gridSplitterHorizontal: 30,
      mosavab: [],
      mojaz: [],
      amal: []
    }
  },
  props: {
    results: Object,
    m: {
      type: String,
      default: 'e'
    },
    formKey: String
  },
  mounted () {
    this.mosavab = this.results.Base_PlanMosavab

    this.mojaz = this.results.Base_PlanMojaz

    this.amal = this.results.Base_PlanForWork
  },
  watch: {
    results () {
      this.mosavab = this.results.Base_PlanMosavab

      this.mojaz = this.results.Base_PlanMojaz

      this.amal = this.results.Base_PlanForWork
    }
  }
}
</script>
