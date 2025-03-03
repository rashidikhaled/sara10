<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <form-wrapper
    :padding="false"
    title="آپلود فایل"
  >
    <safa-status :result="result" />
    <safa-status :result="resultResult" />
    <fit>
      <safa-datatable
        helper="uploadGrid"
        title="آپلود فایل"
        v-model="uploadList"
        m="e"
        @uploadFileClick="uploadFileClick"
        @deleteFileClick="deleteFile"
        fit
        height="100%"
        :bordered="false"
      />
    </fit>
    <safa-popup
      v-model="showUploader"
      width="350px"
      height="230px"
    >
      <form-wrapper>
        <div class="q-mt-md">
          <div class="row q-col-gutter-sm items-center">
            <div class="col-auto">فایل قالب </div>
            <q-file
              class="col"
              dense
              outlined
              ref="fileUploader"
              :value="selectedFile"
              @input="fileChangeEvent"
              accept=".doc,.docx"
            />
          </div>
          <safa-text
            v-model="uploadComment"
            label="توضیحات"
            class="q-mt-sm"
            label-width="55px"
          />
        </div>
        <template v-slot:footer>
          <form-actions
            m="e"
            @save="saveData"
          >
            <template v-slot:before>
              <btn-default
                label="آپلود"
                @click="uploadFile"
              />
            </template>
          </form-actions>
        </template>
      </form-wrapper>
    </safa-popup>
  </form-wrapper>
 </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import fileHelper from "src/mixins/fileHelper"
export default {
  mixins: [baseFormMixin, fileHelper],
  data () {
    return {
      title: "آپلود فایل تعهدات",
      formKey: "5becd6fa-24ef-466b-a4f3-06d4d25403f2",
      name: "UploadCommitment",
      main: true,
      sidebarCompatible: true,
      selectedFile: [],
      uploadList: [],
      result: null,
      resultResult: null,
      showUploader: false,
      uploadComment: "",
      isDelete: false
      //   columns: [
      //     {
      //       field: "ID",
      //       title: "نام",
      //       width: "90px"
      //     },
      //     { field: "Title", title: "عنوان", width: "260px" },
      //     {
      //       field: "uploadFile",
      //       title: "آپلود فایل",
      //       editor: "action",
      //       label: "آپلود فایل"
      //     }
      //   ]
    }
  },
  methods: {
    uploadFile () {
      this.$refs.fileUploader.pickFiles()
    },
    uploadFileClick (e) {
      this.selectedFile = []
      this.showUploader = true
      this.selectCIForUpload = e.dataItem
    },
    deleteFile (e) {
      this.showConfirm("آیا از حذف فایل انتخاب شده اطمینان دارید؟").onOk(() => {
        this.isDelete = true
        this.selectedFile = []
        this.selectCIForUpload = e.dataItem
        this.saveUploadedfile("")
      })
    },
    fileChangeEvent (file) {
      if (file) {
        const sizeInMB = file.size / 1024 / 1024
        if (sizeInMB > 4) {
          this.showError("حجم فایل نمیتواند بیشتر از 4 مگابایت باشد.")
          return
        }
        this.selectedFile = file
      }
    },
    async saveData () {
      await this.saveUploadedfile(this.selectedFile)
    },
    async saveUploadedfile (selectedFile) {
      try {
        this.showLoading()
        let payLoad = {
          CI_CommitmentCitizen: {
            Comments: this.uploadComment,
            ID: this.selectCIForUpload.ID
          }
        }
        if (!this.isDelete) {
          payLoad.CI_CommitmentCitizen = {
            ...payLoad.CI_CommitmentCitizen,
            TemplateFile: await this.getBase64(selectedFile),
            Title: this.$refs.fileUploader.selectedString
          }
        } else if (this.isDelete) {
          payLoad.CI_CommitmentCitizen = {
            ...payLoad.CI_CommitmentCitizen,
            TemplateFile: "",
            Title: ""
          }
        }
        const { data } = await this.$services.SC.saveCICommitmentCitizen(
          payLoad, {
            config: { District: this.selectedDistrict }
          }
        )
        this.result = this.getResponse(data)
        if (this.result.success && this.result.data.IsSave) {
          if (!this.isDelete) {
            this.showSuccess("آپلود فایل با موفقیت انجام شد.")
          } else {
            this.showSuccess("حذف فایل با موفقیت انجام شد.")
          }
          await this.getAllCICommitmentCitizen()
          this.showUploader = false
          this.isDelete = false
        }
      } catch (e) {
        console.log("save error", e)
      } finally {
        this.hideLoading()
      }
    },
    async getAllCICommitmentCitizen () {
      try {
        this.showLoading()

        let payLoad = {}
        const { data } = await this.$services.SC.getAllCICommitmentCitizen(
          payLoad, {
            config: { District: this.selectedDistrict }
          }
        )
        this.resultResult = this.getResponse(data)
        if (this.resultResult.success) {
          this.uploadList = this.resultResult.data.AllCI_CommitmentCitizen
        }
      } catch (e) {
        console.log("save error", e)
      } finally {
        this.hideLoading()
      }
    }
  },
  mounted () {
    this.getAllCICommitmentCitizen()
  }
}
</script>
