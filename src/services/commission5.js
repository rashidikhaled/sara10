import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'commission5'

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

export const getAllRequest = createPostRequest('/GetAllRequest')
export const getAllCommittee = createPostRequest('/GetAllCommittee')
export const saveCommittee = createPostRequest('/SaveCommittee')
export const getADPRequestChange = createPostRequest('/GetADPRequestChange')
export const saveRequestInfo = createPostRequest('/SaveRequest_Info')
export const updateRequestInfo = createPostRequest('/UpdateRequest_Info')
export const getCommissionVotes = createPostRequest('/GetCommissionVotes')
export const saveCommissionVote = createPostRequest('/SaveCommissionVote')
export const updateCommissionVotes = createPostRequest('/UpdateCommissionVotes')
