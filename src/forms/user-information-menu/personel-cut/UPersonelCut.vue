<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-status :result="userListRes" />
      <safa-status :result="creInsRes" />
      <safa-status :result="editUserByIdRes" />
      <safa-status :result="deleteRes" />

      <safa-tabs v-model="activeTab" :padding="false">
        <template v-slot:tabs>
          <tab-menu name="activeUsers" label="کاربران فعال" />
          <tab-menu name="deactiveUsers" label="کاربران غیرفعال" />
        </template>
        <tab-content name="activeUsers">
          <fit>
            <safa-grid
              title="لیست کاربران فعال"
              fit
              v-model="activeUsers"
              cdcName="userList"
              :columns="activeUsersColumns"
              paginate
              :pegeSize="20"
              m="r"
            />
          </fit>
        </tab-content>
        <tab-content name="deactiveUsers">
          <fit>
            <safa-grid
              title="لیست کاربران غیرفعال"
              fit
              v-model="deactiveUsers"
              cdcName="deactiveUsers"
              :columns="deactiveUsersColumns"
              paginate
              :pegeSize="20"
              m="r"
            />
          </fit>
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
import { currentDate } from "src/utils/index"

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
  jobLocation: {
    NidJobLocation: null,
    name: null,
    startDate: null,
    endDate: null,
    CI_JobType: null,
    allowDomains: null,
    post: null,
    allowedIP: null
  }
}
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "قطع همکاری کاربر",
      formKey: "B65FE692-36EA-0001-0020-66B8EB0E9E77",
      name: "UPersonelCut",
      main: true,
      sidebarCompatible: true,

      userListRes: null,
      creInsRes: null,
      procInfo: null,
      deleteRes: null,
      editUserByIdRes: null,

      activeTab: "activeUsers",
      userName: "",
      userListResult: null,
      eumRequestType: {
        User: "cce75576-0f3c-409b-ac29-6c774f67e2e7",
        Daftar: "cce75576-0f3c-409b-ac29-6c774f67e2e7",
        Self: "24300b55-ffbc-45b9-8c32-bd8e95942279",
        Cut: "cb5e6531-7303-4b5c-8f6b-da562a5321cf"
      },
      NidUser: null,
      model: { userObj: { ...defaultModel } },
      jobLocations: [],
      activeUsers: [],
      deactiveUsers: [],
      activeUsersColumns: [
        { field: "username", title: "نام کاربری", width: "150px" },
        { field: "firstName", title: "نام", width: "150px" },
        { field: "lastName", title: "نام خانوادگی", width: "150px" },
        { field: "active", title: "فعال", width: "70px", editor: "checkbox" },
        {
          field: "endActiveDate",
          title: "تاریخ انقضا",
          width: "100px",
          editor: "date"
        },
        {
          field: "isSysAdmin",
          title: "مدیر سیستم",
          width: "100px",
          editor: "checkbox"
        },
        { field: "jobLocation", title: "محل خدمت", width: "auto" },
        {
          field: "",
          title: "",
          btnTitle: "درخواست حذف کاربر",
          btnIcon: "clear",
          width: "150px",
          filterable: false,
          resizable: false,
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.deleteUser(params)
        }
      ],
      deactiveUsersColumns: [
        { field: "username", title: "نام کاربری", width: "150px" },
        { field: "firstName", title: "نام", width: "150px" },
        { field: "lastName", title: "نام خانوادگی", width: "150px" },
        {
          field: "endActiveDate",
          title: "تاریخ انقضا",
          width: "100px",
          editor: "date"
        },
        {
          field: "isSysAdmin",
          title: "مدیر سیستم",
          width: "auto",
          editor: "checkbox"
        }
      ]
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.security
        .getJobLocationUsers({
          NidJobLocation: this.currentUser.JobLocationGuid
        })
        .then(async ({ data }) => {
          this.userListRes = this.getResponse(data)
          if (this.userListRes.success) {
            const list =
              this.normalizeUserList(this.userListRes?.data?.data?.list) ?? []
            this.activeUsers = list.filter(({ enabled }) => enabled === true)
            this.deactiveUsers = list.filter(
              ({ enabled }) => enabled === false
            )
            await this.log({
              action: this.logActions.view,
              bizCode: this.currentUser.JobLocationGuid,
              bizCodeTitle: "JobLocationGuid",
              saveDesc: `بارگذاری اطلاعات کاربران در فرم ${
                this.title
              } برای محل خدمت  ${
                this.currentUser.JobLocationName ?? ""
              } انجام گردید`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    deleteUser (params) {
      this.model.userObj = params
      this.showConfirm(
        "آیا درخواستهای جاری و بایگانی موقت کاربر تعیین تکلیف گردیده است؟"
      ).onOk(() => {
        this.deleteProcess(params)
      })
    },

    async deleteProcess () {
      const nidWfdObj =
        window.getConfigValue("esupParams")?.PersonelResource_NidWorkflowDeff ??
        null
      if (!nidWfdObj) {
        return this.showError(
          "کلید گردشکار تعریف نشده است . به راهبر سیستم اطلاع دهید"
        )
      } // PersonelResource_NidWorkflowDeff
      this.eumRequestType = nidWfdObj
      try {
        this.showLoading()
        console.log("addWorkItem")
        await this.addWorkItem()
        console.log("saveRequest")
        await this.saveRequest()

        await this.log({
          action: this.logActions.save,
          bizCode: this.procInfo.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.procInfo.BizCode,
          nidWorkItem: this.procInfo.NidWorkItem,
          saveDesc: `عملیات ثبت درخواست قطع همکاری کاربر با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        })
        this.showSuccess(
          `درخواست شماره ${this.procInfo.NidWorkItem} جهت قطع همکاری کاربر با موفقیت ثبت گردید.`
        ).onDismiss(() => {
          this.hideLoading()
          this.redirectToKartable()
        })
        this.refreshKartable()
      } catch (e) {
        console.error("@@@@@addRequest Error", e)
        await this.deleteRequest()
        await this.deleteProc()
        this.showError(
          `متاسفانه عملیات ثبت درخواست قطع همکاری کاربر متوقف شد.`
        )
        this.hideLoading()
      } finally {
        this.$forceUpdate()
        this.hideLoading()
      }
    },

    async addWorkItem () {
      return new Promise(async (resolve, reject) => {
        const pUser = this.model.userObj
        // const TmpProp = {
        //   cmbWorkFlowType: "", //  PropTitle = "نوع گردش کار", PropValue = "ویرایش خوداظهاری کاربر" + "" });
        //   cmbRequestType: "", //  PropTitle = "نوع درخواست", PropValue = "ویرایش کاربر" + "" });
        //   Guid: pUser.GUID, //  PropTitle = "کد کاربر", PropValue = pUser.GUID.ToString(), PropType = "hidden" });
        //   txtUserName: pUser.username, //  PropTitle = "نام کاربر", PropValue = pUser.UserName + "" });
        //   txtName: pUser.firstName, //  PropTitle = "نام", PropValue = pUser.FirstName + "" });
        //   txtFamily: pUser.lastName, //  PropTitle = "نام خانوادگی", PropValue = pUser.LastName.ToString() });
        //   txtNatioanlCode: pUser.NationalCode, //  PropTitle = "کد ملی", PropValue = pUser.NationalCode.ToString() });
        //   txtIdNumber: pUser.IDNumber, //  PropTitle = "شماره شناسنامه", PropValue = pUser.IdNumber.ToString() });
        //   txtbirthDate: pUser.birthDate, //  PropTitle = "تاریخ تولد", PropValue = pUser.BirthDate.ToString() });
        //   txtTel: pUser.tel, //  PropTitle = "شماره تلفن", PropValue = pUser.Tel });
        //   txtMobile: pUser.mobile, //  PropTitle = "شماره همراه", PropValue = pUser.Mobile });
        //   txtEmail: pUser.email, //  PropTitle = "ایمیل", PropValue = pUser.Email });
        //   Sex: pUser?.sex === 1 ? "آقا" : "خانم" ?? 0, //  PropTitle = "جنسیت", PropValue = (pUser.Sex == 1) ? "آقا" : "خانم" });
        //   txtHomeAddress: pUser.address //  PropTitle = "آدرس محل سکونت", PropValue = pUser.Address });
        // }
        // console.log("TmpProp :>> ", TmpProp)

        const payload = {
          BizCode: pUser.username.toString(),
          EumOwnerType: 0,
          NidWorkflowDeff: this.eumRequestType.Cut,
          ProcInitiator: this.getNidUser(),
          ProcRequester: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: "سرا10",
          GroupName: "قطع همکاري",
          GroupTitel: `درخواست قطع همکاری با کاربر ${pUser.username}`,
          Domain: 0,
          IsSara10Request: true
        }
        const res = await this.$srvWorkflow.createInstance(payload)
        this.creInsRes = this.getResponse(res.data)
        if (this.creInsRes.success) {
          const obj = this.creInsRes.data
          if (obj.status === 200 && obj.success) {
            this.procInfo = obj.data.ProcInfo
            return resolve()
          } else {
            return reject(obj.msg)
          }
        } else {
          return reject(res.msg)
        }
      })
    },
    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        let tmp = this.model.userObj
        delete tmp.NidUserCreator
        delete tmp.createdAt
        delete tmp.domain
        delete tmp.incorrectPassCount
        delete tmp.password
        delete tmp.secondPassword
        delete tmp.updatedAt
        delete tmp.username
        delete tmp.changePasswordDate
        delete tmp.jobLocation
        delete tmp.jobLocationHistory
        delete tmp.lastLoginDate
        delete tmp.isMobileMatched
        delete tmp.passwordHistories
        delete tmp.isDied
        delete tmp.uniqueId

        const res = await this.$services.security.editUserById({
          ...tmp,
          endActiveDate: currentDate(),
          enabled: false,
          active: false
        })
        this.editUserByIdRes = this.getResponse(res.data)
        if (this.editUserByIdRes.success) {
          const obj = this.editUserByIdRes.data
          if (obj.success) {
            return resolve()
          } else {
            console.error("error msg :>> ", obj.msg)
            return reject(obj.msg)
          }
        } else {
          this.showError(res?.msg ?? "")
          return reject(res.msg)
        }
      })
    },

    async deleteRequest () {
      try {
        const { data } = await this.$services.SC.deleteRequest(
          { pNidProc: this.procInfo.NidProc },
          this.config
        )
        this.deleteRes = this.getResponse(data)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async deleteProc () {
      try {
        const { data } = await this.$srvWorkflow.deleteProc(
          { NidProc: this.procInfo.NidProc },
          this.config
        )
        if (!data.success) {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },

    normalizeUserList (list) {
      if (!Array.isArray(list)) return []
      return list.map((m) => {
        return {
          ...m,
          endActiveDate: m.endActiveDate
            ? new PersianDate()
            // m.endActiveDate.split("/").map((x) => parseInt(x))
              .toCalendar("persian")
              .toLocale("en")
              .format("L")
            : "",
          jobLocation: (m.jobLocation && m.jobLocation.name) || ""
        }
      })
    }
  }
}
</script>
