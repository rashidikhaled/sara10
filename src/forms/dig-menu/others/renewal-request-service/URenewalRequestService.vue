<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getRenewalRequestServiceRes" />
        <safa-status :result="saveRenewalRequestServiceRes" />
        <safa-status :result="getRenewedInquriesRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab" fit :padding="true">
          <template v-slot:tabs>
            <tab-menu label="اطلاعات" name="infoTab" />
            <tab-menu label="مشخصات عملیات حفاری" name="specificTab" />
            <tab-menu
              label="مشخصات دستگاه حفار و عوامل اجرایی"
              name="drillingTab"
            />
            <tab-menu label="استعلامات" name="inquiryTab" />
            <tab-menu label="توضیحات تمدید مجوز" name="descriptionTab" />
            <tab-menu label="ادوات ترافیکی" name="traficToolsTab" />
          </template>
          <tab-content name="infoTab">
            <Info v-model="model.ClsRenewal_RequestService" :m="mode" />
          </tab-content>
          <tab-content name="specificTab" :padding="false">
            <SpecificationsOperations
              v-model="model.ClsRenewal_RequestService"
              :m="mode"
            />
          </tab-content>
          <tab-content name="drillingTab">
            <DrillingSpecification
              v-model="model.ClsRenewal_RequestService"
              :m="mode"
            />
          </tab-content>
          <tab-content name="inquiryTab">
            <Inquiry
              v-model="model.ClsRenewal_RequestService"
              :m="mode"
              @inquiryHandler="inquiryHandler"
            />
          </tab-content>
          <tab-content name="descriptionTab">
            <fit>
              <text-template
                label="توضیحات"
                label-width="80px"
                v-model="model.ExportLicenseComments"
                cdcName="ExportLicenseComments"
                type="textarea"
                fit
                :m="mode"
              />
            </fit>
          </tab-content>
          <tab-content name="traficToolsTab" :padding="false">
            <TraficTools v-model="model.ClsRenewal_RequestService" :m="mode" />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template #before>
            <btn-default label="نمایش نقشه" @click="mapHandler" />
          </template>
          <template v-slot:after>
            <btn-default
              label="اطلاعات مجوز"
              @click="licenseClick"
              v-if="!isEditable"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"

