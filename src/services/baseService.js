import { getStore } from "ui-security"
import useFetch from "ui-fetch"

// options: headers,
export default function createInstance ({
  getBaseUrl,
  serviceName,
  headers,
  requestCallback,
  requestBeforeCallback,
  responseCallback,
  encryption = true,
  payloadValidation = true // check _uid in request body
}) {
  function createPostRequest (url) {
    return function (payload, config = {}) {
      const { District = 1, ...axiosConfig } = config?.config ?? config ?? {}

      const baseUrl = getBaseUrl({ District, payload, config })

      if (!baseUrl) {
        let reason = `آدرس سرویس ${serviceName}`
        if (District) reason += ` برای منطقه ${District}`
        reason += " تعریف نشده است."

        return Promise.reject(reason)
      }

      const store = getStore()

      const isAuthenticated = store.getters["authorize/isAuthenticated"]
      const token = isAuthenticated
        ? store.getters["authorize/token"]
        : undefined
      const Domain =
        (isAuthenticated && store.getters["authorize/loggedUser"]?.domain[0]) ??
        undefined
      const NidSession = isAuthenticated
        ? store.getters["authorize/session"]
        : undefined
      const NidUser = isAuthenticated
        ? store.getters["authorize/userId"]
        : undefined

      const getToken = () => token

      const getHeaders = () => ({
        "Access-Control-Allow-Origin": "*",
        NidSession,
        Domain,
        ...(headers ?? {})
      })

      const request = useFetch(baseUrl, {
        getToken,
        getHeaders,
        requestCallback,
        requestBeforeCallback,
        responseCallback,
        rawApi: true,
        encryption,
        axiosDefaults: {
          timeout: 120000
        }
      })

      if (
        typeof payload === "object" &&
        !Array.isArray(payload)
      ) {
        payload._uid = NidUser
      }

      return request.post(url, payload, axiosConfig)
    }
  }

  return {
    createPostRequest
  }
}

export const getFromConfig = (configName, district = 1, appendJson = true) => {
  const confValue = window.getConfigValue(configName ?? "")
  if (!confValue) return null

  let baseUrl = ""
  if (typeof confValue === "object") {
    baseUrl = confValue[district ?? 1]

    // if baseUrl is undefined then get first key from confValue (object)
    if (!baseUrl) {
      const firstKey = Object.keys(confValue)[0]
      baseUrl = confValue[firstKey]
    }
  } else {
    baseUrl = confValue
  }

  if (appendJson && baseUrl.toLowerCase().indexOf("gateway") === -1) {
    console.warn("نیاز به افزودن /json به سرویس " + configName)
  }
  // if (appendJson) {
  //   return baseUrl.replace(/\/$/, '') + '/json'
  // }
  return baseUrl.replace(/\/$/, "") + "/"
}
