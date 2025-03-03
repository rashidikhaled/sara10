<template>
  <div>
    <safa-popup
      title="اعتبارسنجی سامانه شاهکار"
      width="350px"
      height="250px"
      v-model="showEditUserMobile"
      :resizable="false"
      :closable="false"
    >
      <fit class="overFlow">
        <div class="row q-col-gutter-sm q-pa-sm">
          <safa-text
            label="کد ملی"
            label-width="80px"
            v-model="nationalCode"
            cdcName="userIDNumber"
            :validations="['required', 'number', validations.nationalCode]"
            class="col-12"
            m="r"
          />
          <safa-text
            label="شماره موبایل"
            label-width="80px"
            v-model="mobile"
            cdcName="userMobile"
            class="col-12"
            type="number"
            :validations="['required', 'number', validations.mobile]"
          />
          <div class="col-12">
            <safa-notice type="warning" v-show="shahkarError !== ''">
              {{ shahkarError }}
            </safa-notice>
          </div>
        </div>
        <span class="fit" />
        <q-separator />
        <div class="q-gutter-sm q-pa-sm flex items-center">
          <btn-save @click="editUserMobile" />
        </div>
      </fit>
    </safa-popup>

    <safa-popup
      title="اعتبارسنجی سامانه ثبت احوال"
      width="350px"
      height="250px"
      v-model="showEditUserBirthDate"
      :resizable="false"
      :closable="false"
    >
      <fit class="overFlow">
        <div class="row q-col-gutter-sm q-pa-sm">
          <safa-text
            label="کد ملی"
            label-width="80px"
            v-model="nationalCode"
            cdcName="userIDNumber"
            type="number"
            :validations="['required', 'number', validations.nationalCode]"
            class="col-12"
            m="r"
          />
          <safa-datepicker
            label="تاریخ تولد"
            label-width="80px"
            v-model="birthDate"
            cdcName="userBirthDate"
            validations="required"
            class="col-12"
          />
          <div class="col-12">
            <safa-notice type="warning" v-show="civilStatusError !== ''">
              {{ civilStatusError }}
            </safa-notice>
          </div>
        </div>
        <div class="fit"></div>
        <q-separator />
        <div class="q-gutter-sm q-pa-sm flex items-center">
          <btn-save @click="editUserBirthDate" />
        </div>
      </fit>
    </safa-popup>
  </div>
</template>

