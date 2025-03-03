<template>
  <fit>
    <internal-section>
      <safa-group
        label-width="130px"
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
          label-width="130px"
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
          label-width="130px"
          :m="m"
        />
        <safa-combo
          label="وضعیت سند مادر"
          ci-name="CI_MotherDocStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocStatus"
        />
        <safa-checkbox
          label="حقوق ارتفاقی"
          v-model="value.Base_HouseInfo.HoughogheErtefaghi"
        />
      </safa-group>
    </internal-section>
    <fit>
      <safa-datatable
        helper="baseRegisterPlack"
        title="پلاک ثبتی"
        :m="m"
        v-model="value.Base_RegisterPlack"
        fit
        height="100%"
        max-height="100%"
        min-height="200px"
      />
    </fit>
    <div class="q-mt-sm">
      <text-template
        label="ملاحضات سند"
        identifier="2b08bc9a-f3ef-44dd-8b11-2ac75b0c0f99"
        :m="m"
        v-model="value.Base_CommonEstate.DocComments"
        formKey="7061a98e-30ab-4277-9332-0d07961d39e1"
      />
    </div>
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
