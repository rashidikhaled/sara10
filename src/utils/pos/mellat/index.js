import axios from 'axios'
import ApiResult from '../ApiResult'

export default class Mellat {
  static async loadMellatPOSPurchase ({ AddressUrl, Amount, PayerId }) {
    this.addressUrl = AddressUrl
    this.amount = Amount
    this.payerId = PayerId
    return new Promise((resolve, reject) => {
      const payload = {}
      payload.PayerId = this.payerId
      payload.Amount = this.amount
      payload.ServiceCode = "1"
      payload.PcID = "1234"
      axios.post(this.addressUrl, payload, {
        headers: {
          contentType: 'application/json'
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 3000
      }).then(({ data }) => {
        if (data) {
          // [data.PcPosStatus, data.TerminalId, data.Rrn, data.ApprovalCode, data.TransactionDate, data.TransactionTime, data.ResponseCode, data.Amount];
          return resolve(new ApiResult({
            status: 200,
            data,
            errors: [],
            msg: ''
          }))
        } else {
          return reject(new ApiResult({
            status: 500,
            data,
            errors: [
              new Error(data.OptionalField || data.PcPosStatus || 'خطا')
            ],
            msg: data.OptionalField || data.PcPosStatus
          }))
        }
      })
    })
  }
  /* پرداخت قبض */
  static async loadMellatPOSBill ({ AddressUrl, Amount, PayerId, BillID }) {
    this.addressUrl = AddressUrl
    this.amount = Amount
    this.billID = BillID
    this.payerId = PayerId
    return new Promise((resolve, reject) => {
      const payload = {}
      payload.PayID = this.payerId
      payload.BillID = this.billID
      payload.Amount = this.amount
      payload.ServiceCode = "5"
      payload.PcID = "1234"
      axios.post(this.addressUrl, payload, {
        headers: {
          contentType: 'application/json'
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 3000
      }).then(({ data }) => {
        if (data) {
          // [data.PcPosStatus, data.TerminalId, data.Rrn, data.ApprovalCode, data.TransactionDate, data.TransactionTime, data.ResponseCode, data.Amount];
          return resolve(new ApiResult({
            status: 200,
            data,
            errors: [],
            msg: ''
          }))
        } else {
          return reject(new ApiResult({
            status: 500,
            data,
            errors: [
              new Error(data.OptionalField || data.PcPosStatus || 'خطا')
            ],
            msg: data.OptionalField || data.PcPosStatus
          }))
        }
      })
    })
  }

  /* پرداخت قبض */
  static async LoadMellatMultiplePurchase ({ AddressUrl, TotalAmount, RequestList, BillID }) {
    this.addressUrl = AddressUrl
    this.totalAmount = TotalAmount
    let validList = RequestList.replace(/([{,]\s*)"?(AccountID|Amount|PayerID)"?\s*:\s*(\d+)/g, '$1"$2":"$3"')
    this.requestList = JSON.parse(validList)
    return new Promise((resolve, reject) => {
      const payload = {}
      payload.ServiceCode = "4"
      payload.PcID = "1234"
      payload.PrintDetail = "1234"
      payload.TotalAmount = this.totalAmount
      payload.RequestList = this.requestList
      axios.post(this.addressUrl, payload, {
        headers: {
          contentType: 'application/json'
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 3000
      }).then(({ data }) => {
        if (data.succsess) {
          // [data.PcPosStatus, data.TerminalId, data.Rrn, data.ApprovalCode, data.TransactionDate, data.TransactionTime, data.ResponseCode, data.Amount];
          return resolve(new ApiResult({
            status: 200,
            data,
            errors: [],
            msg: ''
          }))
        } else {
          return reject(new ApiResult({
            status: 500,
            data,
            errors: [
              new Error(data.OptionalField || data.PcPosStatus || 'خطا')
            ],
            msg: data.OptionalField || data.PcPosStatus
          }))
        }
      })
    })
  }
}
