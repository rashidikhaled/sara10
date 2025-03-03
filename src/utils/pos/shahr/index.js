/* eslint-disable no-undef */
import ApiResult from '../ApiResult'

export default class Shahr {
  static async doPCPOS ({ deviceIp, amount }) {
    console.log('posProtocol is: ', window.getConfigValue('posProtocol'))
    const protocol = window.getConfigValue('posProtocol', window.location.protocol)
    const params = encodeURI(
      '<cpml><command><purchase><amount>' +
      amount +
      '</amount><print>yes</print></purchase><response><status/><posinfo/><transdetails/></response></command></cpml>'
    )
    this.url = `${protocol}://${deviceIp}/manager.nuc?pid=80000000&command=00000001&param=${params}`.replaceAll('::', ':')

    return new Promise((resolve, reject) => {
      //   axios.get(this.url, {
      //     headers: {
      //       contentType: 'text/xml',
      //       'Access-Control-Allow-Credentials': true,
      //       "access-control-allow-headers": "*",
      //       "Access-Control-Allow-Origin": "*",
      //       "access-control-expose-headers": "*",
      //       "access-control-allow-methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"
      //     },
      //     withCredentials: true,
      //     crossDomain: true,
      //     timeout: 120 * 1000,
      //   }).then(({ data }) => {
      //     if (data.ResponseCode === '00') {
      //       // [data.PcPosStatus, data.TerminalId, data.Rrn, data.ApprovalCode, data.TransactionDate, data.TransactionTime, data.ResponseCode, data.Amount];
      //       return resolve(new ApiResult({
      //         status: 200,
      //         data,
      //         errors: [],
      //         msg: ''
      //       }))
      //     } else {
      //       return reject(new ApiResult({
      //         status: 500,
      //         data,
      //         errors: [
      //           new Error(data.OptionalField || data.PcPosStatus || 'خطا')
      //         ],
      //         msg: data.OptionalField || data.PcPosStatus
      //       }))
      //     }
      //   })
      console.log('doPCPOS Url:', this.url)

      this.load(this.url)
        .then((xhr) => {
          return resolve(
            new ApiResult({
              status: 200,
              data: xhr.responseXML,
              errors: [],
              msg: ''
            })
          )
          // debuggers
          // console.log('xhr', xhr);
          // var xmlDoc = xhr.responseXML;
          // alert(xhr.responseText);
          // alert(xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue);
          // alert(xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue);
        })
        .catch((ex) => {
          reject(ex)
          console.log('ex', ex)
        })
    })
  }

  static load (url) {
    return new Promise((resolve, reject) => {
      var xhr
      if (typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest()
      } else {
        var versions = [
          'MSXML2.XmlHttp.5.0',
          'MSXML2.XmlHttp.4.0',
          'MSXML2.XmlHttp.3.0',
          'MSXML2.XmlHttp.2.0',
          'Microsoft.XmlHttp'
        ]

        for (var i = 0, len = versions.length; i < len; i++) {
          try {
            xhr = new ActiveXObject(versions[i])
            break
          } catch (e) {
          }
        } // end for
      }

      xhr.onreadystatechange = ensureReadiness
      xhr.overrideMimeType('text/xml')

      function ensureReadiness () {
        // if (xhr.readyState < 4) {
        //   return
        // }

        if (xhr.status !== 200) {
          return
        }

        // all is well
        if (xhr.readyState === 4) {
          return resolve(xhr)
        }
      }

      xhr.onerror = function (e) {
        console.log(e)
        reject(e)
      }
      xhr.open('GET', url, true)
      xhr.send('')
    })
  }

  static async billPayment ({ deviceIp, BillID, PayID }) {
    console.log('posProtocol is: ', window.getConfigValue('posProtocol'))
    this.url =
      (window.getConfigValue('posProtocol') === null ? window.location.protocol : window.getConfigValue('posProtocol')) + '//' +
      deviceIp +
      '/manager.nuc?pid=80000000&command=00000001&param=' +
      encodeURI(
        '<cpml><data></data><command><billpayment><billid>' +
        BillID +
        '</billid><paymentid>' +
        PayID +
        '</paymentid><print>yes</print></billpayment><response><respid>614820</respid><status/><transdetails/><posinfo/></response></command></cpml>'
      )
    return new Promise((resolve, reject) => {
      // axios.get(this.url, {
      //   headers: {
      //     contentType: 'text/xml',
      //     'Access-Control-Allow-Credentials': true,
      //     "access-control-allow-headers": "*",
      //     "Access-Control-Allow-Origin": "*",
      //     "access-control-expose-headers": "*",
      //     "access-control-allow-methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"
      //   },
      //   withCredentials: true,
      //   crossDomain: true,
      //   timeout: 120 * 1000,
      // }).then(({ data }) => {
      //   if (data.ResponseCode === '00') {
      //     // [data.PcPosStatus, data.TerminalId, data.Rrn, data.ApprovalCode, data.TransactionDate, data.TransactionTime, data.ResponseCode, data.Amount];
      //     return resolve(new ApiResult({
      //       status: 200,
      //       data,
      //       errors: [],
      //       msg: ''
      //     }))
      //   } else {
      //     return reject(new ApiResult({
      //       status: 500,
      //       data,
      //       errors: [
      //         new Error(data.OptionalField || data.PcPosStatus || 'خطا')
      //       ],
      //       msg: data.OptionalField || data.PcPosStatus
      //     }))
      //   }
      // })

      console.log('billPayment Url:', this.url)
      this.load(this.url)
        .then((xhr) => {
          return resolve(
            new ApiResult({
              status: 200,
              data: xhr.responseXML,
              errors: [],
              msg: ''
            })
          )
          // debugger
          // console.log('xhr', xhr);
          // var xmlDoc = xhr.responseXML;
          // alert(xhr.responseText);
          // alert(xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue);
          // alert(xmlDoc.getElementsByTagName("rrn")[0].childNodes[0].nodeValue);
        })
        .catch((ex) => {
          reject(ex)
          console.log('ex', ex)
        })
    })
  }
}
