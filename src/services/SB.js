import endpoints from 'src/config/endpoints'
import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'SB'

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

export const confirmShEconomicPriceInNosaziCode = createPostRequest(
  endpoints.SB.confirmShEconomicPriceInNosaziCode
)
export const getEconomicPriceInNosaziCode = createPostRequest(
  endpoints.SB.getEconomicPriceInNosaziCode
)
export const saveGroupEconomicPriceInNosaziCode = createPostRequest(
  endpoints.SB.saveGroupEconomicPriceInNosaziCode
)
export const getAllCIValBlockFord = createPostRequest(
  endpoints.SB.getAllCIValBlockFord
)
export const getFinancePrice = createPostRequest(endpoints.SB.getFinancePrice)
export const getDutyFicheByBillId = createPostRequest(
  endpoints.SB.getDutyFicheByBillId
)
export const getDutyFicheByBillID = createPostRequest(
  endpoints.SB.getDutyFicheByBillID
)
export const transferDutyFiches = createPostRequest(
  endpoints.SB.transferDutyFiches
)
export const saveDutyExemptionRole = createPostRequest(
  endpoints.SB.saveDutyExemptionRole
)
export const searchDutyExemptionRole = createPostRequest(
  endpoints.SB.searchDutyExemptionRole
)
export const getDutyExemptionRole = createPostRequest(
  endpoints.SB.getDutyExemptionRole
)
export const getShifrieInfo = createPostRequest(endpoints.SB.getShifrieInfo)
export const saveDutyExemptionBase = createPostRequest(
  endpoints.SB.saveDutyExemptionBase
)
export const getDutyExemptionBase = createPostRequest(
  endpoints.SB.getDutyExemptionBase
)
export const getDutyExemptionRoleDeletedItems = createPostRequest(
  endpoints.SB.getDutyExemptionRoleDeletedItems
)
export const getDutyExemptionBaseDeletedItems = createPostRequest(
  endpoints.SB.getDutyExemptionBaseDeletedItems
)
export const getDutyCalculateHeaders = createPostRequest(
  endpoints.SB.getDutyCalculateHeaders
)
export const getShopCodeInfo = createPostRequest(endpoints.SB.getShopCodeInfo)
export const getJobNames = createPostRequest(endpoints.SB.getJobNames)
export const getDeletedCodeInfo = createPostRequest(
  endpoints.SB.getDeletedCodeInfo
)
export const getDutyFichesPayCount = createPostRequest(
  endpoints.SB.getDutyFichesPayCount
)
export const getDutyOddmentAccount = createPostRequest(
  endpoints.SB.getDutyOddmentAccount
)
export const getDutyCalculateHistoryHeaders = createPostRequest(
  endpoints.SB.getDutyCalculateHistoryHeaders
)
export const getDutyMafasaHesab = createPostRequest(
  endpoints.SB.getDutyMafasaHesab
)
export const getDutyFinancialBase = createPostRequest(
  endpoints.SB.getDutyFinancialBase
)
export const getDutyComments = createPostRequest(endpoints.SB.getDutyComments)
export const getCodeInfo = createPostRequest(endpoints.SB.getCodeInfo)
export const getDutyFicheSubs = createPostRequest(endpoints.SB.getDutyFicheSubs)
export const getPayOffYear = createPostRequest(endpoints.SB.getPayOffYear)
export const saveDutyComments = createPostRequest(endpoints.SB.saveDutyComments)
export const saveDutyOddmnetAccount = createPostRequest(
  endpoints.SB.saveDutyOddmnetAccount
)
export const setPayOffyear = createPostRequest(endpoints.SB.setPayOffyear)
export const cancelOddmentAccount = createPostRequest(
  endpoints.SB.cancelOddmentAccount
)
export const confirmFiche = createPostRequest(endpoints.SB.confirmFiche)
export const updateLogPose = createPostRequest('/UpdateLogPose')
export const addLogPose = createPostRequest(endpoints.SB.addLogPose)
export const confirmFicheViaBankService = createPostRequest(
  endpoints.SB.confirmFicheViaBankService
)
export const confirmFicheViaBankService2 = createPostRequest(
  endpoints.SB.confirmFicheViaBankService2
)
export const estelamBank = createPostRequest(endpoints.SB.estelamBank)
export const cancelFiche = createPostRequest(endpoints.SB.cancelFiche)
export const deleteFiche = createPostRequest(endpoints.SB.deleteFiche)
export const getDutyFiches = createPostRequest(endpoints.SB.getDutyFiches)
export const getNidNosaziCode = createPostRequest(endpoints.SB.getNidNosaziCode)
export const getDutyConfirmFichesFromView = createPostRequest(
  endpoints.SB.getDutyConfirmFichesFromView
)
export const cancelFicheMultiPayment = createPostRequest(
  endpoints.SB.cancelFicheMultiPayment
)
export const getDeletedDutyFiches = createPostRequest(
  endpoints.SB.getDeletedDutyFiches
)
export const reCycleFiche = createPostRequest(endpoints.SB.reCycleFiche)
export const getDutyCanceledFiches = createPostRequest(
  endpoints.SB.getDutyCanceledFiches
)
export const calculateDuty = createPostRequest(endpoints.SB.calculateDuty)
export const exportFiche = createPostRequest(endpoints.SB.exportFiche)
export const calcAndExport = createPostRequest(endpoints.SB.calcAndExport)
export const setIsSure = createPostRequest(endpoints.SB.setIsSure)
export const saveDutyMafasaHesab = createPostRequest(
  endpoints.SB.saveDutyMafasaHesab
)
export const updateMafasaHesab = createPostRequest(
  endpoints.SB.updateMafasaHesab
)
export const transferDutyMafasaHesab = createPostRequest(
  endpoints.SB.transferDutyMafasaHesab
)
export const saveDutyFinancialBase = createPostRequest(
  endpoints.SB.saveDutyFinancialBase
)
export const deleteSession = createPostRequest(endpoints.SB.deleteSession)
export const getDutyFicheByFicheNo = createPostRequest(
  endpoints.SB.getDutyFicheByFicheNo
)
export const getTransferFicheLogList = createPostRequest(
  endpoints.SB.getTransferFicheLogList
)
export const decodeAndConfirmBankFile = createPostRequest(
  endpoints.SB.decodeAndConfirmBankFile
)
export const decodeAndConfirmBankFileNew = createPostRequest(
  endpoints.SB.decodeAndConfirmBankFileNew
)
export const decodeAndConfirmViaWebService = createPostRequest(
  endpoints.SB.decodeAndConfirmViaWebService
)
export const transferDutyFicheForPrint = createPostRequest(
  endpoints.SB.transferDutyFicheForPrint
)
export const getBankFileError = createPostRequest(endpoints.SB.getBankFileError)

