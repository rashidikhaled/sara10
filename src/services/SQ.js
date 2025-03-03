import createInstance, { getFromConfig } from './baseService'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'SQ'

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

export const loadConfirmeAvarez = createPostRequest('LoadConfirmeAvarez')
export const getAllInsurance = createPostRequest('GetAllInsurance')
export const loadInsurance = createPostRequest('LoadInsurance')
export const saveInsuranceIncome = createPostRequest('SaveInsuranceIncome')
export const getRequestSec = createPostRequest('Get_RequestSec')
export const sendToInsuranceCartabl = createPostRequest('SendToInsuranceCartabl')
export const changeStatusRequestInInsurance = createPostRequest('ChangeStatusRequestInInsurance')
export const deleteFromInsurance = createPostRequest('DeleteFromInsurance')
export const saveBayganiAndRemoved = createPostRequest('SaveBayganiAndRemoved')
