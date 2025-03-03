<template>
  <fit>
      <safa-group
        :m="m"
              label-width="140px"

      >
        <safa-combo
          label="وضعيت تاريخي بنا"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
        />
        <safa-text
          label="قدمت ساختمان از"
          type="number"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
        />
        <safa-text
          label="قدمت ساختمان تا"
          type="number"
          v-model="value.Base_BuildingInfo.CreateYearTo"
        />

        <safa-combo
          label="وضعيت استحكام بنا"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
        />
        <safa-datepicker
          label="تاريخ شروع عمليات ساختمانی"
          v-model="value.Base_BuildingInfo.StartDate"
        />
        <safa-datepicker
          label="تاريخ اتمام عمليات ساختمانی"
          v-model="value.Base_BuildingInfo.EndDate"
        />

        <safa-combo
          label="بهره بردار"
          ci-name="CI_HouseUser"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_HouseUser"
        />

      </safa-group>
  <safa-splitter
      v-model="verticalSplitterModel"
      vertical
      class="fit "
      margin="0"
    >
      <template v-slot:before>
        <fit className="q-pt-sm">
            <safa-datatable
              title="پخ ها"
              helper="baseBezel"
              :m="m"
              v-model="value.Base_Bezel"
           fit
            height="100%"
            max-height="100%"
            />
     </fit>
      </template>

      <template v-slot:after>
        <fit className="q-pt-sm">
            <safa-datatable
              title="دهانه"
              helper="baseGap"
              :m="m"
              v-model="value.Base_Gap"
          fit
            height="100%"
            max-height="100%"
            />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabOther',
  data () {
    return {
      verticalSplitterModel: 50
    }
  },

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
