<template>
<div class="image-cropper-box bg-gradient1" :style="{width: width, height: height}">
    <div :style="{backgroundImage: `url(${imagePath})`}" class="image-cropper--bg"></div>
    <div class="image-cropper--title" v-if="title">
      {{ title }}
    </div>
    </div>
</template>

<script>
export default {
  name: 'image-cropper',
  computed: {
    imagePath () {
      // console.log(this.initialPath)
      if (!this.initialPath) return ''
      var bytes = new Uint8Array(this.initialPath)
      return `data:image/${this.extension};base64,${this.encode(bytes)}`
    }
  },
  props: {
    initialPath: {
      type: String,
      default: ''
    },
    extension: {
      type: String,
      default: 'png'
    },
    width: {
      type: String,
      default: '300px'
    },
    height: {
      type: String,
      default: '300px'
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {

    encode (input) {
      var keyStr =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      var output = ''
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
  }
}
</script>
