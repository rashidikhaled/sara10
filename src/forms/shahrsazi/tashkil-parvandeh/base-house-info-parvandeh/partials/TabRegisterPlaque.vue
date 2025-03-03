<template>
  <fit>
    <safa-group
      label-width="110px"
      :m="m"
      margin="0"
      :size="{
        md: 4,
        lg: 4,
        sm: 2,
        xs: 1,
      }"
    >
      <safa-custom-text
        label="مساحت طبق سند"
        v-model="value.Base_HouseInfo.DocArea"
        cdcName="DocArea"
        type="decimal"
        label-width="110px"
        :m="m"
      />
      <safa-text
        label="بخش ثبتی"
        v-model="value.Base_CommonEstate.RegisterSection"
        cdcName="RegisterSection"
        label-width="110px"
        :m="m"
      />
      <safa-text
        label="شماره سند اعیان"
        v-model="value.Base_HouseInfo.AyanDocNo"
        cdcName="AyanDocNo"
        type="number"
        label-width="110px"
        :m="m"
      />
      <safa-combo
        label="نوع سند"
        ci-name="CI_DocType"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocType"
        cdcName="CI_DocType"
        label-width="110px"
        :m="m"
      />
      <safa-text
        label="شماره قطعه"
        v-model="value.Base_HouseInfo.PieceNo"
        cdcName="PieceNo"
        type="number"
        label-width="110px"
        :m="m"
      />
      <safa-datepicker
        label="تاریخ صدور سند"
        v-model="value.Base_CommonEstate.DocExportDate"
        cdcName="DocExportDate"
        label-width="110px"
        :m="m"
      />
      <safa-combo
        label="مرجع صدور سند"
        ci-name="CI_DocRefrence"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocRefrence"
        cdcName="CI_DocRefrence"
        label-width="110px"
        :m="m"
      />
      <safa-text
        label="شماره سند عرصه"
        v-model="value.Base_HouseInfo.ArsehDocNo"
        cdcName="ArsehDocNo"
        type="number"
        label-width="110px"
        :m="m"
      />
      <safa-datepicker
        label="تاریخ انتقال سند"
        v-model="value.Base_CommonEstate.DocTransferDate"
        cdcName="DocTransferDate"
        label-width="110px"
        :m="m"
      />
      <safa-combo
        label="وضعیت سند"
        ci-name="CI_DocStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocStatus"
        cdcName="CI_DocStatus"
        label-width="110px"
        :m="m"
      />
      <safa-custom-text
        label="مساحت سند مادر"
        v-model="value.Base_HouseInfo.MotherDocArea"
        cdcName="MotherDocArea"
        type="decimal"
        label-width="110px"
        :m="m"
      />
      <safa-combo
        label="وضعیت سند مادر"
        ci-name="CI_MotherDocStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_MotherDocStatus"
        cdcName="CI_MotherDocStatus"
        label-width="110px"
        :m="m"
      />
    </safa-group>
    <safa-checkbox
      class="q-mb-sm"
      label="حقوق ارتفاقی"
      v-model="value.Base_HouseInfo.HoughogheErtefaghi"
      cdcName="HoughogheErtefaghi"
      label-width="110px"
      :m="m"
    />
    <fit>
    <safa-datatable
      helper="baseRegisterPlack"
      :m="m"
      v-model="value.Base_RegisterPlack"
      cdcName="Base_RegisterPlack"
      title="پلاک ثبتی"
      height="100%"
      max-height="600px"
      class="q-mb-sm"
    />
    <!-- :delete-row="false" -->
    </fit>
    <div>
      <text-template
        label="ملاحظات سند"
        class="col-12"
        :m="m"
        v-model="value.Base_CommonEstate.DocComments"
        cdcName="DocComments"
        :rows="$q.screen.lt.lg ? 1 :3"
        formKey="e4e769c2-21c1-45d0-9ae8-60c31d0f9ad9"
      />
    </div>
  </fit>
</template>

<script>
export default {
  name: "TabRegisterPlaque",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
