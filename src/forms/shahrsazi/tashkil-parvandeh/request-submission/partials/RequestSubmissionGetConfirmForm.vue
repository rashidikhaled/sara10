<template>
  <fit>
    <FormRow class="q-mb-sm q-pa-sm fit">
      <FormControl>
        <safa-text
          label="شماره همراه"
          m="r"
          v-model="cellPhone"
          cdcName="cellPhone"
          label-width="70px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد تأیید"
          v-model="confirmCode"
          label-width="70px"
          cdcName="confirmCode"
        />
      </FormControl>
    </FormRow>

    <div class="q-gutter-sm q-pa-sm">
      <btn-default label="ارسال کد" @click="sendCode" />
      <btn-default label="تأیید" :disable="disableConfirmCode" />
      <btn-default label="انصراف" @click="cancel" />
    </div>
    <div v-if="getConfirmCode" class="row q-my-sm">
      زمان باقیمانده {{ countDown }} ثانیه
    </div>
  </fit>
</template>

<script>
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import PersianDate from "persian-date"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    cellPhone: String,
    baseNosaziCode: Object
  },
  data () {
    return {
      confirmCode: "",
      disableConfirmCode: true,
      result: {},
      requestResult: null,
      countDown: 120,
      getConfirmCode: false,
      randomCode: null
    }
  },

  methods: {
    cancel () {
      this.$emit("reloadForm")
    },

    sendCode () {
      this.showLoading()
      let self = this
      this.randomCode = Math.floor(Math.random() * 9999 + 1)
      let payload = {
        pParameter: {
          AppName: "Sara8",
          BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
          Number: this.cellPhone,
          SMSType: "ارسال کد تایید برای ثبت درخواست",
          ScheduleSendDate: new PersianDate()
            .toLocale("en")
            .toCalendar("persian")
            .format("L"),
          Text: "کد تایید جهت ثبت درخواست :" + this.randomCode,
          UserID: this.getNidUser(),
          UserName: this.getUserDisplayName()
        }
      }

      this.$services.sendSMS
        .sendSMSForRequestSubmission(payload)
        .then(async ({ data }) => {
          self.requestResult = this.getResponse(data)
          if (self.requestResult.success) {
            self.result = self.requestResult.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode
            })
            this.disableConfirmCode = false
            this.getConfirmCode = true
            this.countDownTimer()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    accept () {
      if (this.showConfirmCode !== this.randomCode) {
        this.showError("عدم تطابق کد وارد شده با کد ارسال شده")
      } else {
        this.$emit("completeSubmission")
      }
    },

    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else if (this.countDown === 0) {
        this.showWarning(
          "زمان ورود کد تأیید به پایان رسید لطفا مجددا امتحان کنید."
        )
        this.getConfirmCode = false
        this.disableConfirmCode = true
      }
    }
  }
}
</script>
