import endpoints from 'src/config/endpoints'
import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'engineers'

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

export const GetEngineerHolidaysByPciYears = createPostRequest(
  endpoints.engineers.GetEngineerHolidaysByPciYears
)
export const getEngInfoReportForEsup = createPostRequest(
  endpoints.engineers.getEngInfoReportForEsup
)

// export const ConfirmEngHolidays =
//   createPostRequest('/ConfirmEng_Holidays')

export const ConfirmEngHolidays = createPostRequest(
  endpoints.engineers.ConfirmEngHolidays
)

export const ChangeIdentityCode = createPostRequest(
  endpoints.engineers.ChangeIdentityCode
)

export const getSMSNumber = createPostRequest('/GetSMSNumber')
export const acceptFichesFromBank = createPostRequest('/AcceptFichesFromBank')
export const getIncomeFicheLog = createPostRequest('/GetIncomeFicheLog')
export const getReferAllToEngineerInNidWorkItem = createPostRequest('/GetReferAllToEngineer_InNidWorkItem')
export const loadCoordinator = createPostRequest('/LoadCoordinator')
export const getRefToEngineerWithNidEng = createPostRequest('/GetRefToEngineerWithNidEng')
export const sendBuildingExecRep = createPostRequest('/SendBuildingExecRep')
export const saveBuldingExeReport = createPostRequest('/SaveBuldingExeReport')
export const saveBuldingExeReportAbuseRegistration = createPostRequest('/SaveBuldingExeReportAbuseRegistration')
export const setCompleteAndConfirmBuildingExecRep = createPostRequest('/SetCompleteAndConfirmBuildingExecRep')
export const confirmBuildingExecReport = createPostRequest('/ConfirmBuildingExecReport')
export const getBuldingExeReport = createPostRequest('/GetBuldingExeReport')
export const getBlackListHistory = createPostRequest('/GetBlackListHistory')
export const getEngineerPopupInfo = createPostRequest('/GetEngineerPopupInfo')

// export const GetRefEngineerCoordinatorList =
//    createPostRequest(endpoints.engineers.GetRefEngineerCoordinator_List)

export const GetEngInfoReport = createPostRequest(
  endpoints.engineers.GetEngInfoReport
)
export const ExportEngineerDutyFiche = createPostRequest(
  endpoints.engineers.ExportEngineerDutyFiche
)

// export const getEngineerPopupInfo = createPostRequest(
//   endpoints.engineers.GetEngineerPopupInfo
// )

export const GetEngineersUpdated = createPostRequest(
  endpoints.engineers.GetEngineersUpdated
)
export const GetEngCompareInfo = createPostRequest(
  endpoints.engineers.GetEngCompareInfo
)

export const GetAllEngineerRequestQta = createPostRequest(
  endpoints.engineers.GetAllEngineerRequestQta
)

export const AcceptEngineerInfo = createPostRequest(
  endpoints.engineers.AcceptEngineerInfo
)

export const RejectEngineerInfo = createPostRequest(
  endpoints.engineers.RejectEngineerInfo
)

export const GetRefToEngineerWithEngCode = createPostRequest(
  endpoints.engineers.GetRefToEngineerWithEngCode
)

export const getEngDutySelfDeclarationByIdentityCode = createPostRequest(
  '/GetEng_DutySelfDeclarationByIdentityCode'
)
export const saveEngDutySelfDeclaration = createPostRequest(
  '/SaveEng_DutySelfDeclaration'
)

export const GetADPStudyFieldRel = createPostRequest('/GetADP_StudyFieldRel')

export const getRefToEngineerValidation = createPostRequest(
  '/GetRefToEngineerValidation'
)
export const doRefManagerDeleteEngineer = createPostRequest(
  '/DoRefManagerDeleteEngineer'
)
export const getEngInfoWithCode = createPostRequest('/GetEng_InfoWithCode')
export const saveMemInfo = createPostRequest('/SaveMem_Info')

export const GetEngCapacityReq = createPostRequest(
  endpoints.engineers.GetEngCapacityReq
)

