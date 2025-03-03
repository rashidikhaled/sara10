<template>
  <safa-form
    :id="formKey"
    caption="بررسی و بازدید طرح های توسعه"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <FormWrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getRevisitRequestServiceWithNidProcRes" />
        <safa-status :result="saveRevisitRequestServiceRes" />
      </template>
      <fit>
        <safa-tabs fit v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu label="اطلاعات کلی" name="infoTab" />
            <tab-menu label="مشخصات عملیات حفاری" name="operationTab" />
            <tab-menu
              label="مشخصات دستگاه حفار وعوامل اجرایی"
              name="machineTab"
            />
            <tab-menu label="استعلامات" name="queriesTab" />
            <tab-menu label="توضیحات مجوز" name="descriptionTab" />
            <tab-menu label="ادوات ترافیکی" name="trafficInstrumentTab" />
            <tab-menu label="نظافت" name="cleaningTab" />
          </template>
          <tab-content name="infoTab">
            <GeneralInformation
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
              @updateRequestServiceTime="updateRequestServiceTime"
              @getCIRedirectName="getCIRedirectName"
            />
          </tab-content>
          <tab-content name="operationTab">
            <SpecificationsOperations
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="machineTab">
            <SpecificationsMachine
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
              :showRegionPrice="showRegionPrice"
            />
          </tab-content>
          <tab-content name="queriesTab">
            <Queries
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="descriptionTab">
            <DescriptionLicense
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="trafficInstrumentTab">
            <TrafficInstrument
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="cleaningTab">
            <Cleaning
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer v-if="!readOnly">
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveRevisitRequestService"
        >
        <template v-slot:before>
            <btn-default label="نمایش نقشه" @click="mapHandler" />
          </template>
        </FormActions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import GeneralInformation from "./partials/GeneralInformation.vue"
