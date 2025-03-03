<template>
  <fit>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-custom-text
          v-model="value.Base_HouseInfo.DocArea"
          label="مساحت طبق سند"
          label-width="100px"
          :m="m"
          type="decimal"
        />
      </form-control>
      <form-control>
        <safa-text
          v-model="value.Base_CommonEstate.RegisterSection"
          label="بخش ثبتی"
          label-width="100px"
          :m="m"
          type="number"
        />
      </form-control>
      <form-control>
        <safa-text
          v-model="value.Base_HouseInfo.AyanDocNo"
          label="شماره سند اعیان"
          label-width="100px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocType"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          label-width="100px"
          :m="m"
          label="نوع سند"
        />
      </form-control>
      <form-control>
        <safa-text
          v-model="value.Base_HouseInfo.PieceNo"
          label="شماره قطعه"
          label-width="100px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          v-model="value.Base_CommonEstate.DocExportDate"
          label-width="100px"
          :m="m"
          label="تاریخ صدور سند"
        />
      </form-control>
      <form-control>
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocRefrence"
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          label="مرجع صدور سند"
          label-width="100px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          v-model="value.Base_HouseInfo.ArsehDocNo"
          label-width="100px"
          :m="m"
          label="شماره سند عرصه"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          v-model="value.Base_CommonEstate.DocTransferDate"
          label-width="100px"
          :m="m"
          label="تاریخ انتقال سند"
        />
      </form-control>
      <form-control>
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocStatus"
          label-width="100px"
          :m="m"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          label="وضعیت سند"
        />
      </form-control>
        <form-control>
        <safa-custom-text
          v-model="value.Base_HouseInfo.MotherDocArea"
          label-width="100px"
          :m="m"
          label="مساحت سند مادر"
        />
      </form-control>
    <form-control>
        <safa-custom-text
          v-model="value.Base_HouseInfo.GharesiArea"
          label-width="100px"
          :m="m"
          label="مساحت غارسی"
        />
      </form-control>
      <div class="col">
        <safa-checkbox
          v-model="value.Base_HouseInfo.HoughogheErtefaghi"
          label="حقوق ارتفاقی"
          :m="m"
        />
      </div>
    </form-row>

    <text-template
      v-model="value.Base_CommonEstate.DocComments"
      :m="m"
      formKey="e6b262b6-9c75-4a30-9f7f-3ff9c33d2685"
      identifier="ac2e0bc4-c211-4de4-9343-5a633727aa0c"
      label="ملاحضات سند"
      label-width="100px"
    />
  </fit>
</template>
<script>
export default {
  name: 'TabDocInfo',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
