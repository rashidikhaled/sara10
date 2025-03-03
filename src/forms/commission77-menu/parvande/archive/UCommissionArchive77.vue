<template>
  <safa-form
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <fit>
        <div class="fit">
          <ArchiveWrap
            :name="archiveConfig.username"
            :pass="archiveConfig.password"
            :biz-code="archiveBizCode"
          />
        </div>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: 'UCommissionArchive77',
      title: 'آرشیو',
      formKey: 'FFB91FDD-EDA3-414D-9E02-BBBC43B8F5DF',
      main: true,
      archiveBizCode: ''
    }
  },
  computed: {
    archiveConfig () {
      return window.getConfigValue('archiveCommission77')
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
