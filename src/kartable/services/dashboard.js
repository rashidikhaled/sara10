import createService from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'dashboard'

// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) => window.getConfigValue('dashboard.serviceUrl')
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createService({
  getBaseUrl,
  serviceName,
  headers: {},
  requestCallback: null, // (axiosConfig) => axiosConfig
  responseCallback: null // (axiosResponse) => new Response
})

export default createPostRequest
