import createService from './baseService'

// ====================================== Create Instance ======================================
// **** Parameters ****
const serviceName = 'systemReportUrl'

// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) => window.getConfigValue(serviceName)
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createService({
  getBaseUrl,
  serviceName,
  headers: {},
  requestCallback: null, // (axiosConfig) => axiosConfig
  responseCallback: null, // (axiosResponse) => new Response
  payloadValidation: false
})

export const setReportParameters = createPostRequest('/SetParameters')
export const getReportParameters = createPostRequest('/GetReportParameters')
export const getClsCorrespondence = createPostRequest('/GetClsCorrespondence')
export const exportToArchive = createPostRequest('/ExportToArchive')
