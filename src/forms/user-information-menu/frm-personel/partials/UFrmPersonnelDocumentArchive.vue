<template>
  <div>
    <ArchiveWrap
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
    ></ArchiveWrap>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      name: 'UFrmPersonnelDocumentArchive'
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore')
    }
  }
}
</script>

<style></style>
