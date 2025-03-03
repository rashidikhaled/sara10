<template>
  <section>
    <safa-group
      :size="{
        md: 4,
        lg: 4,
        sm: 2,
        xs: 1
}"
      :label-shrink="labelShrink"
      label-width="130px"
      :m="m"
    >

      <safa-combo
        label="وضعيت تاريخي بنا "
        ci-name="CI_HistoricalStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
      />
      <safa-text
        label="قدمت ساختمان از "
        type="number"
        v-model="value.Base_BuildingInfo.CreateYearFrom"
      />
      <safa-datepicker
        label="تاريخ شروع عمليات ساختمانی "
        v-model="value.Base_BuildingInfo.StartDate"
      />

      <!-- row 2 -->
      <safa-combo
        label="وضعيت استحكام بنا "
        ci-name="CI_StableStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_StableStatus"
      />
      <safa-text
        label="قدمت ساختمان تا "
        type="number"
        v-model="value.Base_BuildingInfo.CreateYearTo"
      />
      <safa-datepicker
        label="تاريخ اتمام عمليات ساختمانی "
        v-model="value.Base_BuildingInfo.EndDate"
      />

      <!-- row 3 -->
      <safa-combo
        label="بهره بردار "
        ci-name="CI_HouseUser"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_HouseUser"
      />

    </safa-group>
    <safa-datatable
      helper="baseBezel"
      title="پخ ها"
      :m="m"
      :data-items="value.Base_Bezel"
      class="q-my-lg"
      :margin="null"
    />

    <safa-datatable
      helper="baseGap"
      title="دهانه"
      :m="m"
      :data-items="value.Base_Gap"
    />

  </section>
</template>

<script>
export default {
  name: 'PartialOtherInfoTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
