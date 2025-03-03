<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :padding="false" :title="title">
      <template #header>
        <safa-status :result="loadRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="getBazdidRes" />
        <safa-status :result="initMaduleRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          :m="mode"
          @fetched="fetched"
        />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="TotalInformation" label="اطلاعات کلی" />
            <tab-menu name="DrillingSpecification" label="مشخصات حفاری" />
            <tab-menu
              name="ExecutiveAgentsSpecificationsRenew"
              label="مشخصات عوامل اجرایی"
            />
            <tab-menu name="InquiryRenew" label="استعلامات" />
            <tab-menu name="Description" label="توضیحات تمدید مجوز" />
            <tab-menu name="BuildingHistory" label="سوابق شهرسازی ملک" />
            <!-- v-if="false" -->
            <tab-menu
              name="TrafficToolsRenew"
              label="ادوات ترافیکی"
            />
          </template>

          <tab-content name="TotalInformation">
            <TotalInformation
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="DrillingSpecification">
            <DrillingSpecification
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="ExecutiveAgentsSpecificationsRenew" :padding="false">
            <ExecutiveAgentsSpecifications
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="InquiryRenew">
            <Inquiry
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="TrafficTools">
            <TrafficTools
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="Description">
            <Description
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="BuildingHistory" :padding="false">
            <BuildingHistory
              v-model="model"
              :formKey="formKey"
              :title="title"
              :name="name"
              :m="mode"
            />
          </tab-content>
          <tab-content name="TrafficToolsRenew" :padding="false">
            <TrafficTools
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
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
<template #before>
  <btn-default label="نمایش نقشه" @click="mapHandler" />

</template>
      </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import TotalInformation from "./partials/TotalInformation.vue"
