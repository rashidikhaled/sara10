<template>
  <fit>
    <internal-section>
      <safa-group :m="m" label-width="90px" margin="0">
        <safa-custom-text
          v-model="value.Base_HouseInfo.DocArea"
          cdcName="DocArea"
          :m="m"
          label="مساحت طبق سند"
          label-width="90px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
          :m="m"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          label="وضعیت سند"
          label-width="90px"
        />
        <safa-text
          v-model="value.Base_HouseInfo.ArsehDocNo"
          cdcName="ArsehDocNo"
          label="شماره سند عرصه"
          type="number"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocType"
          cdcName="CI_DocType"
          :m="m"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          label="نوع سند"
          label-width="90px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.RegisterSection"
          cdcName="RegisterSection"
          label="بخش ثبتی"
        />
        <safa-text
          v-model="value.Base_HouseInfo.ArsehDocNo"
          cdcName="ArsehDocNo"
          label="شماره سند اعیان"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocRefrence"
          cdcName="CI_DocRefrence"
          :m="m"
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          label="مرجع صدور سند"
          label-width="90px"
        />
        <safa-text
          v-model="value.Base_HouseInfo.PieceNo"
          cdcName="PieceNo"
          label="شماره قطعه"
          type="number"
        />
      </safa-group>
    </internal-section>
    <text-template
      v-model="value.Base_CommonEstate.DocComments"
      cdcName="DocComments"
      :m="m"
      formKey="585ba7df-fa62-43da-9986-79c01a181019"
      identifier="abab445d-351c-471c-b65d-af0ec395f3df"
      label="ملاحضات سند"
      label-width="90px"
    />
  </fit>
</template>
<script>
export default {
  name: 'TabDocumentInfo',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