export const loadDutyExemption = createPostRequest(
  endpoints.SB.loadDutyExemption
)
export const saveDutyExemption = createPostRequest(
  endpoints.SB.saveDutyExemption
)
export const getNidWorkItems = createPostRequest(endpoints.SB.getNidWorkItems)
export const getDutyCalculateDetails = createPostRequest(
  endpoints.SB.getDutyCalculateDetails
)
export const getNidBase = createPostRequest(endpoints.SB.getNidBase)
export const getEconomicPriceInEdge = createPostRequest(
  endpoints.SB.getEconomicPriceInEdge
)
export const savePrices = createPostRequest(endpoints.SB.savePrices)
export const saveGroupEconomicPriceInEdge = createPostRequest(
  endpoints.SB.saveGroupEconomicPriceInEdge
)
export const getDutyFicheForBankFile = createPostRequest(
  endpoints.SB.getDutyFicheForBankFile
)
export const retriveCanceledFicheToMainTable = createPostRequest(
  endpoints.SB.retriveCanceledFicheToMainTable
)
export const getTmpLand = createPostRequest(endpoints.SB.getTmpLand)
export const getDutyFicheSubsForJob = createPostRequest(
  endpoints.SB.getDutyFicheSubsForJob
)
export const getDutyFicheByBarcode = createPostRequest(
  endpoints.SB.getDutyFicheByBarcode
)
export const getActDateHistoryList = createPostRequest(
  endpoints.SB.getActDateHistoryList
)
export const getActDateHistory = createPostRequest(
  endpoints.SB.getActDateHistory
)
export const saveTmpTables = createPostRequest(endpoints.SB.saveTmpTables)
export const getTmpBuilding = createPostRequest(endpoints.SB.getTmpBuilding)
export const getTmpApar = createPostRequest(endpoints.SB.getTmpApar)
export const getTmpEdge = createPostRequest(endpoints.SB.getTmpEdge)
export const saveActDateHistory = createPostRequest(
  endpoints.SB.saveActDateHistory
)
export const deleteActDateHistory = createPostRequest(
  endpoints.SB.deleteActDateHistory
)
export const getShPriceCiTableNames = createPostRequest(
  endpoints.SB.getShPriceCiTableNames
)
export const getShPrice = createPostRequest(endpoints.SB.getShPrice)
export const getShCIForPrice = createPostRequest(endpoints.SB.getShCIForPrice)
export const saveShPrice = createPostRequest(endpoints.SB.saveShPrice)
export const deleteShPriceByCItableName = createPostRequest(
  endpoints.SB.deleteShPriceByCItableName
)
// export const renameTableTitle = createPostRequest(endpoints.SB.RenameTableTitle)
export const renameTableTitle = createPostRequest(
  '/RenameTableTitle'
)
export const collectiveFichesPrint = createPostRequest(
  endpoints.SB.collectiveFichesPrint
)
export const getCiValBlockFord = createPostRequest(
  endpoints.SB.getCiValBlockFord
)
export const SaveShPrice = createPostRequest(
  endpoints.SB.SaveShPrice
)
export const deleteShPrice = createPostRequest(
  endpoints.SB.deleteShPrice
)
export const getDutyCalculateHistoryDetailsByYaer = createPostRequest('/GetDutyCalculateHistoryDetailsByYaer')
export const getDutyCalculateHistoryDetails = createPostRequest('/GetDutyCalculateHistoryDetails ')
export const getBaseOwnerBySessions = createPostRequest('/GetBase_OwnerBySessions')
export const getDutyFichesForCommision77 = createPostRequest('GetDutyFichesForCommision77')
export const getClalculateLogForCommision77 = createPostRequest('GetClalculateLogForCommision77')
export const getListRequestInfoByRandomCommission = createPostRequest('GetListRequestInfoByRandomCommission')
export const saveRandomCommission = createPostRequest('SaveRandomCommission')
