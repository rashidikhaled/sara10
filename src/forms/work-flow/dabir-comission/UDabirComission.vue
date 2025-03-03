<template>
<section>
<safa-datatable
  helper="dabirComission"
  v-model="items"
  />
</section>
</template>

<script>
export default {
  router: '/work-flow/dabir-comission',
  data () {
    return {
      name: 'UDabirComission',
      title: 'دبیرخانه کمیسیون',
      main: true,
      workflowCompatible: true,
      items: []
    }
  }
}
</script>

<style scoped>

</style>
