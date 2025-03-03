import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'ES'

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

export const getOwnedInfo = createPostRequest('/GetOwned_Info')
export const getShop = createPostRequest('/GetShop')
export const saveShop = createPostRequest('/SaveShop')

export const getHierarchyCode = createPostRequest('/GetHierarchyCode')
export const checkIsExistCodeInSara8 = createPostRequest('/CheckIsExistCodeInSara8')
export const delBaseCodeInfo = createPostRequest('/DelBaseCode_Info')
export const delMortgageDocInfo = createPostRequest('/DelMortgageDoc_Info')
export const getMortgageDocInfo = createPostRequest('/GetMortgageDoc_Info')
export const saveMortgageDocInfo = createPostRequest('/SaveMortgageDoc_Info')

export const getShaftInfo = createPostRequest('/GetShaft_Info')
export const saveShaftInfo = createPostRequest('/SaveShaft_Info')
export const delShaftInfo = createPostRequest('/DelShaft_Info')

export const getJob = createPostRequest('/GetJob')
export const saveJob = createPostRequest('/SaveJob')

export const getHouse = createPostRequest('/GetHouse')
export const saveHouse = createPostRequest('/SaveHouse')

export const getHouseSharing = createPostRequest('/GetHouseSharing')
export const saveHouseSharing = createPostRequest('/SaveHouseSharing')

export const getCIYear = createPostRequest('/GetCI_Year')

export const getApartment = createPostRequest('/GetApartment')
export const saveApartment = createPostRequest('/SaveApartment')

export const getRequestInfo = createPostRequest('/GetRequest_Info')
export const getChangeCodeString = createPostRequest('/GetChangeCodeString_Result')
export const saveRequestInfo = createPostRequest('/SaveRequest_Info')

export const getBuilding = createPostRequest('/GetBuilding')
export const saveBuilding = createPostRequest('/SaveBuilding')
export const getRequestAttorney = createPostRequest('/GetRequest_Attorney')
export const getCIRequestType = createPostRequest('/GetCI_RequestType')
export const checkDuplicatedRequest = createPostRequest('/CheckDuplicatedRequest')
export const saveRequestInEstate = createPostRequest('/SaveRequestInEstate')
export const getRequestInfoWithNIdProc = createPostRequest('/GetRequest_InfoWithNIdProc')
export const getRequester = createPostRequest('/GetRequester')
export const checkBlackList = createPostRequest('/CheckBlackList')
export const loadManagerConfirm = createPostRequest('/LoadManagerConfirm')
export const saveManagerConfirm = createPostRequest('/SaveManagerConfirm')
export const delTransferDocInfo = createPostRequest('/DelTransferDoc_Info')
export const delContractRentInfo = createPostRequest('/DelContractRent_Info')
export const getDebitCreditInfoMessage = createPostRequest('/GetDebitCredit_Info_Message')
export const getDebitCreditInfo = createPostRequest('/GetDebitCredit_Info')
export const saveDebitCreditInfo = createPostRequest('/SaveDebitCredit_Info')
export const loadLayout = createPostRequest('/LoadLayout')
export const saveOwnedInfo = createPostRequest('/SaveOwned_Info')
export const delOwnedInfo = createPostRequest('/DelOwned_Info')
export const searchDocInfo = createPostRequest('/SearchDocInfo')
export const getDocInfo = createPostRequest('/GetDoc_Info')
export const saveDocInfo = createPostRequest('/SaveDoc_Info')
export const getDocInfoNext = createPostRequest('/GetDoc_InfoNext')
export const getDocInfoBack = createPostRequest('/GetDoc_InfoBack')
export const getActiveRevisitAgentList = createPostRequest('/GetActiveRevisitAgentList')
export const getRevisitAgentAssignGroup = createPostRequest('/GetRevisitAgentAssign_Group')
export const getRevisitAgentAssignInOneDay = createPostRequest('/GetRevisitAgentAssign_InOneDay')
export const getBudgetInfo = createPostRequest('/GetBudget_Info')
export const saveBudgetInfo = createPostRequest('/SaveBudget_Info')
export const getSessionInfoMessage = createPostRequest('/GetSession_Info_Message')
export const getSessionInfo = createPostRequest('/GetSession_Info')
export const getRelapseLogByNIdWorkItem = createPostRequest('/GetRelapseLog_ByNIdWorkItem')
export const getPlansprojectsProposalInfo = createPostRequest('/GetPlansprojects_Proposal_Info')
export const getPlansprojectsInfoList = createPostRequest('/GetPlansprojects_Info_List')
export const getPlansprojectsProposalInfoList = createPostRequest('/GetPlansprojects_Proposal_Info_List')
export const savePlansprojectsInfo = createPostRequest('/SavePlansprojects_Info')
export const savePlansprojectsProposalInfo = createPostRequest('/SavePlansprojects_Proposal_Info')
export const getTransferMainInfo = createPostRequest('/GetTransferMain_Info')
export const okPlansProjectsProposalInfo = createPostRequest('/OkPlansprojects_Proposal_Info')
export const delPlansProjectsProposalInfo = createPostRequest('/DelPlansprojects_Proposal_Info')
export const delPlansprojectsInfo = createPostRequest('/DelPlansprojects_Info')

