<template>
  <fit>
    <internal-section>
      <safa-group :m="m" label-width="100px">
        <safa-custom-text
          v-model="value.Base_HouseInfo.DocArea"
          cdcName="DocArea"
          :m="m=== 'e' ? (isMamoorBazdid===false? 'e' :'r') :'r'"
          label="مساحت طبق سند"
          label-width="100px"
          type="decimal"
        />
        <safa-text
          v-model="value.Base_CommonEstate.RegisterSection"
          cdcName="RegisterSection"
          :m="m"
          label="بخش ثبتی"
          label-width="100px"
          type="number"
        />
        <safa-text
          v-model="value.Base_HouseInfo.AyanDocNo"
          cdcName="AyanDocNo"
          :m="m"
          label="شماره سند اعیان"
          label-width="100px"
          type="number"
        />

        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocType"
          cdcName="CI_DocType"
          :m="m"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          label="نوع سند"
          label-width="100px"
        />
        <safa-text
          v-model="value.Base_HouseInfo.PieceNo"
          cdcName="PieceNo"
          :m="m"
          label="شماره قطعه"
          label-width="100px"
        />
        <safa-datepicker
          v-model="value.Base_CommonEstate.DocExportDate"
          cdcName="DocExportDate"
          :m="m"
          label="تاریخ صدور سند"
          label-width="100px"
        />

        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocRefrence"
          cdcName="CI_DocRefrence"
          :m="m"
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          label="مرجع صدور سند"
          label-width="100px"
        />
        <safa-text
          v-model="value.Base_HouseInfo.ArsehDocNo"
          cdcName="ArsehDocNo"
          :m="m"
          label="شماره سند عرصه"
          label-width="100px"
        />
        <safa-datepicker
          v-model="value.Base_CommonEstate.DocTransferDate"
          cdcName="DocTransferDate"
          :m="m"
          label="تاریخ انتقال سند"
          label-width="100px"
        />

        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
          :m="m"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          label="وضعیت سند"
          label-width="100px"
        />
        <!-- <safa-combo
          label="وضعیت سند "
          ci-name="CI_MotherDocStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
        /> -->
        <safa-custom-text
          v-model="value.Base_HouseInfo.MotherDocArea"
          cdcName="MotherDocArea"
          :m="m"
          label="مساحت سند مادر"
          label-width="100px"
          type="decimal"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.GharesiArea"
          cdcName="GharesiArea"
          :m="m"
          label="مساحت غارسی"
          label-width="100px"
        />
        <!-- <safa-combo
          label="وضعیت سند مادر"
          ci-name="CI_MotherDocStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
        /> -->
      </safa-group>
    </internal-section>
    <div class="row q-mb-sm">
      <div v-if="$q.screen.gt.xs" class="col-auto" style="width: 120px" />
      <div class="col">
        <safa-checkbox
          v-model="value.Base_HouseInfo.HoughogheErtefaghi"
          cdcName="HoughogheErtefaghi"
          label="حقوق ارتفاقی"
        />
      </div>
    </div>
    <text-template
      v-model="value.Base_CommonEstate.DocComments"
      cdcName="DocComments"
      :m="m"
      formKey="e6b262b6-9c75-4a30-9f7f-3ff9c33d2685"
      identifier="ac2e0bc4-c211-4de4-9343-5a633727aa0c"
      label="ملاحضات سند"
      label-width="120px"
    />
  </fit>
</template>
<script>
export default {
  name: "TabDocInfo",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    },
    isMamoorBazdid: {
      type: Boolean,
      default: false
    }
  }
}
</script>
