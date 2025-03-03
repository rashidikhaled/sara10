import axios from 'axios'
import ApiResult from '../ApiResult'

export default class PostBank {
  // file: MelliBankPos.js (completed)
  static async ParsianPosPayment ({ ServiceUrl, BillID, PaymentID }) {
    this.serviceUrl = ServiceUrl
    this.billID = BillID
    this.paymentID = PaymentID
    return new Promise((resolve, reject) => {
      const payload = {}
      payload.PR = "000000"
      payload.AM = "1234"
      payload.CU = "364"
      payload.R1 = "تست"
      payload.R2 = "تست"
      payload.T1 = "تست"
      payload.T2 = "تست"
      payload.SV = this.billID
      payload.SG = this.paymentID
      payload.AD = ""
      payload.PD = "1"
      payload.ST = ("1 = 500, 2 = 500").split(",")
      payload.AV = ("تت = 23, بب = 27, کک = 28").split(",")
      axios.post(this.serviceUrl, payload, {
        headers: {
          contentType: 'application/json; charset=utf-8'
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 1000
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
