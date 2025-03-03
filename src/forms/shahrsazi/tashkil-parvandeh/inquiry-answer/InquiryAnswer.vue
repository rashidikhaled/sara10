<template>
  <safa-form :id="formKey" :caption="title" app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <form-wrapper
      title=" پاسخ استعلام"
      vertical
      :padding="false"
      :bordered="false"
    >
      <safa-status :result="loadResult"/>
      <safa-status :result="OtherResult"></safa-status>
      <safa-status :result="saveResult"></safa-status>
      <safa-status :result="revokeResult"></safa-status>

      <ArchiveWrap
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :biz-code="archiveBizCode"
        v-if="hasSodor"
      />

      <safa-tabs v-else v-model="activeTab" height="100%" class="fit">
        <template v-slot:tabs>
          <tab-menu name="showLicenseTab" label="مجوزها"/>
          <tab-menu name="showSpecTab" label="مشخصات"/>
          <tab-menu name="showOwnershipTab" label="مالکین و جهات اربعه"/>
          <tab-menu name="showUserTab" label="کاربری"/>
          <tab-menu name="showCommentTab" label="توضیحات"/>
        </template>

        <tab-content name="showLicenseTab">
          <InquiryAnswerLicense ref="inquiryAnsweRef"  :results="results" :m="mode"/>
        </tab-content>
        <tab-content name="showSpecTab">
          <InquiryAnswerSpec :results="results"/>
        </tab-content>
        <tab-content name="showOwnershipTab" :padding="false">
          <InquiryAnswerOwnership :results="results"/>
        </tab-content>
        <tab-content name="showUserTab" :padding="false">
          <InquiryAnswerUser
            :results="results"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <tab-content name="showCommentTab">
          <InquiryAnswerComment :results="results" :m="mode"/>
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <form-actions
          :showEditButton="!hasSodor"
          :m="mode"
          class="col-12 q-my-sm"
          @edit="isEditable = true"
          @save="save"
          @cancel="isEditable = false"
        >
          <btn-default
            @click="secregistration"
            label="ثبت دبیرخانه"
            v-show="!hasSodor"
          />
          <btn-default
            @click="certificatIssuance"
            label=" صدور گواهی"
            v-show="!hasSodor & (isEditable == false)"
          />
          <btn-default
            @click="preprint"
            label=" چاپ پیش نویس"
            v-show="!hasSodor & (isEditable == false)"
          />
          <btn-default
            label="ابطال گواهی"
            @click="revokeCertificat"
            v-show="hasSodor"
          />
          <btn-default label="چاپ" @click="print" v-show="hasSodor"/>
        </form-actions>
      </template>
      <safa-popup
        v-model="showRevokeReason"
        width="500px"
        height="280px"
        title="توضیحات ابطال"
      >
        <fit>
          <text-template
            class="fit q-pa-sm"
            label="دلیل ابطال"
            v-model="canceledComment"
          />
          <div class="q-gutter-sm q-pa-sm">
            <btn-default label="ابطال" @click="confirmRevoke"/>

            <btn-default label="انصراف" @click="showRevokeReason = false"/>
          </div>
        </fit>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>
<script>
import InquiryAnswerLicense from './partials/InquiryAnswerLicense.vue'
import InquiryAnswerSpec from './partials/InquiryAnswerSpec.vue'
import InquiryAnswerOwnership from './partials/InquiryAnswerOwnership.vue'
import InquiryAnswerUser from './partials/InquiryAnswerUser.vue'
import InquiryAnswerComment from './partials/InquiryAnswerComment.vue'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'
import PersianDate from 'persian-date'
import { GLOBAL_SETTINGS_GUID } from 'src/config/SETTINGS_CONSTs'
import { ClsEnumEumSecNoGroup } from "src/forms/shahrsazi/config/enums.js"

