<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">پیشامدگی ها:</div>
        <safa-datagrid
          v-model="value.Base_Front"
          :m="m"
          class="col-12"
          helper="baseFront"
          style="height: 20rem"
        />
      </q-card-section>
    </q-card>
  </section>
</template>

<script>
export default {
  name: 'TabBaseFront',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
