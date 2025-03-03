<template>
  <FormWrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="getLicenceInfo" />
      <safa-status :result="saveIncomeRes" />
      <safa-status :result="confirmOrCancelFicheRes" />
    </template>
    <fit>
      <safa-tabs fit v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu label="مشخصات" name="specificationsTab" />
          <tab-menu label="محاسبات" name="calculationsTab" />
          <tab-menu
            label="تایید پرداخت فیش"
            name="paymentTab"
            v-if="showPaymentTab"
          />
        </template>

        <tab-content name="specificationsTab">
          <Specifications
            v-model="model"
            :m="mode"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="generalInformation"
          />
        </tab-content>
        <tab-content name="calculationsTab">
          <Calculations
            v-model="model"
            :m="mode"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <tab-content name="paymentTab">
          <UPaymentDig
            v-model="model"
            :NidFiche="LastNidFiche"
            :m="mode"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="paymentDig"
          />
        </tab-content>
      </safa-tabs>
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        :showEditButton="showPaymentTab"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveObjPaymentDig"
      >
        <template #after>
          <btn-default label="محاسبه" @click="licenseColumnsClick" />
          <btn-default
            v-if="showPoseClickBtn"
            label="پرداخت از طریق Pose"
            @click="poseClick"
          />
          <btn-default
            v-if="showBtnExportFiche"
            label="صدور فیش"
            @click="exportFicheClick"
          />
          <btn-default
            v-if="showBtnConfirm"
            label="تایید فیش"
            @click="confirmClick"
            spId="c8181bkk-4ec8-444a-95b5-ss8822b2f8bb"
            spCaption="تایید فیش"
          />
          <btn-default
            v-if="showBtnCancel"
            label="ابطال فیش"
            @click="cancelClick"
          />
          <btn-default
            v-if="showBtnPrintFiche"
            label="چاپ فیش"
            @click="printFiche"
          />
        </template>
      </form-actions>
    </template>

    <safa-popup
      v-model="isShowFormulaModal"
      height="300px"
      title="انتخاب فرمول ها"
      width="300px"
    >
      <ChoosingFormula
        v-model="model.ClsLicense.ExportLicenseInfo.License_Columns"
        @calculate="calculate"
        :m="mode"
        :formKey="formKey"
        :name="name"
        :title="title"
      />
    </safa-popup>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import PersianDate from "persian-date"

