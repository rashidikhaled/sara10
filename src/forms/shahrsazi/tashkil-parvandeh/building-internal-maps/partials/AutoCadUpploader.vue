<template>
  <div>
    <div class="q-ml-sm">
      <q-btn
        :disable="disable"
        unelevated
        @click="addFile"
        color="green"
        icon="add"
        size="sm"
      >
        بارگذاری فایل
      </q-btn>
    </div>
    <div
      class="autocadUploader"
    >
      <q-uploader
        :label="label"
        @removed="removed"
        @added="uploadFile"
        :autoUpload="autoUpload"
        ref="uploader"
        multiple
        :before="[
          {
            icon: 'image',
            handler() {
              showDialog();
            },
          },
        ]"
        :style="{ background: backColor }"
        :form-fields="[
          { name: 'BizCode', value: this.bizcode },
          { name: 'NidTree', value: this.nidTree },
          { name: 'IsSaveOrginal', value: this.isSaveOrginal },
          { name: 'Description', value: this.text },
          { name: 'DefaultThumbnail', value: this.DefaultThumbnail },
          { name: 'NidClasses', value: this.nidClasses },
          { name: 'IsVerification', value: this.isVerification },
          { name: 'State', value: this.state },
        ]"
        color="transparent"
        auto-expand
        hide-underline
        @uploaded="uploaded"
        @failed="failed"
        :factory="factoryFn"
        @rejected="onRejected"
        :filter="checkFileType"
        :max-file-size="maxFileSize"
        class="autocadUploader_q no-shadow"
      >
      </q-uploader>

      <q-input
        v-model="text"
        v-if="showDescription"
        type="textarea"
        :max-height="100"
      />
      <input type="file" ref="inp" v-show="false" @change="handleFileChange"/>
      <div
        v-show="!showAddButton"
        style="direction: rtl"
        ref="upload_operation_panel"
        class="row q-col-gutter-sm"
      >
        <div v-for="(imageSrc, index) in src" :key="index" style="width:250px">
          <q-img

            class="q-pa-sm q-my-sm"
            :src="imageSrc.base64"
            spinner-color="white"
            style="height: 140px; max-width: 250px"
          >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              <q-icon size="md" name="photo_camera"/>
            </div>
          </template>
          </q-img>
          <safa-label>{{imageSrc.name}}</safa-label>
          <q-btn
            :disable="disable"
            unelevated
            color="primary"
            icon="download"
            style="margin: 2px"
            size="sm"
            @click="exportFile"
          >
            دانلود
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { appendUrls } from 'src/utils'
import fileHelper from 'src/mixins/fileHelper'

