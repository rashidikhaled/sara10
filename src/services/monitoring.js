import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'monitoring'
// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) => getFromConfig(serviceName, District, true)
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createInstance({
  getBaseUrl,
  serviceName,
  headers: {},
  requestCallback: null, // (axiosConfig) => axiosConfig
  responseCallback: null, // (axiosResponse) => new Response
  payloadValidation: false
})
// **** Request Configuration ****
// ====================================== Create Instance ======================================

export const getMonitoringActivityDetails = createPostRequest('/GetMonitoringActivityDetails')
export const insertLog = createPostRequest('/savelog')
