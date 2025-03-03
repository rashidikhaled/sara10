import fileHelper from "src/mixins/fileHelper"

export default {
  mixins: [fileHelper],
  data () {
    return {
      base64image: null,
      currentImageArr: null
    }
  },
  computed: {
    securityBaseUrl () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("securityBaseUrl")
    }
  },
  methods: {
    imgToBase64 (val, extension = "png") {
      if (!val) return ""
      var bytes = new Uint8Array(val)
      return `data:image/${extension};base64,${this.encode(bytes)}`
    },
    encode (input) {
      var keyStr =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      var output = ""
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4
      var i = 0

      while (i < input.length) {
        chr1 = input[i++]
        chr2 = i < input.length ? input[i++] : Number.NaN // Not sure if the index
        chr3 = i < input.length ? input[i++] : Number.NaN // checks are needed here

        enc1 = chr1 >> 2
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
        enc4 = chr3 & 63

        if (isNaN(chr2)) {
          enc3 = enc4 = 64
        } else if (isNaN(chr3)) {
          enc4 = 64
        }
        output +=
          keyStr.charAt(enc1) +
          keyStr.charAt(enc2) +
          keyStr.charAt(enc3) +
          keyStr.charAt(enc4)
      }
      return output
    },
    getImageByID (NidUser) {
      this.toDataURL(
        `${this.securityBaseUrl}/avatar/${NidUser}.png`,
        function (dataUrl) {
          return dataUrl
        }
      )
    },
    async addAvatar (nidUser, imageData) {
      try {
        const file = this.dataURLtoFile(imageData, 'UserAvatar')
        const formData = new FormData()
        formData.append("Nid", nidUser)
        formData.append("avatar", file)

        const headers = new Headers()
        headers.append(
          "Token",
          this.$stSecurity.getters["authorize/token"] || ""
        )
        const response = await fetch(
          `${this.securityBaseUrl}/avatar/post-image`,
          {
            method: "POST",
            body: formData,
            headers
          }
        )
        const res = await response.json()
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    },

    async removeAvatar (nidUser, newUserPic) {
      if (!newUserPic) return
      try {
        const data = await this.$services.security.removeAvatar({
          Nid: nidUser
        })
        const removeRes = this.getResponse(data)
        if (removeRes.success) {
          await this.addAvatar(nidUser, newUserPic)
        }
      } catch (e) {
        console.error(e)
      }
    },
    async toDataURL (url, callback) {
      var xhr = new XMLHttpRequest()
      xhr.onload = await function () {
        var reader = new FileReader()
        reader.onloadend = async function () {
          this.base64image = callback(reader.result)
          if (this.base64image) return this.getImageByIDFromBase64image()
        }.bind(this)
        return reader.readAsDataURL(xhr.response)
      }.bind(this)
      xhr.open("GET", url)
      xhr.responseType = "blob"
      xhr.send()
    },
    async getImageByIDFromBase64image () {
      const test = this.dataURLtoFile(this.base64image, "fileName")
      const arr = await this.fileToByteArray(test)
      this.currentImageArr = arr ?? null
    }
  },
  watch: {}
}