import Specifications from "./partials/Specifications.vue"
import Calculations from "./partials/Calculations.vue"
import ChoosingFormula from "./partials/ChoosingFormula.vue"
import UPaymentDig from "src/forms/dig-menu/others/payment-dig/UPaymentDig.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    Specifications,
    Calculations,
    ChoosingFormula,
    UPaymentDig
  },
  props: {
    RequestType: Number,
    formKey: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true }
  },
  data () {
    return {
      // Grids
      GrdAsphaltColumns: [],
      // name: UDeliveryExportFiche,

      // #variables
      activeTab: "specificationsTab",
      model: {
        ClsLicense: {
          CI_RequesterType: 0,
          CI_RedirectName: 0,
          ExportLicenseNo: "",
          ExportLicenseDate: "",
          Address: "",
          ClsDelivery: {
            RequestService_Info: {},
            ActualCompletion: {
              ActualCompletionDate: ""
            },
            Delivery_Project_License: [],
            Delivery_Project: [],
            Delivery_Installations: [],
            Delivery_Delays: [],
            Delivery_Crimes: [],
            Delivery_Defects: []
          },
          ExportLicenseInfo: {
            License_AsphaltCoating: []
          },
          ClsIncomeFiche: {
            Income_Fiche: []
          }
        }
      },
      isShowFormulaModal: false,
      TotalDamage: 0,
      LastNidFiche: null,
      paymentData: null,
      showPaymentTab: false,

      // btn visibility
      showPoseClickBtn: false,
      showBtnCancel: false,
      showBtnPrintFiche: false,
      showBtnExportFiche: false,
      showBtnConfirm: false,

      // #services
      getLicenceInfo: null,
      saveIncomeRes: null,
      confirmOrCancelFicheRes: null
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  computed: {
    lastNidFiche () {
      let tmpNIdFiche = this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.find(
        (f) => f.IsCancel === false && f.IsConfirm === false
      )
      if (tmpNIdFiche === null) {
        tmpNIdFiche = this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.find(
          (f) => f.IsConfirm === true
        )
        // this.taskInfo.Guid = null
      }
      return tmpNIdFiche?.NIdFiche ?? "00000000-0000-0000-0000-000000000000"
    }
  },

  methods: {
    loadObj () {
      try {
        // let TaskArea = this.taskInfo?.TaskArea ?? "" // گروه
        let TaskTitel = this.taskInfo?.TaskTitel ?? "" // مرحله
        let StateTitle =
          this.selectedRequestResults.StatesInfo.WorkflowStateName ?? "" // نوع پرونده
        if (TaskTitel.includes("محاسبه") && StateTitle.includes("توسعه")) {
          this.showBtnConfirm = false
        } else {
          this.showBtnConfirm = true
        }
      } catch (e) {
        console.error(e)
      }
      this.getLicenseInfo()
    },
    saveObjPaymentDig () {
      this.$refs.paymentDig.saveObj()
    },
    getLicenseInfo (licensColumns = null) {
      // تمام
      let payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc,
          IssuancecostsRequestType: this.RequestType,
          LicensColumns: licensColumns,
          EumLicenseStatus: 3 // در زمل به صورت هارد کد بود
        }
      }
      this.showLoading()
      this.$services.excavation
        .getLicenceInfo(payload)
        .then(async ({ data }) => {
          this.getLicenceInfoRes = this.getResponse(data)
          if (this.getLicenceInfoRes.success) {
            this.model = this.getLicenceInfoRes.data.GetLicenceInfoResult

            debugger
            if (
              this.model.ClsLicense.ExportLicenseInfo.License_AsphaltCoating
                .length > 0
            ) {
              this.GrdAsphaltColumns =
                this.model.ClsLicense.ExportLicenseInfo.License_AsphaltCoating.map(
                  (i) => {
                    return {
                      field: i.Header,
                      title: i.Name,
                      width: "120px"
                    }
                  }
                ) // این مورد به دلیل نبود دیتا امکان دارد بایندینگ هایش اشتباه باشد

              this.TotalDamage =
                this.model.ClsLicense.ExportLicenseInfo.License_AsphaltCoating.reduce(
                  (total, e) => {
                    return total + e.TotalDamage
                  },
                  0
                ) // این مورد هم باید چک شود

              this.changeState()
            }

            // if (
            //   !this.getLicenceInfoRes.data.GetLicenceInfoResult.ClsLicense
            //     .ErrorResult
            // ) {
            //   this.changeState()
            // } else {
            //   this.showBtnExportFiche = false
            // }
            // this.getLicenceExport()
            // this.changeState(this.TotalDamage)
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest?.NidProc ?? "",
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest?.BizCode ?? "",
              nidWorkItem: this.selectedRequest?.NidWorkItem ?? "",
              saveDesc: `برای شماره در خواست ${
                this.selectedRequest?.NidWorkItem ?? ""
              }  اطلاعات فرم ${this.title} نمایش داده شد.`
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
    changeState () { // تمام
      this.setApproval()

      if (
        this.model.ClsLicense.ClsIncomeFiche != null &&
        this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.length > 0
      ) {
        if (
          this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.some(
            (e) => e.IsConfirm === false && e.IsCancel === false
          )
        ) {
          this.showBtnExportFiche = false
          this.showBtnConfirm = true
          this.showBtnCancel = true
          this.showBtnPrintFiche = true
          if (window.getConfigValue("ClsDigParams.ISConfrimFicheByPose")) {
            this.showPoseClickBtn = true
          }
        } else if (
          this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.some(
            (e) => e.IsConfirm
          )
        ) {
          this.showBtnExportFiche = false
          this.showBtnConfirm = false
          this.showBtnCancel = true
          this.showBtnPrintFiche = true
        } else if (
          this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.some(
            (e) => e.IsCancel
          )
        ) {
          this.showBtnExportFiche = true
          this.showBtnConfirm = false
          this.showBtnCancel = false
          this.showBtnPrintFiche = false
        } else {
          this.showBtnExportFiche = true
          this.showBtnConfirm = false
          this.showBtnPrintFiche = false
        }
        var TmpCurrentFiche =
          this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.map(
            (f) => f.NIdFiche === this.LastNidFiche
          )
        // eslint-disable-next-line eqeqeq
        if (this.TotalDamage != TmpCurrentFiche.Price) {
          this.saveObj()
        }
      } else {
        this.saveObj()
      }
    },
    setApproval () { // مربوط به گردش کار هست
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
      //     ) || TmpAsphaltCoating === 0)
      // let TmpExtendedProp = TaskInfo.ExtendedProp.PropList[0].map(e => e.PropName === "IsAcceptFiche")
      // if (ReferenceEquals(TmpExtendedProp, null))
      // {
      //     TaskInfo.ExtendedProp.PropList.Add(new ApplicationCommon.TaskService.ClsPropInfo()
      //     {
      //         PropName = "IsAcceptFiche",
      //         PropValue = TmpIsAccept.ToString(),
      //         PropType = "Hidden",
      //         PropTitle = "چک کردن ارسال به مرحله بعد"
      //     });
      // }
      // else
      //     TmpExtendedProp.PropValue = TmpIsAccept.ToString();
      // SaveTaskInfo();
    },
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
              this.changeState()
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

    licenseColumnsClick () {
      this.isShowFormulaModal = true
    },
    poseClick () {
      let TmpCurrentFiche =
        this.model.ClsLicense.ClsIncomeFiche.Income_Fiche[0].map(
          (f) => f.NIdFiche === this.LastNidFiche
        )
      if (typeof TmpCurrentFiche.Price !== "number") {
        this.showConfirm("آیا از تایید فیش از طریق پوز اطمینان دارید؟").onOk(
          () => {
            // if (ar.DialogResult == true)
            //         {
            // if (ViewModels.ClsSetting.Settings.PoseTypeSelected.PoseType == ClsEnum.PoseType.MelliBank)
            //           {
            // let tmpTerminalNo = ViewModels.ClsSetting.Settings.MeliTerminalNo.toString()
            // var tmpPort = ViewModels.ClsSetting.Settings.MeliComPort
            try {
              // HtmlPage.Window.Eval("PassParameter('" + tmpPort.toString() +
              //                      "','9600','8','" +
              //                      tmpTerminalNo + "','" +
              //                     ViewModels.ClsSetting.Settings.MeliMerchantNo.toString() +
              //                      "','" +
              //                      TmpCurrentFiche.FicheNo + "','" +
              //                      TmpCurrentFiche.Price.toString() + "','" +
              //                      PersianDate.toCalendar("persian") +
              //                      "','" + DateTime.Now.TimeOfDay + "','" +
              //                    7 +
              //                      "')")
            } catch (e) {
              this.showError("خطایی در ارسال اطلاعات به پوز رخ داد.")
            }
            // else if (ViewModels.ClsSetting.Settings.PoseTypeSelected.PoseType === ClsEnum.PoseType.CityBank)
            //             {
            //                 let tmpPort = "";
            //                 let tmpMode = "";

            //                 if (ViewModels.ClsSetting.Settings.CityBankUsingType == ViewModels.ClsSetting.EumCityBankUsingType.Port)
            //                 {
            //                     tmpPort = "COM" + ViewModels.ClsSetting.Settings.CityComPort.toString();
            //                     tmpMode = "serial";
            //                 }
            //                 else if (ViewModels.ClsSetting.Settings.CityBankUsingType == ViewModels.ClsSetting.EumCityBankUsingType.LAN)
            //                 {
            //                     tmpPort = ViewModels.ClsSetting.Settings.CityIP.toString();
            //                     tmpMode = "ip";
            //                 }

            //                 var tmpBillID = Int64.Parse(TmpCurrentFiche.BillID);
            //                 var tmpPayID = Int64.Parse(TmpCurrentFiche.PaymentID).toString();
            //                 var tmpNidFiche = TmpCurrentFiche.NIdFiche.toString();

            //                 Common.ClsCommon.MyEsupLog("Port= " + tmpPort + Environment.NewLine +
            //                     "NidFiche= " + tmpNidFiche + Environment.NewLine +
            //                     "BillID= " + tmpBillID + Environment.NewLine +
            //                     "PayID= " + tmpPayID + Environment.NewLine +
            //                     "ObjOnPrice= " + 8 + Environment.NewLine +
            //                     "Mode= " + tmpMode + Environment.NewLine
            //                     );

            try {
              // HtmlPage.Window.Eval("CityBankPose_BillPayment_PAX('" + tmpPort + "','" +
              //                                                         tmpNidFiche + "','" +
              //                                                         tmpBillID + "','" +
              //                                                         tmpPayID + "','" +
              //                                                         8 + "','" +
              //                                                         tmpMode + "')");
            } catch (e) {
              this.showError("خطایی در ارسال اطلاعات به پوز رخ داد.")
            }
            // }
            // }
            // }
          }
        )
      }
    },
    exportFicheClick () {
      this.saveObj()
    },
    confirmClick () {
      this.acceptPayment()
    },
    printFiche () {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptFiche`
      const queryParams = {
        NIdFiche: this.lastNidFiche
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NIdWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    },
    confirmOrCancel (IsConfirm) {
      let payload = {
        pRequest: {
          IsConfirm: IsConfirm,
          NIdFiche: this.lastNidFiche
        }
      }
      this.showLoading()
      this.$services.excavation
        .confirmOrCancelFiche(payload)
        .then(async ({ data }) => {
          this.confirmOrCancelFicheRes = this.getResponse(data)
          if (this.confirmOrCancelFicheRes.success) {
            this.loadObj()
            if (IsConfirm) {
              this.acceptPayment()
            }
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
    cancelClick () {
      this.confirmOrCancel(false)
    },
    calculate (e) {
      debugger
      // این متد در زمل هم کارخاصی انجام نمیداد و صرفا لود مجدد انجام میشد
      if (e) this.loadObj()
      this.isShowFormulaModal = false
    },
    acceptPayment () {
      this.showPaymentTab = true
      this.AcceptPaymentHandler()
      let TmpNIdFiche = this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.map(
        (f) => f.IsCancel === false && f.IsConfirm === false
      )[0]
      if (TmpNIdFiche === null) {
        TmpNIdFiche = this.model.ClsLicense.ClsIncomeFiche.Income_Fiche.map(
          (f) => f.IsConfirm === true
        )
        this.LastNidFiche = TmpNIdFiche.NIdFiche
      }
      if (TmpNIdFiche === null) {
        this.LastNidFiche = "00000000-0000-0000-0000-000000000000"
      }
      this.paymentData.NIdFiche = this.LastNidFiche
      this.paymentData.ClsLicense = this.model.ClsLicense
      this.$refs.UPayment.LoadPaymentObj()
    }
  },
  AcceptPaymentHandler () {
    if (this.paymentData) {
      this.showPaymentTab = false
      this.activeTab = "specificationsTab"
      this.LoadObj()
    }
  }
}
</script>
