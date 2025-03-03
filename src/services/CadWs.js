import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'CadWs'

// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) => getFromConfig(serviceName, District, true)
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createInstance({
  getBaseUrl,
  serviceName,
  headers: {},
  requestCallback: null, // (axiosConfig) => axiosConfig
  responseCallback: null // (axiosResponse) => new Response
})
// **** Request Configuration ****

// ====================================== Create Instance ======================================

export const getAllGroup = createPostRequest('/GetAllGroup')
export const getAllFiles = createPostRequest('/GetAllFiles')
export const saveDWGFile = createPostRequest('/SaveDWGFile')
export const saveDWG = createPostRequest('/SaveDWG')
export const saveDWGJson = createPostRequest('/SaveDWGJson')
