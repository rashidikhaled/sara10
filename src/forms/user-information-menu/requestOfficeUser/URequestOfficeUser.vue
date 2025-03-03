<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77"
  >
  <FormWrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="userInfoEditRes" />
      <safa-status :result="creInsRes" />
    </template>
    <fit>
      <safa-tabs fit v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu label="فرم شناسایی پرسنل" name="userInfo_tab" />
          <tab-menu label="سایر مشخصات" name="otherUserInfo_tab" />
          <tab-menu label="تصویر کاربر" name="userPic_tab" />
          <!-- <tab-menu label="دسترسی به منابع" name="resources_tab" /> -->
          <tab-menu label="آرشیو مدارک" name="archive_tab" />
        </template>

        <tab-content name="userInfo_tab">
          <PersonnelIdentification
            v-model="model.userObj"
            :lockUsername="hasSameUser"
            :posts="posts"
            :jobTyps="jobTyps"
            :jobLocations="jobLocations"
            @getUser="getUserByUsername"
            @reset="reset"
            @changeMode="changeMode"
            :nationalities="nationalities"
            :activeTab="activeTab"
            :m="modeHandler"
            ref="persInfo"
          />
        </tab-content>
        <tab-content name="otherUserInfo_tab">
          <OtherInfo v-model="model.userObj" :m="modeHandler" />
        </tab-content>
        <tab-content name="userPic_tab">
          <UserPic v-model="model.userObj" :m="modeHandler" />
        </tab-content>
        <!-- <tab-content name="resources_tab">
          <AccessToResources :model="model" :m="modeHandler" />
        </tab-content> -->
        <tab-content name="archive_tab">
          <DocumentArchive v-model="model.userObj" />
        </tab-content>
      </safa-tabs>
    </fit>

    <template v-slot:footer>
      <FormActions
        :m="mode"
        :showEditButton="newUserMode === false"
        saveButtonTitle="ثبت درخواست"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="checkNationalCode"
      >
        <template v-slot:after v-if="activeTab !== 'archive_tab'">
          <btn-save
            v-if="newUserMode === true"
            label="ثبت درخواست"
            @click="checkNationalCode"
          />
          <btn-cancel
            v-if="isEditable === false"
            label="انصراف"
            @click="exitHandler"
          />
        </template>
      </FormActions>
    </template>
  </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import fileHelper from "src/mixins/fileHelper"

import PersonnelIdentification from "../request-to-create-new-user/partials/PersonnelIdentification.vue"
import OtherInfo from "../request-to-create-new-user/partials/OtherInfo.vue"
import UserPic from "../request-to-create-new-user/partials/UserPic.vue"
// import AccessToResources from "../request-to-create-new-user/partials/AccessToResources.vue"
import DocumentArchive from "../request-to-create-new-user/partials/DocumentArchive.vue"

const defaultModel = {
  NidUser: null,
  username: "",
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  isSysAdmin: false,
  isSysApp: false,
  isSys3rdParty: false,
  enabled: false, // فعال بودن
  IDNumber: null, // کد ملی
  CI_Nationality: null,
  birthDate: "",
  NidGroups: [],
  birthPlace: "",
  fatherName: "",
  description: "",
  password: "",
  tel: "",
  address: "",
  mustChangePassword: false,
  mustChangeSecondPassword: false,
  startActiveDate: null,
  endActiveDate: null,
  active: null,
  token: null,
  allowedIp: "",
  mustLoginByCamera: false,
  sessionTimeout: null,
  jobLocation: {
    NidJobLocation: null,
    name: null,
    startDate: currentDate(),
    endDate: null,
    organPost: null,
    CI_Post: 0,
    CI_JobType: 0,
    allowDomains: null,
    post: "",
    allowedIP: ["0"]
  },
  tabletSerial: "",
  gender: 1,

  // OtherInfo
  workPosition: "",
  studyFieldRel: "",
  job: "",
  workAddress: "",

  // PicInfo
  userPic: null, // 500KB
  signatureImage: null, // 500KB
  fingerprintImage: null // 500KB
}

