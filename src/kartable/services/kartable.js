import { getStore } from "ui-security"
import createService from "./baseService"

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = "workflow"

// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) =>
  window.getConfigValue(serviceName)
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createService({
  getBaseUrl,
  serviceName,
  headers: {},
  requestBeforeCallback: (config) => {
    // console.log('req cb', config.url)
    const store = getStore()
    config.data = {
      NidUser: store.getters["authorize/userId"],
      FullName: store.getters["authorize/fullname"],
      ...(config.data || {})
    }
    if (config.url.toLowerCase().indexOf("verifyapikey") > -1) {
      delete config.headers.NidSession
      delete config.headers.token

      delete config.data.NidUser
      delete config.data.FullName
    }

    return config
  }, // (axiosConfig) => axiosConfig
  requestCallback: null, // (axiosResponse) => new Response
  responseCallback: null // (axiosResponse) => new Response
})

export const getTaskByUser = createPostRequest("GetTaskByUser")
export const getMentionsByNidUser = createPostRequest("GetMentionsByNidUser")
export const getAllNodeTitle = createPostRequest("GetAllNodeTitle")
export const getAllWorkflowTitle = createPostRequest("GetAllWorkflowTitle")
export const getWorkflowChart = createPostRequest("GetWorkflowChart")
export const getUrg = createPostRequest("GetUrg") // create session for user
