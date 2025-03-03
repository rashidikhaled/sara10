<template>
  <safa-form
    :caption="title"
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      vertical
      :title="title"
      :padding="false"
    >
      <template #header>
        <!-- هدر این فرم نمایشی است -->
        <!-- <form-header-by-nosazi-code enabled="0-0-0-0-0-0-0" /> v-model="baseNosaziCode" -->
        <safa-status :result="requestResult" />
      </template>
      <safa-tabs
        v-model="activeTab"
        class="fit"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu
            name="houseInfo"
            label="مشخصات ملک"
          />
          <tab-menu
            name="applicantRequestAndTechnicalOpinion"
            label="درخواست متقاضی و نظر هیئت فنی"
          />
        </template>

        <tab-content
          name="houseInfo"
          title="مشخصات ملک"
        >
          <UHouseInfo
            :m="mode"
            :title="title"
            :name="name"
            :results="results"
            :baseNosaziCode="baseNosaziCode"
          />
        </tab-content>

        <tab-content
          name="applicantRequestAndTechnicalOpinion"
          title="درخواست متقاضی و نظر هیئت فنی"
        >
          <UApplicantRequestAndTechnicalOpinion
            :m="mode"
            :results="results"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveData"
        >
          <template v-slot:after>
            <template v-if="activeTab == 'applicantRequestAndTechnicalOpinion' && isEditable == false">
              <btn-edit
                label="ویرایش توضیحات شهرسازی"
                @click="isEditable == true"
              />
              <btn-edit
                label="ویرایش توضیحات هیأت فنی"
                @click="isEditable == true"
              />
            </template>
            <btn-default label="تأیید کارشناس" />
            <btn-default label="عدم تأیید کارشناس" />
            <btn-default label="تأیید 1" @click="acceptConfirmTechnicalStaff1" />
            <btn-default label="عدم تأیید 1" @click="notAcceptConfirmTechnicalStaff1" />
            <btn-default label="تأیید 2" @click="acceptConfirmTechnicalStaff2" />
            <btn-default label="عدم تأیید 2" @click="notAcceptConfirmTechnicalStaff2" />
            <btn-default label="تأیید 3" @click="acceptConfirmTechnicalStaff3" />
            <btn-default label="عدم تأیید 3" @click="notAcceptConfirmTechnicalStaff3" />
            <btn-default label="صدور گواهی" @click="certificatIssuance" />
            <btn-default label="ابطال گواهی" @click="revokeCertificat" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UHouseInfo from './partials/UHouseInfo'
