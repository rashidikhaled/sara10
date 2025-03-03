<template>
  <form-wrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="getLicenceInfoRes" />
      <safa-status :result="cancelFiches" />
      <safa-status :result="delOddmentAccountRes" />
      <safa-status :result="saveOddmentAccountRes" />
      <safa-status :result="saveIncomeRes" />
      <safa-status :result="saveIncomePaymentOnLineRes" />
      <safa-status :result="addToArchiveRes" />
      <safa-status :result="confirmOrCancelRes" />
      <safa-status :result="getIncomeFichebyNidProcRes" />
      <safa-status :result="confirmOrCancelFicheRes" />
      <safa-status :result="getIncomePaymentRes" />

    </template>
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="Specifications" label="مشخصات" />
          <tab-menu name="Calculations" label="محاسبات" />
          <tab-menu name="PaymentTab" label="تایید پرداخت فیش" v-if="showPaymentTab" />
          <tab-menu name="Creditor" label="بستانکاری" />
        </template>
        <tab-content name="Specifications" :padding="false">
          <Specifications v-model="model.ClsLicense" m="r" />
        </tab-content>
        <tab-content name="Calculations" :padding="false">
          <Calculations v-model="model.ClsLicense" :incomeFichebyNidProcResult="incomeFichebyNidProcResult" m="r"
            ref="calculationsRef" @selectedIncomeFicheHandler="selectedIncomeFicheHandler" />
        </tab-content>
        <tab-content name="PaymentTab">
          <UPaymentDig v-model="model" :NidFiche="LastNidFiche" :m="mode" :formKey="formKey" :title="title" :taskInfo="taskInfo"
            :name="name"   :textModel="textModel" ref="paymentDig" @updateEditableMode="(val) => isEditable = val"    :selectedFiche="selectedIncomeFiche" @afterSavePeyment="afterSavePeyment"
        :selectedCalculationRow="selectedCalculationRow"/>
        </tab-content>
        <tab-content name="Creditor" :padding="true">
          <fit>
            <safa-grid title="حساب های متفرقه" v-model="model.ClsLicense.OddmentAccount" cdcName="OddmentAccount"
              :columns="oddmentAccountColumns" fit :pageSize="20" paginate :m="mode" :defaultNewRow="defaultNewRow"
              :suppressRowClickSelection="false" @row:click="selectedOddmAccFicheHandler" />
            <!-- <FormActions :m="mode" @edit="isEditable = true" @cancel="loadObj" @save="saveOddmentAccount"
              class="q-mt-sm" /> -->
          </fit>
        </tab-content>
      </safa-tabs>
    </fit>
    <template v-slot:footer>
      <form-actions :m="mode" :showEditButton="activeTab == 'Creditor' || activeTab == 'PaymentTab'"
        :showCancelButton="activeTab == 'Creditor' || activeTab == 'PaymentTab'"
        :showSaveButton="activeTab == 'Creditor' || activeTab == 'PaymentTab'" @edit="isEditable = true"
        @save="saveAction" @cancel="loadObj">
        <template v-slot:after>

          <btn-default label="محاسبات" @click="showFormulaModal = true" />
          <template v-if="showPoseBtn">
            <btn-default label="پرداخت از طریق Pose" @click="poseBtnHandler" />
          </template>
          <template v-if="showConfirmBtn">
            <btn-default label="تایید فیش" @click="confirmBtnHandler" spCaption="دکمه تایید فیش" />
          </template>
          <template v-if="showExportFicheBtn">
            <btn-default label="صدور فیش" @click="exportFicheBtnHandler" />
          </template>
          <template v-if="showConfirmOnlineBtn">
            <btn-default label="تایید لحظه ای فیش" @click="confirmOnlineBtnHandler" />
            <safa-combo label="بانک" v-model="ciBank" ciName="CI_Bank" domainName="Dig" style="width: 150px"
              :m="selectedIncomeFiche ? 'e' : 'r'" />
          </template>
          <template v-if="showCancelBtn">
            <btn-default label="ابطال فیش" @click="cancelBtnHandler" spId="e578e289-a469-4f2b-b6bb-f63342fec4f4"
              spCaption="دکمه ابطال فیش" />
          </template>
          <template v-if="showInstallmentFicheBtn">
            <btn-default label="تقسیط فیش" @click="installmentFicheBtnHandler" />
          </template>
          <template v-if="showPrintFicheBtn">
            <btn-default label="چاپ فیش" @click="printFicheBtnHandler" />
          </template>
        </template>
      </form-actions>
    </template>
    <safa-popup height="220px" width="350px" title="انتخاب کردن پوز" v-model="isShowConfirmWithPoseModal">
      <ConfirmWithPose :formKey="formKey" :name="name" :title="title" :selectedRow="selectedIncomeFiche"
        @reload="reloadConfimFiche" @close="isShowConfirmWithPoseModal = false" ref="confirmFiche" />
      <!-- :config="config" -->
    </safa-popup>
    <safa-popup v-model="showFormulaModal" height="400px" title="انتخاب فرمول ها" width="300px" :maximizeButton="false"
      :resizable="false">
      <ChoosingFormula v-model="model.ClsLicense.ExportLicenseInfo.License_Columns" :m="mode" @calculate="calculate" />
    </safa-popup>
    <safa-popup
    v-model="taghsidShow"
    vertical width="1000px" height="800px"
    title="تقسیط فیش">
    <installment
        :selectedFiche="selectedIncomeFiche"
        :selectedCalculationRow="selectedCalculationRow"
      />

    </safa-popup>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import Specifications from "./partials/Specifications.vue"
