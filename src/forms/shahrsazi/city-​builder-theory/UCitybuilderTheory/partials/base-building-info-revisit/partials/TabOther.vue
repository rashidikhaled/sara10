<template>
  <fit>
    <internal-section>
      <safa-group :m="m" label-width="130px" margin="0">
        <safa-text
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          cdcName="CreateYearFrom"
          label="قدمت ساختمان از"
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.CreateYearTo"
          cdcName="CreateYearTo"
          label="قدمت ساختمان تا"
          type="number"
        />

        <safa-datepicker
          v-model="value.Base_BuildingInfo.StartDate"
          cdcName="StartDate"
          label="تاريخ شروع عمليات ساختمانی"
        />
        <safa-datepicker
          v-model="value.Base_BuildingInfo.EndDate"
          cdcName="EndDate"
          label="تاريخ اتمام عمليات ساختمانی"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          cdcName="CI_HistoricalStatus"
          :m="m"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          label="وضعيت تاريخي بنا"
          label-width="130px"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          cdcName="CI_StableStatus"
          :m="m"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          label="وضعيت استحكام بنا"
          label-width="130px"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_HouseUser"
          cdcName="CI_HouseUser"
          :m="m"
          ci-name="CI_HouseUser"
          class="col-12 col-sm-6 col-md-4 q-mb-md"
          domain-name="CI_SaraM1"
          label="بهره بردار"
          label-width="130px"
        />
      </safa-group>
    </internal-section>
    <safa-splitter
      v-model="verticalSplitter"
      cdcName="verticalSplitter"
      :horizontal="$q.screen.lt.md"
      :min-height="$q.screen.lt.md ? '500px' : '150px'"
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_Bezel"
            cdcName="Base_Bezel"
            :m="m"
            fit
            height="100%"
            helper="baseBezel"
            max-height="100%"
            title="پخ ها"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Base_Gap"
            cdcName="Base_Gap"
            :m="m"
            fit
            height="100%"
            helper="baseGap"
            max-height="100%"
            title="دهانه"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
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
  },
  data () {
    return {
      verticalSplitter: 50
    }
  }
}
</script>
