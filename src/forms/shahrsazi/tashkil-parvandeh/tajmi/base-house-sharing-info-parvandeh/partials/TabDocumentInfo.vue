<template>
  <fit>
    <safa-group
      label-width="110px"
      :m="m"
    >
      <safa-custom-text
        type="decimal"
        label="مساحت طبق سند"
        v-model="value.Base_HouseInfo.DocArea"
        label-width="110px"
        :m="m"
      />
      <safa-combo
        label="وضعیت سند"
        ci-name="CI_DocStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocStatus"
      />
      <safa-text
        label="شماره سند عرصه"
        v-model="value.Base_HouseInfo.ArsehDocNo"
      />

      <safa-combo
        label="نوع سند"
        ci-name="CI_DocType"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocType"
      />
      <safa-text
        label="بخش ثبتی"
        v-model="value.Base_CommonEstate.RegisterSection"
      />
      <safa-text
        label="شماره سند اعیان"
        v-model="value.Base_HouseInfo.ArsehDocNo"
      />

      <safa-combo
        label="مرجع صدور سند"
        ci-name="CI_DocRefrence"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocRefrence"
      />
      <safa-text
        label="شماره قطعه"
        v-model="value.Base_HouseInfo.PieceNo"
      />
    </safa-group>
    <fit>
      <text-template
        label="ملاحضات سند"
        identifier="bd1632ad-b0f9-49aa-8f6a-65b0b22f9c5b"
        formKey="56ffc093-72ca-4db3-a24b-cc1ce29cc74e"
        :m="m"
        v-model="value.Base_CommonEstate.DocComments"
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
