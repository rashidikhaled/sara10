<template>
  <fit>
    <div v-if="archiveConfig && archiveConfig.username" class="fit">
      <ArchiveWrap ref="archiveRef" :name="archiveConfig.username" :pass="archiveConfig.password"
        :biz-code="archiveBizCode" class="fit" style="min-height: 300px"></ArchiveWrap>
    </div>
    <div v-else class="flex items-center full-height justify-center">
      <span class="text-grey">عدم یافتن تنظیمات مرتبط با آرشیو ...</span>
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      archiveBizCode: ""
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveEngineersCertificate")
    }
  },

  methods: {
    updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    }
  }
}
</script>
