<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="آرشیو ملک"
  >
    <div style="height:95vh">
      <safa-status :result="requestResult"/>
      <ArchiveWrap
        v-if="formLoaded"
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :bizCode="archiveBizCode"
      ></ArchiveWrap>
    </div>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'آرشیو ملک',
      formKey: 'c750bf5c-b8a0-4011-9e46-3ca6142baa8b',
      name: 'ArchiveAmlak',
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      requestResult: null,
      baseLibResults: { ArchiveWrapper: {} },
      formLoaded: false,
      archiveBizCode: ''
    }
  },
  computed: {
    archiveConfig () {
      if (!this.selectedDistrict) {
        // eslint-disable-next-line no-undef
        return window.getConfigValue('archiveCore')
      } else {
        // eslint-disable-next-line no-undef
        const districtConfig = window.getConfigValue('archiveCore').district || {}
        return districtConfig[this.selectedDistrict]
      }
    }
  },
  // beforeMount () {
  //   this.selectedRequest.BizCode = ''
  // },
  beforeMount () {
    this.updateArchiveBizCode('')
  },
  mounted () {
    if (this.selectedRequest === null) {
      this.showError('لطفا یک درخواست از کارتابل انتخاب نمایید.')
    } else {
      this.getBaseLibInNosaziCode()
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      console.log(bizCode)
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
      // eslint-disable-next-line no-undef
      // console.log(archiveStore)
    },
    getBaseLibInNosaziCode () {
      this.showLoading()
      const baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      let data = {
        pNosaziCode: {
          Apartment: 0,
          Block: baseNosaziCode.Block,
          Building: 0,
          CI_City: 0,
          District: baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: baseNosaziCode.House,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: baseNosaziCode.Region,
          Shop: 0
        },
        pLoadFunc: 'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(data, { config: { District: baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            if (this.baseLibResults.ArchiveWrapper) {
              this.updateArchiveBizCode(
                this.baseLibResults.ArchiveWrapper.BizCode
              )
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.BizCode,
                bizCodeArchive: this.baseLibResults.ArchiveWrapper.BizCode,
                bizCodeTitle: 'کد نوسازی'
              })
            }
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
          this.formLoaded = true
        })
    }
  }
}
</script>
