import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'FireService'

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

export const getVisitorList = createPostRequest('/GetVisitor_List')
export const saveVisitorInfo = createPostRequest('/SaveVisitor_Info')
export const getRevisitInfo = createPostRequest('/GetRevisit_Info')
export const getRevisitList = createPostRequest('/GetRevisit_List')
export const getShopParvandeh = createPostRequest('/GetShop_Parvandeh')
export const getRequestInfo = createPostRequest('/GetRequest_Info')
export const saveRequestInfo = createPostRequest('/SaveRequest_Info')
export const saveRevisitInfo = createPostRequest('/SaveRevisit_Info')

export const getActiveJobListParvandeh = createPostRequest('/GetActiveJobList_Parvandeh')
export const saveShopParvandeh = createPostRequest('/SaveShop_Parvandeh')
export const getChildrenHasAnyJob = createPostRequest('/GetChildrenHasAnyJob')

export const getSettingRevisit = createPostRequest('/GetSetting_Revisit')
export const saveSettingRevisit = createPostRequest('/SaveSetting_Revisit')

export const getSettingPayment = createPostRequest('/GetSetting_Payment')
export const saveSettingPayment = createPostRequest('/SaveSetting_Payment')

export const getCiVisitor = createPostRequest('/GetCI_Visitor')
export const saveCiVisitor = createPostRequest('/SaveCI_Visitor')
