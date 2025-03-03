<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getRevisitRequestWithNidProcRes" />
        <safa-status :result="saveRevisitRequestRes" />
        <form-header-by-nosazi-code v-model="baseNosaziCode" :m="mode" />
      </template>
      <fit>
        <safa-tabs v-model="currentTab" fit>
          <template v-slot:tabs>
            <tab-menu label="اطلاعات کلی" name="totlaInfo_tab" />
            <tab-menu label="مشخصات حفاری" name="drillingInfo_tab" />
            <tab-menu label="مشخصات عوامل اجرایی" name="executInfo_tab" />
            <tab-menu label="استعلامات" name="inquiry_tab" />
            <tab-menu label="توضیحات مجوز" name="description_tab" />
          </template>
          <tab-content name="totlaInfo_tab">
            <TotlaInfo
              v-model="model"
              :m="mode"
              :name="name"
              :title="title"
              :formKey="formKey"
            />
          </tab-content>
          <tab-content name="drillingInfo_tab">
            <DrillingSpecification
              :m="mode"
              v-model="model"
              :name="name"
              :title="title"
              :formKey="formKey"
              @updateRequestServiceTime="updateRequestServiceTime"

            />
          </tab-content>
          <tab-content name="executInfo_tab">
            <ExecutiveAgentsSpecification
              v-model="model"
              :m="mode"
              :name="name"
              :title="title"
              :formKey="formKey"
            />
          </tab-content>
          <tab-content name="inquiry_tab">
            <Inquiry
              v-model="model"
              :m="mode"
              :name="name"
              :title="title"
              :formKey="formKey"
            />
          </tab-content>
          <tab-content name="description_tab">
            <Description
              v-model="model"
              :m="mode"
              :name="name"
              :title="title"
              :formKey="formKey"
            />
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
          <template v-slot:after> </template>
          <template v-slot:before>
            <btn-default label="نمایش نقشه" @click="mapHandler" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import DrillingSpecification from "./partials/DrillingSpecification.vue"
