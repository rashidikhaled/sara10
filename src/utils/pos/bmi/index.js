/* eslint-disable no-unused-expressions */
import axios from 'axios'
import ApiResult from '../ApiResult'

export default class Bmi {
  static async billPayment ({ BillId, DevicePort, PayId, DeviceIp, ServiceUrl }) {
    const payload = {}
    payload.DeviceIp = DeviceIp
    payload.DevicePort = DevicePort
    payload.ConnectionType = "Lan"
    payload.BillId = BillId
    payload.PayId = PayId

    this.ServiceAddress = ServiceUrl + "/api/BillPayment"
    return new Promise((resolve, reject) => {
      axios.post(this.ServiceAddress, payload, {
        headers: {
          contentType: 'application/json'
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
            msg: data.PcPosStatus
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

  static async paymentPurchase ({ MerchantId, TerminalId, DevicePort, MultiMerchant, Amount, DeviceIp, ServiceUrl, DivideType }) {
    const payload = {}
    payload.DeviceIp = DeviceIp
    payload.DevicePort = DevicePort
    payload.ConnectionType = "Lan"
    // payload.MultiMerchant = MultiMerchant
    payload.TerminalId = TerminalId
    payload.MerchantId = MerchantId
    payload.Amount = Amount
    payload.DivideType = DivideType //  مقدار DevideType مقدارهای 3 )تقسیم درصدی( و 4 )تقسیم مبلغی( می تواند باشد.
    this.ServiceAddress = ServiceUrl + "/api/Sale"
    return new Promise((resolve, reject) => {
      axios.post(this.ServiceAddress, payload, {
        headers: {
          contentType: 'application/json'
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
            msg: data.PcPosStatus
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
