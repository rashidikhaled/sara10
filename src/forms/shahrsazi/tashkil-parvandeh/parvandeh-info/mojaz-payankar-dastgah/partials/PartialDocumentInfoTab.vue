<template>
  <fit>
    <internal-section>
      <safa-group
        label-width="90px"
        :size="{lg:3,md:3,sm:3 }"
        :m="m"
      >
        <safa-text
          label="مساحت طبق سند"
          v-model="value.Base_HouseInfo.DocArea"
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
          type="number"
          v-model="value.Base_CommonEstate.RegisterSection"
        />

        <safa-text
          label="شماره سند اعیان"
          type="number"
          v-model="value.Base_HouseInfo.AyanDocNo"
        />
        <safa-combo
          label="مرجع صدور سند"
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocRefrence"
        />
        <safa-text
          label="شماره قطعه"
          type="number"
          v-model="value.Base_HouseInfo.PieceNo"
        />
      </safa-group>
    </internal-section>
    <text-template
      label="ملاحضات سند"
      v-model="value.Base_CommonEstate.DocComments"
      formKey="d4da7be9-e7ea-4e96-9c46-2e48a810b306"
      :m="m"
      :rows="5"
      type="textarea"
      class="q-pl-md"
      label-width="90px"
    ></text-template>
  </fit>
</template>

<script>
export default {
  name: 'PartialDocumentInfoTab',
  data () {
    return {
      splitterValue: 50
    }
  },
  // computed: {
  //   Base_ShopInfo () {
  //     return this.value.Base_ShopInfo || {}
  //   }
  // },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
