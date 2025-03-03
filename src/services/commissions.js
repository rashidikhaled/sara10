import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'commissions'

// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) => getFromConfig(serviceName, District, true)
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createInstance({
  getBaseUrl,
  serviceName,
  headers: {},
  encryption: true,
  requestCallback: null, // (axiosConfig) => axiosConfig
  responseCallback: null // (axiosResponse) => new Response
})
// **** Request Configuration ****
// ====================================== Create Instance ======================================

export const getKartabl = createPostRequest('/GetKartabl')
export const getRegion = createPostRequest('/GetRegion')
export const getKartablPasokhgo = createPostRequest('/GeTSearch')
export const getTaskHistory = createPostRequest('/GetTaskHistory')
export const getListOfTaskState = createPostRequest('/GetListOfTaskState')
export const getRegionAnalyze = createPostRequest('/GetRegionAnalyze')
export const getCommissionAnalyze = createPostRequest('/GetCommissionAnalyze')
export const getTrepassAnalyze = createPostRequest('/GetTrepassAnalyze')
export const getViolatorsAnalyze = createPostRequest('/GetViolatorsAnalyze')
export const getNextStateList = createPostRequest('/GetNextStateList')
export const sendWithRule = createPostRequest('/SendWithRule')
export const back = createPostRequest('/Back')
export const getBlankList = createPostRequest('/Get_BlankList')
export const commisionGetAllTaskByNidProc = createPostRequest('/GetAllTaskByNidProc')

export const getCommissionForImpart = createPostRequest('/GetCommissionForImpart')
export const saveCommissionImpart = createPostRequest('/SaveCommission_Impart')

export const getEntryCommissionInfo = createPostRequest('/GetEntryCommissionInfo')
export const saveEntryCommissionInfo = createPostRequest('/SaveEntryCommissionInfo')
export const getEntryCommissionInfoInNosaziCode = createPostRequest('/GetEntryCommissionInfoInNosaziCode')
export const getTabletRevisitImageDetails = createPostRequest('/GetTabletRevisitImageDetails')
export const checkSendToSara = createPostRequest('/CheckSendToSara')
export const saveCommissionRelapse = createPostRequest('/SaveCommissionRelapse')

export const getTrepasses = createPostRequest('/GetTrepasses')
export const saveTrepasses = createPostRequest('/SaveTrepasses')
export const getCITrepassTypeFromCITrepassTypeGroup = createPostRequest(
  '/GetCI_TrepassType_FromCI_TrepassType_Group'
)

export const getCommissionBlankList = createPostRequest('/GetCommission_BlankList')
export const saveCommissionBlankList = createPostRequest('/SaveCommission_BlankList')

export const getCommissionRefrenceToLegalExpert = createPostRequest('/GetCommissionRefrenceToLegalExpert')

export const getCommissionInquiry = createPostRequest('/GetCommission_Inquiry')
export const saveCommissionInquiry = createPostRequest('/Save_Commission_Inquiry')
export const getCommissionInfoByNidProcAhkam = createPostRequest('/GetCommissionInfoByNidProcAhkam')

export const getCommissionProclamation = createPostRequest('/GetCommission_Proclamation')
export const saveCommissionProclamation = createPostRequest('/SaveCommission_Proclamation')
export const deleteCommissionProclamation = createPostRequest('/DeleteCommission_Proclamation')
export const getCommissionVoteTrepasses = createPostRequest('/GetCommissionVoteTrepasses')

export const getSMSNumber = createPostRequest('/GetSMSNumber')
export const getCISMSSendTxt = createPostRequest('/GetCI_SMSSendTxt')
export const getAgents = createPostRequest('/GetAgents')
// export const getAgents = createPostRequest("/GetAgentsWithoutSignature")
export const getAgentByNidAgent = createPostRequest('/GetAgentByNidAgent')

export const getADPVoteTypeDetail = createPostRequest('/GetADP_VoteTypeDetail')
export const saveADPVoteTypeDetail = createPostRequest('/SaveADP_VoteTypeDetail')
export const getAllExperts = createPostRequest('/GetAllExperts')
export const getExpert = createPostRequest('/GetExpert')
export const saveExpert = createPostRequest('/SaveExpert')
export const deleteExpert = createPostRequest('/DeleteExpert')
export const getUserInfo = createPostRequest('/GetUserInfo')
export const addUser = createPostRequest('/AddUser')
export const getAllState = createPostRequest('/GetAllState')
export const getUserAllState = createPostRequest('/GetUserAllState')
export const saveUserAccess = createPostRequest('/SaveUserAccess')
export const deleteUserAccess = createPostRequest('/DelUserAccess')
export const getHistoryVotes = createPostRequest('/GetHistoryVotes')

