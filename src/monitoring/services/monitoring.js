import createService from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'monitoring'
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

export const getSummary = createPostRequest('/GetSummary')
export const getMonitoringActivityDistinctColumns = createPostRequest('/GetMonitoringActivityDistinctColumns')
export const getMonitoringActivityDetail = createPostRequest('/GetMonitoringActivityDetail')
export const getMonitoringActivityDetails = createPostRequest('/GetMonitoringActivityDetails')
export const getMonitoringActivity = createPostRequest('/GetMonitoringActivity')
export const groupByField = createPostRequest('/GroupByField')
export const getTotalCount = createPostRequest('/GetTotalCount')
export const insertLog = createPostRequest('/savelog')
