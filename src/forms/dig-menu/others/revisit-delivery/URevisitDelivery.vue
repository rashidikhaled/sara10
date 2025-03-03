<template>
  <FormWrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="getDeliveryRes" />
      <safa-status :result="saveDeliveryRes" />
    </template>
    <fit>
      <safa-tabs fit v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu label="اطلاعات کلی" name="info_tab" />
          <tab-menu label="مشخصات پروژه" name="Proje_tab" />
          <tab-menu label="استعلامات" name="queries_tab" />
          <!-- <tab-menu label="اطلاعات مجوز" name="Licenseinfo_tab" /> -->
        </template>
        <tab-content name="info_tab">
          <GeneralInformation
            v-model="model.Delivery"
            :m="mode"
            ref="generalInformation"
          />
        </tab-content>
        <tab-content name="Proje_tab">
          <SpecificationsProject v-model="model.Delivery" :m="mode" />
        </tab-content>
        <tab-content name="queries_tab" :padding="false">
          <Queries
            v-model="model.Delivery"
            :m="mode"
            @inquiryHandler="inquiryHandler"
          />
        </tab-content>
        <!-- <tab-content name="Licenseinfo_tab">
          <LicenseInformation v-model="model.Delivery" :m="mode" />
        </tab-content> -->
      </safa-tabs>
    </fit>
    <template v-slot:footer>
      <FormActions
        :m="mode"
        @edit="isEditable = true"
        :showEditButton="!hideEditBtn"
        @cancel="isEditable = false"
        @save="saveObj"
      >
        <template #before>
          <btn-default label="نمایش نقشه" @click="mapHandler" />
        </template>
        <template #after>
          <btn-default label="اطلاعات مجوز" @click="reportHandler" />
        </template>
      </FormActions>
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"