export const GetEngInfoWithEngineerCode = createPostRequest(
  '/GetEng_InfoWithEngineerCode'
)
export const saveEngInfo = createPostRequest(
  '/SaveEng_Info'
)
export const getFilRelapse = createPostRequest(
  '/GetFil_Relapse'
)
export const getTopEngineersInValueList = createPostRequest(
  '/GetTopEngineersInValueList'
)
export const loadFilRevisit = createPostRequest(
  '/LoadFil_Revisit'
)
export const saveFilRevisit = createPostRequest(
  '/SaveFil_Revisit'
)
export const getBuildingExecRepInfoMainListInNidWorkItem = createPostRequest(
  '/GetBuildingExecRep_Info_MainList_InNidWorkItem'
)
export const getBuildingExecRepDetailMainList = createPostRequest(
  '/GetBuildingExecRep_DetailMainList'
)
export const getBuildingExecRepInfoHistoryList = createPostRequest(
  '/GetBuildingExecRep_Info_HistoryList'
)
export const getBuildingExecRepDetailHistoryList = createPostRequest(
  '/GetBuildingExecRep_Detail_HistoryList '
)
export const revokeBuildingExecRepHistory = createPostRequest(
  '/RevokeBuildingExecRep_History '
)
export const getBuildingReportFormOperation = createPostRequest(
  '/GetBuildingReport_FormOperation '
)
export const GetAllReportSettings = createPostRequest(
  '/GetAllReport_Settings '
)
export const confirmBuildingExecRepHistory = createPostRequest(
  '/ConfirmBuildingExecRep_History '
)
export const confirmBuildingExecRepMain = createPostRequest(
  '/ConfirmBuildingExecRep_Main '
) // inja
export const SaveViolationNidWorkItem = createPostRequest(
  '/SaveViolationNidWorkItem '
)
export const revokeBuildingExecRepMain = createPostRequest(
  '/RevokeBuildingExecRep_Main '
)
export const addToPoliceSakhteman = createPostRequest(
  '/AddToPoliceSakhteman '
)
export const saveBuildingExecRepComments = createPostRequest(
  '/SaveBuildingExecRepComments '
)
export const getBuildingExecRepCommentsList = createPostRequest(
  '/GetBuildingExecRepComments_List '
)
export const getMemOffices = createPostRequest('/GetMemOffices')

export const getReferToEngineerWithNidRef = createPostRequest(
  '/GetReferToEngineerWithNidRef'
)
export const loadAssignTaskDynamicForm = createPostRequest(
  '/LoadAssignTaskDynamicForm'
)
export const getEngineers = createPostRequest(
  '/GetEngineers'
)
export const calculateAssignTaskDynamicList = createPostRequest(
  '/CalculateAssignTaskDynamicList'
)
export const referFilToEngineer = createPostRequest('/ReferFilToEngineer ')

export const getReservedEngineerInDateFilter = createPostRequest('/GetReservedEngineer_InDateFilter ')

export const getEngDutyFiche = createPostRequest('/GetEngDutyFiche ')

export const getFicheListInNidWorkItem = createPostRequest('/GetFicheList_InNidWorkItem ')

export const doCalcuteEngDutyFiche = createPostRequest('/DoCalcuteEngDutyFiche ')

export const SaveEngCapacityReq = createPostRequest(
  endpoints.engineers.SaveEngCapacityReq
)
export const GetrefRealPerson = createPostRequest('/GetRef_RealPerson')

export const CheckEngineerInMem = createPostRequest('/CheckEngineerInMem')

export const SaveEngInfo = createPostRequest(endpoints.engineers.SaveEngInfo)

export const GetSearchResult = createPostRequest(
  endpoints.engineers.GetSearchResult
)

// capacity endpoints
export const getQtaGroupDetail = createPostRequest('/GetQtaGroupDetail')

export const setGreen = createPostRequest('/SetGreen')

export const saveQtaGroupDetail = createPostRequest('/SaveQtaGroupDetail')

export const saveAcceptQtaGroup = createPostRequest('/SaveAcceptQtaGroup')

export const saveAcceptQtaGroupFiltered = createPostRequest(
  '/SaveAcceptQtaGroupFiltered'
)

export const getCapacityKartabl = createPostRequest('/GetCapacityKartabl')

export const saveQtaCapacityKartabl = createPostRequest(
  '/SaveQtaCapacityKartabl'
)

export const getArchiveRootSubject = createPostRequest(
  '/GetArchiveRootSubject'
)

export const getWorkAllowed = createPostRequest('/GetWorkAllowed')
export const getEngineerWithNidEng = createPostRequest('/GetEngineerWithNidEng')

export const getWorkAllowedm = createPostRequest('/GetWorkAllowedm')

export const getEngineerMemOffHistory = createPostRequest(
  '/GetEngineerMemOffHistory'
)

export const getExportFicheHistory = createPostRequest(
  '/GetExportFicheHistory'
)

export const doEngQtaFirstSession = createPostRequest('/DoEngQtaFirstSession ')

