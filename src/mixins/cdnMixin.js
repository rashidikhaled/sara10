import { appendUrls } from "../utils"

export default {
  methods: {
    generateHelpFileURL (fileName) {
      const fileURL = new URL(
        appendUrls([window.getConfigValue("securityBaseUrl"), "dl/help", fileName])
      )

      fileURL.searchParams.append(
        "token",
        this.$stSecurity.getters["authorize/token"]
      )

      return fileURL.href
    }
  }
}
