<template>
  <fit>
    <ArchiveWrap
      class="fit"
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
    />
  </fit>
</template>
<script>
export default {
  props: {
    value: String
  },
  data () {
    return {
      archiveBizCode: ""
    }
  },
  computed: {
    archiveConfig () {
      return window.getConfigValue("archiveEstate")
    }
  },
  methods: {
    updateArchiveBizCode () {
      this.archiveBizCode = this.value ?? "00000000-0000-0000-0000-000000000000"
    }
  }
}
</script>
