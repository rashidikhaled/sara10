<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getRevisitRequestWithNidProcRes" />
        <safa-status :result="saveRevisitRequestServiceRes" />
        <safa-status :result="getRevisitRequestServiceWithNidProcRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab" fit>
          <template v-slot:tabs>
            <tab-menu label="اطلاعات کلی" name="totlaInfoReviewEve" />
            <tab-menu label="مشخصات عملیات حفاری" name="digInfoReviewEve" />
            <tab-menu label="مشخصات دستگاه حفار و عوامل اجرایی" name="executInfoReviewEve" />
            <tab-menu label="استعلامات" name="inquiryReviewEve" />
            <tab-menu label="توضیحات مجوز" name="descriptionReviewEve" />
           <tab-menu label="ادوات ترافیکی" name="trafficToolsReviewEve" />
          </template>
          <tab-content name="totlaInfoReviewEve"><TotlaInfoReviewEve v-model="model2" :m="mode"/></tab-content>
          <tab-content name="digInfoReviewEve" :padding="false">
            <DigInfoReviewEve v-model="model2"/>
        </tab-content>
          <tab-content name="executInfoReviewEve" ><ExecutInfoReviewEve v-model="model2" :m="mode"/></tab-content>
          <tab-content name="inquiryReviewEve" > <InquiryReviewEve v-model="model2" :m="mode"/></tab-content>
          <tab-content name="descriptionReviewEve" ><DescriptionReviewEve v-model="model2"/></tab-content>
          <tab-content name="trafficToolsReviewEve"  :padding="false"><TrafficToolsReviewEve  v-model="model2"/></tab-content>
          </safa-tabs>
          </fit>
          <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template v-slot:before>
          <btn-default label="نمایش نقشه" @click="mapHandler" />
        </template>
            <!-- در سرا8 این دکمه وجود ندارد -->
             <!-- <btn-search
              label="جستجو"
              @click="getRevisitRequestWithNidProc"
            /> -->
        </FormActions>
      </template>
          </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ExecutInfoReviewEve from "./partials/ExecutInfoReviewEve.vue"
