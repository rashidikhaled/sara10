import endpoints from 'src/config/endpoints'
import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'eng'

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

export const getEngInfoReportForEsup = createPostRequest(endpoints.eng.getEngInfoReportForEsup)
export const getEngDutySelfDeclaration = createPostRequest('/GetEng_DutySelfDeclaration')
export const saveEngDutySelfDeclaration = createPostRequest('/SaveEng_DutySelfDeclaration')
export const getOfficeInfo = createPostRequest('/GetOffice_Info')
export const loadEngineerDuty = createPostRequest('/LoadEngineerDuty')
export const calculateEngineerDuty = createPostRequest('/CalculateEngineerDuty ')
export const loadEngDutyCalculateList = createPostRequest('/LoadEng_DutyCalculate_List ')
export const exportEngineerDutyFiche = createPostRequest('/ExportEngineerDutyFiche')
export const loadEngDutyFicheCalculateList = createPostRequest('/LoadEng_DutyFicheCalculate_List')
export const revokeEngineerDutyFiche = createPostRequest('/RevokeEngineerDutyFiche')
export const loadEngineerDutyFicheList = createPostRequest('/LoadEngineerDutyFiche_List')
export const printEngineerDutyFiche = createPostRequest('/PrintEngineerDutyFiche')
export const saveEngDutyOddmentAccount = createPostRequest('/SaveEng_DutyOddmentAccount')
export const changeEngineerPayoffYear = createPostRequest('/ChangeEngineerPayoffYear')
export const loadEngineerHolidays = createPostRequest('/LoadEngineerHolidays')
export const saveEngineerHolidays = createPostRequest('/SaveEngineerHolidays')
export const loadCheckingInfo = createPostRequest('/LoadCheckingInfo')
export const saveCheckingInfo = createPostRequest('/SaveCheckingInfo')
export const getIsBlockChekingInfoForEngineer = createPostRequest('/GetIsBlockChekingInfoForEngineer')
export const sendToStayForRefChecker = createPostRequest('/SendToStayForRefChecker')
export const getKartablBuildingExecRep = createPostRequest('/GetKartabl_BuildingExecRep')
export const getTaskTitle = createPostRequest('/GetTaskTitle')
export const getRefCheckerKartabl = createPostRequest('/GetRef_Checker_Kartabl')
export const getBuldingExeReport = createPostRequest('/GetBuldingExeReport')
export const saveBuldingExeReport = createPostRequest('/SaveBuldingExeReport')
export const confirmBuildingExecReport = createPostRequest('/ConfirmBuildingExecReport')
export const saveFilOperation = createPostRequest('/SaveFil_Operation')
export const saveBuildingExecRepArchive = createPostRequest('/SaveBuildingExecRep_Archive')
export const sendBuildingExecRep = createPostRequest('/SendBuildingExecRep')
export const setCompleteAndConfirmBuildingExecRep = createPostRequest('/SetCompleteAndConfirmBuildingExecRep')
export const loadCheckingInfoCalculator = createPostRequest('/LoadCheckingInfo_Calculator')
export const getEngCapacityReq = createPostRequest('/GetEngCapacityReq')
export const sveEngCapacityReq = createPostRequest('/SaveEngCapacityReq')

export const getRefToEngineerWithNidEng = createPostRequest('/GetRefToEngineerWithNidEng')
export const getReferAllToEngineerInNidWorkItem = createPostRequest('/GetReferAllToEngineer_InNidWorkItem')
export const saveFilInfo = createPostRequest('/SaveFilInfo')
export const ReferFilToEngineer = createPostRequest('/ReferFilToEngineer')
export const getArchiveRootSubject = createPostRequest('/GetArchiveRootSubject')
export const getIncomeFicheLog = createPostRequest('/GetIncomeFicheLog')
export const acceptFichesFromBank = createPostRequest('/AcceptFichesFromBank')
export const getEngineersReports = createPostRequest('/GetEngineersReports')

export const getEngineerInfoByNidWorkItem = createPostRequest('/GetEngineerInfoByNidWorkItem')
export const getEngineerMessages = createPostRequest('/GetEngineerMessages')
export const saveEngineerMessages = createPostRequest('/SaveEngineerMessages')

export const getCIExecStatusFromCIExecRep = createPostRequest('/GetCI_ExecStatus_FromCI_ExecRep')
