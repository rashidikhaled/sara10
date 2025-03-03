import endpoints from 'src/config/endpoints'
import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'engActivity'

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

export const GetFreeCapacityInfo = createPostRequest(endpoints.engActivity.GetFreeCapacityInfo)
export const GetUserResourcePermissions = createPostRequest(endpoints.engActivity.GetUserResourcePermissions)
export const ExitOfCapacity = createPostRequest(endpoints.engActivity.ExitOfCapacity)
export const FreeCapacity = createPostRequest(endpoints.engActivity.FreeCapacity)
export const GetBuildingExecRepInfoMainListInNidWorkItem = createPostRequest(endpoints.engActivity.GetBuildingExecRep_Info_MainList_InNidWorkItem)
export const GetRefEngineerCoordinatorList = createPostRequest(endpoints.engActivity.GetRefEngineerCoordinator_List)
export const GetKartablBuildingExecRep = createPostRequest(endpoints.engActivity.GetKartablBuildingExecRep)
export const GetTarefe = createPostRequest(endpoints.engActivity.GetTarefe)
export const SaveTarefe = createPostRequest(endpoints.engActivity.SaveTarefe)
export const AcceptFichesFromBank = createPostRequest(endpoints.engActivity.AcceptFichesFromBank)
export const AcceptFiches = createPostRequest(endpoints.engActivity.AcceptFiches)
export const GetIncomeDoc = createPostRequest(endpoints.engActivity.GetIncomeDoc)
export const GetIncomeSymptoms = createPostRequest(endpoints.engActivity.GetIncomeSymptoms)
export const SaveIncomeSymptoms = createPostRequest(endpoints.engActivity.SaveIncomeSymptoms)
export const GetPrintFicheHistory = createPostRequest(endpoints.engActivity.GetPrintFicheHistory)
export const GetCalcDetails = createPostRequest(endpoints.engActivity.GetCalcDetails)
export const GetFilIncomeReport = createPostRequest(endpoints.engActivity.GetFilIncomeReport)
export const GetEngIncomeFishInFishSerial = createPostRequest(endpoints.engActivity.GetEngIncomeFishInFishSerial)
export const GetEngIncomeFishInBillPayID = createPostRequest(endpoints.engActivity.GetEngIncomeFishInBillPayID)
export const ConfirmFiche = createPostRequest(endpoints.engActivity.ConfirmFiche)
export const SearchIncome = createPostRequest(endpoints.engActivity.SearchIncome)
export const DecodeAndConfirmViaWebService = createPostRequest(endpoints.engActivity.DecodeAndConfirmViaWebService)
export const SaveConfirmFicheIncomePayment = createPostRequest(endpoints.engActivity.SaveConfirmFicheIncome_Payment)
export const LoadEngineerDuty = createPostRequest(endpoints.engActivity.LoadEngineerDuty)
export const LoadEngDutyFicheCalculateList = createPostRequest(endpoints.engActivity.LoadEngDutyFicheCalculateList)
export const SaveIncomeDoc = createPostRequest(endpoints.engActivity.SaveIncomeDoc)
export const DeleteIncomeDoc = createPostRequest(endpoints.engActivity.DeleteIncomeDoc)
export const ConfirmCoordinator = createPostRequest(endpoints.engActivity.ConfirmCoordinator)
export const GetBlackListWitCode = createPostRequest(endpoints.engActivity.GetBlackListWitCode)
export const GetFilInfoAndReferToEngineer = createPostRequest(endpoints.engActivity.GetFilInfoAndReferToEngineer)
export const AttachEngineerFromNidProcToNidProc = createPostRequest(endpoints.engActivity.AttachEngineerFromNidProcToNidProc)
export const GetCiSMSSendTxt = createPostRequest(endpoints.engActivity.GetCiSMSSendTxt)
export const GetSMSBody = createPostRequest(endpoints.engActivity.GetSMSBody)
export const SendSMSToAllEng = createPostRequest(endpoints.engActivity.GetSMSBody)
export const SaveBlackList = createPostRequest(endpoints.engActivity.SaveBlackList)
export const GetBlackList = createPostRequest(endpoints.engActivity.GetBlackList)
export const DeleteBlackList = createPostRequest(endpoints.engActivity.DeleteBlackList)
export const LoadFilRevisit = createPostRequest(endpoints.engActivity.LoadFilRevisit)
export const SaveFilRevisit = createPostRequest(endpoints.engActivity.SaveFilRevisit)
export const GetBuildingExecRepCommentsList = createPostRequest(endpoints.engActivity.GetBuildingExecRepCommentsList)
export const SaveBuildingExecRepComments = createPostRequest(endpoints.engActivity.SaveBuildingExecRepComments)
export const GetIncomeFicheLog = createPostRequest(endpoints.engActivity.GetIncomeFicheLog)
export const CalculateEngineerDuty = createPostRequest(endpoints.engActivity.CalculateEngineerDuty)
export const ConfirmEngineerDutyFiche = createPostRequest(endpoints.engActivity.ConfirmEngineerDutyFiche)
export const RevokeEngineerDutyFiche = createPostRequest(endpoints.engActivity.RevokeEngineerDutyFiche)
export const ExportEngineerDutyFiche = createPostRequest(endpoints.engActivity.ExportEngineerDutyFiche)
export const SaveEngDutyOddmentAccount = createPostRequest(endpoints.engActivity.SaveEngDutyOddmentAccount)
export const LoadEngDutyOddmentAccount = createPostRequest(endpoints.engActivity.LoadEngDutyOddmentAccount)
export const ChangeEngineerPayoffYear = createPostRequest(endpoints.engActivity.ChangeEngineerPayoffYear)
export const GetOfficeInfoWithCode = createPostRequest(endpoints.engActivity.GetOfficeInfoWithCode)
export const GetReferOfficeInfo = createPostRequest(endpoints.engActivity.GetReferOfficeInfo)
export const DoRefManagerDeleteEngineer = createPostRequest(endpoints.engActivity.DoRefManagerDeleteEngineer)
export const GetRefToEngineerValidation = createPostRequest(endpoints.engActivity.GetRefToEngineerValidation)
export const RevokeCoordinator = createPostRequest(endpoints.engActivity.RevokeCoordinator)
export const SetGreen = createPostRequest(endpoints.engActivity.SetGreen)
export const GetRefToEngineerWithEngCode = createPostRequest(endpoints.engActivity.GetRefToEngineerWithEngCode)
export const getEngineerPopupInfo = createPostRequest(endpoints.engActivity.GetEngineerPopupInfo)
export const GetReferAllToEngineer = createPostRequest(endpoints.engActivity.GetReferAllToEngineer)
export const GetRefEngineerCancelList = createPostRequest(endpoints.engActivity.GetRefEngineerCancelList)
export const NotConfirmRefEngineerCancel = createPostRequest(endpoints.engActivity.NotConfirmRefEngineerCancel)
export const ConfirmRefEngineerCancel = createPostRequest(endpoints.engActivity.ConfirmRefEngineerCancel)
export const GetRefStayForRefChecker = createPostRequest(endpoints.engActivity.GetRefStayForRefChecker)
export const LoadSendChecker = createPostRequest(endpoints.engActivity.LoadSendChecker)
export const SendToChecker = createPostRequest(endpoints.engActivity.SendToChecker)
export const GetSMSNumber = createPostRequest(endpoints.engActivity.GetSMSNumber)
