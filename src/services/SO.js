import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'SO'

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

export const getAllComplain = createPostRequest('/GetAllComplain')
export const confirmComplain = createPostRequest('/ConfirmComplain')
export const notConfirmComplain = createPostRequest('/NotConfirmComplain')
export const setNeedAgainRevisit = createPostRequest('/SetNeedAgainRevisit')
export const getObjectSurvey = createPostRequest('/GetObjectSurvey')
export const getCanFirstConfirmList = createPostRequest('/GetCanFirstConfirm_List')
export const doFirstConfirmation = createPostRequest('/DoFirstConfirmation')
export const getCanSecondConfirmList = createPostRequest('/GetCanSecondConfirm_List')
export const getSurveyAnalysis = createPostRequest('/GetSurveyAnalysis')
export const getObjectInStatusToSurveyor = createPostRequest('/GetObjectInStatusToSurveyor')
export const getSurveyor = createPostRequest('/GetSurveyor')
export const saveSurveyor = createPostRequest('/SaveSurveyor')
export const getSurveyorList = createPostRequest('/GetSurveyorList')
export const getUploadedRevisitList = createPostRequest('/GetUploadedRevisitList')
export const assignObjectToSurveyorWithChildren = createPostRequest('/AssignObjectToSurveyorWithChildren')
export const changeSurveyorActivation = createPostRequest('/ChangeSurveyorActivation')
export const getSurveyorTasksInBlockGroup = createPostRequest('/GetSurveyorTasksInBlock_Group')
export const getSurveyorTasksInBlockDetails = createPostRequest('/GetSurveyorTasksInBlock_Details')
export const getCanAssignToSurveyorList = createPostRequest('/GetCanAssignToSurveyor_List')
export const assignToSurveyorChangeSurveyor = createPostRequest('/AssignToSurveyor_ChangeSurveyor')
export const assignBlockToSurveyor = createPostRequest('/AssignBlockToSurveyor')
export const assignObjectToSurveyorNoChildren = createPostRequest('/AssignObjectToSurveyorNoChildren')
export const getNosaziCodeChildrenInNosaziCode = createPostRequest('/GetNosaziCodeChildren_InNosaziCode')
export const GetNosaziCodeChildrenInNidProc = createPostRequest('/GetNosaziCodeChildren_InNidProc')
export const loadHousesFromBlock = createPostRequest('/LoadHouses_FromBlock')
export const setRequiredRevisitOrNotExtended = createPostRequest('/SetRequiredRevisitOrNotExtended')
export const updateEumRequiredRevisit = createPostRequest('/UpdateEumRequiredRevisit')
export const deleteNosaziCodeSurvey = createPostRequest('/DeleteNosaziCode_Survey')
export const getInfo = createPostRequest('/GetInfo')
export const saveInfo = createPostRequest('/SaveInfo')
export const getBlockSurvey = createPostRequest('/GetBlockSurvey')
export const loadBlock = createPostRequest('/LoadBlock')
export const doSecondConfirmation = createPostRequest('/DoSecondConfirmation')
export const getTabletSettings = createPostRequest('/GetTabletSettings')
export const saveTabletSettings = createPostRequest('/SaveTabletSettings')