export default {
  name: 'AutoCadUpploader',
  mixins: [fileHelper],

  props: {
    allFiles: {
      type: Array,
      default: () => []
    },
    autoUpload: {
      type: Boolean
    },
    bizcode: {
      type: String
    },
    UserGuid: {
      type: String
    },
    nidTree: {
      type: Number,
      default: 0
    },
    isSaveOrginal: {
      default: true
    },
    description: {
      default: ''
    },
    showDescription: {
      default: false
    },
    userName: {
      type: String
    },
    password: {
      type: String
    },
    maxFileSize: {
      type: Number,
      default: 2024000
    },
    maxFileSizeAlert: {
      type: String,
      default: 'اندازه یا نوع فایل معتبر نمی باشد'
    },
    nidClasses: {
      type: String
    },
    userLoginName: String,
    userLoginId: String,
    state: {
      type: String,
      default: ''
    },
    showAddButton: {
      type: Boolean,
      default: true
    },
    backColor: {
      type: String,
      default: 'white'
    },
    disable: {
      type: Boolean
    },
    error: {
      type: String,
      default: ''
    },
    fileTypes: {
      type: String
    },
    label: {
      type: String
    },
    isVerification: {
      type: Boolean
    }
  },
  methods: {
    createPostRequest (url) {
      return function (data, config) {
        // eslint-disable-next-line no-undef
        // const baseUrl = window.getConfigValue('CadWs')
        const baseUrl = 'http://192.168.100.170:7000/Cadws/RadUploadHandlerCadWs.ashx'
        if (!baseUrl) {
          return Promise.reject('آدرس سرویس CadWs تعریف نشده است')
        }
        axios.interceptors.request.use(function (config) {
          // Do something before request is sent
          console.log(config)
          return config
        }, function (error) {
          // Do something with request error
          return Promise.reject(error)
        })

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
          // Do something with response data
          console.log(response)
          return response
        }, function (error) {
          // Do something with response error
          console.log(error)
          return Promise.reject(error)
        })
        return axios.post(appendUrls([baseUrl]), data, {
          // withCredentials: true,
          crossDomain: true
        })
      }
    },
    async uploadFile (e) {
      // const formData = new FormData();
      // formData.append("0_RadUAG_fileName", e[0].name);
      // formData.append("0_RadUAG_position", 0);
      // formData.append("0_RadUAG_newFileRequest", true);
      // formData.append("RadUAG_targetFolder", "ClientBin\UserUploads");
      // formData.append("0_RadUAG_finalFileRequest", true);
      // formData.append("RadUAG_overwriteExistingFiles", "bb15237f-7d20-49b9-84f2-f5173401eacc");
      // formData.append("0_prmFileName", e[0].name);
      // formData.append("0_prmGroupGuid", "00000000-0000-0000-0000-000000000000");
      // formData.append("0_prmBizId", this.bizcode);
      // formData.append("0_prmUserGuid", this.UserGuid);
      // formData.append("0_Color", "#FFFFFFFF");
      // formData.append("0_RadUAG_finalUploadRequest", true);
      // formData.append("file0", e[0]);
      // formData.append("0_RadUAG_position", 0);
      // let upload=this.createPostRequest(formData)
      // await upload(formData)
      const templateArray = await this.getBase64(e[0])
      this.$emit('added', { File: templateArray, FileName: e[0].name }) // this should update
    },
    exportFile () {
      const file = this.selectedFile
      if (!file) return
      this.downloadFile(file)
    },
    async parseTemplateFile (template) {
      if (template) {
        const bytearray = template.Image
        const filename = template.Name
        if (bytearray !== null && !Array.isArray(bytearray)) {
          this.selectedFile = this.dataURLtoFile(bytearray, filename)
          return this.selectedFile
        } else {
          const mimeType = await this.getImageMimeType(bytearray)
          const blob = new Blob([new Uint8Array(bytearray)], {
            type: mimeType
          })
          this.selectedFile = this.blobToFile(blob, filename)
          return this.selectedFile
        }
      } else {
        return this.selectedFile
      }
    },
    startUpload () {
      this.backColor = 'white'
      this.disable = true
      this.$refs.uploader.upload()
    },
    addFile () {
      this.$refs.uploader.pickFiles()
    },
    removed () {
      this.showAddButton = this.$refs.uploader.files.length === 0
      this.backColor = 'white'
    },
    added () {
      this.showAddButton = false
      var self = this.$refs
      setTimeout(() => {
        var uploaderList = this.$el.querySelector('.q-uploader__list')
        uploaderList.appendChild(self.upload_operation_panel)
      }, 20)
    },
    uploaded (info, xhr) {
      this.disable = false
      var data = JSON.parse(info.xhr.response)
      this.$emit('uploaded', data)

      if (this.backColor !== 'rgb(255 197 192)') {
        this.backColor = 'rgb(164 255 186)'
      }
      info.files[0].__progressLabel = 'با موفقیت بارگذاری شد'
    },
    failed (info, xhr, e) {
      this.disable = false
      this.backColor = 'rgb(255 197 192)'
      if (info.xhr.response) {
        var data = JSON.parse(info.xhr.response)
        this.error = JSON.parse(data.Message).ErrorMessage
      } else {
        this.error = 'خطا در بارگذاری اطلاعات'
      }
      this.$emit('failed', this.error)
      info.files[0].__progressLabel = this.error
      info.files[0].__sizeLabel = ''
    },
    factoryFn (file) {
      return new Promise((resolve, reject) => {
        // const token = archiveStore.archiveToken;
        // resolve({
        //   //   url: this.url,
        //   method: "POST",
        //   headers: [{ name: "Authorization", value: `${token}` }],
        // });
      })
    },
    showDialog () {
      this.$refs.inp.click()
    },
    handleFileChange (e) {
      var file = e.target.files[0]
      this.internalGetBase64(file)
      this.$emit('input', e.target.files[0])
    },
    internalGetBase64 (file) {
      var self = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        self.DefaultThumbnail = reader.result.replace(
          /^data:image\/(png|jpeg);base64,/,
          ''
        )
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    },
    checkFileType (files) {
      if (this.fileTypes === undefined) return files
      var filterfiles = []
      var extensions = this.fileTypes.split(',')
      files.map((file) => {
        var fileExt = file.type.split('/')
        extensions.map((ext) => {
          if (fileExt[1] === ext) {
            filterfiles.push(file)
          }
        })
      })
      return filterfiles
    },
    onRejected (rejectedEntries) {
      console.log(rejectedEntries)
      // this.$q.notify({
      //   type: "negative",
      //   message: `${this.maxFileSizeAlert}`,
      // });
      // this.$emit('reject', `${this.maxFileSizeAlert}`)
      this.showError("حجم فایل نمیتواند بیشتر از 2 مگابایت باشد.")
    },
    async loadedFiles () {
      this.src = []
      for (const element of this.allFiles) {
        let currentfile = await this.parseTemplateFile(element)
        if (currentfile && currentfile !== null) {
          debugger
          let convert = await this.getBase64(currentfile)
          let srcobj = {
            base64: convert,
            name: currentfile.name
          }
          this.src.push(srcobj)
        }
        this.added()
      }
    }
  },
  watch: {
    allFiles: {
      async handler () {
        this.loadedFiles()
        //   this.allFiles.forEach(file => {
        //   let currentfile = this.parseTemplateFile(file)
        //    this.src.push(this.getBase64(currentfile))
        //   });
        //   await this.parseTemplateFile(this.allFiles[1])
        //    this.src=await this.getBase64(this.selectedFile)
      },
      deep: true
    },
    Description (a, b) {
      this.text = this.Description
    }
  },
  async mounted () {
    if (this.Description) this.text = this.Description
    if (this.userLoginName && this.userLoginId) {
    }
  },
  data () {
    return {
      text: null,
      selectedFile: null,
      DefaultThumbnail: null,
      islogin: false,
      src: []
    }
  },

  computed: {
    showAddFile () {
      return this.$refs.uploader == null || !this.$refs.uploader.canUpload
    }
  }
}
</script>
<style>
.autocadUploader {
  /* margin-top: 60px; */
  /* margin-left: 5px;
  margin-right: 5px; */
  align-content: center;
  align-items: center;
  position: relative;
  display: flex;
  margin: 9px;
  color: red;
}

