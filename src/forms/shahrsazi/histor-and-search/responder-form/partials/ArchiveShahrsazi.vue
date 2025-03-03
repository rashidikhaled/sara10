<template>
  <safa-form :id="formKey" :caption="title" app-id="d7491b0e-0044-4a37-adbe-e81005baf68d">
    <fit>
      <internal-section>
        <div class="row q-col-gutter-md">
          <safa-combo label="گروه آرشیو" ciName="CI_ArchiveGroup" domainName="CI_SaraM1" class="col-12 col-md-3"
            label-width="60px" v-model="archiveResults.ArchiveWrapper.CI_ArchiveGroup" cdcName="ArchiveGroup" />

          <safa-text label="پلاک ثبتی" class="col-12 col-md-3" label-width="60px"
            v-model="baseLibResults.Base_RegisterPlack_Str" cdcName="Base_RegisterPlack_Str" />
          <safa-text label="کلید آرشیو" v-model="archiveResults.ArchiveWrapper.BizCode"
            v-if="archiveResults.ArchiveWrapper" class="col-12 col-md-3" label-width="60px" cdcName="BizCode" />
          <div v-else class="flex items-center col-12 col-md-3 justify-center">
            <span class="text-grey">اطلاعات کد نوسازی نامعتبرمی باشد.</span>
          </div>
        </div>
      </internal-section>
      <ArchiveWrap v-if="showArchive" :name="archiveConfig.username" :pass="archiveConfig.password"
        :biz-code="archiveBizCode" :options="archiveOptions" style="min-height: 300px;" class="fit" ref="archiveRef">
      </ArchiveWrap>
    </fit>
  </safa-form>
</template>

<script>
/* eslint-disable no-undef */
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  components: {
    // FormActions,
  },
  props: {
    dataItem: Object
    // title: String,
    // formKey: String,
    // name: String
  },
  data () {
    return {
      title: 'آرشیو شهرسازی',
      formKey: '7e384327-373b-4231-96dc-54b49885379c',
      name: 'ArchiveShahrsazi',
      main: true,
      /* sidebarCompatible: true,
      workflowCompatible: true, */
      archiveOptions: {
        showToolbar: false
      },
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
        ArchiveWrapper: {
          BizCode: null
        },
        Base_RegisterPlack_Str: null
      },
      archiveResults: { ArchiveWrapper: {} },
      resourcePermissionResult: null,
      resourceResult: null,
      ciResult: null,
      ciArchiveGroup: [],
      payLoad: {
        pNidNosaziCode: null,
        pCI_ArchiveGroup: null
      },
      showArchive: false,
      archiveBizCode: ''
    }
  },
  beforeMount () {
    this.archiveOptions.showTree = true
  },

  beforeDestroy () {
    this.archiveOptions.showOnlyStates = null
  },
  mounted () {
    this.GetBaseLib_InNosaziCode()
    console.log('dataItem', this.dataItem)
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    GetBaseLib_InNosaziCode () {
      let payload = {
        pNosaziCode: {
          Apartment: this.dataItem.Apartment,
          Block: this.dataItem.Block,
          Building: this.dataItem.Building,
          CI_City: 0,
          District: this.dataItem.District,
          EumBaseInfoGroup: this.dataItem.EumBaseInfoGroup,
          EumNosaziCodeGroup: this.dataItem.EumNosaziCodeGroup,
          EumNosaziCodeObjType: this.dataItem.EumNosaziCodeObjType,
          EumRevisitGroup: this.dataItem.EumRevisitGroup,
          House: this.dataItem.House,
          IsRoot: false,
          NidBase: this.dataItem.NidNosaziCode,
          NidNosaziCode: this.dataItem.NidNosaziCode,
          Region: this.dataItem.Region,
          Shop: this.dataItem.Shop
        }
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payload, {
        config: { District: this.dataItem.District }
      })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            this.payLoad = {
              pNidNosaziCode: this.baseLibResults.ArchiveWrapper.NidNosaziCode,
              pCI_ArchiveGroup: this.selectedArchiveGrp
            }
            this.getArchiveWrapper()
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeArchive: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeTitle: 'BizCodeArchive',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(response => {
          console.log('error', response)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getArchiveWrapper () {
      let payload = {
        pNidNosaziCode: this.dataItem.NidNosaziCode,
        pCI_ArchiveGroup: this.selectedArchiveGrp || 1
      }
      this.$services.SA.getArchiveWrapper(payload, {
        config: { District: this.dataItem.District }
      })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.archiveResults = this.requestResult.data
            if (this.archiveResults.ArchiveWrapper) {
              this.updateArchiveBizCode(
                this.archiveResults.ArchiveWrapper.BizCode
              )
              this.showArchive = true
            }
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeArchive: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeTitle: 'BizCodeArchive',
              nosaziCode: strNosaziCode
            })
          } else {
            this.showArchive = false
          }
        })
        .catch(response => {
          //   this.serverError()
          this.showError('اسناد این شماره پرونده موجود نمیباشد.')
          console.log('error', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  computed: {
    archiveConfig () {
      console.log(window.getConfigValue('archiveCore').district)
      console.log(window.getConfigValue('archiveCore').district[this.dataItem.District])
      return window.getConfigValue('archiveCore').district[this.dataItem.District || 1]
    }
  },
  watch: {
    selectedArchiveGrp () {
      this.GetBaseLib_InNosaziCode()
    },
    archiveConfig () {
      this.$forceUpdate()
      const self = this
      this.$nextTick(function () {
        if (self.$refs.archiveRef) {
          self.$refs.archiveRef.login()
        }
      })
    }
  }
}
</script>
