import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'generalIncome'

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

export const getGeneralIncome = createPostRequest('/GetGeneralIncome')
export const getGeneralIncomeFiches = createPostRequest('/GetGeneralIncomeFiches')
export const getCIGeneralIncomeCalculationList = createPostRequest('/GetCI_GeneralIncomeCalculationList')
export const exportGeneralIncomeFiche = createPostRequest('/ExportGeneralIncomeFiche')
export const getGeneralIncomeFicheInfo = createPostRequest('/GetGeneralIncomeFicheInfo')
export const changeStatusOfFiche = createPostRequest('/ChangeStatusOfFcihe')
export const addLogPose = createPostRequest('/AddLogPose')
export const decodeAndConfirmBankFile = createPostRequest('/DecodeAndConfirmBankFile')

export const saveGeneralIncome = createPostRequest('/SaveGeneralIncome')
