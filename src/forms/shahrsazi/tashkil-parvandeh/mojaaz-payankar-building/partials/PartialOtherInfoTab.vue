<template>
  <fit>
    <safa-group
      label-width="120px"
      :m="m"
    >
      <!-- row 1 -->
      <safa-combo
        label="وضعيت تاريخي بنا "
        ci-name="CI_HistoricalStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
        :label-width="$q.screen.gt.xs ? '120px':'auto'"
      />
      <safa-text
        label="قدمت ساختمان از "
        type="number"
        v-model="value.Base_BuildingInfo.CreateYearFrom"
      />

     <safa-combo
        label="بهره بردار "
        ci-name="CI_HouseUser"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_HouseUser"
      />
      <!-- row 2 -->
      <safa-combo
        label="وضعيت استحكام بنا "
        ci-name="CI_StableStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_StableStatus"
        :label-width="$q.screen.gt.sm ? '120px':'auto'"
      />
      <safa-text
        label="قدمت ساختمان تا "
        type="number"
        v-model="value.Base_BuildingInfo.CreateYearTo"
      />
      <safa-datepicker
        label="تاريخ اتمام عمليات ساختمانی "
        v-model="value.Base_BuildingInfo.EndDate"
        :label-width="$q.screen.gt.sm ? '120px':'auto'"
      />
     <safa-datepicker
        label="تاريخ شروع عمليات ساختمانی "
        v-model="value.Base_BuildingInfo.StartDate"
      />
      <!-- row 3 -->

    </safa-group>
    <safa-splitter
      horizontal
      v-model="splitterModel"
      style="min-height:250px"
    >
      <template #before>
        <safa-datatable
          title="پخ ها"
          helper="baseBezel"
          :m="m"
          v-model="value.Base_Bezel"
          fit
          max-height="100%"
          height="100%"
        />
      </template>
      <template #after>
        <safa-datatable
          helper="baseGap"
          title="دهانه"
          :m="m"
          v-model="value.Base_Gap"
          fit
          max-height="100%"
          height="100%"
        />
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'PartialOtherInfoTab',
  data: function () {
    return {
      splitterModel: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
