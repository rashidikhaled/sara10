<template>
  <section class="row wrap">
    <q-card class="col-12 " flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">اطلاعات کروکی:</div>
        <croque
          :m="m"
          class="col-12"
        />
      </q-card-section>
    </q-card>
  </section>
</template>

<script>
export default {
  name: 'TabCroque',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
