<template>
  <safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="sendToUserBlackListRes" />
        <safa-status :result="getUsersFromJobLocationRes" />
        <safa-status :result="userListRes" />
        <safa-status :result="workFlowLists" />
      </template>
      <div class="row q-col-gutter-sm q-mb-sm">
        <safa-text
          label="نام کاربری / نام خانوادگی"
          v-model="userNameOrLastname"
          cdcName="userNameOrLastname"
          class="col-3"
          @keyup.enter="search"
        >
          <template v-slot:append>
            <q-icon
              style="position: relative; right: 5px"
              size="xs"
              color="primary"
              @click="search"
              name="search"
              class="cursor-pointer"
            />
          </template>
        </safa-text>
      </div>
      <safa-splitter v-model="gridsplitter" style="min-height: 250px" vertical>
        <template #before>
          <fit>
            <safa-grid
              v-model="users"
              title="لیست سیاه ثبت درخواست"
              cdcName="sendBlackListRequest"
              helper="agSendBlackListRequest"
              fit
              m="r"
              :suppressRowClickSelection="false"
              paginate
              :pageSize="20"
              @row:click="rowClick"
            />
          </fit>
        </template>
        <template #after>
          <fit>
            <safa-datatable
              title="درخواست های مجاز"
              v-model="shNewWorkflowList"
              helper="shNewWorkflowListColumns"
              cdcName="shNewWorkflowListColumns"
              fit
              m="r"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              max-height="100%"
              height="100%"
              min-height="100px"
              ref="WorkflowListRef"
              paginate
              :pageSize="20"
            />
          </fit>
        </template>
      </safa-splitter>

      <FormRow class="q-mt-sm">
        <FormControl>
          <safa-datepicker
            label="تاریخ شروع"
            label-width="60px"
            v-model="startDate"
            cdcName="startDate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ پایان"
            label-width="60px"
            v-model="endDate"
            cdcName="endDate"
          />
        </FormControl>
        <text-template
          label="توضیحات"
          label-width="60px"
          v-model="comments"
          cdcName="comments"
          :formKey="formKey"
          class="col-12"
          :rows="2"
        />
      </FormRow>

      <template v-slot:footer>
        <btn-default label="ارسال به لیست سیاه" @click="sendToBlackList" />
      </template>
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
      title: "ارسال به لیست سیاه ثبت درخواست",
      formKey: "5C94C341-61FC-4674-AF03-13C74E959E8D",
      name: "SendBlackListRequestsubmission",
      main: true,
      sidebarCompatible: true,

      getUsersFromJobLocationRes: null,
      userListRes: null,
      users: [],
      comments: "",
      endDate: "",
      startDate: currentDate(),
      userNameOrLastname: "",
      selectedItem: null,
      sendToUserBlackListRes: null,
      workFlowLists: null,
      gridsplitter: 50,
      shNewWorkflowList: []
    }
  },

  methods: {
    search () {
      this.showLoading()
      this.$services.security
        .userList({
          from: 1,
          to: 100,
          search: this.userNameOrLastname
        })
        .then(async ({ data }) => {
          this.userListRes = this.getResponse(data)
          if (this.userListRes.success) {
            const list = this.userListRes?.data?.data?.list ?? []
            this.users = list.map((m) => {
              return {
                ...m,
                jobLocationName: m.jobLocation?.name ?? ""
              }
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadObj () {
      const payload = {}
      this.showLoading()
      this.$services.SA.LoadNeworkflowList(payload)
        .then(({ data }) => {
          this.workFlowList = this.getResponse(data)
          if (this.workFlowList.success) {
            this.shNewWorkflowList =
              this.workFlowList.data.Sh_NewWorkflowList ?? []
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    rowClick ({ data }) {
      this.selectedItem = data
    },
    async sendToBlackList () {
      if (this.selectedItem === null) {
        return this.showError("لطفا یکی از کاربران را انتخاب کنید.")
      }
      let obj = this.selectedItem
      let workflowList = []
      workflowList = this.$refs.WorkflowListRef.selectedRows
      try {
        let payLoad = {
          pBlackListOwner: {
            BlackNiduser: obj.NidUser,
            BlackUserName: obj.username,
            StartDate: this.startDate,
            EndDate: this.endDate,
            EnterComments: this.comments,
            EumBlackListControl: 1,
            EumBlackListStatus: 0,
            JobLocation: obj.jobLocation && obj.jobLocation.NidJobLocation,
            JobLocationName: obj.jobLocation && obj.jobLocation.name,
            NidUserBlackList: "00000000-0000-0000-0000-000000000000",
            NidUserEnter: this.getNidUser(),
            UserEnter: this.getUserDisplayName()
          },
          pBlackWorkflowExemption: workflowList
        }
        this.showLoading()
        const { data } = await this.$services.SA.sendToUserBlackList(payLoad)
        this.sendToUserBlackListRes = this.getResponse(data)
        if (this.sendToUserBlackListRes.success) {
          if (
            Array.isArray(this.sendToUserBlackListRes.data.BizErrors) &&
            this.sendToUserBlackListRes.data.BizErrors.length === 0
          ) {
            this.showSuccess("ارسال به لیست سیاه با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: obj.GUID,
              bizCodeTitle: "nidUser",
              saveDesc: `کاربر با نام کاربری ${obj.username} به لیست سیاه منتقل شد.`
            })
            await this.sendSMS()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async sendSMS () {
      try {
        const payLoad = {
          pParameter: {
            // Text: "کاربر محترم با توجه به ورود نام کاربری شما به لیست سیاه، اجازه ثبت درخواست ندارید جهت پیگیری با واحد نظارت بر دفاتر تماس حاصل فرمایید ",
            // Text: `کاربر محترم، شناسه کاربری شما بدلیل ${this.comments} وارد لیست سیاه ثبت درخواست گردیده و اجازه ثبت درخواست ندارید.`,
            Text: `کاربر محترم، شناسه کاربری شما بدلیل ${this.comments} وارد لیست سیاه ثبت درخواست گردیده و اجازه ثبت درخواست ندارید.
(امور نظارت بر ارائه دهندگان خدمات شهرسازی)`,
            Number: this.selectedItem.mobile,
            AppName: "sara10",
            BizCode: this.selectedItem.NidUser,
            SMSType: "ارسال پیامک لیست سیاه کاربران",
            ScheduleSendDate: currentDate(),
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        await this.$services.sendSMS.SendSMS(payLoad)
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    }
  },

  mounted () {
    this.search()
    this.loadObj()
  }
}
</script>
