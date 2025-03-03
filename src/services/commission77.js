import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'commission77'

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

export const saveRegRequestInfo = createPostRequest('/SaveRegRequest_Info')
export const getComplaints = createPostRequest('/GetComplaints')
export const getDecisions = createPostRequest('/GetDecisions')
export const getOtherDecisions = createPostRequest('/GetOtherDecisions')
export const saveComplaint = createPostRequest('/SaveComplaint')
export const getRequestAlert = createPostRequest('/GetRequestAlert')
export const saveRequestNotice = createPostRequest('/SaveRequest_Notice')
export const deleteRequestNotice = createPostRequest('/DeleteRequest_Notice')
export const cancelRequestNotice = createPostRequest('/CancelRequest_Notice')
export const getArchiveBizCodeFromNosaziCode = createPostRequest('/GetArchiveBizCode_FromNosaziCode')
export const getClsCICommission = createPostRequest('/GetClsCI_Commission ')
export const deleteCiCommission = createPostRequest('/DeleteCi_Commission ')
export const saveClsCICommission = createPostRequest('/SaveClsCI_Commission ')
export const getListAgent = createPostRequest('/GetListAgent')
export const getRequestVote = createPostRequest('/GetRequestVote')
export const cancelRequestInfo = createPostRequest('/Cancel_RequestInfo')
export const baygani = createPostRequest('/Baygani')
export const getListRequestInfoByRandomCommission = createPostRequest('/GetListRequestInfoByRandomCommission')
export const getAllFicheByIncomeListBynidWorkflowItem = createPostRequest('/GetAll_FicheByIncomeListBynidWorkflowItem')
export const saveRandomCommission = createPostRequest('/saveRandomCommission')
export const getRequestInfo = createPostRequest('/GetRequest_Info')
export const saveExpert = createPostRequest('/SaveExpert')
export const getRequestProclamation = createPostRequest('/GetRequestProclamation')
export const getSearchRequestInfo = createPostRequest('/GetSearch_RequestInfo')
export const getRequestReport = createPostRequest('/GetRequestReport')
export const saveProclamation = createPostRequest('/SaveProclamation')
export const cancelProclamation = createPostRequest('/CancelProclamation')
export const getAllOtherRequestInfo = createPostRequest('/GetAllOtherRequestInfo')
export const saveOtherRequestInfo = createPostRequest('/SaveOtherRequestInfo')
export const saveRequestVote = createPostRequest('/SaveRequest_Vote')
export const saveDelivery = createPostRequest('/SaveDelivery')
export const getLoadInfoSearch = createPostRequest('/GetLoadInfoSearch')
export const saveDecision = createPostRequest('/SaveDecision')
export const saveDecisionOther = createPostRequest('/SaveDecisionOther')
export const saveAgent = createPostRequest('/SaveAgent')
export const initMadule = createPostRequest('/InitMadule')
export const cancelVoteInRequest = createPostRequest('/CancelVoteInRequest')
export const saveOtherVote1 = createPostRequest('/SaveOtherVote1')
export const saveOtherVote2 = createPostRequest('/SaveOtherVote2')
export const getAllOtherVote1 = createPostRequest('/GetAllOtherVote1')
export const getAllOtherVote2 = createPostRequest('/GetAllOtherVote2')
export const getListVoteFiche = createPostRequest('/GetListVoteFiche')
