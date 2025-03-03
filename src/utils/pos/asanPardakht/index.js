import axios from 'axios'
import ApiResult from '../ApiResult'

export default class AsanPardakht {
  static async LoadAsanPardakhtPose ({ ComPort, IpPose, PayablePrice, BillID, PaymentID, TomcatService, EumPaymentType, FicheNo }) {
    this.comPort = ComPort
    this.ipPose = IpPose
    this.payablePrice = PayablePrice
    this.billID = BillID
    this.paymentID = PaymentID
    this.tomcatService = TomcatService
    this.eumPaymentType = EumPaymentType
    this.ficheNo = FicheNo
    this.tomcotAddressUrl = this.tomcatService + '/setConfig/' + this.ipPose + '/' + this.comPort
    this.billUrl = this.tomcatService + '/doBillPayment/' + this.billID + '/' + this.paymentID
    this.paymentUrl = this.tomcatService + '/doPayment/' + this.ficheNo + '/' + this.payablePrice + '/' + ''
    return new Promise((resolve, reject) => {
      axios.get(this.tomcotAddressUrl, {
        headers: {
          contentType: 'application/json'
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 1000
      }).then(() => {
        if (this.eumPaymentType === 0) {
          axios.get(this.billUrl, {
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
        } else {
          axios.post(this.paymentUrl, {
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
