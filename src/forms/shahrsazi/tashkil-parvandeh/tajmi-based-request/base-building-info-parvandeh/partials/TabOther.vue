<template>
  <fit>
    <safa-group
      label-width="140px"
      :m="m"
    >
      <safa-text
        label="قدمت ساختمان از "
        type="number"
        v-model="value.Base_BuildingInfo.CreateYearFrom"
      />
      <safa-text
        label="قدمت ساختمان تا "
        type="number"
        v-model="value.Base_BuildingInfo.CreateYearTo"
      />

      <safa-datepicker
        label="تاريخ شروع عمليات ساختمانی "
        v-model="value.Base_BuildingInfo.StartDate"
      />

      <!-- row 2 -->
      <safa-datepicker
        label="تاريخ اتمام عمليات ساختمانی "
        v-model="value.Base_BuildingInfo.EndDate"
      />
      <safa-combo
        label="وضعيت تاريخي بنا "
        ci-name="CI_HistoricalStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
      />

      <safa-combo
        label="وضعيت استحكام بنا "
        ci-name="CI_StableStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_StableStatus"
      />

      <!-- row 3 -->
      <safa-combo
        label="بهره بردار "
        ci-name="CI_HouseUser"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_HouseUser"
      />
    </safa-group>
    <div class="fit">
      <div class="row full-height q-col-gutter-x-sm ">
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              helper="baseBezel"
              title="پخ ها"
              :m="m"
              v-model="value.Base_Bezel"
              height="100%"
              max-height="100%"
              min-height="150px"
              margin="0"
              class="fit"
            />
          </fit>
        </div>
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              helper="baseGap"
              title="دهانه"
              :m="m"
              height="100%"
              v-model="value.Base_Gap"
              max-height="100%"
              min-height="150px"
              margin="0"
              class="fit"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'TabOther',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