export default {
  name: 'InquiryAnswer',
  route: '/InquiryAnswer',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'پاسخ استعلام',
      formKey: '50F0D27D-625B-49B5-983A-31571F37F6F7',
      name: 'InquiryAnswer',
      main: true,
      workflowCompatible: true,
      activeTab: 'showLicenseTab',
      loadResult: null,
      results: {
        Sh_RequestInfo: {
          BuyerName: "",
          TransferDang: null
        },
        Base_ShahrsaziArchive: [],
        Sh_InquiryResponse: {},
        Base_HouseInfo: {},
        Base_CommonEstate: {},
        Base_Commitment: [],
        Base_Edge: [],
        Base_Owner: [],
        canceledComment: '',
        showRevokeReason: false,
        Base_Front: [],
        Base_Using: [],
        Base_Letter: []
      },
      code: {},
      requestSecObj: null,
      OtherResult: null,
      canceledComment: '',
      showRevokeReason: false,
      saveResult: null,
      updateLastRequestResult: null,
      isView: false,
      checkIsConfirmOutputResult: false,
      buildingSettings: {},
      hasSodor: false,
      revokeResult: null,
      archiveBizCode: ''
    }
  },
  components: {
    InquiryAnswerComment,
    InquiryAnswerUser,
    InquiryAnswerOwnership,
    InquiryAnswerLicense,
    InquiryAnswerSpec
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore').district.ApprovalCertificate
    },
    pEntityId () {
      if (!this.buildingSettings || !this.buildingSettings.ShahrsaziSettings) {
        return -1
      }
      return this.buildingSettings.ShahrsaziSettings
        .ArchiveAnswerEstelamEntityId
    }
  },
  async created () {
    this.buildingSettings = await this.$stKartable.dispatch(
      'formSettings/getSettings',
      {
        key: 'BuildingSettings',
        nidProc: GLOBAL_SETTINGS_GUID
      }
    )
  },
  mounted () {
    if (this.selectedRequest) {
      this.checkIsConfirmOutput()
    } else {
      this.showError('لطفا از کارتابل یک ردیف انتخاب نمایید.')
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    confirmRevoke () {
      const payload = {
        pDtoOut: {
          NidOutput: '00000000-0000-0000-0000-000000000000',
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: 'Output_Inquiry',
          OutputNo: this.results.Sh_InquiryResponse.CertificateNo,
          OutputPerTitle: 'پاسخ استعلام',
          ReportName: '/Sara8Reports/RptInquiry',
          RevokeDate: new PersianDate().toLocale('en').format('L'),
          RevokeNidUser: this.currentUser.NidUser,
          RevokeUserName: this.getUserDisplayName(),
          RevokeComment: this.canceledComment
        },
        pDomain: this.selectedDistrict
      }
      this.$services.SC.revokeOutput(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.revokeResult = this.getResponse(data)
          if (this.revokeResult.success) {
            await this.log({
              action: this.logActions.revokeCertificate,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ابطال گواهی روی شماره درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.showSuccess('ابطال گواهی با موفقیت انجام شد.')
            this.showRevokeReason = false
            this.checkIsConfirmOutput()
          }
        })
        .catch((response) => {
          console.log(response, 'error_response')
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async checkIsConfirmOutput () {
      try {
        this.showLoading()
        let payLoad = {
          pNidProc: this.selectedRequest.NidProc,
          pOutputEngTitle: 'Output_Inquiry'
        }
        const { data } = await this.$services.SC.checkIsConfirmOutput(payLoad, {
          config: {
            District: this.selectedDistrict
          }
        })
        const res = this.getResponse(data)
        this.checkIsConfirmOutputResult = res.data
        if (this.checkIsConfirmOutputResult.Sh_Output) {
          this.hasSodor = true
          this.updateArchiveBizCode(
            this.checkIsConfirmOutputResult.Sh_Output.ArchiveBizCode
          )
        } else {
          this.hasSodor = false
          await this.loadData()
        }
      } catch (response) {
        console.log('error', response)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async loadData () {
      try {
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SC.loadInquiryResponse(payload, {
          config: { District: this.selectedDistrict }
        })
        this.loadResult = this.getResponse(data)
        if (this.loadResult.success) {
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
          }
          this.isView = true
          this.results = this.loadResult.data
          await this.loadRequestSec()
        }
      } catch (response) {
        console.log('load error', response)
        this.serverError()
      }
    },
    async secregistration () {
      // سرویس خطا داره .شیخی
      try {
        this.showLoading()
        let payload = {
          pRequestSec: {
            EumSecNoGroup: ClsEnumEumSecNoGroup.Estelam.value,
            NidProc: this.selectedRequest.NidProc,
            Sh_RequestSec: {
              EumSecNoGroup: ClsEnumEumSecNoGroup.Estelam.value,
              NidProc: this.selectedRequest.NidProc,
              NidSec: '00000000-0000-0000-0000-000000000000',
              ReportPath: '/Sara8Reports/RptInquiry'
            }
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.WorkflowTitel,
            WorkflowGuid: this.selectedRequest.NidWorkflowDeff
          }
        }
        const { data } = await this.$services.SI.saveRequestSec(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.OtherResult = this.getResponse(data)
        if (this.OtherResult.success) {
          this.showSuccess('ثبت دبیرخانه پاسخ استعلام انجام شد')
          await this.loadRequestSec()
          await this.updateLastRequestState()
        }
        await this.log({
          action: this.logActions.save,
          bizCode: this.selectedRequest.NidProc,
          bizCodeTitle: 'NidProc',
          nosaziCode: this.selectedRequest.BizCode
        })
      } catch (response) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadRequestSec () {
      try {
        this.showLoading()
        let payload = {
          pNidProc: this.selectedRequest.NidProc,
          pEumSecNoGroup: ClsEnumEumSecNoGroup.Estelam.value
        }
        const { data } = await this.$services.SI.loadRequestSec(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.requestSecResult = this.getResponse(data)
        if (this.requestSecResult.success) {
          this.requestSecObj = this.requestSecResult.data
          this.$nextTick(() => {
            this.$refs.inquiryAnsweRef.requestSecList = this.requestSecObj.Sh_RequestSec_List.map((x, i) => {
              return {
                ...x,
                ID: i, // cboSec.SelectedIndex = 0;
                Title: `تاریخ : ${x.SecDate} شماره: ${x.SecNo}`
              }
            })
          })
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (response) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async updateLastRequestState () {
      try {
        let updateLastRequestData = {
          pNidProc: this.selectedRequest.NidProc,
          pLastRequestState: 'ثبت دبیرخانه پاسخ استعلام انجام شد'
        }

        const { data } = await this.$services.SC.updateLastRequestState(
          updateLastRequestData,
          {
            config: {
              District: this.selectedDistrict
            }
          }
        )
        this.updateLastRequestResult = this.getResponse(data)
      } catch (response) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async certificatIssuance () {
      try {
        this.showLoading()
        const nosaziCode = convertStringToNosaziCodeObject(
          this.selectedRequest.BizCode
        )
        const payload = {
          pDtoOut: {
            ExportNidUser: this.getNidUser(),
            ExportUserName: this.getUserDisplayName(),
            NidOutput: '00000000-0000-0000-0000-000000000000',
            NidProc: this.selectedRequest.NidProc,
            OutputEngTitle: 'Output_Inquiry',
            OutputPerTitle: 'پاسخ استعلام',
            ReportName: '/Sara8Reports/RptInquiry',
            OutputDate: this.results.Sh_InquiryResponse.CertificateDate,
            OutputNo: this.results.Sh_InquiryResponse.CertificateNo
          },
          pNosaziCode: {
            Apartment: nosaziCode.Apartment,
            Block: nosaziCode.Block,
            Building: nosaziCode.Building,
            CI_City: 0,
            District: nosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: nosaziCode.House,
            IsRoot: false,
            NidBase: '00000000-0000-0000-0000-000000000000',
            NidNosaziCode: '00000000-0000-0000-0000-000000000000',
            NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
            NidRevisit: '00000000-0000-0000-0000-000000000000',
            NidUser: '00000000-0000-0000-0000-000000000000',
            Region: nosaziCode.Region,
            Shop: nosaziCode.Shop
          },
          pReportPath: '/Sara8Reports/RptInquiry',
          pArchiveDomain: nosaziCode.District,
          pReportDomain: nosaziCode.District,
          pCurrentDate: false,
          pEntityId: this.pEntityId
        }
        const { data } = await this.$services.SC.confirmOutput(payload, {
          config: { District: this.selectedDistrict }
        })
        this.OtherResult = this.getResponse(data)
        if (this.OtherResult.success) {
          this.hasSodor = true
          this.showSuccess('صدور گواهی با موفقیت انجام شد.')
          await this.checkIsConfirmOutput()
          await this.log({
            action: this.logActions.certificateExport,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: 'BizCode',
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `صدور گواهی برای ${this.selectedRequest.NidWorkItem} انجام گردید`
          })
        }
      } catch (error) {
        console.log(error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    revokeCertificat () {
      this.showConfirm('آیا از ابطال گواهی اطمینان دارید؟').onOk(() => {
        this.showRevokeReason = true
      })
    },
    async preprint () {
      const reportPath =
        '/Sara8Reports/RptInquiry_Pishnevis'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidProc: this.selectedRequest.NidProc,
        RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
        District: this.selectedDistrict,
        TokenKey: 'HTTP/1.1'
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: 'NidProc',
        nosaziCode: this.selectedRequest.BizCode
      })
    },
    async print () {
      const reportPath =
        '/Sara8Reports/RptInquiry'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidProc: this.selectedRequest.NidProc,
        RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
        District: this.selectedDistrict,
        TokenKey: 'HTTP/1.1'
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: 'NidProc',
        nosaziCode: this.selectedRequest.BizCode
      })
    },
    async update () {
      // updateLastRequestState method
      try {
        let updateLastRequestData = {
          pNidProc: this.selectedRequest.NidProc,
          pLastRequestState: 'ذخیره پاسخ استعلام انجام شد'
        }

        const { data } = await this.$services.SC.updateLastRequestState(
          updateLastRequestData,
          {
            config: {
              District: this.selectedDistrict
              // District: convertStringToNosaziCodeObject(
              //   this.selectedRequest.BizCode
              // ).District
            }
          }
        )
        this.updateLastRequestResult = this.getResponse(data)
      } catch (response) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async save () {
      try {
        this.showLoading()
        this.code = convertStringToNosaziCodeObject(
          this.selectedRequest.BizCode
        )
        let payLoad = {
          pInquiryResponse: this.results,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.WorkflowTitel,
            WorkflowGuid: this.selectedRequest.NidWorkflowDeff
          }
        }
        const { data } = await this.$services.SC.saveInquiryResponse(payLoad, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.isEditable = false
          this.showSuccess('ذخیره با موفقیت انجام شد.')
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: 'NosaziCode',
            nosaziCode: this.selectedRequest.BizCode
          })
          await this.loadData()
          await this.update()
        }
      } catch (response) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