export const getIncomeDoc = createPostRequest('/GetIncomeDoc ')

export const saveIncomeDoc = createPostRequest('/SaveIncomeDoc ')

export const deleteIncomeDoc = createPostRequest('/DeleteIncomeDoc ')

export const getFilIncomeReport = createPostRequest('/GetFilIncomeReport ')
export const getEngListInCondition = createPostRequest('/GetEngList_InCondition')
export const getCISMSSendTxt = createPostRequest('/GetCI_SMSSendTxt')

// Office endpoints
export const getEngOrganOfficeInfoList = createPostRequest(
  '/GetEngOrgan_OfficeInfoList'
)
export const findOfficeWithCode = createPostRequest(
  '/FindOfficeWithCode'
)
export const saveOfficeInfo = createPostRequest(
  '/SaveOffice_Info'
)

export const LoadEngOrganOffice = createPostRequest('/Load_EngOrgan_Office')
export const getReferAllToEngineer = createPostRequest(
  '/GetReferAllToEngineer'
)
export const SaveEngOrganOffice = createPostRequest('/SaveEngOrgan_Office')
export const GetBuildingExecRepInfoMainList = createPostRequest(
  '/GetBuildingExecRep_Info_MainList'
)

// engineers affairs
export const getOfficeInfoWithCode = createPostRequest(
  '/GetOfficeInfoWithCode'
)

export const getReferOfficeInfo = createPostRequest('/GetReferOfficeInfo')

export const getFreeCapacityInfo = createPostRequest('/GetFreeCapacityInfo')
export const getQtaGroup = createPostRequest('/GetQtaGroup')
export const getEngHolidaysList = createPostRequest('/GetEng_Holidays_List')

export const freeCapacity = createPostRequest('/FreeCapacity')

export const loadEngineerDuty = createPostRequest('/LoadEngineerDuty')
export const calculateEngineerDuty = createPostRequest('/CalculateEngineerDuty ')
export const changeEngineerPayoffYear = createPostRequest('/ChangeEngineerPayoffYear')
export const loadEngDutyCalculateList = createPostRequest('/LoadEng_DutyCalculate_List ')
export const loadEngDutyFicheCalculateList = createPostRequest('/LoadEng_DutyFicheCalculate_List')
export const loadEngineerDutyFicheList = createPostRequest('/LoadEngineerDutyFiche_List')
export const confirmEngineerDutyFiche = createPostRequest('/ConfirmEngineerDutyFiche')
export const revokeEngineerDutyFiche = createPostRequest('/RevokeEngineerDutyFiche')
export const printEngineerDutyFiche = createPostRequest('/PrintEngineerDutyFiche')
export const saveEngDutyOddmentAccount = createPostRequest('/SaveEng_DutyOddmentAccount')

export const exitOfCapacity = createPostRequest('/ExitOfCapacity')

export const getBlackListWitCode = createPostRequest('/GetBlackListWitCode')

export const saveBlackList = createPostRequest('/SaveBlackList')

export const getBlackList = createPostRequest('/GetBlackList')

export const deleteBlackList = createPostRequest('/DeleteBlackList ')
export const exportEngineerDutyFiche = createPostRequest('/ExportEngineerDutyFiche')

export const GetRefEngineerCoordinatorList = createPostRequest('/GetRefEngineerCoordinator_List')
export const getRefStayForRefChecker = createPostRequest('/GetRef_StayForRefChecker')
export const loadSendChecker = createPostRequest('/LoadSendChecker')
export const sendToChecker = createPostRequest('/SendToChecker')

export const RevokeCoordinator = createPostRequest('/RevokeCoordinator')

export const ConfirmCoordinator = createPostRequest('/ConfirmCoordinator')
export const getEngineerConfirm = createPostRequest('/GetEngineerConfirm')
export const saveConfirm = createPostRequest('/SaveConfirm')
export const getKartablBuildingExecRep = createPostRequest('/GetKartabl_BuildingExecRep')
export const getIncomeSymptoms = createPostRequest('/GetIncomeSymptoms')
export const saveIncomeSymptoms = createPostRequest('/SaveIncomeSymptoms')

export const getTaskTitle = createPostRequest('/GetTaskTitle')

export const getTarefe = createPostRequest('/GetTarefe')
export const saveTarefe = createPostRequest('/SaveTarefe')

export const searchIncome = createPostRequest('/SearchIncome ')

export const getRefEngineerCancelList = createPostRequest(
  '/GetRefEngineerCancel_List'
)

