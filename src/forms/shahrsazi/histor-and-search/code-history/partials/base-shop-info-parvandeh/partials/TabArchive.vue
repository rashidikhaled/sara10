<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">سوابق شهرسازی:</div>
        <safa-datagrid
          v-model="value.Base_ShahrsaziArchive"
          :m="m"
          class="col-12"
          helper="baseShahrsaziArchive"
          style="height: 12rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">سوابق شهرسازی پدر:</div>
        <safa-datagrid
          v-model="value.Base_ShahrsaziArchiveHouse"
          :m="m"
          class="col-12"
          helper="baseShahrsaziArchiveHouse"
          style="height: 36rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">سوابق کمیسیونها:</div>
        <safa-datagrid
          v-model="value.Base_CommissionHistory"
          :m="m"
          class="col-12"
          helper="baseCommissionHistory"
          style="height: 12rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">سوابق کمیسیون 77:</div>
        <safa-datagrid
          v-model="value.Base_Commission77History"
          :m="m"
          class="col-12"
          helper="baseCommission77History"
          style="height: 12rem"
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
