<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm ">
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت طبق سند"
          :m="m"
          v-model="value.Base_HouseInfo.DocArea"
          label-width="90px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="وضعیت سند"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          label-width="90px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="شماره سند عرصه"
          :m="m"
          v-model="value.Base_HouseInfo.ArsehDocNo"
          label-width="90px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع سند"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocType"
          label-width="90px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="بخش ثبتی"
          :m="m"
          v-model="value.Base_CommonEstate.RegisterSection"
          label-width="90px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="شماره سند اعیان"
          :m="m"
          v-model="value.Base_HouseInfo.ArsehDocNo"
          label-width="90px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="مرجع صدور سند"
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocRefrence"
          label-width="90px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="شماره قطعه"
          :m="m"
          v-model="value.Base_HouseInfo.PieceNo"
          label-width="90px"
        />
      </div>
    </internal-section>
    <text-template
      label="ملاحظات سند"
      formKey="bd1632ad-b0f9-49aa-8f6a-65b0b22f9c5b"
      :m="m"
      v-model="value.Base_CommonEstate.DocComments"
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
