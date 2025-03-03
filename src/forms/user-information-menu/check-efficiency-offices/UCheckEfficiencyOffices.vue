<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77"
  >
  <FormWrapper :title="title" :padding="false">
    <safa-status :result="getViolationRequestRes" />
    <safa-status :result="getOldViolationVoteByJobRes" />
    <safa-status :result="creInsRes" />
    <safa-status :result="deleteResult" />
    <fit>
      <safa-tabs fit v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu
            label="ثبت درخواست"
            name="submitRequest"
            @click="submitRequestTabHandler"
          />
          <tab-menu label="آرشیو" name="archive" />
          <tab-menu
            label="آرای قبلی دفاتر"
            name="officesLastVotes"
            v-if="nidJobLocation !== 0"
          />
        </template>
        <tab-content name="submitRequest">
          <SubmitRequest
            v-model="model.officeObj.Request"
            :requestTypeOptions="requestTypeOptions"
            @selectedJobLocation="selectedJobLocation"
            ref="submitRequest"
          />
        </tab-content>
        <tab-content name="archive">
          <ArchiveWrap
            :name="archiveConfig.username"
            :pass="archiveConfig.password"
          />
        </tab-content>
        <tab-content
          name="officesLastVotes"
          v-if="nidJobLocation !== 0"
          :padding="false"
        >
          <fit>
            <safa-grid
              title="آرای قبلی دفاتر"
              v-model="violationVoteListOld"
              cdcName="violationVoteListOld"
              :columns="violationVoteListOldColumns"
              fit
              m="r"
              paginate
            />
          </fit>
        </tab-content>
      </safa-tabs>
    </fit>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-save label="ثبت درخواست" @click="btnCreateClick" />
        <btn-default
          label="ارسال پیام"
          @click="onOpenMessageForm"
          :disable="nidJobLocation !== 0 && loadFromMenu"
        />
      </div>
    </template>

    <safa-popup v-model="showMessageModal" title="ارسال پیام">
      <send-message
        :StrCode="selectedReq.BizCode"
        :NidProc="selectedReq.NidProc"
        :request="model.officeObj.Request"
        :jobLocationName="model.officeObj.Request.JobLocationName"
        :name="name"
        :title="title"
        :formKey="formKey"
      />
    </safa-popup>
  </FormWrapper>
  </safa-form>
</template>

<script>
// import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"
import SubmitRequest from "./partials/SubmitRequest.vue"
import SendMessage from "./partials/SendMessage.vue"
import { currentDate } from "src/utils"

const defaultModel = {
  Request: {
    CI_Violation: null,
    ComplainantMobile: "",
    ComplainantName: "",
    Date: null,
    DateFrom: null,
    DateTo: null,
    DateVote: null,
    DateVoteFrom: null,
    DateVoteTo: null,
    Description: "",
    JobLocationName: "",
    JobLocationNosaziCode: "0-0-0-0-0-0-0",
    Monitoring: null,
    NidJobLocation: "00000000-0000-0000-0000-000000000000",
    NidProc: "00000000-0000-0000-0000-000000000000",
    NidRequest: null,
    NidWordItem: "",
    RequestStatus: "0",
    RequestType: "",
    Time: null,
    ViolationVoteList: []
  },
  Violation: {},
  ViolationVoteListOld: [],
  ViolationVoteUserListOld: null
}

