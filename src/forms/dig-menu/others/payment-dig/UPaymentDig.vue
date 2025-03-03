<template>
  <fit>
    <safa-status :result="saveIncomePaymentRes" />
    <div class="q-gutter-x-lg">
      <safa-radio
        label="حساب فی مابین"
        v-model="paymentType"
        :m="m"
        :val="1"
        size="xs"
        v-if="showRd_PaymentType"
      />
      <safa-radio
        label="توافقنامه/تفاهمنامه"
        v-model="paymentType"
        :m="m"
        :val="2"
        size="xs"
        v-if="showRd_PaymentType2"
      />
      <safa-radio
        label="تایید پرداخت بانک"
        v-model="paymentType"
        :m="m"
        :val="3"
        size="xs"
        v-if="showRd_PaymentType3"
      />
      <safa-radio
        label="تعهد پرداخت"
        v-model="paymentType"
        :m="m"
        :val="4"
        size="xs"
        v-if="showRd_PaymentType4"
      />
      <safa-radio
        label="سازمانهای شهرداری"
        v-model="paymentType"
        :m="m"
        :val="5"
        size="xs"
        v-if="showRd_PaymentType5"
      />
      <safa-radio
        label="دستگاه پوز"
        v-model="paymentType"
        :m="m"
        :val="6"
        size="xs"
        v-if="showRd_PaymentType6"
      />
    </div>
    <q-separator class="q-my-sm" />
    <fit v-if="showBankGroup">
      <FormRow>
        <FormControl>
          <safa-datepicker
            label="تاریخ پرداخت به بانک"
            label-width="120px"
            v-model="model.ClsIncome_Payment.Income_Payment.Date"
            cdcName="Date"
            :m="m"
          />
        </FormControl>
      </FormRow>
    </fit>
    <fit v-if="showFiMabinGroup">
      <expantion-section
        v-model="es1"
        default-opened
        title="امور مالی شهرداری"
        v-if="groupShahrdariIsEnabled"
      >
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره"
              label-width="80px"
              v-model="model.ClsIncome_Payment.Income_Payment.No"
              cdcName="No"
              :m="m && groupShahrdariIsEnabled"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ"
              label-width="80px"
              v-model="model.ClsIncome_Payment.Income_Payment.Date"
              cdcName="Date"
              :m="m && groupShahrdariIsEnabled"
            />
          </FormControl>
        </FormRow>
      </expantion-section>
      <expantion-section
        v-model="es2"
        default-opened
        title="امور مالی شرکت خدماتی"
        v-if="showGroupMali"
      >
        <FormRow>
          <FormControl>
            <safa-text
            label="شمار8ه شرکت خدماتی"
                          label-width="80px"
              v-model="model.ClsIncome_Payment.Income_Payment.CompanyNo"
              cdcName="CompanyNo"
              :m="m && groupMaliIsEnabled"
              :validations="['required']"
              required
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ"
              label-width="80px"
              v-model="model.ClsIncome_Payment.Income_Payment.CompanyDate"
              cdcName="CompanyDate"
              :m="m && groupMaliIsEnabled"
              :validations="['required']"
              required
            />
          </FormControl>
        </FormRow>
      </expantion-section>
    </fit>
    <fit v-if="showPaymentGroup">
      <FormRow>
        <FormControl>
          <safa-datepicker
            label="تاریخ شرکت خدماتی"
            label-width="120px"
            v-model="model.ClsIncome_Payment.Income_Payment.CompanyDate"
            cdcName="CompanyDate"
            :m="m"
          />
        </FormControl>
          <FormControl>
            <safa-text
              label="شماره شرکت خدماتی"
              label-width="120px"
              v-model="model.ClsIncome_Payment.Income_Payment.CompanyNo"
              cdcName="CompanyNo"
              :m="m"
              :validations="['required']"
              required
            />
          </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ"
            label-width="120px"
            v-model="model.ClsIncome_Payment.Income_Payment.Date"
            cdcName="Date"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره"
            label-width="120px"
            v-model="model.ClsIncome_Payment.Income_Payment.No"
            cdcName="CompanyNo"
            :m="m"
            :validations="['required']"
            required
          />
        </FormControl>
      </FormRow>
    </fit>
    <fit v-if="false">
      <!-- <Pose v-model="model"  /> -->
      <FormRow>
        <FormControl>
          <safa-datepicker
            label="تاریخ پرداخت"
            label-width="80px"
            v-model="model.ClsIncome_Payment.Income_Payment.Date"
            cdcName="Date"
            :m="m"
          />
        </FormControl>
      </FormRow>
    </fit>
    <fit v-if="showSazmanGroup">
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-datepicker
            label="تاریخ پرداخت"
            label-width="80px"
            v-model="txtMessageBargh1"
            cdcName="MessageBargh1"
            :m="m"
          />
        </FormControl>
        {{ textModel.ShahrdariTexts }}
      </FormRow>
      <!-- <safa-notice>
        بر اساس دستور شهردار محترم مشهد در هامش نامه شماره 14229/92 به تاریخ
        21/3/1392 و ابلاغیه شماره 53131/92/79 مورخ 5/4/1392 خسارت روکش آسفالت از
        پروژه های حفاری سازمانهای تابعه شهرداری اخذ نمی شود . خسارت تاخیر غیر
        مجاز .شامل این معافیت نمی گردد";
      </safa-notice> -->
    </fit>
    <fit v-if="showTavafoghGroup">
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-datepicker
            label="تاریخ شرکت خدماتی"
            label-width="120px"
            v-model="model.ClsIncome_Payment.Income_Payment.CompanyDate"
            cdcName="CompanyDate"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ"
            label-width="120px"
            v-model="model.ClsIncome_Payment.Income_Payment.Date"
            cdcName="Date"
            :m="m"
          />
        </FormControl>
        <internal-section title="توافقنامه" class="q-my-sm" :defaultShow="true">
        {{ textModel.MessageBargh }}
      </internal-section>
      </FormRow>
      <!-- <safa-notice>
        بر اساس توافقنامه مورخ 1366/08/10 و تنفیذ آن در جلسه مورخ 1379/03/03
        فیمابین شهرداری مشهد و شرکت برق( توزیع برق مشهد) ،خسارت روکش آسفالت
        معابر ناشی از حفاریها در فبال جابجایی تاسیسات در مسیر طرح های شهرداری،از
        شرکت برق وصول نمی گردد.کاربر محترم در مرحله محاسبه وصدور فیش با انتحاب
        کلید توافقنامه وکلید آن ،پرونده را به مرحله تایید و صدور مجوزحفاری ارسال
        نمایند.</safa-notice
      > -->
    </fit>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate, currentTime } from "src/utils/index"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    selectedFiche: Object,
    selectedCalculationRow: Object,
    // NIdFiche: {
    //   type: String,
    //   default: "00000000-0000-0000-0000-000000000000"
    // },
    formKey: String,
    title: String,
    name: String,
    textModel: Object,
    m: {
      type: String,
      default: "e"
    },
    CI_RequesterType: Number
  },
  data () {
    return {
      // #region variabels
      paymentType: 1,
      ClsSettingDig: {
        Settings: {
          ShahrdariTexts: "",
          MessageBargh: "",
          ConfirmWithRequesterType: "",
          PaymentCompanyDates: "",
          PaymentDates: ""
        }
      },
      txtMessageBargh1: "",
      txtMessageBargh: "",
      paymentCompanyDate: "",

      // #region visibility
      showPaymentGroup: true,
      showTavafoghGroup: false,
      showBankGroup: false,
      showSazmanGroup: false,
      showFiMabinGroup: false,

      showRd_PaymentType: true,
      showRd_PaymentType2: true,
      showRd_PaymentType3: true,
      showRd_PaymentType4: true,
      showRd_PaymentType5: true,
      showRd_PaymentType6: true,

      showGroupMali: false,
      showGroupShahrdari: false,
      groupMaliIsEnabled: false,
      groupShahrdariIsEnabled: false,

      // #region services
      getIncomePaymentRes: null,
      saveIncomePaymentRes: null,

      // model: {
      //   ClsIncome_Payment: {
      //     Income_Payment: {
      //       No: "",
      //       Date: "",
      //       CompanyNo: "",
      //       CompanyDate: ""
      //       // UserName: this.getUserDisplayName()
      //     },
      //     IncomeFicheList: {
      //       UserNameShahrdari: ""
      //     },
      //     NIdFiche: ""
      //   }
      // }
      model: {
        ClsIncome_Payment: {
          Income_Fiche: {
            NIdFiche: "00000000-0000-0000-0000-000000000000",
            UserName: "",
            UserNameShahrdari: "",
            Comments: ""
          },
          Income_Payment: {
            CompanyDate: "",
            CompanyNo: "",
            Date: "",
            NIdFiche: "00000000-0000-0000-0000-000000000000",
            SysCI_PaymentType: 0,
            UserName: ""
          },
          NIdFiche: "00000000-0000-0000-0000-000000000000"
        },
        ClsLicense: {
          TaskTitel: "",
          UserGroups: {
            UserGroup: []
          }
        }
      }
    }
  },
  created () {
    this.loadFormSetting()
  },

  methods: {
    getIncomePayment () {
      this.showLoading()
      this.$services.excavation
        .getIncomePayment({
          pRequest: { NIdFiche: this.selectedFiche.NIdFiche }
        })
        .then(async ({ data }) => {
          this.getIncomePaymentRes = this.getResponse(data)
          if (this.getIncomePaymentRes.success) {
            this.assignRequest()
            this.model = this.getIncomePaymentRes.data.GetIncome_PaymentResult
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedFiche.NIdFiche,
            bizCodeTitle: "NIdFiche",
            saveDesc: `اطلاعات فیش باشماره  ${this.selectedFiche.FicheNo} نمایش داده شد.`
          })
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    isNullOrWhiteSpace: (val) => val === null || val === '',
    saveObj () {
      let _cd = currentDate()
      let _ct = currentTime()
      const ClsOncome =
        this.model.ClsIncome_Payment.Income_Payment.SysCI_PaymentType
      this.model.ClsIncome_Payment.Income_Payment.SysCI_PaymentType =
        ClsOncome || 1
      if (
        this.model.ClsIncome_Payment?.Income_Payment?.SysCI_PaymentType === 1
      ) {
        if (
          this.groupShahrdariIsEnabled &&
          (!this.model.ClsIncome_Payment?.Income_Payment?.CompanyDate ||
            !this.model.ClsIncome_Payment?.Income_Payment?.CompanyNo)
        ) {
          this.showError(
            "ابتدا اطلاعات امور مالی شرکت خدماتی باید تایید شود. لطفا نسبت به تایید و ارسال فرم اقدام نمائید"
          )
          return
        }
      }

      if (this.model.ClsIncome_Payment?.Income_Payment?.SysCI_PaymentType !== 1) {
        this.model.ClsIncome_Payment.Income_Payment.UserName = this.getUserDisplayName()
        this.model.ClsIncome_Payment.Income_Payment.NidUser = this.getNidUser()
        this.model.ClsIncome_Payment.Income_Payment.NIdFiche = this.selectedFiche.NIdFiche
        this.model.ClsIncome_Payment.Income_Fiche.UserNameShahrdari = this.getUserDisplayName()
        this.model.ClsIncome_Payment.Income_Fiche.NIdFiche = this.selectedFiche.NIdFiche
        this.model.ClsIncome_Payment.NIdFiche = this.selectedFiche.NIdFiche
      }

      if (this.model.ClsIncome_Payment?.Income_Payment?.SysCI_PaymentType === 1) {
        if (this.groupShahrdariIsEnabled) {
          if (this.isNullOrWhiteSpace(this.model.ClsIncome_Payment.Income_Fiche.Comments) || !this.model.ClsIncome_Payment.Income_Fiche.Comments.includes("شهردار")) {
            this.model.ClsIncome_Payment.Income_Fiche.Comments += " کاربر امور مالی شهرداری : " + this.getUserDisplayName() + " : تاریخ تایید " + _cd + " - " + _ct
            this.model.ClsIncome_Payment.Income_Fiche.UserNameShahrdari = this.getUserDisplayName()
          }
        } else {
          if (this.isNullOrWhiteSpace(this.model.ClsIncome_Payment.Income_Fiche.Comments) || !this.model.ClsIncome_Payment.Income_Fiche.Comments.includes("خدمات")) {
            this.model.ClsIncome_Payment.Income_Fiche.Comments += " کاربر امور مالی شرکت خدماتی : " + this.getUserDisplayName() + " : تاریخ تایید " + _cd + " - " + _ct
            this.model.ClsIncome_Payment.Income_Payment.UserName = this.getUserDisplayName()
            this.model.ClsIncome_Payment.Income_Payment.NidUser = this.getNidUser()
          }
        }
        this.model.ClsIncome_Payment.Income_Fiche.Comments = this.model.ClsIncome_Payment.Income_Fiche.Comments.replaceAll('null', '')
      }

      let RequestMessage = { ...this.model }
      RequestMessage.ClsIncome_Payment = this.model.ClsIncome_Payment
      RequestMessage.ClsLicense = this.value.ClsLicense
      RequestMessage.IsConfirm = true
      RequestMessage.TaskTitel = this.taskInfo.TaskTitel ?? ""
      RequestMessage.FormName = "UPayment"
      RequestMessage.UserGroups = this.currentUser.UserGroups

      this.showLoading()
      const payload = {
        pRequest: { ...RequestMessage }
      }

      this.$services.excavation
        .saveIncomePayment(payload)
        .then(async ({ data }) => {
          this.saveIncomePaymentRes = this.getResponse(data)
          if (this.saveIncomePaymentRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")
            this.$emit("afterSavePeyment")
            this.$emit("updateEditableMode", false)
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
              const dto = requesterTypeList[0]
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
    assignRequest () {
      // تعیین نحوه پرداخت بر اساس شرکت خدماتی
      if (this.ClsSettingDig.Settings.ConfirmWithRequesterType === true) {
        // بر اساس تغییرات جدید از نوع متقاضی درخواست تشخیص داده می شود
        // const CI_RequesterType = this.selectedRequest?.CI_RequesterType ?? 0
        // Common.ClsCommon.EsupLog("CI_RequesterType= " + CI_RequesterType)
        // if (true) {
        // (CI_RequesterType > 0)
        // Common.ClsCommon.EsupLog("CI_RequesterType= " + CI_RequesterType)
        // خواندن روش پرداخت بر اساس شرکت خدماتی
        this.getClsCIRequesterType()
        // }
      } else {
        // Common.ClsCommon.EsupLog("CI_RequesterType= " + CI_RequesterType)
        const AssignRequesterToUser =
          this.selectedRequest.AssignRequesterToUser ?? []
        if (
          Array.isArray(AssignRequesterToUser) &&
          AssignRequesterToUser.length > 0 &&
          AssignRequesterToUser[0].AccessToPayment
        ) {
          var TmpAllAccess =
            AssignRequesterToUser[0].AccessToPayment.split(",")
          this.showRd_PaymentType.Visibility = !!TmpAllAccess.some(
            (f) => f === "1"
          )
          this.showRd_PaymentType2.Visibility = !!TmpAllAccess.some(
            (f) => f === "2"
          )
          this.showRd_PaymentType3.Visibility = !!TmpAllAccess.some(
            (f) => f === "3"
          )
          this.showRd_PaymentType4.Visibility = !!TmpAllAccess.some(
            (f) => f === "4"
          )
          this.showRd_PaymentType5.Visibility = !!TmpAllAccess.some(
            (f) => f === "5"
          )
          this.showRd_PaymentType6.Visibility = !!TmpAllAccess.some(
            (f) => f === "6"
          )

          this.paymentType = Number(AssignRequesterToUser[0].AccessToPayment)

          if (TmpAllAccess.some((f) => f === "A1")) {
            this.showGroupMaliIsEnabled = false
            this.showGroupShahrdariIsEnabled = true
          }

          if (TmpAllAccess.some((f) => f === "A2")) {
            this.groupMaliIsEnabled = true
            this.groupShahrdariIsEnabled = false
          }
        }
      }
    },
    setPaymentType (val) {
      var type =
        this.model?.ClsIncome_Payment?.Income_Payment?.SysCI_PaymentType || val
      switch (type) {
        case 1:
          this.showPaymentGroup = true
          this.showTavafoghGroup = false
          this.showBankGroup = false
          this.showSazmanGroup = false
          this.showFiMabinGroup = false
          this.Rd_PaymentType = true
          if (
            this.value.ClsIncome_Payment?.Income_Payment.Date === null ||
            this.value.ClsIncome_Payment?.Income_Payment.Date === ""
          ) {
            // Rd_PaymentType.IsEnabled = true;
          }
          break
        case 2:
          this.showPaymentGroup = false
          this.showTavafoghGroup = true
          this.showBankGroup = false
          this.showSazmanGroup = false
          this.showFiMabinGroup = false
          this.Rd_PaymentType2 = true
          if (
            this.value.ClsIncome_Payment.Income_Payment.Date === null ||
            this.value.ClsIncome_Payment.Income_Payment.Date === ""
          ) {
            // Rd_PaymentType2.IsEnabled = true;
          }
          break
        case 3:
          this.showPaymentGroup = false
          this.showTavafoghGroup = false
          this.showBankGroup = true
          this.showSazmanGroup = false
          this.showFiMabinGroup = false
          this.Rd_PaymentType3 = true
          if (
            this.value.ClsIncome_Payment.Income_Payment.Date === null ||
            this.value.ClsIncome_Payment.Income_Payment.Date === ""
          ) {
            // Rd_PaymentType3.IsEnabled = true;
          }
          break
        case 4:
          this.showPaymentGroup = false
          this.showTavafoghGroup = true
          this.showBankGroup = false
          this.showSazmanGroup = false
          this.showFiMabinGroup = false
          this.Rd_PaymentType4 = true
          if (
            this.value.ClsIncome_Payment.Income_Payment.Date === null ||
            this.value.ClsIncome_Payment.Income_Payment.Date === ""
          ) {
            // Rd_PaymentType4.IsEnabled = true;
          }
          break
        case 5:
          this.showPaymentGroup = false
          this.showTavafoghGroup = false
          this.showBankGroup = false
          this.showSazmanGroup = true
          this.showFiMabinGroup = false
          this.Rd_PaymentType5 = true
          if (
            this.value.ClsIncome_Payment.Income_Payment.Date === null ||
            this.value.ClsIncome_Payment.Income_Payment.Date === ""
          ) {
            // Rd_PaymentType5.IsEnabled = true;
          }
          break
        case 6:
          this.showPaymentGroup = false
          this.showTavafoghGroup = false
          this.showBankGroup = false
          this.showSazmanGroup = true
          this.showFiMabinGroup = false
          this.Rd_PaymentType6 = true
          if (
            this.value.ClsIncome_Payment.Income_Payment.Date === null ||
            this.value.ClsIncome_Payment.Income_Payment.Date === ""
          ) {
            // Rd_PaymentType6.IsEnabled = true;
          }
      }
    },

    async loadFormSetting () {
      try {
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "SettingDig",
            defaultValue: this.ClsSettingDig,
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
            // useCache: false,
          }
        )
        this.ClsSettingDig = require("src/utils/mergeSettings").default(
          this.ClsSettingDig,
          settings
        )
      } catch (e) {
        console.error(e)
      }
    }
  },
  watch: {
    paymentType () {
      let pType = this.paymentType
      if (this.paymentType !== null && this.model.ClsIncome_Payment !== null) {
        if (
          this.model.ClsIncome_Payment.Income_Payment.SysCI_PaymentType !==
          pType
        ) {
          this.model.ClsIncome_Payment.Income_Payment.SysCI_PaymentType = pType
          this.setPaymentType(pType)
        }
        this.model.ClsIncome_Payment.Income_Payment.Date = true
        this.model.ClsIncome_Payment.Income_Payment.CompanyDate = true
        this.model.ClsIncome_Payment.Income_Payment.TxtMessageBargh = false

        if (pType === 2) {
          this.model.ClsIncome_Payment.Income_Payment.TxtMessageBargh = true
          this.model.ClsIncome_Payment.Income_Payment.Date = false
          this.model.ClsIncome_Payment.Income_Payment.CompanyDate = false
          this.model.ClsIncome_Payment.Income_Payment.CompanyDate =
            this.ClsSettingDig.Settings.PaymentCompanyDates
          this.model.ClsIncome_Payment.Income_Payment.Date =
            this.ClsSettingDig.Settings.PaymentDates
        } else if (pType === 1) {
          if (
            this.model.ClsIncome_Payment.Income_Payment.CompanyDate === null
          ) {
            this.model.ClsIncome_Payment.Income_Payment.CompanyDate =
              this.ClsSettingDig.Settings.PaymentCompanyDates
          }
        } else {
          this.model.ClsIncome_Payment.Income_Payment.No = ""
          this.model.ClsIncome_Payment.Income_Payment.Date = ""
        }

        if (pType === 4) {
          // TavafoghGroup.GroupHeader = "تعهد پرداخت"
        }
        // else TavafoghGroup.GroupHeader = "توافقنامه"
      }
    }
  }
}
</script>
