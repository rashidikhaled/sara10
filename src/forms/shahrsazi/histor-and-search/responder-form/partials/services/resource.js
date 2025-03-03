import createService from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'securityBaseUrl'

// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) => window.getConfigValue(serviceName)
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createService({
  getBaseUrl,
  serviceName,
  headers: {},
  requestCallback: null, // (axiosConfig) => axiosConfig
  responseCallback: null // (axiosResponse) => new Response
})

export const addResource = createPostRequest('workspace/add-resource')
export const getPermission = createPostRequest('form/get-permission')
