<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocType"
          cdcName="CI_DocType"
          :m="m"
          ci-name="CI_DocType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع سند:"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
          :m="m"
          ci-name="CI_DocStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="وضعیت سند:"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_OwnerType"
          cdcName="CI_OwnerType"
          :m="m"
          ci-name="CI_OwnerType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع مالکیت:"
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_ApartmentInfo.TotalArea"
          cdcName="TotalArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مجموع کل زیربنا:"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.SharingInfrastructure"
          cdcName="SharingInfrastructure"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت زیربنای مشترکات:"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.ToftImpart"
          cdcName="ToftImpart"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت سهم العرصه:"
        />

        <!-- row 3 -->
        <safa-text
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت نما:"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
          :m="m"
          ci-name="CI_OwnerType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع نما:"
        />
        <safa-text
          v-model="value.Base_CommonEstate.RegisterSection"
          cdcName="RegisterSection"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="بخش ثبتی:"
        />

        <!-- row 4 -->
        <safa-datepicker
          v-model="value.Base_CommonEstate.DocExportDate"
          cdcName="DocExportDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاریخ صدور سند:"
        />
        <safa-datepicker
          v-model="value.Base_ApartmentInfo.ActDate"
          cdcName="ActDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاریخ اثر:"
        />
        <safa-checkbox
          v-model="value.Base_ApartmentInfo.HoughogheErtefaghi"
          cdcName="HoughogheErtefaghi"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="حقوق ارتفاقی:"
        />

      </q-card-section>
    </q-card>

    <q-separator class="col-12 q-my-sm" inset/>

    <q-card class="col-12 " flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">مالکین:</div>
        <safa-datagrid
          v-model="value.Base_Owner"
          cdcName="Base_Owner"
          :m="m"
          class="col-12"
          helper="shahrsazi.baseOwner"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">پلاک ثبتی:</div>
        <safa-datagrid
          v-model="value.Base_RegisterPlack"
          cdcName="Base_RegisterPlack"
          :m="m"
          class="col-12"
          helper="baseRegisterPlack"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

  </section>
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
