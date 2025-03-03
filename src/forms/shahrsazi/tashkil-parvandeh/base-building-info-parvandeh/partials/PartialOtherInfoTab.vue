<template>
  <fit>
    <Form-row class="q-mb-sm">
      <form-control>
        <safa-combo
          label="وضعيت تاريخي بنا "
          label-width="130px"
          :m="m"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          cdcName="CI_HistoricalStatus"
        />
      </form-control>
      <form-control>
        <safa-text
          label="قدمت ساختمان از "
          label-width="130px"
          :m="m"
          type="number"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          cdcName="CreateYearFrom"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاريخ شروع عمليات ساختمانی "
          label-width="130px"
          :m="m"
          v-model="value.Base_BuildingInfo.StartDate"
          cdcName="StartDate"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="وضعيت استحكام بنا "
          label-width="130px"
          :m="m"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          cdcName="CI_StableStatus"
        />
      </form-control>
      <form-control>
        <safa-text
          label="قدمت ساختمان تا "
          label-width="130px"
          :m="m"
          type="number"
          v-model="value.Base_BuildingInfo.CreateYearTo"
          cdcName="CreateYearTo"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاريخ اتمام عمليات ساختمانی "
          label-width="130px"
          :m="m"
          v-model="value.Base_BuildingInfo.EndDate"
          cdcName="EndDate"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="بهره بردار "
          label-width="130px"
          :m="m"
          ci-name="CI_HouseUser"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_HouseUser"
          cdcName="CI_HouseUser"
        />
      </form-control>
    </Form-row>
    <safa-splitter v-model="spliterModel" class="fit">
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="baseBezel"
            title="پخ ها"
            :m="m"
            v-model="value.Base_Bezel"
            cdcName="Base_Bezel"
            fit
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            helper="baseGap"
            title="دهانه"
            :m="m"
            fit
            v-model="value.Base_Gap"
            cdcName="Base_Gap"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "PartialOtherInfoTab",

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
