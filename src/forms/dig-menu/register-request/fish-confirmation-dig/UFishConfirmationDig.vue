<template>
  <safa-form
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <template>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveIncomePaymentRes" />
      </template>
      <fit>
        <div class="q-pa-sm">
          <div class="flex items-center q-gutter-x-lg">
            <safa-radio
              label="جستجو براساس شماره فیش"
              v-model="searchBy"
              size="xs"
              :val="0"
            />
            <safa-radio
              label="جستجو براساس شناسه قبض و شناسه پرداخت"
              v-model="searchBy"
              size="xs"
              :val="1"
            />
          </div>
          <q-separator class="q-my-sm" />
          <FormRow v-show="searchBy === 0">
            <FormControl>
              <safa-text
                label="شماره فیش"
                label-width="100px"
                v-model="filter.ficheNo"
                cdcName="ficheNo"
                dir="ltr"
                :required="searchBy === 0"
                @keyup.enter="loadObj"
              >
                <template v-slot:append>
                  <q-icon
                    style="position: relative; right: 5px; font-size: 18px"
                    @click="loadObj"
                    color="primary"
                    name="search"
                    class="cursor-pointer"
                  />
                </template>
              </safa-text>
            </FormControl>
          </FormRow>
          <FormRow v-show="searchBy === 1">
            <FormControl>
              <safa-text
                label="شناسه قبض"
                label-width="100px"
                v-model="filter.billID"
                cdcName="billID"
                dir="ltr"
                :required="searchBy === 1"
                :validations="searchBy === 1 ? ['required', 'number'] : ''"
                @keyup.enter="loadObj"
              >
                <template v-slot:append>
                  <q-icon
                    style="position: relative; right: 5px; font-size: 18px"
                    @click="loadObj"
                    color="primary"
                    name="search"
                    class="cursor-pointer"
                  />
                </template>
              </safa-text>
            </FormControl>
            <FormControl>
              <safa-text
                label="شناسه پرداخت"
                label-width="100px"
                v-model="filter.paymentID"
                cdcName="paymentID"
                dir="ltr"
                :required="searchBy === 1"
                :validations="searchBy === 1 ? ['required', 'number'] : ''"
                @keyup.enter="loadObj"
              >
                <template v-slot:append>
                  <q-icon
                    style="position: relative; right: 5px; font-size: 18px"
                    @click="loadObj"
                    color="primary"
                    name="search"
                    class="cursor-pointer"
                  />
                </template>
              </safa-text>
            </FormControl>
          </FormRow>
        </div>

        <safa-tabs v-model="activeTab" class="fit" :padding="true">
          <template v-slot:tabs>
            <tab-menu name="ClsIncomePayment" label="اطلاعات فیش" />
            <tab-menu
              name="ConfirmFicheTab"
              label="تایید فیش"
              v-if="hasFiche"
            />
          </template>
          <tab-content name="ClsIncomePayment">
            <UClsIncomePayment v-model="model" />
          </tab-content>
          <tab-content name="ConfirmFicheTab">
            <UConfirmFicheTab
              v-model="model"
              :textModel="textModel"
              :m="mode"
            />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer>
        <form-actions
          v-if="activeTab === 'ConfirmFicheTab'"
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        />
        <btn-default
          v-if="activeTab === 'ClsIncomePayment'"
          label="چاپ فیش"
          @click="printReport"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UClsIncomePayment from "./partials/UClsIncomePayment"
