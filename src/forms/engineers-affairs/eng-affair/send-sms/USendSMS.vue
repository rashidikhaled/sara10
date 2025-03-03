<template>
  <safa-form
    :id="formKey"
    caption="امور مهندسین ناظر - ارسال پیامک"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical :padding="false">
      <fit>
        <safa-tabs v-model="activeTab" fit>
          <template v-slot:tabs>
            <tab-menu name="smsInfo" label="اطلاعات پیامک" />
            <tab-menu name="engineers" label="مهندسین" />
          </template>
          <tab-content name="smsInfo">
            <SmsInfo
              v-model="smsInfoModel"
              :title="title"
              :formKey="formKey"
              @selectMessage="selectMessage"
            />
          </tab-content>
          <tab-content name="engineers">
            <Engineers
              v-model="engineersModel"
              :title="title"
              :formKey="formKey"
              @selectEngineers="selectEngineers"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <btn-default label="ارسال" @click="sendSmS" />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import SmsInfo from "./partials/SmsInfo.vue"
import Engineers from "./partials/Engineers.vue"
import { currentDate } from "src/utils/index"
export default {
  mixins: [baseFormMixin],
  components: { SmsInfo, Engineers },
  data () {
    return {
      title: "ارسال پیامک",
      formKey: "D8D76453-79B0-4DD7-A913-EE827CFA77D7",
      name: "USendSMS",
      main: true,

      smsInfoModel: {
        CI_SMSSendGroup: 0,
        visitDate: "",
        visitTime: "",
        smsText: ""
      },

      engineersModel: {
        IdentityCode: null,
        EngName: null,
        CI_StudyField: 0,
        CI_University: 0,
        CI_Ability: 0
      },

      activeTab: "smsInfo",
      engineers: [],
      numbers: null,
      text: ""
    }
  },

  methods: {
    selectMessage (val) {
      this.text = val
    },
    selectEngineers (arr) {
      this.engineers = arr
    },
    async sendSmS () {
      if (!this.isValidForm()) return
      if (this.smsInfoModel.smsText === "" && this.text === "") {
        return this.showError("لطفا پیام مورد نظر را انتخاب کنید.")
      }
      if (this.engineers.length > 0) {
        this.numbers = this.engineers
          .filter((y) => y.MobileNo !== null)
          .map((x) => x.MobileNo)
          .toString()
          .replace(/,/g, "#")
      } else {
        return this.showError("شماره ای جهت دریافت پیامک انتخاب نشده است.")
      }
      try {
        this.showLoading()
        const { data } = await this.$services.engineers.sendSMSToAllEng({
          pParam: {
            AppName: "Engineering",
            BizCode: this.selectedRequest
              ? this.selectedRequest.BizCode
              : "ارسال برای مهندس",
            Number: this.numbers,
            SMSType: "ارسال پیامک از منو",
            ScheduleSendDate: currentDate(),
            Text:
              this.smsInfoModel.smsText === ""
                ? this.text
                : this.smsInfoModel.smsText,
            UserID: this.currentUser.NidUser,
            UserName: this.getUserDisplayName(),
            pWhere_IdentityCode: this.engineersModel.IdentityCode,
            pWhere_EngName: this.engineersModel.EngName,
            pWhere_StudyField: this.engineersModel.CI_StudyField,
            pWhere_University: this.engineersModel.CI_University
          }
        })
        const res = this.getResponse(data)
        if (res.success) {
          await this.log({
            action: this.logActions.send,
            bizCode: this.engineersModel.IdentityCode,
            bizCodeTitle: "IdentityCode"
          })
          this.showError("پیامک با موفقیت ارسال شد.")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
