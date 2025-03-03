<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">عقب نشینی ها:</div>
        <safa-datagrid
          v-model="value.Base_Scuttle"
          :m="m"
          class="col-12"
          helper="baseScuttle"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">پخ ها:</div>
        <safa-datagrid
          v-model="value.Base_Bezel"
          :m="m"
          class="col-12"
          helper="baseBezel"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">مجاورین:</div>
        <safa-datagrid
          v-model="value.Base_Neighbor"
          :m="m"
          class="col-12"
          helper="baseNeighbor"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">فضای سبز:</div>
        <safa-datagrid
          v-model="value.Base_GreenSpace"
          :m="m"
          class="col-12"
          helper="baseGreenSpace"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabOther1',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