import InquiryReviewEve from "./partials/InquiryReviewEve.vue"
import DescriptionReviewEve from "./partials/DescriptionReviewEve.vue"
import TrafficToolsReviewEve from "./partials/TrafficToolsReviewEve"
import TotlaInfoReviewEve from "./partials/TotlaInfoReviewEve.vue"
import DigInfoReviewEve from "./partials/DigInfoReviewEve"
import mapMixin from "src/mixins/mapMixin"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: { ExecutInfoReviewEve, InquiryReviewEve, DescriptionReviewEve, TrafficToolsReviewEve, TotlaInfoReviewEve, DigInfoReviewEve },
  data () {
    return {
      title: "مشخصات پروژه اتفاقات",
      formKey: "b5a18ddd-37cd-408c-8b6e-2dabf8ab55b8",
      name: "UReviewEveRevisitRequestEvents",
      main: true,
      workflowCompatible: true, // 334114
      activeTab: "totlaInfoReviewEve",

      // service
      getRevisitRequestWithNidProcRes: null,
      saveRevisitRequestServiceRes: null,
      getRevisitRequestServiceWithNidProcRes: null,

      // model
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
      model2: {
        ClsRevisit_RequestService: {
          RequestService_Info: {
            AgainRenewal: "",
            AreaCode: "",
            Boulevard: "",
            ByAlley: "",
            ByStreet: "",
            CI_DigDelayTime: 0,
            CI_ExtendedDue: 0,
            CI_Project: 0,
            CI_RedirectName: 0,
            CI_Region: 0,
            CI_RequestType: 0,
            CI_RequesterType: 0,
            CI_SplitType: 0,
            CI_Years: 1402,
            ConfilictWithOther: false,
            Description: "",
            DigPathLength: "",
            District: 0,
            EntityKey: "",
            EumRequestStatus: 2,
            ExportLicenseComments: "",
            ExportLicenseDate: "",
            ExportLicenseMayorComment: "",
            ExportLicenseNo: "",
            ExportingLicenseUserId: "",
            ExportingUserLicense: "",
            FollowerCellphoneNo: "",
            IsApproval: false,
            IsDisapprove: "",
            IsEvents: true,
            IsRenewal: false,
            IsRevisit: true,
            IsSara10: "",
            LetterDate: "",
            LetterNo: "",
            MainAlley: "",
            MainStreet: "",
            OriginalLicenseComments: "",
            OriginalLicenseDate: "",
            OriginalLicenseNo: "",
            Region: 0,
            RequestServiceDate: "",
            RequestServiceerName: "",
            RequestServiceerRegion: "",
            RequesterRegion: "",
            SysCI_RequestServiceStatus: 1,
            TimeCancelRequest: "",
            UrbanCI_RequestServiceType: 0,
            UrbanNIdKartablItem: 0,
            UrbanNIdRequestService: 0,
            UrbanRequestServiceType: "",
            UserNameCancelRequest: ""
          },
          RequestService_Time: [],
          RequestService_Instrument: [],
          RequestService_Operations: [],
          RequestService_Contractor: [],
          RequestService_Inquiry: [],
          RequestService_Line: []
        }
      }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    loadObj () {
      let payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "7033fe08-c3b6-4605-ac11-9ec30b46b68a"
        }
      }
      this.showLoading()
      this.$services.excavation
        .getRevisitRequestServiceWithNidProc(payload)
        .then(async ({ data }) => {
          this.getRevisitRequestServiceWithNidProcRes = this.getResponse(data)
          if (this.getRevisitRequestServiceWithNidProcRes.success) {
            this.model2 = this.getRevisitRequestServiceWithNidProcRes.data?.GetRevisit_RequestServiceWithNidProcResult ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
            })
            this.getRevisitRequestWithNidProc()
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
    // search
    getRevisitRequestWithNidProc () {
      this.showLoading()
      const payload = {
        pRequest: {
          // NidProc: "7033fe08-c3b6-4605-ac11-9ec30b46b68a"
          NidProc: this.selectedRequest.NidProc
        }
      }
      this.$services.excavation
        .getRevisitRequestWithNidProc(payload)
        .then(({ data }) => {
          this.getRevisitRequestWithNidProcRes = this.getResponse(data)
          if (this.getRevisitRequestWithNidProcRes.success) {
            // this.model2 =
            //   this.getRevisitRequestWithNidProcRes.data.GetRevisit_RequestWithNidProcResult.ClsRevisit_Request
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
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
    saveObj () {
      // map
      // if (this.model?.ClsRevisit_RequestService?.RequestService_Operations) {
      //   this.model?.ClsRevisit_RequestService?.RequestService_Operations.map((e) => {
      // e.RegionPrice = Number(e.txt_RegionPrice.Value)
      //   })
      // }
      this.RequestMessage = this.model2
      this.RequestMessage.UserName = this.getUserDisplayName() || ""
      this.RequestMessage.TaskTitel = ""
      this.RequestMessage.FormName = "UReviewRevisit_Request_Events"
      this.RequestMessage.UserGroups = { Name: "", Attribute: "", GUID: "" }

      // ApplicationCommon.ClsCommon.UserInfo.Groups.map((Item) => {
      //   this.RequestMessage.UserGroups.Name = Item?.Name ?? ""
      //   this.RequestMessage.UserGroups.Attribute = Item?.Attribute ?? ""
      //   this.RequestMessage.UserGroups.GUID = Item.GUID
      // })

      const payload = {
        pRequest: this.RequestMessage
      }
      this.showLoading()
      this.$services.excavation
        .saveRevisitRequestService(payload)
        .then(async ({ data }) => {
          this.saveRevisitRequestServiceRes = this.getResponse(data)
          if (this.saveRevisitRequestServiceRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} ذخیره شد.`
            })
            this.isEditable = false
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
    // async initMadule () {
    //   try {
    //     this.showLoading()
    //     const { data } = await this.$services.excavation.initMadule()
    //     this.initMaduleRes = this.getResponse(data)
    //     if (this.initMaduleRes.success) {
    //       this.model = this.initMaduleRes.data?.InitMaduleResult ?? {
    //         CI_City: 6
    //       }
    //     }
    //   } catch (e) {
    //     console.error(e)
    //     this.serverError()
    //   } finally {
    //     this.hideLoading()
    //   }
    // },
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.$KaisMap.Clear()
      this.mapZoom(5)
    },
    showLine () {
      this.clearMap()
      // این بخش مربوط به نمایش اطلاعات نقشه میباشد که درحال حاضر دیتا را طبق سرا 8 نمایش میدهد. اما اگر نیازمندی دیگری وجود داشت ، بعدا به آن اضافه میگردد
      const wktList = this.model2?.ClsRevisit_RequestService?.RequestService_Line ?? []
      if (Array.isArray(wktList) && wktList.length > 0) {
        const WKT = wktList[0]?.Line ?? ''
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