import DrillingSpecification from "./partials/DrillingSpecification.vue"
import ExecutiveAgentsSpecifications from "./partials/ExecutiveAgentsSpecifications.vue"
import BuildingHistory from "./partials/BuildingHistory.vue"
import Inquiry from "./partials/Inquiry.vue"
import TrafficTools from "./partials/TrafficTools.vue"
import Description from "./partials/Description.vue"
import mapMixin from "src/mixins/mapMixin"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    TotalInformation,
    DrillingSpecification,
    ExecutiveAgentsSpecifications,
    BuildingHistory,
    TrafficTools,
    Inquiry,
    Description
  },
  data () {
    return {
      name: "URenewalRequest",
      title: "تمدید انشعابات شخصی",
      formKey: "3090C460-8777-492D-92E9-574ED3DAC7CB",
      main: true,
      workflowCompatible: true, // 226077

      activeTab: "DrillingSpecification",
      readOnly: false,
      isValidNosaziCode: null,
      buildingHistory: [],
      model: {
        ClsRenewal_Request: {
          Request_Info: {
            AgainRenewal: "",
            AreaCode: "",
            CI_DigDelayTime: 0,
            CI_Duration: 0,
            CI_RedirectName: 0,
            CI_Region: 0,
            CI_RequestType: 0,
            CI_RequesterType: 0,
            CI_SplitType: 0,
            CI_TypeApplicant: 0,
            CI_Years: 1398,
            CellphoneNo: "",
            CodeString: "",
            ConfilictWithOther: false,
            CreatedRequestName: "",
            Description: "",
            DigPathLength: "",
            EntityKey: "",
            EumRequestStatus: 2,
            ExportLicenseComments: "",
            ExportLicenseDate: "",
            ExportLicenseMayorComment: "",
            ExportLicenseNo: "",
            ExportingLicenseUserId: "",
            ExportingUserLicense: "",
            IsApproval: false,
            IsDisapprove: "",
            IsRenewal: false,
            IsRevisit: true,
            IsSara10: "",
            LetterDate: "",
            LetterNo: "",
            NIdProc: "",
            NIdRequest: "",
            PostCode: "",
            RequestDate: "",
            RequesterAddress: "",
            RequesterName: " ",
            RequesterNationalCode: "",
            RequesterRegion: "",
            SysCI_RequestStatus: "",
            TelNo: "",
            TimeCancelRequest: "",
            UrbanCI_RequestType: "",
            UrbanNIdKartablItem: "",
            UrbanNIdRequest: "",
            UrbanRequestType: "",
            UserNameCancelRequest: ""
          },
          Request_Instrument: [],
          Request_Inquiry: [],
          Request_Operations: [],
          Request_Contractor: [],
          Grid_Shahrsazi: []
        }
      },
      loadRes: null,
      saveObjRes: null,
      selectedRow: null,
      getBazdidRes: null,
      initMaduleRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.loadObj()
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    async fetched (e) {
      this.isValidNosaziCode = e
      if (this.selectedRequest) await this.loadObj()
    },
    loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          // NidProc: "b4701822-ab24-4d6c-90e5-a8e7dd7ad5ea"
          NidProc: this.selectedRequest.NidProc
        }
      }
      this.$services.excavation
        .getRenewalRequest(payload)
        .then(async ({ data }) => {
          this.loadRes = this.getResponse(data)
          if (this.loadRes.success) {
            this.model = this.loadRes.data.GetRenewal_RequestResult
            this.getBazdid()
            this.initMadule()
            this.showLine()
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات ${this.title}  برای در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
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
    async  getRenewalRequestNidProc (nidProc = undefined, readOnly = false) {
      try {
        this.showLoading()

        if (readOnly) {
          this.readOnly = true
        }

        const { data } =
  await this.$services.excavation.getRenewalRequest({
    pRequest: {
      NidProc: nidProc || this.selectedRequest.NidProc
    }
  })
        this.loadRes = this.getResponse(data)
        if (this.loadRes.success) {
          const res = this.loadRes.data.GetRenewal_RequestResult
          if (res.ClsRenewal_Request) {
            this.model.ClsRenewal_Request = res.ClsRenewal_Request
            const lines = res?.ClsRenewal_Request?.Request_Line ?? []
            if (Array.isArray(lines) && lines.length > 0) {
              const WKT = lines[0].Line ?? ""

              this.showWKT({ WKT }, true, null, null, "digline")
            }
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.model.ClsRenewal_Request.Line = this.$KaisMap.StrEDITWKT
      // if (!this.isValidNosaziCode) {
      //   return this.showError("کد نوسازی معتبر نمی باشد.")
      // }
      this.showLoading()
      const payload = {
        pRequest: this.model
      }
      this.$services.excavation
        .saveRenewalRequest(payload)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")
            this.model = this.saveObjRes.data.SaveRenewal_RequestResult
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره اطلاعات ${this.title}  برای در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
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
    async getBazdid () {
      try {
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
        const { data } = await this.$services.SC.getBaseParvandehInfo(payload, {
          config: { District: this.baseNosaziCode.District }
        })
        this.getBazdidRes = this.getResponse(data)
        if (this.getBazdidRes.success) {
          this.buildingHistory =
            this.getBazdidRes.data.Base_ParvandehInfo.Base_ShahrsaziArchive
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async initMadule () {
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.initMadule()
        this.initMaduleRes = this.getResponse(data)
        if (this.initMaduleRes.success) {
          this.model = this.initMaduleRes.data?.InitMaduleResult ?? {
            CI_City: 6
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    mapHandler () {
      this.showLine()
      this.setLayout("half")
    },
    showLine () {
      this.clearMap()
      // این بخش مربوط به نمایش اطلاعات نقشه میباشد که درحال حاضر دیتا را طبق سرا 8 نمایش میدهد. اما اگر نیازمندی دیگری وجود داشت ، بعدا به آن اضافه میگردد
      const wktList = this.model?.ClsRenewal_Request?.Request_Line?.[0]?.Line ?? []
      if (Array.isArray(wktList) && wktList.length > 0) {
        const WKT = wktList[0] ?? ''
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
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.$KaisMap.Clear()
      this.mapZoom(5)
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
