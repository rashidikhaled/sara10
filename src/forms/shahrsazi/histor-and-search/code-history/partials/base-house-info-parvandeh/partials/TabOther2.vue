<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">سایر:</div>
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
        <div class="col-12 section-title">سهم العرصه ساختمان ها:</div>
        <safa-datagrid
          v-model="value.Base_MultiBuilding"
          :m="m"
          class="col-12"
          helper="baseMultiBuilding"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabOther2',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