import UApplicantRequestAndTechnicalOpinion from './partials/UApplicantRequestAndTechnicalOpinion'
// import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  route: '/technical-staff/UTechnicalstaff',
  mixins: [baseFormMixin],
  components: {
    UHouseInfo,
    UApplicantRequestAndTechnicalOpinion
  },
  data () {
    return {
      name: 'UTechnicalstaff',
      title: 'هیئت فنی',
      formKey: '49B4C031-EA83-459E-9C7C-BACF4AD71710',
      main: true,
      workflowCompatible: true,
      activeTab: 'houseInfo',
      requestResult: null,
      baseNosaziCode: '',
      results: {
        Base_AddressInfo: {},
        Base_CommonEstate: {},
        Base_Edge: [],
        Base_HouseInfo: {},
        Base_HouseInfo_Config: {},
        Base_Owner: {},
        Base_PlanMojaz: {},
        Base_PlanMosavab: {},
        Base_RegisterPlack: [],
        ErrorResult: {},
        NidBaseGlobal: '',
        NidBase_Parvandeh_HouseOrDastgah: '',
        NidLib: {
          RRequest: {}
        },
        NidProc: '',
        Sh_BaroKaf: {},
        Sh_TechnicalStaff: [],
        TechnicalStaffLastRecord: null,
        pUser: null
      }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
    }
  },
  methods: {
    loadData () {
      this.baseNosaziCode = this.selectedRequest.BizCode
      this.loadTechnicalStaff()
    },
    loadTechnicalStaff () {
      this.showLoading()
      let payload = {
        pNidProc: this.selectedRequest.NidProc
      }
      this.$services.SC.loadTechnicalStaff(payload)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.results = this.requestResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
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
    saveData () {
      this.showLoading()
      this.results.Base_Edge = this.normalizeBaseEdge()
      this.results.Sh_TechnicalStaff = this.normalizeShTechnicalStaff()
      this.$services.SC.saveTechnicalStaff({
        pTechnicalStaff: this.results
      })
        .then(async ({ data }) => {
          console.log(data, 'save_data')
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
            this.showSuccess('ویرایش اطلاعات هیئت فنی با موفقیت انجام شد.')
            this.loadData()
          }
        })
        .catch((response) => {
          console.log(response, 'error_response')
          this.serverError()
        })
        .finally(() => {
          this.isEditable = false
          this.hideLoading()
        })
    },
    acceptConfirmTechnicalStaff1 () {
      this.confirmTechnicalStaff(1, 1)
    },
    notAcceptConfirmTechnicalStaff1 () {
      this.confirmTechnicalStaff(1, 2)
    },
    acceptConfirmTechnicalStaff2 () {
      this.confirmTechnicalStaff(2, 1)
    },
    notAcceptConfirmTechnicalStaff2 () {
      this.confirmTechnicalStaff(2, 2)
    },
    acceptConfirmTechnicalStaff3 () {
      this.confirmTechnicalStaff(3, 1)
    },
    notAcceptConfirmTechnicalStaff3 () {
      this.confirmTechnicalStaff(3, 2)
    },
    confirmTechnicalStaff (pEumConfirmationType, pEumConfirmTechnicalStaff) {
      this.showLoading()
      let data = {
        pNidProc: this.results.NidProc,
        pEumConfirmationType: pEumConfirmationType,
        pEumConfirmTechnicalStaff: pEumConfirmTechnicalStaff,
        // pUser: this.currentUser,
        pUser: this.currentUser
      }
      this.$services.SC.confirmTechnicalStaff(data)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
            this.hideLoading()
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.loadData()
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
    certificatIssuance () {
      // let self = this
      // let selectedNosaziCode = convertStringToNosaziCodeObject(
      //   this.selectedRequest.BizCode
      // )
      // let data = {
      //   pRequestSec: {
      //     pDtoOut: {
      //       ExportNidUser: '7bc16d9a-9ac4-47af-bc28-adad1622a054',
      //       ExportUserName: 'مدير سيستم (sa)',
      //       NidOutput: '00000000-0000-0000-0000-000000000000',
      //       NidProc: this.selectedRequest.NidProc,
      //       OutputEngTitle: 'Output_MovafeghatOsooli',
      //       OutputPerTitle: 'موافقت اصولی',
      //       ReportName: '/Sara8Reports/RptMovafeghatOsooli',
      //       RevokeDate: '',
      //       RevokeNidUser: '',
      //       RevokeTime: '',
      //       RevokeUserName: ''
      //     },
      //     pNosaziCode: {
      //       Apartment: selectedNosaziCode.Apartment,
      //       Block: selectedNosaziCode.Block,
      //       Building: selectedNosaziCode.Building,
      //       CI_City: 0,
      //       District: selectedNosaziCode.District,
      //       EumBaseInfoGroup: 0,
      //       EumNosaziCodeGroup: 0,
      //       EumNosaziCodeObjType: 0,
      //       EumRevisitGroup: 0,
      //       House: selectedNosaziCode.House,
      //       IsRoot: false,
      //       NidBase: '',
      //       NidNosaziCode: '',
      //       NidNosaziCodeParent: '',
      //       NidRevisit: '',
      //       NidUser: '',
      //       Region: selectedNosaziCode.Region,
      //       Shop: selectedNosaziCode.Region
      //     },
      //     pReportPath: '/Sara8Reports/RptMovafeghatOsooli',
      //     pArchiveDomain: 1,
      //     pReportDomain: 1,
      //     pEntityId: -1,
      //     pCurrentDate: false
      //   }
      // }
      // this.$services.SC.confirmOutput(data)
      //   .then(({ data }) => {
      //     this.OtherResult = this.getResponse(data)

      //     await this.log({
      //       action: this.logActions.certificateExport,
      //       bizCode: this.selectedRequest.BizCode,
      //       bizCodeTitle: 'کد نوسازی'
      //     })
      //   })
      //   .catch((response) => {
      //     this.OtherResult = this.getResponse(response)
      //     this.serverError()
      //   })
      //   .finally(() => {
      //     this.hideLoading()
      //   })
    },
    revokeCertificat () {
      this.showConfirm('آیا از ابطال گواهی اطمینان دارید؟').onOk(
        () => {
          // let self = this
          let data = {
            pNidProc: this.selectedRequest.NidProc
          }
          this.$services.SC.revokeOutput(data)
            .then(async ({ data }) => {
              this.OtherResult = this.getResponse(data)
              await this.log({
                action: this.logActions.revokeCertificate,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `ابطال گواهی روی شماره درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
              })

              this.showSuccess('عملیات با موفقیت انجام شد.')
              this.loadData()
            })
            .catch((response) => {
              console.log(response, 'error_response')
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    },
    normalizeBaseEdge () {
      return this.results.Base_Edge.map(m => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          AddLen: m.AddLen || 0,
          AfterEditBarLen: m.AfterEditBarLen || 0,
          AfterEditSideLen: m.AfterEditSideLen || 0,
          AfterEditWidth: m.AfterEditWidth || 0,
          BackwardLen: m.BackwardLen || null,
          BarLenEffective: m.BarLenEffective || null,
          CI_Moshrefiat: m.CI_Moshrefiat || null,
          CI_PathType: m.CI_PathType || 0,
          CI_Privacy: m.CI_Privacy || null,
          CI_ValBlockFord: m.CI_ValBlockFord || null,
          CI_ViewCode: m.CI_ViewCode || null,
          Comments: m.Comments || null,
          Depth1: m.Depth1 || 0,
          Depth2: m.Depth2 || 0,
          Depth3: m.Depth3 || 0,
          DesignLen: m.DesignLen || 0,
          EdgeAndSideCurrent: m.EdgeAndSideCurrent || null,
          EdgeAndSideDoc: m.EdgeAndSideDoc || null,
          EdgeBarCurrent: m.EdgeBarCurrent || 0,
          EdgeBarDoc: m.EdgeBarDoc || 0,
          EdgeLenCurrent: m.EdgeLenCurrent || 0,
          EdgeLenDoc: m.EdgeLenDoc || 0,
          EntranceWith: m.EntranceWith || null,
          GoFrontLen: m.GoFrontLen || 0,
          GoFrontLenAllow: m.GoFrontLenAllow || 0,
          GoFrontLenOther: m.GoFrontLenOther || 0,
          GoFrontLenOtherAllow: m.GoFrontLenOtherAllow || 0,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidEdge: m.NidEdge || '00000000-0000-0000-0000-000000000000',
          PathKaf: m.PathKaf || 0,
          PathName: m.PathName || null,
          PathWidth: m.PathWidth || 0,
          RegisterPlack: m.RegisterPlack || null,
          Remain: m.Remain || null,
          RemainBarLen: m.RemainBarLen || null,
          RemainSideLen: m.RemainSideLen || null,
          SideWalkWidth: m.SideWalkWidth || null,
          uniqueID: m.uniqueID || '00000000-0000-0000-0000-000000000000',
          ValBlockRowNo: m.ValBlockRowNo || null
        }
      })
    },
    normalizeShTechnicalStaff () {
      return this.results.Base_Edge.map(m => {
        return {
          ...m,
          CI_TechnicalStaffOpinion: m.CI_TechnicalStaffOpinion || 0,
          CI_TechnicalStaffRequest: m.CI_TechnicalStaffRequest || 0,
          CI_TechnicalStaffRequestDetails: m.CI_TechnicalStaffRequestDetails || 0,
          ConfirmDate1: m.ConfirmDate1 || '',
          ConfirmDate2: m.ConfirmDate2 || null,
          ConfirmDate3: m.ConfirmDate3 || null,
          ConfirmTime1: m.ConfirmTime1 || '',
          ConfirmTime2: m.ConfirmTime2 || null,
          ConfirmTime3: m.ConfirmTime3 || null,
          ConfirmUser1: m.ConfirmUser1 || '',
          ConfirmUser2: m.ConfirmUser2 || null,
          ConfirmUser3: m.ConfirmUser3 || null,
          EumConfirmTechnicalStaff1: m.EumConfirmTechnicalStaff1 || 0,
          EumConfirmTechnicalStaff2: m.EumConfirmTechnicalStaff2 || null,
          EumConfirmTechnicalStaff3: m.EumConfirmTechnicalStaff3 || null,
          NidConfirmUser1: m.NidConfirmUser1 || '00000000-0000-0000-0000-000000000000',
          NidConfirmUser2: m.NidConfirmUser2 || null,
          NidConfirmUser3: m.NidConfirmUser3 || null,
          NidProc: m.NidProc || '00000000-0000-0000-0000-000000000000',
          NidTechnicalStaff: m.NidTechnicalStaff || '00000000-0000-0000-0000-000000000000',
          OwnerComments: m.OwnerComments || null,
          TechnicalStaffComments: m.TechnicalStaffComments || null,
          uniqueID: m.uniqueID || '00000000-0000-0000-0000-000000000000',
          UrbanComments: m.UrbanComments || null
        }
      })
    }
  },
  computed: {}
}
</script>