export default {
  mixins: [baseFormMixin],
  components: { SubmitRequest, SendMessage },

  data () {
    return {
      name: "UCheckEfficiencyOffices",
      title: "بررسی عملکرد دفاتر",
      formKey: 'B65FE692-36EA-0001-0026-66B8EB0E9E77',
      main: true,

      // #region services
      getOldViolationVoteByJobRes: null,
      getViolationRequestRes: null,
      deleteResult: null,
      creInsRes: null,
      // #endregion

      // #region variables
      requestTypeOptions: [],
      violationVoteListOld: [],
      jobLocation: null,
      showMessageModal: false,
      activeTab: "submitRequest",
      model: { officeObj: { ...defaultModel } },
      nidJobLocation: 0,
      selectedReq: {
        NidWordItem: "",
        BizCode: "",
        NidProc: ""
      },

      violationVoteListOldColumns: [
        { field: "NidWorkItem", title: "شماره درخواست", width: "120px" },
        {
          field: "CI_Violation",
          title: "عنوان تخلف",
          editor: "combo",
          domain: "Analysis",
          width: "150px"
        },
        { field: "Description", title: "توضیحات", width: "300px" },
        { field: "UserNameOffending", title: " کاربر متخلف", width: "200px" },
        {
          field: "CI_VoteMain",
          title: " رای اصلی/فرعی",
          editor: "combo",
          domain: "Analysis",
          width: "150px"
        },
        { field: "ViolationCount", title: "تعداد تخلف", width: "100px" },
        { field: "Date", title: "تاریخ صدور رای", width: "100px" },
        { field: "DescriptionVote", title: " شرح رای", width: "auto" }
      ],
      loadFromMenu: false, // opened from gardeshkar or nots
      procInfo: null
      // #endregion
    }
  },
  created () {
    if (this.selectedRequest) this.selectedReq = this.selectedRequest
    this.LoadComboRFequest()
  },
  mounted () {
    this.loadFromMenu = this.taskInfo ? !1 : !0
    // this.loadFromMenu = this.taskInfo ? !0 : !1 // for local test by pNidProc: "7f1f8596-07cd-461c-80e8-6c6e3fb178e0"
    if (!this.loadFromMenu) {
      this.getViolationRequest()
    }
  },
  methods: {
    async getViolationRequest () {
      this.nidJobLocation = 0
      try {
        this.showLoading()
        const { data } = await this.$services.SJ.getViolationRequest({
          pNidProc: this.selectedRequest.NidProc // "7f1f8596-07cd-461c-80e8-6c6e3fb178e0" //
        })
        this.getViolationRequestRes = this.getResponse(data)
        if (this.getViolationRequestRes.success) {
          this.model.officeObj = this.getViolationRequestRes.data
          this.nidJobLocation = this.model.officeObj.Request.NidJobLocation
          setTimeout(() => {
            this.$refs.submitRequest.changeNidRequestHandler()
          }, 1000)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async btnCreateClick () {
      if (!this.isValidForm()) return
      const req = this.model.officeObj.Request
      if (req.NidRequest === null || req.NidRequest === "") {
        this.showError("لطفا نوع درخواست را انتخاب نمایید.")
        return
      }
      if (req.JobLocationName === null || req.JobLocationName === "") {
        this.showError("لطفا محل خدمت را انتخاب نمایید.")
        return
      }
      if (req.ViolationVoteList.length === 0) {
        this.showError("لطفا یک تخلف انتخاب نمایید.")
        return
      }
      if (
        req.ViolationVoteList.some(
          (f) => f.CI_Violation === null || f.CI_Violation === ""
        )
      ) {
        this.showError("لطفا عنوان تخلف را وارد نمایید..")
        return
      }

      if (this.loadFromMenu) {
        this.addRequest()
      } else {
        this.showLoading()
        this.saveRequest()
        this.hideLoading()
      }
    },
    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        if (this.loadFromMenu) {
          this.model.officeObj.Request = {
            ...this.model.officeObj.Request,
            CI_Violation: null,
            Date: this.procInfo.StartDate,
            DateFrom: this.procInfo.BizCode,
            DateTo: null,
            DateVote: null,
            DateVoteFrom: null,
            DateVoteTo: null,
            JobLocationNosaziCode: this.procInfo.BizCode,
            NidProc: this.procInfo.NidProc,
            NidWordItem: this.procInfo.NidWorkItem,
            RequestStatus: "0",
            Time: this.procInfo.ProcStatus
          }
        }
        try {
          this.model.officeObj.Request.ViolationVoteList.forEach(
            (f) => (f.NidRequest = this.model.officeObj.Request.NidRequest)
          )
          this.model.officeObj.Request.RequestType = this.cmbRequest.Title
          this.model.officeObj.Request.Description =
            this.model.officeObj.Request.Description +
            (this.model.officeObj.Request.JobLocationName !== null
              ? this.model.officeObj.Request.JobLocationName + " | "
              : "")

          const { data } = await this.$services.SJ.saveViolationRequest({
            pClsViolation: {
              ...this.model.officeObj,
              ViolationVoteListOld: this.violationVoteListOld
            }
          })
          this.saveViolationRequestRes = this.getResponse(data)
          if (this.saveViolationRequestRes.success) {
            const res = this.saveViolationRequestRes.data
            if (res.status === 200 && res.success) {
              this.model.officeObj = this.saveViolationRequestRes.data
              this.showSuccess(
                `عملیات با موفقیت انجام گردید. شماره پیگیری ${
                  this.model.officeObj?.Request?.NidWordItem ?? ""
                } می باشد.`
              )
              await this.log({
                action: this.logActions.save,
                bizCode: this.model.officeObj?.Request?.NidRequest,
                bizCodeTitle: "NidRequest",
                nidWorkItem: this.model.officeObj?.Request?.NidWordItem,
                saveDesc: `عملیات ثبت درخواست بررسی عملکرد دفاتر انجام گردید. شماره پیگیری ${
                  this.model.officeObj?.Request?.NidWordItem ?? ""
                } می باشد.`
              })
              await this.sendSMS()
            }
            return resolve()
          }
        } catch (e) {
          console.error("saveViolationRequest Error", e)
          return reject(e)
        }
      })
    },
    async addRequest () {
      try {
        this.showLoading()
        console.log("addWorkItem")
        await this.addWorkItem()
        console.log("saveRequest")
        await this.saveRequest()

        await this.log({
          action: this.logActions.save,
          bizCode: this.procInfo.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.procInfo.BizCode,
          nidWorkItem: this.procInfo.NidWorkItem,
          saveDesc: `عملیات ثبت درخواست بررسی عملکرد دفاتر در شهرسازی با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        })

        this.showSuccess(
          `درخواست شماره ${this.procInfo.NidWorkItem} جهت بررسی عملکرد دفاتر در شهرسازی با موفقیت ثبت گردید.`
        ).onDismiss(() => {
          this.hideLoading()
          this.redirectToKartable()
        })
      } catch (e) {
        console.error("@@@@@addRequest Error", e)
        await this.deleteRequest()
        await this.deleteProc()
        this.showError(
          "متاسفانه عملیات ثبت درخواست بررسی عملکرد دفاتر در شهرسازی متوقف شد."
        )
        this.hideLoading()
      } finally {
        this.hideLoading()
      }
    },
    async addWorkItem () {
      if (!this.isValidForm()) return
      return new Promise(async (resolve, reject) => {
        try {
          // const requestTypeTitle = this.requestTypeOptions.find(
          //   (f) => f.ID === this.model.officeObj.Request.NidRequest
          // ).Title
          this.procInfo = null
          const payload = {
            BizCode:
              this.model.officeObj.Request.JobLocationNosaziCode === ""
                ? "0-0-0-0-0-0-0"
                : this.model.officeObj.Request.JobLocationNosaziCode,
            EumOwnerType: 0,
            NidWorkflowDeff: this.model.officeObj.Request.NidRequest, // Violation_NidWorkflowDeff: '7f1b13ea-8598-4535-979a-a1044c4463a7',
            ProcInitiator: this.getNidUser(),
            ProcRequester: this.model.officeObj.Request.ComplainantName,
            ProcInitiatorName: this.getUserDisplayName(),
            ProcArea: "اطلاعات کاربر",
            GroupName: "تخلفات دفاتر",
            GroupTitel: "تخلفات دفاتر",
            Domain: 0,
            IsSara10Request: true
          }
          const { data } = await this.$srvWorkflow.createInstance(payload)
          this.creInsRes = this.getResponse(data)
          if (this.creInsRes.success) {
            const res = this.creInsRes.data
            if (res.status === 200 && res.success) {
              this.procInfo = res.data.ProcInfo
              return resolve()
            }
          }
        } catch (e) {
          this.hideLoading()
          console.error(e)
          return reject(e)
        }
      })
    },
    async deleteRequest () {
      try {
        const { data } = await this.$services.SC.deleteRequest(
          { pNidProc: this.procInfo.NidProc },
          this.config
        )
        this.deleteResult = this.getResponse(data)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async deleteProc () {
      try {
        const { data } = await this.$srvWorkflow.deleteProc(
          { NidProc: this.procInfo.NidProc },
          this.config
        )
        if (!data.success) {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async sendSMS () {
      try {
        const payLoad = {
          pParameter: {
            Text: `کاربر گرامی درخواست شما به شماره  ${[
              this.procInfo.NidWorkItem
            ]} ثبت گردید`,
            Number: this.model.officeObj.Request.ComplainantMobile,
            AppName: "Monitoring",
            BizCode: this.procInfo.BizCode,
            SMSType: "ارسال پیامک ثبت درخواست کاربر جدید",
            ScheduleSendDate: currentDate(),
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        const res = this.getResponse(data)
        if (res.success) this.showSuccess("پیامک با موفقیت ارسال شد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    exitHandler () {
      this.hideSidebar(this.name)
      this.redirectToKartable()
    },
    async getOldViolationVoteByJob (pNidJobLocation) {
      try {
        this.showLoading()
        const { data } = await this.$services.SJ.getOldViolationVoteByJob({
          pNidJobLocation
        })
        this.getOldViolationVoteByJobRes = this.getResponse(data)
        if (this.getOldViolationVoteByJobRes.success) {
          this.violationVoteListOld =
            this.getOldViolationVoteByJobRes?.data?.ViolationVoteListOld ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    selectedJobLocation (job) {
      this.model.officeObj.Request.JobLocationName = job.name
      this.model.officeObj.Request.NidJobLocation = job.NidJobLocation
      this.nidJobLocation = job.NidJobLocation
    },
    onOpenMessageForm () {
      if (this.model.officeObj.Request.JobLocationName !== "") {
        this.showMessageModal = true
      } else {
        this.showError("لطفا ابتدا محل خدمت را انتخاب نمایید.")
      }
    },
    LoadComboRFequest () {
      let obj =
        window.getConfigValue("esupParams")?.PersonelResource_NidWorkflowDeff ??
        null
      if (obj) {
        this.requestTypeOptions = [
          {
            ID: obj.Violation_NidWorkflowDeff ?? "1111", // "df47aeda-9f79-4fcc-82c8-a0391b6388af"
            Title: "ثبت درخواست جدید"
          },
          {
            ID: obj.Violation_NidWorkflowDeffReview ?? "2222",
            Title: "ثبت درخواست تجدید نظر",
            Type: "Review"
          }
        ]
      } else {
        this.showError(
          "کلید گردشکار تعریف نشده است . به راهبر سیستم اطلاع دهید"
        ) // Violation_NidWorkflowDeff
      }
    },
    submitRequestTabHandler () {
      if (this.activeTab !== "submitRequest") {
        if (!this.loadFromMenu) {
          this.nidJobLocation = 0
          this.model = { officeObj: { ...defaultModel } }
          this.getViolationRequest()
        }
      }
    }
  },
  watch: {
    nidJobLocation: {
      handler () {
        if (!this.nidJobLocation) return
        if (this.nidJobLocation === 0) {
          this.model.officeObj.Request.ViolationVoteList = []
          return
        }
        this.getOldViolationVoteByJob(this.nidJobLocation)
      },
      immediate: true
    }
  },
  computed: {
    cmbRequest () {
      if (!this.model.officeObj.Request.NidRequest) return {}
      const obj = this.requestTypeOptions.find(
        (f) => f.ID === this.model.officeObj.Request.NidRequest
      )
      return obj
    },
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore")
    }
  }
}
</script>
