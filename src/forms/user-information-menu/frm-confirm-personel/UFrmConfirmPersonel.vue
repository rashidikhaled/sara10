<template>
  <safa-form
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77"
    :id="formKey"
    :caption="title"
  >
    <FormWrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="addUserNewRes" />
      </template>
      <fit>
        <safa-tabs fit v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu
              label="فرم شناسایی پرسنل"
              name="PersonnelIdentification"
            />
            <tab-menu label="سایر مشخصات" name="OtherFeatures" />
            <tab-menu label="تصاویر کاربر" name="UserPhoto" />
            <!-- <tab-menu label="دسترسی به منابع" name="AccessToResources" /> -->
            <tab-menu label="آرشیو مدارک" name="archive_tab" />
          </template>

          <tab-content name="PersonnelIdentification">
            <PersonnelIdentification
              v-model="model.userObj"
              :lockUsername="false"
              :posts="posts"
              :jobTyps="jobTyps"
              :jobLocations="jobLocations"
              :nationalities="nationalities"
              @getUser="getUserByUsername"
              @reset="reset"
              @changeMode="changeMode"
              :activeTab="activeTab"
              m="r"
              ref="persInfo"
              lockRequestType
            />
          </tab-content>
          <tab-content name="OtherFeatures">
            <OtherInfo v-model="model.userObj" m="r" />
          </tab-content>
          <tab-content name="UserPhoto">
            <UserPic v-model="model.userObj" m="r" />
          </tab-content>
          <tab-content name="AccessToResources">
            <AccessToResources :model="model" m="r" />
          </tab-content>
          <tab-content name="archive_tab">
            <DocumentArchive v-model="model.userObj" />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <div class="q-gutter-sm">
          <btn-save
            @click="chackRequestType"
            :disable="model.userObj.username === ''"
            :label="saveLabel"
          />
          <!-- <btn-default label="ارسال پیام برای کاربر" /> -->
        </div>
      </template>
    </FormWrapper>
    <safa-popup
      v-model="showPopupOldInfo"
      width="630px"
      height="670px"
      :resizable="false"
    >
      <old-user-info
        v-model="model.userObj"
        @confirm="confirmAndActiveOldUser"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import userInfoMixin from "./../mixins/userInfoMixin"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"
import PersonnelIdentification from "../request-to-create-new-user/partials/PersonnelIdentification.vue"
import UserPic from "../request-to-create-new-user/partials/UserPic.vue"
import AccessToResources from "../request-to-create-new-user/partials/AccessToResources.vue"
import OtherInfo from "../request-to-create-new-user/partials/OtherInfo.vue"
import OldUserInfo from "./partials/OldUserInfo.vue"
import DocumentArchive from "../request-to-create-new-user/partials/DocumentArchive.vue"

