<template>
  <fit>
    <safa-group label-width="110px" :m="m">
      <safa-custom-text
        type="decimal"
        label="مساحت طبق سند"
        v-model="value.Base_HouseInfo.DocArea"
        cdcName="DocArea"
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
      <safa-text
        label="شماره سند عرصه"
        v-model="value.Base_HouseInfo.ArsehDocNo"
        cdcName="ArsehDocNo"
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
        label="بخش ثبتی"
        v-model="value.Base_CommonEstate.RegisterSection"
        cdcName="RegisterSection"
      />
      <safa-text
        label="شماره سند اعیان"
        v-model="value.Base_HouseInfo.ArsehDocNo"
        cdcName="ArsehDocNo"
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
      <safa-text label="شماره قطعه" v-model="value.Base_HouseInfo.PieceNo" cdcName="PieceNo" />
    </safa-group>
    <fit>
      <text-template
        label="ملاحضات سند"
        identifier="bd1632ad-b0f9-49aa-8f6a-65b0b22f9c5b"
        formKey="b90f67d2-a283-42f2-81a2-3aea4f337590"
        :m="m"
        v-model="value.Base_CommonEstate.DocComments"
        cdcName="DocComments"
        label-width="110px"
        class="fit"
        height="100%"
        max-height="100%"
      />
    </fit>
  </fit>
</template>

<script>
export default {
  name: "TabDocumentInfo",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
