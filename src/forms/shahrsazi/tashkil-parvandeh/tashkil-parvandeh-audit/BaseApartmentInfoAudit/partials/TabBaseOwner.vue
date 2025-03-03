<template>
  <fit>
    <safa-group label-width="120px" :m="m">
      <safa-combo
        label="نوع سند"
        ci-name="CI_DocType"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocType"
        cdcName="CI_DocType"
      />
      <safa-combo
        label="وضعیت سند"
        ci-name="CI_DocStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_DocStatus"
        cdcName="CI_DocStatus"
      />
      <safa-combo
        label="نوع مالکیت"
        ci-name="CI_OwnerType"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_OwnerType"
        cdcName="CI_OwnerType"
      />
      <safa-text
        label="مجموع کل زیربنا"
        v-model="value.Base_ApartmentInfo.TotalArea"
        cdcName="TotalArea"
        type="number"
      />
      <safa-custom-text
        label="مساحت زیربنای مشترکات"
        v-model="value.Base_ApartmentInfo.SharingInfrastructure"
        cdcName="SharingInfrastructure"
        type="decimal"
        label-width="130px"
        :m="m"
      />
      <safa-custom-text
        label="مساحت سهم العرصه"
        v-model="value.Base_ApartmentInfo.ToftImpart"
        cdcName="ToftImpart"
        type="decimal"
        label-width="130px"
        :m="m"
      />
      <safa-custom-text
        label="مساحت نما"
        v-model="value.Base_CommonEstate.ViewArea"
        cdcName="ViewArea"
        type="decimal"
        label-width="130px"
        :m="m"
      />
      <safa-combo
        label="نوع نما"
        ci-name="CI_OwnerType"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_ViewCode"
        cdcName="CI_ViewCode"
      />
      <safa-text
        label="بخش ثبتی"
        v-model="value.Base_CommonEstate.RegisterSection"
        cdcName="RegisterSection"
        type="number"
      />
      <safa-datepicker
        label="تاریخ صدور سند"
        v-model="value.Base_CommonEstate.DocExportDate"
        cdcName="DocExportDate"
      />
      <safa-datepicker
        label="تاریخ اثر"
        v-model="value.Base_ApartmentInfo.ActDate"
        cdcName="ActDate"
      />
    </safa-group>
    <safa-checkbox
      label="حقوق ارتفاقی"
      v-model="value.Base_ApartmentInfo.HoughogheErtefaghi"
      cdcName="HoughogheErtefaghi"
      class="q-mb-sm"
    />
    <safa-splitter
      v-model="verticalSplitterModel"
      vertical
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit className="q-pt-sm">
          <safa-datatable
            title="مالکین"
            helper="shahrsazi.baseOwner"
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>

      <template v-slot:after>
        <fit className="q-pt-sm">
          <safa-datatable
            title="پلاک ثبتی"
            helper="baseRegisterPlack"
            :m="m"
            v-model="value.Base_RegisterPlack"
            cdcName="Base_RegisterPlack"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  name: "TabBaseOwner",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      verticalSplitterModel: 50
    }
  }
}
</script>
