import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'SX'

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

export const getConvertHistory = createPostRequest('GetConvertHistory')
export const getConvertRequest = createPostRequest('GetConvertRequest')
export const getWorkflowInstanceList = createPostRequest('GetWorkflowInstanceList')
export const saveConvertRequest = createPostRequest('SaveConvertRequest')
export const updateProcInitiatorGroup = createPostRequest('UpdateProcInitiatorGroup')
export const updateProcInitiator = createPostRequest('UpdateProcInitiator')
export const getWorkflowInstanceListForAsignToUser = createPostRequest('GetWorkflowInstanceListForAsignToUser')
export const getShTemporaryKartabl = createPostRequest('GetSh_TemporaryKartabl')
