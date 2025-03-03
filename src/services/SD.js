import endpoints from 'src/config/endpoints'
import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'SD'

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

export const getIncomeList = createPostRequest(endpoints.SD.getIncomeList)
export const getAllFicheByIncomeList = createPostRequest(
  endpoints.SD.getAllFicheByIncomeList
)
export const getIncomeDetails = createPostRequest(endpoints.SD.getIncomeDetails)
export const saveIncome = createPostRequest(endpoints.SD.saveIncome)
export const updateLastRequestState = createPostRequest(
  endpoints.SD.updateLastRequestState
)
export const getCalculateIncome = createPostRequest(
  endpoints.SD.getCalculateIncome
)
export const loadIncomeCalculationSettings = createPostRequest(
  endpoints.SD.loadIncomeCalculationSettings
)
export const getCalculateIncomeAndSave = createPostRequest(
  endpoints.SD.getCalculateIncomeAndSave
)
export const getCalculateIncomeAndSaveAndTemporaryExportFiche = createPostRequest(
  endpoints.SD.getCalculateIncomeAndSaveAndTemporaryExportFiche
)
export const getCalculateLogInfo = createPostRequest(
  endpoints.SD.getCalculateLogInfo
)
export const copyIncome = createPostRequest(endpoints.SD.copyIncome)
export const deleteIncome = createPostRequest(endpoints.SD.deleteIncome)
export const getIncomeFiche = createPostRequest(endpoints.SD.getIncomeFiche)
export const getCIIncomeCalculationJustCalculate = createPostRequest(
  endpoints.SD.getCIIncomeCalculationJustCalculate
)
export const getShIncomeMojaz = createPostRequest(endpoints.SD.getShIncomeMojaz)
export const saveShIncomeMojaz = createPostRequest(
  endpoints.SD.saveShIncomeMojaz
)
export const confirmIncomeOddmentAccount = createPostRequest(
  endpoints.SD.confirmIncomeOddmentAccount
)
export const getIncomeDiscountDefSpecial = createPostRequest(
  endpoints.SD.getIncomeDiscountDefSpecial
)
export const getIncomeFicheSub = createPostRequest(
  endpoints.SD.getIncomeFicheSub
)
export const temporaryExportFiche = createPostRequest(
  endpoints.SD.temporaryExportFiche
)
export const getAllFiche = createPostRequest(endpoints.SD.getAllFiche)
export const permanentExport = createPostRequest(endpoints.SD.permanentExport)
export const cancelPermanentExport = createPostRequest(
  endpoints.SD.cancelPermanentExport
)
export const doAllProcessToPrint = createPostRequest(
  endpoints.SD.doAllProcessToPrint
)
export const getIncomeFicheStatusHistory = createPostRequest(
  endpoints.SD.getIncomeFicheStatusHistory
)
export const ficheConfirmOnDemandCityBank = createPostRequest(
  endpoints.SD.ficheConfirmOnDemandCityBank
)
export const ficheConfirmOnDemandCityBank2 = createPostRequest(
  endpoints.SD.ficheConfirmOnDemandCityBank2
)
export const ficheConfirmEstelamBank = createPostRequest(
  endpoints.SD.ficheConfirmEstelamBank
)
export const ficheRevoke = createPostRequest(endpoints.SD.ficheRevoke)
export const getInstallment = createPostRequest(endpoints.SD.getInstallment)
export const saveInstallment = createPostRequest(endpoints.SD.saveInstallment)
export const getCheckStatus = createPostRequest(endpoints.SD.getCheckStatus)
export const sentCheckToRayvarz = createPostRequest(
  endpoints.SD.sentCheckToRayvarz
)
export const installmentPerformance = createPostRequest(
  endpoints.SD.installmentPerformance
)
export const createShahrBankIncomeGuaranteeInstallment = createPostRequest(
  endpoints.SD.createShahrBankIncomeGuaranteeInstallment
)
export const getIncomes = createPostRequest(endpoints.SD.getIncomes)
export const getCalculatorIncome = createPostRequest(
  endpoints.SD.getCalculatorIncome
)
export const fichePrint = createPostRequest(endpoints.SD.fichePrint)
export const updateIncomeFicheComments = createPostRequest(
  endpoints.SD.updateIncomeFicheComments
)
export const transferFiche = createPostRequest(endpoints.SD.transferFiche)
export const getInstallmentFiche = createPostRequest(
  endpoints.SD.getInstallmentFiche
)
export const getInstallmentListSearch = createPostRequest(
  endpoints.SD.getInstallmentListSearch
)
export const saveInstallmentListSearch = createPostRequest(
  endpoints.SD.saveInstallmentListSearch
)
export const getIncomeFicheFromFicheNo = createPostRequest(
  endpoints.SD.getIncomeFicheFromFicheNo
)
export const getIncomeFicheFromBillID = createPostRequest(
  endpoints.SD.getIncomeFicheFromBillID
)
export const ficheConfirm = createPostRequest(endpoints.SD.ficheConfirm)
export const decodeAndConfirmIncomeVirtualViaWebService = createPostRequest(
  endpoints.SD.decodeAndConfirmIncomeVirtualViaWebService
)
export const getCIIncomeCalculationAll = createPostRequest(
  endpoints.SD.getCIIncomeCalculationAll
)
export const saveIncomeCalculationSettings = createPostRequest(
  endpoints.SD.saveIncomeCalculationSettings
)
export const addLogPose = createPostRequest(endpoints.SD.addLogPose)
export const changeFicheStatusFromConfirmToPrint = createPostRequest(
  endpoints.SD.changeFicheStatusFromConfirmToPrint
)
export const changeFicheStatusFromRevoke = createPostRequest(
  endpoints.SD.changeFicheStatusFromRevoke
)
export const checkStatusByDomain = createPostRequest(
  endpoints.SD.checkStatusByDomain
)
export const getIncomeDiscountDefAll = createPostRequest(
  endpoints.SD.getIncomeDiscountDefAll
)
export const saveIncomeDiscountDef = createPostRequest(
  endpoints.SD.saveIncomeDiscountDef
)
export const deleteCIDiscountDef = createPostRequest(
  endpoints.SD.deleteCIDiscountDef
)
export const decodeAndConfirmBankFile = createPostRequest(
  endpoints.SD.decodeAndConfirmBankFile
)
export const decodeAndConfirmIncomeViaWebService = createPostRequest(
  endpoints.SD.decodeAndConfirmIncomeViaWebService
)
export const changeFicheOwner = createPostRequest(
  endpoints.SD.changeFicheOwner
)
export const getIncomeRefund = createPostRequest('/GetIncome_Refund')
export const ficheRefund = createPostRequest('/FicheRefund')
export const saveIncomeRefund = createPostRequest('/SaveIncome_Refund')
export const GetAllFiche = createPostRequest('/GetAll_Fiche')
export const getAllRequestListWithNosaziCodeType = createPostRequest('/GetAllRequestListWithNosaziCodeType ')
