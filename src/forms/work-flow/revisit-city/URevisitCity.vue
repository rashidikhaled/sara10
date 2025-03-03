<template>
<section>
  <q-tree/>

<safa-datatable
  helper="revisitInfoShahrsaz"
  v-model="items"
  title="اطلاعات بازدید شهرساز"
  />
</section>
</template>

<script>
export default {
  router: '/work-flow/revisit-city',
  data () {
    return {
      name: 'URevisitCity',
      title: 'اطلاعات بازدید شهرساز',
      items: []
    }
  }
}
</script>

<style scoped>

</style>
