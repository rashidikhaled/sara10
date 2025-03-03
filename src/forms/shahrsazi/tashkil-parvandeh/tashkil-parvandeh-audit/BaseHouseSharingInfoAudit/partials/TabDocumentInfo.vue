<template>
  <fit>
    <internal-section>
      <safa-group :m="m" margin="0" class="q-mb-sm">
        <safa-text
          label="مساحت طبق سند"
          v-model="value.Base_HouseInfo.DocArea"
          label-width="100px"
        />
        <safa-combo
          label="وضعیت سند"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          label-width="100px"
        />
        <safa-text
          label="شماره سند عرصه"
          v-model="value.Base_HouseInfo.ArsehDocNo"
          label-width="100px"
        />
        <safa-combo
          label="نوع سند"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocType"
          label-width="100px"
        />
        <safa-text
          label="بخش ثبتی"
          v-model="value.Base_CommonEstate.RegisterSection"
          label-width="100px"
        />
        <safa-text
          label="شماره سند اعیان"
          v-model="value.Base_HouseInfo.ArsehDocNo"
          label-width="100px"
        />
        <safa-combo
          label="مرجع صدور سند"
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocRefrence"
          label-width="100px"
        />
        <safa-text
          label="شماره قطعه"
          v-model="value.Base_HouseInfo.PieceNo"
          label-width="100px"
        />
      </safa-group>
    </internal-section>
    <div class="fit">
      <text-template
        label="ملاحضات سند"
        formKey="bd1632ad-b0f9-49aa-8f6a-65b0b22f9c5b"
        :m="m"
        v-model="value.Base_CommonEstate.DocComments"
      />
    </div>
  </fit>
</template>
<script>
export default {
  name: 'TabDocumentInfo',
  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
