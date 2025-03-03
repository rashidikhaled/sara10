<template>
  <safa-form
    appId="0F9623AC-4BC7-42AD-A8E6-52A72187C6B5"
    caption='گردش کار -تغییر گروهی کاربر ایجاد کننده درخواست'
    :id="formKey"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getWorkflowInstanceListRes" />
        <safa-status :result="saveConvertRequestRes" />
        <safa-status :result="searchShUserBlackListRes" />
        <safa-status :result="workItemRes" />
      </template>

      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              v-model="fromUser.username"
              cdcName="username"
              label="کاربر انتقال دهنده"
              label-width="90px"
              m="r"
              validations="required"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  color="primary"
                  name="search"
                  size="xs"
                  style="position: relative; right: 5px"
                  title="جستجوی کاربر انتقال دهنده"
                  @click="searchUserHandler('from')"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              v-model="toUser.username"
              cdcName="username"
              label="کاربر منتقل شونده"
              label-width="90px"
              m="r"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  color="primary"
                  name="search"
                  size="xs"
                  style="position: relative; right: 5px"
                  title="جستجوی کاربر منتقل شونده"
                  @click="searchUserHandler('to')"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="fromDate"
              cdcName="fromDate"
              label="از تاریخ"
              label-width="90px"
              required
              validations="required"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="toDate"
              cdcName="toDate"
              label="تا تاریخ"
              label-width="90px"
              required
              validations="required"
            />
          </FormControl>
          <div>
            <btn-search @click="loadObj" />
          </div>
        </FormRow>
        <safa-splitter v-model="splitterModel" class="fit" margin="0" vertical>
          <template v-slot:before>
            <fit>
              <safa-grid
                v-model="workflowInstanceList"
                cdcName="workflowInstanceList"
                :addRow="false"
                :allowCopy="false"
                :allowMultipleSelection="true"
                :columns="requestListColumns"
                :deleteRow="false"
                :show-selected-checkbox="false"
                fit
                height="100%"
                :take="20"
                :pageSize="20"
                m="r"
                max-height="100%"
                min-height="100px"
                paginate
                title="درخواست های جاری"
                ref="workflowInstanceListRef"
                :suppressRowClickSelection="false"
                :filterable="true"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                v-model="userBlackList"
                cdcName="userBlackList"
                :addRow="false"
                :allowCopy="false"
                :allowMultipleSelection="true"
                :columns="requestListColumns"
                :deleteRow="false"
                :show-selected-checkbox="false"
                fit
                height="100%"
                m="r"
                max-height="100%"
                min-height="100px"
                :take="20"
                :pageSize="20"
                paginate
                title="درخواست های بایگانی موقت"
                ref="userBlackListRef"
                :suppressRowClickSelection="false"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <btn-default
          label="ثبت درخواست کانورت"
          @click="saveObj"
          :disable="lockSaveBtn"
        />
      </template>
    </form-wrapper>

    <safa-popup v-model="showSearchUser" height="500px" width="600px">
      <search-user @getUser="getUser" />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import SearchUser from "../group-convert-kartable/partials/SearchUser.vue"
import PersianDate from "persian-date"

