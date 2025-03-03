import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'SH'

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

export const getSealedOperationList2 = createPostRequest('GetSealedOperationList2')
export const getSealedOperationList = createPostRequest('GetSealedOperationList')
export const getWarrantListByProc = createPostRequest('GetWarrantListByProc')
export const getSealedDetach = createPostRequest('GetSealedDetach')
export const saveSealedDetach = createPostRequest('SaveSealedDetach')
export const getSealedOrder2 = createPostRequest('GetSealedOrder2')
export const confirmLicense = createPostRequest('ConfirmLicense')
export const revokeLicense = createPostRequest('RevokeLicense')
export const saveSealedOrder = createPostRequest('SaveSealedOrder')
export const getWarning = createPostRequest('GetWarning')
export const saveWarning = createPostRequest('SaveWarning')
export const getAllOperationList = createPostRequest('GetAllOperationList')
export const getWarrantOrderList = createPostRequest('GetWarrantOrderList')
export const GetJudge = createPostRequest('GetJudge')
export const SaveJudge = createPostRequest('SaveJudge')
export const GetAllSealedNotCommission = createPostRequest('GetAllSealedNotCommission')
export const GetLegalInterfaceList = createPostRequest('GetLegalInterfaceList')
export const SaveLegalInterface = createPostRequest('SaveLegalInterface')
export const getAllControlList = createPostRequest('GetAllControlList')
export const saveControlList = createPostRequest('SaveControlList')
export const getSealedDetachNotOrder = createPostRequest('GetSealedDetachNotOrder')
export const saveSealedDetach2 = createPostRequest('SaveSealedDetach2')
export const getAllPhysicalProgressWithSearch = createPostRequest('GetAllPhysicalProgressWithSearch')
export const getPhysicalProgress = createPostRequest('GetPhysicalProgress')
export const getPhysicalProgressWithNosaziCode = createPostRequest('GetPhysicalProgressWithNosaziCode')
export const savePhysicalProgress = createPostRequest('SavePhysicalProgress')
export const saveWarrantOrderResultList = createPostRequest('SaveWarrantOrderResultList')
export const getOperationList = createPostRequest('GetOperationList')
export const getWarrantOrderResultList = createPostRequest('GetWarrantOrderResultList')
export const GetAllSealedList = createPostRequest('GetAllSealedList')
export const getAllWarningList = createPostRequest('GetAllWarningList')
export const saveViolationFix = createPostRequest('SaveViolationFix')
export const getSMSNumber = createPostRequest('GetSMSNumber')
export const getRequest = createPostRequest('GetRequest')
export const saveRequest = createPostRequest('SaveRequest')
export const getPreventConstructionCouncilList = createPostRequest('GetPreventConstructionCouncilList')
export const getPreventConstructionCouncil = createPostRequest('GetPreventConstructionCouncil')
export const savePreventConstructionCouncil = createPostRequest('SavePreventConstructionCouncil')
export const getPickupStuffCouncilList = createPostRequest('GetPickupStuffCouncilList')
export const getPickupStuffCouncil = createPostRequest('GetPickupStuffCouncil')
export const savePickupStuffCouncil = createPostRequest('SavePickupStuffCouncil')
export const getSealed = createPostRequest('GetSealed')
export const saveSealed = createPostRequest('SaveSealed')
export const getWarningList = createPostRequest('GetWarningList')
export const getControlList = createPostRequest('GetControlList')
export const getViolationList = createPostRequest('GetViolationList')
export const getRevisitListInNidProc = createPostRequest('GetRevisitList_InNidProc')
export const getRevisit = createPostRequest('GetRevisit')
export const saveRevisit = createPostRequest('SaveRevisit')
export const getSealedRemoveOrderPerm = createPostRequest('GetSealedRemoveOrder_Perm')
export const saveSealedRemoveOrderPerm = createPostRequest('SaveSealedRemoveOrder_Perm')
export const saveSealedRemove = createPostRequest('SaveSealedRemove')
export const getSealedRemove = createPostRequest('GetSealedRemove')
export const getEnterOrderList = createPostRequest('GetEnterOrderList')
export const getEnterOrder = createPostRequest('GetEnterOrder')
export const saveEnterOrder = createPostRequest('SaveEnterOrder')
export const getDeliverStuffCouncilList = createPostRequest('GetDeliverStuffCouncilList')
export const saveDeliverStuffCouncil = createPostRequest('SaveDeliverStuffCouncil')
export const checkIsConfirmLicense = createPostRequest('CheckIsConfirmLicense')
export const revokeSealedOperation = createPostRequest('RevokeSealedOperation')
export const getWorkFlowList = createPostRequest('GetWorkFlowList')
