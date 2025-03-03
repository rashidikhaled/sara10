<template>
  <FormWrapper
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :title="title"
    :padding="false"
  >
    <template #header>
      <safa-status :result="getLicenceInfoRes" />
      <safa-status :result="sendSmsRes" />
    </template>
    <fit>
      <safa-tabs fit v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu label="مشخصات" name="informationTab" />
          <tab-menu label="محاسبات" name="calculationsTab" />
          <tab-menu label="تاریخ پایان دوره" name="courseEndDateTab" />
        </template>

        <tab-content name="informationTab" :padding="false">
          <Information
            v-model="model"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <tab-content name="calculationsTab" :padding="false">
          <Calculations
            v-model="model"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <tab-content name="courseEndDateTab">
          <CourseEndDate
            v-model="model"
            :formKey="formKey"
            :title="title"
            :name="name"

          />
        </tab-content>
      </safa-tabs>
    </fit>

    <template v-slot:footer>
      <!--
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveObj" -->
      <FormActions :m="mode" :showEditButton="false">
        <div class="q-gutter-x-sm">
          <btn-default
            spId="367f3759-4318-444b-816f-4d3cc2a23d44"
            v-if="activeTab === 'calculationsTab'"
            label="تأیید مجوز"
            @click="confirmClick"
          ></btn-default>

          <btn-default
            spId="777f3759-4318-444b-816f-4d3cc2a23b66"
            v-if="activeTab === 'calculationsTab'"
            label="عدم تأیید"
            @click="cancelFicheClick"
          />
        </div>
      </FormActions>
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Information from "./partials/Information.vue"
import Calculations from "./partials/Calculations.vue"
import CourseEndDate from "./partials/CourseEndDate.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    Information,
    Calculations,
    CourseEndDate
  },

  data () {
    return {
      title: "صدور صورتمجلس تحویل موقت",
      formKey: "4692D710-9DA6-41B4-8F16-F29BAF52B580",
      name: "UDeliverySoratMajles",
      main: true,
      workflowCompatible: true,

      // #variables
      activeTab: "informationTab",
      model: {
        ClsLicense: {
          ClsDelivery: {
            ActualCompletion: {
              ActualCompletionDate: "",
              GuaranteePeriodEndDate: ""
            }
          },
          ClsIncomeFiche: {
            Income_Fiche: {},
            ExportLicenseInfo: {
              License_AsphaltCoating: []
            }
          },
          License_Operation: [],
          License_Person: [],
          License_Time: [],
          RenewalRequestService_Time: []
        }
      },
      // TxtActualCompletion: "",
      // TxtGuaranteePeriodEndDate: "",

      // #services
      getLicenceInfoRes: null,
      sendSmsRes: null,
      saveIncomeRes: null
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    loadObj () {
      debugger
      this.getLicenceInfo()
    },
    async getLicenceInfo () {
      debugger
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc, // "30b59b68-4cee-41ab-84b4-100ac1505a35" تب سوم با این مورد دیتا دارد, // this.selectedRequest.NidProc, // "b4701822-ab24-4d6c-90e5-a8e7dd7ad5ea", // ,
          // EumLicenseStatus: this.eumLicenseStatus, // 1,
          EumLicenseStatus: "3",
          // IssuancecostsRequestType: this.requestType // 1
          IssuancecostsRequestType: "1"
        }
      }
      this.showLoading()
      this.$services.excavation
        .getLicenceInfo(payload)
        .then(async ({ data }) => {
          this.getLicenceInfoRes = this.getResponse(data)
          if (this.getLicenceInfoRes.success) {
            this.model = this.getLicenceInfoRes.data.GetLicenceInfoResult
            this.sendSms()
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات  درخواست شماره ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید`
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
    changeState () {
      this.setApproval()
    },

    // این متدهایی که در ادامه هستن  ممکن است که سمت فرمول و گردشکار هندل شود به همین علت فعلا با توجه به زمل پیچیده و بیزنس نامشخص کامنت شده که در هنگام تست در صورت لزوم بعد از پرسیدن بیزنس پیاده سازی شود
    setApproval () {
      // let sum = 0
      // let TmpAsphaltCoating =
      //   this.model.ClsLicense.ExportLicenseInfo.License_AsphaltCoating.map(
      //     (e) => {
      //       sum = sum + e.TotalDamage.Value
      //     }
      //   )
      // let TmpIsAccept =
      //   (TmpAsphaltCoating > 0 &&
      //     this.model.ClsLicense.ClsIncomeFiche !== null &&
      //     this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.length > 0 &&
      //     this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.some(
      //       (e) => e.IsConfirm

      let pRequest = {
        UserName: this.getUserDisplayName(),
        NidUser: this.getNidUser(),
        FormName: "UDelivery_SoratMajles-SetApproval-Accept",
        TaskTitel: this.taskInfo.TaskTitel,
        ClsLicense: this.model.ClsLicense
      }
      this.sendSms(pRequest)
    },
    sendSms () {
      debugger
      this.showLoading()
      let payLoad = {
        pRequest: {
          ClsLicense: []
        }
      }
      this.$services.excavation
        .sendSms(payLoad)
        .then(async (data) => {
          this.sendSmsRes = this.getResponse(data)
          if (this.sendSmsRes.success) {
            this.model = this.sendSmsRes.data.SendSmsResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: ``
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

    // در هیچ جای فرم چه در سرا8 و چه در زمل متد سیو صدا زده نمیشود
    saveObj () {
      let sum = 0
      this.TotalDamage =
        this.model.ClsLicense.ExportLicenseInfo.License_AsphaltCoating.map(
          (e) => {
            sum = e.TotalDamage.Value + sum
          }
        )
      if (sum > 0) {
        this.showLoading()
        this.model.ClsLicense.UserName = this.currentUser.username

        let payLoad = {
          pRequest: {
            ClsLicense: this.model.ClsLicense
          }
        }
        this.$services.excavation
          .saveIncome(payLoad)
          .then(async (data) => {
            this.saveIncomeRes = this.getResponse(data)
            if (this.saveIncomeRes.success) {
              this.model.ClsLicense.ClsIncomeFiche =
                this.saveIncomeRes.data.ClsLicense.ClsIncomeFiche
              this.changeState(this.TotalDamage)
              await this.log({
                action: this.logActions.view,
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
      } else {
        this.showError("مبلغ کافی برای صدور فیش موجود نمی باشد")
      }
    },
    confirmClick () {
      this.setApproval()
    },
    cancelFicheClick () {
      let pRequest = {
        UserName: this.getUserDisplayName(),
        NidUser: this.getNidUser(),
        FormName: "UDelivery_SoratMajles-SetApproval-Cancel",
        TaskTitel: this.taskInfo.TaskTitel,
        ClsLicense: this.model.ClsLicense
      }
      this.sendSms(pRequest)
    }
  }
}
</script>
