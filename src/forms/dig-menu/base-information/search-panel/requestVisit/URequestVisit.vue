<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveRevisitRequestRes" />
        <safa-status :result="getBaseParvandehInfoRes" />
        <form-header-by-nosazi-code v-model="baseNosaziCode" />
      </template>
      <safa-tabs v-model="currentTab" fit :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="TotalInformation" label="اطلاعات کلی" />
          <tab-menu name="DrillingSpecification" label="مشخصات حفاری" />
          <tab-menu
            name="ExecutiveAgentsSpecifications"
            label="مشخصات عوامل اجرایی"
          />
          <tab-menu name="Inquiry" label="استعلامات" />
          <tab-menu name="DescriptionLicense" label="توضیحات مجوز" />
          <tab-menu name="BuildingHistory" label="سوابق شهرسازی ملک" />
          <tab-menu name="TrafficTools" label="ادوات ترافیکی" />
          <tab-menu name="Cleaning" label="نظافت" />
        </template>

        <tab-content name="TotalInformation">
          <TotalInformation
            v-model="model"
            :rowSelectData="selectedRequest"
            :m="mode"
          />
        </tab-content>
        <tab-content name="DrillingSpecification">
          <DrillingSpecification
            v-model="model"
            :rowSelectData="selectedRequest"
            :m="mode"
            @updateRequestServiceTime="updateRequestServiceTime"
          />
        </tab-content>
        <tab-content name="ExecutiveAgentsSpecifications" :padding="false">
          <ExecutiveAgentsSpecifications
            v-model="model"
            :rowSelectData="selectedRequest"
            :m="mode"
          />
        </tab-content>
        <tab-content name="Inquiry">
          <Inquiry v-model="model" :rowSelectData="selectedRequest" :m="mode" />
        </tab-content>
        <tab-content name="DescriptionLicense">
          <DescriptionLicense
            v-model="model"
            :rowSelectData="selectedRequest"
            :m="mode"
          />
        </tab-content>
        <tab-content name="BuildingHistory" :padding="false">
          <BuildingHistory
            v-model="model"
            :rowSelectData="selectedRequest"
            :m="mode"
            :gridShahrsazi="model.gridShahrsazi"
          />
        </tab-content>
        <tab-content name="TrafficTools" :padding="false">
          <TrafficTools
            v-model="model"
            :rowSelectData="selectedRequest"
            :m="mode"
          />
        </tab-content>
        <tab-content name="Cleaning" :padding="false">
          <Cleaning
            v-model="model"
            :rowSelectData="selectedRequest"
            :m="mode"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer v-if="!readOnly">
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template v-slot:after>
            <btn-default label="نمایش نقشه" @click="showOnMap" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import TotalInformation from "./partials/TotalInformation"
