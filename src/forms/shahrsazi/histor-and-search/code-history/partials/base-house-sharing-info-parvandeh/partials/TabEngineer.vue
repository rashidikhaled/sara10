<template>
  <section class="row wrap">
    <q-card flat class="col-12">
      <q-card-section class="row wrap">
        <div class="col-12 section-title">مهندسین:</div>
        <safa-datagrid
          class="col-12"
          style="height: 12rem"
          helper="baseControllerInfo"
          :m="m"
          v-model="value.Base_ControllerInfo"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabEngineer',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
