<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper title="اخطاریه (پیش آگهی)" :padding="false">
      <template #header>
        <safa-status :result="getRequestAlertRes" />
        <safa-status :result="getDutyFicheByFicheNoRes" />
        <safa-status :result="result" />
        <safa-status :result="saveRequestNoticeRes" />
        <safa-status :result="saveRegRequestInfoRes" />
        <safa-status :result="deleteRequestNoticeRes" />
        <safa-status :result="cancelRequestNoticeRes" />
        <safa-status :result="getDutyFichesForCommision77Res" />
        <form-header-by-nosazi-code
          v-model="model.ClsRequest_Info.Request_Info.NosaziCode"
          cdcName="NosaziCode"
          m="r"
          :actions="false"
        />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="Alerts" label="اخطاریه (پیش آگهی)" />
            <tab-menu name="AlertsHistory" label="سوابق اخطار های قبلی" />
            <tab-menu
              name="Details"
              label="جزییات عوارض"
              @click="getDutyFicheByFicheNo"
            />
          </template>
          <tab-content name="Alerts" title="اخطاریه (پیش آگهی)">
            <Alerts
              v-model="model"
              :payload="payloadModel"
              :m="mode"
              :canceled="canceled"
              ref="alertsRef"
            />
          </tab-content>
          <tab-content
            name="AlertsHistory"
            title="سوابق اخطار های قبلی"
            :padding="false"
          >
            <AlertsHistory
              @selectHistoryRow="selectHistoryRow"
              v-model="model"
              ref="AlertsHistory"
            />
          </tab-content>
          <tab-content name="Details" title="جزییات عوارض">
            <Details v-if="showDetails" ref="detailsRef" v-model="model" :m="mode" />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          :showEditButton="activeTab === 'Alerts'"
          @edit="editButton"
          @cancel="isEditable = false"
          @save="save"
        >
          <template v-slot:after>
            <btn-default
              label="ابطال"
              v-if="activeTab === 'Alerts'"
              @click="cancelAlert"
            />
            <btn-default
              label="چاپ"
              v-if="activeTab === 'Alerts'"
              @click="print"
            />
            <btn-default
              label="چاپ پیش نویس"
              v-if="activeTab === 'Alerts'"
              @click="printDraft"
            />
            <btn-default
              label="بروز رسانی"
              v-if="activeTab === 'Alerts'"
              @click="updateObj"
            />
            <btn-default
              label="حذف"
              v-if="activeTab === 'AlertsHistory'"
              @click="deleteAlert"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import commission77Mixin from "src/forms/commission77-menu/mixins/commission77Mixin.js"

