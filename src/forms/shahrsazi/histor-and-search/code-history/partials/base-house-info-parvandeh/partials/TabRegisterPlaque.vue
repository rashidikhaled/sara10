<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          v-model="value.Base_HouseInfo.DocArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت طبق سند"
          type="decimal"
        />
        <safa-text
          v-model="value.Base_CommonEstate.RegisterSection"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="بخش ثبتی"
        />
        <safa-text
          v-model="value.Base_HouseInfo.AyanDocNo"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="شماره سند اعیان"
        />

        <!-- row 2 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocType"
          :m="m"
          ci-name="CI_DocType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع سند"
        />
        <safa-text
          v-model="value.Base_HouseInfo.PieceNo"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="شماره قطعه"
          type="number"
        />
        <safa-datepicker
          v-model="value.Base_CommonEstate.DocExportDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاریخ صدور سند"
        />

        <!-- row 3 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocRefrence"
          :m="m"
          ci-name="CI_DocRefrence"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="مرجع صدور سند"
        />
        <safa-text
          v-model="value.Base_HouseInfo.ArsehDocNo"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="شماره سند عرصه"
        />
        <safa-datepicker
          v-model="value.Base_CommonEstate.DocTransferDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاریخ انتقال سند"
        />

        <!-- row 4 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocStatus"
          :m="m"
          ci-name="CI_DocStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="وضعیت سند"
        />
        <safa-text
          v-model="value.Base_HouseInfo.MotherDocArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت سند مادر"
          type="decimal"
        />
        <safa-checkbox
          v-model="value.Base_HouseInfo.HoughogheErtefaghi"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="حقوق ارتفاقی"
        />

        <!-- row 5 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocStatus"
          :m="m"
          ci-name="CI_MotherDocStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="وضعیت سند مادر"
        />
        <div class="col-0 col-sm-6 col-md-8"/>

      </q-card-section>
    </q-card>
    <q-separator class="q-mb-md" inset/>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12">
          <div class="col-12 section-title">پلاک ثبتی:</div>
          <safa-datagrid
            v-model="value.Base_RegisterPlack"
            :m="m"
            class="col-12"
            helper="baseRegisterPlack"
            style="height: 15rem"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12">
          <div class="col-12 section-title">ملاحضات سند:</div>
          <text-template
            v-model="value.Base_CommonEstate.DocComments"
            :m="m"
            class="col-12 col-sm-6"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabRegisterPlaque',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