import UConfirmFicheTab from "./partials/UConfirmFicheTab"
import { currentDate, currentTime } from "src/utils/index"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
const defaultModel = {
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
  }
}
export default {
  mixins: [baseFormMixin],
  components: {
    UClsIncomePayment,
    UConfirmFicheTab
  },
  data () {
    return {
      name: "UFishConfirmationDig",
      title: "تایید فیش",
      formKey: "6063A948-B6A5-4D6A-A970-724F631D246F",
      main: true,

      // cond
      showRd_PaymentType: false,
      showRd_PaymentType2: false,
      showRd_PaymentType3: false,
      showRd_PaymentType4: false,
      showRd_PaymentType5: false,
      showRd_PaymentType6: false,
      showGroupMali: false,
      showGroupShahrdari: false,

      // var
      FirstPayment: null,
      PaymentCompanyDate: null,
      CI_RequesterType: 0,
      activeTab: "ClsIncomePayment",
      searchBy: 0,
      hasFiche: false,

      filter: {
        ficheNo: "",
        billID: "",
        paymentID: ""
      },

      // model
      settingDigModel: {
        Settings: {
          ConfirmWithRequesterType: false
        }
      },
      assignRequesterToUser: [],

      textModel: {
        ShahrdariTexts: "",
        MessageBargh: ""
      },

      model: { ...defaultModel },
      modeldate: {
        Rd_PaymentType: 0,
        No: "",
        Date: "",
        CompanyNo: "",
        CompanyDate: ""
      },
      // Res
      loadObjRes: null,
      saveIncomePaymentRes: null,
      getClsCIRequesterTypeRes: null
    }
  },
  created () {
    this.loadFormSetting()
    this.loadUserSetting()
  },

  methods: {
    loadObj () {
      this.assignRequest()
      const payload = {
        pRequest: {
          FicheNo: this.searchBy === 0 ? this.filter.ficheNo : 0,
          BillID: this.searchBy === 1 ? this.filter.billID : null,
          PaymentID: this.searchBy === 1 ? this.filter.paymentID : null
        }
      }
      if (this.searchBy === 0 && this.filter.ficheNo === "") {
        return this.showError("برای جستجو، لطفا شماره فیش را وارد کنید.")
      }
      if (this.searchBy === 1 && this.filter.billID === "") {
        return this.showError("برای جستجو، لطفا شناسه قبض را وارد کنید.")
      }
      if (this.searchBy === 1 && this.filter.paymentID === "") {
        return this.showError("برای جستجو، لطفا شناسه پرداخت را وارد کنید.")
      }

      this.showLoading()
      this.$services.excavation
        .getIncomePaymentInFicheNo(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data.GetIncome_PaymentInFicheNoResult
            debugger
            this.hasFiche =
              this.model.ClsIncome_Payment.Income_Fiche.IsConfirm === false
            this.PaymentCompanyDate =
              this.model.ClsIncome_Payment.Income_Payment.CompanyDate
            const ClsOncome =
              this.model.ClsIncome_Payment.Income_Payment.SysCI_PaymentType
            this.model.ClsIncome_Payment.Income_Payment.SysCI_PaymentType =
              ClsOncome || 1

            if (this.settingDigModel) {
              this.textModel.ShahrdariTexts =
                this.settingDigModel.Settings.ShahrdariTexts
              this.textModel.MessageBargh =
                this.settingDigModel.Settings.MessageBargh
            }

            await this.log({
              action: this.logActions.view,
              bizCode: this.model?.ClsIncome_Payment.Income_Fiche?.FicheNo,
              bizCodeTitle: "FicheNo",
              saveDesc: `نمایش اطلاعات فیش حفاری با شماره فیش ${this.model?.ClsIncome_Payment.Income_Fiche?.FicheNo} انجام گردید.`
            })
          } else this.reset()
        })
        .catch((e) => {
          this.reset()
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },

    saveObj () {
      if (!this.isValidForm()) return
      if (!this.hasFiche) {
        return this.showError("لطفا یک فیش دیگر جستجو نمایید.")
      }
      this.saveIncomePayment()
    },

    saveIncomePayment () {
      const baseModel = this.model.ClsIncome_Payment
      if (baseModel.Income_Payment.SysCI_PaymentType === 1) {
        if (
          !baseModel.Income_Payment.CompanyDate ||
          !baseModel.Income_Payment.CompanyNo
        ) {
          this.showError(
            "ابتدا اطلاعات امور مالی شرکت خدماتی باید تایید شود. لطفا نسبت به تایید و ارسال فرم اقدام نمائید"
          )
          return false
        }
      }
      if (baseModel.Income_Payment.SysCI_PaymentType !== 1) {
        baseModel.Income_Payment.UserName = this.getUserDisplayName()
        baseModel.Income_Payment.NidUser = this.getNidUser()
        baseModel.Income_Fiche.UserNameShahrdari = this.getUserDisplayName()
      }
      if (baseModel.Income_Payment.SysCI_PaymentType === 1) {
        if (this.showGroupShahrdari) {
          if (
            baseModel.Income_Fiche.Comments === "" ||
            !baseModel.Income_Fiche.Comments.includes("شهردار")
          ) {
            baseModel.Income_Fiche.Comments +=
              "کاربر امور مالی شهرداری : " +
              this.getUserDisplayName() +
              " : تاریخ تایید" +
              currentDate() +
              " - " +
              currentTime()
          }
          baseModel.Income_Fiche.UserNameShahrdari = this.getUserDisplayName()
        } else {
          if (
            baseModel.Income_Fiche.Comments !== "" ||
            !baseModel.Income_Fiche.Comments.includes("خدمات")
          ) {
            baseModel.Income_Fiche.Comments +=
              "کاربر امور مالی شرکت خدماتی : " +
              this.getUserDisplayName() +
              " : تاریخ تایید" +
              currentDate() +
              " - " +
              currentTime()
          }
          baseModel.Income_Payment.UserName = this.getUserDisplayName()
          baseModel.Income_Payment.NidUser = this.getNidUser()
        }
      }
      let RequestMessage = { ...this.model }
      debugger

      RequestMessage.UserGroups = this.currentUser.UserGroups
      RequestMessage.IsConfirm = true
      RequestMessage.TaskTitel = this.taskInfo?.TaskTitel ?? null
      RequestMessage.FormName = "UPayment"

      this.showLoading()
      const payload = {
        pRequest: { ...RequestMessage }
      }
      this.$services.excavation
        .saveIncomePayment(payload)
        .then(async ({ data }) => {
          this.saveIncomePaymentRes = this.getResponse(data)
          if (this.saveIncomePaymentRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            this.isEditable = false
            this.activeTab = "ClsIncomePayment"
            this.loadObj()
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: ""
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

    async printReport () {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptFiche`
      const queryParams = {
        NIdFiche: this.model?.ClsIncome_Payment.Income_Fiche?.NIdFiche ?? "",
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.model?.ClsIncome_Payment.Income_Fiche?.FicheNo ?? "",
        bizCodeTitle: "FicheNo",
        saveDesc: `چاپ فیش حفاری با شماره فیش ${this.model?.ClsIncome_Payment.Income_Fiche?.FicheNo} انجام گردید.`
      })
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
        this.settingDigModel = settings
      } catch (e) {
        console.error(e)
      }
    },
    async loadUserSetting () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getAssignRequestToUser()
        this.userSettingRes = this.getResponse(data)
        if (this.userSettingRes.success) {
          let list =
            this.userSettingRes.data?.GetAssignRequestToUserResult
              ?.ClsAssignRequestToUser?.AssignRequesterToUser ?? []
          this.assignRequesterToUser = list.sort((a, b) => {
            return Number(a.StrDate ?? 0) - Number(b.StrDate ?? 0)
          })
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات تنظیمات کاربر انجام گردید.`
            })
          }
        }
      } catch (e) {
        console.error()
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    assignRequest () {
      this.CI_RequesterType =
        this.assignRequesterToUser[0]?.CI_RequesterType ?? 0
      if (this.settingDigModel.Settings.ConfirmWithRequesterType === true) {
        this.getClsCIRequesterType()
      } else {
        if (
          this.assignRequesterToUser != null &&
          this.assignRequesterToUser.AccessToPayment
        ) {
          var AccessToPaymentArray =
            this.assignRequesterToUser.AccessToPayment.split(",")
          this.showRd_PaymentType = AccessToPaymentArray.some((f) => f === "1")
          this.showRd_PaymentType2 = AccessToPaymentArray.some(
            (f) => f === "2"
          )
          this.showRd_PaymentType3 = AccessToPaymentArray.some(
            (f) => f === "3"
          )
          this.showRd_PaymentType4 = AccessToPaymentArray.some(
            (f) => f === "4"
          )
          this.showRd_PaymentType5 = AccessToPaymentArray.some(
            (f) => f === "5"
          )
          this.showRd_PaymentType6 = AccessToPaymentArray.some(
            (f) => f === "6"
          )
          this.FirstPayment = AccessToPaymentArray[0] ?? {}
          if (AccessToPaymentArray.some((f) => f === "A1")) {
            this.showGroupMali = false
            this.showGroupShahrdari = true
          }
          if (AccessToPaymentArray.some((f) => f === "A1")) {
            this.showGroupMali = true
            this.showGroupShahrdari = false
          }
        }
      }
    },
    getClsCIRequesterType () {
      this.$services.excavation
        .getClsCIRequesterType()
        .then(async ({ data }) => {
          this.getClsCIRequesterTypeRes = this.getResponse(data)
          if (this.getClsCIRequesterTypeRes.success) {
            const requesterTypeList =
              this.getClsCIRequesterTypeRes?.data?.GetClsCI_RequesterTypeResult
                ?.CI_RequesterType ?? []
            if (requesterTypeList.length > 0) {
              const dto = requesterTypeList.find(
                (i) => i.ID === this.CI_RequesterType
              )
              if (dto != null) {
                const AccessToPayment = dto?.AccessToPayment ?? ""
                if (AccessToPayment !== "") {
                  var AccessToPaymentArray = AccessToPayment.split(",")
                  this.showRd_PaymentType = AccessToPaymentArray.some(
                    (f) => f === "1"
                  )
                  this.showRd_PaymentType2 = AccessToPaymentArray.some(
                    (f) => f === "2"
                  )
                  this.showRd_PaymentType3 = AccessToPaymentArray.some(
                    (f) => f === "3"
                  )
                  this.showRd_PaymentType4 = AccessToPaymentArray.some(
                    (f) => f === "4"
                  )
                  this.showRd_PaymentType5 = AccessToPaymentArray.some(
                    (f) => f === "5"
                  )
                  this.showRd_PaymentType6 = AccessToPaymentArray.some(
                    (f) => f === "6"
                  )
                } else {
                  this.showRd_PaymentType = false
                  this.showRd_PaymentType2 = false
                  this.showRd_PaymentType3 = false
                  this.showRd_PaymentType4 = false
                  this.showRd_PaymentType5 = false
                  this.showRd_PaymentType6 = false
                }
              }
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
    reset () {
      this.resetValidation()
      this.hasFiche = false
      this.filter = {
        ficheNo: "",
        billID: "",
        paymentID: ""
      }
      this.model = { ...defaultModel }
    }
  },

  watch: {
    searchBy: {
      handler () {
        this.reset()
      },
      immediate: true
    }
  }
}
</script>
