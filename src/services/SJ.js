import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'SJ'

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

export const getViolationRequest = createPostRequest('GetViolationRequest')
export const saveViolation = createPostRequest('SaveViolation')
export const getAllViolationRequest = createPostRequest('GetAllViolationRequest')
export const saveViolationRequest = createPostRequest('SaveViolationRequest')
export const getViolationRequestOld = createPostRequest('GetViolationRequestOld')
export const getOldViolationVoteByJob = createPostRequest('GetOldViolationVoteByJob')