import ExecutiveAgentsSpecification from "./partials/ExecutiveAgentsSpecification.vue"
import Inquiry from "./partials/Inquiry.vue"
import TotlaInfo from "./partials/TotlaInfo.vue"
import Description from "./partials/Description.vue"
import PersianDate from "persian-date"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
// import axios from "axios"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    DrillingSpecification,
    ExecutiveAgentsSpecification,
    Inquiry,
    TotlaInfo,
    Description
  },
  data () {
    return {
      name: "UReviewRevisitRequest",
      title: "مشخصات پروژه انشعابات شخصی",
      formKey: "D0E2C9BF-E4AF-43FA-8ACC-408FE2E475F4",
      main: true,

      workflowCompatible: true,

      // #services
      getRevisitRequestWithNidProcRes: null,
      saveRevisitRequestRes: null,

      // #variables
      currentTab: "totlaInfo_tab",
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
        ClsRevisit_Request: {
          Request_Info: {
            RequesterNationalCode: "",
            RequesterName: "",
            CellphoneNo: "",
            PostCode: "",
            TelNo: "",
            RequesterAddress: "",
            txt_RegionPrice: "",
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
            CI_DigDelayTime: 0,
            CI_SplitType: 0,
            LetterNo: "",
            LetterDate: "",
            ConfilictWithOther: ""
          },
          Request_Line: [],
          Request_Time: [],
          Request_Operations: [],
          Request_Contractor: [],
          Request_Inquiry: []
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
      let pRequest = {
        NidProc: this.selectedRequest.NidProc
        // NidProc: "f27538b1-3ec0-49f5-91af-0573f3e6c350"
      }
      this.showLoading()
      console.log('nnnnnn', pRequest)
      this.$services.excavation
        .getRevisitRequestWithNidProc({ pRequest })
        .then(async ({ data }) => {
          this.getRevisitRequestWithNidProcRes = this.getResponse(data)
          if (this.getRevisitRequestWithNidProcRes.success) {
            this.model =
              this.getRevisitRequestWithNidProcRes.data.GetRevisit_RequestWithNidProcResult
            const strNosazi = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            this.normaliedRequestTime()
            await this.log({
              action: this.logActions.view,
              bizCode: strNosazi, // this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: strNosazi, // this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات فرم ${this.title}  برای درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.getBazdid()
            this.showCodeOnMap(strNosazi)
            await this.getWKT()
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
    getBazdid () {
      const payload = {
        pNosaziCode: {
          District: this.baseNosaziCode.District,
          Region: this.baseNosaziCode.Region,
          Block: this.baseNosaziCode.Block,
          House: this.baseNosaziCode.House,
          Building: this.baseNosaziCode.Building,
          Apartment: this.baseNosaziCode.Apartment,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc: "Base_ShahrsaziArchive"
      }
      this.showLoading()
      this.$services.SC.getBaseParvandehInfo(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(({ data }) => {
          this.getBaseParvandehInfoRes = this.getResponse(data)
          if (this.getBaseParvandehInfoRes.success) {
            this.model.gridShahrsazi =
              this.getBaseParvandehInfoRes.data.Base_ParvandehInfo.Base_ShahrsaziArchive
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
      const info = this.model.ClsRevisit_Request
      if (info && info.Request_Time && info.Request_Time.length > 0) {
        const list =
          info.Request_Time?.map((m) => {
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
        this.model.ClsRevisit_Request.Request_Time = list
      }
    },
    compareDays (date1, date2) {
      debugger
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
      // if (res <script 0) {
      // this.showError('تاریخ انتها نمیتواند کمتر تاریخ ابتدا باشد.')
      //   return 0
      // } else return res
    },
    normaliedRequestTime () {
      let normaliedRequestTime = this.model.ClsRevisit_Request.Request_Time.map(
        (e) => {
          return {
            ...e,
            StartDateExtension: e.StartDate,
            EndDateExtension: e.EndDate
          }
        }
      )
      this.model.ClsRevisit_Request.Request_Time = normaliedRequestTime
    },
    normaliedRequestTimeSaving () {
      let normaliedRequestTime = this.model.ClsRevisit_Request.Request_Time.map(
        (e) => {
          return {
            ...e,
            StartDate: e.StartDateExtension,
            EndDate: e.EndDateExtension
          }
        }
      )
      this.model.ClsRevisit_Request.Request_Time = normaliedRequestTime
    },
    saveObj () {
      this.showLoading()
      this.model.ClsRevisit_Request.Request_Operations.map((i) => {
        i.RegionPrice = parseFloat(
          this.model.ClsRevisit_Request.Request_Info.txt_RegionPrice
        )
      })
      // const taskInfo = (this.taskInfo || this.selectedRequest?.Task[0]) ?? null
      this.normaliedRequestTimeSaving()
      const pRequest = {
        ClsRevisit_Request: this.model.ClsRevisit_Request,
        UserName: this.getUserDisplayName() || "",
        TaskTitel: this.taskInfo?.TaskTitel ?? "",
        FormName: "UReviewRevisitRequest"
      }
      this.$services.excavation
        .saveRevisitRequest({ pRequest })
        .then(async ({ data }) => {
          this.saveRevisitRequestRes = this.getResponse(data)
          if (this.saveRevisitRequestRes.success) {
            this.isEditable = false
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
    // deleteDrowingOnMap () {
    //   this.$KaisMap.Clear()
    // },

    // btnDrawOnMapHandler () {
    //   console.log(this.$KaisMap.setToolTipCallBack)
    //   this.$KaisMap.ToolTipCallBack = (s) => {
    //     console.log("ToolTipCallBack", s)
    //   }
    //   this.$KaisMap.StrMeasureType = "LineString"
    //   this.$KaisMap.StartMeasureing()
    // },
    async getWKT () {
      if (!this.baseNosaziCode) return ""
      try {
        const code = convertNosaziCodeObjectToString(this.baseNosaziCode)
          .split("-")
          .slice(0, 4)
          .join("-")
        // eslint-disable-next-line no-undef
        // const url = appendUrls([
        //   window.getConfigValue("srvMapUrl"),
        //   "MapFind2"
        // ])
        const { data } = await this.$services.srvMap.MapFind2({
          PWKt: "",
          PBuffer: 1,
          // eslint-disable-next-line no-undef
          NidLayer: window.getConfigValue("mapConfig").DefaultSelectLayer,
          // eslint-disable-next-line no-useless-escape
          PWhere: ` and Code=\'${code}-0-0-0\'`,
          Pfrom: 1,
          Pto: 2
        })

        console.log("@@@@@@@@@@@ WKT", data)
        const res = Array.isArray(data) ? data : data.data
        if (res && res.length > 0) return res[0].WKT || ""
      } catch (e) {
        return ""
      }
    },
    getDrawingData () {
      const _WKT = this.$KaisMap.StrEDITWKT
      if (
        _WKT === "" ||
        _WKT === "()" ||
        _WKT === "POLYGON(())" ||
        _WKT === "POINT()" ||
        _WKT === "LINESTRING()"
      ) {
        this.currentWKT = ""
      } else this.currentWKT = this.$KaisMap.StrEDITWKT
      this.drawingLengthModal = false
    },
    drowingOnMap () {
      this.drawingLengthModal = true
    },
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.$KaisMap.Clear()
      this.mapZoom(5)
    },
    showLine () {
      this.clearMap()
      // این بخش مربوط به نمایش اطلاعات نقشه میباشد که درحال حاضر دیتا را طبق سرا 8 نمایش میدهد. اما اگر نیازمندی دیگری وجود داشت ، بعدا به آن اضافه میگردد
      const requestWKT = this.model.ClsRevisit_Request.Request_Line?.[0]?.Line
      if (requestWKT) {
        this.showWKT({ WKT: requestWKT }, false, {
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
