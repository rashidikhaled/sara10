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

export const sendByNidTask = createPostRequest('SendByNidTask')
export const createTask = createPostRequest('CreateTask')
export const getCheckListByTaskFlow = createPostRequest('GetCheckListByTaskFllow')
export const getCheckListByNidTask = createPostRequest('GetCheckListByNidTask')
export const saveCheckList = createPostRequest('SaveCheckListValue')
export const getTaskInfo = createPostRequest('GetTaskInfo')
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
