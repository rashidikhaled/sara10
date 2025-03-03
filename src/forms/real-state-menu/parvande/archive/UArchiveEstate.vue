<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title">
      <template #header>
        <div>
          <form-header-by-nosazi-code label="کد نوسازی ممیزی :" v-model="archiveBizCode" />
        </div>
      </template>
      <fit>
        <div class="fit">

          <ArchiveWrap :name="archiveConfig.username" :pass="archiveConfig.password" :biz-code="archiveBizCode" />
        </div>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "UArchiveEstate", // UArchiveEstate
      title: "آرشیو",
      formKey: "610E0A38-A01C-438A-B89D-5C51496C97B3",
      main: true,
      archiveBizCode: ""
    }
  },
  computed: {
    archiveConfig () {
      return window.getConfigValue("archiveEstate")
    }
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.archiveBizCode = this.selectedRequest.BizCode
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {}
}
</script>
