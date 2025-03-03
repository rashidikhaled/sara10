<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">سایر:</div>
        <safa-datagrid
          v-model="value.Base_OtherEquipment"
          :m="m"
          class="col-12"
          helper="AGbaseOtherEquipment"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">تاسیسات:</div>
        <safa-datagrid
          v-model="value.Base_Installation"
          :m="m"
          class="col-12"
          helper="baseInstallation"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabBaseOther',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