export const saveLegalInfo = createPostRequest('/SaveLegal_Info')
export const delLegalinfo = createPostRequest('/DelLegal_Info')
export const getSupplySourcesInfoMessage = createPostRequest('/GetSupplySources_Info_Message')
export const getLegalInfo = createPostRequest('/GetLegal_Info')

export const getCIBudgetRow = createPostRequest('/GetCI_BudgetRow')
export const saveCIBudgetRow = createPostRequest('/SaveCI_BudgetRow')
export const getFinalArchive = createPostRequest('/GetFinalArchive')

export const getCIEvaluationTechnicianName = createPostRequest('/GetCI_EvaluationTechnician_Name')
export const saveCIEvaluationTechnicianName = createPostRequest('/SaveCI_EvaluationTechnician_Name')
export const getLetterInfoMessage = createPostRequest('/GetLetter_Info_Message')
export const getLetterInfo = createPostRequest('/GetLetter_Info')

export const saveContractRentInfo = createPostRequest('/SaveContractRent_Info')
export const getContractRentInfoRequestList = createPostRequest('/GetContractRent_Info_RequestList')
export const getContractRentInfo = createPostRequest('/GetContractRent_Info')

export const saveSupplySourcesInfo = createPostRequest('/SaveSupplySources_Info')
export const getSupplySourcesInfo = createPostRequest('/GetSupplySources_Info')
export const getTransferMainInfoRequestList = createPostRequest('/GetTransferMain_Info_RequestList')
export const saveTransferMainInfo = createPostRequest('/SaveTransferMain_Info')
export const delSupplySourcesInfo = createPostRequest('/DelSupplySources_Info')

export const getPlansprojectsInfo = createPostRequest('/GetPlansprojects_Info')

export const getTransferDocInfoRequestList = createPostRequest('/GetTransferDoc_Info_RequestList')
export const getRevisitAgentInfo = createPostRequest('/GetRevisitAgentInfo')
export const getTransferDocInfo = createPostRequest('/GetTransferDoc_Info')
export const getTransferMainInfoMessage = createPostRequest('/GetTransferMain_Info_Message')
export const saveRevisitAgent = createPostRequest('/SaveRevisitAgent')
export const deleteRevisitAgent = createPostRequest('/DeleteRevisitAgent')
export const getRequestReport = createPostRequest('/GetRequestReport')
export const getContractReport = createPostRequest('/GetContractReport')
export const getSupplySourcesReport = createPostRequest('/GetSupplySourcesReport')

export const getSearchAll = createPostRequest('/GetSearchAll')
export const getHousePlanInfo = createPostRequest('/GetHousePlan_Info')
export const saveHousePlanInfo = createPostRequest('/SaveHousePlan_Info')
export const getAuctionInfo = createPostRequest('/getAuction_Info')
export const getPlansprojectsInfoMessage = createPostRequest('/GetPlansprojects_Info_Message')
export const delHousePlanInfo = createPostRequest('/DelHousePlan_Info')
export const getContractPartnershipInfo = createPostRequest('/GetContractPartnership_Info')
export const getContractPartnershipInfoRequestList = createPostRequest('/GetContractPartnership_Info_RequestList')
export const saveContractPartnershipInfo = createPostRequest('/SaveContractPartnership_Info')
export const delContractPartnershipInfo = createPostRequest('/DelContractPartnership_Info')
export const getHighCommissionDealsInfo = createPostRequest('/GetHighCommissionDeals_Info')
export const getHighCommissionDealsInfoRequestList = createPostRequest('/GetHighCommissionDeals_Info_RequestList')
export const SaveHighCommissionDealsInfo = createPostRequest('/SaveHighCommissionDeals_Info')
export const delHighCommissionDealsInfo = createPostRequest('/DelHighCommissionDeals_Info')
export const delAuctionInfo = createPostRequest('/DelAuction_Info')

