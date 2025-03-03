import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'srvCommission'

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

export const getCommissionInfo = createPostRequest('/GetCommission_Info')
export const saveRulings = createPostRequest('/SaveRulings')
export const getBarokaf = createPostRequest('/GetBarokaf')
export const getAgreement = createPostRequest('/GetAgreement')
export const getPeace = createPostRequest('/GetPeace')
export const backToSara = createPostRequest('/BackToSara')

export const odatToSara = createPostRequest('/OdatToSara')