export default {
  components: { SearchUser },
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UChangeProcInitiatorGroup",
      title: "تغییر گروهی کاربر ایجاد کننده درخواست",
      formKey: "dc269476-b07e-4dfb-9b63-26ebcf68b90b",
      main: true,

      // #variables
      splitterModel: 50,
      fromDate: currentDate(),
      toDate: currentDate(),
      showSearchUser: false,
      userTypeSearch: null,
      fromUser: {
        username: "",
        NidUser: "00000000-0000-0000-0000-000000000000"
      },
      toUser: {
        username: "",
        NidUser: "00000000-0000-0000-0000-000000000000"
      },
      workflowInstanceList: [],
      requestListColumns: [
        {
          field: "isSelected",
          width: "40px",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false,
          resizeble: false
        },
        {
          field: "EumProcStatus",
          title: "نوع درخواست",
          editor: "combo",
          source: [
            {
              ID: 0,
              Title: "در جریان"
            },
            {
              ID: 1,
              Title: "کامل شده"
            },
            {
              ID: 2,
              Title: "ابطال شده"
            },
            {
              ID: 3,
              Title: "بایگانی موقت"
            }
          ],
          width: "120px"
        },
        {
          field: "WorkflowTitel",
          title: "نوع پرونده",
          width: "200px"
        },
        {
          field: "NidWorkItem",
          title: "شماره پرونده",
          width: "120px"
        },
        {
          field: "BizCode",
          title: "کد نوسازی",
          width: "120px"
        },
        {
          field: "StartDate",
          title: "تاریخ ایجاد",
          editor: "date",
          width: "80px"
        },
        {
          field: "ProcInitiatorName",
          title: "ایجاد کننده درخواست",
          width: "200px"
        }
      ],
      userBlackList: [],
      nidProcList: [],
      newRequestModel: null,
      lockSaveBtn: false,

      // #services
      workItemRes: null,
      getWorkflowInstanceListRes: null,
      saveConvertRequestRes: null,
      searchShUserBlackListRes: null
    }
  },

  methods: {
    compareDays (date1 = "", date2 = "") {
      if (!date1 || !date2) return ""
      PersianDate.toCalendar("persian")
      const normalizeDate1 = new PersianDate(
        date1.split("/").map((x) => Number(x))
      )
      const normalizeDate2 = new PersianDate(
        date2.split("/").map((x) => Number(x))
      )
      return normalizeDate1.diff(normalizeDate2, "days")
    },
    async loadObj () {
      const diff = this.compareDays(this.toDate, this.fromDate)
      if (diff < 0) {
        return this.showError("بازه زمانی انتخاب شده مجاز نمی باشد.")
      }
      try {
        const payload = {
          pProcInitiator: this.fromUser.NidUser,
          pFromDate: this.fromDate,
          pToDate: this.toDate,
          IsFromSara10: true
        }
        this.showLoading()
        const { data } = await this.$services.SX.getWorkflowInstanceList(
          payload
        )
        this.getWorkflowInstanceListRes = this.getResponse(data)
        if (this.getWorkflowInstanceListRes.success) {
          const list =
            this.getWorkflowInstanceListRes.data?.WorkflowInstanceList ?? []
          this.workflowInstanceList = list
            .map((e) => {
              return { ...e, isSelected: false }
            })
            .filter((f) => f.EumProcStatus === 0)
          await this.getShUserBlackList()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getShUserBlackList () {
      try {
        const { data } = await this.$services.SA.getShUserBlackList(
          { pBlackUserName: this.fromUser.NidUser }
          // { config: { District: this.baseNosaziCode.District } }
        )
        this.searchShUserBlackListRes = this.getResponse(data)
        if (this.searchShUserBlackListRes.success) {
          const list = this.searchShUserBlackListRes.data?.UserBlackList ?? []
          this.userBlackList = list
            .map((e) => {
              return { ...e, isSelected: false }
            })
            .filter((f) => f.EumProcStatus === 5)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    getNidWorkflowDeff () {
      let obj = window.getConfigValue("esupParams")?.ConvertResource ?? null
      if (obj) {
        return obj.ConvertReqNidWorkflowDeff
      } else {
        return this.showError(
          "کلید گردشکار تعریف نشده است . به راهبر سیستم اطلاع دهید"
        )
      }
    },

    saveObj () {
      this.nidProcList = this.getSelectedRequest()
      if (this.nidProcList.length === 0) {
        return this.showError("لطفا درخواست مورد نظر را انتخاب نمایید.")
      }
      if (this.toUser.NidUser === "00000000-0000-0000-0000-000000000000") {
        return this.showError("لطفا کاربر منتقل شونده را انتخاب نمایید.")
      }
      this.showConfirm("آیا از ثبت درخواست کانورت اطمینان دارید؟").onOk(() => {
        this.addWorkItem()
      })
    },

    async addWorkItem () {
      try {
        this.showLoading()
        const payload = {
          BizCode: " ",
          EumOwnerType: 0,
          NidWorkflowDeff: this.getNidWorkflowDeff(),
          ProcInitiator: this.getNidUser(),
          ProcRequester: this.currentUser.FullName,
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: "سرا10",
          GroupName: "درخواست کانورت",
          GroupTitel: "درخواست کانورت",
          Domain: 0,
          IsSara10Request: true
        }
        const { data } = await this.$srvWorkflow.createInstance(payload)
        this.workItemRes = this.getResponse(data)
        if (this.workItemRes.success) {
          const res = this.workItemRes.data
          if (res.status === 200 && res.success) {
            this.lockSaveBtn = true
            this.newRequestModel = res.data
            debugger
            await this.saveConvertRequest(this.newRequestModel)
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveConvertRequest (e) {
      const ProcInitiatorFullName = (this.toUser?.firstName || '') + ' ' + (this.toUser?.lastName || '') ?? ''
      const ProcInitiatorName = ProcInitiatorFullName + ' (' + this.toUser.username + ')'
      try {
        const payload = {
          pNidProcList: this.nidProcList, // it is an Array
          pSara8Sys_ConvertRequest: {
            FirstProcInitiator: this.fromUser.NidUser,
            FirstProcInitiatorName: this.fromUser.username,
            FromDate: this.fromDate,
            // NidConvertRequest: "00000000-0000-0000-0000-000000000000",
            NidProc: e.ProcInfo.NidProc,
            // IsConverted: null, // 1
            // NidProcList: this.nidProcList.toString(), //  it is a String
            NidWorkItem: e.ProcInfo.NidWorkItem,
            NiduserRequester: this.getNidUser(),
            ProcInitiator: this.toUser.NidUser,
            ProcInitiatorName,
            ProcInitiatorFullName,
            ProcInitiatorCellPhone: this.toUser?.mobile ?? '',
            ToDate: this.toDate,
            UserGroup: this.toUser?.jobLocation?.name ?? "",
            UserNameRequester: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.SX.saveConvertRequest(payload)
        this.saveConvertRequestRes = this.getResponse(data)
        if (this.saveConvertRequestRes.success) {
          this.showSuccess(
            `درخواست با شماره ${e.ProcInfo.NidWorkItem} ثبت گردید.`
          )
          await this.log({
            action: this.logActions.save,
            bizCode: e.ProcInfo.NidProc,
            bizCodeTitle: "NidProc",
            nidWorkItem: e.ProcInfo.NidWorkItem,
            saveDesc: `ثبت درخواست کانورت با شماره ${e.ProcInfo.NidWorkItem} انجام گردید.`
          })
          this.lockSaveBtn = false
          this.redirectToKartable()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    getUser (user) {
      this.userTypeSearch === "from"
        ? (this.fromUser = user)
        : (this.toUser = user)
      if (this.toUser.enabled === false) {
        this.toUser = {
          username: "",
          NidUser: "00000000-0000-0000-0000-000000000000"
        }
        this.showError(
          "کاربر انتخاب شده فعال نمیباشد. لطفا کاربر دیگری انتخاب نمایید."
        )
      }
      if (this.toUser.IsInBlackList) {
        this.toUser = {
          username: "",
          NidUser: "00000000-0000-0000-0000-000000000000"
        }
        return this.showError(
          "کاربر انتخاب شده در لیست سیاه می باشد. کاربرانی که در لیست سیاه هستند مجاز به دریافت درخواست نمی باشند."
        )
      }
      this.showSearchUser = false
    },
    searchUserHandler (userType) {
      this.showSearchUser = true
      this.userTypeSearch = userType
    },
    getSelectedRequest () {
      let tmpNids = []
      const selectedReqs =
        this.$refs.workflowInstanceListRef.gridApi.getSelectedRows() ?? []
      // this.$refs.workflowInstanceListRef.selectedRows ?? []
      if (selectedReqs.length > 0) {
        for (let i = 0; i < selectedReqs.length; i++) {
          const nidProc = selectedReqs[i].NidProc
          tmpNids.push(nidProc)
        }
      }
      const selectedTempReqs =
        this.$refs.userBlackListRef.gridApi.getSelectedRows() ?? []
      // this.$refs.userBlackListRef.selectedRows ?? []
      if (selectedTempReqs.length > 0) {
        for (let i = 0; i < selectedTempReqs.length; i++) {
          const nidProc = selectedTempReqs[i].NidProc
          tmpNids.push(nidProc)
        }
      }
      return [...new Set(tmpNids)]
    }
  },

  watch: {
    "fromUser.username": {
      handler () {
        if (this.fromUser.username !== "" && this.fromUser.NidUser) {
          this.loadObj()
        } else {
          this.fromUser = { username: "", NidUser: null }
        }
      },
      deep: true
    }
  }
}
</script>
