import axios from 'axios'
import ApiResult from '../ApiResult'

export default class Saman {
  constructor () {
    this.serverMessage = ''
    this.responseDate = null
  }
  static async fetchToken () {
    let tokenServiceAddress = "https://idn.seppay.ir/connect/token"
    // const payload = 'grant_type=password&username=TestUser&password=@Sep123456&scope=SepCentralPcPos openid'
    const payload = 'grant_type=password&username=safa-samankish&password=@Sep123456&scope=SepCentralPcPos openid'
    const { data } = await axios.post(tokenServiceAddress, payload, {
      headers: {
        contentType: 'application/x-www-form-urlencoded',
        Authorization: 'Basic cm9jbGllbnQ6c2VjcmV0',
        Cookie: "SEP=!7uUUjTcAXVOEfsyjrexIyQkGJtek/BGDUmyFed2hZojybNZeyDhy8C/jgsJsWhiTXvTeQYQvKLbCbA==; SEP01b9f342=01dbf0fb1633d46b728a750e75a840fa7567217cf1d82abfa52b2ef0dc30e816a9ece5ef497fa74924579b8fa55c1c40d3e7023237d1375e4ae73c8193b2269b00a9acf69f"
      },
      withCredentials: true,
      crossDomain: true,
      timeout: 120 * 1000
    })
    if (data) {
      return data
    }
  }
  static fetchInquery ({ serviceAddress, TerminalId, RRN, CancelPendingRequest, ResNum, Identifier }, token) { // سرویس استعلام تراکنش
    const payload = {
      TerminalId, // اجباری
      RRN,
      ResNum,
      Identifier,
      CancelPendingRequest
    }
    return new Promise((resolve, reject) => {
      axios.post(serviceAddress, payload, {
        headers: {
          Authorization: token
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 1000
      }).then(({ data }) => {
        let jsonResponse = JSON.parse(data)
        if (jsonResponse) {
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
              new Error(data.error || 'خطا')
            ],
            msg: data.error
          }))
        }
      })
    })
  }
  static async SamanKishBillPayment ({ TerminalID, BillID, PayID, ServiceAddress }) {
    this.terminalID = TerminalID
    this.billID = BillID
    this.payID = PayID
    this.reciveIdentifierServiceAddress = ServiceAddress + "/v1/PcPosTransaction/ReciveIdentifier"
    this.startPaymentServiceAddress = ServiceAddress + "/v1/PcPosTransaction/StartPayment"
    const data = await this.fetchToken()
    this.authorizationToken = `bearer ${data.access_token}`
    return new Promise((resolve, reject) => {
      axios.post(this.reciveIdentifierServiceAddress, {}, {
        headers: {
          contentType: 'application/json',
          Authorization: this.authorizationToken
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 1000
      }).then(({ data }) => {
        let jsonResponse = data
        let identifier = jsonResponse.Data.Identifier
        const payload = {}
        //   {
        //     "TerminalID": "31142598",
        //     "AccountType": 0,
        //     "ResNum": "654321",
        //     "Identifier": "2e941fae-7498-4f0e-9847-d3aa80774a90",
        //     "userNotifiable": {
        //         "FooterMessage": null,
        //         "PrintItems": [
        //             {
        //                 "Item": null,
        //                 "Value": null,
        //                 "Alignment": 0,
        //                 "ReceiptType": 0
        //             }
        //         ]
        //     },
        //     "TransactionType": 1,
        //     "BillID": "1100646160667",
        //     "PayID": "1002269"
        // }
        payload.TerminalID = this.terminalID
        payload.BillID = this.billID
        payload.PayID = this.payID
        payload.AccountType = 0 // نوع خرید عادی
        payload.ResNum = null
        payload.Identifier = identifier
        payload.TransactionType = 1 // پرداخت قبض Purchase:0 Bill:1 PurchaseID:2
        payload.userNotifiable = {
          FooterMessage: null,
          PrintItems: [
            {
              Item: null,
              Value: null,
              Alignment: 0,
              ReceiptType: 0 // چاپ هم رسید پذیرنده-رسید مشتری
            }
          ]
        }
        axios.post(this.startPaymentServiceAddress, payload, {
          headers: {
            contentType: 'application/json',
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
    })
  }

  static async SamanKishPurchaseSingle ({ TotalAmount, TerminalId, ServiceAddress }) {
    this.terminalID = TerminalId
    this.totalAmount = TotalAmount
    this.reciveIdentifierServiceAddress = ServiceAddress + "/v1/PcPosTransaction/ReciveIdentifier"
    this.startPaymentServiceAddress = ServiceAddress + "/v1/PcPosTransaction/StartPayment"
    const data = await this.fetchToken()
    this.authorizationToken = `bearer ${data.access_token}`
    return new Promise((resolve, reject) => {
      axios.post(this.reciveIdentifierServiceAddress, {}, {
        headers: {
          contentType: 'application/json',
          Authorization: this.authorizationToken
        },
        withCredentials: true,
        crossDomain: true,
        timeout: 120 * 1000
      }).then(({ data }) => {
        let jsonResponse = data
        let identifier = jsonResponse.Data.Identifier
        const payload = {}
        payload.TerminalID = this.terminalID
        payload.AccountType = 0 // نوع خرید عادی
        payload.Additional = null
        payload.ResNum = null
        payload.Identifier = identifier
        payload.TotalAmount = this.totalAmount
        payload.Amont_Iban = this.totalAmount
        payload.Amount = this.totalAmount
        payload.TransactionType = 2 // پرداخت قبض Purchase:0 Bill:1 PurchaseID:2
        payload.userNotifiable = {
          FooterMessage: null,
          PrintItems: [
            {
              Item: "عنوان",
              Value: "مقدار",
              Alignment: 0,
              ReceiptType: 2 // چاپ هم رسید پذیرنده-رسید مشتری
            }
          ]
        }
        axios.post(this.startPaymentServiceAddress, payload, {
          headers: {
            contentType: 'application/json',
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
            })).catch(error => {
              return reject(new ApiResult({
                status: 400,
                data: error.response.data,
                errors: [
                  new Error(error || 'خطا')
                ],
                msg: error
              }))
            })
          }
        })
      })
    })
  }
  static async SamanKishPurchaseSSp ({ TotalAmount, TerminalId, POSIp, ServerPort }) {
    try {
      await this.initializeSignalR()
      this.terminalID = TerminalId
      this.totalAmount = TotalAmount
      this.txtIp = POSIp
      this.port = ServerPort
      this.serverMessage = ''
      this.responseData = null

      this.signalRHub.client.GetSystemResponse = (message) => {
        this.serverMessage = message
      }

      this.signalRHub.client.GetTransactionResponse = (TerminalId, ResponseCode, SerialId, RRN, ResponseDescription, TxnDate, Amount, CardNumberMask) => {
        this.responseData = { TerminalId, ResponseCode, SerialId, RRN, ResponseDescription, TxnDate, Amount, CardNumberMask }
      }

      await this.startSignalRConnection()

      return new Promise((resolve, reject) => {
        this.signalRHub.server.Initial(
          '1', // MediaType
          this.txtIp,
          this.port,
          '0', // AccountType
          '0', // Language
          '0'
        )

        setTimeout(() => {
          if (this.serverMessage === '0') {
            this.signalRHub.server.SendAmount1Step(
              this.totalAmount,
              null,
              '',
              '',
              null,
              this.terminalID
            )
            console.log("please swipe card...")

            // Wait for the response data to be filled
            const checkResponseData = () => {
              if (this.responseData) {
                resolve(new ApiResult({
                  status: 200,
                  data: this.responseData,
                  errors: [],
                  msg: ''
                }))
              } else {
                setTimeout(checkResponseData, 100) // Check every 100ms
              }
            }
            checkResponseData()
          } else {
            console.log("error in initialization")
            reject({
              status: 400,
              data: this.responseData,
              errors: [
                new Error(this.responseData?.ResponseDescription || 'خطا')
              ],
              msg: this.responseData?.ResponseDescription
            })
          }
        }, 1000) // 1 second delay
      })
    } catch (error) {
      console.log('Error in SamanKishPurchaseSSp:', error)
      throw error
    }
  }
  static async readyForBillPaymentRequest () {
    this.signalRHub.server.Initial(
      '1', // MediaType
      this.txtIp,
      this.port,
      '0', // AccountType
      '0', // Language
      '0'
    )
    setTimeout(() => {
      if (this.serverMessage === '0') {
        this.signalRHub.server.Request("1")
      } else {
        console.log("error in readyForBillPaymentRequest")
      }
    }, 1000) // 1 second delay
  }
  static async SamanKishBillPaymentSSp ({ POSIp, ServerPort, BillID, PayID }) {
    try {
      await this.initializeSignalR()
      this.txtIp = POSIp
      this.port = ServerPort
      this.serverMessage = ''
      this.responseData = null
      this.billID = BillID
      this.payID = PayID

      this.signalRHub.client.GetSystemResponse = (message) => {
        this.serverMessage = message
      }

      this.signalRHub.client.GetTransactionResponse = (TerminalId, ResponseCode, SerialId, RRN, ResponseDescription, TxnDate, Amount, CardNumberMask) => {
        this.responseData = { TerminalId, ResponseCode, SerialId, RRN, ResponseDescription, TxnDate, Amount, CardNumberMask }
      }

      await this.startSignalRConnection()
      // await this.readyForBillPaymentRequest()
      return new Promise((resolve, reject) => {
        this.signalRHub.server.Initial(
          '1', // MediaType
          this.txtIp,
          this.port,
          '0', // AccountType
          '0', // Language
          '0'
        )

        setTimeout(() => {
          if (this.serverMessage === '0') {
            this.signalRHub.server.Bill(
              this.billID,
              this.payID,
              '',
              ''
            )
            console.log("please swipe card...")

            // Wait for the response data to be filled
            const checkResponseData = () => {
              if (this.responseData) {
                resolve(new ApiResult({
                  status: 200,
                  data: this.responseData,
                  errors: [],
                  msg: ''
                }))
              } else {
                setTimeout(checkResponseData, 100) // Check every 100ms
              }
            }
            checkResponseData()
          } else {
            console.log("error in initialization")
            reject({
              status: 400,
              data: this.responseData,
              errors: [
                new Error(this.responseData?.ResponseDescription || 'خطا')
              ],
              msg: this.responseData?.ResponseDescription
            })
          }
        }, 1000) // 1 second delay
      })
    } catch (error) {
      console.log('Error in SamanKishPurchaseSSp:', error)
      throw error
    }
  }
  static async loadSignalR () {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = "signalR/Scripts/jquery.signalR-2.2.2.min.js"
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  static async initializeSignalR () {
    await this.loadSignalR()
    return new Promise((resolve, reject) => {
      const hubScript = document.createElement('script')
      hubScript.src = "http://localhost:8080/signalr/hubs"
      document.head.appendChild(hubScript)
      hubScript.onload = () => {
        window.$.connection.hub.url = "http://localhost:8080/signalr"
        this.signalRHub = window.$.connection.SSP1126HUB
        resolve()
      }
      hubScript.onerror = reject
    })
  }

  static async startSignalRConnection () {
    return new Promise((resolve, reject) => {
      window.$.connection.hub.start()
        .done(() => {
          resolve()
        })
        .fail((error) => {
          reject(error)
        })
    })
  }
}
