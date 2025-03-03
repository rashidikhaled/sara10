<template>
  <fit>
    <internal-section>
      <safa-group
        :m="m"
        label-width="130px"
        margin="0"
      >
        <safa-text
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          label="قدمت ساختمان از"
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.CreateYearTo"
          label="قدمت ساختمان تا"
          type="number"
        />

        <safa-datepicker
          v-model="value.Base_BuildingInfo.StartDate"
          label="تاريخ شروع عمليات ساختمانی"
        />
        <safa-datepicker
          v-model="value.Base_BuildingInfo.EndDate"
          label="تاريخ اتمام عمليات ساختمانی"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          label="وضعيت تاريخي بنا"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          label="وضعيت استحكام بنا"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_HouseUser"
          ci-name="CI_HouseUser"
          class="col-12 col-sm-6 col-md-4 q-mb-md"
          domain-name="CI_SaraM1"
          label="بهره بردار"
        />
      </safa-group>
    </internal-section>
    <safa-splitter
      v-model="verticalSplitter"
      :horizontal="$q.screen.lt.md"
      :min-height="$q.screen.lt.md ? '500px' : '150px'"
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_Bezel"
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
