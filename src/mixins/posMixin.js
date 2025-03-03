/* eslint-disable no-unused-vars */
import Bmi from "src/utils/pos/bmi"
import Shahr from "src/utils/pos/shahr"
import Mellat from "src/utils/pos/mellat"
import PostBank from "src/utils/pos/postBank"
import Irankish from "src/utils/pos/irankish"
import AsanPardakht from "src/utils/pos/asanPardakht"
import Saman from "src/utils/pos/saman"
import Tejarat from "src/utils/pos/tejarat"
import { currentDate, currentTime } from "src/utils/index"
const ClsCommon = {
  DutySetting: {
    SetPayOffForConfirmYearly: null,
    SetPayOffForConfirmCollective: null,
    SetPayOffForConfirmTaghsit: null,
    IsCanceldFichesInConfirm: null,
    IsShowAccountingSystemError: null
  }
}
const PoseType =
{
  CityBank: 1,
  MelliBank: 2,
  Tejarat: 3,
  Ansar: 4,
  AsanPardakht: 5,
  Mellat: 6,
  SamanKish: 7,
  IranKish: 8,
  PostBank: 9,
  FanAva: 10,
  Saderat: 11
}
export default {
  computed: {
    currentUser () {
      // console.log('this.$stSecurity.getters[\'authorize/loggedUser\']', this.$stSecurity.getters['authorize/loggedUser'])
      return this.$stSecurity.getters['authorize/loggedUser'] || {}
    },
    getBankName () {
      switch (this.model.selectedPose) {
        case 1: // BankShahr
          return "بانک شهر"
        case 2:
          return "بانک ملی"
        case 3:
          return "بانک تجارت"
        case 4:
          return "بانک انصار"
        case 5:
          return "شهر - آسان پرداخت"
        case 6:
          return "بانک ملت"
        case 7:
          return "بانک سامان کیش"
        case 8:
          return "ایران کیش"
        case 9:
          return "پست بانک"
        default:
          break
      }
    },
    selectedNosaziCodeDistrict () {
      return this.$stKartable.getters['selectedDistrict']
    }
  },
  methods: {
    generalIncomeFicheConfirm (
      {
        PaymentBank,
        EumFicheConfirmMethode,
        NidFiche,
        PaymentDate
      }
    ) { // for generalIncome
      this.showLoading()
      this.$services.generalIncome
        .changeStatusOfFiche({
          pNidFiche: NidFiche,
          pFicheStatus: 3, // EumFicheStatus=> تایید,
          pUser: this.currentUser,
          pPaymentBank: PaymentBank,
          pPaymentDate: PaymentDate,
          pFicheConfirmMethode: EumFicheConfirmMethode
        })
        .then(async ({ data }) => {
          this.changeStatusOfFicheResult = this.getResponse(data)
          if (this.changeStatusOfFicheResult.success) {
            this.showSuccess("تایید فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.confirm,
              bizCode: NidFiche,
              bizCodeTitle: "NidFiche"
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
    confirmFicheIncome (
      {
        EumIncomePaymentType,
        EumFicheConfirmMethode,
        NidFiche,
        PaymentBank,
        PaymentDate,
        PaymentRahgiriCode,
        PaymentReferenceNo
      }
    ) { // درآمد
      this.showConfirm("آیا از تأیید فیش  اطمینان دارید؟").onOk(() => {
        this.showLoading()
        let data = {
          pDto: {
            ConfirmTypeDetailes: this.confirmTypeDetailes,
            EumFicheConfirmMethode: EumFicheConfirmMethode,
            EumIncomePaymentType: EumIncomePaymentType,
            NidFiche: NidFiche,
            NidUser: this.getNidUser(),
            PaymentBank: PaymentBank,
            PaymentBranch: this.paymentBranch,
            PaymentDate: PaymentDate,
            PaymentRahgiriCode: PaymentRahgiriCode,
            PaymentReferenceNo: PaymentReferenceNo,
            UserName: this.getUserDisplayName()
          }
        }
        this.$services.SD.ficheConfirm(data, this.config)
          .then(async ({ data }) => {
            this.showConfirmResult = this.getResponse(data)
            if (this.showConfirmResult.success) {
              this.showSuccess("تأیید فیش با موفقیت انجام شد.")
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.nidFiche,
                bizCodeTitle: "NidFiche"
              })
            }
          })
          .catch(response => {
            this.serverError()
          })
          .finally(() => {
            this.hideSending()
          })
      })
    },
    tejaratPos (posSetting, selectedRow, eumDutyType) {
      let payablePrice = selectedRow.PayablePrice || selectedRow.Payable || selectedRow.FicheAmount || selectedRow.Price || selectedRow.Price
      let tmpNidFiche = selectedRow.NidFiche || selectedRow.NIdFiche
      const dialog = this.$q.dialog({
        title: 'دستگاه شرکت تجارت الکترونیک پارسیان',
        message: 'لطفا کارت بکشید'
        // other options
      })
      setTimeout(() => {
        dialog.hide()
      }, 30000) // 1 minute in milliseconds
      Tejarat.sendPaymentRequest({
        TerminalId: posSetting.TerminalId,
        BillID: selectedRow.BillID,
        PaymentId: selectedRow.PaymentID,
        IBN: posSetting.IBN,
        TransactionType: posSetting.TransactionType,
        Amount: payablePrice,
        AdditionalData: "test service" // based on document
      }).then((response) => {
        this.confirmFicheViaPose_Tejarat(response, eumDutyType, payablePrice, tmpNidFiche)
      }).catch((error) => {
        this.showError(error.data.Message)
        console.log('Tejarat sendPaymentRequest error:', error)
      })
    },
    iranKishPos (posSetting, selectedRow, eumDutyType) {
      let payablePrice = selectedRow.PayablePrice || selectedRow.Payable || selectedRow.FicheAmount || selectedRow.Price
      let tmpNidFiche = selectedRow.NidFiche || selectedRow.NIdFiche
      Irankish.iranKishPurchasePayment({
        SerialNo: posSetting.serialNo,
        TerminalId: posSetting.terminal,
        AcceptorId: posSetting.receptive,
        IPAddress: posSetting.poseAddress,
        Port: posSetting.port,
        apiUrl: posSetting.apiUrl,
        payablePrice: payablePrice
      }).then((response) => {
        this.confirmFicheViaIranKishPos(response, eumDutyType, payablePrice, tmpNidFiche)
      })
    },
    samanKishPos (posSetting, selectedRow, eumDutyType) {
      let payablePrice = selectedRow.PayablePrice || selectedRow.Payable || selectedRow.FicheAmount || selectedRow.Price
      let tmpNidFiche = selectedRow.NidFiche || selectedRow.NIdFiche
      if (posSetting.posMethod === 1) {
        const dialog = this.$q.dialog({
          title: 'دستگاه پوز سامان',
          message: 'لطفا کارت بکشید'
          // other options
        })
        setTimeout(() => {
          dialog.hide()
        }, 30000) // 1 minute in milliseconds
      }
      if (posSetting.transactionType === 0) { // خرید
        if (posSetting.posMethod === 1) {
          Saman.SamanKishPurchaseSingle({
            TerminalId: posSetting.terminalNo,
            TotalAmount: payablePrice,
            ServiceAddress: posSetting.serviceAddress
          }).then(({ data }) => {
            this.confirmFicheViaPose_SamanKish(data, eumDutyType, payablePrice, tmpNidFiche)
          }).catch((error) => {
            this.showError(error.data.Message)
            console.log('SamanKishPurchaseSingle error:', error)
          })
        } else {
          Saman.SamanKishPurchaseSSp({
            POSIp: posSetting.iPAddress,
            ServerPort: posSetting.serverPort,
            ServiceAddress: posSetting.serviceAddress
          }).then(({ data }) => {
            this.confirmFicheViaPose_SamanKishSSp(data, eumDutyType, payablePrice, tmpNidFiche)
          }).catch((error) => {
            this.showError(error.data.Message)
            console.log('SamanKishPurchaseSingle error:', error)
          })
        }
      } else {
        let samanPayID = selectedRow.PaymentID.replace(/^0+/, '')
        console.log("samanPayID", samanPayID)
        if (posSetting.posMethod === 1) {
          Saman.SamanKishBillPayment({
            TerminalID: posSetting.terminalNo,
            BillID: selectedRow.BillID,
            PayID: samanPayID,
            ServiceAddress: posSetting.serviceAddress
          }).then(({ data }) => {
            this.confirmFicheViaPose_SamanKish(data, eumDutyType, payablePrice, tmpNidFiche)
          }).catch((error) => {
            this.showError(error.data.Message)
            console.log('SamanKishBillPayment error:', error)
          })
        } else {
          Saman.SamanKishBillPaymentSSp({
            POSIp: posSetting.iPAddress,
            ServerPort: posSetting.serverPort,
            TerminalID: posSetting.terminalNo,
            BillID: selectedRow.BillID,
            PayID: samanPayID,
            ServiceAddress: posSetting.serviceAddress
          }).then(({ data }) => {
            this.confirmFicheViaPose_SamanKishSSp(data, eumDutyType, payablePrice, tmpNidFiche)
          }).catch((error) => {
            this.showError(error.data.Message)
            console.log('SamanKishBillPayment error:', error)
          })
        }
      }
    },
    confirmFicheViaPose_CityAsanPardakht (responseData, eumDutyType, payablePrice, NidFiche) {
      let jsonResponse = JSON.parse(responseData)
      let data = jsonResponse.Data
      if (data !== null) {
        this.showSuccess("فیش مربوطه با موفقیت پرداخت شد, منتظر تایید در سرا می باشد")
        let payload = {
          pGidPoseFicheHistory: this._GIDPoseFicheHistory,
          pMerchantNo: data.merchantId,
          pTerminalNo: data.terminalId,
          pSwitchDate: currentDate(),
          pSwitchTime: currentTime(),
          pTraceNo: data.stan,
          pRefNo: "",
          pCardNo: null,
          pIsSucceed: data.cardNumber.toString(),
          pComment: "با موفقیت پرداخت شد"
        }
        this.$services.SB.updateLogPose(payload, {
          config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
        })
          .then(({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
              if (eumDutyType === 1 || eumDutyType === 2) {
                this.confirmFicheDuty({
                  PNidProc: "00000000-0000-0000-0000-000000000000",
                  pDutyFiche: this.tmpPoseConfirmFiche,
                  PDutyType: eumDutyType,
                  pConfirmBankCode: "0",
                  pPaymentRahgiriCode: data.stan,
                  pPaymentReferenceNo: "",
                  pPaymentDate: "",
                  pBankConfirmPrice:
                    payablePrice !== null
                      ? payablePrice
                      : 0,
                  pEumDutyPaymentType: 2,
                  pEumFicheConfirmMethode: 14,
                  pSetPayOffForConfirmYearly:
                    ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                  pSetPayOffForConfirmCollective:
                    ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                  pSetPayOffForConfirmTaghsit:
                    ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                  pIsCancelOtherFiche:
                    ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                  pIsShowAccountingError:
                    ClsCommon.DutySetting.IsShowAccountingSystemError
                })
              } else if (eumDutyType === 7) {
                this.generalIncomeFicheConfirm({
                  PaymentBank: this.getBankName,
                  EumFicheConfirmMethode: 14,
                  NidFiche: NidFiche,
                  PaymentDate: currentDate()
                })
              } else {
                this.confirmFicheIncome({
                  EumIncomePaymentType: 2,
                  EumFicheConfirmMethode: 14,
                  NidFiche: NidFiche,
                  PaymentBank: this.getBankName,
                  PaymentDate: currentDate(),
                  PaymentRahgiriCode: data.stan,
                  PaymentReferenceNo: ""
                })
              }
            } else {
              let htmlMsg = ""
              res.errors.forEach((error) => {
                htmlMsg += `<li>${error.text}</li>`
              })
              this.showError(htmlMsg)
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },

    confirmFicheViaPose_SamanKish (responseData, eumDutyType, payablePrice, NidFiche) {
      let jsonResponse = responseData
      let data = jsonResponse.Data
      if (jsonResponse.IsSuccess === true && jsonResponse.ErrorCode === 0) {
        if (data !== null) {
          this.showSuccess("فیش مربوطه با موفقیت پرداخت شد, منتظر تایید در سرا می باشد")
          let payload = {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: null,
            pTerminalNo: data.TerminalID,
            pSwitchDate: currentDate(),
            pSwitchTime: currentTime(),
            pTraceNo: data.RefID || data.TraceNumber,
            pRefNo: data.RRN,
            pCardNo: null,
            pIsSucceed: "1",
            pComment: "با موفقیت پرداخت شد"
          }
          this.$services.SB.updateLogPose(payload, {
            config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
          })
            .then(({ data }) => {
              const res = this.getResponse(data)
              if (res.success) {
                this.showSuccess("فیش مربوطه در سرا تایید شد")
                if (eumDutyType === 1 || eumDutyType === 2) {
                  this.confirmFicheDuty({
                    PNidProc: "00000000-0000-0000-0000-000000000000",
                    pDutyFiche: this.tmpPoseConfirmFiche,
                    PDutyType: eumDutyType,
                    pConfirmBankCode: "0",
                    pPaymentRahgiriCode: data.RefID || data.TraceNumber,
                    pPaymentReferenceNo: data.RRN,
                    pPaymentDate: data.CreateOn,
                    pBankConfirmPrice:
                      payablePrice !== null
                        ? payablePrice
                        : 0,
                    pEumDutyPaymentType: 2,
                    pEumFicheConfirmMethode: 14,
                    pSetPayOffForConfirmYearly:
                      ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                    pSetPayOffForConfirmCollective:
                      ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                    pSetPayOffForConfirmTaghsit:
                      ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                    pIsCancelOtherFiche:
                      ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                    pIsShowAccountingError:
                      ClsCommon.DutySetting.IsShowAccountingSystemError
                  })
                }
                else if (eumDutyType === 7) {
                  this.generalIncomeFicheConfirm({
                    PaymentBank: this.getBankName,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentDate: currentDate()
                  })
                } else {
                  this.confirmFicheIncome({
                    EumIncomePaymentType: 2,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentBank: this.getBankName,
                    PaymentDate: currentDate(),
                    PaymentRahgiriCode: data.RefID || data.TraceNumber,
                    PaymentReferenceNo: data.RRN
                  })
                }
              } else {
                let htmlMsg = ""
                res.errors.forEach((error) => {
                  htmlMsg += `<li>${error.text}</li>`
                })
                this.showError(htmlMsg)
              }
            })
            .catch((response) => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      } else {
        let getMsg = ""
        switch (jsonResponse.ErrorCode) {
          case 1:
            getMsg = "کارت کشیده شد"
            break
          case 2:
            getMsg = "مبلغ تراکنش نمی تواند از حداقل مبلغ کمتر باشد"
            break
          case 3:
            getMsg = "عدم ارتباط با دستگاه"
            break
          case 4:
            getMsg = "اطلاعات نامعتبر"
            break
          case 5:
            getMsg = "صفر ریا ل بدهی"
            break
          case 6:
            getMsg = "خطا در دریافت اطلاعات"
            break
          case 7:
            getMsg = "عدم دسترسی به این اطلاعات"
            break
          case 8:
            getMsg = "تراکنش یافت نشد"
            break
          case 9:
            getMsg = "ترمینال نامعتبر"
            break
          case 10:
            getMsg = "خطا در پاسخ"
            break
          case 12:
            getMsg = "ترامنش نامعتبر"
            break
          case (13, 79):
            getMsg = "مبلغ نامعتبر"
            break
          case 14:
            getMsg = "خطا در مقداردهی"
            break
          case 20:
            getMsg = "پاسخ نامعتبر"
            break
          case 26:
            getMsg = "خطا در تراکنش"
            break
          case 27:
            getMsg = "این قبض قبلا پرداخت شده است"
            break
          case 28:
            getMsg = "غیرقابل پرداخت"
            break
          case 30:
            getMsg = "خطا در قالب اطلاعات"
            break
          case 33:
            getMsg = "تاریخ انقضای کارت سپری شده است"
            break
          case (43, 63, 34):
            getMsg = "اخطار امنیتی"
            break
          case 38:
            getMsg = "تعداد دفعات ورود رمز غلط بیش از حدمجاز است"
            break
          case 51:
            getMsg = "موجودی کافی نمی باشد"
            break
          case 55:
            getMsg = "رمز کارت نا معتبر است"
            break
          case 57:
            getMsg = "انجام تراکنش مربوطه توسط دارنده ی کارت مجاز نمی باشد"
            break
          case 58:
            getMsg =
              "انجام تراکنش مربوطه توسط پایانه ی انجام دهنده مجاز نمی باشد"
            break
          case 61:
            getMsg = "مبلغ تراکنش بیش از حد مجاز می باشد"
            break
          case 68:
            getMsg = "عدم دریافت پاسخ در زمان مناسب"
            break
          case (75, 69):
            getMsg = "تعداد دفعات ورود رمزغلط بیش از حدمجاز است"
            break
          case 78:
            getMsg = "کارت غیرفعال میباشد"
            break
          case (91, 84, 80):
            getMsg = "عدم پاسخ از سوی صادرکننده ی کارت"
            break
          case 92:
            getMsg = "مبالغ متفاوت"
            break
          case 96:
            getMsg = "خطای نامشخص"
            break
          case 97:
            getMsg = "عدم ارتباط با مرکز"
            break
          case 98:
            getMsg = "لغو عملیات توسط کاربر"
            break
          case 99:
            getMsg = "عدم دریافت پاسخ در زمان مناسب در کارتخوان"
            break
          default:
            getMsg = "شناسه قبض و پرداخت معتبر نیست"
        }
        this.showError(getMsg)
        let payload = {
          pGidPoseFicheHistory: this._GIDPoseFicheHistory,
          pMerchantNo: "",
          pTerminalNo: "",
          pSwitchDate: "",
          pSwitchTime: "",
          pTraceNo: "",
          pRefNo: "",
          pCardNo: "",
          pIsSucceed: "0",
          pComment: getMsg
        }
        this.$services.SB.updateLogPose(payload, {
          config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
        })
          .then(({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {

            } else {
              let htmlMsg = ""
              res.errors.forEach((error) => {
                htmlMsg += `<li>${error.text}</li>`
              })
              this.showError(htmlMsg)
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    confirmFicheViaPose_SamanKishSSp (responseData, eumDutyType, payablePrice, NidFiche) {
      let data = responseData
      if (data.ResponseCode === "0") {
        if (data !== null) {
          this.showSuccess("فیش مربوطه با موفقیت پرداخت شد, منتظر تایید در سرا می باشد")
          let payload = {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: null,
            pTerminalNo: data.TerminalId,
            pSwitchDate: currentDate(),
            pSwitchTime: currentTime(),
            pTraceNo: data.SerialId,
            pRefNo: data.RRN,
            pCardNo: data.CardNumberMask,
            pIsSucceed: "1",
            pComment: "با موفقیت پرداخت شد"
          }
          this.$services.SB.updateLogPose(payload, {
            config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
          })
            .then(({ data }) => {
              const res = this.getResponse(data)
              if (res.success) {
                this.showSuccess("فیش مربوطه در سرا تایید شد")
                if (eumDutyType === 1 || eumDutyType === 2) {
                  this.confirmFicheDuty({
                    PNidProc: "00000000-0000-0000-0000-000000000000",
                    pDutyFiche: this.tmpPoseConfirmFiche,
                    PDutyType: eumDutyType,
                    pConfirmBankCode: "0",
                    pPaymentRahgiriCode: data.SerialId,
                    pPaymentReferenceNo: data.RRN,
                    pPaymentDate: data.TxnDate,
                    pBankConfirmPrice:
                      payablePrice !== null
                        ? payablePrice
                        : 0,
                    pEumDutyPaymentType: 2,
                    pEumFicheConfirmMethode: 14,
                    pSetPayOffForConfirmYearly:
                      ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                    pSetPayOffForConfirmCollective:
                      ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                    pSetPayOffForConfirmTaghsit:
                      ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                    pIsCancelOtherFiche:
                      ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                    pIsShowAccountingError:
                      ClsCommon.DutySetting.IsShowAccountingSystemError
                  })
                }
                else if (eumDutyType === 7) {
                  this.generalIncomeFicheConfirm({
                    PaymentBank: this.getBankName,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentDate: currentDate()
                  })
                } else {
                  this.confirmFicheIncome({
                    EumIncomePaymentType: 2,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentBank: this.getBankName,
                    PaymentDate: currentDate(),
                    PaymentRahgiriCode: data.SerialId,
                    PaymentReferenceNo: data.RRN
                  })
                }
              } else {
                let htmlMsg = ""
                res.errors.forEach((error) => {
                  htmlMsg += `<li>${error.text}</li>`
                })
                this.showError(htmlMsg)
              }
            })
            .catch((response) => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      } else {
        let message = data?.ResponseDescription || "عملیات ناموفق"
        this.showError(message)
        let payload = {
          pGidPoseFicheHistory: this._GIDPoseFicheHistory,
          pMerchantNo: "",
          pTerminalNo: "",
          pSwitchDate: "",
          pSwitchTime: "",
          pTraceNo: "",
          pRefNo: "",
          pCardNo: "",
          pIsSucceed: "0",
          pComment: message
        }
        this.$services.SB.updateLogPose(payload, {
          config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
        })
          .then(({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {

            } else {
              let htmlMsg = ""
              res.errors.forEach((error) => {
                htmlMsg += `<li>${error.text}</li>`
              })
              this.showError(htmlMsg)
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    extractFromString (text, startString, endString) {
      let matched = []
      let indexStart = 0
      let indexEnd = 0
      let exit = false
      while (!exit) {
        indexStart = text.indexOf(startString)
        indexEnd = text.indexOf(endString)
        if (indexStart !== -1 && indexEnd !== -1) {
          matched.push(
            text.substring(
              indexStart + startString.length,
              indexEnd - indexStart - startString.length
            )
          )
          text = text.substring(indexEnd + endString.length)
        } else exit = true
      }
      return matched
    },
    confirmFicheViaIranKishPos (pParam, eumDutyType, payablePrice, NidFiche) {
      try {
        let tmpRRN = this.extractFromString(pParam, "<RRN>", "</RRN>")
        let tmpRespCode = this.extractFromString(
          pParam,
          "<RespCode>",
          "</RespCode>"
        )
        let tmpPan = this.extractFromString(pParam, "<Pan>", "</Pan>")
        let tmpTransactionDate = this.extractFromString(
          pParam,
          "<TransactionDate>",
          "</TransactionDate>"
        )
        let tmpTransactionTime = this.extractFromString(
          pParam,
          "<TransactionTime>",
          "</TransactionTime>"
        )
        let tmpTerminalId = this.extractFromString(
          pParam,
          "<TerminalId>",
          "</TerminalId>"
        )
        let tmpTraceNo = this.extractFromString(pParam, "<TraceNo>", "</TraceNo>")
        if (tmpRespCode !== null) {
          if (tmpRespCode[0] === "00") {
            let payload = {
              pGidPoseFicheHistory: this._GIDPoseFicheHistory,
              pMerchantNo: "",
              pTerminalNo: tmpTerminalId[0],
              pSwitchDate: tmpTransactionDate[0],
              pSwitchTime: tmpTransactionTime[0],
              pTraceNo: tmpTraceNo[0],
              pRefNo: tmpRRN[0],
              pCardNo: tmpPan[0],
              pIsSucceed: "1",
              pComment: "با موفقیت پرداخت شد"
            }
            this.$services.SB.updateLogPose(payload, {
              config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
            })
              .then(({ data }) => {
                const res = this.getResponse(data)
                if (res.success) {
                  if (eumDutyType === 1 || eumDutyType === 2) {
                    this.confirmFicheDuty({
                      PNidProc: "00000000-0000-0000-0000-000000000000",
                      pDutyFiche: this.tmpPoseConfirmFiche,
                      PDutyType: eumDutyType,
                      pConfirmBankCode: "0",
                      pPaymentRahgiriCode: tmpTraceNo[0],
                      pPaymentReferenceNo: tmpRRN[0],
                      pPaymentDate: "",
                      pBankConfirmPrice:
                        payablePrice !== null
                          ? payablePrice
                          : 0,
                      pEumDutyPaymentType: 2,
                      pEumFicheConfirmMethode: 14,
                      pSetPayOffForConfirmYearly:
                        ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                      pSetPayOffForConfirmCollective:
                        ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                      pSetPayOffForConfirmTaghsit:
                        ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                      pIsCancelOtherFiche:
                        ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                      pIsShowAccountingError:
                        ClsCommon.DutySetting.IsShowAccountingSystemError
                    })
                  }
                  else if (eumDutyType === 7) {
                    this.generalIncomeFicheConfirm({
                      PaymentBank: this.getBankName,
                      EumFicheConfirmMethode: 14,
                      NidFiche: NidFiche,
                      PaymentDate: currentDate()
                    })
                  } else {
                    this.confirmFicheIncome({
                      EumIncomePaymentType: 2,
                      EumFicheConfirmMethode: 14,
                      NidFiche: NidFiche,
                      PaymentBank: this.getBankName,
                      PaymentDate: currentDate(),
                      PaymentReferenceNo: tmpRRN[0]
                    })
                  }
                } else {
                  let htmlMsg = ""
                  res.errors.forEach((error) => {
                    htmlMsg += `<li>${error.text}</li>`
                  })
                  this.showError(htmlMsg)
                }
              })
              .catch((response) => {
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })
          } else {
            this.showError("عدم موفقیت پرداخت")
            let payload = {
              pGidPoseFicheHistory: this._GIDPoseFicheHistory,
              pMerchantNo: "",
              pTerminalNo: "",
              pSwitchDate: "",
              pSwitchTime: "",
              pTraceNo: "",
              pRefNo: "",
              pCardNo: "",
              pIsSucceed: "0",
              pComment: "مشکل در تایید از طریق پوز. کد خطا : " + tmpRespCode[0]
            }
            this.$services.SB.updateLogPose(payload, {
              config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
            })
              .then(({ data }) => {
                const res = this.getResponse(data)
                if (res.success) {
                } else {
                  let htmlMsg = ""
                  res.errors.forEach((error) => {
                    htmlMsg += `<li>${error.text}</li>`
                  })
                  this.showError(htmlMsg)
                }
              })
              .catch((response) => {
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })
          }
        }
      } catch (ex) {
        console.log(ex)
      }
    },
    postBankPos (poseAddress, selectedRow, eumDutyType) {
      let payablePrice = selectedRow.PayablePrice || selectedRow.Payable || selectedRow.FicheAmount || selectedRow.Price
      let tmpNidFiche = selectedRow.NidFiche || selectedRow.NIdFiche
      console.log("poseAddress", poseAddress)
      if (poseAddress.trim() !== "") {
        PostBank.ParsianPosPayment({
          ServiceUrl: poseAddress,
          BillID: selectedRow.BillID,
          PaymentID: selectedRow.PaymentID
        })
          .then((response) => {
            this.confirmFicheViaPose_parsian(response, eumDutyType, payablePrice, tmpNidFiche)
          })
          .catch((error) => {
            console.log(error)
            // this.showError("خطا در ارسال اطلاعات به پوز")
            this.$window.open({
              id: 'PosHelpDialog',
              title: 'خطای پوز',
              width: 850,
              height: 725,
              component: 'PosHelpDialog'
            })
          })
      }
    },
    confirmFicheViaPose_parsian (response, eumDutyType, payablePrice, NidFiche) {
      if (response !== null) {
        let payload = {
          pGidPoseFicheHistory: this._GIDPoseFicheHistory,
          pMerchantNo: response.pMerchantNo,
          pTerminalNo: response.pTerminalNo,
          pSwitchDate: response.pSwitchDate,
          pSwitchTime: response.pSwitchTime,
          pTraceNo: response.pTraceNo,
          pRefNo: response.pRefNo,
          pCardNo: response.pCardNo,
          pIsSucceed: "1",
          pComment: "با موفقیت پرداخت شد"
        }
        this.$services.SB.updateLogPose(payload, {
          config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
        })
          .then(({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
              if (eumDutyType === 1 || eumDutyType === 2) {
                this.confirmFicheDuty({
                  PNidProc: "00000000-0000-0000-0000-000000000000",
                  pDutyFiche: this.tmpPoseConfirmFiche,
                  PDutyType: eumDutyType,
                  pConfirmBankCode: "0",
                  pPaymentRahgiriCode: response.pTraceNo,
                  pPaymentReferenceNo: response.pRefNo,
                  pPaymentDate: "",
                  pBankConfirmPrice:
                    payablePrice !== null
                      ? payablePrice
                      : 0,
                  pEumDutyPaymentType: 2,
                  pEumFicheConfirmMethode: 14,
                  pSetPayOffForConfirmYearly:
                    ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                  pSetPayOffForConfirmCollective:
                    ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                  pSetPayOffForConfirmTaghsit:
                    ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                  pIsCancelOtherFiche:
                    ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                  pIsShowAccountingError:
                    ClsCommon.DutySetting.IsShowAccountingSystemError
                })
              }
              else if (eumDutyType === 7) {
                this.generalIncomeFicheConfirm({
                  PaymentBank: this.getBankName,
                  EumFicheConfirmMethode: 14,
                  NidFiche: NidFiche,
                  PaymentDate: currentDate()
                })
              } else {
                this.confirmFicheIncome({
                  EumIncomePaymentType: 2,
                  EumFicheConfirmMethode: 14,
                  NidFiche: NidFiche,
                  PaymentBank: this.getBankName,
                  PaymentDate: currentDate(),
                  PaymentReferenceNo: response.pRefNo
                })
              }
            } else {
              let htmlMsg = ""
              res.errors.forEach((error) => {
                htmlMsg += `<li>${error.text}</li>`
              })
              this.showError(htmlMsg)
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },

    shahrBankPos (posSetting, selectedRow, eumDutyType, taskInfo = null, formName = null) {
      let payablePrice = selectedRow.PayablePrice || selectedRow.Payable || selectedRow.FicheAmount || selectedRow.Price
      let tmpNidFiche = selectedRow.NidFiche || selectedRow.NIdFiche
      let ficheNo = selectedRow.FicheNo

      if (posSetting.isS380 === "ingenico") {
        Shahr.doPCPOS({
          deviceIp: posSetting.ip,
          amount: payablePrice
        })
          .then((response) => {
            if (eumDutyType === 6) {
              let xmlDoc = response.data
              let poseFicheHistory = {
                NidFiche: tmpNidFiche,
                IsSucceed: 1,
                EumPoseType: PoseType.CityBank,
                NidUser: this.getNidUser(),
                UserName: this.getUserDisplayName(),
                Terminal: xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0] && xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0].nodeValue,
                MerchantNo: xmlDoc.getElementsByTagName("id")[0].childNodes[0] && xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue,
                RefNo: xmlDoc.getElementsByTagName("rrn")[0].childNodes[0] && xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue,
                PoseDate: currentDate(),
                PoseTime: xmlDoc.getElementsByTagName("datetime")[0].childNodes[0] && xmlDoc.getElementsByTagName("datetime")[0].childNodes[0].nodeValue,
                PaymentDate: currentDate(),
                PaymentTime: currentTime(),
                PAN: xmlDoc.getElementsByTagName("pan")[0].childNodes[0] && xmlDoc.getElementsByTagName("pan")[0].childNodes[0].nodeValue,
                RahgiriNo: xmlDoc.getElementsByTagName("rrn")[0].childNodes[0] && xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue,
                PaymentFicheNo: ficheNo
              }
              let taskTitel = taskInfo?.TaskTitel ?? ""
              response.ResponseCode = xmlDoc.getElementsByTagName("rescode")[0].childNodes[0] && xmlDoc.getElementsByTagName("rescode")[0].childNodes[0].nodeValue
              response.success = xmlDoc.getElementsByTagName("success")[0].childNodes[0] && xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue
              response.errorcode = xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0] && xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0].nodeValue
              this.confirmFicheViaPoseForDig({ response, NidFiche: tmpNidFiche, poseFicheHistory: poseFicheHistory, taskTitel, formName })
            } else {
              this.confirmFicheViaPose_shahrBank(response, eumDutyType, payablePrice, tmpNidFiche)
            }
          })
          .catch((error) => {
            console.log(error)
            // this.showError("خطا در ارسال اطلاعات به پوز")
            this.$window.open({
              id: 'PosHelpDialog',
              title: 'خطای پوز',
              width: 850,
              height: 725,
              component: 'PosHelpDialog'
            })
          })
      } else if (posSetting.isS380 === "isS380") {
        let tmpPort = ""
        let tmpMode = ""
        if (posSetting.fichePayment === "payment") {
          // Bill
          if (posSetting.portSerial === "serial") {
            tmpPort = "COM" + posSetting.port
            tmpMode = "serial"
          } else if (posSetting.fichePayment === "lan") {
            tmpPort = posSetting.ip
            tmpMode = "ip"
          }
          Shahr.billPayment({
            deviceIp: posSetting.ip,
            BillID: selectedRow.BillID,
            PayID: selectedRow.PaymentID
          })
            .then((response) => {
              if (eumDutyType === 6) {
                let xmlDoc = response.data
                let poseFicheHistory = {
                  NidFiche: tmpNidFiche,
                  IsSucceed: 1,
                  EumPoseType: PoseType.CityBank,
                  NidUser: this.getNidUser(),
                  UserName: this.getUserDisplayName(),
                  Terminal: xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0] && xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0].nodeValue,
                  MerchantNo: xmlDoc.getElementsByTagName("id")[0].childNodes[0] && xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue,
                  RefNo: xmlDoc.getElementsByTagName("rrn")[0].childNodes[0] && xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue,
                  PoseDate: currentDate(),
                  PoseTime: xmlDoc.getElementsByTagName("datetime")[0].childNodes[0] && xmlDoc.getElementsByTagName("datetime")[0].childNodes[0].nodeValue,
                  PaymentDate: currentDate(),
                  PaymentTime: currentTime(),
                  PAN: xmlDoc.getElementsByTagName("pan")[0].childNodes[0] && xmlDoc.getElementsByTagName("pan")[0].childNodes[0].nodeValue,
                  RahgiriNo: xmlDoc.getElementsByTagName("rrn")[0].childNodes[0] && xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue,
                  PaymentFicheNo: ficheNo
                }
                let taskTitel = taskInfo?.TaskTitel ?? ""
                response.ResponseCode = xmlDoc.getElementsByTagName("rescode")[0].childNodes[0] && xmlDoc.getElementsByTagName("rescode")[0].childNodes[0].nodeValue
                response.success = xmlDoc.getElementsByTagName("success")[0].childNodes[0] && xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue
                response.errorcode = xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0] && xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0].nodeValue

                this.confirmFicheViaPoseForDig({ response, NidFiche: tmpNidFiche, poseFicheHistory: poseFicheHistory, taskTitel, formName })
              } else {
                this.confirmFicheViaPose_PAX_shahrBank(response, eumDutyType, payablePrice, tmpNidFiche)
              }
            })
            .catch((error) => {
              console.log(error)
              // this.showError("خطا در ارسال اطلاعات به پوز")
              this.$window.open({
                id: 'PosHelpDialog',
                title: 'خطای پوز',
                width: 850,
                height: 725,
                component: 'PosHelpDialog'
              })
            })
        } else if (posSetting.fichePayment === "purchase") {
          let tmpPort = ""
          let tmpMode = ""
          if (posSetting.portSerial === "serial") {
            tmpPort = "COM" + posSetting.port
            tmpMode = "serial"
          } else if (posSetting.fichePayment === "lan") {
            tmpPort = posSetting.ip
            tmpMode = "ip"
          }
          let tmpAmount = payablePrice
          Shahr.doPCPOS({
            deviceIp: posSetting.ip,
            amount: tmpAmount
          })
            .then((response) => {
              if (eumDutyType === 6) {
                let xmlDoc = response.data
                let poseFicheHistory = {
                  NidFiche: tmpNidFiche,
                  IsSucceed: 1,
                  EumPoseType: PoseType.CityBank,
                  NidUser: this.getNidUser(),
                  UserName: this.getUserDisplayName(),
                  Terminal: xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0] && xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0].nodeValue,
                  MerchantNo: xmlDoc.getElementsByTagName("id")[0].childNodes[0] && xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue,
                  RefNo: xmlDoc.getElementsByTagName("rrn")[0].childNodes[0] && xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue,
                  PoseDate: currentDate(),
                  PoseTime: xmlDoc.getElementsByTagName("datetime")[0].childNodes[0] && xmlDoc.getElementsByTagName("datetime")[0].childNodes[0].nodeValue,
                  PaymentDate: currentDate(),
                  PaymentTime: currentTime(),
                  PAN: xmlDoc.getElementsByTagName("pan")[0].childNodes[0] && xmlDoc.getElementsByTagName("pan")[0].childNodes[0].nodeValue,
                  RahgiriNo: xmlDoc.getElementsByTagName("rrn")[0].childNodes[0] && xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue,
                  PaymentFicheNo: ficheNo
                }
                let taskTitel = taskInfo?.TaskTitel ?? ""
                response.ResponseCode = xmlDoc.getElementsByTagName("rescode")[0].childNodes[0] && xmlDoc.getElementsByTagName("rescode")[0].childNodes[0].nodeValue
                response.success = xmlDoc.getElementsByTagName("success")[0].childNodes[0] && xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue
                response.errorcode = xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0] && xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0].nodeValue
                this.confirmFicheViaPoseForDig({ response, NidFiche: tmpNidFiche, poseFicheHistory: poseFicheHistory, taskTitel, formName })
              } else {
                this.confirmFicheViaPose_PAX_shahrBank(response, eumDutyType, payablePrice, tmpNidFiche)
              }
            })
            .catch((error) => {
              console.log(error)
              // this.showError("خطا در ارسال اطلاعات به پوز")
              this.$window.open({
                id: 'PosHelpDialog',
                title: 'خطای پوز',
                width: 850,
                height: 725,
                component: 'PosHelpDialog'
              })
            })
        }
      }
    },
    melatPos (serviceAddress, fichePayment, depositId, eumDutyType, selectedRow) {
      let payablePrice = selectedRow.PayablePrice || selectedRow.Payable || selectedRow.FicheAmount || selectedRow.Price
      let tmpNidFiche = selectedRow.NidFiche || selectedRow.NIdFiche
      if (serviceAddress.trim() !== "") {
        if (fichePayment === "bill") {
          Mellat.loadMellatPOSBill({
            AddressUrl: serviceAddress,
            Amount: payablePrice,
            PayerId: selectedRow.PaymentID,
            BillID: selectedRow.BillID
          })
            .then((response) => {
              this.confirmFicheVisMellatPos(response, eumDutyType, payablePrice, tmpNidFiche)
            })
            .catch((error) => {
              console.log(error)
              // this.showError("خطا در ارسال اطلاعات به پوز")
              this.$window.open({
                id: 'PosHelpDialog',
                title: 'خطای پوز',
                width: 850,
                height: 725,
                component: 'PosHelpDialog'
              })
            })
        } else {
          Mellat.loadMellatPOSPurchase({
            AddressUrl: serviceAddress,
            Amount: payablePrice,
            PayerId: selectedRow.PaymentID
          })
            .then((response) => {
              this.confirmFicheVisMellatPos(response, eumDutyType, payablePrice, tmpNidFiche)
            })
            .catch((error) => {
              console.log(error)
              // this.showError("خطا در ارسال اطلاعات به پوز")
              this.$window.open({
                id: 'PosHelpDialog',
                title: 'خطای پوز',
                width: 850,
                height: 725,
                component: 'PosHelpDialog'
              })
            })
        }
      }
    },
    asanPardakhtPose (posSetting, selectedRow, eumDutyType) {
      let payablePrice = selectedRow.PayablePrice || selectedRow.Payable || selectedRow.FicheAmount || selectedRow.Price
      let tmpNidFiche = selectedRow.NidFiche || selectedRow.NIdFiche
      AsanPardakht.LoadAsanPardakhtPose({
        ComPort: posSetting.port,
        IpPose: posSetting.IP,
        PayablePrice: payablePrice,
        BillID: selectedRow.BillID,
        PaymentID: selectedRow.PaymentID,
        TomcatService: posSetting.serverAddress,
        EumPaymentType: posSetting.purchase !== 0 ? 0 : 1,
        FicheNo: selectedRow.FicheNo
      }).then(({ data }) => {
        this.confirmFicheViaPose_CityAsanPardakht(data, eumDutyType, payablePrice, tmpNidFiche)
      })
    },
    melliPos (url, ip, port, selectedRow, fichePayment, eumDutyType, merchantId = null, terminalId = null, taskInfo = null, formName = null) {
      let payablePrice = selectedRow.PayablePrice || selectedRow.Payable || selectedRow.FicheAmount || selectedRow.Price || selectedRow.Price

      let tmpNidFiche = selectedRow.NidFiche || selectedRow.NIdFiche
      let ficheNo = selectedRow.FicheNo
      if (fichePayment === "payment") {
        Bmi.billPayment({
          ServiceUrl: url,
          DeviceIp: ip,
          DevicePort: port,
          BillId: selectedRow.BillID,
          PayId: selectedRow.PaymentID
        })
          .then(({ data }) => {
            if (eumDutyType === 6) {
              let poseFicheHistory = {
                NidFiche: tmpNidFiche,
                IsSucceed: 1,
                EumPoseType: PoseType.MelliBank,
                NidUser: this.getNidUser(),
                UserName: this.getUserDisplayName(),
                Terminal: data.TerminalId,
                MerchantNo: data.MerchantId,
                RefNo: data.Rrn,
                PoseDate: data.TransactionDate,
                PoseTime: data.TransactionTime,
                PaymentDate: currentDate(),
                PaymentTime: currentTime(),
                PAN: data.CardNo,
                RahgiriNo: data.Rrn,
                PaymentFicheNo: ficheNo
              }
              let taskTitel = taskInfo?.TaskTitel ?? ""
              this.confirmFicheViaPoseForDig({ response: data, NidFiche: tmpNidFiche, poseFicheHistory: poseFicheHistory, taskTitel, formName })
            } else {
              this.confirmBillPayment_MelliBank(data, eumDutyType, payablePrice, tmpNidFiche)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else if (fichePayment === "purchase") {
        Bmi.paymentPurchase({
          DeviceIp: ip,
          DevicePort: port,
          Amount: payablePrice,
          ServiceUrl: url,
          MerchantId: merchantId,
          TerminalId: terminalId
        })
          .then(({ data }) => {
            if (eumDutyType === 6) {
              let poseFicheHistory = {
                NidFiche: tmpNidFiche,
                IsSucceed: 1,
                EumPoseType: PoseType.MelliBank,
                NidUser: this.getNidUser(),
                UserName: this.getUserDisplayName(),
                Terminal: data.TerminalId,
                MerchantNo: data.MerchantId,
                RefNo: data.Rrn,
                PoseDate: data.TransactionDate,
                PoseTime: data.TransactionTime,
                PaymentDate: currentDate(),
                PaymentTime: currentTime(),
                PAN: data.CardNo,
                RahgiriNo: data.Rrn,
                PaymentFicheNo: ficheNo
              }
              let taskTitel = taskInfo?.TaskTitel ?? ""
              this.confirmFicheViaPoseForDig({ response: data, NidFiche: tmpNidFiche, poseFicheHistory: poseFicheHistory, taskTitel, formName })
            } else {
              this.confirmFicheViaPose_Melli(data, eumDutyType, payablePrice, tmpNidFiche)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.showError("قابلیت خرید فعال نمی باشد")
      }
    },

    confirmFicheViaPoseForDig ({ response, NidFiche, poseFicheHistory, formName, taskTitel }) {
      let successfulpayment = false
      if (poseFicheHistory.EumPoseType === PoseType.MelliBank && response.ResponseCode === "00" && response.PcPosStatusCode === 4) {
        successfulpayment = true
      } else if (poseFicheHistory.EumPoseType === PoseType.CityBank && response.ResponseCode === "00")
      { successfulpayment = true }
      else {
        successfulpayment = false
      }
      if (successfulpayment) {
        try {
          this.showSuccess(
            "فیش مربوطه با موفقیت پرداخت شد, منتظر تایید در سیستم حفاری می باشد"
          )
          this.showLoading()
          this.$services.excavation
            .getIncomePayment({ pRequest: { NIdFiche: NidFiche } })
            .then(async ({ data }) => {
              let incomePaymentRes = this.getResponse(data)
              if (incomePaymentRes.success) {
                this.log({
                  action: this.logActions.view,
                  bizCode: this.selectedRequest.NidProc,
                  bizCodeTitle: "NidProc",
                  nosaziCode: this.selectedRequest.BizCode,
                  nidWorkItem: this.selectedRequest.NidWorkItem,
                  saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم تایید پرداخت فیش نمایش داده شد.`
                })
                let context = {
                  ClsIncome_Payment: null
                }
                context.ClsIncome_Payment = incomePaymentRes.data.GetIncome_PaymentResult.ClsIncome_Payment
                context.ClsIncome_Payment.Income_Payment.SysCI_PaymentType = 7
                context.ClsIncome_Payment.PoseFicheHistory = poseFicheHistory
                let requestMessage = {}
                requestMessage.ClsIncome_Payment = context.ClsIncome_Payment
                requestMessage.ClsLicense = context.ClsLicense
                requestMessage.TaskTitel = taskTitel
                requestMessage.FormName = formName
                requestMessage.UserGroups = this.currentUser.UserGroups
                this.showLoading()
                this.$services.excavation
                  .saveIncomePayment({ pRequest: requestMessage })
                  .then(async ({ data }) => {
                    let saveIncomePaymentRes = this.getResponse(data)
                    if (saveIncomePaymentRes.success) {
                      this.showSuccess("فیش انتخاب شده با موفقیت از طریق دستگاه پوز تایید شد.")
                      this.log({
                        action: this.logActions.save,
                        bizCode: this.selectedRequest.NidProc,
                        bizCodeTitle: "NidProc",
                        nosaziCode: this.selectedRequest.BizCode,
                        nidWorkItem: this.selectedRequest.NidWorkItem,
                        saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} ذخیره شد.`
                      })
                      this.$emit('reload')
                    }
                  })
                  .catch((e) => {
                    console.error(e)
                    this.serverError()
                  })
                  .finally(() => {
                    this.hideLoading()
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
        } catch (error) { }
      } else if (poseFicheHistory.EumPoseType === PoseType.MelliBank) {
        this.showMelliSwitchError(response, true)
      } else if (poseFicheHistory.EumPoseType === PoseType.CityBank) {
        if (response.success === "yes") {
          this.showShahrSwitchError(response, true)
        } else {
          this.showErrorCodeError(response.errorcode, true)
        }
      } else {
        this.showError("خطای پوز")
      }
    },
    confirmBillPayment_MelliBank (response, eumDutyType, payablePrice, NidFiche) {
      console.log("confirmBillPayment_MelliBank CallBack", response)
      this.showLoading()
      if (response.ResponseCode === "00" && response.PcPosStatusCode === 4) {
        try {
          this.showSuccess(
            "فیش مربوطه با موفقیت پرداخت شد, منتظر تایید در سرا می باشد"
          )
          let data = {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: response.MerchantId,
            pTerminalNo: response.TerminalId,
            pSwitchDate: response.TransactionDate,
            pSwitchTime: response.TransactionTime,
            pTraceNo: response.TransactionNo,
            pRefNo: response.Rrn,
            pCardNo: response.CardNo,
            pIsSucceed: "1",
            pComment: "با موفقیت پرداخت شد"
          }
          this.$services.SB.updateLogPose(data, {
            config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
          })
            .then(({ data }) => {
              const res = this.getResponse(data)
              if (res.success) {
                if (
                  parseFloat(response.Amount) !==
                  payablePrice
                ) {
                  this.showError(
                    "قیمت فیش تایید شده با قیمت فیش انتخاب شده شده برابر نمی باشد"
                  )
                  return
                }
                if (eumDutyType === 1 || eumDutyType === 2) {
                  this.confirmFicheDuty({
                    PNidProc: "00000000-0000-0000-0000-000000000000",
                    pDutyFiche: this.tmpPoseConfirmFiche,
                    PDutyType: eumDutyType,
                    pConfirmBankCode: "0",
                    pPaymentRahgiriCode: response.TransactionNo,
                    pPaymentReferenceNo: response.Rrn,
                    pPaymentDate: response.TransactionDate,
                    pBankConfirmPrice:
                      payablePrice !== null
                        ? payablePrice
                        : 0,
                    pEumDutyPaymentType: 2,
                    pEumFicheConfirmMethode: 14,
                    pSetPayOffForConfirmYearly:
                      ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                    pSetPayOffForConfirmCollective:
                      ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                    pSetPayOffForConfirmTaghsit:
                      ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                    pIsCancelOtherFiche:
                      ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                    pIsShowAccountingError:
                      ClsCommon.DutySetting.IsShowAccountingSystemError
                  })
                }
                else if (eumDutyType === 7) {
                  this.generalIncomeFicheConfirm({
                    PaymentBank: this.getBankName,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentDate: currentDate()
                  })
                } else {
                  this.confirmFicheIncome({
                    EumIncomePaymentType: 2,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentBank: this.getBankName,
                    PaymentDate: currentDate(),
                    PaymentRahgiriCode: response.TransactionNo,
                    PaymentReferenceNo: response.Rrn
                  })
                }
              } else {
                let htmlMsg = ""
                res.errors.forEach((error) => {
                  htmlMsg += `<li>${error.text}</li>`
                })
                this.showError(htmlMsg)
              }
            })
            .catch((response) => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        } catch (error) { }
      } else {
        this.showMelliSwitchError(response)
      }
    },
    showMelliSwitchError (jsonResponse, isHafariErorr = false) {
      let tmpMessage = ''
      if (jsonResponse.ResponseCode !== '') {
        switch (jsonResponse.ResponseCode) {
          case "3":
            tmpMessage = "پذیرنده نامعتبر"
            break
          case "5":
            tmpMessage = "صرف نظر از تراکنش"
            break
          case "6":
            tmpMessage = "خطا در شروع به کار"
            break
          case "7":
            tmpMessage = "شماره تایید موجود نیست"
            break
          case "12":
            tmpMessage = "تراکنش مردود شد"
            break
          case "13":
            tmpMessage = "مبلغ اشتباه"
            break
          case "14":
            tmpMessage = "کارت ناشناخته"
            break
          case "15":
            tmpMessage = "قبلا باز شده"
            break
          case "16":
            tmpMessage = "قبلا بسته شده"
            break
          case "19":
            tmpMessage = "دوباره سعی کنید"
            break
          case "20":
            tmpMessage = "قبض مورد تایید نیست"
            break
          case "21":
            tmpMessage = "محدودیت زمان کاری"
            break
          case "24":
            tmpMessage = "عملیات پایان روز"
            break
          case "25":
            tmpMessage = "سریال پایانه نامعتبر"
            break
          case "29":
            tmpMessage = "عملیات پایان روز"
            break
          case "30":
            tmpMessage = "فرمت اشتباه"
            break
          case "31":
            tmpMessage = "عدم پذیرش صادرکننده"
            break
          case "32":
            tmpMessage = "پایانه غیرفعال"
            break
          case "33":
            tmpMessage = "کارت منقضی"
            break
          case "34":
            tmpMessage = "تراکنش اصلی ناموفق"
            break
          case "38":
            tmpMessage = "رمز غلط بیش از حد"
            break
          case "41":
            tmpMessage = "کارت مفقودی"
            break
          case "43":
            tmpMessage = "کارت دزدی"
            break
          case "44":
            tmpMessage = "شارژ موجود نیست"
            break
          case "47":
            tmpMessage = "زمان منقضی شده"
            break
          case "48":
            tmpMessage = "قبلا انجام شده"
            break
          case "51":
            tmpMessage = "موجودی ناکافی"
            break
          case "54":
            tmpMessage = "کارت منقضی"
            break
          case "55":
            tmpMessage = "رمز اشتباه"
            break
          case "56":
            tmpMessage = "کارت اشتباه"
            break
          case "57":
            tmpMessage = "عملیات نامعتبر"
            break
          case "58":
            tmpMessage = "عملیات نامعتبر"
            break
          case "60":
            tmpMessage = "لیست سیاه آماده نیست"
            break
          case "61":
            tmpMessage = "محدودیت مبلغ"
            break
          case "62":
            tmpMessage = "محدودیت مبلغ"
            break
          case "63":
            tmpMessage = "مک اشتباه"
            break
          case "64":
            tmpMessage = "تراکنش اشتباه"
            break
          case "65":
            tmpMessage = "تعداد بیش از حد"
            break
          case "66":
            tmpMessage = "حساب مسدود"
            break
          case "68":
            tmpMessage = "موجودی اشتباه"
            break
          case "70":
            tmpMessage = "تراکنش اشتباه"
            break
          case "71":
            tmpMessage = "تراکنش اشتباه"
            break
          case "75":
            tmpMessage = "رمز اشتباه بیش از حد"
            break
          case "77":
            tmpMessage = "روز مالی اشتباه"
            break
          case "78":
            tmpMessage = "کارت فعال نیست"
            break
          case "79":
            tmpMessage = "حساب تعریف نشده"
            break
          case "80":
            tmpMessage = "تراکنش ناموفق"
            break
          case "81":
            tmpMessage = "کارت باطل شده"
            break
          case "83":
            tmpMessage = "مرکز آماده نیست"
            break
          case "84":
            tmpMessage = "مرکز آماده نیست"
            break
          case "85":
            tmpMessage = "خطای داخلی"
            break
          case "86":
            tmpMessage = "پایانه نامعتبر"
            break
          case "87":
            tmpMessage = "خطای رمز"
            break
          case "88":
            tmpMessage = "خطای داخلی"
            break
          case "89":
            tmpMessage = "خطای داخلی"
            break
          case "90":
            tmpMessage = "عملیات پایان روز"
            break
          case "91":
            tmpMessage = "صادرکننده غیرفعال"
            break
          case "92":
            tmpMessage = "بانک صادرکننده نامعتبر"
            break
          case "93":
            tmpMessage = "صف پر شده"
            break
          case "94":
            tmpMessage = "تراکنش تکراری"
            break
          case "96":
            tmpMessage = "خطای مرکزی"
            break
          case "97":
            tmpMessage = "شروع به کار نشده"
            break
          case "384":
            tmpMessage = "داده های ورودی نامعتبر"
            break
          default:
            tmpMessage = "خطای ناشناخته"
        }
      } else {
        switch (jsonResponse.PcPosStatusCode) {
          case 0:
            tmpMessage = "پاسخی دریافت نشد"
            break
          case 1:
            tmpMessage = "خطای حداکثر دفعات تکرار"
            break
          case 3:
            tmpMessage = "لغو تراکنش توسط کاربر پوز"
            break
          case 2:
            tmpMessage = "لغو تراکنش توسط پی سی پوز"
            break
          case 5:
            tmpMessage = "خطای داخلی"
            break
          case 6:
            tmpMessage = "خطای درخواست همزمان"
            break
          default:
            tmpMessage = "خطای ناشناخته"
        }
      }
      this.showError(tmpMessage)
      if (isHafariErorr === false) {
        let payload = {
          pGidPoseFicheHistory: this._GIDPoseFicheHistory,
          pMerchantNo: "",
          pTerminalNo: "",
          pSwitchDate: "",
          pSwitchTime: "",
          pTraceNo: "",
          pRefNo: "",
          pCardNo: "",
          pIsSucceed: "0",
          pComment: "مشکل در تایید از طریق پوز. کد خطا : " + (jsonResponse.ResponseCode === '' ? jsonResponse.PcPosStatusCode : jsonResponse.ResponseCode)
        }
        this.$services.SB.updateLogPose(payload, {
          config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
        })
          .then(({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
            } else {
              let htmlMsg = ""
              res.errors.forEach((error) => {
                htmlMsg += `<li>${error.text}</li>`
              })
              this.showError(htmlMsg)
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    confirmFicheViaPose_PAX_shahrBank (response, eumDutyType, payablePrice, NidFiche) {
      try {
        const xmlDoc = response.data
        console.log('POS Response:', xmlDoc)
        let terminalid = xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0] && xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0].nodeValue
        let respid = xmlDoc.getElementsByTagName("respid")[0].childNodes[0] && xmlDoc.getElementsByTagName("respid")[0].childNodes[0].nodeValue
        let errorcode = xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0] && xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0].nodeValue
        let warncode = xmlDoc.getElementsByTagName("warncode")[0].childNodes[0] && xmlDoc.getElementsByTagName("warncode")[0].childNodes[0].nodeValue
        let merchantid = xmlDoc.getElementsByTagName("id")[0].childNodes[0] && xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue
        let merchantname = xmlDoc.getElementsByTagName("name")[0].childNodes[0] && xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue
        let serialnumber = xmlDoc.getElementsByTagName("serialnumber")[0].childNodes[0] && xmlDoc.getElementsByTagName("serialnumber")[0].childNodes[0].nodeValue
        let rescode = xmlDoc.getElementsByTagName("rescode")[0].childNodes[0] && xmlDoc.getElementsByTagName("rescode")[0].childNodes[0].nodeValue
        let amount = xmlDoc.getElementsByTagName("amount")[0].childNodes[0] && xmlDoc.getElementsByTagName("amount")[0].childNodes[0].nodeValue
        let stan = xmlDoc.getElementsByTagName("stan")[0].childNodes[0] && xmlDoc.getElementsByTagName("stan")[0].childNodes[0].nodeValue
        let datetime = xmlDoc.getElementsByTagName("datetime")[0].childNodes[0] && xmlDoc.getElementsByTagName("datetime")[0].childNodes[0].nodeValue
        let rrn = xmlDoc.getElementsByTagName("rrn")[0].childNodes[0] && xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue
        let pan = xmlDoc.getElementsByTagName("pan")[0].childNodes[0] && xmlDoc.getElementsByTagName("pan")[0].childNodes[0].nodeValue
        let success = xmlDoc.getElementsByTagName("success")[0].childNodes[0] && xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue
        console.log('POS rescode:', rescode)
        if (rescode === "00") {
          this.showSuccess(
            "فیش مربوطه با موفقیت پرداخت شد, منتظر تایید در سرا می باشد"
          )
          let payload = {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: merchantid,
            pTerminalNo: terminalid,
            pSwitchDate: datetime,
            pSwitchTime: currentTime(),
            pTraceNo: stan,
            pRefNo: rrn,
            pCardNo: pan,
            pIsSucceed: "1",
            pComment: "با موفقیت پرداخت شد"
          }
          console.log("confirmFicheViaPose_PAX_shahrBank payload", payload)

          this.$services.SB.updateLogPose(payload, {
            config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
          })
            .then(({ data }) => {
              const res = this.getResponse(data)
              if (res.success) {
                if (
                  parseFloat(amount) !==
                  payablePrice
                ) {
                  this.showError(
                    "قیمت فیش تایید شده با قیمت فیش انتخاب شده شده برابر نمی باشد"
                  )
                  return
                }
                if (eumDutyType === 1 || eumDutyType === 2) {
                  this.confirmFicheDuty({
                    PNidProc: "00000000-0000-0000-0000-000000000000",
                    pDutyFiche: this.tmpPoseConfirmFiche,
                    PDutyType: eumDutyType,
                    pConfirmBankCode: "0",
                    pPaymentRahgiriCode: stan,
                    pPaymentReferenceNo: rrn,
                    pPaymentDate: "",
                    pBankConfirmPrice: payablePrice !== null ? payablePrice : 0,
                    pEumDutyPaymentType: 2,
                    pEumFicheConfirmMethode: 14,
                    pSetPayOffForConfirmYearly:
                      ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                    pSetPayOffForConfirmCollective:
                      ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                    pSetPayOffForConfirmTaghsit:
                      ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                    pIsCancelOtherFiche:
                      ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                    pIsShowAccountingError:
                      ClsCommon.DutySetting.IsShowAccountingSystemError
                  })
                }
                else if (eumDutyType === 7) {
                  this.generalIncomeFicheConfirm({
                    PaymentBank: this.getBankName,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentDate: currentDate()
                  })
                } else {
                  this.confirmFicheIncome({
                    EumIncomePaymentType: 2,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentBank: this.getBankName,
                    PaymentDate: currentDate(),
                    PaymentRahgiriCode: stan,
                    PaymentReferenceNo: rrn
                  })
                }
              } else {
                let htmlMsg = ""
                res.errors.forEach((error) => {
                  htmlMsg += `<li>${error.text}</li>`
                })
                this.showError(htmlMsg)
              }
            })
            .catch((response) => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        } else {
          if (success === "yes") {
            this.showShahrSwitchError(rescode)
          } else {
            this.showErrorCodeError(errorcode)
          }
        }
      } catch (error) { }
    },
    confirmFicheViaPose_shahrBank (response, eumDutyType, payablePrice, NidFiche) {
      const xmlDoc = response.data
      console.log('POS Response:', xmlDoc)
      let terminalid = xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0] && xmlDoc.getElementsByTagName("terminalid")[0].childNodes[0].nodeValue
      let respid = xmlDoc.getElementsByTagName("respid")[0].childNodes[0] && xmlDoc.getElementsByTagName("respid")[0].childNodes[0].nodeValue
      let errorcode = xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0] && xmlDoc.getElementsByTagName("errorcode")[0].childNodes[0].nodeValue
      let warncode = xmlDoc.getElementsByTagName("warncode")[0].childNodes[0] && xmlDoc.getElementsByTagName("warncode")[0].childNodes[0].nodeValue
      let merchantid = xmlDoc.getElementsByTagName("id")[0].childNodes[0] && xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue
      let merchantname = xmlDoc.getElementsByTagName("name")[0].childNodes[0] && xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue
      let serialnumber = xmlDoc.getElementsByTagName("serialnumber")[0].childNodes[0] && xmlDoc.getElementsByTagName("serialnumber")[0].childNodes[0].nodeValue
      let amount = xmlDoc.getElementsByTagName("amount")[0].childNodes[0] && xmlDoc.getElementsByTagName("amount")[0].childNodes[0].nodeValue
      let stan = xmlDoc.getElementsByTagName("stan")[0].childNodes[0] && xmlDoc.getElementsByTagName("stan")[0].childNodes[0].nodeValue
      let datetime = xmlDoc.getElementsByTagName("datetime")[0].childNodes[0] && xmlDoc.getElementsByTagName("datetime")[0].childNodes[0].nodeValue
      let rrn = xmlDoc.getElementsByTagName("rrn")[0].childNodes[0] && xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue
      let pan = xmlDoc.getElementsByTagName("pan")[0].childNodes[0] && xmlDoc.getElementsByTagName("pan")[0].childNodes[0].nodeValue
      let success = xmlDoc.getElementsByTagName("success")[0].childNodes[0] && xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue
      let rescode = xmlDoc.getElementsByTagName("rescode")[0].childNodes[0] && xmlDoc.getElementsByTagName("rescode")[0].childNodes[0].nodeValue
      console.log('POS rescode:', rescode)
      if (rescode === "00") {
        try {
          this.showSuccess(
            "فیش مربوطه با موفقیت پرداخت شد, منتظر تایید در سرا می باشد"
          )
          //     {
          //     "pGidPoseFicheHistory" : "",
          //     "pMerchantNo" : "",
          //     "pTerminalNo" : "",
          //     "pSwitchDate" : "",
          //     "pSwitchTime" : "",
          //     "pTraceNo" : "",
          //     "pRefNo" : "",
          //     "pCardNo" : "",
          //     "pIsSucceed" : "",
          //     "pComment" : ""
          // }

          console.log("confirmFicheViaPose_shahrBank payload:", {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: merchantid,
            pTerminalNo: terminalid,
            pSwitchDate: datetime,
            pSwitchTime: currentTime(),
            pTraceNo: stan,
            pRefNo: rrn,
            pCardNo: pan,
            pIsSucceed: "1",
            pComment: "با موفقیت پرداخت شد"
          })
          let data = {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: merchantid,
            pTerminalNo: terminalid,
            pSwitchDate: datetime,
            pSwitchTime: currentTime(),
            pTraceNo: stan,
            pRefNo: rrn,
            pCardNo: pan,
            pIsSucceed: "1",
            pComment: "با موفقیت پرداخت شد"
          }
          this.$services.SB.updateLogPose(data,
            {
              config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
            })
            .then(({ data }) => {
              const res = this.getResponse(data)
              if (res.success) {
                if (
                  parseFloat(amount) !==
                  payablePrice
                ) {
                  this.showError(
                    "قیمت فیش تایید شده با قیمت فیش انتخاب شده شده برابر نمی باشد"
                  )
                  return
                }
                if (eumDutyType === 1 || eumDutyType === 2) {
                  this.confirmFicheDuty({
                    PNidProc: "00000000-0000-0000-0000-000000000000",
                    pDutyFiche: this.tmpPoseConfirmFiche,
                    PDutyType: eumDutyType,
                    pConfirmBankCode: "0",
                    pPaymentRahgiriCode: stan,
                    pPaymentReferenceNo: rrn,
                    pPaymentDate: datetime,
                    pBankConfirmPrice:
                      payablePrice !== null
                        ? payablePrice
                        : 0,
                    pEumDutyPaymentType: 2,
                    pEumFicheConfirmMethode: 14,
                    pSetPayOffForConfirmYearly:
                      ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                    pSetPayOffForConfirmCollective:
                      ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                    pSetPayOffForConfirmTaghsit:
                      ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                    pIsCancelOtherFiche:
                      ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                    pIsShowAccountingError:
                      ClsCommon.DutySetting.IsShowAccountingSystemError
                  })
                }
                else if (eumDutyType === 7) {
                  this.generalIncomeFicheConfirm({
                    PaymentBank: this.getBankName,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentDate: currentDate()
                  })
                } else {
                  this.confirmFicheIncome({
                    EumIncomePaymentType: 2,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentBank: this.getBankName,
                    PaymentDate: currentDate(),
                    PaymentRahgiriCode: stan,
                    PaymentReferenceNo: rrn
                  })
                }
              } else {
                let htmlMsg = ""
                res.errors.forEach((error) => {
                  htmlMsg += `<li>${error.text}</li>`
                })
                this.showError(htmlMsg)
              }
            })
            .catch((response) => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        } catch (error) { }
      } else {
        if (success === "yes") {
          this.showShahrSwitchError(rescode)
        } else {
          this.showErrorCodeError(errorcode)
        }
      }
    },
    showErrorCodeError (errorCode, isHafariErorr = false) {
      let tmpMessage = ""
      switch (errorCode) {
        case "1":
          tmpMessage = "عدم وجود کاغذ چاپ در کلیه مدل ها و یا خطای ناشناخته در S380"
          break
        case "2":
          tmpMessage = "رمز افلاین اشتباه وارد شده است"
          break
        case "3":
          tmpMessage = "عملیات توسط کاربر لغو شده است"
          break
        case "4":
          tmpMessage = "کارت غیر مجاز میباشد"
          break
        case "5":
          tmpMessage = "مبلغ اشتباه وارد شده است"
          break
        case "6":
          tmpMessage = "خطای امنیت"
          break
        case "7":
          tmpMessage = "خطا در خرید"
          break
        case "8":
          tmpMessage = "سرویس غیر فعال میباشد"
          break
        case "9":
          tmpMessage = "تنظیمات اشتباه است"
          break
        case "10":
          tmpMessage = "دسته گردش باز میباشد"
          break
        case "11":
          tmpMessage = "تراکنش آخر وجود ندارد"
          break
        case "12":
          tmpMessage = "موجودی کافی نیست"
          break
        case "13":
          tmpMessage = "خطای شبکه و ارتباط پوز با سوئیچ رخ داده است"
          break
        case "14":
          tmpMessage = "خطا در تراکنش"
          break
        case "15":
          tmpMessage = " بازه زمانی انجام تراکنش پایان یافته است (timeout)"
          break
        case "16":
          tmpMessage = "پارامتر های ورودی اشتباه میباشد"
          break
        default:
          tmpMessage = "مسیر ارتباطی با دستگاه پوز مشکل دارد"
      }

      this.showError(tmpMessage)
      if (isHafariErorr === false) {
        let payload = {
          pGidPoseFicheHistory: this._GIDPoseFicheHistory,
          pMerchantNo: "",
          pTerminalNo: "",
          pSwitchDate: "",
          pSwitchTime: "",
          pTraceNo: "",
          pRefNo: "",
          pCardNo: "",
          pIsSucceed: "0",
          pComment: "مشکل در تایید از طریق پوز. کد خطا : " + errorCode
        }
        this.$services.SB.updateLogPose(payload, {
          config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
        })
          .then(({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
            } else {
              let htmlMsg = ""
              res.errors.forEach((error) => {
                htmlMsg += `<li>${error.text}</li>`
              })
              this.showError(htmlMsg)
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    showMellatBankError (rescode) {
      let tmpMessage = ''
      switch (rescode) {
        case "100":
          tmpMessage = "موفق : تراکنش به درستی انجام شده است"
          break
        case "101":
          tmpMessage = " سایز پیام دریافتی از پوز نامعتبر است"
          break
        case "102":
          tmpMessage = "پیام دریافتی از پی سی نامعتبر است)سایز پیام، نوع تراکنش("
          break
        case "103":
          tmpMessage = "نوع تراکنش دریافتی از پوز در پاسخ نامعتبر است "
          break
        case "104":
          tmpMessage = "مبلغ وارد شده یا مبلغ دریافتی از پوز در  پاسخ نامعتبر است"
          break
        case "105":
          tmpMessage = "شناسه پرداخت وارد شده نامعتبر است"
          break
        case "106":
          tmpMessage = "out انتظار برای دریافت پاسخ ار  پوز در پورت سریال نامعتبر است timeoutباید بین ms2000 و ms600000 باشد"
          break
        case "107":
          tmpMessage = "زمان انتظار برای دریافت داده ها از پوز در پورت سریال به پایان رسید"
          break
        case "108":
          tmpMessage = "تراکنش ناموفق: پاسخی از سرور دریافتت نشد)زمان انتظار به پایان رسیده است یا  اتصال ناموفق بوده("
          break
        case "109":
          tmpMessage = "تراکنش ناموفق: موجودی کافی نیست، سرور پایین است یا ..."
          break
        case "110":
          tmpMessage = " تراکنش ناموفق: خطای پرینتر"
          break
        case "111":
          tmpMessage = "تراکنش ناموفق: خطای ارتباط"
          break
        case "112":
          tmpMessage = "تراکنش ناموفق: خطا در ارسال تسویه،  ریورسال یا ایجاد تراکنش"
          break
        case "113":
          tmpMessage = "نام پورت سریال وارد شده نامعتبر است"
          break
        case "114":
          tmpMessage = "تراکنش ناموفق: توسط کاربر کنسل شد"
          break
        case "115":
          tmpMessage = "شناسه قبض وارد شده نامعتبر است"
          break
        case "116":
          tmpMessage = "شناسه پرداخت وارد شده نامعتبر است"
          break
        case "117":
          tmpMessage = "خطا در باز کردن پورت سریال"
          break
        case "118":
          tmpMessage = "خطای امنیتی: خطا در ارسال اطالعات روی پورت سریال"
          break
        case "119":
          tmpMessage = "پورت انتخاب شده، پورت سریال نمی  باشد"
          break
        case "120":
          tmpMessage = "یک یا چند مشخصه پورت سریال  نامعتبر است "
          break
        case "121":
          tmpMessage = "آرگومان های متد نامعتبر است: نام پورت سریال نامعتبر است"
          break
        case "122":
          tmpMessage = "خطا در ارسال اطالعات روی پوز: ورودی است Null"
          break
        case "123":
          tmpMessage = "خطای پایان زمان در ارسال اطالعات  روی پورت سریال"
          break
        case "124":
          tmpMessage = " کارت روی پوز کشیده نشده است"
          break
        case "125":
          tmpMessage = "شناسه حساب نامعتبر است "
          break
        case "126":
          tmpMessage = "شناسه حساب دریافتی از pc برای تراکنش پرداخت نامعتبر است"
          break
        case "127":
          tmpMessage = "شناسه حساب دریافتی از پوز برای تراکنش پرداخت نامعتبر است"
          break
        case "128":
          tmpMessage = "ت نامعتبر pc از دریافتی م"
          break
        case "129":
          tmpMessage = "شماره پیگیری دریافتی از پوز نامعتبر است"
          break
        case "130":
          tmpMessage = " شناسه قبض در یافتی از pc نامعتبر است."
          break
        case "131":
          tmpMessage = "شناسه پرداخت دریافتی از pc نامعتبر است."
          break
        case "132":
          tmpMessage = "داده های اضافی دریافتی از pc نامعتبر است"
          break
        case "133":
          tmpMessage = "مبلغ کل دریافتی از پی سی در تراکنش پرداخت چندوجهی نامعتبر است"
          break
        case "134":
          tmpMessage = "داده های دریافتی از pc تایید نشد"
          break
        case "161":
          tmpMessage = "داده های پرداخت چندوجهی نامعتبر است)حداکثر 01 رکورد("
          break
        case "162":
          tmpMessage = "مبلغ وارد شده در پرداخت چندحسابی نامعتبر است"
          break
        case "163":
          tmpMessage = "شماره پیگیری وارد شده نامعتبر است"
          break
        case "164":
          tmpMessage = "داده های رسیده به پوز یا پی سی نامعتبر است.)خطای CRC)"
          break
        case "165":
          tmpMessage = "نوع اتصال وارد شده نامعتبر است"
          break
        case "166":
          tmpMessage = "پورت بستر ip/tcp وارد شده نامعتبر"
          break
        case "167":
          tmpMessage = " timeout وارد شده برای دریافت اطالعات از پوز روی بستر ip/tcp نامعتبر است"
          break
        case "168":
          tmpMessage = " tcp/ipخطا در ساخت سوکت روی بستر"
          break
        case "169":
          tmpMessage = "خطا در ارسال اطالعات از پوز روی بستر tcp/ip"
          break
        case "170":
          tmpMessage = "خطا در دریافت اطالعات از پوز روی بستر tcp/ip"
          break
        case "171":
          tmpMessage = "خطا در فرمت پیام پذیرنده"
          break
        case "172":
          tmpMessage = "خطا در آماده سازی اطالعات برای ارسال"
          break
        case "173":
          tmpMessage = "خطا در دریافت اطالعات از پوز"
          break
        case "174":
          tmpMessage = "خطا در دریافت اطالعات از پوز (دریافت Null)"
          break
        case "175":
          tmpMessage = "CRC محاسبه در خط"
          break
        case "176":
          tmpMessage = "داده های اضافی پذیرنده نامعتبر است"
          break
        case "200":
          tmpMessage = "خطا های دیگر"
          break
        default:
          tmpMessage = "خطای نامشخص سوییچ شماره"
      }
      this.showError(tmpMessage)
    },
    showShahrSwitchError (rescode, isHafariError = false) {
      // این قسمت ما نیاز داریم تا rescode های بانک را سوییچ بزنیم تا پیغام مناسبی را دریافت کنیم.
      let tmpMessage = ''
      switch (rescode) {
        case "00":
          tmpMessage = "موفق : تراکنش به درستی انجام شده است"
          break
        case "02":
          tmpMessage = "اصلاحيه تراکنش قبلا انجام شده است. )در پاسخ به ارسال اصلاحيه("
          break
        case "03":
          tmpMessage = "پذيرنده کارت شناخته شده نيست. تراکنش بازکردف سازماف را انجام دهيد"
          break
        case "06":
          tmpMessage = "اشکال در سيستم مرکزی"
          break
        case "12":
          tmpMessage = "پيام نادرست است. يکی از دلايک اين خطا عدم مجوز پايانه در انجام عمليات مورد نظر می باشد"
          break
        case "13":
          tmpMessage = "مقدار ريالی غلط است )مبلغ تراکنش صحيح نمی باشد("
          break
        case "14":
          tmpMessage = "شماره کارت شناخته شده نيست )کارت در سيستم خدمات کارت نا معتبر است("
          break
        case "15":
          tmpMessage = "در پاسخ به تراکنش باز کردف سازماف : قبلا باز شده است"
          break
        case "16":
          tmpMessage = "در پاسخ به تراکنش بستن سازماف : قبلا بسته شده است"
          break
        case "19":
          tmpMessage = "در پاسخ به تراکنش تراز جاری پايانه : مجمو تراکنش های پايانه با مجمو تراکنش های مرکز برابر نيست"
          break
        case "25":
          tmpMessage = "داده ای از تراکنش ارسالی غلط است و اين داده در مرکز پيدا نشد. يکی از اين موارد شماره پايانه است()"
          break
        case "27":
          tmpMessage = "قبض تکراری"
          break
        case "28":
          tmpMessage = "قبض پشتیبانی نمی شود"
          break
        case "30":
          tmpMessage = "فرمت اشتباه است"
          break
        case "33":
          tmpMessage = "تاريخ انقضای کارت سپری شده است"
          break
        case "34":
          tmpMessage = "تراکنش مالی تاييد نشده است"
          break
        case "41":
          tmpMessage = "کارت به علت مفقود شدف مسدود موقت است"
          break
        case "43":
          tmpMessage = "کارت به علت دزديده شدف دايما مسدود است"
          break
        case "51":
          tmpMessage = "کارت فاقد موجودی کافی جهت انجام تراکنش مالی است"
          break
        case "55":
          tmpMessage = "رمز نامعتبر"
          break
        case "56":
          tmpMessage = "کارت نامعتبر"
          break
        case "57":
          tmpMessage = "تراکنش غير مجاز"
          break
        case "61":
          tmpMessage = "مبلغ تراکنش های اين کارت از حد مجاز گذشته است"
          break
        case "62":
          tmpMessage = "مبلغ تراکنش روز اين کارت از حد مجاز گذشته است"
          break
        case "65":
          tmpMessage = "تعداد تراکنش های مربوط به اين کارت از حد مجاز گذشته است"
          break
        case "66":
          tmpMessage = "حساب مسدود است"
          break
        case "75":
          tmpMessage = "تعداد رمز نا معتبر از حد مجاز گذشته است"
          break
        case "77":
          tmpMessage = "روز مالی صحيح نيست"
          break
        case "78":
          tmpMessage = "کارت فعال نيست"
          break
        case "79":
          tmpMessage = "حساب تعريف نشده است"
          break
        case "80":
          tmpMessage = "به دليک اشکال در حساب تراکنش پذيرفته نيست"
          break
        case "81":
          tmpMessage = "کارت قبلا باطک شده است"
          break
        case "83":
          tmpMessage = "سيستم مرکزی آماده نيست"
          break
        case "84":
          tmpMessage = "سيستم مرکزی فعال نيست"
          break
        case "85":
          tmpMessage = "خطای درونی سيستم مرکزی"
          break
        case "86":
          tmpMessage = "تراکنش روی اين دستگاه مجاز نيست"
          break
        case "87":
          tmpMessage = "خطای درونی سيستم مرکزی"
          break
        case "88":
          tmpMessage = "خطای درونی سيستم مرکزی"
          break
        case "89":
          tmpMessage = "خطای درونی سيستم مرکزی"
          break
        case "90":
          tmpMessage = "ارتباط در حين پردازش قطع شده است"
          break
        case "91":
          tmpMessage = "در مرکز و اعلام آف توسط مرکز به دستگاه Time out عدم دريافت پاسخ به علت وقوع"
          break
        case "92":
          tmpMessage = "صادر کننده نا معتبر است"
          break
        case "93":
          tmpMessage = "به علت ترافيک تراکنشها صف تراکنشها در سيستم مرکزی پر شده است"
          break
        case "94":
          tmpMessage = "شماره تراکنش تکراری است"
          break
        case "96":
          tmpMessage = "اشکال در سيستم مرکزی"
          break
        default:
          tmpMessage = "خطای نامشخص سوییچ شماره"
      }
      this.showError(tmpMessage)
      if (isHafariError === false) {
        let payload = {
          pGidPoseFicheHistory: this._GIDPoseFicheHistory,
          pMerchantNo: "",
          pTerminalNo: "",
          pSwitchDate: "",
          pSwitchTime: "",
          pTraceNo: "",
          pRefNo: "",
          pCardNo: "",
          pIsSucceed: "0",
          pComment: "مشکل در تایید از طریق پوز. کد خطا : " + rescode
        }
        this.$services.SB.updateLogPose(payload, {
          config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
        })
          .then(({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
            } else {
              let htmlMsg = ""
              res.errors.forEach((error) => {
                htmlMsg += `<li>${error.text}</li>`
              })
              this.showError(htmlMsg)
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    confirmFicheDuty ({
      PNidProc,
      pDutyFiche,
      PDutyType,
      pConfirmBankCode,
      pPaymentRahgiriCode,
      pPaymentReferenceNo,
      pPaymentDate,
      pBankConfirmPrice,
      pEumDutyPaymentType,
      pEumFicheConfirmMethode,
      pSetPayOffForConfirmYearly,
      pSetPayOffForConfirmCollective,
      pSetPayOffForConfirmTaghsit,
      pIsCancelOtherFiche,
      pIsShowAccountingError,
      pRequestGuid,
      pEncryptCode
    }) {
      // Guid PNidProc, DtoSC.Duty_Fiche pDutyFiche, Guid pUserCode, string pUserName, ClsEnum.EumDutyType PDutyType, string pConfirmBankCode, string pPaymentRahgiriCode, string pPaymentReferenceNo, string pPaymentDate, long pBankConfirmPrice, ClsEnum.EumDutyPaymentType pEumDutyPaymentType, ClsEnum.EumFicheConfirmMethode pEumFicheConfirmMethode, bool pSetPayOffForConfirmYearly, bool pSetPayOffForConfirmCollective, bool pSetPayOffForConfirmTaghsit, bool pIsCancelOtherFiche, bool pIsShowAccountingError, Guid pRequestGuid, string pEncryptCode)

      let payload = {
        pNidProc: PNidProc,
        pDutyFiche: pDutyFiche,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PDutyType: PDutyType,
        pConfirmBankCode: pConfirmBankCode,
        pPaymentRahgiriCode: parseInt(pPaymentRahgiriCode) || 0,
        pPaymentReferenceNo: parseInt(pPaymentReferenceNo) || 0,
        pPaymentDate: pPaymentDate,
        pBankConfirmPrice: parseInt(pBankConfirmPrice) || 0,
        pEumDutyPaymentType: pEumDutyPaymentType,
        pEumFicheConfirmMethode: pEumFicheConfirmMethode,
        pSetPayOffForConfirmYearly: true,
        pSetPayOffForConfirmCollective: false,
        pSetPayOffForConfirmTaghsit: false,
        pIsCancelOtherFiche: false,
        pIsShowAccountingError: false
      }
      console.log('payload of ConfirmFich:', payload)
      this.$services.SB.confirmFiche(payload, {
        config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          console.log('ConfirmFich Result:', this.saveResult)

          if (this.saveResult.success) {
            this.showSuccess("فیش انتخاب شده با موفقیت تأیید شد.")
            this.$emit("reloadDutyFiche")
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.selectedRow.NidFiche || this.selectedRow.NIdFiche,
              bizCodeTitle: "NidFiche"
            })
          } else {
            let htmlMsg = ""
            this.saveResult.errors.forEach((error) => {
              htmlMsg += `<li>${error.text}</li>`
            })
            this.showError(htmlMsg)
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    betweenStrings (text, seprator) {
      try {
        let p1 = text.indexOf(seprator)
        let p2 = text.lastIndexOf(seprator)
        if (p1 === p2 && p1 === -1) return text
        else if (p1 === p2) return ""
        else return text.substring(p1 + 1, p2 - p1 - 1)
      } catch (ex) {
        console.log(ex)
      }
    },
    // convertMellatPOSResponse (pText) {
    //   // Dictionary<string, string> Result = new Dictionary<string, string>();
    //   let Result = {}
    //   let ss = pText.split(",")
    //   ss.forEach((item) => {
    //     let tmpThisSplit = item.split(":")
    //     // Result.Add(betweenStrings(tmpThisSplit[0], '"'), betweenStrings(tmpThisSplit[1], '"'));
    //     Result[this.betweenStrings(tmpThisSplit[0], '"')] = this.betweenStrings(
    //       tmpThisSplit[1],
    //       '"'
    //     )
    //   })
    //   let tmpMellatPOSResponse = {}
    //   tmpMellatPOSResponse.AccountNo = Result.hasOwnProperty("AccountNo")
    //     ? Result["AccountNo"]
    //     : ""
    //   tmpMellatPOSResponse.PAN = Result.hasOwnProperty("PAN")
    //     ? Result["PAN"]
    //     : ""
    //   tmpMellatPOSResponse.PcID = Result.hasOwnProperty("PcID")
    //     ? Result["PcID"]
    //     : ""
    //   tmpMellatPOSResponse.ReasonCode = Result.hasOwnProperty("ReasonCode")
    //     ? Result["ReasonCode"]
    //     : ""
    //   tmpMellatPOSResponse.ReqID = Result.hasOwnProperty("ReqID")
    //     ? Result["ReqID"]
    //     : ""
    //   tmpMellatPOSResponse.ReturnCode = Result.hasOwnProperty("ReturnCode")
    //     ? Result["ReturnCode"]
    //     : ""
    //   tmpMellatPOSResponse.SerialTransaction = Result.hasOwnProperty(
    //     "SerialTransaction"
    //   )
    //     ? Result["SerialTransaction"]
    //     : ""
    //   tmpMellatPOSResponse.TerminalNo = Result.hasOwnProperty("TerminalNo")
    //     ? Result["TerminalNo"]
    //     : ""
    //   tmpMellatPOSResponse.TraceNumber = Result.hasOwnProperty("TraceNumber")
    //     ? Result["TraceNumber"]
    //     : ""
    //   tmpMellatPOSResponse.TransactionDate = Result.hasOwnProperty(
    //     "TransactionDate"
    //   )
    //     ? Result["TransactionDate"]
    //     : ""
    //   tmpMellatPOSResponse.TransactionTime = Result.hasOwnProperty(
    //     "TransactionTime"
    //   )
    //     ? Result["TransactionTime"]
    //     : ""

    //   return tmpMellatPOSResponse
    // },
    confirmFicheVisMellatPos (pParams, eumDutyType, payablePrice, NidFiche) {
      try {
        // let pResponse = this.convertMellatPOSResponse(pParams)
        let pResponse = pParams.data
        if (pResponse !== null && pResponse.ReturnCode.toString() === "100") {
          this.showSuccess(
            "فیش مربوطه با موفقیت پرداخت شد, منتظر تایید در سرا می باشد"
          )

          let data = {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: "",
            pTerminalNo: pResponse.TerminalNo,
            pSwitchDate: pResponse.TransactionDate,
            pSwitchTime: pResponse.TransactionTime,
            pTraceNo: pResponse.TraceNumber,
            pRefNo: pResponse.SerialTransaction,
            pCardNo: pResponse.PAN,
            pIsSucceed: "1",
            pComment: "با موفقیت پرداخت شد"
          }
          this.$services.SB.updateLogPose(data)
            .then(({ data }) => {
              const res = this.getResponse(data)
              if (res.success) {
                if (eumDutyType === 1 || eumDutyType === 2) {
                  this.confirmFicheDuty({
                    PNidProc: "00000000-0000-0000-0000-000000000000",
                    pDutyFiche: this.tmpPoseConfirmFiche,
                    PDutyType: eumDutyType,
                    pConfirmBankCode: "0",
                    pPaymentRahgiriCode: pResponse.TraceNumber,
                    pPaymentReferenceNo: pResponse.SerialTransaction,
                    pPaymentDate: "",
                    pBankConfirmPrice:
                      payablePrice !== null
                        ? payablePrice
                        : 0,
                    pEumDutyPaymentType: 2,
                    pEumFicheConfirmMethode: 14,
                    pSetPayOffForConfirmYearly:
                      ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                    pSetPayOffForConfirmCollective:
                      ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                    pSetPayOffForConfirmTaghsit:
                      ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                    pIsCancelOtherFiche:
                      ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                    pIsShowAccountingError:
                      ClsCommon.DutySetting.IsShowAccountingSystemError
                  })
                }
                else if (eumDutyType === 7) {
                  this.generalIncomeFicheConfirm({
                    PaymentBank: this.getBankName,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentDate: currentDate()
                  })
                } else {
                  this.confirmFicheIncome({
                    EumIncomePaymentType: 2,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentBank: this.getBankName,
                    PaymentDate: currentDate(),
                    PaymentRahgiriCode: pResponse.TraceNumber,
                    PaymentReferenceNo: pResponse.SerialTransaction
                  })
                }
              } else {
                let htmlMsg = ""
                res.errors.forEach((error) => {
                  htmlMsg += `<li>${error.text}</li>`
                })
                this.showError(htmlMsg)
              }
            })
            .catch((response) => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        } else if (pResponse !== null) {
          this.showMellatBankError(pResponse.ReturnCode.toString())
          // this.showError("مشکل در تایید از طریق پوز", "عدم موفقیت پرداخت")
          let data = {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: "",
            pTerminalNo: "",
            pSwitchDate: "",
            pSwitchTime: "",
            pTraceNo: "",
            pRefNo: "",
            pCardNo: "",
            pIsSucceed: "0",
            pComment: "عملیات پرداخت با پوز موفقیت آمیز نبود"
          }
          this.$services.SB.updateLogPose(data)
            .then(({ data }) => {
              const res = this.getResponse(data)
              if (!res.success) {
                let htmlMsg = ""
                res.errors.forEach((error) => {
                  htmlMsg += `<li>${error.text}</li>`
                })
                this.showError(htmlMsg)
              }
            })
            .catch((response) => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      } catch (error) { }
    },
    confirmFicheViaPose_Tejarat (response, eumDutyType, payablePrice, NidFiche) {
      try {
        debugger
        let data = response?.data?.Data || null
        let tmpRRN = data.RRN
        let tmpRespCode = response?.data?.Status
        let tmpPan = data.Pan
        let tmpTransactionDate = data.Date
        let tmpTransactionTime = data.Time
        let tmpTerminalId = data.TerminalId
        let tmpTraceNo = data.Trace
        if (tmpRRN !== null && tmpRespCode !== null && tmpRespCode === 0) {
          let data = {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: "",
            pTerminalNo: tmpTerminalId,
            pSwitchDate: tmpTransactionDate,
            pSwitchTime: tmpTransactionTime,
            pTraceNo: tmpTraceNo,
            pRefNo: tmpRRN,
            pCardNo: tmpPan,
            pIsSucceed: "1",
            pComment: "با موفقیت پرداخت شد"
          }
          this.$services.SB.updateLogPose(data)
            .then(({ data }) => {
              const res = this.getResponse(data)
              if (res.success) {
                if (eumDutyType === 1 || eumDutyType === 2) {
                  this.confirmFicheDuty({
                    PNidProc: "00000000-0000-0000-0000-000000000000",
                    pDutyFiche: this.tmpPoseConfirmFiche,
                    PDutyType: eumDutyType,
                    pConfirmBankCode: "0",
                    pPaymentRahgiriCode: tmpTraceNo,
                    pPaymentReferenceNo: "",
                    pPaymentDate: "",
                    pBankConfirmPrice:
                      payablePrice !== null
                        ? payablePrice
                        : 0,
                    pEumDutyPaymentType: 2,
                    pEumFicheConfirmMethode: 14,
                    pSetPayOffForConfirmYearly:
                      ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                    pSetPayOffForConfirmCollective:
                      ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                    pSetPayOffForConfirmTaghsit:
                      ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                    pIsCancelOtherFiche:
                      ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                    pIsShowAccountingError:
                      ClsCommon.DutySetting.IsShowAccountingSystemError
                  })
                }
                else if (eumDutyType === 7) {
                  this.generalIncomeFicheConfirm({
                    PaymentBank: this.getBankName,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentDate: currentDate()
                  })
                }
                else {
                  this.confirmFicheIncome({
                    EumIncomePaymentType: 2,
                    EumFicheConfirmMethode: 14,
                    NidFiche: NidFiche,
                    PaymentBank: this.getBankName,
                    PaymentDate: currentDate(),
                    PaymentRahgiriCode: response.TraceNumber,
                    PaymentReferenceNo: response.SerialTransaction
                  })
                }
              } else {
                let htmlMsg = ""
                res.errors.forEach((error) => {
                  htmlMsg += `<li>${error.text}</li>`
                })
                this.showError(htmlMsg)
              }
            })
            .catch((response) => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        } else {
          this.showTejaratError(tmpRespCode)
          // this.showError("مشکل در تایید از طریق پوز", "عدم موفقیت پرداخت")
          let data = {
            pGidPoseFicheHistory: this._GIDPoseFicheHistory,
            pMerchantNo: "",
            pTerminalNo: "",
            pSwitchDate: "",
            pSwitchTime: "",
            pTraceNo: "",
            pRefNo: "",
            pCardNo: "",
            pIsSucceed: "0",
            pComment: "عملیات پرداخت با پوز موفقیت آمیز نبود"
          }
          this.$services.SB.updateLogPose(data)
            .then(({ data }) => {
              const res = this.getResponse(data)
              if (!res.success) {
                let htmlMsg = ""
                res.errors.forEach((error) => {
                  htmlMsg += `<li>${error.text}</li>`
                })
                this.showError(htmlMsg)
              }
            })
            .catch((response) => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      } catch (error) { }
    },
    showTejaratError (errorCode) {
      let tmpMessage = ""
      switch (errorCode) {
        case 1:
          tmpMessage = "صادرکننده ی کارت از انجام تراکنش صرف نظر کرد"
          break
        case 2:
          tmpMessage = "عملیات تاییدیه این تراکنش قبال باموفقیت صورت پذیرفته است"
          break
        case 3:
          tmpMessage = "پذیرنده ی فروشگاهي نامعتبر مي باشد"
          break
        case 4:
          tmpMessage = "کارت توسط دستگاه ضبط شود"
          break
        case 5:
          tmpMessage = "از انجام تراکنش صرف نظر شد"
          break
        case 6:
          tmpMessage = "بروز خطایی ناشناخته"
          break
        case 7:
          tmpMessage = "به دلیل شرایط خاص کارت توسط دستگاه ضبط شود"
          break
        case 8:
          tmpMessage = "با تشخیص هویت دارنده کارت، تراکنیش موفق می باشد"
          break
        case 9:
          tmpMessage = "در خواست رسیده در حال پی گیری و انجام است"
          break
        case 10:
          tmpMessage = "تراکنش با مبلغی پایین تر از مبلغ  درخواستی ( کمبود پول ATM یا حساب مشتری) پذیرفته شده است"
          break
        case 11:
          tmpMessage = "تراکنیش با وجود احتمالی برخی مشکلات پذیرفته شده است (به علت جایگاه مشتری VIP)"
          break
        case 12:
          tmpMessage = "تراکنش نامعتبر است"
          break
        case 13:
          tmpMessage = "مبلغ تراکنش اصلاحیه نادرست است"
          break
        case 14:
          tmpMessage = "شماره کارت ارسالی نامعتبر است(وجود ندارد)"
          break
        case 15:
          tmpMessage = "صادر کننده ی کارت نامعتبر است (وجود ندارد)"
          break
        case 16:
          tmpMessage = "تراکنش مورد تایید است و اطلاعات شیار سوم کارت به روز رسانی شود"
          break
        case 17:
          tmpMessage = "مشتری درخواست کننده حذف شده است"
          break
        case 18:
          tmpMessage = " در مواقعي که یک تراکنش به هر دلیل پذیرفته نشده است و یا با شرایط خاصي پذیرفته شده است در صورت تایید و یا سماجت مشتری این پیغام را خواهیم داشت "
          break
        case 19:
          tmpMessage = "تراکنش مجددا ارسال شود"
          break
        case 20:
          tmpMessage = " در موقعیتي که سوئیچ جهت پذیرش تراکنش نیازمند پرس و جو از کارت است ممکن است درخواست از کارت  (ترمینال) بنماید، این پیام مبین نامعتبر بودن جواب است"
          break
        case 21:
          tmpMessage = "در صورتي که پاسخ به در خواست ترمینا ل نیازمند هیچ پاسخ خاص یا عملکردی نباشیم این پیام را خواهیم داشت"
          break
        case 22:
          tmpMessage = "تراکنش مشکوک به بد عمل کردن  (کارت ، ترمینال ، دارنده کارت)  بوده است لذا پذیرفته نشده است "
          break
        case 23:
          tmpMessage = "کارمزد ارسالي پذیرنده غیر قابل قبول است"
          break
        case 24:
          tmpMessage = " زماني که یک تراکنش نیازمند عمل کرد یا فراخواني فایلي خاص باشد و فایل مذکرو در مبدا درخواست موجود نباشد این پیام را خواهیم داشت  "
          break
        case 25:
          tmpMessage = "تراکنش اصلي یافت نشد"
          break
        case 26:
          tmpMessage = "عملیات فایل تکراری"
          break
        case 27:
          tmpMessage = "خطا در اصالح فیلد اطالعاتي"
          break
        case 28:
          tmpMessage = "فایل مورد نظر lock شده است"
          break
        case 29:
          tmpMessage = "عملیات فایل ناموفق "
          break
        case 30:
          tmpMessage = "قالب پیام دارا ی اشکال است "
          break
        case 31:
          tmpMessage = "پذیرنده توسط سوئي پشتیباني نمي شود"
          break
        case 32:
          tmpMessage = "تراکنش به صورت غیر قطعي کامل شده است  به عنوان مثال تراکنش سپرده گزاری که از دید مشتری کامل شده است ولي مي بایست تکمیل گردد  "
          break
        case 33:
          tmpMessage = "تاریخ انقضای کارت سپر ی شده است. کارت توسط دستگاه ضبط شود"
          break
        case 34:
          tmpMessage = "تراکنش اصلي باموفقیت انجام نپذیرفته است "
          break
        case 35:
          tmpMessage = "بنابر توصیه موسسه یا بانک مدیر کارت به پذیرنده کارت ضبط شده است "
          break
        case 36:
          tmpMessage = "کارت محدود شده است. کارت توسط دستگاه ضبط شود"
          break
        case 37:
          tmpMessage = "پذیرنده در نتیجه چنین درخواستي با بخش امنیتي موسسه یا بانک مدیر کارت تماس گرفته است یا میگیرد "
          break
        case 38:
          tmpMessage = "تعداد دفعات ورود رمزغلط بیش از حدمجاز است. کارت توسط دستگاه ضبط شود"
          break
        case 39:
          tmpMessage = "کارت حساب اعتباری ندارد"
          break
        case 40:
          tmpMessage = "عملیات درخواستي پشتیباني نمي گردد"
          break
        case 41:
          tmpMessage = "کارت مفقود ی مي باشد. کارت توسط دستگاه ضبط شود"
          break
        case 42:
          tmpMessage = "کارت حساب عمومي ندارد"
          break
        case 43:
          tmpMessage = "کارت مسروقه مي باشد. کارت توسط دستگاه ضبط شود"
          break
        case 44:
          tmpMessage = "کارت حساب سرمایه گذار ی ندارد"
          break
        case 45:
          tmpMessage = "قبض قابل پرداخت نمي باشد "
          break
        case 51:
          tmpMessage = "موجود ی کافي نمي باشد"
          break
        case 52:
          tmpMessage = "کارت حساب جاری ندارد "
          break
        case 53:
          tmpMessage = "کارت حساب قرض الحسنه ندارد"
          break
        case 54:
          tmpMessage = "تاریخ انقضای کارت سپر ی شده است "
          break
        case 55:
          tmpMessage = "رمز کارت نا معتبر است"
          break
        case 56:
          tmpMessage = "کارت نا معتبر است "
          break
        case 57:
          tmpMessage = "انجام تراکنش مربوطه توسط دارنده ی کارت مجاز نمي باشد"
          break
        case 58:
          tmpMessage = "انجام تراکنش مربوطه توسط پایانه ی انجام دهنده مجاز نمي باشد"
          break
        case 59:
          tmpMessage = "کارت مظنون به تقلب است"
          break
        case 60:
          tmpMessage = "بنابر توصیه موسسه یا بانک مدیر کارت به پذیرنده کارت ، تراکنش درخواستي پذیرفته نمي شود"
          break
        case 61:
          tmpMessage = "مبلغ تراکنش کمتر از حد تعیین شده توسط صادر کننده کارت و یا بیشتر از حد مجاز مي باشد"
          break
        case 62:
          tmpMessage = "کارت محدود شده است"
          break
        case 63:
          tmpMessage = "تمهیدات امنیتي نقض گردیده است "
          break
        case 64:
          tmpMessage = "(مبلغ تراکنش اصلي ن امعتبر است.(تراکنش مالي اصلي با این مبلغ نمي باشد"
          break
        case 65:
          tmpMessage = "تعداد درخواست تراکنش بیش از حد مجاز مي باشد "
          break
        case 66:
          tmpMessage = "در پي تراکنش درخواستي پذیرنده با بخش امنیتي موسسه یا بانک تماس گرفته است ) و یا میگیرد ("
          break
        case 67:
          tmpMessage = "کارت توسط دستگاه ضبط شود "
          break
        case 68:
          tmpMessage = "پاسخ الزم برای تکمیل یا انجام تراکنش خیلي دیر رسیده است"
          break
        case 69:
          tmpMessage = "تعداد دفعات تکراررمز از حد مجاز گذشته است "
          break
        case 75:
          tmpMessage = "تعداد دفعات ورود رمزغلط بیش از حدمجاز است"
          break
        case 76:
          tmpMessage = "مبلغ انتقال داده شده معتبر نیست "
          break
        case 77:
          tmpMessage = "روز مالي تراکنش نا معتبر است یا مهلت زمان ارسال اصالحیه به پایان رس یده است"
          break
        case 78:
          tmpMessage = "کارت فعال نیست "
          break
        case 79:
          tmpMessage = "حساب متصل به کارت نا معتبر است یا دارای اشکال است"
          break
        case 80:
          tmpMessage = "درخواست تراکنش رد شده است"
          break
        case 81:
          tmpMessage = "کارت پذیرفته نشد ) اختصاصي SLM )"
          break
        case 82:
          tmpMessage = "پیام تایید از دستگاه خود پرداز دریافت نشده است ) اختصاصي SLm )"
          break
        case 83:
          tmpMessage = "سرویس گر سوئیچ کارت تراکنش را نپذیرفته استد"
          break
        case 84:
          tmpMessage = "در تراکنشهایي که انجام آن مستلزم ارتباط با صادر کننده است در صورت فعال نبودن صادر کننده این پیام در پاسخ ارسال خواهدشد"
          break
        case 85:
          tmpMessage = "پردازش گر و یا مبدا انجام تراکنش معتبر نیست"
          break
        case 86:
          tmpMessage = "تراکنش درخواستي برای بخش سخت افزاری درخواست شده از آن قابل قبول نیست "
          break
        case 87:
          tmpMessage = "سیستم در تبادل کلید رمز دچار مشکل شده است ) کد پاسخ اختصاصي SLM "
          break
        case 88:
          tmpMessage = "سیستم در تبادل کلید MAC دچار مشکل شده است"
          break
        case 89:
          tmpMessage = "عدم تایید تراکنش توسط سوئیچ خارجي ) کد پاسخ اختصاصي SLM )"
          break
        case 90:
          tmpMessage = "سامانه مقصد تراکنش درحال انجام عملیات پایان روز مي باشد"
          break
        case 91:
          tmpMessage = "سامانه مقصد تراکنش درحال انجام عملیات پایان روز مي باشد"
          break
        case 92:
          tmpMessage = "مقصد تراکنش پیدا نشد"
          break
        case 93:
          tmpMessage = "امکان تکمیل تراکنش وجود ندارد"
          break
        case 94:
          tmpMessage = "ارسال تکراری تراکنش بوجود آمده است "
          break
        case 95:
          tmpMessage = "در عملیات مغایرت گیری ترمینال اشکال رخ داده است"
          break
        case 96:
          tmpMessage = "اشکال در عملکرد سیستم "
          break
        case 97:
          tmpMessage = "تراکنش از سوی صادرکننده کارت رد شده است "
          break
        case 99:
          tmpMessage = "خطای صادر کنندگي"
          break
        default:
          tmpMessage = "مسیر ارتباطی با دستگاه پوز مشکل دارد"
      }
      this.showError(tmpMessage)
    },
    confirmFicheViaPose_Melli (response, eumDutyType, payablePrice, NidFiche) {
      if (response.ResponseCode === "00") {
        this.showSuccess(
          "فیش مربوطه با موفقیت پرداخت شد, منتظر تایید در سرا می باشد"
        )
        let data = {
          pGidPoseFicheHistory: this._GIDPoseFicheHistory,
          pMerchantNo: response.MerchantId,
          pTerminalNo: response.TerminalId,
          pSwitchDate: response.TransactionDate,
          pSwitchTime: response.TransactionTime,
          pTraceNo: response.TransactionNo,
          pRefNo: response.Rrn,
          pCardNo: response.CardNo,
          pIsSucceed: "1",
          pComment: "با موفقیت پرداخت شد"
        }
        this.$services.SB.updateLogPose(data, {
          config: { District: this.baseNosaziCode?.District || this.selectedNosaziCodeDistrict }
        })
          .then(({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
              if (eumDutyType === 1 || eumDutyType === 2) {
                this.confirmFicheDuty({
                  PNidProc: "00000000-0000-0000-0000-000000000000",
                  pDutyFiche: this.tmpPoseConfirmFiche,
                  PDutyType: eumDutyType,
                  pConfirmBankCode: "0",
                  pPaymentRahgiriCode: response.TransactionNo,
                  pPaymentReferenceNo: response.Rrn,
                  pPaymentDate: response.TransactionDate,
                  pBankConfirmPrice:
                    payablePrice !== null
                      ? payablePrice
                      : 0,
                  pEumDutyPaymentType: 2,
                  pEumFicheConfirmMethode: 14,
                  pSetPayOffForConfirmYearly:
                    ClsCommon.DutySetting.SetPayOffForConfirmYearly, // read from nosaziSetting after name correction
                  pSetPayOffForConfirmCollective:
                    ClsCommon.DutySetting.SetPayOffForConfirmCollective,
                  pSetPayOffForConfirmTaghsit:
                    ClsCommon.DutySetting.SetPayOffForConfirmTaghsit,
                  pIsCancelOtherFiche:
                    ClsCommon.DutySetting.IsCanceldFichesInConfirm,
                  pIsShowAccountingError:
                    ClsCommon.DutySetting.IsShowAccountingSystemError
                })
              } else if (eumDutyType === 7) {
                this.generalIncomeFicheConfirm({
                  PaymentBank: this.getBankName,
                  EumFicheConfirmMethode: 14,
                  NidFiche: NidFiche,
                  PaymentDate: currentDate()
                })
              } else {
                this.confirmFicheIncome({
                  EumIncomePaymentType: 2,
                  EumFicheConfirmMethode: 14,
                  NidFiche: NidFiche,
                  PaymentBank: this.getBankName,
                  PaymentDate: currentDate(),
                  PaymentRahgiriCode: response.TransactionNo,
                  PaymentReferenceNo: response.Rrn
                })
              }
            } else {
              let htmlMsg = ""
              res.errors.forEach((error) => {
                htmlMsg += `<li>${error.text}</li>`
              })
              this.showError(htmlMsg)
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showMelliSwitchError(response)
      }
    }
  }
}