export default {
  mixins: [baseFormMixin, fileHelper],

  components: {
    PersonnelIdentification,
    OtherInfo,
    UserPic,
    // AccessToResources,
    DocumentArchive
  },

  data () {
    return {
      name: "URequestOfficeUser",
      title: "درخواست تعریف کاربر دفاتر",
      formKey: "b65fe692-36ea-0001-0015-66b8eb0e9e77",
      main: true,

      // #services
      userInfoEditRes: null,
      creInsRes: null,

      // #variables
      model: { userObj: { ...defaultModel } },
      newRequestModel: null,
      base64image: null,
      userIndex: 0,
      hasSameUser: false,
      newUserMode: true,
      activeTab: "userInfo_tab",
      jobLocations: [],
      jobTyps: [],
      posts: [], // سمت
      nationalities: [],
      strBizCode: "",
      eumRequestType: {
        User: "cce75576-0f3c-409b-ac29-6c774f67e2e7",
        Daftar: "cce75576-0f3c-409b-ac29-6c774f67e2e7",
        Self: "24300b55-ffbc-45b9-8c32-bd8e95942279",
        Cut: "33ecc90b-7985-43b9-b5e9-c603ed1b7380"
      }
    }
  },

  mounted () {
    this.getCIList()
    this.getAllJobLocations()
  },

  methods: {
    async getUserByUsername () {
      this.model.userObj.username = this.model.userObj.username.toLowerCase()
      const userName = this.model.userObj.username
      if (userName === null || userName === "") {
        return this.showError("لطفا نام کاربری را وارد نمایید.")
      }
      try {
        const payload = {
          from: 1,
          to: 100,
          search: "",
          filter: [["username", userName]],
          populate: true
        }
        this.showLoading()
        const { data } = await this.$services.security.userList(payload)
        const res = this.getResponse(data)
        if (res.success) {
          if (res.data.data.list) {
            const users = res.data.data.list
            if (this.newUserMode) {
              this.hasSameUser = users.length > 0
            } else {
              if (users.length > 0) {
                console.log(
                  "get user by username in Create :>> ",
                  this.model.userObj
                )
                this.hasSameUser = false
                this.model.userObj = users[0]
                const obj = this.model.userObj
                if (this.model.userObj.NidUser !== null) {
                  if (obj.userPic) {
                    this.model.userObj.userPic = this.getImageByID(obj.NidUser)
                  }
                  if (obj.signatureImage) {
                    this.model.userObj.signatureImage = await this.b64ToArr(
                      obj.signatureImage
                    )
                  }
                  if (obj.fingerprintImage) {
                    this.model.userObj.fingerprintImage = await this.b64ToArr(
                      obj.fingerprintImage
                    )
                  }
                }

                if (obj.jobLocation) {
                  if (Array.isArray(obj.jobLocation.allowDomains)) {
                    return
                  }
                  this.model.userObj.jobLocation.allowDomains =
                    obj.jobLocation?.allowDomains.split(",") ?? []
                } else {
                  this.model.userObj.jobLocation = {
                    NidJobLocation: null,
                    name: null,
                    startDate: null,
                    endDate: null,
                    organPost: null,
                    CI_JobType: null,
                    allowDomains: null,
                    post: null,
                    allowedIP: null
                  }
                }
              } else {
                if (this.newUserMode) return
                this.showError("کاربری با این نام کاربری یافت نشد.")
                this.reset()
              }
            }
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async chackUserName () {
      await this.getUserByUsername()
      if (this.newUserMode === true && this.hasSameUser === true) {
        return this.showError(
          "این نام کاربری وجود دارد، لطفا نام کاربری دیگری وارد نمایید."
        )
      } else {
        this.addUser()
      }
    },

    async addUser () {
      if (!this.$refs.persInfo.checkNationalCodeIsValid()) {
        return this.showError("کد ملی وارد شده معتبر نمی باشد.")
      }
      if (!this.isValidForm()) return
      const nidWfdObj =
        window.getConfigValue("esupParams")?.PersonelResource_NidWorkflowDeff ??
        null
      this.showLoading()
      if (nidWfdObj) {
        this.eumRequestType = nidWfdObj
        await this.addWorkItem()
        if (this.newRequestModel === null) return
        await this.saveObj(this.newRequestModel.TaskInfo[0].NidTask)
        await this.sendSMS()
        this.exitHandler()
      } else {
        this.showError("کلید گردشکار تعریف نشده است . به راهبر سیستم اطلاع دهید") // PersonelResource_NidWorkflowDeff
      }
      this.hideLoading()
    },
    async addWorkItem () {
      this.newRequestModel = null
      const payload = {
        BizCode: `${this.model.userObj.username} - ${this.userIndex}`,
        EumOwnerType: 0,
        NidWorkflowDeff: this.eumRequestType.Daftar, // NidWorkflowDeff Daftar (mashhad): "7f1b13ea-8598-4535-979a-a1044c4463a7",
        ProcInitiator: this.getNidUser(),
        ProcRequester: `${this.model.userObj.firstName} ${this.model.userObj.lastName}`,
        ProcInitiatorName: this.getUserDisplayName(),
        ProcArea: "سرا10",
        GroupName: "درخواست تعریف کاربر دفاتر",
        GroupTitel: "درخواست تعریف کاربر دفاتر",
        Domain: 0,
        IsSara10Request: true
      }
      const res = await this.$srvWorkflow.createInstance(payload)
      this.creInsRes = this.getResponse(res.data)
      if (this.creInsRes.success) {
        const res = this.creInsRes.data
        if (res.status === 200 && res.success) {
          this.userIndex++
          this.showSuccess("عملیات با موفقیت انجام شد.")
          this.newRequestModel = res?.data
        }
      }
    },
    normalizedModel () {
      this.model.userObj.jobLocation.allowDomains =
        this.model.userObj.jobLocation.allowDomains.toString()
      this.model.userObj.jobLocation.post = this.posts.find(
        (f) => f.ID === this.model.userObj.jobLocation.CI_Post
      ).Title
    },
    async saveObj (nidTask) {
      this.normalizedModel()
      try {
        const payload = {
          StorageKey: nidTask,
          NidUser: this.getNidUser(),
          Body: JSON.stringify(this.model.userObj)
        }
        const { data } = await this.$services.security.upsertUserStorage(
          payload
        )
        if (data.success) {
          this.model.userObj = JSON.parse(data.data.Body)
          console.log("save res user in Create :>> ", this.model.userObj)
          await this.log({
            action: this.logActions.save,
            bizCode: this.newRequestModel.ProcInfo.BizCode,
            bizCodeTitle: "BizCode",
            nidWorkItem: this.newRequestModel.ProcInfo.NidWorkItem
          })
        } else {
          this.showSuccess(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async sendSMS () {
      try {
        const payLoad = {
          pParameter: {
            Text: `کاربر گرامی درخواست شما به شماره  ${[
              this.newRequestModel.ProcInfo.NidWorkItem
            ]} ثبت گردید"`,
            Number: this.model.userObj.mobile,
            AppName: "Monitoring",
            BizCode: this.newRequestModel.ProcInfo.BizCode,
            SMSType: "ارسال پیامک ثبت درخواست کاربر جدید",
            ScheduleSendDate: currentDate(),
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        const res = this.getResponse(data)
        if (res.success) this.showSuccess("پیامک با موفقیت ارسال شد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async b64ToArr (base64image) {
      const tmp = this.dataURLtoFile(base64image, "fileName")
      const res = await this.fileToByteArray(tmp)
      return res
    },
    reset () {
      this.resetValidation()
      defaultModel.jobLocation = {
        jobLocation: {
          NidJobLocation: null,
          name: null,
          startDate: null,
          endDate: null,
          organPost: null,
          CI_JobType: null,
          allowDomains: null,
          post: null,
          allowedIP: null
        }
      }
      this.model = { userObj: { ...defaultModel } }
      this.hasSameUser = false
    },
    changeMode (mode) {
      if (mode === "newUserMode") {
        this.newUserMode = true
        this.isEditable = false
      } else {
        this.newUserMode = false
      }
    },
    async getCIList () {
      try {
        this.showLoading()
        const { data } = await this.$services.security.getCIList({})
        const res = this.getResponse(data)
        if (res.success) {
          const list = res.data && res.data.data && res.data.data.list
          if (list) {
            const jobTyps =
              list.filter(({ name }) => name === "CI_JobType") || []
            this.jobTyps = [
              ...jobTyps.map(({ id: ID, title: Title }) => {
                return { ID, Title }
              })
            ]
            const postList =
              list.filter(({ name }) => name === "CI_Post") || []
            this.posts = [
              ...postList.map(({ id: ID, title: Title }) => {
                return { ID, Title }
              })
            ]
            const nationalityList = list.filter(
              ({ name }) => name === "CI_Nationality"
            )
            this.nationalities = [
              ...nationalityList.map(({ id: ID, title: Title }) => {
                return { ID, Title }
              })
            ]
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getAllJobLocations () {
      try {
        this.showLoading()
        const { data } = await this.$services.security.getAllJobLocations({
          from: 1,
          to: 1000
        })
        const res = this.getResponse(data)
        if (res.success) {
          this.jobLocations =
            [
              ...res.data.data.list.map(({ NidJobLocation, name }) => {
                return { ID: NidJobLocation, Title: name }
              })
            ] || []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    toDataURL (url, callback) {
      var xhr = new XMLHttpRequest()
      xhr.onload = function () {
        var reader = new FileReader()
        reader.onloadend = function () {
          this.base64image = callback(reader.result)
          if (this.base64image) this.getImageByIDFromBase64image()
        }.bind(this)
        return reader.readAsDataURL(xhr.response)
      }.bind(this)
      xhr.open("GET", url)
      xhr.responseType = "blob"
      xhr.send()
    },
    getImageByID (NidUser) {
      this.toDataURL(
        `${this.securityBaseUrl}/avatar/${NidUser}.png`,
        function (dataUrl) {
          return dataUrl
        }
      )
    },
    async getImageByIDFromBase64image () {
      const test = this.dataURLtoFile(this.base64image, "fileName")
      this.model.userObj.userPic = await this.fileToByteArray(test)
    },
    async checkNationalCode () {
      // CheckShahkar
      if (!this.isValidForm()) return
      try {
        const payload = {
          nationalCode: this.model.userObj.IDNumber,
          mobileNo: this.model.userObj.mobile
        }
        this.showLoading()
        const { data } = await this.$services.security.checkNationalCode(
          payload
        )
        if (data.data.success) {
          this.civilAuthorityStatus()
        } else {
          this.showError(data.data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async civilAuthorityStatus () {
      // چک کردن زنده یا مرده بودن
      if (!this.isValidForm()) return
      try {
        const payload = {
          nationalCode: this.model.userObj.IDNumber,
          birthDate: this.model.userObj.birthDate
        }
        this.showLoading()
        const { data } = await this.$services.security.civilAuthorityStatus(
          payload
        )
        if (data.data.success) {
          this.chackUserName()
        } else {
          this.showError(data.data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    exitHandler () {
      this.hideSidebar(this.name)
      this.redirectToKartable()
    }
  },

  computed: {
    securityBaseUrl () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("securityBaseUrl")
    },
    modeHandler () {
      if (this.newUserMode) return "e"
      return this.mode
    }
  }
}
</script>
