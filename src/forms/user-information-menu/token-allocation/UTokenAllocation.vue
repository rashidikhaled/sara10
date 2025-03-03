<template>
  <safa-form :id="formKey" :caption="title"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77">
    <form-wrapper :title="title" :padding="false">
      <fit>
        <internal-section title="فرم شناسایی پرسنل">
          <FormRow>
            <FormControl>
              <safa-text
                label="نوع درخواست"
                label-width="100px"
                v-model="this.selectedRequest.WorkflowTitel"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="محل خدمت"
                label-width="100px"
                v-model="getAllJobLocations"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام کاربر"
                label-width="100px"
                v-model="this.selectedRequest.AssingToUserName"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label=" حوزه فعالیت"
                v-model="activityField"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام"
                v-model="model.userObj.firstName"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label=" نام خانوادگی"
                v-model="model.userObj.lastName"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره تلفن"
                label-width="100px"
                v-model="model.userObj.tel"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره همراه"
                label-width="100px"
                v-model="model.userObj.mobile"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کد ملی"
                label-width="100px"
                v-model="model.userObj.IDNumber"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="ایمیل"
                label-width="100px"
                v-model="model.userObj.email"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره شناسنامه"
                label-width="100px"
                v-model="Id"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ تولد"
                label-width="100px"
                v-model="birthDate"
              />
            </FormControl>
            <FormControl class="flex items-center">
              <safa-label style="width: 100px">جنسیت</safa-label>
              <div class="q-gutter-x-lg">
                <safa-radio
                  label="مرد"
                  :m="m"
                  val="male"
                  v-model="gender"
                  :disable="disableIngenicoBtn"
                  dense
                />
                <safa-radio
                  label="زن"
                  :m="m"
                  val="female"
                  v-model="gender"
                  :disable="disableIngenicoBtn"
                  dense
                />
              </div>
            </FormControl>

            <form-control>
              <btn-default label="زیرمجموعه" @click="popUsers" />
            </form-control>
            <safa-text
              label="آدرس محل سکونت"
              v-model="model.userObj.address"
              label-width="100px"
              class="col-12"
            />
            <safa-text
              label="توضیحات"
              v-model="description"
              label-width="100px"
              class="col-12"
            />
          </FormRow>
        </internal-section>

        <internal-section title="سایر مشخصات">
          <FormRow>
            <FormControl>
              <safa-text
                label="نام پدر"
                v-model="model.userObj.fatherName"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label=" حوزه فعالیت"
                v-model="activityField"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                v-model="education"
                :options="educationOptions"
                sourceType="local"
                label="میزان تحصیلات"
                label-width="100px"
              >
              </safa-combo>
            </FormControl>
            <FormControl>
              <safa-text
                label="رشته تحصیلی"
                v-model="field"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="آدرس محل کار"
                v-model="jobLocation"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="معرف به شهردار مشهد"
                v-model="introToMashhad"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام بستگان شاغل در شهرداری"
                v-model="workerMunicipalityRelative"
                label-width="100px"
              />
            </FormControl>
          </FormRow>
        </internal-section>

        <internal-section title="اختصاص توکن">
          <FormRow>
            <FormControl>
              <safa-combo
                label="انتخاب توکن"
                label-width="100px"
                v-model="tokenAllocationCombo"
                :options="tokenOptions"
                sourceType="local"
              />
            </FormControl>
          </FormRow>
        </internal-section>
      </fit>
      <template #footer>
        <div class="q-gutter-sm">
          <btn-default label="ارسال پیام برای کاربر" @click="sendSMS" />
          <btn-save label="ذخیره ی شناسه" />
        </div>
      </template>

      <safa-popup
        title="کاربران زیرمجموعه"
        v-model="showUsers"
        width="900px"
        height="600px"
      >
        <fit>
          <safa-datatable
            title="کاربران زیرمجموعه"
            v-model="result"
            :columns="includedUsersColumns"
            fit
            height="100%"
            max-height="100%"
            min-height="200px"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            paginate
          />
        </fit>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"

