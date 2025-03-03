<template>
  <safa-form :id="formKey" :caption="title" appId="">
    <form-wrapper :title="title" :padding="true">
      <fit>
        <internal-section title="فرم شناسایی پرسنل">
          <FormRow>
            <FormControl>
              <safa-combo
                label="نوع درخواست"
                label-width="100px"
                v-model="model.userObj.workflowTitel"
                :options="workflowOptions"
                sourceType="local"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                label="محل خدمت"
                label-width="100px"
                v-model="model.userObj.getAllJobLocations"
                domainName="Analysis"
                ciName=""
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="نام کاربر"
                label-width="100px"
                v-model="this.selectedRequest.AssingToUserName"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                label=" حوزه فعالیت"
                v-model="model.userObj.activityField"
                label-width="100px"
                ciName=""
                domainName="Analyze"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="نام"
                v-model="model.userObj.firstName"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label=" نام خانوادگی"
                v-model="model.userObj.lastName"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="شماره تلفن"
                label-width="100px"
                v-model="model.userObj.Tel"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="شماره همراه"
                label-width="100px"
                v-model="model.userObj.mobile"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="کد ملی"
                label-width="100px"
                v-model="model.userObj.IdNumber"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="ایمیل"
                label-width="100px"
                v-model="model.userObj.Email"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="شماره شناسنامه"
                label-width="100px"
                v-model="model.userObj.Id"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ تولد"
                label-width="100px"
                v-model="model.userObj.birthDate"
                :m="mode"
              />
            </FormControl>
            <FormControl class="flex items-center">
              <safa-label style="width: 95px">جنسیت :</safa-label>
              <div class="q-gutter-x-lg">
                <safa-radio label="خانم" :val="1" v-model="gender" />
                <safa-radio label="آقا" :val="2" v-model="gender" />
              </div>
            </FormControl>
            <FormControl class="col-6">
              <btn-default label="کاربران زیرمجموعه" @click="popUsers" />
            </FormControl>
            <safa-text
              :m="mode"
              label="آدرس محل سکونت"
              v-model="model.userObj.Address"
              label-width="100px"
              class="col-12"
            />
            <safa-text
              :m="mode"
              label="توضیحات"
              v-model="model.userObj.Description"
              label-width="100px"
              class="col-12"
            />
          </FormRow>
        </internal-section>

        <internal-section title="سایر مشخصات">
          <FormRow>
            <FormControl>
              <safa-text
                :m="mode"
                label="نام پدر"
                v-model="model.userObj.fatherName"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label=" حوزه فعالیت"
                v-model="activityField"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                v-model="educationLevel"
                :options="educationOptions"
                sourceType="local"
                label="میزان تحصیلات :"
                label-width="125px"
                :m="mode"
              >
              </safa-combo>
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="رشته تحصیلی"
                v-model="Field"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="آدرس محل کار"
                v-model="jobLocation"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="معرف به شهردار مشهد"
                v-model="introToMashhad"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :m="mode"
                label="نام بستگان شاغل در شهرداری"
                v-model="workerMunicipalityRelative"
                label-width="100px"
              />
            </FormControl>
          </FormRow>
        </internal-section>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveData"
        >
          <btn-default label="ارسال پیام برای کاربر" @click="sendSMS" />
        </form-actions>
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

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تخصیص توکن",
      formKey: "b65fe692-36ea-0001-0018-66b8eb0e9e77",
      name: "UTokenAllocate",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      gender: "",
      activityField: "",
      educationLevel: "",
      Field: "",
      jobLocation: "",
      introToMashhad: "",
      workerMunicipalityRelative: "",
      getAllJobLocationsResult: null,
      results: { ResponserKartabl: [] },
      strBizCode: "",
      showUsers: false,

      model: {
        userObj: {
          workflowTitel: "",
          getAllJobLocations: "",
          userName: "",
          activityField: "",
          firstName: "",
          lastName: "",
          Tel: "",
          mobile: "",
          IdNumber: "",
          Email: "",
          Id: "",
          birthDate: "",
          Address: "",
          Description: "",
          fatherName: ""
        }
      },
      workflowOptions: [
        {
          Title: "کاربر جدید",
          ID: "item1"
        },
        {
          Title: "ویرایش کاربر",
          ID: "item2"
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
      ]
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.loadObj()
      console.log(this.selectedRequest)
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("UTokenAllocation")
    }
    this.getResponserKartabl()
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.security
        .getAllJobLocations()
        .then(({ data }) => {
          this.getAllJobLocationsResult = this.getResponse(data)
          if (this.getAllJobLocationsResult.success) {
            this.model.userObj = this.getAllJobLocationsResult.data.data.list
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
        }
      })
    },
    loadObjUsersTab () {
      this.showLoading()

      let data = {
        NidJobLocation: this.$stSecurity.getters["authorize/user"].JobLocationGuid,
        from: 1,
        to: 200,
        search: ""
      }
      this.$services.security
        .getUsersFromJobLocation(
          data
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
    },

    saveData () {}
  }
}
</script>
