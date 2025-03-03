import { getStore } from "ui-security"
import useFetch from "ui-fetch"

// options: headers,
export default function createInstance ({
  getBaseUrl,
  serviceName,
  headers,
  requestCallback = null,
  requestBeforeCallback = null,
  responseCallback = null,
  encryption = true
}) {
  function createPostRequest (url) {
    return function (payload, config = {}) {
      const { District = null, ...axiosConfig } =
        config?.config ?? config ?? {}

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
        requestBeforeCallback,
        requestCallback,
        responseCallback,
        rawApi: true,
        encryption,
        axiosDefaults: {
          timeout: 120000
        }
      })

      if (typeof payload === "object" && !Array.isArray(payload)) payload._uid = NidUser

      return request.post(url, payload, axiosConfig)
    }
  }

  return {
    createPostRequest
  }
}