import Alerts from "./partials/Alerts.vue"
import AlertsHistory from "./partials/AlertsHistory.vue"
import Details from "./partials/Details.vue"
import converter from "xml-js"
import { uid } from "quasar"
import { currentDate } from "src/utils/index"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, commission77Mixin],
  components: { Alerts, AlertsHistory, Details },
  data () {
    return {
      title: "اخطاریه",
      formKey: "414DB69F-5782-4758-BBED-48DB6555863D",
      name: "UAlert",
      main: true,

      // tab
      activeTab: "Alerts",
      payloadModel: {
        ClsRequest_Info: {
          Request_FicheDetail: [],
          Request_Info: {
            PostCode: "",
            CI_RequestType: 0,
            CreateDate: "",
            NidWorkItem: "",
            Price: 0,
            FromDate: "",
            ToDate: "",
            NosaziCode: ""
          },
          SubFicheDetail: [],
          ListFicheInVote: [],
          DutyFicheOtherFiled: []
        },
        ClsRequest_Notice: {
          Request_Notice: {
            NoticeNo: "",
            DeadlineDate: "",
            DescNotice: "",
            CI_NoticeType: ""
          },
          Result_Request_Notice: []
        },
        ListClsRequest_Info: []
      },
      // model
      model: {
        ClsRequest_Info: {
          Request_FicheDetail: [],
          Request_Info: {
            PostCode: "",
            CI_RequestType: 0,
            CreateDate: "",
            NidWorkItem: "",
            Price: 0,
            FromDate: "",
            ToDate: "",
            NosaziCode: ""
          },
          SubFicheDetail: [],
          ListFicheInVote: [],
          DutyFicheOtherFiled: []
        },
        ClsRequest_Notice: {
          Result_Request_Notice: [],
          Request_Notice: {
            NoticeNo: "",
            DeadlineDate: "",
            DescNotice: "",
            CI_NoticeType: ""
          }
        },
        ListClsRequest_Info: []
      },

      // res
      loadResult: null,
      getRequestAlertRes: null,
      getDutyFicheByFicheNoRes: null,
      result: null,
      getDutyFicheByFicheNoResult: null,
      saveRequestNoticeRes: null,
      saveRegRequestInfoRes: null,
      deleteRequestNoticeRes: null,
      cancelRequestNoticeRes: null,
      getDutyFichesForCommision77Res: null,

      // var
      FicheNo: "",
      nidRequest: "00000000-0000-0000-0000-000000000000",
      historyGrid: [],
      canceled: false,
      showDetails: false,
      nidNotice: "00000000-0000-0000-0000-000000000000",
      nidProc: "00000000-0000-0000-0000-000000000000"
    }
  },
  async created () {
    if (!this.selectedRequest && !this.selectedCommission77) {
      await this.showError("لطفا یک سطر از کارتابل را انتخاب نمایید!")
      await this.hideSidebar(this.name)
      await this.redirectToKartable()
      return false
    }
    if (
      this.selectedRequest?.NidProc) {
      this.nidProc = this.selectedRequest?.NidProc
    } else if (this.selectedCommission77) {
      this.nidProc = this.selectedCommission77.NidProc
    } else {
      this.nidProc = this.selectedRequest.NidProc
    }
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          pRequest: {
            NidProc: this.nidProc
          }
        }
        const { data } = await this.$services.commission77.getRequestAlert(payload)
        this.getRequestAlertRes = this.getResponse(data)
        if (this.getRequestAlertRes.success) {
          this.model = this.getRequestAlertRes.data
          if (this.getRequestAlertRes.data.hasOwnProperty("GetRequestAlertResult")) {
            this.model = this.getRequestAlertRes.data.GetRequestAlertResult
          }
          this.FicheNo =
            this.model.ClsRequest_Info.Request_FicheDetail?.[0]?.FicheNo
          this.nidRequest = this.model.ClsRequest_Info.NidRequest
          let reqNotice = this.model.ClsRequest_Notice.Request_Notice
          this.nidNotice = reqNotice.NidNotice
          this.fillAlertHistory()
          reqNotice = this.model.ClsRequest_Notice.Result_Request_Notice.find(
            (x) => x.NidNotice === this.nidNotice
          )
          if (reqNotice) {
            if (reqNotice.IsCancel === true) {
              this.canceled = true
            } else {
              this.canceled = false
            }
          }
          let notice =
            this.model.ClsRequest_Notice?.Result_Request_Notice[0] ?? {}
          if (notice) {
            this.model.ClsRequest_Notice.NoticeNo = notice.NoticeNo ?? null
            this.model.ClsRequest_Notice.DeadlineDate =
              notice.DeadlineDate ?? null
            this.model.ClsRequest_Notice.DescNotice = notice.DescNotice ?? null
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
            bizCodeTitle: "کدنوسازی",
            nosaziCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
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
            bizCodeTitle: "FicheNo",
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async save () {
      try {
        if (!this.isValidForm()) return
        console.log("payload", this.model)
        const payload = {
          pRequest: {
            ClsRequest_Notice: {
              DeadlineDate: this.model.ClsRequest_Notice.Request_Notice.DeadlineDate,
              DescNotice: this.model.ClsRequest_Notice.Request_Notice.DescNotice,
              CI_NoticeType: this.model.ClsRequest_Notice.Request_Notice.CI_NoticeType,
              IsMultiAlert: true,
              ListNidRequest: [this.nidRequest],
              NidRequest: this.nidRequest,
              NosaziCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
              NoticeNo: this.model.ClsRequest_Notice.Request_Notice.NoticeNo,
              Request_Notice: this.model.ClsRequest_Notice.Request_Notice,
              Result_Request_Notice:
                this.model.ClsRequest_Notice.Result_Request_Notice
            }
          }
        }
        this.showLoading()
        const { data } = await this.$services.commission77.saveRequestNotice(
          payload
        )
        this.saveRequestNoticeRes = this.getResponse(data)
        if (this.saveRequestNoticeRes.success) {
          this.isEditable = false
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
            bizCodeTitle: "کدنوسازی"
          })
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async deleteAlert () {
      try {
        const selectedRequest = this.$refs.AlertsHistory.$refs.RequestNoticeGrid.gridApi.getSelectedRows()?.[0]
        if (!selectedRequest) return this.showError('لطفا ابتدا یک سطر را انتخاب نمایید!')
        const payload = {
          pRequest: {
            ClsRequest_Notice: {
              ...selectedRequest,
              Result_Request_Notice: { ...selectedRequest },
              Request_Notice: { ...selectedRequest },
              NosaziCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
              IsMultiAlert: true,
              NidWorkItem: 0,
              From: 0,
              To: 0
            }
          }
        }
        this.showLoading()
        const { data } = await this.$services.commission77.deleteRequestNotice(
          payload
        )
        this.deleteRequestNoticeRes = this.getResponse(data)
        if (this.deleteRequestNoticeRes.success) {
          this.isEditable = false
          this.showSuccess("حذف با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.delete,
            bizCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
            bizCodeTitle: "NosaziCode"
          })
          await this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    selectHistoryRow (row) {
      let NidNotice = row.NidNotice
      let tempList = this.model.ClsRequest_Notice.Result_Request_Notice
      if (tempList.length > 0) {
        let dto = tempList.find((x) => x.NidNotice === NidNotice)
        if (dto.IsCancel === true) {
          this.canceled = true
        } else {
          this.canceled = false
        }
        this.model.ClsRequest_Notice.Request_Notice = dto
        this.model.ClsRequest_Notice.NoticeNo = dto?.NoticeNo || ""
        this.model.ClsRequest_Notice.DeadlineDate = dto?.DeadlineDate || 0
        this.model.ClsRequest_Notice.DescNotice = dto?.DescNotice || ""
      }
    },
    fillAlertHistory () {
      this.$nextTick(() => {
        this.model.ClsRequest_Notice.Result_Request_Notice =
          this.model.ClsRequest_Notice.Result_Request_Notice.map((x) => {
            let r = { ...x }
            if (x.IsCancel === true) {
              r.class = "bg-red-2"
            }
            return r
          })
      })
    },
    async cancelAlert () {
      try {
        const payload = {
          pRequest: {
            ClsRequest_Notice: {
              DeadlineDate: this.model.ClsRequest_Notice.Request_Notice.DeadlineDate,
              DescNotice: this.model.ClsRequest_Notice.Request_Notice.DescNotice,
              CI_NoticeType: this.model.ClsRequest_Notice.Request_Notice.CI_NoticeType,
              IsMultiAlert: true,
              ListNidRequest: [this.nidRequest],
              NidRequest: this.nidRequest,
              NosaziCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
              NoticeNo: this.model.ClsRequest_Notice.Request_Notice.NoticeNo,
              Request_Notice: this.model.ClsRequest_Notice.Request_Notice,
              Result_Request_Notice:
                this.model.ClsRequest_Notice.Result_Request_Notice,
              NidWorkItem: 0,
              From: 0,
              To: 0
            }
          }
        }
        this.showLoading()
        const { data } = await this.$services.commission77.cancelRequestNotice(
          payload
        )
        this.cancelRequestNoticeRes = this.getResponse(data)
        if (this.cancelRequestNoticeRes.success) {
          this.isEditable = false
          this.showSuccess("ابطال با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.cancel,
            bizCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
            bizCodeTitle: "NosaziCode"
          })
          this.loadObj()
          this.fillAlertHistory()
          this.canceled = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async updateObj () {
      let TmpRequestType =
        this.model.ClsRequest_Info.Request_Info.CI_RequestType
      if (TmpRequestType !== null) {
        if (TmpRequestType === 1) {
          await this.getDutyFichesForCommision77(1, false, false)
        }
        if (TmpRequestType === 2) {
          await this.getDutyFichesForCommision77(3, true, false)
        }
        if (TmpRequestType === 3) {
          await this.getDutyFichesForCommision77(2, true, false)
        }
      }
    },
    async getDutyFichesForCommision77 (
      pDutyType,
      pIncludeShop,
      pIsNosaziIsfaham
    ) {
      try {
        const payload = {
          pFromRow: 0,
          pToRow: 10,
          pDutyType,
          pFromCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
          pToCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
          pFromDate: "",
          pToDate: "",
          pFromPayablePrice: "",
          pToPayablePrice: "",
          pEumDutyFicheStatus: "",
          pIncludeShop,
          pIsNosaziIsfaham
        }
        this.showLoading()
        const { data } = await this.$services.SB.getDutyFichesForCommision77(
          payload,
          { config: { District: this.district } }
        )
        this.getDutyFichesForCommision77Res = this.getResponse(data)
        if (this.getDutyFichesForCommision77Res.success) {
          const res = this.getDutyFichesForCommision77Res.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
            bizCodeTitle: "کدنوسازی"
          })
          if (res.GetFicheForCommision77.length === 1) {
            this.model.ClsRequest_Info.Request_Info.Price =
              res.GetFicheForCommision77[0].PayablePrice
            this.model.ClsRequest_Info.Request_Info.NidFiche =
              res.GetFicheForCommision77[0].NidFiche
            this.model.ClsRequest_Info.Request_Info.FromDate =
              res.GetFicheForCommision77[0].FromDate
            this.model.ClsRequest_Info.Request_Info.ToDate =
              res.GetFicheForCommision77[0].ToDate
            this.model.ClsRequest_Info.Request_Info.TitleRequest =
              this.$refs?.alertsRef?.$refs?.requestTypeRef?.selectedItem
                ?.Title || "" + " " + res.GetFicheForCommision77[0].FicheNo

            const requestFicheDetail = {
              CI_IncomeAccountGroup: 0,
              FicheNo: res.GetFicheForCommision77[0].FicheNo,
              NidFiche: res.GetFicheForCommision77[0].NidFiche,
              NidFicheDetail: uid(),
              PriceFiche: res.GetFicheForCommision77[0].TotalPrice,
              NidRequest: this.model.ClsRequest_Info.Request_Info.NidRequest
            }
            this.model.ClsRequest_Info.Request_FicheDetail = []
            this.model.ClsRequest_Info.Request_FicheDetail.push(
              requestFicheDetail
            )
            this.model.ListClsRequest_Info = []
            this.model.ListClsRequest_Info.push(this.model.ClsRequest_Info)
            this.upadteRequest()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async upadteRequest () {
      try {
        this.showLoading()
        const { data } = await this.$services.commission77.saveRegRequestInfo({
          pRequest: { ListClsRequest_Info: this.model.ListClsRequest_Info }
        })
        this.saveRegRequestInfoRes = this.getResponse(data)
        await this.log({
          action: this.logActions.save,
          bizCode: this.model.ClsRequest_Info.Request_Info.NosaziCode,
          bizCodeTitle: "کدنوسازی"
        })
        // if (this.saveRequestNoticeRes.success) {
        //   this.isEditable = false
        //   this.showSuccess("ذخیره با موفقیت انجام شد.")
        // }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async print () {
      const reportPath = `${window.getConfigValue('Commission77ReportPath')}/RptAlert`
      const queryParams = {
        NidRequest: this.nidRequest,
        NidUser: this.getNidUser(),
        District: this.district
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.nidRequest,
        bizCodeTitle: "NidRequest"
      })
    },
    async printDraft () {
      const reportPath = `${window.getConfigValue('Commission77ReportPath')}/RptAlertDarft`
      const queryParams = {
        NidRequest: this.nidRequest,
        NidUser: this.getNidUser(),
        District: this.district
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.nidRequest,
        bizCodeTitle: "NidRequest"
      })
    },
    editButton () {
      this.isEditable = true
      this.model.ClsRequest_Notice.Request_Notice.NoticeNo = `${this.district}/${currentDate().split('/')[0]}/${this.model.ClsRequest_Info.Request_Info.NidWorkItem}`
    }
  },
  computed: {
    district () {
      return (
        convertStringToNosaziCodeObject(
          this.model.ClsRequest_Info.Request_Info.NosaziCode
        ).District ?? 0
      )
    }
  }
}
</script>
