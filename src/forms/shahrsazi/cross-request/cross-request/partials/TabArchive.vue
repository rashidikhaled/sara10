<template>
  <fit>
    <div v-if="archiveConfig && archiveConfig.username" class="fit">
      <ArchiveWrap
        v-if="showArchive"
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :bizCode="bizCode"
      />
    </div>
    <div v-else class="flex items-center full-height justify-center">
      <span class="text-grey">عدم یافتن تنظیمات مرتبط با آرشیو ...</span>
    </div>
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    archiveBizCode: String,
    value: {
      type: Object,
      default: () => {}
    },
    showArchive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      bizCode: ""
    }
  },
  methods: {
    updateArchiveBizCode () {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.bizCode = this.archiveBizCode
    }
  },
  computed: {
    archiveConfig () {
      return window.getConfigValue("archiveCore")
    }
  }
}
</script>
