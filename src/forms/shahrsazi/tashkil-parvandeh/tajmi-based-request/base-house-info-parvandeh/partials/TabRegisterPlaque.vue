<template>
  <fit>
    <safa-group
      label-width="110px"
      :m="m"
      margin="0"
      :size="{
        md: 4,
        lg:4,
        sm: 2,
        xs: 1
}"
    >
      <safa-custom-text
        label="مساحت طبق سند"
        v-model="value.Base_HouseInfo.DocArea"
        type="decimal"
        label-width="110px"
        :m="m"
      />
      <safa-text
        label="بخش ثبتی"
        v-model="value.Base_CommonEstate.RegisterSection"
      />
      <safa-text
        label="شماره سند اعیان"
        v-model="value.Base_HouseInfo.AyanDocNo"
        type="number"
      />
      <safa-combo
        label="نوع سند"
        ci-name="CI_DocType"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocType"
      />
      <safa-text
        label="شماره قطعه"
        v-model="value.Base_HouseInfo.PieceNo"
        type="number"
      />
      <safa-datepicker
        label="تاریخ صدور سند"
        v-model="value.Base_CommonEstate.DocExportDate"
      />
      <safa-combo
        label="مرجع صدور سند"
        ci-name="CI_DocRefrence"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocRefrence"
      />
      <safa-text
        label="شماره سند عرصه"
        v-model="value.Base_HouseInfo.ArsehDocNo"
        type="number"
      />
      <safa-datepicker
        label="تاریخ انتقال سند"
        v-model="value.Base_CommonEstate.DocTransferDate"
      />
      <safa-combo
        label="وضعیت سند"
        ci-name="CI_DocStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocStatus"
      />
      <safa-custom-text
        label="مساحت سند مادر"
        v-model="value.Base_HouseInfo.MotherDocArea"
        label-width="110px"
        :m="m"
      />
       <safa-combo
        label="وضعیت سند مادر"
        ci-name="CI_MotherDocStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_MotherDocStatus"
      />

    </safa-group>
    <safa-checkbox
      class="q-mb-sm"
      label="حقوق ارتفاقی"
      v-model="value.Base_HouseInfo.HoughogheErtefaghi"
    />
    <fit>
      <safa-datatable
        helper="baseRegisterPlack"
        :m="m"
        v-model="value.Base_RegisterPlack"
        title="پلاک ثبتی"
        :delete-row="false"
        height="200px"
        class="q-mb-sm"
      />
      <text-template
        label="ملاحظات سند"
        :m="m"
        v-model="value.Base_CommonEstate.DocComments"
        formKey="10f84701-ee3b-4b4a-9193-7d4f28f6fa35"
      />
    </fit>

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