import { currentDate } from "src/utils/index"
import Info from "./partials/Info.vue"
import SpecificationsOperations from "./partials/SpecificationsOperations.vue"
import DrillingSpecification from "./partials/DrillingSpecification.vue"
import Inquiry from "./partials/Inquiry.vue"
import TraficTools from "./partials/TraficTools.vue"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    Info,
    SpecificationsOperations,
    DrillingSpecification,
    Inquiry,
    TraficTools
  },
  data () {
    return {
      name: "URenewalRequestService",
      title: "تمدید طرح های توسعه",
      formKey: "9DA59093-1393-47B9-A9DC-4EDDCE003308",
      main: true,
      workflowCompatible: true,

      // #services
      getRenewalRequestServiceRes: null,
      saveRenewalRequestServiceRes: null,
      getRenewedInquriesRes: null,

      // #variables
      activeTab: "infoTab",
      nidProc: null,
      requestType: 0,

      IsRequestRenewal: false,
      HasEndDateExtension: true,
      IsSelectedExportRenewal: false,
      tmpSTR: "Save\n",

      model: {
        ExportLicenseComments: null,
        ClsRenewal_RequestService: {
          RequestService_Info: {
            CI_RequestType: 0,
            OriginalLicenseDate: "",
            OriginalLicenseNo: "",
            CI_RequesterType: 0,
            CI_RedirectName: 0,
            CI_Project: 0,
            NIdWorkItem: "",
            CI_Region: 0,
            RequesterRegion: "",
            Boulevard: "",
            MainStreet: "",
            ByStreet: "",
            MainAlley: "",
            ByAlley: "",
            DigPathLength: "",

            CI_DigDelayTime: 0,
            CI_SplitType: 0,
            LetterNo: "",
            LetterDate: "",
            ConfilictWithOther: ""
          },

          RequestServiceMojavez_Time: [],
          RequestService_Time: [],
          RequestService_Operations: [],
          RequestService_Contractor: [],
          RequestService_Line: [],
          RequestService_Instrument: []
        }
      }
    }
  },
  created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    loadObj () {
      // if (!ReferenceEquals(this.ParentOfType<RadWindow>(), null)) {
      //   CmbRequestType.Editable = false
      //   ComboReqester.Editable = false
      //   ComboRegion.Editable = false
      //   ComboRedirect.Editable = false
      //   TxtRequesterRegion.Editable = false
      // }
      this.isEditable = false
      this.nidProc = this.selectedRequest.NidProc
      const IsRequestRenewal = this.taskInfo?.WorkflowInstance ?? false
      this.search(IsRequestRenewal)
    },
    async search (IsRequestRenewal = false) {
      this.isEditable = false
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc, // "5db4c914-e137-4227-9efb-1c5227edc944"
          IsBaygani: IsRequestRenewal
        }
      }
      try {
        const { data } =
          await this.$services.excavation.getRenewalRequestService(payload)
        this.getRenewalRequestServiceRes = this.getResponse(data)
        if (this.getRenewalRequestServiceRes.success) {
          const res =
            this.getRenewalRequestServiceRes.data
              .GetRenewal_RequestServiceResult
          if (res.ClsRenewal_RequestService) {
            this.model = res
            this.model.ClsRenewal_RequestService.RequestService_Info.CI_RequestType = 1
            const obj = this.model.ClsRenewal_RequestService
            if (
              Array.isArray(obj.RequestService_Time) &&
              obj.RequestService_Time.length === 0
            ) {
              let endDate =
                obj?.RequestServiceMojavez_Time[0]?.EndDate ?? currentDate()
              let TmpEndDate = this.addDayToDate(endDate, 1)
              let Tmpphase = obj?.RequestServiceMojavez_Time[0]?.CI_Phase ?? 0
              this.model.ClsRenewal_RequestService.RequestService_Time.push({
                StartDate: TmpEndDate,
                CI_Phase: Tmpphase
              })
            } else {
              if (!this.IsSelectedExportRenewal) {
                // TODO : این بخش از زمل تکمیل گردد
                // const taskInfo = this.taskInfo;
                // if (taskInfo !== null) {
                //   if (!taskInfo.taskTitel.includes("بررسي و بازديد تمديد")) {
                //     var maxEndDate = obj.RequestService_Time.reduce(
                //       (maxDate, i) =>
                //         i.EndDate > maxDate ? i.EndDate : maxDate,
                //       ""
                //     );
                //     obj.RequestService_Time.find(
                //       (i) => i.EndDate === maxEndDate
                //     ).statusMaxDate = true;
                //     this.model.ClsRenewal_RequestService.RequestService_Time =
                //       obj.RequestService_Time.filter(
                //         (i) => i.EndDate !== "" && i.EndDate !== null
                //       );
                //   } else {
                //     this.model.ClsRenewal_RequestService.RequestService_Time =
                //       obj.RequestService_Time.filter(
                //         (f) => f.EndDate !== "" && f.EndDate !== null
                //       );
                //   }
                // }
              }
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} برای شماره در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      const nl = "\n"
      this.tmpSTR = "Save" + nl
      if (this.taskInfo !== null) {
        this.tmpSTR += "TaskInfo is OK"
      } else {
        this.tmpSTR += "TaskInfo is null"
      }

      this.HasEndDateExtension = true
      let requestServiceTimes =
        this.model?.ClsRenewal_RequestService?.RequestService_Time ?? []
      if (requestServiceTimes.length > 0) {
        // چک کردن تاریخ شروع و پایان
        this.tmpSTR += "d1\n"
        requestServiceTimes.forEach((item) => {
          let start = item?.StartDate ?? ""
          let end = item.endDate ?? ""
          if (end === "") {
            this.HasEndDateExtension = false
            return this.showError("تاریخ اتمام پیشنهادی وارد نشده است")
          } else if (start !== "" && end !== "") {
            if (this.compareDays(start, end) > 0) {
              this.HasEndDateExtension = false
              return this.showError(
                "تاریخ اتمام می بایست بعد از تاریخ شروع باشد"
              )
            }
          }
        })
      }
      if (this.HasEndDateExtension === false) return

      this.tmpSTR += "d2" + nl
      this.tmpSTR +=
        "HasEndDateExtension= " + this.HasEndDateExtension.toString() + nl
      if (this.HasEndDateExtension) {
        this.tmpSTR = "d3" + nl
        if (!this.isValidForm()) {
          this.tmpSTR = "d4" + nl
          this.tmpSTR = "d5" + nl
          const obj = this.model.ClsRenewal_RequestService.RequestService_Info
          if (obj.AgainRenewal === null) {
            obj.AgainRenewal = false
          } else if (obj.AgainRenewal === false) {
            obj.AgainRenewal = this.IsSelectedExportRenewal
          }
          this.tmpSTR += "d6" + nl
          this.tmpSTR +=
            "IsSelectedExportRenewal" +
            this.IsSelectedExportRenewal.toString() +
            nl
          this.tmpSTR +=
            "AgainRenewal" +
            this.model.ClsRenewal_RequestService.RequestService_Info
              .AgainRenewal +
            nl
          this.model.ClsRenewal_RequestService.NidUser =
            this.getUserDisplayName()
          this.model.ClsRenewal_RequestService.UserName =
            this.getUserDisplayName()
          this.tmpSTR +=
            "NidUser" +
            this.model.ClsRenewal_RequestService.NidUser.toString() +
            nl
          this.tmpSTR +=
            "UserName" +
            this.model.ClsRenewal_RequestService.UserName.toString() +
            nl
          this.saveRenewalRequestService()
          // TODO این بخش باید از سمت بک اند توضیح داده شود
          // this.tmpSTR += "d7" + nl;
          // UIDig.Common.ClsCommon.EsupLog(this.tmpSTR);
        } else {
          // this.tmpSTR += "d8" + nl;
          //           UIDig.Common.ClsCommon.EsupLog(this.tmpSTR);
          //           return false;
        }
        return true
      }
    },
    async saveRenewalRequestService () {
      try {
        const { data } =
          await this.$services.excavation.saveRenewalRequestService({
            pRequest: {
              ...this.model,
              TaskTitel: this.taskInfo?.TaskTitel ?? "",
              FormName: "URenewal_Request_Service"
            }
          })
        this.saveRenewalRequestServiceRes = this.getResponse(data)
        if (this.saveRenewalRequestServiceRes.success) {
          this.isEditable = false
          this.showMessage(
            "درخواست تمدید های مورد نظر برای استعلام مجدد فرستاده شد"
          )
        }
        this.getRenewedInquries()
        await this.log({
          action: this.logActions.save,
          bizCode: this.selectedRequest.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.selectedRequest.BizCode,
          nidWorkItem: this.selectedRequest.NidWorkItem,
          saveDesc: `ذخیره اطلاعات فرم ${this.title} برای شماره در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    getRenewedInquries () {
      this.showLoading()
      this.IsRequestRenewal = true
      const payload = { pRequest: { NidProc: this.selectedRow.NIdProc } }
      this.$services.excavation
        .getRenewedInquries(payload)
        .then(async ({ data }) => {
          this.getRenewedInquriesRes = this.getResponse(data)

          if (this.getRenewedInquriesRes.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
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
    async licenseClick () {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicence`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc,
        RequestType: this.requestType,
        SysCI_LicenseStatus:
          this.model.ClsRenewal_RequestService.RequestService_Info.SysCI_RequestServiceStatus.toString(),
        Koroki: "",
        NIdRequest:
          this.model.ClsRenewal_RequestService.RequestService_Info
            .NIdRequestService ?? "00000000-0000-0000-0000-000000000000"
      }
      await this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NIdWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    },
    async inquiryHandler (data) {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowInquiry`
      const queryParams = {
        NId: data.NidDelivery_Inquiry,
        RequestType: this.requestType
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: data?.NidDelivery_Inquiry,
        bizCodeTitle: "NidDelivery_Inquiry",
        saveDesc: `مشاهده گزارش برای شماره ${data.No} انجام گردید.`
      })
    },
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.$KaisMap.Clear()
      this.mapZoom(5)
    },
    showLine () {
      this.clearMap()
      const wktList =
        this.model?.ClsRenewal_RequestService?.RequestService_Line ?? []
      if (Array.isArray(wktList) && wktList.length > 0) {
        const lineObj = wktList.filter((f) => f.Line)[0]
        const WKT = lineObj?.Line ?? ""
        // this.$KaisMap.StrEDITWKT = WKT
        // this.showWKT({ WKT }, false)
        this.showWKT({ WKT }, false, {
          line: {
            dashed: true
          }
        })
        this.mapZoom(19)
      }
    },
    mapHandler () {
      this.showLine()
      this.setLayout("half")
    },
    compareDays (date1 = "", date2 = "") {
      if (!date1 || !date2) return ""
      PersianDate.toCalendar("persian")
      const normalizeDate1 = new PersianDate(
        date1.split("/").map((x) => Number(x))
      )
      const normalizeDate2 = new PersianDate(
        date2.split("/").map((x) => Number(x))
      )
      return normalizeDate1.diff(normalizeDate2, "days")
    },
    addDayToDate (date, day = 1) {
      let y = parseInt(date[0])
      let m = parseInt(date[1])
      let d = parseInt(date[2])
      let today = new PersianDate([y, m, d])
      return today.add("months", day)
    }
  },

  beforeDestroy () {
    this.$KaisMap.Clear()
    this.$KaisMap.ClearAllThings()
    this.$KaisMap.ClearMeasure()
    this.clearMap()
    this.setLayout("full")
  }
}
</script>
