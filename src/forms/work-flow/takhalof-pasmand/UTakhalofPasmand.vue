<template>
<section>
  <safa-checkbox
    label="وضعیت تخلف پسماند ملک"
    :m="m"
    v-model="automationFicheProcess"
  ></safa-checkbox>
</section>
</template>

<script>
export default {
  router: '/work-flow/takhalof-pasmand',
  data () {
    return {
      name: 'UTakhalofPasmand',
      title: 'تخلف پسماند',
      items: []
    }
  }
}
</script>

<style scoped>

</style>
