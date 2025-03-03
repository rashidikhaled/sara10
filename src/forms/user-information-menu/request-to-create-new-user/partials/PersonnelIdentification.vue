<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl v-if="!lockRequestType">
        <safa-combo
          label="نوع درخواست"
          label-width="90px"
          v-model="requestType"
          :options="requestTypeOptions"
          sourceType="local"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-if="lockRequestType"
          label="نام کاربری"
          label-width="90px"
          v-model="value.username"
          m="r"
          cdcName="username"
        />
        <safa-text
          v-else
          label="نام کاربری"
          label-width="90px"
          v-model="value.username"
          required
          :validations="['required', 'string', validations.username]"
          :m="lockUsername ? 'r' : 'e'"
          @keypress.enter="search"
          cdcName="username"
        >
          <template v-slot:append>
            <q-icon
              v-if="requestType === 'editUserMode'"
              style="position: relative; right: 5px"
              size="xs"
              color="primary"
              @click="$emit('getUser', value.username)"
              :name="lockUsername ? 'sync' : 'search'"
              class="cursor-pointer"
              :title="
                lockUsername ? 'بازیابی اطلاعات کاربر' : 'جستجوی نام کاربری'
              "
              :disabled="
                value.username === '' || value.username === null ? true : false
              "
            />
          </template>
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="نام"
          label-width="90px"
          v-model="value.firstName"
          required
          :validations="['required', 'string', validations.firstName]"
          :m="m"
          cdcName="firstName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام خانوادگی"
          label-width="90px"
          v-model="value.lastName"
          required
          :validations="['required', 'string', validations.lastName]"
          :m="m"
          cdcName="lastName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ملی"
          label-width="90px"
          v-model="value.IDNumber"
          required
          :validations="['required', 'number', validations.nationalCode]"
          type="number"
          dir="ltr"
          :m="m"
          cdcName="nationalCode"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ تولد"
          label-width="90px"
          v-model="value.birthDate"
          required
          :validations="['required', 'dateFa']"
          :m="m"
          cdcName="birthDate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="سمت"
          label-width="90px"
          sourceType="local"
          :options="posts"
          v-model="value.jobLocation.CI_Post"
          :m="m"
          cdcName="CI_Post"
        />
      </FormControl>
      <FormControl>
        <safa-combo2
          label="مناطق دارای دسترسی"
          label-width="90px"
          sourceType="local"
          :options="districts"
          v-model="value.jobLocation.allowDomains"
          :m="m"
          cdcName="allowDomains"
          type="multiple"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="سریال تبلت"
          v-model="value.tabletSerial"
          label-width="90px"
          :m="m"
          cdcName="tabletSerial"
        />
      </FormControl>
      <FormControl>
        <div class="row q-col-gutter-sm">
          <safa-combo
            class="col"
            label="محل خدمت"
            label-width="90px"
            sourceType="local"
            :options="jobLocations"
            v-model="value.jobLocation.NidJobLocation"
            required
            validations="required"
            :m="m"
            cdcName="NidJobLocation"
            />
            <div class="q-gutter-sm btnInRow">
              <btn-default
              :disable="!value.jobLocation.NidJobLocation || m === 'r'"
              label=""
              title="نمایش کاربران زیر مجموعه محل خدمت"
              icon="groups"
              @click="showJoinedHandler"
              />
          </div>
        </div>
      </FormControl>
      <FormControl>
        <safa-combo
            label="حوزه فعالیت"
            label-width="90px"
            :options="hozeFaaliatOptions"
            source-type="local"
            :m="m"
            cdcName="hozeFaaliatOptions"
            v-model="value.NidGroups"
            type="multiple"
          />
        <!-- v-model="value.jobLocation.CI_JobType" -->
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن ثابت"
          label-width="90px"
          v-model="value.tel"
          type="number"
          dir="ltr"
          :m="m"
          cdcName="tel"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن همراه"
          label-width="90px"
          v-model="value.mobile"
          type="number"
          required
          :validations="['required', validations.mobile]"
          dir="ltr"
          :m="m"
          cdcName="mobile"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ایمیل"
          label-width="90px"
          v-model="value.email"
          dir="ltr"
          :m="m"
          cdcName="email"
        />
        <!-- :validations="value.email === '' ? '' : 'email'" -->
      </FormControl>
      <FormControl>
        <safa-text
          label="محل صدور"
          label-width="90px"
          v-model="value.birthPlace"
          :m="m"
          cdcName="birthPlace"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع قرارداد کاری"
          label-width="90px"
          source-type="local"
          :options="jobTyps"
          v-model="value.jobLocation.CI_JobType"
          :m="m"
          cdcName="CI_JobType"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ انقضا کاربر"
          label-width="90px"
          v-model="value.endActiveDate"
          cdcName="endActiveDate"
          :m="m"
          required
          :validations="['required']"
        />
      </FormControl>
      <!-- <FormControl>
        <safa-text
          v-if="lockRequestType"
          label="پسورد"
          label-width="90px"
          :value="value.password"
          type="password"
          m="r"
        />
        <safa-text
          v-else
          label="پسورد"
          label-width="90px"
          v-model="value.password"
          :validations="value.password === '' || value.password === null ? '' : ['string', validations.password]"
          :m="m"
        />
      </FormControl> -->
      <FormControl class="flex items-center">
        <safa-label style="width: 90px">جنسیت</safa-label>
        <div class="q-gutter-x-lg">
          <safa-radio
            label="آقا"
            :val="1"
            v-model="value.gender"
            :m="m"
            cdcName="gender"
          />
          <safa-radio
            label="خانم"
            :val="2"
            v-model="value.gender"
            :m="m"
            cdcName="gender"
          />
        </div>
      </FormControl>
    </FormRow>
    <div class="fit q-mb-sm">
      <text-template
        type="textarea"
        label="محل سکونت"
        label-width="90px"
        :rows="2"
        v-model="value.address"
        :m="m"
        cdcName="address"
      />
    </div>
    <safa-popup
      title="کاربران زیر مجموعه"
      v-model="showJoined"
      width="700px"
      height="500px"
      padding
    >
    <!-- helper="joinedJobLocationsColumns" -->
      <safa-grid
        v-model="joinedJobLocations"
        title=""
        helper="agJoinedJobLocationsColumns"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        :suppressRowClickSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        paginate
        fit
        m="r"
      />
    </safa-popup>
  </fit>
