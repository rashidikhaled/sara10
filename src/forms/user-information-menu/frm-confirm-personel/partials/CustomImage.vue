<template>
  <div>
    <div
      v-if="imagePath"
      class="image-cropper-box flex items-center justify-center"
      style="margin-bottom: 0px"
      :style="{ minWidth: width, minHeight: height, background: background }"
    >
      <div
        class="image-cropper--bg" style="margin-bottom: 0px"
        :style="{ backgroundImage: `url(${imagePath})` }"
      />
      <div
        :style="{ background: background }"
        v-if="title"
        class="image-cropper--title"
      >
        {{ title }}
      </div>
    </div>
    <div
      v-else
      :style="{ minWidth: width, minHeight: height }"
    ></div>
    <q-file
      dense
      outlined
      ref="fileUploader"
      :value="selectedFile"
      v-show="false"
    />
  </div>
</template>

<script>
import fileHelper from "src/mixins/fileHelper"
export default {
  name: "ImageUploader",
  mixins: [ fileHelper ],
  data () {
    return {
      selectedFile: []
    }
  },
  props: {
    value: [Array, String],
    extension: {
      type: String,
      default: "png"
    },
    background: {
      type: String,
      default: "rgba(230, 230, 230, 0.93)"
    },
    width: {
      type: String,
      default: "40px"
    },
    height: {
      type: String,
      default: "40px"
    },
    title: {
      type: String,
      default: ""
    },
    m: {
      type: String,
      default: "r"
    },
    maxFileSize: {
      type: Number,
      default: 4
    }
  },
  methods: {
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
    }
  },
  computed: {
    imagePath () {
      if (!this.value) return ""
      var bytes = new Uint8Array(this.value)
      return `data:image/${this.extension};base64,${this.encode(bytes)}`
    }
  }
}
</script>
