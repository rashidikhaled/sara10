<template>
  <ShowModal v-model="show">
    <div class="fit q-pa-md">
      <!--      <ArchiveWrap />-->
      Archive Login
    </div>
  </ShowModal>
</template>

<script>
export default {
  name: 'ArchivePlugin',
  data () {
    return {
      show: false
    }
  },
  methods: {
    changeArchiveVisibility ({ show }) {
      this.show = show
    }
  },
  beforeMount () {
    self.$root.$on('archiveVisibility', this.changeArchiveVisibility)
  },
  beforeDestroy () {
    self.$root.$off('archiveVisibility', this.changeArchiveVisibility)
  }
}
</script>

<style scoped>

</style>