const defaultModel = {
  NidUser: null,

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
      title: "اختصاص توکن",
      formKey: 'B65FE692-36EA-0001-0018-66B8EB0E9E77',
      name: "UTokenAllocation",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      endActiveDate: "",
      activeTab: "personnelIdentificationForm",
      reqType: "",
      jobLocation: "",
      fatherName: "",
      userName: "",
      activityField: "",
      tel: "",
      lastName: "",
      mobile: "",
      nationalCode: "",
      email: "",
      Id: "",
      birthDate: "",
      description: "",
      address: "",
      gender: "",
      showTokenAllocation: false,
      tokenAllocationCombo: "item1",
      education: "",
      field: "",
      introToMashhad: "",
      workerMunicipalityRelative: "",
      createdBy_1: "",
      showUsers: false,
      results: { ResponserKartabl: [] },
      disableIngenicoBtn: false,
      // grids
      tokenOptions: [
        {
          Title: "نوین",
          ID: "item1"
        },
        {
          Title: "پارسکی",
          ID: "item2"
        },
        {
          Title: "پیام پرداز",
          ID: "item3"
        }
      ],
      educationOptions: [
        {
          Title: "دیپلم",
          ID: "item1"
        },
        {
          Title: "فوق دیپلم",
          ID: "item2"
        },
        {
          Title: "لیسانس",
          ID: "item3"
        },
        {
          Title: "فوق لیسانس",
          ID: "item4"
        },
        {
          Title: "دکترا",
          ID: "item5"
        },
        {
          Title: "سایر",
          ID: "item6"
        }
      ],

      result: [],
      includedUsersColumns: [
        { title: "نام کاربری", field: "userName", width: "100px" },
        { title: "نام", field: "Name", width: "100px" },
        { title: "نام خانوادگی", field: "Family", width: "100px" },
        { title: "شهر محل خدمت", field: "jobLocationCity", width: "100px" },
        { title: "محل خدمت", field: "jobLocation", width: "100px" },
        { title: "تاریخ شروع", field: "startDate", width: "80px" },
        { title: "تاریخ پایان", field: "endDate", width: "80px" },
        { title: "فعال", field: "isActive", editor: "checkbox", width: "40px" },
        {
          title: "مدیرسیستم",
          field: "Admin",
          editor: "checkbox",
          width: "70px"
        }
      ],

      // service
      strBizCode: "",
      model: { userObj: { ...defaultModel } },
      // result: null,
      // results: [],
      // userName: "",

      getUserRes: null,
      modell: {},
      kartablRes: null,
      getAllJobLocationsResult: null,
      getAllJobLocations: null
    }
  },
  props: {
    dense: Boolean,
    m: String
  },
  mounted () {
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("UTokenAllocation")
    }
    this.getResponserKartabl()
  },

  methods: {
    async sendSMS () {
      try {
        const payLoad = {
          pParameter: {
            AppName: "Monitoring",
            BizCode: this.model.userObj.mobile,
            Number: this.strBizCode,
            SMSType: "ارسال پیامک ثبت درخواست کاربر جدید",
            ScheduleSendDate: currentDate(),
            Text: `کاربر گرامی درخواست شما به شماره  ${[
              this.strBizCode
            ]} ثبت گردید"`,
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        const res = this.getResponse(data)
        if (res.success) this.showSuccess("پیامک با موفقیت ارسال شد.")
      } catch (error) {
        this.serverError()
        console.log("error ...", error)
      }
    },

    loadData () {},

    loadObjUsersTab () {
      this.showLoading()

      let data = {
        NidJobLocation: this.$stSecurity.getters["authorize/user"].JobLocationGuid,
        from: 1,
        to: 200,
        search: ""
      }
      //   const userDomains = this.$stSecurity.getters["authorize/user"].domain;
      this.$services.security
        .getUsersFromJobLocation(
          data
          // headers: {
          //   // token: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJOaWRVc2VyIjoiRjVDOURFMTAtMDkwNy0xMUVBLTg0RUYtREY2NkU3Mjc0QkVFIiwidXNlcm5hbWUiOiJhZG1pbiIsImZpcnN0TmFtZSI6ItmF2K_bjNixIiwibGFzdE5hbWUiOiLYs9uM2LPYqtmFIiwiaXNTeXNBZG1pbiI6dHJ1ZSwiaXNTeXNBcHAiOnRydWUsImlzU3lzM3JkUGFydHkiOnRydWUsImRvbWFpbiI6WyIwIl0sImlhdCI6MTYxODk5MDI3NSwiZXhwIjoxNjE5MDAxMDc1LCJhdWQiOiJodHRwOi8vc2FmYXJheWFuZWguY29tIiwiaXNzIjoiU2VjdXJpdHkiLCJzdWIiOiJTYWZhcmF5YW5laCBTZWN1cml0eSBTZXJ2aWNlIn0.Te3VXgNRz-aIJ4v8NH9XiCfTZ87AoXtd853TkoUsYoxUJFusyMrrRflOa0ATpMcIsggRj2D-IJsYdMhbKAkpBZ-pKjvNdcJSiDrxMuiPkHWNDeQPE6GLdXdUPWMXuNSyhgdbiKkdN7P_lh3gK2UFFY7G09LFCfr-bcsSK4kv3gC5BSxz8zV_RFmuvTkb66HQdLYORldx4d4vxsrKQAZzuQRTYugA_iszrmp_9sXUxup8_Q35aXdkgkqQ46-WdXf3gdQjnxtGLkhR67f6Jtry9z6W_VAtBJH5HLdq8VZ6bUW-_2MOUp9Dscnw_zyx952Md0SvVHYwgZ0Fcza7v6z6CvAmfMrD9C95w16ZLS9nJjj53-4Uw1npsWjTCSU6b65auZK9RUaNBU43Hzp9VyLLjGeEeE-kLnDhAoUBy-5SPLrAf9FF0u3o8i7naeaXNtpkY1-uaPuamEfJdR71eZleizQUQ3FhMUE-dOUPB1F59_OIb4xnFNTZHuM2abvtVUQ-cq19ueaCmIqnSugHbpjcYnSaLnLw7uPnIGWiiNmlMyeCDoZsO3pf_vzneStU4UUp8aJh_ui-Lk1OxDcyF7ESXKYk5zoafcQIogktEPhYkTZ4DrgOoHNZH8uoe9yYgvlTx_mZGIaKo8Vt64N7biSg206uugis5JhTWs1CyQUapTc`
          //   token: this.$stSecurity.getters["authorize/token"] || "",
          //   "Content-Type": "application/json",
          //   domain: userDomains[0]
          // }
        )
        .then(async ({ data }) => {
          this.result = this.getResponse(data).data
          if (this.result.success) {
            this.results = this.result.data.list
            await this.log({
              action: this.logActions.view,
              bizCode: this.getNidUser(),
              bizCodeTitle: "GUID"
            })
          } else if (this.result.status === 403) {
            this.showError(
              "دسترسی به لیست کاربران فقط برای ادمین امکانپذیر می باشد."
            )
            // } else {
            //   this.results = this.result.data.data.list
            // }
          } else if (!this.result.success) {
            this.showError(this.result.msg)
          }
        })
        .catch((response) => {
          console.error("load error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    popUsers () {
      this.showUsers = true
      this.loadObjUsersTab()
      // this.getObj();
    },

    getResponserKartabl () {
      const payload = {}
      this.$services.SC.getResponserKartabl(payload).then(async ({ data }) => {
        const response = this.getResponse(data)
        if (response.success) {
          this.results = response.data

          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "کد نوسازی"
          })

          // if (this.selectedWorkFlow !== null && this.selectedRow !== null) {
          //   this.getProcessInfo();
          // }
        }
      })
    },

    // CORS error
    loadObj () {
      this.showLoading()
      this.$services.security
        .getAllJobLocations()
        .then(({ data }) => {
          this.getAllJobLocationsResult = this.getResponse(data)
          if (this.getAllJobLocationsResult.success) {
            this.getAllJobLocations = this.getResponse(data).data.data.list
            // this.reset();
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
