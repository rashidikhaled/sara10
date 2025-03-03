<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="قدمت ساختمان از "
          label-width="100px"
          :m="m"
          type="number"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          cdcName="CreateYearFrom"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="قدمت ساختمان تا "
          label-width="100px"
          :m="m"
          type="number"
          v-model="value.Base_BuildingInfo.CreateYearTo"
          cdcName="CreateYearTo"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاريخ شروع عمليات ساختمانی "
          label-width="100px"
          :m="m"
          v-model="value.Base_BuildingInfo.StartDate"
          cdcName="StartDate"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاريخ اتمام عمليات ساختمانی "
          label-width="100px"
          :m="m"
          v-model="value.Base_BuildingInfo.EndDate"
          cdcName="EndDate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعيت تاريخي بنا "
          label-width="100px"
          :m="m"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          cdcName="CI_HistoricalStatus"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعيت استحكام بنا "
          label-width="100px"
          :m="m"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          cdcName="CI_StableStatus"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="بهره بردار "
          label-width="100px"
          :m="m"
          ci-name="CI_HouseUser"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_HouseUser"
          cdcName="CI_HouseUser"
        />
      </FormControl>
    </FormRow>

    <safa-splitter v-model="spliterModel" class="fit">
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="baseBezel"
            title="پخ ها"
            :m="m"
            v-model="value.Base_Bezel"
            cdcName="Base_Bezel"
            height="100%"
            max-height="100%"
            min-height="150px"
            fit
            paginate
          />
        </fit>
      </template>
      <template v-slot:after>
        <safa-datatable
          helper="baseGap"
          title="دهانه"
          :m="m"
          height="100%"
          v-model="value.Base_Gap"
          cdcName="Base_Gap"
          max-height="100%"
          min-height="150px"
          fit
          paginate
        />
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabOther",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      spliterModel: 50
    }
  }
}
</script>
