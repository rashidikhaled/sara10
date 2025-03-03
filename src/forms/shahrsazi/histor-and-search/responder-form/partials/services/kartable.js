import createService from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'workflow'

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

export const getTaskByUser = createPostRequest('GetTaskByUser')
export const getMentionsByNidUser = createPostRequest('GetMentionsByNidUser')
export const getAllNodeTitle = createPostRequest('GetAllNodeTitle')
export const getAllWorkflowTitle = createPostRequest('GetAllWorkflowTitle')
export const getUrg = createPostRequest('GetUrg') // create session for user
