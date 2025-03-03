<template>
  <fit>
    <ArchiveWrap
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
      class="fit"
      style="min-height: 300px"
    />
  </fit>
</template>

<script>
export default {
  name: "USearchUTreeInfoUArchive",

  data () {
    return {
      archiveBizCode: ""
    }
  },

  computed: {
    archiveConfig () {
      return window.getConfig("archiveSurvay")
    }
  },

  methods: {
    loadObj ({ NidNosaziCode = "" }) {
      this.archiveBizCode = NidNosaziCode
    }
  }
}
</script>
