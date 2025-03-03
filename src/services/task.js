import endpoints from 'src/config/endpoints'
import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'task'

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

export const addWorkItem = createPostRequest(endpoints.task.addWorkItem)
export const getProcessInfo = createPostRequest(endpoints.task.getProcessInfo)
export const interactive = createPostRequest(endpoints.task.interactive)
export const createTask = createPostRequest(endpoints.task.createTask)
export const GetProcessInfo = createPostRequest(`GetProcessInfo`)
