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

export const FindOfficeWithCode = createPostRequest(endpoints.office.FindOfficeWithCode)
export const SaveOfficeInfo = createPostRequest(endpoints.office.SaveOfficeInfo)
export const GetMemOffices = createPostRequest(endpoints.office.GetMemOffices)
export const GetEngInfoWithCode = createPostRequest(endpoints.office.GetEngInfoWithCode)
export const GetEngOrganOfficeInfoList = createPostRequest(endpoints.office.GetEngOrganOfficeInfoList)
export const SaveMemInfo = createPostRequest(endpoints.office.SaveMemInfo)
export const ChangMemOffCode = createPostRequest(endpoints.office.ChangMemOffCode)
export const LoadEngOrganOffice = createPostRequest(endpoints.office.LoadEngOrganOffice)
export const SaveEngOrganOffice = createPostRequest(endpoints.office.SaveEngOrganOffice)
export const GetAllOffices = createPostRequest(endpoints.office.GetOffices)
