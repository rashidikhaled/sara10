import createInstance, { getFromConfig } from './baseService'
import endpoints from 'src/config/endpoints'

// ====================================== Create Instance ======================================

// **** Parameters ****
const serviceName = 'securityBaseUrl'

// getFromConfig(configName: string, district: string, appendJson = true) => baseUrl: string
const getBaseUrl = ({ District, payload, config }) => getFromConfig(serviceName, District, true)
// **** Parameters ****

// **** Request Configuration ****
const { createPostRequest } = createInstance({
  getBaseUrl,
  serviceName,
  headers: {},
  requestCallback: null, // (axiosConfig) => axiosConfig
  responseCallback: null, // (axiosResponse) => new Response
  payloadValidation: false
})
// **** Request Configuration ****

// ====================================== Create Instance ======================================

export const getUsersFromJobLocation = createPostRequest('v2/job-locations/list-job-location-users')
export const searchUsersPaging = createPostRequest('/users/list')
// export const getGroupUsers = createPostRequest(endpoints.security.getGroupUsers) // 404
export const getGroupUsers = createPostRequest('v2/users/get-group-users')
export const checkOtherUserLogin = createPostRequest(endpoints.security.checkOtherUserLogin)
export const getUserFromNameLow = createPostRequest(endpoints.security.getUserFromNameLow)
export const changePassword = createPostRequest(endpoints.security.changePassword)
export const recoveryPassword = createPostRequest(endpoints.security.recoveryPassword)
export const addResourceWithParent = createPostRequest('/AddResourceWithParent')
export const getUserResourcePermissions = createPostRequest('/GetUserResourcePermissions')
export const addResource = createPostRequest('/workspace/add-resource')
export const getResources = createPostRequest('/GetResources')
export const getSubsetList = createPostRequest('/v2/users-subset/subset-list')
export const userList = createPostRequest('/v2/users/user-list')
export const userExists = createPostRequest('/v2/users/user-exists')

export const getCIList = createPostRequest('/v2/ci/ci-list')
export const getAllJobLocations = createPostRequest('/v2/job-locations/list-job-location')
export const getJobLocationInfoByID = createPostRequest('/v2/job-locations/get-job-location')
export const getJobLocationUsers = createPostRequest('/v2/job-locations/list-job-location-users')
export const addUser = createPostRequest('/users/add')
export const addUserNew = createPostRequest('/v2/users/add')
export const getUserById = createPostRequest('/users/get-userinfo')
export const userSignature = createPostRequest('/v2/users/user-signature')
export const editUserById = createPostRequest('/users/edit-userinfo/')
export const addJobLocation = createPostRequest('/v2/job-locations/add-job-location')
export const setJobLocation = createPostRequest('/v2/users/set-job-location')
export const getUserStorage = createPostRequest('/v2/user-storage/get')
export const upsertUserStorage = createPostRequest('/v2/user-storage/upsert')
export const addAvatar = createPostRequest('/avatar/post-image')
export const removeAvatar = createPostRequest('/avatar/remove')
export const checkNationalCode = createPostRequest('/v2/co-services/check-national-code') // This method is equivalent to "CheckShahkar" in Sara8
export const civilAuthorityStatus = createPostRequest('/v2/co-services/civil-authority-status') //  for To be alive or dead
export const getGoupList = createPostRequest('/v2/groups/group-list')
export const resourceAddFetch = createPostRequest('/v2/permission-forms/resource-add-fetch')
export const formPermissions = createPostRequest('/v2/permission-forms/form-permissions')
export const resourceFetch = createPostRequest('/v2/permission-forms/resource-fetch')
export const otpSet = createPostRequest('/v2/otp/otp-set')
export const otpGet = createPostRequest('/v2/otp/otp-get')