import SpecificationsOperations from "./partials/SpecificationsOperations.vue"
import SpecificationsMachine from "./partials/SpecificationsMachine.vue"
import Queries from "./partials/Queries.vue"
import DescriptionLicense from "./partials/DescriptionLicense.vue"
import TrafficInstrument from "./partials/TrafficInstrument.vue"
import Cleaning from "./partials/Cleaning.vue"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    GeneralInformation,
    SpecificationsOperations,
    SpecificationsMachine,
    Queries,
    DescriptionLicense,
    TrafficInstrument,
    Cleaning
  },

  data () {
    return {
      title: "بررسی و بازدید طرح های توسعه",
      formKey: "C506FA4B-93F7-4E39-A322-E67EE3483B60",
      name: "URevisitRequestService",
      main: true,
      workflowCompatible: true,
      readOnly: false,

      // #services
      getRevisitRequestServiceWithNidProcRes: null,
      saveRevisitRequestServiceRes: null,

      // #variables
      activeTab: "infoTab",
      model: {
        ClsRevisit_RequestService: {
          RequestService_Info: {
            ExportLicenseComments: "",
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
            DigPathLength: 0,
            Description: "",
            OriginalLicenseComments: "",
            RequestService_Time: "",
            CI_DigDelayTime: 0,
            CI_SplitType: 0,
            LetterNo: "",
            LetterDate: "",
            ConfilictWithOther: ""
          },
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
          Description: "",
          OriginalLicenseComments: "",
          txt_RegionPrice: 0,
          CI_DigDelayTime: 0,
          CI_SplitType: 0,
          LetterNo: "",
          LetterDate: "",
          ConfilictWithOther: true,
          ExportLicenseComments: "",
          RequestService_Time: [],
          RequestService_Line: [],
          RequestService_Operations: [],
          RequestService_Contractor: [],
          RequestService_Instrument: [],
          RequestService_Scouring: []
        },
        RequestService_Inquiry: ""
      },
      JustAdavat: false,

      // visibility
      showRegionPrice: false
    }
  },

  async mounted () {
    if (this.selectedRequest) {
      await this.loadObj()
    } else this.hideSidebar(this.name)
    this.setLayout("half")
    if (
      window.getConfigValue("esupParams")?.ClsDigParams?.ShowPriceRegion ??
    false
    ) {
      this.showRegionPrice = true
      // this.model.ClsRevisit_RequestService.RequestService_Operations[0].RegionPrice =
      //   this.model.ClsRevisit_RequestService.RequestService_Operations[0].RegionPrice.ToString()
      // let txtRegionPrice = this.model.ClsRevisit_RequestService.txt_RegionPrice
      // if (txtRegionPrice === null || txtRegionPrice === "") {
      //   this.model.ClsRevisit_RequestService.txt_RegionPrice = "0"
      // }
    }
  },

  methods: {
    loadObj () {
      this.search()
    },
    async getRevisitRequestWithNidProc (nidProc = undefined, readOnly = false) {
      try {
        this.showLoading()

        if (readOnly) {
          this.readOnly = true
        }

        const { data } =
          await this.$services.excavation.getRevisitRequestServiceWithNidProc({
            pRequest: {
              NidProc: nidProc || this.selectedRequest.NidProc
            }
          })
        this.getRevisitRequestServiceWithNidProcRes = this.getResponse(data)
        if (this.getRevisitRequestServiceWithNidProcRes.success) {
          const res = this.getRevisitRequestServiceWithNidProcRes.data.GetRevisit_RequestServiceWithNidProcResult
          if (res.ClsRevisit_RequestService) {
            this.model.ClsRevisit_RequestService = res.ClsRevisit_RequestService
            const lines = res?.ClsRevisit_RequestService?.Request_Line ?? []
            if (Array.isArray(lines) && lines.length > 0) {
              const WKT = lines[0].Line ?? ""

              this.showWKT({ WKT }, true, null, null, "digline")
            }
            setTimeout(() => {
              this.model.ClsRevisit_RequestService.RequestService_Info.CI_RequesterType =
                this.getRevisitRequestServiceWithNidProcRes.data.GetRevisit_RequestServiceWithNidProcResult.ClsRevisit_Request.RequestService_Info.CI_RequesterType
            }, 500)
          }
          // this.$refs.executiveRef.loadObj()
          // this.$refs.generalInformation.getRedirectNameList()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    search () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "4d67aca7-d8d3-4ad7-81ec-03efab6e7233" // حاوی دیتا
        }
      }
      this.$services.excavation
        .getRevisitRequestServiceWithNidProc(payLoad)
        .then(async ({ data }) => {
          this.getRevisitRequestServiceWithNidProcRes = await this.getResponse(data)
          if (this.getRevisitRequestServiceWithNidProcRes.success) {
            this.model =
              this.getRevisitRequestServiceWithNidProcRes.data.GetRevisit_RequestServiceWithNidProcResult
            this.normaliedRequestTime()
            // this.mapHandler()
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem} اطلاعات فرم ${this.title} نمایش داده شد.`
            })
            if (this.selectedRequest && this.isNewRequest === false) {
              await this.getRevisitRequestWithNidProc()
            }
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
    mapHandler () {
      this.showLine()
      this.setLayout("half")
    },
    showLine () {
      const wktList = this.model?.ClsRevisit_RequestService?.RequestService_Line ?? []
      if (Array.isArray(wktList) && wktList.length > 0) {
        const WKT = wktList[0].Line ?? ""
        // this.showWKT({ WKT }, true, null, null, "digline")
        // this.$KaisMap.StrEDITWKT = WKT
        // this.showWKT({ WKT }, false, null, null, "digline")
        this.showWKT({ WKT }, false, {
          line: {
            Name: "digline",
            dashed: true
          }
        })
        this.mapZoom(17)
      }
    },
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.$KaisMap.Clear()
      this.mapZoom(5)
    },
    normaliedRequestTime () {
      if (!this.model.ClsRevisit_RequestService) return
      let normaliedRequestTime = this.model.ClsRevisit_RequestService.RequestService_Time.map(
        (e) => {
          return {
            ...e,
            StartDateExtension: e.StartDate,
            EndDateExtension: e.EndDate
          }
        }
      )
      this.model.ClsRevisit_RequestService.RequestService_Time = normaliedRequestTime
    },
    saveRevisitRequestService () {
      // this.model.ClsRevisit_RequestService?.JustAdavat = this.JustAdavat
      // if (this.model?.ClsRevisit_RequestService?.RequestService_Operations) {
      //   this.model?.ClsRevisit_RequestService?.RequestService_Operations.map(
      //     (e) => {
      //       e.RegionPrice = Number(
      //         this.ClsRevisit_RequestService.txt_RegionPrice
      //       )
      //     }
      //   )
      // }
      let RequestMessage = {}
      RequestMessage.ClsRevisit_RequestService =
      this.model.ClsRevisit_RequestService
      RequestMessage.UserName = this.getUserDisplayName() || ""
      RequestMessage.TaskTitel = this.taskInfo?.TaskTitel ?? ""
      RequestMessage.FormName = "URevisit_Request_Service"
      RequestMessage.UserGroups = this.currentUser?.UserGroups ?? []

      const payload = {
        pRequest: RequestMessage
      }
      this.showLoading()
      this.$services.excavation
        .saveRevisitRequestService(payload)
        .then(async ({ data }) => {
          this.saveRevisitRequestServiceRes = this.getResponse(data)
          if (this.saveRevisitRequestServiceRes.success) {
            // this.model.ClsRevisit_RequestService = this.saveRevisitRequestServiceRes.data.ClsRevisit_RequestService
            this.isEditable = false
            this.showSuccess('ذخیره با موفقیت انجام شد.')
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} ذخیره شد.`
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
    updateRequestServiceTime () {
      const info = this.model.ClsRevisit_RequestService
      if (info && info.RequestService_Time && info.RequestService_Time.length > 0) {
        const list =
          info.RequestService_Time?.map((m) => {
            const StartDateExtension = m.StartDateExtension || currentDate()
            m.Duration =
              this.compareDays(StartDateExtension, m.EndDateExtension) < 0
                ? 0
                : this.compareDays(StartDateExtension, m.EndDateExtension)
            m.EndDateExtension = m.Duration === 0 ? "" : m.EndDateExtension
            return {
              ...m,
              CI_Phase: m.CI_Phase || 0,
              StartDateExtension
            }
          }) ?? []
        this.model.ClsRevisit_RequestService.RequestService_Time = list
      }
    },
    compareDays (date1, date2) {
      if (!date1 || !date2) return ""
      PersianDate.toCalendar("persian")
      const normalizeDate1 = new PersianDate(
        date1.split("/").map((x) => Number(x))
      )
      const normalizeDate2 = new PersianDate(
        date2.split("/").map((x) => Number(x))
      )
      const res = normalizeDate2.diff(normalizeDate1, "days")
      return res
    },
    getCIRedirectName () {
      this.model.ClsRevisit_RequestService.RequestService_Info.CI_RedirectName =
      this.getRevisitRequestServiceWithNidProcRes?.data?.GetRevisit_RequestServiceWithNidProcResult
        ?.ClsRevisit_RequestService?.RequestService_Info?.CI_RedirectName ?? null
    }
  },
  watch: {
    "this.model.ClsRevisit_RequestService.RequestService_Info.DigPathLength": {
      handler () {
        if (
          this.model.ClsRevisit_RequestService.RequestService_Info.DigPathLength
        )
        { return }
        this.model.ClsRevisit_RequestService.RequestService_Line = []
        this.model.ClsRevisit_RequestService.RequestService_Info.RequesterRegion =
          ""
        this.model.ClsRevisit_RequestService.RequestService_Info.AreaCode = ""
        this.model.ClsRevisit_RequestService.RequestService_Info.CI_Region = 0
      }
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
