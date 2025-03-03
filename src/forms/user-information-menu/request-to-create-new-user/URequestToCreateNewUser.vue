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
            <tab-menu label="تصاویر کاربر" name="userPic_tab" />
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
          <AccessToResources v-model="model" :m="modeHandler" />
        </tab-content> -->
          <tab-content name="archive_tab">
            <DocumentArchive v-model="model.userObj" />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer v-if="activeTab !== 'archive_tab'">
        <FormActions
          :m="mode"
          :showEditButton="newUserMode === false"
          saveButtonTitle="ثبت درخواست"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="checkNationalCode"
        >
          <template v-slot:after>
            <btn-save
              v-if="newUserMode === true"
              label="ثبت درخواست"
              @click="checkNationalCode"
            />
          </template>
        </FormActions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import userInfoMixin from "./../mixins/userInfoMixin"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"
import PersonnelIdentification from "./partials/PersonnelIdentification.vue"
import OtherInfo from "./partials/OtherInfo.vue"
import UserPic from "./partials/UserPic.vue"
// import AccessToResources from "./partials/AccessToResources.vue"
import DocumentArchive from "./partials/DocumentArchive.vue"

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
  mixins: [baseFormMixin, userInfoMixin],

  components: {
    PersonnelIdentification,
    OtherInfo,
    UserPic,
    // AccessToResources,
    DocumentArchive
  },

  data () {
    return {
      name: "URequestToCreateNewUser",
      title: "درخواست کاربر جدید",
      formKey: "b65fe692-36ea-0001-0014-66b8eb0e9e77",
      main: true,

      // #services
      userInfoEditRes: null,
      creInsRes: null,

      // #variables
      model: { userObj: { ...defaultModel } },
      procInfo: null,
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

  async mounted () {
    this.model.userObj.jobLocation.allowDomains = []
    await this.getCIList()
    await this.getAllJobLocations()
  },

  methods: {
    async userExists () {
      this.model.userObj.username = this.model.userObj.username.toLowerCase()
      const userName = this.model.userObj.username
      try {
        this.showLoading()
        const res = await this.$services.security.userExists({
          filter: [["username", userName]]
          //   // search: '',
          //   // nin: false
        })
        if (res.data.success) {
          this.hasSameUser = res.data?.data?.exists ?? false
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    convertDate (date) {
      PersianDate.toCalendar('persian')
      let [y, m, d] = date.split('-')
      d = d.split("T")[0]
      var day = new Date([parseInt(y), parseInt(m), parseInt(d)])
      let convertedDate = new PersianDate(day).toLocale("en").format("YYYY/MM/DD")
      return convertedDate
    },
    async getUserByUsername () {
      this.model.userObj.username = this.model.userObj.username.toLowerCase()
      const userName = this.model.userObj.username
      if (userName === null || userName === "") {
        return this.showError("لطفا نام کاربری را وارد نمایید.")
      }
      try {
        const payload = {
          // from: 1,
          // to: 100,
          search: "",
          filter: [["username", userName]]
          // populate: true
        }
        this.showLoading()
        const { data } = await this.$services.security.userList(payload)
        const res = this.getResponse(data)
        if (res.success) {
          if (res.data.data.list.length > 0) {
            const users = res.data.data.list

            users.forEach(user => {
              if (user.endActiveDate) {
                user.endActiveDate = this.convertDate(user.endActiveDate)
              }
            })
            if (users.length > 0) {
              this.hasSameUser = false
              this.model.userObj = {
                ...users[0],
                userPic: null
              }
              const obj = this.model.userObj
              if (this.model.userObj.NidUser !== null) {
                await this.getImageByID(obj.NidUser)
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
          } else {
            this.showError(`کاربر مورد نظر یافت نشد.`)
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
      await this.userExists()
      if (this.newUserMode === true && this.hasSameUser === true) {
        this.hasSameUser = false
        return this.showError(
          "این نام کاربری وجود دارد، لطفا نام کاربری دیگری وارد نمایید.",
          { title: "خطا در اعتبارسنجی" }
        )
      } else {
        await this.saveObj()
      }
    },
    async saveObj () {
      if (!this.$refs.persInfo.checkNationalCodeIsValid()) {
        return this.showError("کد ملی وارد شده معتبر نمی باشد.")
      }

      if (!this.model.userObj.endActiveDate || this.model.userObj.endActiveDate <= new PersianDate().toLocale("en").format("L")) {
        return this.showError("تاریخ انقضا کاربر معتبر نمیباشد!")
      }

      if (!this.isValidForm()) return
      const nidWfdObj =
        window.getConfigValue("esupParams")?.PersonelResource_NidWorkflowDeff ??
        null
      if (nidWfdObj) {
        this.eumRequestType = nidWfdObj

        try {
          this.showLoading()
          console.log("addWorkItem")
          await this.addWorkItem()
          console.log("saveRequest")
          await this.saveRequest()
          // console.log("sendSMS")
          // await this.sendSMS()

          this.log({
            action: this.logActions.save,
            bizCode: this.procInfo.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.procInfo.BizCode,
            nidWorkItem: this.procInfo.NidWorkItem,
            saveDesc: `عملیات ثبت درخواست اطلاعات کاربر با شماره پیگیری ${this.procInfo.NidWorkItem} انجام گردید.`
          })
          this.showSuccess(
            `درخواست شماره ${this.procInfo.NidWorkItem} جهت ثبت درخواست اطلاعات کاربر با موفقیت ثبت گردید.`
          ).onDismiss(() => {
            this.hideLoading()
            this.hideSidebar(this.name)
            this.redirectToKartable()
          })
        } catch (e) {
          console.error("@@@@@addRequest Error", e)
          await this.deleteRequest()
          await this.deleteProc()
          this.showError(`متاسفانه عملیات ثبت درخواست اطلاعات کاربر متوقف شد.`)
          this.hideLoading()
        } finally {
          this.$forceUpdate()
          this.hideLoading()
        }
      } else {
        this.showError(
          "کلید گردشکار تعریف نشده است . به راهبر سیستم اطلاع دهید"
        )
      }
    },
    async addWorkItem () {
      return new Promise(async (resolve, reject) => {
        this.procInfo = null
        const index = this.$refs.persInfo.requestType === "newUserMode" ? 0 : 1
        const payload = {
          BizCode: `${this.model.userObj.username} - ${index}`,
          EumOwnerType: 0,
          NidWorkflowDeff: this.eumRequestType.User,
          ProcInitiator: this.getNidUser(),
          ProcRequester: `${this.model.userObj.firstName} ${this.model.userObj.lastName}`,
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: "سرا10",
          GroupName:
            index === 0 ? "ثبت درخواست کاربر جدید" : "ثبت درخواست ویرایش کاربر",
          GroupTitel:
            index === 0 ? "ثبت درخواست کاربر جدید" : "ثبت درخواست ویرایش کاربر",
          Domain: 0,
          IsSara10Request: true
        }
        const res = await this.$srvWorkflow.createInstance(payload)
        this.creInsRes = this.getResponse(res.data)
        if (this.creInsRes.success) {
          const res = this.creInsRes.data
          if (res.status === 200 && res.success) {
            this.procInfo = res.data.ProcInfo
            return resolve()
          } else {
            return reject(this.creInsRes.msg)
          }
        } else {
          return reject(this.creInsRes.msg)
        }
      })
    },
    async deleteRequest () {
      try {
        const { data } = await this.$services.SC.deleteRequest({
          pNidProc: this.procInfo.NidProc
        })
        const deleteRes = this.getResponse(data)
        console.log("deleteRes :>> ", deleteRes)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async deleteProc () {
      try {
        const { data } = await this.$srvWorkflow.deleteProc({
          NidProc: this.procInfo.NidProc
        })
        if (!data.success) {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    addDay (currentDay, length) {
      const tmp = currentDay.split("/")
      let yearFrom = parseInt(tmp[0])
      let monthFrom = parseInt(tmp[1])
      let dayFrom = parseInt(tmp[2])
      let dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom])
      return dateFrom.add("days", length).toLocale("en").format("L")
    },
    normalizedModel () {
      this.model.userObj.jobLocation.startDate = currentDate()
      // تاریخ پایان محل خدمت نباید از اینجا پر بشه باعث اختلال میشه
      // this.model.userObj.jobLocation.endDate = this.addDay(
      //   this.model.userObj.jobLocation.startDate,
      //   7
      // )
      this.model.userObj.jobLocation.allowDomains =
        this.model.userObj.jobLocation?.allowDomains?.toString() ?? ""
      this.model.userObj.jobLocation.post =
        this.posts.find(
          (f) =>
            f.ID === parseInt(this.model.userObj.jobLocation.CI_Post) ?? null
        )?.Title ?? ""
      this.model.userObj.jobLocation.post =
        this.model.userObj.jobLocation.post.replaceAll("--", " ")
      this.model.userObj.jobLocation.name =
        this.jobLocations.find(
          (f) => f.ID === this.model.userObj.jobLocation.NidJobLocation
        )?.Title ?? ""
    },
    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        try {
          this.normalizedModel()
          const payload = {
            StorageKey: this.procInfo.NidProc,
            NidUser: this.getNidUser(),
            Body: JSON.stringify(this.model.userObj)
          }
          const { data } = await this.$services.security.upsertUserStorage(
            payload
          )
          if (data.success) {
            this.model.userObj = JSON.parse(data.data.Body)
            return resolve()
          } else {
            return reject(data.msg)
          }
        } catch (e) {
          console.error(e)
          return reject(e)
        }
      })
    },
    async sendSMS () {
      try {
        const payLoad = {
          pParameter: {
            Text: `کاربر گرامی درخواست شما به شماره  ${[
              this.procInfo.NidWorkItem
            ]} ثبت گردید"`,
            Number: this.model.userObj.mobile,
            AppName: "Monitoring",
            BizCode: this.procInfo.BizCode,
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
        if (data.success) {
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
    }
  },

  watch: {
    currentImageArr () {
      this.model.userObj.userPic = this.currentImageArr ?? null
    }
  },

  computed: {
    modeHandler () {
      if (this.newUserMode) return "e"
      return this.mode
    }
  }
}
</script>
