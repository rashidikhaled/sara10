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
        type="number"
      />
      <safa-text
        label="شماره سند اعیان"
        v-model="value.Base_HouseInfo.AyanDocNo"
        type="number"
      />

      <!-- row 2 -->
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

      <!-- row 3 -->
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

      <!-- row 4 -->
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
    </safa-group>

    <safa-checkbox
      class="q-mb-sm"
      label="حقوق ارتفاقی"
      v-model="value.Base_HouseInfo.HoughogheErtefaghi"
    />
    <fit>
      <safa-datatable
        helper="baseRegisterPlack"
        title="پلاک ثبتی"
        :m="m"
        v-model="value.Base_RegisterPlack"
        height="200px"
        class="q-mb-sm"
      />
      <text-template
        label="ملاحضات سند"
        identifier="d18545e6-b8b1-4523-898a-9c9392575c93"
        :m="m"
        v-model="value.Base_CommonEstate.DocComments"
        formKey="d6b01c98-8b33-4ba2-9f57-f22428126b63"
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
      type: Object
    }
  }
}
</script>
