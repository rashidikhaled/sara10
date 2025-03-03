<template>
  <section class="row wrap">
    <q-card flat class="col-12 ">
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">اطلاعات کروکی:</div>
        <croque
          class="col-12"
          :m="m"
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
