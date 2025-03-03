<template>
  <section class="row wrap">
    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت طبق سند"
          type="decimal"
          :m="m"
          v-model="value.Base_HouseInfo.DocArea"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="وضعیت سند"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocStatus"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="شماره سند عرصه"
          type="number"
          :m="m"
          v-model="value.Base_HouseInfo.ArsehDocNo"
        />

        <!-- row 2 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="نوع سند"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocType"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="بخش ثبتی"
          :m="m"
          v-model="value.Base_CommonEstate.RegisterSection"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="شماره سند اعیان"
          :m="m"
          v-model="value.Base_HouseInfo.ArsehDocNo"
        />

        <!-- row 3 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="مرجع صدور سند"
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocRefrence"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="شماره قطعه"
          :m="m"
          v-model="value.Base_HouseInfo.PieceNo"
        />

      </q-card-section>
    </q-card>
    <q-separator inset class="q-mb-md"/>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12 ">
          <text-template
            class="col-12"
            label="ملاحضات سند:"
            identifier="bd1632ad-b0f9-49aa-8f6a-65b0b22f9c5b"
            :m="m"
            v-model="value.Base_CommonEstate.DocComments"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

  </section>
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
