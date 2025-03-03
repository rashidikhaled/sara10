<template>
  <div>
    <div
      v-if="imagePath"
      class="image-cropper-box bg-gradient1 flex items-end justify-end"
      :style="{ minWidth: width, minHeight: height, background: background }"
    >
      <div
        class="image-cropper--bg"
        :style="{ backgroundImage: `url(${imagePath})` }"
      />
      <div
        :style="{ background: background }"
        v-if="title"
        class="image-cropper--title"
      >
        {{ title }}
      </div>
      <q-btn
        v-if="m === 'e' && allowEditImage"
        round
        color="primary"
        @click="isEditPopupVisible = true"
        icon="edit"
        size="sm"
        title="ویرایش تصویر"
        class="q-ma-sm"
        :class="m === 'e' ? '' : 'readOnly'"
      />
      <a v-if="m === 'e' && allowDownload" :href="imagePath" download="Image.png">
        <q-btn
          round
          color="primary"
          size="sm"
          icon="download"
          title="دانلود تصویر"
          class="q-my-sm"
          :class="m === 'e' ? '' : 'readOnly'"
        />
      </a>
      <q-btn
        round
        color="primary"
        @click="removeFile"
        icon="delete"
        size="sm"
        title="حذف تصویر"
        class="q-ma-sm"
        v-if="m === 'e'"
        :class="m === 'e' ? '' : 'readOnly'"
      />
    </div>
    <div
      v-else
      @click="uploadFile"
      class="image-cropper-box bg-gradient1 flex items-center justify-center"
      :class="m === 'e' ? 'cursor-pointer' : 'readOnly'"
      :style="{ minWidth: width, minHeight: height }"
    >
      <div v-if="title" class="image-cropper--title">
        {{ title }}
      </div>
      <div class="q-mt-md q-pa-md text-center">
        <div v-if="m === 'e'">
          <q-icon
            color="primary"
            name="upload"
            size="md"
            class="q-mb-sm"
            title="آپلود تصویر"
          />
        </div>
        <span style="fontsize: 10px" v-if="m === 'e'">برای قراردادن تصویر اینجا کلیک کنید.</span>
        <span style="fontsize: 10px" v-else>بدون تصویر</span>
      </div>
    </div>
    <q-file
      dense
      outlined
      ref="fileUploader"
      :value="selectedFile"
      @input="fileChangeEvent"
      :accept="accept"
      v-show="false"
    />
    <template v-if="allowEditImage">
      <safa-popup title="ویرایش تصویر" width="950px" height="550px" v-model="isEditPopupVisible">
        <safa-image-editor
          v-if="imagePath"
          :imageFile="imagePath"
          @save-edited-image="handleSaveEditedImage"
          @close-editor="isEditPopupVisible = false"
        />
      </safa-popup>
    </template>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import fileHelper from "src/mixins/fileHelper"

import SafaImageEditor from "./common/safa-image-editor/SafaImageEditor.vue"

export default {
  name: "ImageUploader",

  components: { SafaImageEditor },

  mixins: [baseFormMixin, fileHelper],
  data () {
    return {
      selectedFile: [],
      editableImageSrc: null,
      isEditPopupVisible: false
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
    accept: {
      type: String,
      default: ".png,.jpeg,.jpg"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    },
    title: {
      type: String,
      default: ""
    },
    m: {
      type: String,
      default: "e"
    },
    allowDownload: {
      type: Boolean,
      default: true
    },
    allowEditImage: {
      type: Boolean,
      default: false
    },
    maxFileSize: {
      type: Number,
      default: 4
    }
  },
  methods: {
    uploadFile () {
      if (this.m === "r") return
      this.$refs.fileUploader.pickFiles()
    },
    async fileChangeEvent (file) {
      if (file) {
        const sizeInMB = file.size / 1024 / 1024
        if (sizeInMB > this.maxFileSize) {
          // ${this.maxFileSize}
          const max = this.maxFileSize * 1000
          this.showError(
            `حجم فایل نمیتواند بیشتر از ${max} کیلوبایت باشد.`
          )
          return
        }
        this.selectedFile = await this.fileToByteArray(file)
        this.$emit("input", this.selectedFile)
        this.$emit("getFile", file)
      }
    },
    handleSaveEditedImage ({ fileBytes }) {
      this.selectedFile = fileBytes
      this.$emit("input", this.selectedFile)
      this.isEditPopupVisible = false
    },
    removeFile () {
      if (this.m === "r") return
      this.showConfirm("آیا از حذف تصویر اطمینان دارید؟").onOk(() => {
        this.selectedFile = null
        this.$emit("input", null)
        this.$emit("getFile", null)
      })
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

<style lang="scss" scoped>
.readOnly {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
