<template>
  <section class="row wrap">
    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">سوابق و اشتراکات:</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseShahrsaziArchive"
          :m="m"
          v-model="value.Base_ShahrsaziArchive"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">سوابق کمیسیونها :</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseCommissionHistory"
          :m="m"
          v-model="value.Base_CommissionHistory"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">پرداخت آخرین مفاصای نوسازی :</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseRenovationPaymentHistory"
          :m="m"
          v-model="value.Base_RenovationPaymentHistory"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">منبع برداشت اطلاعات:</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseResourceInfo"
          :m="m"
          v-model="value.Base_ResourceInfo"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">سوابق کمیسیون 77 :</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseCommission77History"
          v-model="value.Base_Commission77History"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">حفاری :</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseDig"
          v-model="value.Base_Dig"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabArchive',

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