export const NotConfirmRefEngineerCancel = createPostRequest(
  '/NotConfirmRefEngineerCancel'
)

export const ConfirmRefEngineerCancel = createPostRequest(
  '/ConfirmRefEngineerCancel'
)
export const getOffices = createPostRequest('/GetOffices')

//   baseInfo
export const GetWFSettings = createPostRequest('/GetWFSettings')

export const getRefBuildingGroup = createPostRequest('/GetRef_BuildingGroup')

export const SaveWFSettings = createPostRequest('/SaveWFSettings')

export const BackToSara = createPostRequest('/BackToSara')

export const getFilInfo = createPostRequest('/GetFil_Info')
export const getConfirmStartWork = createPostRequest('/GetConfirmStartWork')
export const saveFilConfirm = createPostRequest('/SaveFil_Confirm')
export const setFillInfoConfirmStartWork = createPostRequest('/SetFillInfo_ConfirmStartWork')
export const cancelStartWork = createPostRequest('/CancelStartWork')

export const getFilForDayanmicRef = createPostRequest('/GetFilForDayanmicRef')
export const selectDynamicRef = createPostRequest('/SelectDynamicRef')
export const cancelDynamicRef = createPostRequest('/CancelDynamicRef')
export const confirmEngSelectDynamicRef = createPostRequest('/ConfirmEng_SelectDynamicRef')

export const getFilInfoWithNidProc = createPostRequest(
  '/GetFil_InfoWithNidProc'
) // GetFil_InfoWithNidProc(ClsRequestMessage pRequest)

export const getFilInfoWithNidWorkItem = createPostRequest(
  '/GetFil_InfoWithNidWorkItem'
) // GetFil_InfoWithNidWorkItem(ClsRequestMessage pRequest)

export const getFilInfoWithNidFil = createPostRequest('/GetFil_InfoWithNidFil')

export const saveFilInfo = createPostRequest('/SaveFilInfo')

export const calculateEngineer = createPostRequest('/CalculateEngineer')
// base Information

export const saveRefBuildingGroup = createPostRequest('/SaveRef_BuildingGroup')

export const loadRefBuildingEngReq = createPostRequest(
  '/LoadRef_BuildingEngReq'
)

export const saveRefBuildingEngReq = createPostRequest(
  '/SaveRef_BuildingEngReq'
)
export const getFilInfoAndReferToEngineer = createPostRequest(
  '/GetFilInfoAndReferToEngineer'
)

export const attachEngineerFromNidProcToNidProc = createPostRequest(
  '/AttachEngineerFromNidProcToNidProc'
)
export const attachSelectedEngineersFromNidProcToNidProc = createPostRequest(
  '/AttachSelectedEngineersFromNidProcToNidProc'
)

export const updateFillOperation = createPostRequest('/UpdateFillOperation')

export const getFilOperationInNosaziCode = createPostRequest(
  '/GetFil_OperationInNosaziCode'
)

export const deleteQtaInfo = createPostRequest('/DeleteQtaInfo')

export const changeIdentityCode = createPostRequest('/ChangeIdentityCode ')

export const changeNosaziCode = createPostRequest('/ChangeNosaziCode')

export const getEngInfoTemp = createPostRequest('/GetEng_Info_Temp')
export const saveEngInfoTemp = createPostRequest('/SaveEng_Info_Temp')
export const CheckShahkar = createPostRequest('/CheckShahkar ')
export const getOperationStartInfo = createPostRequest('/GetOperationStartInfo')
export const saveOperationStart = createPostRequest('/SaveOperationStart')
export const loadCheckingInfoCalculator = createPostRequest('/LoadCheckingInfo_Calculator')
export const saveCheckingInfoCalculator = createPostRequest('/SaveCheckingInfo_Calculator')
export const sendToStayForRefChecker = createPostRequest('/SendToStayForRefChecker')

export const loadRefEngineerCancel = createPostRequest('/LoadRefEngineerCancel')
export const doRefEngineerCancel = createPostRequest('/DoRefEngineerCancel')

export const getBarokafCommitment = createPostRequest('/GetBarokafCommitment')
export const saveBarokafCommitment = createPostRequest('/SaveBarokafCommitment')
export const confirmEngCapacityReq = createPostRequest('/ConfirmEngCapacityReq')
export const revokeEngCapacityReq = createPostRequest('/RevokeEngCapacityReq')
export const getFreeCapacityInfoDetails = createPostRequest('/GetFreeCapacityInfoDetails')
export const deleteFreeCapacityInfo = createPostRequest('/DeleteFreeCapacityInfo')