export const getContractBuyInfoRequestList = createPostRequest('/GetContractBuy_Info_RequestList')
export const getContractBuyInfo = createPostRequest('/GetContractBuy_Info')
export const getReplacementResult = createPostRequest('/GetReplacement_Result')

export const saveContractBuySecretariat = createPostRequest('/SaveContractBuy_Secretariat')
export const getBuySignFingerPrint = createPostRequest('/GetBuySignFingerPrint')
export const getRequestContractInfo = createPostRequest('/GetRequestContractInfo')
export const saveContractBuyInfo = createPostRequest('/SaveContractBuy_Info')
export const delContractBuyConfirm = createPostRequest('/DelContractBuy_Confirm')
export const saveContractBuyConfirm = createPostRequest('/SaveContractBuy_Confirm')
export const getSeizinInfo = createPostRequest('/GetSeizin_Info')
export const saveSeizinInfo = createPostRequest('/SaveSeizin_Info')
export const getAuctionInfoRequestList = createPostRequest('/GetAuction_Info_RequestList')
export const delSeizinInfo = createPostRequest('/DelSeizin_Info')
export const getBaseCode = createPostRequest('/GetBaseCode')

export const getContractSaleInfoRequestList = createPostRequest('/GetContractSale_Info_RequestList')
export const delEvaluationInfo = createPostRequest('/DelEvaluation_Info')
export const getContractSaleInfo = createPostRequest('/GetContractSale_Info')
export const saveContractSaleInfo = createPostRequest('/SaveContractSale_Info')
export const saveContractSaleConfirm = createPostRequest('/SaveContractSale_Confirm')
export const saveSignFingerPrint = createPostRequest('/SaveSignFingerPrint')
export const getCreateClasse = createPostRequest('/GetCreateClasse')
export const saveCreateClasse = createPostRequest('/SaveCreateClasse')
export const getAuctionRequest = createPostRequest('/GetAuction_Request')
export const getEvaluationInfoRequestList = createPostRequest('/GetEvaluation_Info_RequestList')
export const getEvaluationInfo = createPostRequest('/GetEvaluation_Info')
export const saveEvaluationInfo = createPostRequest('/SaveEvaluation_Info')

export const getPriorityBudgetSibna2 = createPostRequest('/GetPriorityBudget_Sibna2')

export const delContractSaleConfirm = createPostRequest('/DelContractSale_Confirm')
export const getRequestsArchive = createPostRequest('/GetRequestsArchive')
export const getActiveRequest = createPostRequest('/GetActiveRequest')
export const delContractBuyInfo = createPostRequest('/DelContractBuy_Info')
export const delContractSaleInfo = createPostRequest('/DelContractSale_Info')
export const getApprovalTaskByNIdProcUser = createPostRequest('/GetApprovalTask_ByNIdProcUser')
export const saveApprovalTaskInfo = createPostRequest('/SaveApprovalTask_Info')
export const getCiResourceManagerConfirmDetailsFromCiResourceManagerConfirm = createPostRequest('/GetCI_ResourceManagerConfirmDetails_FromCI_ResourceManagerConfirm')
export const getAuctionConfirm = createPostRequest('/GetAuction_Confirm')
export const copyDocInfo = createPostRequest('/CopyDocInfo')
export const saveSessionInfo = createPostRequest('/SaveSession_Info')
export const saveCIYear = createPostRequest('/SaveCI_Year')
export const getRevisitAgentList = createPostRequest('/GetRevisitAgentList')
export const contractReportArchive = createPostRequest('/ContractReport_Archive')
export const saveLegalOwnerAttorney = createPostRequest('/SaveLegal_Owner_Attorney')
export const savePriorityInfo = createPostRequest('/SavePriority_Info')
export const saveTransferDocInfo = createPostRequest('/SaveTransferDoc_Info')
export const delPriorityInfo = createPostRequest('/DelPriority_Info')
export const saveAuctionInfo = createPostRequest('/SaveAuction_Info')
export const saveAuctionRequest = createPostRequest('/SaveAuction_Request')
export const saveAuctionConfirmfirm = createPostRequest('/SaveAuction_Confirm')
