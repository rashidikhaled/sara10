<template>
  <form-wrapper>
    <fit>
      <form-control>
        <!--        <safa-file-uploader-->
        <!--          label="بارگذاری فایل"-->
        <!--          label-width="90px"-->
        <!--          cdcName="File"-->
        <!--          :max-size="5"-->
        <!--          type=".WRD,.TXT,.DAT,.JPG,.PNG"-->
        <!--          @change="changeFile"-->
        <!--          required-->
        <!--          validations="required"-->
        <!--        />-->
        <MiniArchiveUploader
          :userName="archiveConfig.username"
          :password="archiveConfig.password"
          :showDescription="false"
          fileTypes=".dwg,jpg,png,tif"
          :bizcode="archiveBizCode"
          uploaderTitle="آرشیو DWG"
          @reject="onError"
          @uploaded="onUploaded"
        />
        <div style="width: 800px; max-width: 100%;margin: auto">
          <div class="alert alert-success" v-show="message">{{ message }}</div>
        </div>
      </form-control>
      <!--      <ArchiveWrap-->
      <!--        v-if="showArchive"-->
      <!--        :name="archiveConfig.username"-->
      <!--        :pass="archiveConfig.password"-->
      <!--        :bizCode="archiveBizCode"-->
      <!--      />-->
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { StringHelper } from "ui-security"

export default {
  mixins: [baseFormMixin],
  computed: {
    archiveConfig () {
      return window.getConfigValue("archiveEngineer")
    }
  },
  props: {
    NidProc: String,
    archiveBizCode: {
      type: String,
      default: "00000000-0000-0000-0000-000000000000"
    }
  },

  data () {
    return {
      title: "آرشیو",
      name: "InsertArchive",
      showArchive: false,
      requestResult: null,
      archiveResults: { ArchiveWrapper: {} },
      files: [],
      fileContent: [],
      message: ''
    }
  },
  created () {
    this.getArchiveRootSubject()
  },
  methods: {
    onError (msg) {
      this.message = msg
    },
    onUploaded () {
      this.message = "ذخیره سازی موفق"
      // return this.$q.notify({
      //   type: "Success",
      //   message: "ذخیره سازی موفق"
      // })
    },
    async getArchiveRootSubject () {
      debugger
      try {
        this.showLoading()
        let payLoad = {
          Request: "Engineer",
          Code: this.currentUser.username,
          CI_ArchiveGroup: 0 // base on UArchive1.xaml
        }
        const { data } = await this.$services.eng.getArchiveRootSubject(
          payLoad
        )

        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.archiveResults = this.requestResult.data
          this.showArchive = true
        } else {
          this.showArchive = false
        }
      } catch (response) {
        this.showError("اسناد این شماره پرونده موجود نمی باشد.")
        console.log("error", response)
      } finally {
        this.hideLoading()
      }
    },
    async readFile (event) {
      this.fileContent = event.target.result.split('\r\n')
      await this.uploadFile()
    },
    changeFile (file) {
      this.files = file
      var reader = new FileReader()
      reader.addEventListener("load", this.readFile)
      reader.readAsText(file)
    },
    // احتیاج به تست در شهر رامسر هست
    async uploadFile () {
      const oldCode = this.oldBizCode ?? ""
      const newCode = this.getBaseLibResult?.ArchiveWrapper?.BizCode ?? ""
      try {
        const BizCode = oldCode,
          DestBizCode = newCode
        this.showLoading()
        // eslint-disable-next-line no-undef
        const archiveAuth = archiveStore.archiveToken // by first login *resolve : #1798

        const url = `${this.$store.getters["archiveApi/baseUrl"]}Archive/InsertFile`
        let insertedFile = {
          FileName: null,
          FileBody: [],
          Extension: null,
          UserName: null,
          UserCode: null,
          BizCode: null,
          DomainName: null,
          Description: null,
          SaveOrginalFile: true,
          NidEntity: 0,
          GroupId: "00000000-0000-0000-0000-000000000000"
        }
        const fileName = this.files[0].name
        const fileContent = this.fileContent
        const fileLines = [fileName, ...fileContent]
        insertedFile.FileName = fileName
        insertedFile.FileBody = fileLines
        insertedFile.Extension = "JPEG"
        insertedFile.UserName = this.getUserDisplayName()
        insertedFile.UserCode = this.currentUser.IDNumber
        insertedFile.DomainName = "Engineer"
        // insertedFile.BizCode = _context.ClsBuildingExeReport._NIdBuildingExecRep.ToString();
        insertedFile.BizCode = this.NidProc
        insertedFile.Description = "ارسال فایل توسط "
        const body = {
          pdata1: new StringHelper().convert({ pInsertFile: { ...insertedFile } })
        }
        // const body = JSON.stringify({ BizCode, DestBizCode })
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", archiveAuth)
        const result = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers
        })
        const res = await result.json()
        if (res.success) {
          this.InsertFileRes = this.getResponse(res.data)
          if (this.InsertFileRes.success) {
            this.showError("عملیات انتقال آرشیو با موفقیت انجام گردید.")
            const strNosazi =
              convertNosaziCodeObjectToString(this.baseNosaziCode) ?? ""
            await this.log({
              action: this.logActions.transfer,
              bizCode: BizCode,
              bizCodeTitle: "BizCode",
              bizCodeArchive: DestBizCode ?? "",
              nosaziCode: strNosazi,
              saveDesc: `عملیات انتقال آرشیو برای ${
                strNosazi.split("-").reverse().join("-") ?? ""
              } با موفقیت انجام گردید`
            })
            this.$emit("hide")
            this.$emit("transfer")
          }
        } else {
          await this.$store.dispatch(
            "archiveApi/resetToken",
            this.archiveConfig
          )
          this.showError(res.errors[0].message)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }

}
</script>
