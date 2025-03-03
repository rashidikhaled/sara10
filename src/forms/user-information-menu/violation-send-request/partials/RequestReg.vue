<template>
  <fit>
    <FormRow class="q-my-sm q-pl-sm" :lg="4" :md="3" :xl="4" :sm="2">
      <FormControl>
        <safa-combo
          label="نوع درخواست"
          label-width="120px"
          :options="requestType"
          v-model="value.Request.RequestStatus"
          sourceType="local"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="محل خدمت"
          label-width="120px"
          m="r"
          v-model="value.Request.JobLocationName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام و نام خانوادگی شاکی"
          label-width="120px"
          v-model="value.Request.ComplainantName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="موبایل شاکی"
          label-width="120px"
          v-model="value.Request.ComplainantMobile"
        />
      </FormControl>
              <nosazi-code-input
          label="کد نوسازی"
          label-width="80px"
          m="r"
          v-model="value.Request.JobLocationNosaziCode"
        />
      <div class="flex justify-end">
        <btn-default label="ارسال پیام" @click="showSendMessage = true" />
      </div>
    </FormRow>
    <safa-datatable
      helper="ViolationList"
      height="100%"
      max-height="100%"
      min-height="100%"
      paginate
      fit
      m="e"
      v-model="value.Request.ViolationVoteList"
    />
    <safa-popup v-model="showSendMessage" height="500px" width="600px">
      <form-wrapper>
        <SendMessage
          @searchUser="search"
          :gridModel="Users"
          ref="SendMessageRef"
        />
        <template #footer>
          <btn-default label="ارسال پیامک" class="q-mr-sm" @click="sendSMS" />
          <btn-default label="ارسال پیام به کارتابل" @click="sendSMS" />
        </template>
      </form-wrapper>
    </safa-popup>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import SendMessage from "./SendMessage.vue"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: String,
    jobLocations: {
      type: Array,
      default: () => []
    }
  },
  components: { SendMessage },
  data () {
    return {
      name: "RequestReg",

      showSendMessage: false,
      Users: [],
      requestType: [
        { Id: 0, Title: "ثبت درخواست جدید" },
        { Id: 1, Title: "ثبت درخواست تجدید نظر" }
      ]
    }
  },
  methods: {
    search () {
      this.showLoading()
      //   const jobLcation = this.$stSecurity.getters["authorize/user"].JobLocation;

      let data = {
        NidJobLocation:
          this.value.Request.NidJobLocation ||
          "00000000-0000-0000-0000-000000000000",
        from: 1,
        to: 200,
        search: ""
      }
      this.$services.security
        .getUsersFromJobLocation(data)
        .then(({ data }) => {
          this.result = this.getResponse(data).data
          if (this.result.success) {
            var tmpres =
              this.result.data.list.map((f) => {
                return {
                  UserName: f.username,
                  FirstName: `${f.firstName} ${f.lastName}`,
                  Mobile: f.mobile
                  //   GUID: f.jobLocation.NidJobLocation
                }
              }) || []

            this.Users = tmpres
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
    sendSMS () {
      this.$refs.SendMessageRef.sendSMS()
    }
  }
}
</script>