import Calculations from "./partials/Calculations.vue"
import ChoosingFormula from "./partials/ChoosingFormula.vue"
import ConfirmWithPose from "./partials/ConfirmWithPose.vue"
import UPaymentDig from "../payment-dig/UPaymentDig.vue"
import installment from "./partials/installment.vue"
// const defaultModel = {
//   ClsIncome_Payment: {
//     Income_Fiche: {
//       BillID: "",
//       Creditor: "",
//       ateCalculated: "",
//       Deduction: "",
//       Deptor: "",
//       FicheDate: "",
//       FicheNo: "",
//       NIdFiche: "00000000-0000-0000-0000-000000000000",
//       NIdProc: "00000000-0000-0000-0000-000000000000",
//       PaymentID: "",
//       Price: "",
//       SysCI_LicenseStatus: "",
//       TimeCalculated: "",
//       UserCalculated: "",
//       UserName: "",
//       NidWorkItem: ""
//     }
//   }
// }

// import { currentDate } from "src/utils/index"

const IsMashhad =
  window.getConfigValue("esupParams")?.ClsDigParams?.IsMashhad ?? false
const ISConfrimFicheByPose = window.getConfigValue("esupParams.ClsDigParams.ISConfrimFicheByPose", false)

// const OnlinePaymentNosaziUrl = window.getConfigValue("esupParams")?.ClsDigParams?.OnlinePaymentNosaziUrl ?? false
const GuidEmpty = "00000000-0000-0000-0000-000000000000"

