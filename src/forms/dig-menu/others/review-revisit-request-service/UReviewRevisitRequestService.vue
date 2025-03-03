<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <FormWrapper :padding="false" :title="title">
      <template #header>
        <safa-status :result="getRevisitRequestServiceWithNidProcRes" />
        <safa-status :result="saveRevisitRequestServiceRes" />
      </template>
      <fit>
        <safa-tabs fit v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu label="اطلاعات کلی" name="info_tab" />
            <tab-menu label="مشخصات عملیات حفاری" name="op_tab" />
            <tab-menu
              label="مشخصات دستگاه حفار وعوامل اجرایی"
              name="machine_tab"
            />
            <tab-menu label="استعلامات" name="queries_tab" />
            <tab-menu label="توضیحات مجوز" name="description_tab" />
          </template>
          <tab-content name="info_tab">
            <GeneralInformation
              v-model="model.ClsRevisit_RequestService"
              :m="mode"
              :formKey="formKey"
              :title="title"
              :name="name"
              :isView="isView"
              ref="generalInformation"
            />
          </tab-content>
          <tab-content name="op_tab">
            <SpecificationsOperations
            ref="SpecificationsOperations"
              v-model="model.ClsRevisit_RequestService"
              :m="mode"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </tab-content>
          <tab-content name="machine_tab">
            <SpecificationsMachine
              v-model="model.ClsRevisit_RequestService"
              :m="mode"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </tab-content>
          <tab-content name="queries_tab">
            <Queries
              v-model="model.ClsRevisit_RequestService"
              :m="mode"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </tab-content>
          <tab-content name="description_tab">
            <DescriptionLicense
              v-model="model.ClsRevisit_RequestService"
              :m="mode"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <btn-default label="نمایش نقشه" @click="mapHandler" />
        </form-actions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import GeneralInformation from "./partials/GeneralInformation.vue"
import mapMixin from "src/mixins/mapMixin"
import SpecificationsOperations from "./partials/SpecificationsOperations.vue"
import SpecificationsMachine from "./partials/SpecificationsMachine.vue"
import Queries from "./partials/Queries.vue"
import DescriptionLicense from "./partials/DescriptionLicense.vue"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    GeneralInformation,
    SpecificationsOperations,
    SpecificationsMachine,
    Queries,
    DescriptionLicense
  },

  data () {
    return {
      title: "مشخصات پروژه طرح هاي توسعه",
      formKey: "A0D5D58D-8023-4DBD-8B4B-F1C17D877590",
      name: "UReviewRevisitRequestService",
      main: true,
      workflowCompatible: true,

      // #services
      getRevisitRequestServiceWithNidProcRes: null,
      saveRevisitRequestServiceRes: null,

      // #variables
      isView: false,
      activeTab: "info_tab",
      model: {
        ClsRevisit_RequestService: {
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
            Description: "",
            OriginalLicenseComments: "",
            // txt_RegionPrice: 0,
            CI_DigDelayTime: 0,
            CI_SplitType: 0,
            LetterNo: "",
            LetterDate: "",
            ConfilictWithOther: true,
            ExportLicenseComments: ""
          },
          RequestService_Time: [],
          RequestService_Line: {},
          RequestService_Inquiry: [],
          RequestService_Operations: {
            RegionPrice: null
          }
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
      let payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "6d7d43ac-fda9-4433-9105-314838968b6a"
          // NidProc: "a34cb528-725b-40f5-aa78-8d696a49b2cb"
          // حاوی دیتا
        }
      }
      this.showLoading()
      this.$services.excavation
        .getRevisitRequestServiceWithNidProc(payload)
        .then(async ({ data }) => {
          this.getRevisitRequestServiceWithNidProcRes = this.getResponse(data)
          if (this.getRevisitRequestServiceWithNidProcRes.success) {
            this.model =
              this.getRevisitRequestServiceWithNidProcRes.data.GetRevisit_RequestServiceWithNidProcResult
            this.$refs.SpecificationsOperations.RegionPrice = this.model.ClsRevisit_RequestService?.RequestService_Operations[0]?.RegionPrice ?? ""
            let help =
              this.model.ClsRevisit_RequestService?.RequestService_Contractor ??
              []
            if (help.length > 0) {
              help.map((element) => {
                return {
                  ...element,
                  ManagerMobile: element.ManagerMobile === null ? "" : element.ManagerMobile,
                  ManagerTel: element.ManagerTel === null ? "" : element.ManagerTel,
                  CompanyCaption: element.CompanyCaption === null ? "" : element.CompanyCaption

                }
              })
            }
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
              })
            }
            this.isView = true
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
      // const taskInfo = (this.taskInfo || this.selectedRequest?.Task[0]) ?? null
      this.model.ClsRevisit_RequestService.IsReview = true
      // this.model.ClsRevisit_RequestService.RequestService_Operations.map((e) => { e.RegionPrice = this.model.ClsRevisit_RequestService.RequestService_Operations.RegionPrice })
      // if (this.model?.ClsRevisit_RequestService?.RequestService_Operations) {
      //   this.model?.ClsRevisit_RequestService?.RequestService_Operations.map((e) => {
      //     e.RegionPrice = Number(this.model.ClsRevisit_RequestService.RequestService_Operations.RegionPrice)
      //   })
      // }
      let pRequest = {
        ClsRevisit_RequestService: this.model.ClsRevisit_RequestService,
        UserName: this.getUserDisplayName() || "",
        TaskTitel: this.taskInfo?.TaskTitel ?? "",
        FormName: "UReviewRevisitRequest",
        UserGroups: this.currentUser.UserGroups
      }
      this.showLoading()
      this.$services.excavation
        .saveRevisitRequestService({ pRequest })
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
            this.loadObj()
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
      this.clearMap()
      // این بخش مربوط به نمایش اطلاعات نقشه میباشد که درحال حاضر دیتا را طبق سرا 8 نمایش میدهد. اما اگر نیازمندی دیگری وجود داشت ، بعدا به آن اضافه میگردد
      const wktList =
        this.model?.ClsRevisit_RequestService?.RequestService_Line ?? []
      if (Array.isArray(wktList) && wktList.length > 0) {
        const WKT = wktList[0].Line ?? ""
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
