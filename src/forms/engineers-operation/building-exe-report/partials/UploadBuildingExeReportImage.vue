<template>
  <fit>
    <ArchiveWrap
      style="min-height: 300px"
      class="fit"
      ref="archiveRef"
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :bizCode="archiveBizCode"
    >
    </ArchiveWrap>
  </fit>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    archiveBizCode: {
      type: String,
      default: "00000000-0000-0000-0000-000000000000"
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveEngineer')
    }
  }
}
</script>
