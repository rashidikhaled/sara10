<template>
  <internal-section>
    <div class="col-12 section-title">اطلاعات کروکی:</div>
    <croque
      :m="m"
      class="col-12"
    />
  </internal-section>
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
