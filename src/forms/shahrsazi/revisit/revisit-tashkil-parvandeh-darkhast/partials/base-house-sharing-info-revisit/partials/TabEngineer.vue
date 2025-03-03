<template>
  <section>
    <safa-datatable
      v-model="value.Base_ControllerInfo"
      :m="m"
      class="col-12"
      height="auto"
      helper="baseControllerInfo"
      max-height="300px"
      min-height="100px"
      style="height: 12rem"
      title="مهندسین"
    />
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
