<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          :m="m"
          ci-name="CI_HistoricalStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="وضعيت تاريخي بنا :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="قدمت ساختمان از :"
          type="number"
        />
        <safa-datepicker
          v-model="value.Base_BuildingInfo.StartDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاريخ شروع عمليات ساختمانی :"
        />

        <!-- row 2 -->
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          :m="m"
          ci-name="CI_StableStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="وضعيت استحكام بنا :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.CreateYearTo"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="قدمت ساختمان تا :"
          type="number"
        />
        <safa-datepicker
          v-model="value.Base_BuildingInfo.EndDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاريخ اتمام عمليات ساختمانی :"
        />

        <!-- row 3 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_HouseUser"
          :m="m"
          ci-name="CI_HouseUser"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="بهره بردار :"
        />

      </q-card-section>
    </q-card>

    <q-separator class="q-my-md" inset/>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12">
          <div class="section-title">پخ ها :</div>
          <safa-datagrid
            v-model="value.Base_Bezel"
            :m="m"
            class="col-12"
            helper="baseBezel"
            style="height: 15rem"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12">
          <div class="section-title">دهانه :</div>
          <safa-datagrid
            v-model="value.Base_Gap"
            :m="m"
            class="col-12"
            helper="baseGap"
            style="height: 15rem"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

  </section>
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
