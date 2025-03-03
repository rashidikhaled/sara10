<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocType"
          cdcName="CI_DocType"
          :m="m"
          ci-name="CI_DocType"
          class="col-12 col-sm-6 col-md-3"
          domain-name="CI_SaraM1"
          label="نوع سند"
          label-width="100px"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
          :m="m"
          ci-name="CI_DocStatus"
          class="col-12 col-sm-6 col-md-3"
          domain-name="CI_SaraM1"
          label="وضعیت سند"
          label-width="100px"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_OwnerType"
          cdcName="CI_OwnerType"
          :m="m"
          ci-name="CI_OwnerType"
          class="col-12 col-sm-6 col-md-3"
          domain-name="CI_SaraM1"
          label="نوع مالکیت"
          label-width="100px"
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_ApartmentInfo.TotalArea"
          cdcName="TotalArea"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="مجموع کل زیربنا"
          label-width="100px"
          type="number"
        />
        <safa-custom-text
          v-model="value.Base_ApartmentInfo.SharingInfrastructure"
          cdcName="SharingInfrastructure"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت زیربنای مشترکات"
          label-width="100px"
          type="decimal"
        />
        <safa-custom-text
          v-model="value.Base_ApartmentInfo.ToftImpart"
          cdcName="ToftImpart"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت سهم العرصه"
          label-width="100px"
          type="decimal"

        />

        <!-- row 3 -->
        <safa-custom-text
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت نما"
          label-width="100px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
          :m="m"
          ci-name="CI_OwnerType"
          class="col-12 col-sm-6 col-md-3"
          domain-name="CI_SaraM1"
          label="نوع نما"
          label-width="100px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.RegisterSection"
          cdcName="RegisterSection"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="بخش ثبتی"
          label-width="100px"
        />

        <!-- row 3 -->
        <safa-datepicker
          v-model="value.Base_CommonEstate.DocExportDate"
          cdcName="DocExportDate"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="تاریخ صدور سند"
          label-width="100px"
        />
        <safa-datepicker
          v-model="value.Base_ApartmentInfo.ActDate"
          cdcName="ActDate"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="تاریخ اثر"
          label-width="100px"
        />

      </div>
    </internal-section>
    <safa-checkbox
      v-model="value.Base_ApartmentInfo.HoughogheErtefaghi"
      cdcName="HoughogheErtefaghi"
      :m="m"
      class="q-mb-sm"
      label="حقوق ارتفاقی"
    />
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_Owner"
              cdcName="Base_Owner"
              :allowCopy="true"
              :copyWithCount="true"
              :m="m"
              fit
              height="100%"
              helper=shahrsazi.baseOwner
              max-height="100%"
              min-height="150px"
              title="مالکین"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_RegisterPlack"
              cdcName="Base_RegisterPlack"
              :m="m"
              fit
              height="100%"
              helper="baseRegisterPlack"
              max-height="100%"
              min-height="150px"
              title="پلاک ثبتی"
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
