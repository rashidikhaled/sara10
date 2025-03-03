<template>
  <!--  <embed type="text/html" :src="mapUrl" style="width: 100%; height: 100%;" />-->
  <map-layout/>
</template>

<script>
export default {
  name: 'newmap',
  computed: {
    mapUrl () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('mapUrl') || 'http://sdi.mashhad.ir:8040/vsdisara/'
    }
  }
}
</script>

<style scoped>

</style>