<script>
import { currentDate } from "src/utils/index"
import Joi from "joi"
import customValidation from "src/utils/customValidation"
export default {
  data () {
    return {
      showEditUserMobile: false,
      showEditUserBirthDate: false,
      nationalCode: "",
      mobile: "",
      birthDate: "",
      shahkarError: "",
      civilStatusError: "",
      validations: {
        nationalCode: customValidation.nationalCode,
        mobile: Joi.string().length(11).required().messages({
          "string.base": `تلفن همراه میبایست به صورت عدد باشد.`,
          "string.length": `تلفن همراه میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        })
      }
    }
  },
  //   async mounted () {
  //     await this.isValidUser()
  //     console.log(this.currentUser, "/////////this.currentUser")
  //   },
  methods: {
    async isValidUser () {
      this.$emit("isValidUserHandler", false)
      const checkNationalCode = await this.checkNationalCode()
      if (!checkNationalCode) {
        this.nationalCode = this.currentUser.IDNumber
        this.mobile = this.currentUser.mobile
        this.showEditUserMobile = true
      } else {
        const civilAuthorityStatus = await this.civilAuthorityStatus()
        if (!civilAuthorityStatus) {
          this.nationalCode = this.currentUser.IDNumber
          this.birthDate = this.currentUser.birthDate
          this.showEditUserBirthDate = true
        }
        if (checkNationalCode && civilAuthorityStatus) {
          this.$emit("isValidUserHandler", true)
        }
      }
    },
    async checkNationalCode () {
      this.shahkarError = ""
      this.civilStatusError = ""
      if (this.currentUser === {}) return
      try {
        const { data } = await this.$services.security.checkNationalCode({
          nationalCode: this.currentUser.IDNumber,
          mobileNo: this.currentUser.mobile
        })
        if (data.success) {
          if (data.data.success) {
            return true
          } else {
            this.shahkarError = `اعتبارسنجی شاهکار: ${data.data.msg}`
            return false
          }
        } else {
          this.showError(data.msg)
          return false
        }
      } catch (e) {
        console.error(e)
      }
    },
    async civilAuthorityStatus () {
      this.shahkarError = ""
      this.civilStatusError = ""
      try {
        const { data } = await this.$services.security.civilAuthorityStatus({
          nationalCode: this.currentUser.IDNumber,
          birthDate: this.currentUser.birthDate ?? currentDate()
        })
        if (data.success) {
          this.$emit("isValidUserHandler", false)
          if (data.data.success) {
            return true
          } else {
            this.civilStatusError = `اعتبارسنجی ثبت احوال: ${data.data.msg}`
            return false
          }
        } else {
          this.showError(data.msg)
          return false
        }
      } catch (e) {
        console.error(e)
      }
    },
    async editUserMobile () {
      await this.editUser("mobile", this.mobile)
      //   const editMobileRes = await this.editUser("mobile", this.mobile);
      //   if (editMobileRes) {
      //     this.showEditUserMobile = false
      //     return this.showSuccess("شماره موبایل کاربر بروزرسانی شد.")
      //   }
    },
    async editUserBirthDate () {
      await this.editUser("birthDate", this.birthDate)
      //   const editBirthDateRes = await this.editUser("birthDate", this.birthDate)
      //   if (editBirthDateRes) {
      //      this.showEditUserBirthDate = false
      //      return this.showSuccess("تاریخ تولد کاربر بروزرسانی شد.")
      //   }
    },
    checkNationalCodeIsValid () {
      const result = customValidation.nationalCode.validate(this.nationalCode)
      return !result.error
    },
    async editUser (type, val) {
      if (!this.isValidForm()) return
      // if (!this.checkNationalCodeIsValid()) {
      //   let m = "خطا در اعتبارسنجی: کد ملی وارد شده معتبر نمیباشد."
      //   this.shahkarError = m
      //   this.civilStatusError = m
      //   return
      // }
      try {
        const e = this.currentUser
        const payload = {
          NidUser: e.NidUser,
          IDNumber: e.IDNumber,
          firstName: e.firstName,
          lastName: e.lastName,
          CI_Nationality: e.CI_Nationality,
          fatherName: e.fatherName,
          birthDate: type === "birthDate" ? val : e.birthDate,
          tel: e.tel,
          mobile: type === "mobile" ? val : e.mobile,
          email: e.email,
          birthPlace: e.birthPlace,
          startActiveDate: e.startActiveDate,
          endActiveDate: e.endActiveDate,
          address: e.address,
          description: e.description,
          enabled: e.enabled,
          isSysAdmin: e.isSysAdmin,
          isSysApp: e.isSysApp,
          isSys3rdParty: e.isSys3rdParty
        }
        const { data } = await this.$services.security.editUserById(payload)
        if (data.success) {
          if (type === "mobile") {
            this.showEditUserMobile = false
            this.showSuccess("شماره موبایل کاربر بروزرسانی شد.")
            await this.civilAuthorityStatus()
          } else {
            this.showSuccess("تاریخ تولد کاربر بروزرسانی شد.")
            this.showEditUserBirthDate = false
          }
          await this.log({
            action: this.logActions.save,
            bizCode: e.NidUser,
            bizCodeTitle: "NidUser"
          })
          this.$emit("logout")
          return true
        } else {
          this.shahkarError = data.msg
          this.civilStatusError = data.msg
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  computed: {
    currentUser () {
      return this.$stSecurity.getters["authorize/loggedUser"] || {}
    }
  }
}
</script>
