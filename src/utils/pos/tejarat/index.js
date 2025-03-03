import axios from 'axios'
import ApiResult from '../ApiResult'

export default class Tejarat {
  static async fetchToken () {
    debugger
    let tokenServiceAddress = "https://pgwservices.pec.ir/AuhtApi/Access/GetToken"
    const authParams = `${"kiamehr.hosseini@gmail.com"}|${"Ym775@"}`
    const bytes = new TextEncoder().encode(authParams)
    const encodedAuthParams = btoa(String.fromCharCode(...bytes))
    const headers = {
      'Authorization': `Basic ${encodedAuthParams}`,
      'apiVersion': '1.0',
      'Content-Type': 'application/json'
    }
    try {
      const { data } = await axios.post(tokenServiceAddress, {}, { headers })
      if (data) {
        return data.Data
      }
    } catch (error) {
      console.log(error)
    }
  }
  // file: MelliBankPos.js (completed)
  static async sendPaymentRequest ({ TransactionType, IBN = null, TerminalId, AdditionalData = null, BillID, PaymentId, Amount }) {
    const baseAddressUri = "https://pgwservices.pec.ir/TciApi/Payment/SendPaymentRequestParsian"
    const data = await this.fetchToken()
    const payload = {}
    payload.TransactionType = TransactionType //  خرید 1- قبض 2
    payload.TerminalId = parseInt(TerminalId) || 0
    payload.Amount = Amount
    if (TransactionType === 2) {
      payload.BillID = BillID
      payload.PaymentId = PaymentId
      payload.IBN = IBN
    } else {
      payload.BillID = ""
      payload.PaymentId = ""
    }
    payload.AdditionalData = AdditionalData
    payload.messageList = [
      { "Title": "خرید شناسه دار", "body": "خرید" },
      { "Title": "اطلاعات کارت", "body": "کارت معتبر است" }
    ]

    this.authorizationToken = `Bearer ${data.Token}`
    return new Promise((resolve, reject) => {
      axios.post(baseAddressUri, payload, {
        headers: {
          contentType: 'application/json',
          apiVersion: '1.0',
          Authorization: this.authorizationToken
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 1000
      }).then(({ data }) => {
        if (data) {
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
      }).catch(error => {
        return reject(new ApiResult({
          status: 400,
          data: error.response.data,
          errors: [
            new Error(error || 'خطا')
          ],
          msg: error
        }))
      })
    })
  }
}
