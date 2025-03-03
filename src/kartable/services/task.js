import { getStore } from 'ui-security'
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
  requestBeforeCallback: (config) => {
    // console.log('req cb', config.url)
    const store = getStore()
    config.data = {
      NidUser: store.getters['authorize/userId'], FullName: store.getters['authorize/fullname'], ...config.data || {}
    }
    if (config.url.toLowerCase().indexOf('verifyapikey') > -1) {
      delete config.headers.NidSession
      delete config.headers.token

      delete config.data.NidUser
      delete config.data.FullName
    }

    return config
  }, // (axiosConfig) => axiosConfig
  responseCallback: null // (axiosResponse) => new Response
})

export const sendByNidTask = createPostRequest('SendByNidTask')
export const createTask = createPostRequest('CreateTask')
export const getCheckListByTaskFlow = createPostRequest('GetCheckListByTaskFllow')
export const getCheckListByNidTask = createPostRequest('GetCheckListByNidTask')
export const saveCheckListValue = createPostRequest('SaveCheckListValue')
export const getProcessInfo = createPostRequest('GetProcessInfo')
export const saveCheckListValueUser = createPostRequest('SaveCheckListValueUser')
export const getTaskInfo = createPostRequest('GetTaskInfo')
export const getAssignDoingTask = createPostRequest('GetAssignDoingTask')
export const getComments = createPostRequest('GetComments') // NidProc
export const insertComment = createPostRequest('InsertComment')
export const closeSimpleTask = createPostRequest('CloseSimpleTask')
export const sendToBack = createPostRequest('SendToBack')
export const getBackTaskByNidProc = createPostRequest('GetBackTaskByNidProc')
export const assignTo = createPostRequest('AssignTo')
export const backToUser = createPostRequest('BackToUser')
export const createInstance = createPostRequest('CreateInstance')
export const getAllTaskByNidProc = createPostRequest('GetAllTaskByNidProc')
export const verifyApiKey = createPostRequest('VerifyApiKey')
export const generateApiKey = createPostRequest('GenerateApiKey')
export const getTaskByUserCreator = createPostRequest('GetTaskByUserCreator')
export const setProcStatus = createPostRequest('setProcStatus')
export const saveForm = createPostRequest('saveForm')
export const getFormValue = createPostRequest('getFormValue')
export const getHolidaysAndEvents = createPostRequest('GetHolidaysAndEvents')
export const getNotificationCenter = createPostRequest('GetNotificationCenter')
export const deleteNotificationCenter = createPostRequest('DeleteNotificationCenter')
export const insertNotificationCenter = createPostRequest('InsertNotificationCenter')
export const deleteProc = createPostRequest('DeleteProc ')