</template>

<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"
import customValidation from "src/utils/customValidation"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    nationalities: {
      type: Array,
      default: () => []
    },
    jobLocations: {
      type: Array,
      default: () => []
    },
    posts: {
      type: Array,
      default: () => []
    },
    jobTyps: {
      type: Array,
      default: () => []
    },
    m: {
      type: String,
      default: "e"
    },
    lockUsername: {
      type: Boolean,
      default: false
    },
    lockRequestType: {
      type: Boolean,
      default: false
    },
    activeTab: String
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  },
  data () {
    return {
      name: "PersonnelIdentification",
      requestType: "newUserMode",
      visibile: false,
      requestTypeOptions: [
        { ID: "newUserMode", Title: "کاربر جدید" },
        { ID: "editUserMode", Title: "ویرایش کاربر" }
      ],
      allowDomains: [],
      validations: {
        nationalCode: customValidation.nationalCode,
        mobile: Joi.string().length(11).required().messages({
          "string.base": `تلفن همراه میبایست به صورت عدد باشد.`,
          "string.length": `تلفن همراه میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        password: Joi.custom(
          function (value, helper) {
            const checkPass =
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/

            if (
              this.value.password !== "" &&
              !checkPass.test(this.value.password)
            ) {
              return helper.message(
                "پسورد باید ترکیبی هشت از کاراکتر (کاراکتر خاص، حروف کوچک ، حروف بزرگ و عدد) باشد."
              )
            }
            return true
          }.bind(this)
        ),
        username: Joi.custom(
          function (value, helper) {
            if (!this.isPersian(this.value.username)) {
              return helper.message(
                "برای نام کاربری فقط حروف انگلیسی مجاز می باشد."
              )
            }
            return true
          }.bind(this)
        ),
        firstName: Joi.custom(
          function (value, helper) {
            if (this.isPersian(this.value.firstName)) {
              return helper.message("برای نام فقط حروف فارسی مجاز می باشد.")
            }
            return true
          }.bind(this)
        ),
        lastName: Joi.custom(
          function (value, helper) {
            if (this.isPersian(this.value.lastName)) {
              return helper.message(
                "برای نام خانوادگی فقط حروف فارسی مجاز می باشد."
              )
            }
            return true
          }.bind(this)
        )
      },

      showJoined: false,
      joinedJobLocations: [],
      // agJoinedJobLocationsColumns: [
      //   {
      //     field: "username",
      //     title: "نام کاربری",
      //     width: "150px"
      //   },
      //   {
      //     field: "firstName",
      //     title: "نام",
      //     width: "100px"
      //   },
      //   {
      //     field: "lastName",
      //     title: "نام خانوادگی",
      //     width: "120px"
      //   },
      //   {
      //     field: "jobLocationName",
      //     title: "محل خدمت",
      //     width: "150px"
      //   },
      //   {
      //     field: "startDate",
      //     title: "تاریخ شروع",
      //     editor: "date",
      //     width: "90px"
      //   },
      //   {
      //     field: "endDate",
      //     title: "تاریخ پایان",
      //     editor: "date",
      //     width: "90px"
      //   },
      //   {
      //     field: "post",
      //     title: "سمت",
      //     editor: "date",
      //     width: "90px"
      //   },
      //   {
      //     field: "active",
      //     title: "فعال",
      //     editor: "checkbox",
      //     width: "80px"
      //   },
      //   {
      //     field: "isSysAdmin",
      //     title: "مدیر سیستم",
      //     editor: "checkbox",
      //     width: "100px"
      //   }
      // ],
      hozeFaaliatOptions: []
    }
  },
  mounted () {
    this.loadRoles()
  },
  methods: {
    checkNationalCodeIsValid () {
      const result = customValidation.nationalCode.validate(
        this.value.IDNumber
      )
      return !result.error
    },
    isPersian (str) {
      let p = /^[\u0600-\u06FF\s]+$/
      return !p.test(str)
    },
    showJoinedHandler () {
      this.showLoading()
      this.$services.security
        .getJobLocationUsers({
          NidJobLocation: this.value.jobLocation.NidJobLocation
        })
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.joinedJobLocations = res.data.data.list.map((m) => {
              return {
                ...m,
                jobLocationName: m.jobLocation.name || "",
                city: m.jobLocation.city || "",
                startDate: m.jobLocation.startDate || "",
                endDate: m.jobLocation.endDate || "",
                post: m.jobLocation.post || ""
              }
            })
            this.showJoined = true
          }
        })
        .catch((response) => {
          console.error(response, "error_getJobLocationUsers")
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    search () {
      if (this.requestType === "editUserMode") {
        this.$emit("getUser", this.value.username)
      }
    },
    async loadRoles () {
      try {
        this.showLoading()
        const { data } = await this.$services.security.getGoupList({
          type: "role"
        })
        const getGoupListRes = this.getResponse(data)
        if (getGoupListRes.success) {
          this.hozeFaaliatOptions =
            getGoupListRes?.data?.data?.list.map((item, _index) => {
              return {
                ...item,
                Title: item.name,
                ID: item.NidGroup
              }
            }) ?? []
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
    requestType: {
      handler () {
        this.$emit("changeMode", this.requestType)
        if (this.requestType === "newUserMode") {
          this.$emit("reset")
        }
      },
      deep: true
    },
    value: {
      handler () {
        if (this.value && this.value.NidUser) {
          this.requestType = "editUserMode"
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.btnInRow .q-btn__wrapper {
  padding: 4px 6px;
}
</style>