const defaultModel = {
  NidUser: null,
  username: "",
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  NidGroups: [],
  isSysAdmin: false,
  isSysApp: false,
  isSys3rdParty: false,
  enabled: false, // فعال بودن
  IDNumber: null, // کد ملی
  CI_Nationality: null,
  birthDate: "",
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
  name: "UFrmConfirmPersonel",

  mixins: [baseFormMixin, userInfoMixin],

  components: {
    PersonnelIdentification,
    UserPic,
    AccessToResources,
    OtherInfo,
    DocumentArchive,
    OldUserInfo
  },

  props: {
    taskInfo: Object,
    isSelectFromMenu: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      title: "ثبت نهایی کاربر",
      formKey: "e499bd00-8549-4318-83a0-52756d452442", // این فرم فقط در گردش کار باز می شود
      name: "UFrmConfirmPersonel",
      main: true,

      posts: [], // سمت
      jobLocations: [],
      addUserNewRes: null,
      jobTyps: [],
      nationalities: [],
      activeTab: "PersonnelIdentification",
      model: { userObj: { ...defaultModel } },

      showPopupOldInfo: false
    }
  },

  computed: {
    saveLabel () {
      const nidSelf = window.getConfigValue("esupParams")?.PersonelResource_NidWorkflowDeff?.Self
      return this.selectedRequest.NidWorkflowDeff === nidSelf ? "ثبت نهایی و فعال کردن کاربر" : "تایید کاربر"
    }
  },

  async created () {
    await this.getAllJobLocations()
    await this.loadCI()
  },
  async mounted () {
    await this.loadObj(this.taskInfo.NidProc)
  },

  methods: {
    async loadObj (StorageKey) {
      this.showLoading()
      try {
        const { data } = await this.$services.security.getUserStorage({
          StorageKey,
          NidUser: this.selectedRequest.CreatedBy
        })
        if (data.success) {
          if (!data?.data?.Body) {
            return this.showError("اطلاعات درخواست دریافت نشد.")
          }
          this.model.userObj = JSON.parse(data.data.Body)
          this.normalizedModelInLoad()
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "BizCode",
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `بارگذاری اطلاعات کاربر ${this.model.userObj.username} انجام گردید.`
          })
        } else {
          this.showSuccess(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async chackRequestType () {
      if (this.model.userObj.NidUser) {
        // is old user
        this.editUserById()
      } else {
        // is new user
        if (
          this.model.userObj.username === "" ||
          this.model.userObj.username === null
        ) {
          return this.showError("اطلاعات نام کاربری خالی می باشد.")
        }
        this.confirmAndActiveNewUser()
      }
    },
    async getUserByUsername (userName) {},
    async editUserById () {
      // در این مرحله کاربر درخواست تایید را دارد که باید قبل از تایید به سیستم اطمینان بدهد که تغییر اطلاعات قبلی به جدید را تایید میکند
      this.showPopupOldInfo = true
    },
    async confirmAndActiveOldUser (oldUserData) {
      // is old user
      try {
        if (!this.isValidForm()) return
        const obj = this.model.userObj
        // const userPic = this.imgToBase64(obj.userPic)
        const signatureImage = this.imgToBase64(obj.signatureImage)
        const fingerprintImage = this.imgToBase64(obj.fingerprintImage)
        const payload = {
          NidUser: oldUserData.NidUser,
          firstName: obj.firstName,
          lastName: obj.lastName,
          IDNumber: obj.IDNumber,
          tel: obj.tel,
          mobile: obj.mobile,
          email: obj.email,
          isSysAdmin: oldUserData.isSysAdmin,
          isSysApp: oldUserData.isSysApp,
          isSys3rdParty: oldUserData.isSys3rdParty,
          startActiveDate: oldUserData.startActiveDate,
          endActiveDate: obj.endActiveDate,
          mustChangePassword: oldUserData.mustChangePassword,
          enabled: oldUserData.enabled,
          mustLoginByCamera: obj.mustLoginByCamera,
          allowedIp: obj.allowedIp
            ? obj.allowedIp
            : obj.jobLocation
              ? obj.jobLocation.allowedIP
              : [],
          address: obj.address,
          fatherName: oldUserData.fatherName,
          birthDate: obj.birthDate,
          birthPlace: obj.birthPlace,
          description: obj.description,
          sessionTimeout: obj.sessionTimeout,
          CI_Nationality: oldUserData.CI_Nationality,
          signatureImage,
          fingerprintImage
        }
        if (Array.isArray(payload.allowedIp)) {
          payload.allowedIp = payload.allowedIp.toString()
        }
        const data = await this.$services.security.editUserById(payload)
        const editUserByIdRes = this.getResponse(data)
        if (editUserByIdRes.success) {
          if (editUserByIdRes.data.data.success) {
            if (oldUserData.enabled === false) {
              this.showSuccess(
                "ثبت نهایی انجام شد، ولی  به دلایل امنیتی فعالسازی این کاربر انجام نشد."
              )
            } else {
              this.showSuccess(
                "ثبت نهایی و فعال سازی کاربر با موفقیت انجام شد."
              )
            }
            await this.changeUserAvatar(
              oldUserData.NidUser,
              this.model.userObj.userPic
            )
            this.showPopupOldInfo = false
          } else {
            this.showError(editUserByIdRes.data.data.msg)
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async confirmAndActiveNewUser () {
      // is new user
      if (!this.isValidForm()) return
      const payload = this.normalizedModelInSaveNewUser()
      try {
        this.showLoading()
        const data = await this.$services.security.addUserNew(payload)
        this.addUserNewRes = this.getResponse(data)
        if (this.addUserNewRes.success) {
          if (this.addUserNewRes.data.data.success) {
            this.showSuccess("ثبت نهایی و فعال سازی کاربر با موفقیت انجام شد.")
            this.model.userObj.NidUser =
              this.addUserNewRes?.data?.data?.data?.NidUser ?? null
            await this.upsertUserStorage()
            await this.changeUserAvatar(
              this.model.userObj.NidUser,
              this.model.userObj.userPic
            )
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "BizCode",
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ثبت نهایی و فعال سازی کاربر ${this.model.userObj.username} انجام گردید.`
            })
            this.redirectToKartable()
          } else {
            this.showError(this.addUserNewRes.data.data.msg)
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async upsertUserStorage () {
      this.model.userObj.jobLocation.allowDomains =
        this.model.userObj.jobLocation.allowDomains.toString()
      try {
        const Body = JSON.stringify({
          ...this.model.userObj,
          enabled: true // فعال کردن کاربر
        })
        const payload = {
          StorageKey: this.taskInfo.NidProc,
          NidUser: this.selectedRequest.CreatedBy,
          Body
        }
        const { data } = await this.$services.security.upsertUserStorage(
          payload
        )
        if (data.success) {
          this.model.userObj = JSON.parse(data.data.Body)
        } else {
          this.showSuccess(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },

    async getAllJobLocations () {
      try {
        const { data } = await this.$services.security.getAllJobLocations({
          from: 1,
          to: 1000
        })
        const res = this.getResponse(data)
        if (res.success) {
          this.jobLocations =
            [
              ...res.data?.data?.list?.map(({ NidJobLocation, name }) => {
                return { ID: NidJobLocation, Title: name }
              })
            ] || []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async loadCI () {
      try {
        const { data } = await this.$services.security.getCIList({})
        const res = this.getResponse(data)
        if (res.success) {
          const list = res.data?.data?.list ?? []
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
      }
    },
    normalizedModelInLoad () {
      if (
        this.model.userObj.jobLocation &&
        this.model.userObj.jobLocation.allowDomains
      ) {
        this.model.userObj.jobLocation.allowDomains =
          this.model.userObj.jobLocation.allowDomains.split(",")
      }
      if (this.model.userObj.jobLocation.startDate === null) {
        this.model.userObj.jobLocation.startDate = currentDate()
      }
      if (this.model.userObj.jobLocation.startDate === "") {
        this.model.userObj.jobLocation.startDate = currentDate()
      }
      // if (this.model.userObj.jobLocation.endDate === null) {
      //   this.model.userObj.jobLocation.endDate = this.addDay(
      //     this.model.userObj.jobLocation.startDate,
      //     7
      //   )
      // }
      // if (this.model.userObj.jobLocation.endDate === "") {
      //   this.model.userObj.jobLocation.endDate = this.addDay(
      //     this.model.userObj.jobLocation.startDate,
      //     7
      //   )
      // }
    },
    normalizedModelInSaveNewUser () {
      const obj = this.model.userObj
      if (typeof obj.jobLocation.allowDomains === "string") {
        obj.jobLocation.allowDomains =
          obj.jobLocation.allowDomains.split(",").filter((x) => x !== "") || []
      }
      if (!obj.NidUser) {
        // تاریخ شروع و پایان جاب لوکیشن از دیتابیس میخونه
        // if (obj.jobLocation.startDate === null) {
        //   obj.jobLocation.startDate = currentDate()
        // }
        // if (obj.jobLocation.startDate === "") {
        //   obj.jobLocation.startDate = currentDate()
        // }
        obj.startActiveDate = currentDate()
        let postName = this.posts.find(x => x.ID === obj.jobLocation.CI_Post)?.Title || ""
        obj.jobLocation.post = postName
        delete obj.jobLocation["name"]
        delete obj.jobLocation["jobLocation"]
        delete obj["tabletSerial"]
        delete obj["studyFieldRel"]
        delete obj["NidUser"]
        delete obj["gender"]
        delete obj["workPosition"]
        delete obj["job"]
        delete obj["workAddress"]
        delete obj["userPic"]
      }
      return {
        ...obj,
        enabled: true // فعال کردن کاربر
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
    async changeUserAvatar (nidUser, newUserPic) {
      await this.removeAvatar(nidUser, this.imgToBase64(newUserPic))
    },
    reset () {},
    changeMode () {}
  }
}
</script>
