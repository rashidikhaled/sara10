<template>
  <safa-form
    :id="formKey"
    caption="ابلاغیه کمیسیون"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper title="ابلاغیه کمیسیون(دعوت به کمیسیون)" :padding="false">
      <template #header>
        <safa-status :result="result" />
        <safa-status :result="saveResult" />
        <safa-status :result="deleteResult" />
        <safa-status :result="cancelResult" />
        <safa-status :result="getDutyFicheByFicheNoRes" />

        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetched"
        />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template #tabs>
            <tab-menu
              name="Proclamation"
              label="ابلاغیه کمیسیون(دعوت به کمیسیون)"
              @click="showFormActions = true"
            />
            <tab-menu
              name="History"
              label="لیست ابلاغات"
              @click="showFormActions = true"
            />
            <tab-menu
              name="Details"
              label="جزییات عوارض"
              @click="getDutyFicheByFicheNo"
            />
            <tab-menu name="Others" label="سایر" @click="onClickOthersTab" />
          </template>
          <tab-content
            name="Proclamation"
            title="ابلاغیه کمیسیون(دعوت به کمیسیون)"
          >
            <Proclamation
              :m="mode"
              :dataModel="model"
              :showFormActions="showFormActions"
              ref="proclamationRef"
            />
          </tab-content>
          <tab-content name="History" title="سوابق" :padding="false">
            <History
              :dataModel="model"
              ref="historyDetailsRef"
              :m="mode"
              @onShowAvarezDetailsInfo="onShowAvarezDetailsInfo"
              :showFormActions="showFormActions"
              @getAllOtherRequestInfo="getAllOtherRequestInfo"
            />
          </tab-content>
          <tab-content name="Details" title="جزییات عوارض" :padding="false">
            <Details v-if="showDetails" ref="detailsRef" v-model="model" :m="mode"  :showFormActions="showFormActions" />

          </tab-content>
          <tab-content name="Others" title="سایر">
            <Others
              :showFormActions="showFormActions"
              :mode2="mode2"
              :OthersDataModel="OthersModel"
              @othersListSelectedRow="othersListSelectedRow"
              @saveOthers="saveOthers"
              @deleteOthers="deleteOthers"
              @neWList="neWList"
              ref="othersRef"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <!-- <safa-popup
        v-model="showDetails"
        title="جزئیات"
        width="900px"
        height="500px"
      >
        <safa-splitter v-model="splitterModel">
          <template #before>
            <safa-datatable
              height="100%"
              max-height="100%"
              fit
              :columns="subCalculate"
              m="r"
              v-model="DutyFicheSub"
              :allowMultipleSelection="false"
              title="ریز محاسات فیش"
              cdcName="subCalculate"
            />
          </template>
          <template #after>
            <safa-datatable
              height="100%"
              max-height="100%"
              fit
              :columns="ficheDetails"
              m="r"
              v-model="DutyFicheOtherFiled"
              cdcName="ficheDetails"
              :allowMultipleSelection="false"
              title="جزئیات فیش"
            />
          </template>
        </safa-splitter>
      </safa-popup> -->
      <template #footer>
        <form-actions
          v-if="showFormActions"
          :m="mode"
          :showEditButton="activeTab === 'Proclamation'"
          @edit="OnEditmode"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template #after>
            <btn-default
              label="ابطال"
              v-if="activeTab === 'History'"
              @click="cancel"
            />
            <btn-default
              label="صدور گواهی"
              v-if="activeTab === 'Proclamation'"
              @click="CertificateInssurance"
            />
            <btn-default
              label="چاپ"
              v-if="activeTab === 'Proclamation'"
              @click="print"
            />
            <btn-default
              label="چاپ پیش نویس"
              v-if="activeTab === 'Proclamation'"
              @click="printDraft"
            />
          </template>
        </form-actions>
        <form-actions
          v-if="activeTab === 'Others'"
          :m="mode2 ? 'e' : 'r'"
          @edit="mode2 = true"
          @cancel="mode2 = false"
          @save="saveOthers"
        >
          <template #after>
            <btn-default label="جدید" @click="neWList" />
            <btn-default label="حذف" @click="deleteOthers" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import Proclamation from "./partials/Proclamation"
