import axios from 'axios'
import ApiResult from '../ApiResult'

export default class Irankish {
  // file: MelliBankPos.js (completed)
  static async iranKishPurchasePayment ({ SerialNo, TerminalId, AcceptorId, IPAddress, Port, apiUrl, payablePrice }) {
    this.serialNo = SerialNo
    this.terminalId = TerminalId
    this.acceptorId = AcceptorId
    this.iPAddress = IPAddress
    this.port = Port
    this.initiateServiceUrl = apiUrl + "InitiateService1"
    this.saleUrl = apiUrl + "Sale"
    this.payablePrice = payablePrice

    return new Promise((resolve, reject) => {
      const payload = {}
      //   "SerialNo":"' + SerialNo + '", "AcceptorId": "' + AcceptorId + '", "TerminalId":"' + TerminalId + '", "IPAddress":"' + IPAddress + '","Port":"' + Port + '","IsTCP":true
      payload.SerialNo = this.serialNo
      payload.TerminalId = this.terminalId
      payload.AcceptorId = this.acceptorId
      payload.IPAddress = this.iPAddress
      payload.Port = this.port
      payload.IsTCP = true

      axios.post(this.initiateServiceUrl, payload, {
        headers: {
          contentType: 'application/json'
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 1000
      }).then((data) => {
        if (data) {
          const payload = {}
          payload.Amount = this.payablePrice
          axios.post(this.saleUrl, payload, {
            headers: {
              contentType: 'application/json'
            },
            withCredentials: true,
            crossDomain: true,
            timeout: 120 * 1000
          }).then((data) => {
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
        }
      })
    })
  }
}