export default {
  mixins: [baseFormMixin],
  components: {
    Specifications,
    ChoosingFormula,
    Calculations,
    ConfirmWithPose,
    UPaymentDig,
    installment
  },

  props: {
    requestType: Number,
    eumLicenseStatus: Number,
    formKey: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    LastNidFiche () {
      return this.selectedIncomeFiche?.NIdFiche ?? null },
    defaultNewRow () {
      return {
        CI_OddmentType: 1,
        Value: "",
        UserName: this.getUserDisplayName(),
        OddmentDate: "",
        FicheNo: null,
        CI_Bank: 0,
        Comments: "",
        NidUser: this.getNidUser(),
        NId: this.selectedRequest.NidProc,
        NidOddmentAccount: GuidEmpty
      }
    }
  },

  data () {
    return {
      main: true,

      // #region variables
      ciBank: 0,
      activeTab: "Calculations",
      selectedOddmAccFiche: null,
      selectedIncomeFiche: null,
      getIncomePaymentRes: null,
      selectedCalculationRow: null,
      CI_RequesterType: 0,
      selectedFiche: null,
      textModel: {
        ShahrdariTexts: "",
        MessageBargh: ""
      },
      // model: { ...defaultModel },
      oddmentAccountColumns: [
        {
          field: "",
          title: "",
          btnTitle: "حذف",
          btnIcon: "delete",
          editor: "action",
          width: "80px",
          filterable: false,
          resizable: false,
          lockPosition: true,
          pinned: "right",
          btnColor: "red",
          cellRenderer: "agCallbackBtn",
          // showBtn: (data) => data,
          callback: (params) => this.delOddmentAccount(params)
        },
        {
          field: "CI_OddmentType",
          title: "نوع بدهکاري/بستانکاري",
          editor: "combo",
          domain: "Dig",
          width: "150px"
        },
        { field: "Value", title: "مبلغ", width: "120px" },
        { field: "UserName", title: "کاربر", width: "150px", editable: false },
        {
          field: "OddmentDate",
          title: "تاریخ",
          editor: "date",
          width: "100px"
        },
        { field: "FicheNo", title: "شماره فیش", width: "120px" },
        {
          field: "CI_Bank",
          title: "بانک",
          editor: "combo",
          domain: "Dig",
          width: "150px"
        }
        // { field: "Comments", title: "توضیحات", width: "auto" }
      ],
      settingDigModel: {
        Settings: {
          NoFicheInCalc: false,
          CancelFicheManual: false,
          CancelFichesInZeroCalc: false,
          ConfirmWithRequesterType: false
        }
      },
      readOnlyData: { tmpLicenseAsphaltCoating: [] },
      model: {
        ClsIncome_Payment: {
          Income_Fiche: {
            BillID: "",
            Creditor: "",
            ateCalculated: "",
            Deduction: "",
            Deptor: "",
            FicheDate: "",
            FicheNo: "",
            NIdFiche: "00000000-0000-0000-0000-000000000000",
            NIdProc: "00000000-0000-0000-0000-000000000000",
            PaymentID: "",
            Price: "",
            SysCI_LicenseStatus: "",
            TimeCalculated: "",
            UserCalculated: "",
            UserName: "",
            NidWorkItem: ""
          }
        },
        ClsLicense: {
          ActualCompletion: null,
          Address: null,
          CI_RedirectName: null,
          CI_RequestType: 0,
          CI_RequesterType: 0,
          ClsDelivery: null,
          ClsIncomeFiche: {
            Income_Fiche: []
          },
          Delivery: null,
          Delivery_Installations: null,
          EumLicenseStatus: 0,
          ExportLicenseDate: null,
          ExportLicenseInfo: {
            License_AsphaltCoating: [],
            License_Columns: []
          },
          ExportLicenseNo: null,
          Income_FicheDetails: null,
          IsCalculate: null,
          License_Info: {},
          License_Operation: [],
          License_Person: [],
          License_Time: [],
          ListIncomeFiche: [],
          NIdProc: GuidEmpty,
          NIdWorkItem: 0,
          OddmentAccount: [],
          PhoneNo: "",
          RenewalRequestService_Time: null,
          RequestType: 0,
          UserName: null
        },
        IncomeFicheList: []
      },
      showFormulaModal: false,
      taghsidShow: false,
      isShowConfirmWithPoseModal: false,
      dialogResult: false,
      incomeFichebyNidProcResult: {
        IncomeFicheList: [],
        IncomeFiches: []
      },
      // #endregion

      // #region btn visibility
      showPoseBtn: false,
      showConfirmBtn: false,
      showConfirmOnlineBtn: false,
      showExportFicheBtn: false,
      showCancelBtn: false,
      showInstallmentFicheBtn: false,
      showPrintFicheBtn: false,

      showPaymentTab: false,
      isToseeState: false,
      isShowBtnConfrimFiche: false, // این دیتای متغیر است
      // #endregion

      // #region services
      getLicenceInfoRes: null,
      saveIncomePaymentOnLineRes: null,
      addToArchiveRes: null,
      confirmOrCancelRes: null,
      cancelFiches: null,
      delOddmentAccountRes: null,
      saveOddmentAccountRes: null,
      saveIncomeRes: null,
      confirmOrCancelFicheRes: null,
      getIncomeFichebyNidProcRes: null
      // #endregion
    }
  },

  created () {
    this.loadFormSetting()
    this.loadObj()
  },

  methods: {
    async reloadConfimFiche () {
      this.isShowConfirmWithPoseModal = false
      await this.loadObj()
    },
    async loadObj () {
      this.isEditable = false
      const taskInfo = (this.taskInfo || this.selectedRequest?.Task[0]) ?? null
      // let TaskArea = taskInfo.TaskArea ?? ""; // گروه
      let TaskTitel = taskInfo?.TaskTitel ?? "" // مرحله
      let StateTitle = this.selectedRequest?.WorkflowTitel ?? "" // نوع پرونده
      if (TaskTitel.includes("محاسبه") && StateTitle.includes("توسعه")) {
        this.showConfirmBtn = true
        this.isToseeState = true
        this.showCancelBtn = true
      } else {
        this.showConfirmBtn = false
        this.isToseeState = false
        this.showCancelBtn = false
      }
      this.getLicenceInfo()
    },
    async getLicenceInfo () {
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc, // "30b59b68-4cee-41ab-84b4-100ac1505a35" تب سوم با این مورد دیتا دارد, // this.selectedRequest.NidProc, // "b4701822-ab24-4d6c-90e5-a8e7dd7ad5ea", // ,
          EumLicenseStatus: this.eumLicenseStatus, // 1,
          IssuancecostsRequestType: this.requestType // 1
        }
      }
      this.showLoading()
      this.$services.excavation
        .getLicenceInfo(payload)
        .then(async ({ data }) => {
          this.getLicenceInfoRes = this.getResponse(data)
          if (this.getLicenceInfoRes.success) {
            if (this.settingDigModel) {
              this.textModel.ShahrdariTexts =
                this.settingDigModel.Settings.ShahrdariTexts
              this.textModel.MessageBargh =
                this.settingDigModel.Settings.MessageBargh
            }
            this.model = this.getLicenceInfoRes.data.GetLicenceInfoResult
            this.normalizedLicensePerson()
            this.changeState()
            this.getIncomeFichebyNidProc()
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
    async changeState () {
      // SetApproval();
      const { ClsIncomeFiche, ExportLicenseInfo } = this.model.ClsLicense
      const fiches = ClsIncomeFiche?.Income_Fiche ?? []
      if (fiches && fiches.length > 0) {
        let tmpSumFichePrice = fiches
          .filter((i) => i.IsConfirm && i.CancelDate === null)
          ?.reduce((n, { Price }) => n + Price, 0)

        tmpSumFichePrice += fiches
          .filter(
            (i) => i.Discount !== null && (i.IsConfirm || i.CancelDate === null)
          )
          ?.reduce((n, { Discount }) => n + Discount, 0)

        this.showExportFicheBtn = true
        if (fiches.some((f) => f.IsCancel)) {
          this.showExportFicheBtn = true
          this.showConfirmBtn = false
          this.showCancelBtn = false
          this.showPrintFicheBtn = false
        }

        let tmpSumIsConfirmPrice = fiches
          .filter((i) => i.IsConfirm)
          ?.reduce((n, { Price }) => n + Price, 0)

        let tmpLicenseAsphaltCoating =
          ExportLicenseInfo?.License_AsphaltCoating ?? []
        let sumTotalDamage = tmpLicenseAsphaltCoating
          .filter((i) => i.IsConfirm && i.CancelDate === null)
          ?.reduce((n, { Price }) => n + Price, 0)

        if (tmpSumIsConfirmPrice === sumTotalDamage) {
          this.showConfirmBtn = false
          this.showCancelBtn = false
        }
        if (
          sumTotalDamage < tmpSumFichePrice - 999 ||
          sumTotalDamage > tmpSumFichePrice + 999
        ) {
          // شرط عدم صدور فیش هنگام محاسبه
          if (this.settingDigModel.Settings.NoFicheInCalc === false) {
            this.save()
          }
        } else if (sumTotalDamage === 0) {
          // اگر مبلغ محاسبه صفر باشد می بایست فیش های صادر شده ابطال شوند
          if (this.settingDigModel.Settings.CancelFichesInZeroCalc) {
            if (fiches.length > 0) {
              await this.cancelFichesInZeroCalc(fiches[0].NIdProc)
            }
          }
        }
      } else {
        // شرط عدم صدور فیش هنگام محاسبه
        if (this.settingDigModel.Settings.NoFicheInCalc === false) {
          this.save()
        }
        // this.showConfirmBtn = false
        // this.showCancelBtn = false
      }
    },
    async cancelFichesInZeroCalc (pNidProc = GuidEmpty) {
      this.showLoading()
      try {
        const { data } = await this.$services.excavation.cancelFiches({
          pNidProc
        })
        this.cancelFichesRes = this.getResponse(data)
        if (this.cancelFichesRes.success) {
          this.monitoringLogCanclFiche(true)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async monitoringLogCanclFiche (pIsSystem = false) {
      await this.getIncomeFichebyNidProc()
      // بخش زیر مربوط به لاگ مانیتورینگ میباشد
      // const res = this.incomeFichebyNidProcResult;
      // if (pIsSystem) {
      //     if (res.IncomeFiches.some(x => x.IsCancel === true && x.CancelDate === currentDate())) {
      //         let tmpIncomeFiches = res.IncomeFiches.filter(f => f.IsCancel === true && f.CancelDate === currentDate())
      //         tmpIncomeFiches.forEach(Item => {
      //           let tmpChange = {}
      //           var tmpChangingLog = {
      //                   NidKartabl = this.selectedRequest === null ? "" : this.selectedRequest.BizCode,
      //                   ActionType = 0,
      //                   BizCodeTitle = "کد نوسازی",
      //                   BizCode = this.selectedRequest === null ? "" : this.selectedRequest.BizCode,
      //                   WorkFlowType = ApplicationCommon.ClsCommon.TaskInfo === null ? "" : ApplicationCommon.ClsCommon.TaskInfo.WorkflowInstance.WorkflowTitel,
      //                   BizCodeType = "NosaziCode",
      //                   JobLocationName = ApplicationCommon.ClsCommon.UserInfo.JobLocationName,
      //                   JobLocation = ApplicationCommon.ClsCommon.UserInfo.JobLocation,
      //                   Action = { FormAction = " ابطال فیش شماره" + Item.FicheNo,
      //                       FormCaption = "ابطال فیش حفاری",
      //                       FormName = "ابطال فیش",
      //                       FormChangeSet = new List<ClsFormChangeSet>()
      //                   }

      //               }
      //             tmpChange.Add(new SafaSilverLightComponet.ClsChangeSet() { FieldName = "NidUser", New_Value = this.getNidUser(), Old_Value = "", Description = "NidUser" });
      //             tmpChange.Add(new SafaSilverLightComponet.ClsChangeSet() { FieldName = "UserName", New_Value = this.getUserDisplayName(), Old_Value = "", Description = "کاربر ابطال کننده" });
      //             this.SaveMonitoringLog_Direct(tmpChangingLog, tmpChange);
      //         });
      //     }
      // } else {
      //     System.Collections.ObjectModel.ObservableCollection<SafaSilverLightComponet.ClsChangeSet> tmpChange = new System.Collections.ObjectModel.ObservableCollection<SafaSilverLightComponet.ClsChangeSet>();
      //     var tmpChangingLog = new ClsRequestMessageLogging
      //     {
      //         Log = new ClsFormActionEntry
      //         {
      //             NidKartabl = this.selectedRequest === null ? "" : this.selectedRequest.BizCode,
      //             ActionType = 0,
      //             BizCodeTitle = "کد نوسازی",
      //             BizCode = this.selectedRequest === null ? "" : this.selectedRequest.BizCode,
      //             WorkFlowType = ApplicationCommon.ClsCommon.TaskInfo === null ? "" : ApplicationCommon.ClsCommon.TaskInfo.WorkflowInstance.WorkflowTitel,
      //             BizCodeType = "NosaziCode",
      //             JobLocationName = ApplicationCommon.ClsCommon.UserInfo.JobLocationName,
      //             JobLocation = ApplicationCommon.ClsCommon.UserInfo.JobLocation,
      //             Action = new ClsFormAction()
      //             {
      //                 FormAction = " ابطال فیش شماره" + this.selectedIncomeFiche.FicheNo, // Context.ClsLicense.ClsIncomeFiche.Income_Fiche.FirstOrDefault(f => f.NIdFiche === LastNidFiche).FicheNo,
      //                 FormCaption = "ابطال فیش حفاری",
      //                 FormName = "ابطال فیش",
      //                 FormChangeSet = new List<ClsFormChangeSet>()
      //             }
      //         }
      //     };
      //     tmpChange.Add(new SafaSilverLightComponet.ClsChangeSet() { FieldName = "NidUser", New_Value = this.getNidUser(), Old_Value = "", Description = "NidUser" });
      //     tmpChange.Add(new SafaSilverLightComponet.ClsChangeSet() { FieldName = "UserName", New_Value = this.getUserDisplayName(), Old_Value = "", Description = "کاربر ابطال کننده" });
      //     UIDig.Common.ClsCommon.SaveMonitoringLog_Direct(tmpChangingLog, tmpChange);
      // }
    },
    async confirmOrCancel (IsConfirm) {
      try {
        var obj = this.selectedIncomeFiche
        if (!obj) return this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
        this.showLoading()
        const { data } = await this.$services.excavation.confirmOrCancelFiche({
          pRequest: {
            NIdFiche: obj.NIdFiche,
            IsConfirm
          }
        })

        this.confirmOrCancelRes = this.getResponse(data)
        if (this.confirmOrCancelRes.success) {
          this.showSuccess(`ابطال فیش ${obj.FicheNo} با موفقیت انجام گردید.`)
          await this.log({
            action: this.logActions.cancel,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ابطال فیش ${obj.FicheNo} انجام گردید.`
          })
          if (IsConfirm) {
            this.acceptPayment()
          } else {
            this.monitoringLogCanclFiche()
          }
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    afterSavePeyment () {
      this.activeTab = 'Calculations'
      this.editable = false
      this.getIncomeFichebyNidProc()
    },
    async getIncomeFichebyNidProc (nidProc) {
      this.selectedIncomeFiche = null
      try {
        const payload = {
          pRequest: {
            NidProc: nidProc || this.selectedRequest.NidProc, // "b4701822-ab24-4d6c-90e5-a8e7dd7ad5ea", // , اینجا یا باید از آرگومان بخونه یا باید از درخواست انتخاب شده این متد از دو جا صدا میشه
            EumLicenseStatus: this.eumLicenseStatus,
            IssuancecostsRequestType: this.requestType
          }
        }
        this.showLoading()
        const { data } =
          await this.$services.excavation.getIncomeFichebyNidProc(payload)
        this.getIncomeFichebyNidProcRes = this.getResponse(data)
        if (this.getIncomeFichebyNidProcRes.success) {
          const res =
            this.getIncomeFichebyNidProcRes.data.GetIncomeFichebyNidProcResult
          const incomeFiches = this.normalizedIncomeFiche(
            res?.IncomeFiches ?? []
          )
          this.incomeFichebyNidProcResult = {
            ...res,
            IncomeFicheList:
              res?.IncomeFicheList.sort((a, b) =>
                a.FicheNo > b.FicheNo ? -1 : 1
              ) ?? [],
            IncomeFiches:
              incomeFiches.sort((a, b) => (a.FicheNo > b.FicheNo ? -1 : 1)) ??
              []
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    saveOddmentAccount () {
      this.showLoading()
      this.$services.excavation
        .saveOddmentAccount({
          pRequest: {
            ClsOddmentAccount: {
              Nid: GuidEmpty,
              OddmentAcc: null,
              OddmentAccount: this.model.ClsLicense.OddmentAccount
            }
          }
        })
        .then(async (data) => {
          this.saveOddmentAccountRes = this.getResponse(data)
          if (this.saveOddmentAccountRes.success) {
            this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره اطلاعات بستانکاری برای درخواست شماره ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید`
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
    saveIncome () {
      this.showLoading()
      this.$services.excavation
        .saveIncome({ pRequest: this.model })
        .then(async (data) => {
          this.saveIncomeRes = this.getResponse(data)
          this.loadObj()
          if (this.saveIncomeRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره اطلاعات برای درخواست شماره ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید`
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
    calculate (e) {
      // این متد در زمل هم کارخاصی انجام نمیداد و صرفا لود مجدد انجام میشد
      if (e) this.loadObj()
      this.showFormulaModal = false
    },
    isNumeric (value) {
      return /^-?\d+$/.test(value)
    },
    poseBtnHandler () {
      // #TODO
      const TmpCurrentFiche = this.selectedIncomeFiche
      if (this.isNumeric(TmpCurrentFiche.Price)) {
        this.showConfirm("آیا از تایید فیش از طریق پوز اطمینان دارید؟").onOk(
          () => {
            this.isShowConfirmWithPoseModal = true
            // console.log("تایید فیش از طریق پوز")
          }
        )
      } else {
        this.showError("مبلغ کافی برای پرداخت موجود نمی باشد")
      }
    },
    async save () {
      let sum = 0
      this.TotalDamage =
        this.model.ClsLicense.ExportLicenseInfo.License_AsphaltCoating.map(
          (e) => {
            sum = e.TotalDamage.Value + sum
          }
        )
      if (sum <= 0) return this.showError("مبلغ کافی برای صدور فیش موجود نمی باشد")
      this.showLoading()
      this.model.ClsLicense.UserName = this.currentUser.username
      try {
        const { data } = await this.$services.excavation
          .saveIncome({
            pRequest: {
              ClsLicense: this.model.ClsLicense
            }
          })
        this.saveIncomeRes = this.getResponse(data)
        if (this.saveIncomeRes.success) {
          this.model.ClsLicense.ClsIncomeFiche = this.saveIncomeRes.data.SaveIncomeResult.ClsLicense.ClsIncomeFiche
          this.changeState(this.TotalDamage)
          this.showSuccess(`صدور فیش با موفقیت انجام گردید.`)
          await this.log({
            action: this.logActions.exportFiche,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `صدور فیش انجام گردید.`
            // saveDesc: `صدور فیش برای ${FicheNo} شماره نننن انجام گردید.`
          })
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    // async save () {
    //   const clsLic = this.model.ClsLicense
    //   if (clsLic === null || clsLic.ExportLicenseInfo === null) {
    //     return this.showError("اطلاعاتی موجود نمی باشد")
    //   }
    //   // this.addToArchive()
    //   let sumTotalDamage = 0
    //   sumTotalDamage =
    //     clsLic?.ExportLicenseInfo?.License_AsphaltCoating?.map(
    //       (f) => f.TotalDamage.Value
    //     )?.reduce((b, a) => b + a, 0) ?? 0
    //   if (sumTotalDamage > 0) {
    //     let tmpFiches = clsLic?.ClsIncomeFiche?.Income_Fiche ?? []
    //     let fiches = tmpFiches.map((m) => {
    //       return {
    //         ...m,
    //         IsConfirm: m.IsConfirm || null,
    //         IsCancel: m.IsCancel || null,
    //         CancelDate: m.CancelDate || null,
    //         Discount: m.Discount || 0,
    //         Price: m.Price || 0
    //       }
    //     })
    //     let tmpFichePrice = fiches
    //       .filter((i) => i.IsConfirm === false && i.IsCancel === false)
    //       ?.reduce((n, { Price }) => n + Price, 0)
    //     if (
    //       tmpFichePrice > 0 &&
    //       sumTotalDamage < tmpFichePrice + 999 &&
    //       this.settingDigModel.Settings.CancelFicheManual === true
    //     ) {
    //       return this.showError("ابتدا فیش صادر شده قبلی را ابطال نمایید.")
    //     }
    //     let tmpSumPrice = fiches
    //       .filter((i) => i.IsConfirm || i.CancelDate === null)
    //       ?.reduce((n, { Price }) => n + Price, 0)
    //     tmpSumPrice += fiches
    //       .filter(
    //         (i) => i.Discount !== null && (i.IsConfirm || i.CancelDate === null)
    //       )
    //       ?.reduce((n, { Discount }) => n + Discount, 0)
    //     if (tmpSumPrice + 999 <= sumTotalDamage) {
    //       this.saveIncome()
    //       this.showSuccess("صدور فیش با موفقیت انجام گردید.")
    //       // await this.log({
    //       //   action: this.logActions.exportFiche,
    //       //   bizCode: this.selectedRequest.NidProc,
    //       //   bizCodeTitle: "NidProc",
    //       //   nosaziCode: this.selectedRequest.BizCode,
    //       //   nidWorkItem: this.selectedRequest.NidWorkItem,
    //       //   saveDesc: `صدور فیش درخواست شماره ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید`
    //       // })
    //     }
    //   } else this.showError("مبلغ کافی برای صدور فیش موجود نمی باشد")
    // },
    confirmBtnHandler () {
      this.acceptPayment()
    },
    confirmOnlineBtnHandler () {
      const taskInfo = (this.taskInfo || this.selectedRequest?.Task[0]) ?? null
      let TaskTitel = taskInfo?.TaskTitel ?? "" // مرحله
      if (this.ciBank !== 0) {
        var obj = this.selectedIncomeFiche
        if (!obj) return this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
        const payload = {
          pRequest: {
            BillID: obj.BillID,
            PaymentID: obj.PaymentID,
            CI_Bank: this.ciBank,
            TaskTitel,
            FormName: "ULicense",
            UserGroups: this.currentUser.UserGroups
          }
        }
        this.showLoading()
        this.$services.excavation
          .saveIncomePaymentOnLine(payload)
          .then(async ({ data }) => {
            this.saveIncomePaymentOnLineRes = this.getResponse(data)
            if (this.saveIncomePaymentOnLineRes.success) {
              // await this.log({
              //   action: this.logActions.view,
              //   bizCode: this.selectedRequest.NidProc,
              //   bizCodeTitle: "NidProc",
              //   nosaziCode: this.selectedRequest.BizCode,
              //   nidWorkItem: this.selectedRequest.NidWorkItem,
              //   saveDesc: `بارگذاری اطلاعات  درخواست شماره ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید`
              // })
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
      } else {
        this.showError("لطفا بانک  صادر کننده فیش مورد نظر را انتخاب نمایید")
      }
    },
    exportFicheBtnHandler () {
      this.save()
    },
    cancelBtnHandler () {
      this.confirmOrCancel(false)
    },
    installmentFicheBtnHandler () {
      this.taghsidShow = true
    },
    printFicheBtnHandler () {
      this.printFiche()
    },
    acceptPayment () {
      const taskInfo = (this.taskInfo || this.selectedRequest?.Task[0]) ?? null
      let TaskTitel = taskInfo?.TaskTitel ?? "" // مرحله
      let obj = this.model.ClsLicense
      if (
        obj.CI_RequestType === 1 &&
        TaskTitel.Contains("محاسبه") &&
        IsMashhad
      ) {
        this.showError("امکان تایید فیش در مرحله محاسبه و صدور فیش وجود ندارد")
      } else if (this.lastNidFiche() === GuidEmpty) {
        this.showError("لطفا ابتدا فیش مورد نظر را انتخاب نمایید")
      } else {
        this.showPaymentTab = true
        this.activeTab = "PaymentTab"
        this.$refs.paymentDig.getIncomePayment()
        // this.getIncomePayment()
        // const self = this
        // this.$nextTick(() => {
        //   this.activeTab = "PaymentTab"
        //   this.$refs.paymentDig.SaveCompeted += (Args) => {
        //     if (Args) {
        //       self.showPaymentTab = false
        //       self.activeTab = "Specifications"
        //       self.loadObj()
        //     }
        //   }
        //   self.$refs.paymentDig.NIdFiche = self.lastNidFiche()
        //   self.$refs.paymentDig.CI_RequesterType = obj.CI_RequesterType
        //   if (!self.model.ClsIncome_Payment)
        //   { self.model.ClsIncome_Payment = self.$refs.paymentDig.model.ClsIncome_Payment }
        //   self.$refs.paymentDig.model = self.model
        //   self.$refs.paymentDig.loadObj()
        // })
      }
    },
    // async addToArchive () {
    //   let path =
    //     window.getConfigValue("esupParams")?.ClsDigParams
    //       ?.ReportDirectoryPath ?? null
    //   if (!path) return this.showError("مسیر گزارشات حفاری تعریف نشده است")
    //   try {
    //     let TmpParameters = {}
    //     const payload = {
    //       NidUser: this.getNidUser(),
    //       ClsArchive: {
    //         ReportName: `${path}/RptFactor`,
    //         DomainName: "Dig",
    //         BizCode: this.model.ClsLicense.NIdProc,
    //         FileName: "RptFactor_" + this.model.ClsLicense.NIdProc,
    //         Parameters: TmpParameters
    //       }
    //     }
    //     this.showLoading()
    //     const { data } = await this.$services.excavation.addToArchive(payload)
    //     this.addToArchiveRes = this.getResponse(data)
    //     if (this.addToArchiveRes.success) {
    //     }
    //   } catch (e) {
    //     console.error(e)
    //     this.serverError()
    //   } finally {
    //     this.hideLoading()
    //   }
    // },
    async printFiche () {
      if (!this.selectedIncomeFiche) { return this.showError("لطفا فیش مورد نظر را انتخاب نمایید.") }
      const reportPath =
      `${window.getConfigValue('dig.digReportPath')}/RptFiche`
      const queryParams = {
        NIdUser: this.getNidUser(),
        NIdFiche: this.selectedIncomeFiche.NIdFiche
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedIncomeFiche.FicheNo,
        bizCodeTitle: "NIdFiche",
        saveDesc: `چاپ اطلاعات  درخواست شماره ${this.selectedIncomeFiche.FicheNo} در فرم ${this.title} انجام گردید`
      })
    },
    async delOddmentAccount (odd) {
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.delOddmentAccount({
          pRequest: {
            ClsOddmentAccount: {
              Nid: GuidEmpty,
              OddmentAcc: {
                CI_OddmentType: odd.CI_OddmentType,
                NId: odd.NId,
                CI_Bank: odd.CI_Bank,
                FicheNo: odd.FicheNo,
                NidOddmentAccount: odd.NidOddmentAccount,
                OddmentDate: odd.OddmentDate,
                UserName: odd.UserName,
                Value: odd.Value
              }
            }
          }
        })
        this.delOddmentAccountRes = this.getResponse(data)
        if (this.delOddmentAccountRes.success) {
          this.showError(`فیش با مبلغ ${odd?.Value ?? ""} با موفقیت حذف گردید.`)
          await this.log({
            action: this.logActions.delete,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `فیش با مبلغ ${odd?.Value ?? ""} حذف گردید.`
          })
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadFormSetting () {
      try {
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "SettingDig",
            defaultValue: this.settingDigModel,
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
            // useCache: false,
          }
        )
        this.settingDigModel = require("src/utils/mergeSettings").default(
          this.settingDigModel,
          settings
        )
      } catch (e) {
        console.error(e)
      }
    },
    normalizedIncomeFiche (arr) {
      return arr.map((m) => {
        return {
          ...m,
          NIdProc: m.NIdProc,
          Comments: m.Comments ?? "",
          IsConfirm: m.IsConfirm ?? false,
          SysCI_LicenseStatus: m.SysCI_LicenseStatus ?? 0,
          PaymentID: m.PaymentID ?? "",
          FicheNo: m.FicheNo ?? 0,
          IsCancel: m.IsCancel ?? false,
          CI_ConfrimFicheType: m.CI_ConfrimFicheType ?? 0,
          ConfirmDate: m.ConfirmDate ?? "",
          PaymentRahgiriCodeHesbRayan: m.PaymentRahgiriCodeHesbRayan ?? "",
          RequestStatus: m.RequestStatus ?? "",
          CancelDate: m.CancelDate ?? "",
          BankPaymentDate: m.BankPaymentDate ?? "",
          PaymentRahgiriCode: m.PaymentRahgiriCode ?? "",
          Discount: m.Discount ?? 0,
          Deptor: m.Deptor ?? 0,
          SysCI_PaymentType: m.SysCI_PaymentType ?? 0,
          FicheDate: m.FicheDate ?? "",
          UserNameConfirmer: m.UserNameConfirmer ?? "",
          MessgeHesbRayan: m.MessgeHesbRayan ?? "",
          PaymentBreakDate: m.PaymentBreakDate ?? "",
          NIdFiche: m.NIdFiche,
          UserName: m.UserName ?? "",
          UserNameShahrdari: m.UserNameShahrdari ?? "",
          BillID: m.BillID ?? "",
          DateCalculated: m.DateCalculated ?? "",
          Creditor: m.Creditor ?? 0,
          PaymentReferenceNo: m.PaymentReferenceNo ?? "",
          Price: m.Price ?? 0,
          TimeCalculated: m.TimeCalculated ?? "",
          PaymentDate: m.BankPaymentDate ?? "",
          UserCalculated: m.UserCalculated ?? "",
          InstallmentPrice: m.InstallmentPrice ?? 0
        }
      })
    },
    normalizedLicensePerson () {
      let normalizedGrid = this.model.ClsLicense.License_Person.map((e) => {
        return {
          ...e,
          PersonTel: e.ManagerTel
        }
      })
      this.model.ClsLicense.License_Person = normalizedGrid
    },
    selectedOddmAccFicheHandler (e) {
      this.selectedOddmAccFiche = e
    },
    lastNidFiche () {
      return !this.selectedIncomeFiche
        ? GuidEmpty
        : this.selectedIncomeFiche.NIdFiche
    },
    selectedIncomeFicheHandler (params) {
      this.selectedIncomeFiche = params
    },
    saveAction () {
      switch (this.activeTab) {
        case "PaymentTab":
          this.$refs.paymentDig.saveObj()
          break

        case "Creditor":
          this.saveOddmentAccount()
          break
      }
    }
  },

  watch: {
    selectedOddmAccFiche () {
      let obj = this.selectedOddmAccFiche
      this.showPoseBtn =
        obj && obj.IsCancel === false && obj.IsConfirm === false
    },
    selectedIncomeFiche: {
      handler () {
        const obj = this.selectedIncomeFiche
        this.showConfirmBtn = false
        this.showPrintFicheBtn = false
        this.showPoseBtn = false
        this.showCancelBtn = false
        this.showInstallmentFicheBtn = false
        this.isShowBtnConfrimFiche = false
        if (obj) {
          if (obj.IsConfirm && obj.ConfirmDate !== null) {
            this.showConfirmBtn = true
            this.showCancelBtn = true
            this.showPrintFicheBtn = true
            this.showPoseBtn = false

            if (IsMashhad) this.showCancelBtn = false
            else this.showCancelBtn = true
          } else if (obj.IsCancel) {
            this.showCancelBtn = true
            this.showConfirmBtn = true
            this.showPrintFicheBtn = true
          } else if (obj.IsCancel === false && obj.IsConfirm === false) {
            this.showInstallmentFicheBtn = true
            this.showCancelBtn = true
            if (this.isShowBtnConfrimFiche && this.isToseeState === false) {
              this.showConfirmBtn = true
              this.showConfirmBtn = true
              this.showConfirmOnlineBtn = true
            }
            else {
              this.showConfirmBtn = true
              this.showPrintFicheBtn = true
              this.showConfirmBtn = true
            }
            if (ISConfrimFicheByPose) this.showPoseBtn = true
          }
        }
      },
      deep: true
    },
    activeTab: {
      handler (newVal, oldVal) {
        if (['PaymentTab', 'Creditor'].includes(oldVal)) {
          this.isEditable = false
        }
      }
    }
  }
}
</script>
