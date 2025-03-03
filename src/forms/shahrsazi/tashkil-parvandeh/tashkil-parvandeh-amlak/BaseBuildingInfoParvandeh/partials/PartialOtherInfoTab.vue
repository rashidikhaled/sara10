<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="وضعيت تاريخي بنا"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="قدمت ساختمان از"
          type="number"
          :m="m"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="قدمت ساختمان تا"
          type="number"
          :m="m"
          v-model="value.Base_BuildingInfo.CreateYearTo"
          label-width="100px"
        />

        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="وضعيت استحكام بنا"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          label-width="100px"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="تاريخ شروع عمليات ساختمانی"
          :m="m"
          v-model="value.Base_BuildingInfo.StartDate"
          label-width="100px"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="تاريخ اتمام عمليات ساختمانی"
          :m="m"
          v-model="value.Base_BuildingInfo.EndDate"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="بهره بردار"
          ci-name="CI_HouseUser"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_HouseUser"
          label-width="100px"
        />
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="پخ ها"
              helper="baseBezel"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_Bezel"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="دهانه"
              helper="baseGap"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_Gap"
            />
          </fit>
        </div>
      </div>
    </div>
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
  }
}
</script>
