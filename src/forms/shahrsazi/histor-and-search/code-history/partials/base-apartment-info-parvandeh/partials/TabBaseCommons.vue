<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">زیربنای مشترکات:</div>
        <safa-datagrid
          v-model="value.Base_SharingInfrastructure"
          :m="m"
          class="col-12"
          helper="baseSharingInfrastructure"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">امتیازات و انشعابات:</div>
        <safa-datagrid
          v-model="value.Base_SubScription"
          :m="m"
          class="col-12"
          helper="baseSubscription"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabBaseCommons',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
