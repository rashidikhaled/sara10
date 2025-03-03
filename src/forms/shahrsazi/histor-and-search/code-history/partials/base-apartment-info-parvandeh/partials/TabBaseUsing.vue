<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">کاربری ها:</div>
        <safa-datagrid
          v-model="value.Base_Using"
          :m="m"
          class="col-12"
          helper="shahrsazi.baseUsing"
          style="height: 20rem"
        />
      </q-card-section>
    </q-card>
  </section>
</template>

<script>
export default {
  name: 'TabBaseUsing',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
