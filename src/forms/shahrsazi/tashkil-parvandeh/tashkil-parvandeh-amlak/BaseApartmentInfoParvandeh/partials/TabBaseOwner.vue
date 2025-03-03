<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع سند"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocType"
          cdcName="CI_DocType"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="وضعیت سند"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع مالکیت"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_OwnerType"
          cdcName="CI_OwnerType"
          label-width="100px"
        />

        <!-- row 2 -->
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="مجموع کل زیربنا"
          :m="m"
          v-model="value.Base_ApartmentInfo.TotalArea"
          cdcName="TotalArea"
          label-width="100px"
          type="number"
        />
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت زیربنای مشترکات"
          :m="m"
          v-model="value.Base_ApartmentInfo.SharingInfrastructure"
          cdcName="SharingInfrastructure"
          label-width="100px"
          type="decimal"
        />
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت سهم العرصه"
          :m="m"
          v-model="value.Base_ApartmentInfo.ToftImpart"
          cdcName="ToftImpart"
          label-width="100px"
          type="decimal"

        />

        <!-- row 3 -->
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت نما"
          :m="m"
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
          label-width="100px"
          type="decimal"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع نما"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="بخش ثبتی"
          :m="m"
          v-model="value.Base_CommonEstate.RegisterSection"
          cdcName="RegisterSection"
          label-width="100px"
        />

        <!-- row 3 -->
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="تاریخ صدور سند"
          :m="m"
          v-model="value.Base_CommonEstate.DocExportDate"
          cdcName="DocExportDate"
          label-width="100px"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="تاریخ اثر"
          :m="m"
          v-model="value.Base_ApartmentInfo.ActDate"
          cdcName="ActDate"
          label-width="100px"
        />

      </div>
    </internal-section>
    <safa-checkbox
      label="حقوق ارتفاقی"
      :m="m"
      v-model="value.Base_ApartmentInfo.HoughogheErtefaghi"
      cdcName="HoughogheErtefaghi"
      class="q-mb-sm"
    />
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="مالکین"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              helper=shahrsazi.baseOwner
              :m="m"
              v-model="value.Base_Owner"
              cdcName="Base_Owner"
              :allowCopy="true"
              :copyWithCount="true"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="پلاک ثبتی"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              helper="baseRegisterPlack"
              :m="m"
              v-model="value.Base_RegisterPlack"
              cdcName="Base_RegisterPlack"
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
