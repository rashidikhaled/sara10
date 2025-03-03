<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">سوابق و اشتراکات:</div>
        <safa-datagrid
          v-model="value.Base_ShahrsaziArchive"
          :m="m"
          class="col-12"
          helper="baseShahrsaziArchive"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">سوابق کمیسیونها :</div>
        <safa-datagrid
          v-model="value.Base_CommissionHistory"
          :m="m"
          class="col-12"
          helper="baseCommissionHistory"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">پرداخت آخرین مفاصای نوسازی :</div>
        <safa-datagrid
          v-model="value.Base_RenovationPaymentHistory"
          :m="m"
          class="col-12"
          helper="baseRenovationPaymentHistory"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">اشتراكات :</div>
        <safa-datagrid
          v-model="value.Base_SubScription"
          :m="m"
          class="col-12"
          helper="baseSubscription"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">منبع برداشت اطلاعات:</div>
        <safa-datagrid
          v-model="value.Base_ResourceInfo"
          :m="m"
          class="col-12"
          helper="baseResourceInfo"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">سوابق کمیسیون 77 :</div>
        <safa-datagrid
          v-model="value.Base_Commission77History"
          :m="m"
          class="col-12"
          helper="baseCommission77History"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col1-2 section-title">حفاری :</div>
        <safa-datagrid
          v-models="value.Base_Dig"
          :m="m"
          class="col-12"
          helper="baseDig"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabArchive',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
