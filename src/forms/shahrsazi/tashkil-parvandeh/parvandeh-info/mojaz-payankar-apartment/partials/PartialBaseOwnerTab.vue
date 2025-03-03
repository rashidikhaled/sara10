<template>
  <fit>
    <internal-section>
      <safa-group
        label-width="80px"
        :size="{lg: 5,
        md: 4,
        sm: 3,
        xs: 1}"
        :m="m"
      >

        <safa-combo
          label="نوع سند"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocType"
          cdcName="CI_DocType"
        />
        <safa-text
          label="مجموع كل زير بنا"
          type="number"
          v-model="value.Base_ApartmentInfo.TotalArea"
          cdcName="TotalArea"
        />
        <safa-text
          label="بخش ثبتی"
          v-model="value.Base_CommonEstate.RegisterSection"
          cdcName="RegisterSection"
        />
        <safa-combo
          label="وضعيت سند"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت زیربنای مشترکات"
          v-model="value.Base_ApartmentInfo.SharingInfrastructure"
          cdcName="SharingInfrastructure"
          label-width="80px"
          :m="m"

        />
        <safa-custom-text
          type="decimal"
          label="مساحت نما"
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
          label-width="80px"
          :m="m"
        />
        <safa-combo
          label="نوع مالكيت"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_OwnerType"
          cdcName="CI_OwnerType"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت سهم العرصه"
          v-model="value.Base_ApartmentInfo.ToftImpart"
          cdcName="ToftImpart"
          label-width="80px"
          :m="m"
        />
        <safa-combo
          label="نوع نما"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
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
    </internal-section>
     <safa-splitter
      v-model="verticalSplitter"
      class="fit"
      vartical
      margin="0"
      style="min-height:250px"
    >
    <template v-slot:before>
        <fit>

    <safa-datatable
      helper="owners"
      title="مالکین "
      v-model="value.Base_Owner"
      cdcName="Base_Owner"
       height="100%"
       max-height="100%"
       min-height="150px"
    />

      <q-separator/>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator/>

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

         </fit>
      </template>
    </safa-splitter>
  </fit>

</template>

<script>
export default {
  name: 'PartialBaswOwnerTab',
  data: function () {
    return {
      verticalSplitter: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
