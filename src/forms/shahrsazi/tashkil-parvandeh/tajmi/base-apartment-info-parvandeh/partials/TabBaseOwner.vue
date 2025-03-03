<template>
  <fit>

    <safa-group
      label-width="120px"
      :m="m"
    >
      <!-- row 1 -->
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

      <!-- row 2 -->
      <safa-text
        label="مجموع کل زیربنا"
        v-model="value.Base_ApartmentInfo.TotalArea"
        cdcName="TotalArea"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت زیربنای مشترکات"
        label-width="120px"
        v-model="value.Base_ApartmentInfo.SharingInfrastructure"
        cdcName="SharingInfrastructure"
        :m="m"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت سهم العرصه"
        label-width="120px"
        v-model="value.Base_ApartmentInfo.ToftImpart"
        cdcName="ToftImpart"
        :m="m"
      />

      <!-- row 3 -->
      <safa-custom-text
        type="decimal"
        label="مساحت نما"
        label-width="120px"
        v-model="value.Base_CommonEstate.ViewArea"
        cdcName="ViewArea"
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
      />

      <!-- row 4 -->
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
    <div class=" fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              helper="shahrsazi.baseOwner"
              :m="m"
              v-model="value.Base_Owner"
              cdcName="Base_Owner"
              title="مالکین"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :allowCopy="true"
              :copyWithCount="true"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              helper="baseRegisterPlack"
              :m="m"
              v-model="value.Base_RegisterPlack"
              cdcName="Base_RegisterPlack"
              title="پلاک ثبتی"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseOwner',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
