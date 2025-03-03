<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90BBA2FE-5569-45B3-9A7B-EB92B3B19CA1"
  >
    <form-wrapper :title="title">
      <fit>
        <div class="row q-gutter-sm">
          <safa-combo
            ciName="CI_ArchiveGroup"
            domainName="engineer"
            label="گروه"
            v-model="selectedArchiveGrp"
            class="col-lg-2 col-md-3 col-sm-2"
          />
          <div>
            <btn-default label="جستجو" @click="getArchiveRootSubject"/>
          </div>
        </div>
        <ArchiveWrap
          v-if="showArchive"
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          style="min-height: 300px"
          class="fit"
          ref="archiveRef"
        ></ArchiveWrap>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
/* eslint-disable no-undef */
import baseFormMixin from 'src/mixins/baseFormMixin'
import kartableCommissionMixin from 'src/forms/commission-menu/mixins/kartableCommissionMixin.js'

// import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  props: {
    lazy: Boolean,
    isLoadDeletedNosaziCode: {
      type: Boolean,
      default: false
    },
    pLoadFunc: {
      type: String,
      default:
        'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo,Sh_RequestInfo'
    }
  },

  data () {
    return {
      title: 'آرشیو',
      name: 'EngineersOperationArchive',
      formKey: '69A841A6-F388-4FA5-AFEA-4D742EE19F83',
      selectedArchiveGrp: 0,
      main: true,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {
          BizCode: null
        },
        Base_RegisterPlack_Str: null
      },
      archiveResults: { ArchiveWrapper: {} },
      showArchive: false,
      nidNosaziCode: '00000000-0000-0000-0000-000000000000',
      nosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  created () {
    // this.nosaziCode = convertStringToNosaziCodeObject(
    //   this.selectedRequest.BizCode
    // )
    this.getArchiveRootSubject()
  },

  methods: {
    // updateArchiveBizCode (bizCode) {
    //   // eslint-disable-next-line no-undef
    //   archiveStore.bizCode = bizCode
    // },
    // async getArchiveWrapper () {
    //   try {
    //     this.showLoading()
    //     // let payLoad = {
    //     //   pNosaziCode: {
    //     //     Apartment: this.nosaziCode.Apartment,
    //     //     Block: this.nosaziCode.Block,
    //     //     Building: this.nosaziCode.Building,
    //     //     CI_City: this.baseLibResults.MainObj.CI_City,
    //     //     District: this.nosaziCode.District,
    //     //     EumBaseInfoGroup: this.baseLibResults.MainObj.EumBaseInfoGroup,
    //     //     EumNosaziCodeGroup: this.baseLibResults.MainObj.EumNosaziCodeGroup,
    //     //     EumNosaziCodeObjType:
    //     //       this.baseLibResults.MainObj.EumNosaziCodeObjType,
    //     //     EumRevisitGroup: this.baseLibResults.MainObj.EumRevisitGroup,
    //     //     House: this.nosaziCode.House,
    //     //     IsRoot: false,
    //     //     NidBase: this.baseLibResults.MainObj.NidBase,
    //     //     NidNosaziCode: this.nidNosaziCode,
    //     //     Region: this.nosaziCode.Region,
    //     //     Shop: this.nosaziCode.Shop,
    //     //   },
    //     //   pCI_ArchiveGroup: this.selectedArchiveGrp || 1,
    //     // };
    //     let payLoad = {
    //       pNidNosaziCode: this.nidNosaziCode,
    //       pCI_ArchiveGroup: this.selectedArchiveGrp
    //     }
    //     const { data } = await this.$services.SA.getArchiveWrapper(
    //       payLoad,
    //       this.config
    //     )

    //     this.requestResult = this.getResponse(data)
    //     if (this.requestResult.success) {
    //       this.archiveResults = this.requestResult.data
    //       if (this.archiveResults.ArchiveWrapper) {
    //         this.updateArchiveBizCode(
    //           this.archiveResults.ArchiveWrapper.BizCode
    //         )
    //         this.showArchive = true
    //       }
    //     } else {
    //       this.showArchive = false
    //     }
    //   } catch (response) {
    //     //   this.serverError()
    //     this.showError("اسناد این شماره پرونده موجود نمی باشد.")
    //     console.log("error", response)
    //   } finally {
    //     this.hideLoading()
    //   }
    // },
    async getArchiveRootSubject () {
      try {
        this.showLoading()
        let payLoad = {
          Request: 'Engineer',
          Code: this.currentUser.username,
          CI_ArchiveGroup: this.selectedArchiveGrp
        }
        const { data } = await this.$services.eng.getArchiveRootSubject(
          payLoad
        )

        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.archiveResults = this.requestResult.data
          this.showArchive = true
        } else {
          this.showArchive = false
        }
      } catch (response) {
        this.showError('اسناد این شماره پرونده موجود نمی باشد.')
        console.log('error', response)
      } finally {
        this.hideLoading()
      }
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfigValue('archiveCore')
    }
  }
}
</script>
