<template>
  <fit>
    <safa-status :result="addFileToArchiveRes" />
    <div class="q-gutter-sm">
      <div class="flex items-center wrap" v-for="item in items" :key="item.key">
        <div class="row flex items-end wrap">
          <!-- :required="item.required" -->
          <safa-text
            :label="`${item.key} - ${item.label}`"
            label-width="170px"
            class="col"
            v-model="item.value"
            m="r"
          >
            <!-- <template v-slot:append>
            <q-icon
              v-if="item.value"
              style="position: relative;right: 5px;font-size: 18px;"
              @click="clearValue(item)"
              color="primary"
              name="clear"
              class="cursor-pointer"
            />
          </template> -->
          </safa-text>
          <div>
            <btn-default
              label="بارگذاری فایل"
              class="cursor-pointer q-ml-sm"
              @click="uploadFile(item.key)"
            />
          </div>
        </div>
        <span
          class="minSpan q-mx-md"
          v-if="item.uploadStatus === true"
          style="color: green"
          >بارگذاری با موفقیت انجام شد.</span
        >
        <span
          class="minSpan q-mx-md"
          v-if="item.uploadStatus === false"
          style="color: red"
          >بارگذاری با خطا مواجه شد.</span
        >
      </div>
    </div>
    <q-file
      ref="fileUploader"
      :value="selectedFile"
      @input="fileChangeEvent"
      v-show="false"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import fileHelper from "src/mixins/fileHelper"
