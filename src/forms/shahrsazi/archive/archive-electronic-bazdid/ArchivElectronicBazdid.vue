<template>
<safa-form :id="formKey" :caption="title" app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b">
  <form-wrapper :title="title">
    <template v-slot:header>
      <form-header-by-nosazi-code
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
        enabled="0-0-0-1-1-1-1"
        from-request
        @fetched="fetchedData"
      />
    </template>
    <internal-section>
      <div class="row q-col-gutter-lg">
        <safa-combo
          v-model="selectedArchiveGrp"
          cdcName="selectedArchiveGrp"
          ciName="CI_ArchiveGroup"
          class="col-12 col-md-3"
          domainName="CI_SaraM1"
          label="گروه آرشیو"
        />
        <safa-text
          v-model="baseLibResults.ArchiveWrapper.BizCode"
          class="col-12 col-md-3"
          label="کلید آرشیو"
        />
        <safa-text
          v-model="baseLibResults.Base_RegisterPlack_Str"
          cdcName="Base_RegisterPlack_Str"
          class="col-12 col-md-3"
          label="پلاک ثبتی"
        />
      </div>
    </internal-section>
    <ArchiveWrap
      v-if="formLoaded"
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
      :options="archiveOptions"
    ></ArchiveWrap>
  </form-wrapper>
</safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/archive/ArchivElectronic',

  mixins: [baseFormMixin],
  components: {
    // FormActions,
  },

  data () {
    return {
      title: 'آرشیو الکترونیک بازدید',
      formKey: '455aa09f-75f6-4e82-affc-5ec50e8ad312',
      name: 'ArchivElectronicBazdid',
      archiveBizCode: '',
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedArchiveGrp: null,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {}
      },
      resourcePermissionResult: null,
      resourceResult: null,
      ciResult: null,
      ciArchiveGroup: [],
      formLoaded: false,
      archiveOptions: {
        showToolbar: false
      }
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
      // eslint-disable-next-line no-undef
      // console.log(archiveStore)
    },
    fetchedData () {
      // getBaseLibInNosaziCode method
      this.ownerName = ''
      this.oldNosaziCode = ''
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc: 'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)

          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            if (this.baseLibResults.ArchiveWrapper) {
              this.selectedArchiveGrp = this.baseLibResults.ArchiveWrapper.CI_ArchiveGroup
            }
            this.formLoaded = true
            this.updateArchiveBizCode(this.baseLibResults.ArchiveWrapper.BizCode)
          }
        })
        .catch((response) => {
          this.workflowListResult = this.getResponse(response)
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      this.isEditable = false
      this.isSearch = true
    },
    // fetchedData (value) {
    //   this.nosaziCode = value._NidNosaziCode
    //   this.loadWorkFlow()
    // },

    // handelChangeCmb
    getArchiveWrapper () {
      this.showLoading()
      let payLoad = {
        pNidNosaziCode: this.baseLibResults.ArchiveWrapper.NidNosaziCode,
        pCI_ArchiveGroup: this.selectedArchiveGrp
      }
      this.$services.SA.getArchiveWrapper(payLoad, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            this.updateArchiveBizCode(this.baseLibResults.ArchiveWrapper.BizCode)
            const strNosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeArchive: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch((response) => {
          this.serverError()
          console.log('error', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    // security cmb
    // getUserResourcePermissions () {
    //   this.showLoading()
    //   let payLoad = {
    //     userGUID: this.getNidUser(),
    //     parentResource: '57984c91-5575-4c0d-be5c-0f80f4cc8655',
    //     signature: null,
    //     defaultAuthorized: false
    //   }
    //   this.$services.security
    //     .getUserResourcePermissions(payLoad)
    //     .then(({ data }) => {
    //       this.resourcePermissionResult = this.getResponse(data)
    //       if (this.resourcePermissionResult.success) {
    //         this.getResources()
    //       }
    //     })
    //     .catch(response => {
    //       console.log('load error', response)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
    getResources () {
      this.showLoading()
      let payLoad = {
        userGUID: this.getNidUser(),
        parentGuid: '7cd5f300-de95-4003-b2cd-4726c2530629',
        resourceType: 2,
        signature: null
      }
      this.$services.security
        .getResources(payLoad)
        .then(({ data }) => {
          this.resourceResult = this.getResponse(data)
          if (this.resourceResult.success) {
          }
        })
        .catch((response) => {
          this.serverError()
          console.log('error', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
    // getCiArciveType () {
    //   this.showLoading()
    //   let payLoad = {
    //     PCiName: 'CI_ArchiveGroup'
    //   }
    //   this.$services.CiSrvSara
    //     .getCI(payLoad)
    //     .then(({ data }) => {
    //       this.ciResult = this.getResponse(data)
    //       if (this.ciResult.success) {
    //         this.ciArchiveGroup = this.ciResult.data
    //       }
    //     })
    //     .catch(response => {
    //       console.log('load', response)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // }
  },
  beforeMount () {
    if (this.selectedRequest) {
      this.baseNosaziCode = this.convertToNosaziCodeObject(this.selectedRequest.BizCode)
      // this.updateArchiveBizCode(this.selectedRequest.BizCode)
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore').district[this.baseNosaziCode.District || 1]
    }
  },
  watch: {
    selectedArchiveGrp () {
      this.getArchiveWrapper()
    }
  },
  mounted () {
    if (!this.selectedRequest) {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
    }
  }
}
</script>
