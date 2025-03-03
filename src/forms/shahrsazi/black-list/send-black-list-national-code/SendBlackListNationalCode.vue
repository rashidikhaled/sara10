<template>
  <safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper title="ارسال به لیست سیاه با کد ملی" vertical>
      <safa-status :result="sendResult" />
      <fit>
        <FormRow>
          <FormControl>
            <safa-combo
              v-model="selectedContact"
              cdcName="selectedContact"
              :options="contactList"
              :validations="validations.selectedContact"
              label="شخصیت"
              :label-shrink="true"
              required
              source-type="local"
            />
          </FormControl>
        </FormRow>
        <q-seperator class="q-my-sm" />
        <FormRow v-if="!whoShow">
          <FormControl>
            <safa-text
              v-model="firstName"
              label="نام تجاری"
              cdcName="firstName"
              :label-shrink="true"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="lastName"
              label="نام کامل شرکت"
              cdcName="lastName"
              :label-shrink="true"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="nationalCode"
              cdcName="nationalCode"
              :validations="validations.hoghooghiNationalCode"
              label="شناسه ملی"
              :label-shrink="true"
              required
            />
          </FormControl>
          <FormRow class="q-mt-sm">
            <FormControl>
              <safa-combo
                v-model="entryCause"
                cdcName="entryCause"
                ciName="CI_BlackListCause"
                domainName="CI_SaraM1"
                label="علت ورود"
                :label-shrink="true"
              />
            </FormControl>
            <FormControl>
              <safa-combo-enum
                v-model="selectedStatus"
                cdcName="selectedStatus"
                enum-name="EumBlackListControl"
                label="نوع کنترل"
                :label-shrink="true"
            /></FormControl>
          </FormRow>

          <text-template
            v-model="comments"
            cdcName="comments"
            formKey="21872E3E-939D-4CBE-AC1E-9799C207EF78"
            label="توضیحات"
            :label-shrink="true"
          />
        </FormRow>
        <FormRow v-if="whoShow">
          <FormControl>
            <safa-text
              v-model="firstName"
              label="نام"
              cdcName="firstName"
              :label-shrink="true"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="lastName"
              label="نام خانوادگی"
              cdcName="lastName"
              :label-shrink="true"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="nationalCode"
              cdcName="nationalCode"
              :validations="validations.NationalCode"
              :label="labelshow"
              :label-shrink="true"
              required
            />
          </FormControl>
          <FormRow class="q-mt-sm">
            <FormControl>
              <safa-combo
                v-model="entryCause"
                cdcName="entryCause"
                ciName="CI_BlackListCause"
                domainName="CI_SaraM1"
                label="علت ورود"
                :label-shrink="true"
              />
            </FormControl>
            <FormControl>
              <safa-combo-enum
                v-model="selectedStatus"
                cdcName="selectedStatus"
                enum-name="EumBlackListControl"
                label="نوع کنترل"
                :label-shrink="true"
            /></FormControl>
          </FormRow>

          <text-template
            v-model="comments"
            cdcName="comments"
            formKey="21872E3E-939D-4CBE-AC1E-9799C207EF78"
            label="توضیحات"
            :label-shrink="true"
          />
        </FormRow>
      </fit>

      <template v-slot:footer>
        <btn-default label="ارسال" @click="accept" />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  route: "/black-list/SendBlackListNationalCode",
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: "ارسال به لیست سیاه با کد ملی",
      formKey: "21872E3E-939D-4CBE-AC1E-9799C207EF78",
      name: "SendBlackListNationalCode",
      main: true,
      sidebarCompatible: true,
      selectedStatus: 0,
      entryCause: 0,
      comments: "",
      firstName: "",
      lastName: "",
      nationalCode: "",
      sendResult: null,
      sendResults: {},
      contactList: [
        { ID: 1, Title: "حقیقی" },
        { ID: 2, Title: "حقوقی" },
        { ID: 3, Title: "اتباع خارجی" }
      ],
      whoShow: true,
      labelshow: "کد ملی",
      selectedContact: 1,
      selectedContactValidation: null,
      validations: {
        selectedContact: Joi.number().required().messages({
          "number.base": `اطلاعاتی وارد نشده است.`,
          "any.required": `این  فیلد اجباری میباشد.`
        }),
        NationalCode: Joi.string().length(10).required().messages({
          "string.base": `کد ملی میبایست به صورت عدد باشد.`,
          "string.length": `کد ملی میبایست 10 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        atbaeNationalCode: Joi.string().length(12).required().messages({
          "string.base": `کد اتباع میبایست به صورت عدد باشد.`,
          "string.length": `کد ملی اتباع میبایست 12 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        hoghooghiNationalCode: Joi.string().length(12).required().messages({
          "string.base": `شناسه ملی میبایست به صورت عدد باشد.`,
          "string.length": `شناسه ملی میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        })
      }
    }
  },
  watch: {
    selectedContact () {
      if (this.selectedContact === 1) {
        this.selectedContactValidation = this.validations.NationalCode
        this.whoShow = true
      } else if (this.selectedContact === 3) {
        this.selectedContactValidation = this.validations.atbaeNationalCode
        this.whoShow = true
        this.labelshow = "کد اتباع"
      } else {
        this.selectedContactValidation = this.validations.hoghooghiNationalCode
        this.whoShow = false
      }
    }
  },
  methods: {
    sendToBlackList () {
      if (!this.isValidForm()) return
      let payload = {
        pBlackListOwner: {
          CI_BlackListCause: this.entryCause,
          Domain: "Sara8",
          EnterComments: this.comments,
          EnterDate: "",
          EnterTime: "",
          EumBlackListControl: this.selectedStatus,
          EumBlackListStatus: 0,
          EumOwnerCharacter: this.selectedContact,
          ExitComments: "",
          ExitDate: "",
          ExitTime: "",
          NidBlack: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidUserEnter: this.getNidUser(),
          NidUserExit: "00000000-0000-0000-0000-000000000000",
          UserEnter: this.getUserDisplayName(),
          UserExit: "",
          FirstName: this.firstName,
          LastName: this.lastName,
          NationalCode: this.nationalCode
        }
      }
      this.$services.SA.sendToBlackListWithNationalCode(payload, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async ({ data }) => {
          this.sendResult = this.getResponse(data)
          if (this.sendResult.success) {
            this.sendResults = this.sendResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.nationalCode,
              bizCodeTitle: "کد نوسازی"
            })
            if (this.whoShow) {
              this.showSuccess(
                "شخصیت حقیقی از طریق کد ملی با موفقیت به لیست سیاه افزوده شد."
              )
            } else {
              this.showSuccess(
                " شخصیت حقوقی از طریق شناسه ملی با موفقیت به لیست سیاه افزوده شد."
              )
            }
          }
        })
        .catch((response) => {
          this.sendResult = this.getResponse(response)
          this.showError(response.data.response[0].ErrorTitel, 11111)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    accept () {
      this.sendToBlackList()
    }
  }
}
</script>
