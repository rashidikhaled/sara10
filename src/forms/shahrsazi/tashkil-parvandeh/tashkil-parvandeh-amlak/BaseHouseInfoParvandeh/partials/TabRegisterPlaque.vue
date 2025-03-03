<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت طبق سند"
          :m="m"
          v-model="value.Base_HouseInfo.DocArea"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="بخش ثبتی"
          :m="m"
          v-model="value.Base_CommonEstate.RegisterSection"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="شماره سند اعیان"
          :m="m"
          v-model="value.Base_HouseInfo.AyanDocNo"
          label-width="100px"
          type="number"
        />

        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع سند"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocType"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="شماره قطعه"
          :m="m"
          v-model="value.Base_HouseInfo.PieceNo"
          label-width="100px"
          type="number"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="تاریخ صدور سند"
          :m="m"
          v-model="value.Base_CommonEstate.DocExportDate"
          label-width="100px"
        />

        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="مرجع صدور سند"
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocRefrence"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="شماره سند عرصه"
          :m="m"
          v-model="value.Base_HouseInfo.ArsehDocNo"
          label-width="100px"
          type="number"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="تاریخ انتقال سند"
          :m="m"
          v-model="value.Base_CommonEstate.DocTransferDate"
          label-width="100px"
        />

        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="وضعیت سند"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          label-width="100px"
        />
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت سند مادر"
          :m="m"
          v-model="value.Base_HouseInfo.MotherDocArea"
          label-width="100px"
        />

        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="وضعیت سند مادر"
          ci-name="CI_MotherDocStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          label-width="100px"
        />
        <safa-checkbox
          class="col-12 col-sm-6 col-md-3"
          label="حقوق ارتفاقی"
          :m="m"
          v-model="value.Base_HouseInfo.HoughogheErtefaghi"
        />
      </div>
    </internal-section>
    <safa-datatable
      title="پلاک ثبتی"
      class="q-mb-sm"
      helper="baseRegisterPlack"
      height="200px"
      :m="m"
      v-model="value.Base_RegisterPlack"
    />

    <text-template
      label="ملاحضات سند"
      identifier="bd1632ad-b0f9-49aa-8f6a-65b0b22f9c5b"
      :m="m"
      v-model="value.Base_CommonEstate.DocComments"
      formKey="e0adad0e-7c7d-45a9-bf5d-007736291327"
    />
  </fit>
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
