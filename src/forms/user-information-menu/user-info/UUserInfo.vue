<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77"
  >
    <FormWrapper :title="title" :padding="false">
      <fit>
        <safa-tabs fit v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu label="فرم شناسایی پرسنل" name="userInfo_tab" />
            <tab-menu label="سایر مشخصات" name="otherUserInfo_tab" />
            <tab-menu label="تصاویر کاربر" name="userPic_tab" />
            <!-- <tab-menu label="دسترسی به منابع" name="resources_tab" />-->
            <tab-menu label="آرشیو مدارک" name="archive_tab" />
          </template>

          <tab-content name="userInfo_tab">
            <PersonnelIdentification
              v-model="model.userObj"
              :lockUsername="false"
              :posts="posts"
              :jobTyps="jobTyps"
              :jobLocations="jobLocations"
              @getUser="getUserByUsername"
              @reset="reset"
              @changeMode="changeMode"
              :nationalities="nationalities"
              :activeTab="activeTab"
              :m="mode"
              ref="persInfo"
              lockRequestType
            />
          </tab-content>
          <tab-content name="otherUserInfo_tab">
            <OtherInfo v-model="model.userObj" :m="mode" />
          </tab-content>
          <tab-content name="userPic_tab">
            <UserPic v-model="model.userObj" :m="mode" />
          </tab-content>
          <tab-content name="resources_tab">
            <AccessToResources :model="model" :m="mode" />
          </tab-content>
          <tab-content name="archive_tab">
            <DocumentArchive v-model="model.userObj" />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer v-if="activeTab !== 'archive_tab'">
        <FormActions
          :m="mode"
          saveButtonTitle="ویرایش درخواست"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="checkNationalCode"
        />
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import userInfoMixin from "./../mixins/userInfoMixin"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"
import PersonnelIdentification from "../request-to-create-new-user/partials/PersonnelIdentification.vue"
import UserPic from "../request-to-create-new-user/partials/UserPic.vue"
import AccessToResources from "../request-to-create-new-user/partials/AccessToResources.vue"
import DocumentArchive from "../request-to-create-new-user/partials/DocumentArchive.vue"
import OtherInfo from "../request-to-create-new-user/partials/OtherInfo.vue"

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
  NidGroup: '00000000-0000-0000-0000-000000000000',
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
  mixins: [baseFormMixin, userInfoMixin],

  components: {
    PersonnelIdentification,
    UserPic,
    AccessToResources,
    DocumentArchive,
    OtherInfo
  },

  data () {
    return {
      name: "UUserInfo",
      title: "اطلاعات کاربر",
      formKey: "60235305-c2e2-484a-abcd-995920c6837e",
      main: true,

      // #variables
      model: { userObj: { ...defaultModel } },
      base64image: null,
      userIndex: 0,
      hasNidUser: false,
      newUserMode: true,
      activeTab: "userInfo_tab",
      jobLocations: [],
      jobTyps: [],
      posts: [], // سمت
      nationalities: []
    }
  },

  async mounted () {
    if (this.isSelectedRequest()) {
      await this.getCIList()
      await this.getAllJobLocations()
      await this.loadObj(this.taskInfo.NidProc)
    } else this.hideSidebar(this.name)
  },

  methods: {
    async loadObj (StorageKey) {
      try {
        const payload = {
          StorageKey,
          NidUser: this.selectedRequest.CreatedBy
        }
        const { data } = await this.$services.security.getUserStorage(payload)
        if (data.success) {
          if (!data?.data?.Body) {
            return this.showError("اطلاعات درخواست دریافت نشد.")
          }
          this.model.userObj = JSON.parse(data.data.Body)
          if (
            this.model.userObj.jobLocation &&
            this.model.userObj.jobLocation.allowDomains
          ) {
            this.model.userObj.jobLocation.allowDomains =
              this.model.userObj.jobLocation.allowDomains.split(",")
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "BizCode",
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `بارگذاری اطلاعات کاربر ${this.model.userObj.username} انجام گردید.`
          })
        } else {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async reset () {},
    addDay (currentDay, length) {
      const tmp = currentDay.split("/")
      let yearFrom = parseInt(tmp[0])
      let monthFrom = parseInt(tmp[1])
      let dayFrom = parseInt(tmp[2])
      let dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom])
      return dateFrom.add("days", length).toLocale("en").format("L")
    },
    normalizedModel () {
      const obj = this.model.userObj
      this.model.userObj.jobLocation.allowDomains =
        obj.jobLocation?.allowDomains?.toString() ?? ""
      this.model.userObj.jobLocation.post =
        this.posts.find((f) => f.ID === parseInt(obj.jobLocation?.CI_Post ?? 0))
          ?.Title ?? ""
      this.model.userObj.jobLocation.post =
        this.model.userObj.jobLocation.post.replaceAll("--", " ")
      this.model.userObj.jobLocation.name =
        this.jobLocations.find(
          (f) => f.ID === obj.jobLocation?.NidJobLocation ?? ""
        )?.Title ?? ""
      if (obj.mustLoginByCamera === null) {
        this.model.userObj.mustLoginByCamera = false
      }
      if (obj.jobLocation.startDate === null) {
        this.model.userObj.jobLocation.startDate = currentDate()
      }
      if (obj.jobLocation.startDate === "") {
        this.model.userObj.jobLocation.startDate = currentDate()
      }
      // if (obj.jobLocation.endDate === null) {
      //   this.model.userObj.jobLocation.endDate = this.addDay(
      //     this.model.userObj.jobLocation.startDate,
      //     7
      //   )
      // }
      // if (obj.jobLocation.endDate === "") {
      //   this.model.userObj.jobLocation.endDate = this.addDay(
      //     this.model.userObj.jobLocation.startDate,
      //     7
      //   )
      // }
      if (obj.jobLocation.allowedIP === null) {
        this.model.userObj.jobLocation.allowedIP = ["0"]
      }
    },
    async saveObj () {
      try {
        this.normalizedModel()
        const Body = JSON.stringify(this.model.userObj)
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
          console.log(
            "upsertUserStorageRes in UUserInfo :>> ",
            this.model.userObj
          )
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "BizCode",
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `بروزرسانی اطلاعات کاربر ${this.model.userObj.username} انجام گردید.`
          })
          this.showSuccess("عملیات با موفقیت انجام شد.")
          this.isEditable = false
        } else {
          this.showSuccess(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },

    async getUserByUsername () {},
    async getUserById (nidUser) {
      try {
        this.showLoading()
        const { data } = await this.$services.security.getUserById({
          NidUser: nidUser
        })
        if (data.success) {
          this.model.userObj = data.data
          this.hasNidUser = true
          this.newUserMode = false
          if (data.data.jobLocation && data.data.jobLocation.allowDomains) {
            this.model.userObj.jobLocation.allowDomains =
              data.data.jobLocation.allowDomains.toString()
          }
          await this.getImageByID(this.model.userObj.NidUser)
        } else {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    changeMode (mode) {},
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
      if (
        this.model.userObj.username === "" ||
        this.model.userObj.username === null
      ) {
        return this.showError("اطلاعات نام کاربری خالی می باشد.")
      }
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
          await this.civilAuthorityStatus()
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
          this.saveObj()
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
      this.redirectToKartableReferences()
    }
  },

  watch: {
    currentImageArr () {
      this.model.userObj.userPic = this.currentImageArr ?? null
    }
  }
}
</script>
