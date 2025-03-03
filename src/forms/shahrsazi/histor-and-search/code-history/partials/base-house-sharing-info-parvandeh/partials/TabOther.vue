<template>
  <section class="row wrap">
    <q-card flat class="col-12 col-md-6">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">فضای سبز:</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseGreenSpace"
          :m="m"
          v-model="value.Base_GreenSpace"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12 col-md-6">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">عقب نشینی ها:</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseScuttle"
          :m="m"
          v-model="value.Base_Scuttle"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12 col-md-6">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">مجاورین:</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseNeighbor"
          :m="m"
          v-model="value.Base_Neighbor"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12 col-md-6">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">مشخصات درها:</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseDoor"
          :m="m"
          v-model="value.Base_Door"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12">
      <q-card-section>
        <div class="section-title">مشخصات دیوارها:</div>
      </q-card-section>
      <q-card-section class="row q-col-gutter-md">
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseWall"
          :m="m"
          v-model="value.Base_Wall"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabOther',

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
