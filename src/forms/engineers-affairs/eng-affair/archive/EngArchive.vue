<template>
  <form-wrapper :title="title">
    <form-row>
      <form-control>
        <safa-combo
          label="نوع"
          label-width="100px"
          source-type="local"
          :options="typeList"
          v-model="selectedType"
          ref="typeRef"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="گروه"
          label-width="100px"
          ciName="CI_ArchiveGroupEng"
          domainName="engineer"
          v-model="CI_ArchiveGroup"
        />
      </form-control>

      <EngineerInfoBox
        :m="mode"
        v-model="identityCode"
        label-width="100px"
        @fetched="getEngineerInfo"
        v-if="selectedType === 1"
      />
      <form-control v-else>
        <safa-text
          label="نوع دفتر"
          v-model="officeCode"
          label-width="100px"
        />
      </form-control>
    </form-row>
    <ArchiveWrap
      style="min-height: 300px"
      class="fit"
      ref="archiveRef"
      :biz-code="archiveBizCode"
      v-if="showArchive"
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
    ></ArchiveWrap>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'آرشیو',
      formKey: '2fed2e89-b0f7-4b5f-95b2-bfeb0680abc9',
      name: 'EngArchive',
      main: true,
      currentIdentityCode: '',
      officeCode: '',
      sidebarCompatible: true,
      showArchive: false,
      getArchiveRootSubjectResult: null,
      typeList: [
        { ID: 0, Title: 'دفتر' },
        { ID: 1, Title: 'مهندس' }
      ],
      selectedType: 0,
      identityCode: 0,
      CI_ArchiveGroup: 0,
      archiveBizCode: ''
    }
  },
  methods: {
    getEngineerInfo () {
      this.showArchive = true
      this.findBizCode()
      this.updateArchiveBizCode(this.getArchiveRootSubjectResult)
    },
    findBizCode () {
      this.showLoading()
      if (this.selectedType !== null) {
        let payLoad = { Request: null, Code: null, CI_ArchiveGroup: null }
        if (this.selectedType === 1) {
          payLoad.Request = 'Engineer'
          payLoad.Code = this.identityCode
          payLoad.CI_ArchiveGroup = this.CI_ArchiveGroup
        } else {
          payLoad.Request = 'Office'
          payLoad.Code = this.officeCode
          payLoad.CI_ArchiveGroup = this.CI_ArchiveGroup
        }

        this.$services.engineers
          .getArchiveRootSubject(payLoad)
          .then(async (response) => {
            this.result = this.getResponse(response.data)
            if (this.result.success) {
              this.getArchiveRootSubjectResult =
                this.result.data.GetArchiveRootSubjectResult
              await this.log({
                action: this.logActions.view,
                bizCode: this.identityCode,
                bizCodeTitle: 'کد عضویت'
              })
            }
          })
          .catch((error) => {
            console.error('load error', error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
      // console.log(archiveStore)
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveWebEng')
    }
  }
}
</script>
