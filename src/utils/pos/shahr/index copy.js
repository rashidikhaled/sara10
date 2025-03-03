import axios from 'axios'
import ApiResult from '../ApiResult'

export default class Shahr {
  static async billPayment ({ ComPort, TerminalNo, BillID, PayID, Amount }) {
    // this.pcPosUrl="" // becuse it used ActiveXObject dont hava pcPosUrl yet
    this.comPort = ComPort
    this.terminalNo = TerminalNo
    this.billID = BillID
    this.payID = PayID
    this.amount = Amount
    return new Promise((resolve, reject) => {
      var objDOM = new ActiveXObject("ComVisible.PC_POS.PC_POS")
      objDOM.Init(60, this.comPort, this.terminalNo)
      objDOM.BillPayment(parseInt(this.billID), parseInt(this.payID), this.amount
      ).then(({ data }) => {
        if (data.SwitchResponseCode === 0 && data.AppResponseCode === 0) {
          return resolve(new ApiResult({
            status: 200,
            data: {
              switchResponseCode: data.SwitchResponseCode,
              appResponseCode: data.AppResponseCode,
              terminalID: data.TerminalID,
              date: data.Date,
              time: data.Time,
              systemTraceNumber: data.SystemTraceNumber,
              paymentCode: data.PaymentCode,
              pan: data.Pan,
              isOld: data.IsOld,
              amount: data.Amount

            },
            errors: [],
            msg: ''
          }))
        } else {
          return reject(new ApiResult({
            status: 500,
            data,
            errors: [
              new Error(data.AppResponseCode || data.SwitchResponseCode || 'خطا')
            ],
            msg: data.AppResponseCode || data.SwitchResponseCode
          }))
        }
      })
    })
  }
  static async billPaymentPAX ({ ComPort, NidFiche, BillID, PayID, Mode }) {
    // this.pcPosUrl="" // becuse it used ActiveXObject dont hava pcPosUrl yet
    this.comPort = ComPort
    this.nidFiche = NidFiche
    this.billID = BillID
    this.payID = PayID
    this.mode = Mode
    return new Promise((resolve, reject) => {
      var objDOM = new ActiveXObject("PAX.PCPOS.ActiveX")
      if (this.mode === "serial") {
        objDOM.Init(this.comPort, 60)
      } else if (this.mode === "ip") {
        objDOM.InitSocket(this.comPort, 60)
      }
      objDOM.BillPayment(this.nidFiche, this.billID, this.payID, true).then(({ data }) => {
        if (data.Success === true) {
          if (data.TransactionInfo.ResponseCode === "00") {
            return resolve(new ApiResult({
              status: 200,
              data: {
                returnCode: data
              },
              errors: [],
              msg: ''
            }))
          }
        } else {
          return reject(new ApiResult({
            status: 500,
            data,
            errors: [
              new Error(data.AppResponseCode || data.SwitchResponseCode || 'خطا')
            ],
            msg: data.AppResponseCode || data.SwitchResponseCode
          }))
        }
      })
    })
  }
  static async purchasePAX ({ ComPort, NidFiche, Amount, Mode }) {
    // this.pcPosUrl="" // becuse it used ActiveXObject dont hava pcPosUrl yet
    this.comPort = ComPort
    this.nidFiche = NidFiche
    this.amount = Amount
    this.mode = Mode
    return new Promise((resolve, reject) => {
      var objDOM = new ActiveXObject("PAX.PCPOS.ActiveX")
      if (this.mode === "serial") {
        objDOM.Init(this.comPort, 60)
      } else if (this.mode === "ip") {
        objDOM.InitSocket(this.comPort, 60)
      }
      objDOM.Purchase(this.nidFiche, this.amount, true, "", "", "").then(({ data }) => {
        if (data.Success === true) {
          if (data.TransactionInfo.ResponseCode === "00") {
            return resolve(new ApiResult({
              status: 200,
              data: {
                returnCode: data
              },
              errors: [],
              msg: ''
            }))
          }
        } else {
          return reject(new ApiResult({
            status: 500,
            data,
            errors: [
              new Error(data.AppResponseCode || data.SwitchResponseCode || 'خطا')
            ],
            msg: data.AppResponseCode || data.SwitchResponseCode
          }))
        }
      })
    })
  }
}
