<template>
  <section>
        <div class="ection-title">اطلاعات کروکی:</div>
        <croque
          :m="m"
        />
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
