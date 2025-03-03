import endpoints from 'src/config/endpoints'
import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'SA'

// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) => getFromConfig(serviceName, District, true)
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createInstance({
  getBaseUrl,
  serviceName,
  headers: {}
})
// **** Request Configuration ****

// ====================================== Create Instance ======================================

export const getNosaziCodeTreeChild = createPostRequest(
  endpoints.SA.getNosaziCodeTreeChild
)
export const loadRequestHeader = createPostRequest(
  endpoints.SA.loadRequestHeader
)
export const getBaseLibInNosaziCode = createPostRequest(
  endpoints.SA.getBaseLibInNosaziCode
)
export const getNationalCodeAndUserBlackList = createPostRequest(
  endpoints.SA.getNationalCodeAndUserBlackList
)
export const getShWorkflowListInNosaziCodeObjType = createPostRequest(
  endpoints.SA.getShWorkflowListInNosaziCodeObjType
)
export const getInBlackListInAlarm = createPostRequest(
  endpoints.SA.getInBlackListInAlarm
)
export const getDeletedNosaziCodeTreeChild = createPostRequest(
  endpoints.SA.getDeletedNosaziCodeTreeChild
)
export const getBaseLibInNidWorkItem = createPostRequest(
  endpoints.SA.getBaseLibInNidWorkItem
)
export const getBlackList = createPostRequest(endpoints.SA.getBlackList)
export const getBlackListWorkflowExemptionIsEnter = createPostRequest(
  endpoints.SA.getBlackListWorkflowExemptionIsEnter
)
export const exitFromBlackList = createPostRequest(
  endpoints.SA.exitFromBlackList
)
export const changeBlackListControl = createPostRequest(
  endpoints.SA.changeBlackListControl
)
export const getBlackListNationalCode = createPostRequest(
  endpoints.SA.getBlackListNationalCode
)
export const exitFromBlackListWithNationalCode = createPostRequest(
  endpoints.SA.exitFromBlackListWithNationalCode
)
export const loadWorkflowList = createPostRequest(endpoints.SA.loadWorkflowList)
export const LoadNeworkflowList = createPostRequest('LoadNeworkflowList')
export const getaNosaziCodeInBlackList = createPostRequest(
  endpoints.SA.getaNosaziCodeInBlackList
)
export const sendToBlackList = createPostRequest(endpoints.SA.sendToBlackList)
export const getNosaziCodeListInBlackList = createPostRequest(
  endpoints.SA.getNosaziCodeListInBlackList
)
export const sendGroupToBlackList = createPostRequest(
  endpoints.SA.sendGroupToBlackList
)
export const sendToBlackListWithNationalCode = createPostRequest(
  endpoints.SA.sendToBlackListWithNationalCode
)
export const sendToUserBlackList = createPostRequest(
  endpoints.SA.sendToUserBlackList
)
export const searchShUserBlackList = createPostRequest(
  endpoints.SA.searchShUserBlackList
)
export const exitFromBlacklistWithNidBlackUser = createPostRequest(
  endpoints.SA.exitFromBlacklistWithNidBlackUser
)
export const search = createPostRequest(endpoints.SA.search)
export const loadWorkflowListAll = createPostRequest(
  endpoints.SA.loadWorkflowListAll
)
export const saveWorkflow = createPostRequest(endpoints.SA.saveWorkflow)
export const getPoseFicheHistory = createPostRequest(
  endpoints.SA.getPoseFicheHistory
)
export const getNationalCodeBlackList = createPostRequest(
  endpoints.SA.getNationalCodeBlackList
)
export const getBaseLibInNidNosaziCode = createPostRequest(
  endpoints.SA.getBaseLibInNidNosaziCode
)
export const getBaseLibInNidProc = createPostRequest(
  endpoints.SA.getBaseLibInNidProc
)
export const getArchiveWrapper = createPostRequest(
  endpoints.SA.getArchiveWrapper
)
export const getShNewWorkflowListInNosaziCodeObjType = createPostRequest(
  endpoints.SA.getShNewWorkflowListInNosaziCodeObjType
)
export const loadNeworkflowList = createPostRequest(
  endpoints.SA.loadNeworkflowList
)
export const getAllUGPBlackList = createPostRequest(
  endpoints.SA.getAllUGPBlackList
)
export const getUGPBlackListNationalCode = createPostRequest(
  endpoints.SA.getUGPBlackListNationalCode
)
export const sendToUGPBlackList = createPostRequest(
  endpoints.SA.sendToUGPBlackList
)
export const exitFromUGPBlackList = createPostRequest(
  endpoints.SA.exitFromUGPBlackList
)
export const isInUGPBlackListWithNationalCode = createPostRequest(
  endpoints.SA.isInUGPBlackListWithNationalCode
)
export const getInBlockListInAllControlNosaziCode = createPostRequest(
  'GetInBlockList_InAllControl_NosaziCode'
)
export const getShUserBlackList = createPostRequest('GetSh_UserBlackList')
