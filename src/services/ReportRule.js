import endpoints from 'src/config/endpoints'
import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'ReportRule'

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

export const envelope = createPostRequest(endpoints.ReportRule.Envelope)
export const getReportInstanceList = createPostRequest(endpoints.ReportRule.GetReportInstanceList)
