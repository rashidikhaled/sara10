import createInstance, { getFromConfig } from "../services/baseService"

let url = 'SC'
const { createPostRequest } = createInstance({
  getBaseUrl: () => getFromConfig(url, 1, true),
  serviceName: 'serviceUrl',
  headers: {},
  requestCallback: null, // (axiosConfig) => axiosConfig
  responseCallback: null // (axiosResponse) => new Response
}, { District: 1 })

export default class ADPRepository {
  static queues = []
  static datasource = {}
  static callbacks = {}

  static matchItem (value) {
    return item => Object.keys(item).find(field => `${item[field]}` === `${value}`)
  }

  static getTitle (key, value, cb) {
    this.get(key, list => {
      const exist = list.find(this.matchItem(value))
      cb((exist && exist.Title) || value)
    })
  }

  static getTitleIfExist (key, value) {
    if (this.datasource[key]) {
      const list = this.datasource[key]
      const exist = list.find(this.matchItem(value))
      return (exist && exist.Title) || value
    } else {
      this.get(key, (list) => {
      })
    }
    return value
  }

  static getItem (key, value, cb) {
    this.get(key, list => {
      const exist = list.find(this.matchItem(value))
      cb(exist)
    })
  }

  static getItemIfExist (key, value) {
    if (this.datasource[key]) {
      const list = this.datasource[key]
      const exist = list.find(this.matchItem(value))
      return exist || null
    } else {
      this.get(key, (list) => {

      })
    }
  }

  // key: groupField_serviceUrl_responseKey_paramName
  // 'groupField': 'CI_UsingGroup',
  // 'serviceUrl': 'GetCI_UsingType_FromCI_UsingGroup',
  // 'responseKey': 'CI_UsingType_FromCI_UsingGroup',
  // 'paramName': 'pCI_UsingGroup',
  // 'value': 123,  group value
  static async get (key, cb) {
    if (this.datasource[key]) return cb && cb(this.datasource[key])

    if (!this.callbacks[key]) this.callbacks[key] = []
    this.callbacks[key].push(cb)

    if (!this.queues.includes(key)) {
      this.queues.push(key)

      // eslint-disable-next-line no-unused-vars
      const [groupField, serviceUrl, responseKey, paramName, value, serviceKey] = key.split('__')

      /* let baseUrl = window.getConfigValue('SC.1')

      if (serviceKey) {
        // example: serviceKey = 'eng'
        // example: serviceKey = 'engineers'
        baseUrl = window.getConfigValue(serviceKey).split('/json')[0]
      } */

      // url = serviceKey ? getFromConfig(serviceKey, 1, true) : serviceUrl
      // const { data } = await createPostRequest(url)({ [paramName]: Number(value) })
      url = serviceKey || 'SC'
      const { data } = await createPostRequest(serviceUrl)({ [paramName]: Number(value) })

      const list = data[responseKey] || []
      this.datasource[key] = list
      this.callbacks[key].forEach(cb => cb && cb(list))
      delete this.queues[key]
      delete this.callbacks[key]

      return list

      // if (serviceKey === 'eng') {
      //   const baseUrl = window.getConfigValue('eng')
      //   return request.post(appendUrls([baseUrl, '/json', serviceUrl]), {
      //     [paramName]: Number(value)
      //   }, { config: { District: 1 } })
      //     .then(({ data }) => {
      //       const list = Object.values(data)[0][responseKey]
      //       this.datasource[key] = list
      //       this.callbacks[key].forEach(cb => cb && cb(list))
      //       delete this.queues[key]
      //       delete this.callbacks[key]
      //     })
      // }

      /*  return request.post(appendUrls([baseUrl, '/json', serviceUrl]), {
         [paramName]: Number(value)
       }, { config: { District: 1 } })
         .then(({ data }) => {
           const list = data[responseKey] || []
           this.datasource[key] = list
           this.callbacks[key].forEach(cb => cb && cb(list))
           delete this.queues[key]
           delete this.callbacks[key]
         }) */

      // } else {
      //   const baseUrl = window.getConfigValue('SC')[1]
      //   /* if (!baseUrl) {
      //   return Promise.reject(`آدرس سرویس SC برای منطقه ${District} تعریف نشده است`)
      // } */
      //   return request.post(appendUrls([baseUrl, '/json', serviceUrl]), {
      //     [paramName]: Number(value)
      //   }, { config: { District: 1 } })
      //     .then(({ data }) => {
      //       const list = data[responseKey] || []
      //       this.datasource[key] = list
      //       this.callbacks[key].forEach(cb => cb && cb(list))
      //       delete this.queues[key]
      //       delete this.callbacks[key]
      //     })
      // }
    }
  }
}