import DrillingSpecification from "./partials/DrillingSpecification"
import ExecutiveAgentsSpecifications from "./partials/ExecutiveAgentsSpecifications"
import DescriptionLicense from "./partials/DescriptionLicense"
import BuildingHistory from "./partials/BuildingHistory"
import Inquiry from "./partials/Inquiry"
import TrafficTools from "./partials/TrafficTools.vue"
import Cleaning from "./partials/Cleaning"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import mapMixin from "src/mixins/mapMixin"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    TotalInformation,
    DrillingSpecification,
    ExecutiveAgentsSpecifications,
    Inquiry,
    DescriptionLicense,
    BuildingHistory,
    TrafficTools,
    Cleaning
  },
  props: {
    rowSelectData: Object
  },
  computed: {},
  data () {
    return {
      title: "بررسی و بازدید انشعابات شخصی",
      name: "URequestVisit",
      formKey: "9A74D19A-47BC-4F04-987E-29C6AA348F64",
      main: true,
      workflowCompatible: true,
      readOnly: false,
      currentTab: "TotalInformation",
      model: {
        ClsRevisit_Request: {
          Request_Info: {
            MandateDate: null,
            MandateNo: 0,
            DigPathLength: 6508.44,
            AgainRenewal: null,
            AreaCode: "",
            CI_DigDelayTime: 0,
            CI_Duration: null,
            CI_RedirectName: 0,
            CI_Region: 0,
            CI_RequestType: 0,
            CI_RequesterType: 0,
            CI_SplitType: 0,
            CI_TypeApplicant: 0,
            CI_Years: 1399,
            CellphoneNo: "",
            CodeString: "",
            ConfilictWithOther: false,
            CreatedRequestID: "",
            CreatedRequestName: "",
            DateCancelRequest: null,
            Description: "",
            EntityKey: null,
            EumRequestStatus: 2,
            ExportLicenseComments: null,
            ExportLicenseDate: null,
            ExportLicenseMayorComment: null,
            ExportLicenseNo: null,
            ExportingLicenseUserId: null,
            ExportingUserLicense: null,
            IsApproval: false,
            IsDisapprove: null,
            IsRenewal: false,
            IsRevisit: false,
            IsSara10: null,
            LetterDate: null,
            LetterNo: null,
            // NIdProc: "c92063e1-62a3-4f45-aeaf-941012f3613f",
            // NIdRequest: "f5265be6-a73b-4233-a546-244f3bf25c5b",
            // NIdWorkItem: 310840,
            NidUserCancelRequest: null,
            OriginalLicenseComments: null,
            OriginalLicenseDate: null,
            OriginalLicenseNo: null,
            PostCode: "",
            RequestDate: "",
            RequesterAddress: "",
            RequesterName: "",
            RequesterNationalCode: "",
            RequesterRegion: "",
            SysCI_RequestStatus: 1,
            TelNo: "",
            TimeCancelRequest: null,
            UrbanCI_RequestType: 0,
            UrbanNIdKartablItem: null,
            UrbanNIdRequest: 0,
            UrbanRequestType: null,
            UserNameCancelRequest: null
          },
          Request_Inquiry: [],
          Request_Instrument: [],
          Request_Line: [
            {
              Geog: "",
              Line: "",
              NidRequest: "00000000-0000-0000-0000-000000000000",
              NidRequestLine: "00000000-0000-0000-0000-000000000000"
            }
          ],
          Request_Operations: [],
          Request_Time: [],
          Request_Contractor: [],
          RequestService_Scouring: []
        },
        gridShahrsazi: []
      },
      drawingLengthModal: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // services
      saveRevisitRequestRes: null,
      getBaseParvandehInfoRes: null,
      loadObjRes: null
    }
  },
  async mounted () {
    if (this.selectedRequest) {
      await this.loadObj()
      // await this.polygon()
    } else this.hideSidebar(this.name)
  },
  methods: {
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
    loadObj () {
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "c92063e1-62a3-4f45-aeaf-941012f3613f"
        }
      }
      this.showLoading()
      this.$services.excavation
        .getRevisitRequestWithNidProc(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model =
              this.loadObjRes.data.GetRevisit_RequestWithNidProcResult
            this.normaliedRequestTime()
            const strNosazi = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            console.debug("getRevisitRequestWithNidProc payload :>> ", payload)
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
            this.showLine()
            if (this.selectedRequest && this.isNewRequest === false) {
              await this.getRequestInfoWithNidProc()
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
    async getRevisitRequestWithNidProc (nidProc = undefined, readOnly = false) {
      try {
        this.showLoading()

        if (readOnly) {
          this.readOnly = true
        }

        const { data } =
          await this.$services.excavation.getRevisitRequestWithNidProc({
            pRequest: {
              NidProc: nidProc || this.selectedRequest.NidProc
            }
          })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res = this.loadObjRes.data.GetRevisit_RequestWithNidProcResult
          if (res.ClsRevisit_Request) {
            this.model.ClsRevisit_Request = res.ClsRevisit_Request
            const lines = res?.ClsRevisit_Request?.Request_Line ?? []
            if (Array.isArray(lines) && lines.length > 0) {
              const WKT = lines[0].Line ?? ""

              this.showWKT({ WKT }, true, null, null, "digline")
            }
            setTimeout(() => {
              this.model.ClsRevisit_Request.Request_Info.CI_RequesterType =
                this.loadObjRes.data.GetRevisit_RequestWithNidProcResult.ClsRevisit_Request.Request_Info.CI_RequesterType
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
      const newArray = this.currentUser.UserGroups.map(group => ({ GUID: group.GroupGuid, Name: group.GroupName, Attribute: group.GroupTitle }))
      if (this.model.ClsRevisit_Request.Request_Contractor.some((s) => s.NIdCompany === null)) return this.showError("اطلاعات مشخصات عملیات اجرایی به درستی وارد نشده است.")
      let RequestMessage = {
        ClsRevisit_Request: this.model.ClsRevisit_Request,
        UserName: this.getUserDisplayName() || "",
        TaskTitel: this.taskInfo?.TaskTitel ?? "",
        FormName: "URequestVisit",
        UserGroups: newArray
      }
      this.normaliedRequestTimeSaving()
      const payload = {
        pRequest: RequestMessage
      }
      this.showLoading()
      this.$services.excavation
        .saveRevisitRequest(payload)
        .then(async ({ data }) => {
          this.saveRevisitRequestRes = this.getResponse(data)
          if (this.saveRevisitRequestRes.success) {
            this.isEditable = false
            this.showSuccess("ذخیره با موفقیت انجام شد")
            this.loadObj()
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

    btnDrawOnshowOnMap () {
      console.log(this.$KaisMap.setToolTipCallBack)
      this.$KaisMap.ToolTipCallBack = (s) => {
        console.log("ToolTipCallBack", s)
      }
      this.$KaisMap.StrMeasureType = "LineString"
      this.$KaisMap.StartMeasureing()
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
    showOnMap () {
      this.setLayout("half")
      const code = convertNosaziCodeObjectToString(this.baseNosaziCode)
      this.showCodeOnMap(code)
      setTimeout(this.showLine, 200)
    },
    showLine () {
      const requestWKT = this.model.ClsRevisit_Request.Request_Line?.[0]?.Line
      if (requestWKT) {
        this.$KaisMap.StrEDITWKT = requestWKT
        this.showWKT({ WKT: requestWKT }, false, {
          Name: "digline",
          line: {
            dashed: true
          }
        })
        // this.mapZoom(19)
      }
    }
  },
  beforeDestroy () {
    this.mapClear()
    this.setLayout("full")
  }
}
</script>
