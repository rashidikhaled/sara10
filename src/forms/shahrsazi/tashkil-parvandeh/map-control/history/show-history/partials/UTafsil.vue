<template>
  <fit>
    <safa-splitter
      v-model="gridSplitter"
      horizontal
      class="fit"
    >
      <template #before>
        <div class="row q-col-gutter-x-sm full-height">
          <div
            class="col-12 col-md-6 q-mb-sm q-mb-md-none"
            style="min-height:150px"
          >
            <safa-datatable
              v-model="value.Base_OtherEquipment"
              :m="m"
              helper="shahrsazi.extra_otherInTafsilTab"
              :loadingAnimation="false"
              title="سایر امکانات"
              height="100%"
              ma-height="100%"
            ></safa-datatable>
          </div>
          <div
            class="col-12 col-md-6 q-mb-sm q-mb-md-none"
            style="min-height:150px"
          >
            <safa-datatable
              v-model="mosavvabItems"
              ref="grid"
              name="grid"
              helper="shahrsazi.tarhVaKarbaryeMosavab"
              title="طرح و کاربری مصوب"
              height="100%"
              ma-height="100%"
            ></safa-datatable>
          </div>
        </div>
      </template>
      <template #after>
        <div class="row q-col-gutter-x-sm full-height">
          <div
            class="col-12 col-md-6 q-mb-sm q-mb-md-none"
            style="min-height:150px"
          >
            <safa-datatable
              v-model="mojazItems"
              ref="grid"
              name="grid"
              helper="shahrsazi.tarhVaKarbaryeMojaz"
              title="طرح و کاربری مجاز"
              height="100%"
              ma-height="100%"
            ></safa-datatable>
          </div>
          <div
            class="col-12 col-md-6 q-mb-sm q-mb-md-none"
            style="min-height:150px"
          >
            <safa-datatable
              v-model="amalItems"
              ref="grid"
              name="grid"
              helper="shahrsazi.tarhVaKarbaryeMelakeAmal"
              title="طرح و کاربری ملاک عمل"
              height="100%"
              ma-height="100%"
            ></safa-datatable>
          </div>
        </div>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      otherItems: [],
      mosavvabItems: [],
      mojazItems: [],
      amalItems: [],
      gridSplitter: 50
    }
  },
  props: {
    value: Object,
    m: String
  },
  mounted () {
    this.value.Base_OtherEquipment = []

    this.otherItems = this.value.Base_OtherEquipment

    this.mosavvabItems = this.value.Base_PlanMosavab

    this.mojazItems = this.value.Base_PlanMojaz

    this.amalItems = this.value.Base_PlanForWork
  },
  watch: {
    value: function () {
      this.otherItems = this.value.Base_OtherEquipment

      this.mosavvabItems = this.value.Base_PlanMosavab

      this.mojazItems = this.value.Base_PlanMojaz

      this.amalItems = this.value.Base_PlanForWork
    }
  },
  methods: {
    rowUpdated (e) {
      this.value.Base_OtherEquipment = e.gridItems
    },
    comboChanged (combo) {
      combo.dataItem.CI_OtherEquipmentGroup = combo.value

      combo.dataItem.CI_OtherEquipmentType = combo.value
    }
  }
}
</script>