import History from "./partials/History"
import Details from "./partials/Details"
import Others from "./partials/Others"
import baseFormMixin from "src/mixins/baseFormMixin"
import converter from "xml-js"
import { currentDate, currentTime } from "src/utils/index"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { uid } from "quasar"
import commission77Mixin from "src/forms/commission77-menu/mixins/commission77Mixin.js"

export default {
  mixins: [baseFormMixin, commission77Mixin],
  components: { Proclamation, History, Details, Others },
  data () {
    return {
      title: "ابلاغیه کمیسیون(دعوت به کمیسیون)",
      formKey: "2AF10414-CD37-48F5-8E09-E55021697D6D",
      name: "UProclamation",
      main: true,
      activeTab: "Proclamation",
      mode2: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        ClsProclamation: {
          CommissionProclamationList: [],
          ProclamationDate: '',
          Description: '',
          DestinationMobile: '',
          DestinationNationalCode: '',
          DestinationName: '',
          CI_ProclamationAgent: 0,
          AgentName: '',
          CI_Destination: 0,
          ReceiveTime: '',
          ReceiveDate: '',
          CI_DeliveryType: 0,
          HoldingTime: '',
          HoldingDate: '',
          CI_ProclamationType: 0,
          ProclamationNo: '',
          AgentNationalCode: ''
        },
        ClsRequest_Info: {
          Request_Info: {
            CreateDate: "",
            NidWorkItem: "",
            OwnerName: "",
            NosaziCode: "",
            Address: "",
            AnnouncementDate: ""
          },
          ProclamationList: [],
          DutyFicheOtherFiled: [],
          SubFicheDetail: [],
          ListFicheInVote: []
        },
        ClsRequest_Notice: {
          Request_Notice: [],
          Result_Request_Notice: []
        },
        Duty_FicheByFicheNo: [],
        IsReceive: false
      },
      OthersModel: {
        ClsOtherRequestInfo: {
          OtherRequestInfo: []
        },
        otherFields: {
          CI_Commission: 0,
          CI_Gender: 0,
          Post: "",
          LocatedAt: "",
          Day: "",
          Dated: "",
          Time: "",
          Other: "",
          Description: ""
        }
      },
      // res
      getDutyFicheByFicheNoRes: null,
      getDutyFicheByFicheNoResult: null,

      result: null,
      FicheNo: "",
      nidRequest: "00000000-0000-0000-0000-000000000000",
      loadResult: null,
      logDetail: null,
      showDetails: false,
      nidFiche: "00000000-0000-0000-0000-000000000000",
      nidProc: "00000000-0000-0000-0000-000000000000",
      saveResult: null,
      showFormActions: false,
      showOthersTabBtn: false,
      historyNidRequest: "00000000-0000-0000-0000-000000000000",
      IsNewOther: false,
      OthersSelectedRow: null,
      nidOtherRequestInfo: "00000000-0000-0000-0000-000000000000",
      deleteResult: null,
      cancelResult: null,
      subCalculate: [
        {
          field: "CI_DutyYear",
          title: "سال",
          width: "100px",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        {
          field: "Price",
          title: "مبلغ",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "CI_DutyFormula",
          title: "فرمول",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "160px"
        },
        {
          field: "CI_DutyFormulaFiche",
          title: "فرمول فیش",
          width: "100px",
          domain: "CI_SaraM1",
          editor: "combo"
        }
      ],
      ficheDetails: [
        {
          field: "Subject",
          title: "عنوان",
          width: "100px"
        },
        {
          field: "Value",
          title: "مقدار",
          width: "100px"
        },
        {
          field: "Comment",
          title: "توضیحات",
          width: "160px"
        }
      ],
      DutyFicheSub: [],
      CommissionProclamationList: [],
      DutyFicheOtherFiled: [],
      splitterModel: 50
    }
  },
  async mounted () {
    if (!this.selectedRequest && !this.selectedCommission77) {
      await this.showError("لطفا یک سطر از کارتابل را انتخاب نمایید!")
      await this.hideSidebar(this.name)
      await this.redirectToKartable()
      return false
    }
    if (this.selectedRequest?.NidProc) {
      this.nidProc = this.selectedRequest?.NidProc
    } else if (this.selectedCommission77) {
      this.nidProc = this.selectedCommission77.NidProc
    } else {
      this.nidProc = this.selectedRequest.NidProc
    }
    await this.loadObj()
    this.showFormActions = true
  },
  methods: {
    fetched (e) {
      this.loadObj()
    },
    async loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.nidProc

        }
      }

      await this.$services.commission77
        .getRequestProclamation(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidProc,
              bizCodeTitle: "NidProc",
              nosaziCode:
                this.selectedRequest?.BizCode ||
                this.selectedCommission77?.BizCode,
              nidWorkItem:
                this.selectedRequest?.NidWorkItem ||
                this.selectedCommission77?.BizCode
            })
            this.loadResult = this.result.data.GetRequestProclamationResult
            this.model.ClsProclamation.CommissionProclamationList = this.loadResult.ClsProclamation.CommissionProclamationList
            this.model.ClsRequest_Info.Request_Info = this.loadResult.ClsRequest_Info.Request_Info
            this.FicheNo = this.loadResult.ClsRequest_Info.Request_FicheDetail?.[0]?.FicheNo
            this.nidRequest = this.loadResult.ClsRequest_Info.NidRequest
            this.model.ClsRequest_Notice.Request_Notice = this.loadResult.ClsRequest_Notice.Request_Notice
            this.model.Duty_FicheByFicheNo = this.loadResult.ClsRequest_Info.ListRequest_Info
            this.model.ClsRequest_Info.ProclamationList = this.loadResult.ClsRequest_Info.ProclamationList
            this.model.ClsRequest_Notice.Result_Request_Notice = this.loadResult.ClsRequest_Notice.Result_Request_Notice
            this.model.ClsRequest_Info.ListFicheInVote = this.loadResult.ClsRequest_Info.ListFicheInVote
            this.model.ClsRequest_Info.SubFicheDetail = this.loadResult.ClsRequest_Info.SubFicheDetail

            if (this.model.ClsRequest_Info.SubFicheDetail.length > 0) {
              let arrayOfClsLog = converter.xml2js(
                this.model.ClsRequest_Info.SubFicheDetail[0]
                  .DutyFicheOtherFiled,
                {
                  compact: true,
                  ignoreDoctype: true,
                  ignoreCdata: true
                }
              )
              if (
                arrayOfClsLog.ArrayOfClsLog &&
                arrayOfClsLog.ArrayOfClsLog.ClsLog
              ) {
                this.$nextTick(() => {
                  this.model.ClsRequest_Info.DutyFicheOtherFiled =
                    arrayOfClsLog.ArrayOfClsLog.ClsLog.map((x) => {
                      return {
                        ...x,
                        Subject: x.Subject._text,
                        Value: x.Value._text,
                        Comment: x.Comment._text
                      }
                    })
                  this.$refs.avarezDetailsRef.dutyFicheOtherFiled =
                    this.model.ClsRequest_Info.DutyFicheOtherFiled
                })
              }
            }
            this.getDutyFicheByFicheNo()
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async getDutyFicheByFicheNo () {
      this.showDetails = true
      try {
        this.showLoading()
        const payload = {
          pFicheNo: this.FicheNo,
          PDutyType: 1,
          pEumBaseInfoGroup: 0
        }
        const { data } = await this.$services.SB.getDutyFicheByFicheNo(
          payload,
          { config: { District: this.district } }
        )
        this.getDutyFicheByFicheNoRes = this.getResponse(data)
        if (this.getDutyFicheByFicheNoRes.success) {
          this.getDutyFicheByFicheNoResult =
            this.getDutyFicheByFicheNoRes.data.Duty_FicheByFicheNo
          if (this.getDutyFicheByFicheNoResult) {
            let arrayOfClsLog = converter.xml2js(
              this.getDutyFicheByFicheNoResult.OtherFields,
              {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              }
            )
            if (
              arrayOfClsLog.ArrayOfClsLog &&
              arrayOfClsLog.ArrayOfClsLog.ClsLog
            ) {
              this.$nextTick(() => {
                this.model.ClsRequest_Info.DutyFicheOtherFiled =
                  arrayOfClsLog.ArrayOfClsLog.ClsLog.map((x) => {
                    return {
                      ...x,
                      Subject: x.Subject._text,
                      Value: x.Value._text,
                      Comment: x.Comment._text
                    }
                  })
                this.$refs.detailsRef.dutyFicheOtherFiled =
                  this.model.ClsRequest_Info.DutyFicheOtherFiled
              })
            }
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.FicheNo,
            bizCodeTitle: "FicheNo"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    onShowAvarezDetailsInfo (dataItem) {
      this.showDetails = true
      this.nidFiche = dataItem.NidFiche
      this.getDutyFicheSubs()
      this.getClalculateLogForCommision77()
    },
    async getDutyFicheSubs () {
      this.showLoading()
      await this.$services.SB.getDutyFicheSubs({
        pNidFiche: this.nidFiche
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.DutyFicheSub = this.result.data.DutyFicheSub
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidFiche,
              bizCodeTitle: "NidFiche"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async getClalculateLogForCommision77 () {
      this.showLoading()
      await this.$services.SB.getClalculateLogForCommision77({
        pNidFiche: this.nidFiche
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.logDetail = this.result.data.DutyFicheOtherFiled
            if (this.logDetail) {
              let arrayOfClsLog = converter.xml2js(this.logDetail, {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              })
              if (
                arrayOfClsLog.ArrayOfClsLog &&
                arrayOfClsLog.ArrayOfClsLog.ClsLog
              ) {
                this.DutyFicheOtherFiled = arrayOfClsLog.ArrayOfClsLog.ClsLog
                this.DutyFicheOtherFiled = this.DutyFicheOtherFiled.map((x) => {
                  return {
                    ...x,
                    Subject: x.Subject._text,
                    Value: x.Value._text,
                    Comment: x.Comment._text
                  }
                })
              }
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidFiche,
              bizCodeTitle: "NidFiche"
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    onClickOthersTab () {
      this.showFormActions = false
      this.showOthersTabBtn = true
    },
    OnEditmode () {
      this.activeTab = "Proclamation"
      this.isEditable = true
      this.showFormActions = true
      this.showOthersTabBtn = false
      if (this.activeTab === "Proclamation") {
        this.model.ClsProclamation.AnnouncementDate = currentDate()
      }
    },
    OthersEditMode () {
      this.showFormActions = false
      this.showOthersTabBtn = true
      this.isEditable = true
    },
    OthersCancelMode () {
      this.showFormActions = false
      this.showOthersTabBtn = true
      this.isEditable = false
    },
    async saveObj () {
      if (!this.isValidForm()) return
      const selectedRows = this.$refs.proclamationRef?.$refs?.RequestNotice?.gridApi?.getSelectedRows() || []
      if (selectedRows.length <= 0) {
        this.showError('ابتدا ردیف اخطاریه ی مورد نظر را از لیست اخطاریه انتخاب کنید !')
      } else {
        this.showLoading()
        let payload = {
          pRequest: {
            ClsProclamation: {
              ProclamationNo:
              this.model.ClsProclamation?.ProclamationNo,
              ProclamationDate:
              this.model.ClsProclamation?.ProclamationDate,
              HoldingDate: this.model.ClsProclamation.HoldingDate,
              HoldingTime: this.model.ClsProclamation.HoldingTime,
              Description:
              this.model.ClsProclamation.Description,
              IsAnnouncement: true,
              NidRequest: [this.nidRequest],
              DestinationMobile: this.model.ClsProclamation.DestinationMobile,
              DestinationNationalCode: this.model.ClsProclamation.DestinationNationalCode,
              DestinationName: this.model.ClsProclamation.DestinationName,
              CI_ProclamationAgent: this.model.ClsProclamation.CI_ProclamationAgent,
              AgentName: this.model.ClsProclamation.AgentName,
              CI_Destination: this.model.ClsProclamation.CI_Destination,
              ReceiveTime: this.model.ClsProclamation.ReceiveTime,
              ReceiveDate: this.model.ClsProclamation.ReceiveDate,
              CI_DeliveryType: this.model.ClsProclamation.CI_DeliveryType,
              CI_ProclamationType: this.model.ClsProclamation.CI_ProclamationType,
              AgentNationalCode: this.model.ClsProclamation.AgentNationalCode,
              CreatorUserName: this.getUserDisplayName()
            }
          }
        }
        await this.$services.commission77
          .saveProclamation(payload)
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)
            if (this.saveResult.success) {
              this.showSuccess("ذخیره با موفقیت انجام شد.")
              this.isEditable = false
              this.loadObj()
              await this.log({
                action: this.logActions.save,
                bizCode:
                this.model.ClsRequest_Info.Request_Info.NidWorkItem ?? "",
                bizCodeTitle: "NidWorkItem"
              })
            }
          })
          .catch((error) => {
            console.error(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    async cancel () {
      // this.showLoading()
      const selectedRequest = this.$refs.historyDetailsRef.$refs.ProclamationListGrid.gridApi.getSelectedRows()?.[0]
      if (!selectedRequest) return this.showError('لطفا ابتدا یک سطر را انتخاب نمایید!')
      let payload = {
        pRequest: {
          ClsProclamation: {
            ...selectedRequest,
            CommissionProclamationList: { ...selectedRequest },
            // ProclamationNo: "",
            // ProclamationDate: "",
            // HoldingDate: "",
            // HoldingTime: "",
            // Description:
            //   this.model.ClsProclamation.Description,
            IsAnnouncement: false,
            NidRequest: [this.nidRequest]
          },
          UserName: this.getUserDisplayName(),
          NidUser: this.getNidUser()
        }
      }
      await this.$services.commission77
        .cancelProclamation(payload)
        .then(async ({ data }) => {
          this.cancelResult = this.getResponse(data)
          if (this.cancelResult.success) {
            this.model.ClsProclamation.ProclamationNo = ""
            this.model.ClsRequest_Info.Request_Info.AnnouncementDate = ""
            this.model.ClsProclamation.HoldingDate = ""
            this.model.ClsProclamation.HoldingTime = ""
            this.showSuccess("ابطال با موفقیت انجام شد.")
            this.isEditable = false
            this.loadObj()
            await this.log({
              action: this.logActions.cancel,
              bizCode:
                this.model.ClsRequest_Info.Request_Info.NidWorkItem ?? "",
              bizCodeTitle: "NidWorkItem"
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async CertificateInssurance () {
      if (this.model.ClsRequest_Notice.Request_Notice.NoticeNo !== null) {
        const reportPath = `${window.getConfigValue('Commission77ReportPath')}/RptLicenseProclamation`
        if (reportPath !== "") {
          const queryParams = {
            NidRequest: this.nidRequest,
            NidUser: this.getNidUser(),
            District: convertStringToNosaziCodeObject(
              this.model.ClsRequest_Info.Request_Info.NosaziCode
            ).District
          }
          this.showReport(reportPath, queryParams)
        } else {
          this.showError("مسیر گزارشات کمیسیون 77 تعریف نشده است")
        }
      } else {
        this.showError(
          "تا زمانی که برای درخواست مورد نظر اخطاریه صادر نشود اجازه چاپ ابلاغیه وجود ندارد"
        )
      }
      await this.log({
        action: this.logActions.certificateExport,
        bizCode: this.model.ClsRequest_Notice.Request_Notice.NoticeNo,
        bizCodeTitle: "NoticeNo",
        saveDesc: `صدور گواهی برای ${this.model.ClsRequest_Notice.Request_Notice.NoticeNo} انجام گردید.`
      })
    },
    async print () {
      if (this.model.ClsRequest_Notice.Request_Notice.NoticeNo !== null) {
        const reportPath = `${window.getConfigValue('Commission77ReportPath')}/RptProclamation`
        if (reportPath !== "") {
          const queryParams = {
            NidRequest: this.nidRequest,
            NidUser: this.getNidUser(),
            District: convertStringToNosaziCodeObject(
              this.model.ClsRequest_Info.Request_Info.NosaziCode
            ).District
          }
          this.showReport(reportPath, queryParams)
          await this.log({
            action: this.logActions.printReport,
            bizCode: this.model.ClsRequest_Notice.Request_Notice.NoticeNo,
            bizCodeTitle: "NoticeNo"
          })
        } else {
          this.showError("مسیر گزارشات کمیسیون 77 تعریف نشده است")
        }
      } else {
        this.showError(
          "تا زمانی که برای درخواست مورد نظر اخطاریه صادر نشود اجازه چاپ ابلاغیه وجود ندارد"
        )
      }
    },
    async printDraft () {
      if (this.model.ClsRequest_Notice.Request_Notice.NoticeNo !== null) {
        const reportPath = `${window.getConfigValue('Commission77ReportPath')}/RptProclamationDraft`
        if (reportPath !== "") {
          const queryParams = {
            NidRequest: this.nidRequest,
            NidUser: this.getNidUser(),
            District: convertStringToNosaziCodeObject(
              this.model.ClsRequest_Info.Request_Info.NosaziCode
            ).District
          }
          this.showReport(reportPath, queryParams)
          await this.log({
            action: this.logActions.printReport,
            bizCode: this.model.ClsRequest_Notice.Request_Notice.NoticeNo,
            bizCodeTitle: "NoticeNo"
          })
        } else {
          this.showError("مسیر گزارشات کمیسیون 77 تعریف نشده است")
        }
      } else {
        this.showError(
          "تا زمانی که برای درخواست مورد نظر اخطاریه صادر نشود اجازه چاپ ابلاغیه وجود ندارد"
        )
      }
    },
    async getAllOtherRequestInfo (selectedNidRequest) {
      this.historyNidRequest = selectedNidRequest
      this.showLoading()
      const payload = {
        pRequest: {
          NidRequest: selectedNidRequest
        }
      }
      await this.$services.commission77
        .getAllOtherRequestInfo(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            let tmpList =
              this.result.data?.ClsOtherRequestInfo?.OtherRequestInfoList?.filter(
                (x) => x.IsRemoved === false
              ) ?? []
            if (tmpList.length > 0) {
              this.OthersModel.ClsOtherRequestInfo.OtherRequestInfo = tmpList
              this.OthersModel.otherFields.CI_Commission = tmpList[0].CI_Commission
              this.OthersModel.otherFields.CI_Gender = tmpList[0].CI_Gender
              this.OthersModel.otherFields.Post = tmpList[0].Post
              this.OthersModel.otherFields.LocatedAt = tmpList[0].LocatedAt
              this.OthersModel.otherFields.Day = tmpList[0].Day
              this.OthersModel.otherFields.Dated = tmpList[0].Dated
              this.OthersModel.otherFields.Time = tmpList[0].Time
              this.OthersModel.otherFields.Other = tmpList[0].Other
              this.OthersModel.otherFields.Description = tmpList[0].Description
            }
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    neWList () {
      this.IsNewOther = true
      this.mode2 = true
      this.OthersModel.otherFields.CI_Commission = 0
      this.OthersModel.otherFields.CI_Gender = 0
      this.OthersModel.otherFields.LocatedAt = ""
      this.OthersModel.otherFields.Post = ""
      this.OthersModel.otherFields.Day = ""
      this.OthersModel.otherFields.Dated = ""
      this.OthersModel.otherFields.Time = ""
      this.OthersModel.otherFields.Other = ""
      this.OthersModel.otherFields.Description = ""
    },
    othersListSelectedRow (row) {
      this.OthersSelectedRow = row
      this.nidOtherRequestInfo = row.data.NidOtherRequestInfo
      this.OthersModel.otherFields.CI_Commission = row.data.CI_Commission
      this.OthersModel.otherFields.CI_Gender = row.data.CI_Gender
      this.OthersModel.otherFields.LocatedAt = row.data.LocatedAt
      this.OthersModel.otherFields.Post = row.data.Post
      this.OthersModel.otherFields.Day = row.data.Day
      this.OthersModel.otherFields.Dated = row.data.Dated
      this.OthersModel.otherFields.Time = row.data.Time
      this.OthersModel.otherFields.Other = row.data.Other
      this.OthersModel.otherFields.Description = row.data.Description
    },

    async saveOthers () {
      if (!this.isValidForm()) return
      if (this.OthersModel.otherFields.Description === "") {
        this.showError("توضیحات سایر وارد نشده است")
        return
      } else if (
        this.historyNidRequest === null ||
        this.historyNidRequest === "00000000-0000-0000-0000-000000000000"
      ) {
        this.showError(
          "ابتدا ردیف ابلاغ مورد نظر را از قسمت سوابق ابلاغیه انتخاب نمایید"
        )
        return
      }
      let tmp = this.OthersModel.otherFields
      if (this.IsNewOther === true) {
        tmp.NidOtherRequestInfo = uid()
        tmp.NidRequest = this.historyNidRequest
        tmp.CreateDate = currentDate()
        tmp.CreateTime = currentTime()
        tmp.NidUser = this.getNidUser()
        tmp.UserName = this.currentUser.UserName
        tmp.IsRemoved = false
        tmp.CI_Commission = this.OthersModel.otherFields.CI_Commission
        tmp.CI_Gender = this.OthersModel.otherFields.CI_Gender
        tmp.Post = this.OthersModel.otherFields.Post
        tmp.LocatedAt = this.OthersModel.otherFields.LocatedAt
        tmp.Day = this.OthersModel.otherFields.Day
        tmp.Dated = this.OthersModel.otherFields.Dated
        tmp.Time = this.OthersModel.otherFields.Time
        tmp.Other = this.OthersModel.otherFields.Other
        tmp.Description = this.OthersModel.otherFields.Description
      } else if (this.OthersSelectedRow === null) {
        this.showError("لطفا از جدول لیست سایر ردیفی جهت ویرایش انتخاب کنید")
        return
      } else {
        tmp.NidOtherRequestInfo = this.nidOtherRequestInfo
        tmp.CI_Commission = this.OthersModel.otherFields.CI_Commission
        tmp.CI_Gender = this.OthersModel.otherFields.CI_Gender
        tmp.Post = this.OthersModel.otherFields.Post
        tmp.LocatedAt = this.OthersModel.otherFields.LocatedAt
        tmp.Day = this.OthersModel.otherFields.Day
        tmp.Dated = this.OthersModel.otherFields.Dated
        tmp.Time = this.OthersModel.otherFields.Time
        tmp.Other = this.OthersModel.otherFields.Other
        tmp.Description = this.OthersModel.otherFields.Description
        tmp.EditDate = currentDate()
        tmp.EditTime = currentTime()
        tmp.EditorUserName = this.currentUser.UserName
        tmp.EditorNidUser = this.getNidUser()
      }
      this.showLoading()
      let payload = {
        pRequest: { ClsOtherRequestInfo: { OtherRequestInfo: { ...tmp } } }
      }
      await this.$services.commission77
        .saveOtherRequestInfo(payload)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")

            this.mode2 = false
            this.getAllOtherRequestInfo(this.historyNidRequest)
            await this.log({
              action: this.logActions.save,
              bizCode: this.historyNidRequest ?? "",
              bizCodeTitle: "historyNidRequest"
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    deleteOthers () {
      if (this.OthersSelectedRow === null) {
        this.showError("ردیفی جهت ویرایش وجود ندارد")
      } else {
        this.showConfirm("آیا از حذف آیتم مورد نظر اطمینان دارید؟").onOk(() => {
          this.delete()
        })
      }
    },
    async delete () {
      let tmp = this.OthersModel.otherFields
      tmp.NidOtherRequestInfo = this.nidOtherRequestInfo
      tmp.IsRemoved = true
      tmp.RemovalDate = currentDate()
      tmp.RemovalTime = currentTime
      tmp.RemovalUserName = this.currentUser.UserName
      tmp.RemovalNidUser = this.getNidUser()

      this.showLoading()
      let payload = {
        pRequest: { ClsOtherRequestInfo: { OtherRequestInfo: { ...tmp } } }
      }
      await this.$services.commission77
        .saveOtherRequestInfo(payload)
        .then(async ({ data }) => {
          this.deleteResult = this.getResponse(data)
          if (this.deleteResult.success) {
            this.showSuccess("حذف با موفقیت انجام شد.")
            this.getAllOtherRequestInfo(this.historyNidRequest)
            await this.log({
              action: this.logActions.delete,
              bizCode: this.historyNidRequest ?? "",
              bizCodeTitle: "historyNidRequest"
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
