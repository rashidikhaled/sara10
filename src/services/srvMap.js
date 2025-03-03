import createInstance, { getFromConfig } from "./baseService"

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = "srvMapUrl"

// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) =>
  getFromConfig(serviceName, 1, false)
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createInstance({
  getBaseUrl,
  serviceName,
  headers: {},
  requestCallback: null, // (axiosConfig) => axiosConfig
  responseCallback: null, // (axiosResponse) => new Response
  encryption: true
})
// **** Request Configuration ****

// ====================================== Create Instance ======================================

export const QuickSearch = createPostRequest("SearchQuick")
export const MapFind2 = createPostRequest("MapFind2")