export const getBillFine = createPostRequest('/GetBillFine')
export const getCommissionHistory = createPostRequest('/GetCommissionHistory')
export const getCommissionVoteOfAgent = createPostRequest('/GetCommissionVoteOfAgent')
export const getAllCommissionDetails = createPostRequest('/GetAllCommissionDetails')
export const getCommissionService = createPostRequest('/GetCommissionService')
export const saveCommissionInfo = createPostRequest('/SaveCommissionInfo')
export const saveCommissionLegalProxy = createPostRequest('/SaveCommission_LegalProxy')
export const saveCommissionLegalProxyExtension = createPostRequest('/SaveCommission_LegalProxyExtension')
export const SaveCommissionLegalProxyExecutionOrder = createPostRequest('/SaveCommission_LegalProxyExecutionOrder')
export const getCommissionInfoByNidVote = createPostRequest('/GetCommissionInfoByNidVote')
export const addProxyExtensionToArchiveReport = createPostRequest('/AddProxyExtensionToArchiveReport')
export const deleteCommissionLegalProxyExtension = createPostRequest('/DeleteCommission_LegalProxyExtension')
export const deleteCommissionLegalProxyExecutionOrder = createPostRequest('/DeleteCommission_LegalProxyExecutionOrder')
export const deleteProxyExtensionDataFile = createPostRequest('/DeleteProxyExtensionDataFile')
export const getCommissionDefHolidaysList = createPostRequest('/GetCommission_DefHolidays_List')
export const saveCommissionDefHolidays = createPostRequest('/SaveCommission_DefHolidays')
export const getMaxVote = createPostRequest('/GetMaxVote')
export const getCommissionMeetingVoteList = createPostRequest('/GetCommission_MeetingVoteList')
export const getCommissionRandom = createPostRequest('/GetCommissionRandom')
export const commissionRandom = createPostRequest('/CommissionRandom')
export const getCommissionFilter = createPostRequest('/GetCommissionFilter')
export const getAfterCommission = createPostRequest('/GetAfterCommission')
export const getCommissionPrintLog = createPostRequest('/GetCommission_PrintLog')
export const getClsCommissionComments = createPostRequest('/GetClsCommission_Comments')
export const saveClsCommissionComments = createPostRequest('/SaveClsCommission_Comments')
export const deleteClsCommissionComments = createPostRequest('/DeleteClsCommission_Comments')
export const getCommissionSetting = createPostRequest('/GetCommissionSetting')
export const getADPPrintType = createPostRequest('/GetADP_PrintType')
export const saveADPPrintType = createPostRequest('/saveADP_PrintType')

export const loadCommissionMeetingVote = createPostRequest('/LoadCommission_MeetingVote')
export const saveCommissionMeetingVote = createPostRequest('/SaveCommission_MeetingVote')
export const deleteCommissionMeetingVote = createPostRequest('/DeleteCommission_MeetingVote ')

export const sendGroup = createPostRequest('/SendGroup')
export const updateExtended = createPostRequest('/UpdateExtended')
export const updateDateAfterRandomCommission = createPostRequest('/UpdateDateAfterRandomCommission')

export const saveNewVote = createPostRequest('/SaveNewVote')
export const doCalculateVoteValue = createPostRequest('/DoCalculateVoteValue')
export const isPrintVote = createPostRequest('/IsPrintVote')
export const saveCommissionPrintLog = createPostRequest('/SaveCommission_PrintLog')
export const addLayeheToArchive = createPostRequest('/AddLayeheToArchive')
export const addToArchive = createPostRequest('/AddToArchive')
export const saveGhararInfo = createPostRequest('/SaveGhararInfo')
export const getGhararInfo = createPostRequest('/GetGhararInfo')
export const acceptVote = createPostRequest('/AcceptVote')
export const commissionVoteDeleteLog = createPostRequest('/CommissionVoteDeleteLog')
export const getCIVoteTypeDetailFromCIVoteType = createPostRequest('/GetCI_VoteTypeDetail_FromCI_VoteType')
export const saveCommissionVoteOfAgent = createPostRequest('/SaveCommissionVoteOfAgent')
export const getListCommissionVoteOfAgent = createPostRequest('/GetListCommissionVoteOfAgent')

export const saveAgent = createPostRequest('/SaveAgent')
export const deleteAgent = createPostRequest('/DeleteAgent')
export const getTokenByCICommission = createPostRequest('/GetTokenByCI_Commission')

export const getRandomSend = createPostRequest('/GetRandomSend')
export const getRandomSendAll = createPostRequest('/GetRandomSendAll')
export const createSendRandom = createPostRequest('/CreateSendRandom')
export const revokeSendRandom = createPostRequest('/RevokeSendRandom')
export const confirmSendRandom = createPostRequest('/ConfirmSendRandom')

export const getCommissionsDate = createPostRequest('/GetCommissionsDate')

export const getGraphVoteDate = createPostRequest('/GetGraphVoteDate')
export const getGraph = createPostRequest('/GetGraph')
export const getCommissionGharar = createPostRequest('/GetCommission_Gharar')
export const saveCommissionGharar = createPostRequest('/SaveCommission_Gharar')
export const getArchives = createPostRequest('/GetArchives')

export const getTemporaryArchives = createPostRequest('/GetTemporaryArchives')
export const saveTemporaryArchive = createPostRequest('/SaveTemporaryArchive')

export const backToSara = createPostRequest('/BackToSara')
export const sendKartabl = createPostRequest('/SendKartabl')
export const procEvent = createPostRequest('/ProcEvent')
export const checkRenderVoteReportInArchive = createPostRequest('/CheckRenderVoteReportInArchive')

export const saveCommissionExecutTrackingVote = createPostRequest('/SaveCommission_ExecutTrackingVote')
export const getCommissionInfosbyNidWorkItem = createPostRequest('/GetCommissionInfosbyNidWorkItem')
export const saveCommissioApposeVote = createPostRequest('/SaveCommission_ApposeVote')
export const getArchiveBizCodeFromNosaziCode = createPostRequest('/GetArchiveBizCode_FromNosaziCode')

export const getCommissionVoteLog = createPostRequest('/GetCommissionVoteLog')
