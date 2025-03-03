<template>
<section>
<safa-datatable
  helper="amlakControlHistory"
  v-model="items"
  />
</section>
</template>

<script>
export default {
  router: '/work-flow/amlak-control-history',
  data () {
    return {
      name: 'UAmlakHistory',
      title: 'تاریخچه املاک',
      items: []
    }
  }
}
</script>

<style scoped>

</style>