export default {
  mixins: [baseFormMixin, fileHelper],
  props: {
    name: String,
    title: String,
    formKey: String,
    archiveBizCode: String,
    m: String,
    value: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    items () {
      const tmp = [
        {
          key: 1,
          value: null,
          label: "خط بدنه پیشنهادی منطقه",
          uploadStatus: null,
          required: true
        },
        {
          key: 2,
          value: null,
          label: "نقشه عوارض وضع موجود",
          uploadStatus: null,
          required: false
        },
        {
          key: 3,
          value: null,
          label: "تصویر اسناد مالکیت",
          uploadStatus: null,
          required: false
        },
        {
          key: 4,
          value: null,
          label: "تصویر اعلام حقوق مکتسبه",
          uploadStatus: null,
          required: true
        },
        {
          key: 5,
          value: null,
          label: "رضایت نامه محضری",
          uploadStatus: null,
          required: false
        },
        {
          key: 6,
          value: null,
          label: "تصویر فرم شورای طرح تفصیلی",
          uploadStatus: null,
          required: false
        },
        {
          key: 7,
          value: null,
          label: "مکاتبات در اتوماسیون اداری",
          uploadStatus: null,
          required: false
        },
        {
          key: 8,
          value: null,
          label: "تصویر صورت جلسه",
          uploadStatus: null,
          required: false
        },
        {
          key: 9,
          value: null,
          label: "نقشه تفکیک با مختصات UTM",
          uploadStatus: null,
          required: true
        },
        {
          key: 10,
          value: null,
          label: "تصویر طرح تفکیکی",
          uploadStatus: null,
          required: false
        },
        {
          key: 11,
          value: null,
          label: "تصویر درخواست رسمی مالک",
          uploadStatus: null,
          required: false
        },
        {
          key: 12,
          value: null,
          label: "سایر",
          uploadStatus: null,
          required: false
        }
      ]
      // const _rq = this.value?.RequestType ?? null
      // if (_rq) {
      //   if (_rq.toLowerCase() === "39309e80-347b-4e7e-91a7-0495b332a77d")// شورای معابر
      //   {
      //     t1.Visibility = t9.Visibility = t4.Visibility = true
      //   } else if (_rq.toLowerCase() === "2f07328a-a648-40fb-b4ee-b2a6ac397964")// کمیسیون ماده پنج
      //   {
      //     t1.Visibility = t9.Visibility = t3.Visibility = t4.Visibility = true
      //   } else if (_rq.toLowerCase() === "633663f4-4218-4d6c-9b55-27ad755ae8d2")// طرح اولويت بندي کاربری
      //   {
      //     t1.Visibility = t9.Visibility = t3.Visibility = t4.Visibility = t5.Visibility = t11.Visibility = true
      //   }
      //   return tmp.sort((a, b) => {
      //     return a.key - b.key
      //   })
      // } else return []
      return tmp
    }
  },
  data () {
    return {
      addFileToArchiveRes: null,
      selectedFile: [],
      fileContent: null,
      fileUploaderKey: 0,
      nidEntity: 0,
      reqTypeTitle: "",
      enumEumFileExtension: {
        JPEG: 0,
        Docx: 1,
        Doc: 2,
        PPT: 3,
        Pdf: 4,
        Wmv: 5,
        Txt: 6,
        Zip: 7,
        Default: 8,
        Tif: 9
      }
    }
  },
  methods: {
    uploadFile (e) {
      this.$refs.fileUploader.pickFiles()
      this.fileUploaderKey = e
    },
    async fileChangeEvent (file) {
      const tmpArr =
        window.getConfigValue("esupParams")?.MabarNidWorkflowDeff ?? null
      const reqType = tmpArr.find(
        (f) => f.ID === this.value.Sh_CrossRequest?.RequestType
      )
      this.nidEntity = reqType?.NidEntity ?? 0
      this.reqTypeTitle = reqType?.Title ?? "ثبت درخواست شورای معابر"

      if (file) {
        const fileSize = file.fileSize / 1048576
        let arr = file.name.split(/[\s.]+/) ?? []
        const fileType = `.${arr[arr.length - 1]}` ?? ""
        if (fileSize > 5 && fileType.toLowerCase() === ".dwg") {
          // 5 MB
          this.showError("حجم فایل DWG از 5 مگابایت بیشتر است", {
            title: "خطا"
          })
          return
        }
        for (let i = 0; i < this.items.length; i++) {
          if (this.fileUploaderKey === this.items[i].key) {
            this.items[i].value = file.name ?? ""
          }
        }
        await this.addFileToArchive(file)
      }
    },
    async addFileToArchive (file) {
      if (!this.archiveBizCode) {
        return this.showError("اطلاعات آرشیو به درستی وارد نشده است.")
      }
      try {
        const payload = {
          pFilee: {
            BizCode: this.archiveBizCode,
            CreateDate: null,
            CreateTime: null,
            Description: "ثبت درخواست شورای معابر", // this.reqTypeTitle,
            DomainName: this.value.Sh_CrossRequest.District,
            EntityTitle: null,
            ErrorResult: null,
            Extension: this.getFileType(file.name),
            FileBody: await this.fileToByteArray(file),
            FileName: file.name ?? "fileName",
            GroupId: "00000000-0000-0000-0000-000000000000",
            GroupTitle: null,
            NidEntity: Number(this.nidEntity),
            NidFiles: null,
            SaveOrginalFile: false,
            UserCode: this.getNidUser(),
            UserName: this.getUserDisplayName()
          },
          pDistrict: this.value.Sh_CrossRequest.District,
          pNidProc: this.value.Sh_CrossRequest.NidProc,
          pFileType: this.fileUploaderKey,
          pUser: this.currentUser,
          pFileName: file.name ?? "fileName"
        }
        this.showLoading()
        const { data } = await this.$services.SC.addFileToArchive(payload, {
          config: { District: this.value.Sh_CrossRequest.District }
        })
        // debugger
        this.addFileToArchiveRes = this.getResponse(data)
        if (this.addFileToArchiveRes.success) {
          this.uploadStatusHandler(true)
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "BizCode",
            bizCodeArchive: this.archiveBizCode ?? "",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `عملیات ثبت فایل در آرشیو برای ${this.selectedRequest.BizCode.split("-").reverse().join("-")} با موفقیت انجام گردید`
          })
        } else this.uploadStatusHandler(false)
      } catch (e) {
        this.uploadStatusHandler(false)
        console.log("addFileToArchive error", e)
      } finally {
        this.hideLoading()
      }
    },
    uploadStatusHandler (status = null) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.fileUploaderKey === this.items[i].key) {
          this.items[i].uploadStatus = status
        }
      }
    },
    async convertToBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },

    getFileType (fileName = "") {
      let arr = fileName.split(/[\s.]+/) ?? []
      const fileType = `.${arr[arr.length - 1]}` ?? ""
      if (fileType.toLowerCase() === ".dwg") {
        return this.enumEumFileExtension.DWG
      } else if (fileType.toLowerCase() === ".doc") {
        return this.enumEumFileExtension.Doc
      } else if (fileType.toLowerCase() === ".docx") {
        return this.enumEumFileExtension.Docx
      } else if (fileType.toLowerCase() === ".jpeg") {
        return this.enumEumFileExtension.JPEG
      } else if (fileType.toLowerCase() === ".pdf") {
        return this.enumEumFileExtension.Pdf
      } else if (fileType.toLowerCase() === ".ppt") {
        return this.enumEumFileExtension.PPT
      } else if (fileType.toLowerCase() === ".tif") {
        return this.enumEumFileExtension.Tif
      } else if (fileType.toLowerCase() === ".txt") {
        return this.enumEumFileExtension.Txt
      } else if (fileType.toLowerCase() === ".wmv") {
        return this.enumEumFileExtension.Wmv
      } else if (fileType.toLowerCase() === ".zip") {
        return this.enumEumFileExtension.Zip
      } else return this.enumEumFileExtension.Default
    }
  }
}
</script>

<style lang="scss" scoped>
.minSpan {
  max-width: 150px;
}
</style>
