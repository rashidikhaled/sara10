<template>
  <safa-form :id="formKey" :caption="title"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77">
    <form-wrapper vertical :title="title">
      <template #header>
        <safa-status :result="userListResult" />
      </template>
      <fit>
        <div class="row q-col-gutter-sm q-mb-sm">
          <safa-text
            label="نام کاربری"
            label-width="60px"
            class="col-md-3"
            v-model="userName"
            cdcName="userName"
            @keypress.enter="getUsers"
          >
            <template v-slot:append>
              <q-icon
                name="search"
                @click="getUsers"
                title="جستجوی کاربر"
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </div>
        <safa-grid
          title="قطع همکاری ستاد"
          fit
          min-height="100px"
          height="100%"
          max-height="100%"
          v-model="userList"
          cdcName="userList"
          :columns="userListColumns"
          paginate
          :m="mode"
          :take="20"
          :addRow="false"
          :allowCopy="false"
          :isEditable="true"
          :suppressRowClickSelection="false"
        />
      </fit>
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
      title: "قطع همکاری ستاد",
      formKey: 'B65FE692-36EA-0001-0029-66B8EB0E9E77',
      name: "UDissociateCenter",
      main: true,
      sidebarCompatible: true,
      userName: "",
      userListResult: null,
      NidUser: null,
      model: { userObj: { ...defaultModel } },
      jobLocations: [],
      userList: [],
      userListColumns: [
        {
          field: "username",
          title: "نام کاربری",
          width: "150px"
        },
        {
          field: "firstName",
          title: "نام",
          width: "150px"
        },
        {
          field: "lastName",
          title: "نام خانوادگی",
          width: "150px"
        },
        {
          field: "online",
          title: "فعال",
          width: "70px",
          editor: "checkbox"
        },
        {
          field: "endActiveDate",
          title: "تاریخ انقضا",
          width: "100px",
          editor: "date"
        },
        {
          field: "isSysAdmin",
          title: "مدیر سیستم",
          width: "70px",
          editor: "checkbox"
        },
        {
          field: "jobLocation",
          title: "محل خدمت",
          width: "300px"
        },
        {
          field: "agCallbackBtn",
          title: "",
          btnTitle: "درخواست حذف کاربر",
          callback: (params) => this.deleteUser(params)
        }
        // {
        //   field: "delete",
        //   title: "درخواست حذف کاربر",
        //   width: "130px",
        //   editor: "action"
        // }
      ]
    }
  },

  mounted () {
    this.getUsers()
  },

  methods: {
    normalizeUserList (list) {
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
    },
    getUsers () {
      this.showLoading()
      this.$services.security
        .userList({ search: this.userName })
        .then(async ({ data }) => {
          this.userListResult = this.getResponse(data)
          if (this.userListResult.success) {
            this.userList = this.normalizeUserList(
              this.userListResult.data.data.list
            )
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    deleteUser (dataItem) {
      this.showConfirm("آیا از حذف اطمینان دارید؟").onOk(() => {
        this.editUserInfo(dataItem)
      })
    },

    editUserInfo (user) {
      if (!this.isValidForm()) return
      const payload = {
        NidUser: user.NidUser,
        IDNumber: user.IDNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        CI_Nationality: user.CI_Nationality,
        fatherName: user.fatherName,
        birthDate: user.birthDate,
        tel: user.tel,
        mobile: user.mobile,
        email: user.email,
        birthPlace: user.birthPlace,
        startActiveDate: user.startActiveDate,
        endActiveDate: currentDate(),
        address: user.address,
        description: user.description,
        enabled: false,
        isSysAdmin: user.isSysAdmin,
        isSysApp: user.isSysApp,
        isSys3rdParty: user.isSys3rdParty
      }

      this.showLoading()
      this.$services.security
        .editUserById(payload)
        .then(async ({ data }) => {
          if (data.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            this.resetValidation()
            await this.log({
              action: this.logActions.delete,
              bizCode: user.NidUser,
              bizCodeTitle: "NidUser"
            })
          } else {
            this.showError(data.msg)
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    addWorkItem () {
      this.getNewTask()
    },
    getNewTask () {}
  }
}
</script>