import GeneralInformation from "src/forms/dig-menu/others/revisit-delivery/partials/GeneralInformation.vue"
import SpecificationsProject from "src/forms/dig-menu/others/revisit-delivery/partials/SpecificationsProject.vue"
import Queries from "src/forms/dig-menu/others/revisit-delivery/partials/Queries.vue"
// import LicenseInformation from "src/forms/dig-menu/others/revisit-delivery/partials/LicenseInformation.vue"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    GeneralInformation,
    SpecificationsProject,
    Queries
    // LicenseInformation
  },
  props: {
    requestType: String,
    formKey: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    taskInfoHelp: {
      type: Object,
      default: () => ({})
    },
    hideEditBtn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // #variables
      activeTab: "Proje_tab",
      model: {
        ClsLicense: {
          License_Person: [],
          License_Time: [],
          License_Operation: []
        },
        Delivery: {
          ActualCompletion: {
            ActualCompletionDate: "",
            DeadlineDefect: ""
          },
          CI_RequesterType: [],
          CompanyName: null,
          Consultant: null,
          Delivery: {
            AgentName: "",
            AgentTellNo: "",
            DeliveryDate: "",
            Description: "",
            IsRenewal: false,
            NId: "00000000-0000-0000-0000-000000000000",
            NidUser: null,
            RepairDate: null,
            StrDate: "",
            StrTime: "",
            UserName: null
          },
          DeliveryDefectList: [],
          Delivery_Inquiry: [],
          RequestService_Info: {
            CI_RedirectName: 0,
            CI_Region: 0,
            CI_RequesterType: 0,
            ExportLicenseDate: null,
            ExportLicenseNo: null,
            RequesterAddress: "",
            RequesterRegion: ""
          },
          Delivery_Project_License: [],
          Delivery_Project: [],
          Delivery_Installations: [],
          Delivery_Delays: [],
          Delivery_Crimes: [],
          Delivery_Defects: [],
          Request_Inquiry: []
        }
      },

      // #services
      getDeliveryRes: null,
      saveDeliveryRes: null
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    async loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          // this.selectedRequest.NidProc
          NidProc: this.selectedRequest.NidProc, // "b4701822-ab24-4d6c-90e5-a8e7dd7ad5ea", // "b4701822-ab24-4d6c-90e5-a8e7dd7ad5ea" ,  //  "448cc365-b77c-4493-897a-f1ad9ee3f2e9",
          IssuancecostsRequestType: this.requestType
        }
      }
      try {
        const { data } = await this.$services.excavation.getDelivery(payload)
        this.getDeliveryRes = this.getResponse(data)
        if (this.getDeliveryRes.success) {
          const res = this.getDeliveryRes.data.GetDeliveryResult
          if (res.Delivery?.RequestService_Info !== null) {
            this.model = res
          } else {
            this.model = {
              ...res,
              Delivery: {
                ...res.Delivery,
                RequestService_Info: {
                  CI_RedirectName:
                    res.Delivery.RequestService_Info?.CI_RedirectName ?? 0,
                  CI_Region: res.Delivery.RequestService_Info?.CI_Region ?? 0,
                  ExportLicenseDate:
                    res.Delivery.RequestService_Info?.ExportLicenseDate ?? null,
                  ExportLicenseNo:
                    res.Delivery.RequestService_Info?.ExportLicenseNo ?? null,
                  RequesterAddress:
                    res.Delivery.RequestService_Info?.RequesterAddress ?? "",
                  RequesterRegion:
                    res.Delivery.RequestService_Info?.RequesterRegion ?? ""
                }
              }
            }
          }
          this.mapHandler()
          // GrdRequestDelivery.DataContext = res.Delivery.Delivery;
          // if (res.Delivery.DeliveryDefectList.some()) (TabControl.Items[3] as RadTabItem).Background = new SolidColorBrush(Color.FromArgb(255, 172, 252, 48));

          // this.hideEditBtn = !!(
          //   this.taskInfoHelp &&
          //   this.taskInfoHelp.TaskTitel.includes("بررسي و بازديد تحويل موقت")
          // )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات ${this.title}  برای در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      if (!this.isValidForm()) return
      this.model.Delivery.Lines = [this.$KaisMap.StrEDITWKT]
      this.model.IssuancecostsRequestType = this.requestType
      this.model.UserName = this.getUserDisplayName()
      this.model.TaskTitel = this.taskInfoHelp.TaskTitel
      this.model.FormName = "URevisitDelivery"
      this.model.UserGroups = this.currentUser.UserGroups
      this.showLoading()
      try {
        const payload = {
          pRequest: {
            ...this.model,
            BillID: null,
            CI_Bank: 0,
            CheckApprovalDate: false,
            CodeString: null,
            Date: null,
            EumAccountingDocumentingCause: 0,
            EumLicenseStatus: 0,
            EumObjOnPrice: 0,
            FicheNo: 0,
            InquiryDay: 0,
            IsApproval: false,
            IsBaygani: false,
            IsConfirm: false,
            IsDelivery: false,
            LicensColumns: null,
            NIdBlackList: "00000000-0000-0000-0000-000000000000",
            NIdFiche: "00000000-0000-0000-0000-000000000000",
            NIdRunMonitoringHeader: "00000000-0000-0000-0000-000000000000",
            NIdTask: "00000000-0000-0000-0000-000000000000",
            NidBaygani: "00000000-0000-0000-0000-000000000000",
            NidCompany: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000",
            PaymentID: null
          }
        }
        debugger
        const { data } = await this.$services.excavation.saveDelivery(payload)
        this.saveDeliveryRes = this.getResponse(data)
        if (this.saveDeliveryRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات ${this.title}  برای در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
          this.isEditable = false
          this.loadObj()
        }
      } catch (error) {
        console.error(error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.$KaisMap.Clear()
      this.mapZoom(5)
    },
    showLine () {
      this.clearMap()
      // این بخش مربوط به نمایش اطلاعات نقشه میباشد که درحال حاضر دیتا را طبق سرا 8 نمایش میدهد. اما اگر نیازمندی دیگری وجود داشت ، بعدا به آن اضافه میگردد
      const wktList = this.model?.Delivery?.Lines ?? []
      if (Array.isArray(wktList) && wktList.length > 0) {
        const WKT = wktList[0] ?? ""
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
    async reportHandler () {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicence`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc,
        RequestType: this.requestType,
        SysCI_LicenseStatus:
          this.model.Delivery?.RequestService_Info?.SysCI_RequestServiceStatus.toString(),
        Koroki: "",
        NIdRequest:
          this.model.Delivery.RequestService_Info?.NIdRequestService ??
          "00000000-0000-0000-0000-000000000000"
      }
      await this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NIdWorkItem,
        bizCodeTitle: "NIdWorkItem",
        saveDesc: `چاپ گزارش ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
      })
    },
    async inquiryHandler (data) {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowDeliveryInquiry`
      const queryParams = {
        NId: data.NidDelivery_Inquiry,
        RequestType: this.requestType
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: data?.NidDelivery_Inquiry,
        bizCodeTitle: "NidDelivery_Inquiry",
        saveDesc: `مشاهده پاسخ  برای شماره ${data.No} انجام گردید.`
      })
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
