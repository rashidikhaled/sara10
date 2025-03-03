<template>
  <FormWrapper>
    <safa-status :result="loadObjRes" />
    <safa-status :result="sendSmsRes" />
    <safa-status :result="sendMessageRes" />
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="جستجوی کاربر"
            label-width="80px"
            v-model="user"
            cdcName="user"
            @keypress.enter="loadObj"
          >
            <template v-slot:append>
              <q-icon
                name="search"
                title=""
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                class="cursor-pointer"
                @click="loadObj"
              />
            </template>
          </safa-text>
        </FormControl>
      </FormRow>
      <safa-grid
        v-model="usersList"
        :columns="columns"
        fit
        m="r"
        @row:click="selectedChange"
        paginate
      />
    </fit>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-default
          label="ارسال پیامک"
          @click="sendSMS"
          :disable="!selectJoindUser"
        />

        <btn-default
          label="ارسال پیام به کارتابل"
          @click="sendSMSToKartable"
          :disable="!selectJoindUser"
        />
      </div>
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  props: {
    request: {
      type: Object,
      default: () => {}
    },
    StrCode: String,
    NidProc: String,
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      loadObjRes: null,
      sendSmsRes: null,
      sendMessageRes: null,
      selectJoindUser: null,
      usersList: [],
      user: "",
      columns: [
        {
          field: "firstName",
          title: "نام",
          width: "130px"
        },
        {
          field: "lastName",
          title: "نام خانوادگی",
          width: "130px"
        },
        {
          field: "username",
          title: "نام کاربری",
          width: "auto"
        }
      ]
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.security.getUsersFromJobLocation({
          NidJobLocation: this.request.NidJobLocation,
          search: this.user
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.usersList = this.loadObjRes.data?.data?.list ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    selectedChange ({ data }) {
      this.selectJoindUser = data ?? null
    },

    async sendSMS () {
      try {
        let a = `${this.selectJoindUser.UserName}(${
          this.selectJoindUser.FirstName + " " + this.selectJoindUser.LastName
        })`
        let b = this.request.JobLocationName
        let c = this.StrCode
        let d = this.request.NidWordItem
        let e = ""
        let f = ""
        const txt1 = `
جناب آقای ${a}
مدیرمسئول محترم دفتر / شرکت ${b}
باسلام ،
نظر به اینکه مقرر است موضوع تخلف احتمالی دفتر / شرکت جنابعالی درخصوص ملک با کدنوسازی ${c} به شماره ارجاع ${d} درکارگروه سه نفره منطقه ${e} مطرح گردد لذا ضروریست دفاعیه خود را حداکثر ظرف مدت 3 روز کاری به بازرس محترم منطقه ارائه فرمائید. در غیر این صورت موضوع در جلسه مطرح و راساً تصمیم گیری خواهد شد و تبعات احتمالی آن بر عهده جنابعالی می باشد. شماره ثبت درخواست : ${f}`

        const txt2 = `
مدیرمسئول محترم دفتر / شرکت ${a} کارشناس بازدید محترم ${b}
باسلام ،
نظر به اینکه مقرر است موضوع تخلف احتمالی جنابعالی درخصوص ملک با کدنوسازی ${c} به شماره ارجاع ${d} درکمیته نظارت بر دفاتر مطرح گردد لذا ضروریست دفاعیه خود را حداکثر ظرف مدت 3 روز کاری به بازرس محترم منطقه یا واحد نظارت بر دفاتر ارسال نمایید. در غیر این صورت موضوع در جلسه مطرح و راساً تصمیم گیری خواهد شد.و تبعات احتمالی آن بر عهده جنابعالی می باشد.`

        const Text = `
          ${txt1}
          \n
          \n
          ${txt2}
        `
        // alert(Text)
        const payLoad = {
          pParameter: {
            AppName: "PersonalResource",
            BizCode: this.request.NidProc,
            Number: this.selectJoindUser.mobile,
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName(),
            Text,
            ScheduleSendDate: currentDate(),
            SMSType: "تخلفات دفاتر"
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        this.sendSmsRes = this.getResponse(data)
        if (this.sendSmsRes.success)
        { this.showSuccess("پیامک با موفقیت ارسال شد.") }
      } catch (e) {
        this.serverError()
        console.log(e)
      }
    },

    async sendSMSToKartable () {
      let a = `${this.selectJoindUser.UserName}(${
        this.selectJoindUser.FirstName + " " + this.selectJoindUser.LastName
      })`
      let b = this.request.JobLocationName
      let c = this.StrCode
      let d = this.request.NidWordItem
      const TextMessage = `
مدیرمسئول محترم دفتر / شرکت ${a} کارشناس بازدید محترم ${b}
باسلام ،
نظر به اینکه مقرر است موضوع تخلف احتمالی جنابعالی درخصوص ملک با کدنوسازی ${c} به شماره ارجاع ${d} درکمیته نظارت بر دفاتر مطرح گردد لذا ضروریست دفاعیه خود را حداکثر ظرف مدت 3 روز کاری به بازرس محترم منطقه یا واحد نظارت بر دفاتر ارسال نمایید. در غیر این صورت موضوع در جلسه مطرح و راساً تصمیم گیری خواهد شد.و تبعات احتمالی آن بر عهده جنابعالی می باشد.
`
      // alert(TextMessage)
      try {
        const payLoad = {
          pParameter: {
            From: this.getNidUser(),
            To: this.selectJoindUser.NidUser,
            MessagesBody: {
              Subject: "تخلفات دفاتر",
              TextMessage
            }
          }
        }
        const { data } = await this.$services.sendSMS.SendMessage(payLoad)
        this.sendMessageRes = this.getResponse(data)
        if (this.sendMessageRes.success)
        { this.showSuccess("پیام با موفقیت ارسال شد.") }
      } catch (e) {
        this.serverError()
        console.log(e)
      }
    }
  }
}
</script>
