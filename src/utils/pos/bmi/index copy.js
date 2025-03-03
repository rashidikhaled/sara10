/* eslint-disable no-unused-expressions */
import axios from 'axios'
import ApiResult from '../ApiResult'

export default class Bmi {
  // file: MelliBankPos.js (completed)
  static async doPCPOS ({ connectionType, deviceIp, devicePort, amount, pcPosUrl }) {
    this.connectionType = connectionType
    this.deviceIp = deviceIp
    this.devicePort = devicePort
    this.amount = amount
    this.pcPosUrl = pcPosUrl

    return new Promise((resolve, reject) => {
      const payload = {}
      payload.ConnectionType = this.connectionType
      payload.DeviceIp = this.deviceIp
      payload.DevicePort = this.devicePort
      payload.Amount = this.amount

      axios.post(this.pcPosUrl, payload, {
        headers: {
          contentType: 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 1000
      }).then(({ data }) => {
        if (data.ResponseCode === '00') {
          // [data.PcPosStatus, data.TerminalId, data.Rrn, data.ApprovalCode, data.TransactionDate, data.TransactionTime, data.ResponseCode, data.Amount];
          return resolve(new ApiResult({
            status: 200,
            data: {
              status: data.PcPosStatus,
              terminalId: data.TerminalId,
              rRn: data.Rrn,
              approvalCode: data.ApprovalCode,
              transactionDate: data.TransactionDate,
              transactionTime: data.TransactionTime,
              responseCode: data.ResponseCode,
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
              new Error(data.OptionalField || data.PcPosStatus || 'خطا')
            ],
            msg: data.OptionalField || data.PcPosStatus
          }))
          // throw new Error(data.OptionalField || data.PcPosStatus)
          // var GetMsg = "";
          // GetMsg = data.OptionalField == "" ? data.PcPosStatus : data.OptionalField;
          // alert(GetMsg);
          //
          // if (_ObjOnPrice == 1) {
          //   var _data = null;
          //   Esup.Content.UIncome_Details.StopWaiting(GetMsg);
          // }
          // else if (_ObjOnPrice == 2) {
          //   var _data = null;
          //   Esup.Content.UDutyAllFiches_Nosazi.StopWaiting(GetMsg);
          // }
          // else if (_ObjOnPrice == 3) {
          //   var _data = null;
          //   Esup.Content.UDutyAllFiches_Senfi.StopWaiting(GetMsg);
          // }
        }
      })
    })
  }

  static async billPayment ({ ServiceUrl, DeviceIP, DevicePort, BillId, PayId }) {
    // ObjOnPrice: this param is for variant forms
    this.deviceIp = DeviceIP
    this.devicePort = DevicePort
    this.pcPosUrl = ServiceUrl
    this.billId = BillId
    this.payId = PayId

    return new Promise((resolve, reject) => {
      const payload = {}
      payload.DeviceIp = this.deviceIp
      payload.DevicePort = this.devicePort
      payload.ConnectionType = "Lan"
      payload.DeviceType = "0"
      // payload.Order== OredrID, //میتونه مقدار نداشته باشه
      payload.RetryTimeOut = "5000, 5000, 5000"
      payload.ResponseTimeout = "180000, 5000, 5000"
      payload.BillId = this.billId
      payload.PayId = this.payId
      axios.post(this.pcPosUrl, payload, {
        headers: {
          contentType: 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 1000
      }).then(({ data }) => {
        if (data.ResponseCode === '00') {
          // [data.PcPosStatus, data.TerminalId, data.Rrn, data.ApprovalCode, data.TransactionDate, data.TransactionTime, data.ResponseCode, data.Amount];
          return resolve(new ApiResult({
            status: 200,
            data: {
              amount: data.Amount,
              approvalCode: data.ApprovalCode,
              cardNo: data.CardNo,
              merchant: data.Merchant,
              orderId: data.OrderId,
              rRn: data.Rrn,
              terminalId: data.TerminalId,
              transactionDate: data.TransactionDate,
              transactionTime: data.TransactionTime,
              transactionNo: data.TransactionNo,
              responseCode: data.ResponseCode
            },
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