.autocadUploader .uploaderTitleStyle {
  position: absolute;
  top: 0;
  margin-left: 50px;
  margin-top: 8px;
  color: white;
  font-size: 20px;
}

.autocadUploader .uploaderCustmAddFileButton {
  position: absolute;
  font-size: large;
  color: white;
  width: 20%;
  margin-left: 40%;
}

.autocadUploader .autocadUploader_q {
  direction: rtl;
  width: 100%;
  background: rgb(255 255 255);
  border-radius: 10px;
  /* border: red solid 1px; */
  border-color: #dadada;
  border-style: dashed;
  border-width: 2px;
}

.autocadUploader
a.q-btn.q-btn-item.non-selectable.no-outline.q-btn--flat.q-btn--rectangle.q-btn--actionable.q-focusable.q-hoverable.q-btn--wrap.q-btn--dense {
  display: none !important;
  color: rgb(26, 120, 197);
}

.autocadUploader .q-uploader__file--img {
  background-size: contain;
}

.autocadUploader .q-uploader__subtitle {
  color: gray;
}

.autocadUploader svg {
  color: rgb(26, 120, 197);
}

.autocadUploader .q-uploader__list {
  display: flex;
}

.autocadUploader .q-uploader__list > * {
  margin: 3px;
}

.autocadUploader .q-uploader__title {
  color: #757575;
  direction: ltr;
}

.autocadUploader .q-uploader__file--img .q-uploader__file-header {
  background: linear-gradient(
    to bottom,
    rgb(201 217 255 / 70%) 20%,
    rgba(255, 255, 255, 0)
  );
}

.autocadUploader .q-uploader__file {
  border-radius: 4px 4px 0 0;
  border: 1px solid rgb(62 62 62 / 55%);
  background-color: white;
  background-size: contain;
}

.autocadUploader .q-uploader__file .q-uploader__subtitle {
  position: absolute;
  top: 160px;
  color: white;
  background-color: #f9ff9fb0;
  width: 100%;
  height: 40px;
  margin-right: -16px !important;
  font-size: 14px;
  direction: ltr;
  color: rgba(0, 0, 0, 0.76);
}

.autocadUploader
.q-uploader__file-status.material-icons.q-icon.notranslate.text-negative {
  position: absolute;
  right: 0;
  top: 165px;
  z-index: 99;
}
</style>
