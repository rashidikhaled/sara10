<template>
  <safa-form
    appId="0F9623AC-4BC7-42AD-A8E6-52A72187C6B5"
    caption="گردش کار -تغییر گروهی کاربر ایجادکننده درخواست بر اساس محل خدمت"
    :id="formKey"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getWorkflowInstanceListRes" />
        <safa-status :result="updateProcInitiatorGroupRes" />
        <safa-status :result="searchShUserBlackListRes" />
      </template>

      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              v-model="fromUser.username"
              cdcName="username"
              label="کاربر انتقال دهنده"
              label-width="110px"
              m="r"
              required
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
              label-width="110px"
              m="r"
              required
              validations="required"
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
              label-width="110px"
              required
              validations="required"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="toDate"
              cdcName="toDate"
              label="تا تاریخ"
              label-width="110px"
              required
              validations="required"
            />
          </FormControl>
          <div>
            <btn-search @click="getWorkflowInstanceList" />
          </div>
        </FormRow>
        <safa-splitter v-model="splitterModel" class="fit" margin="0" vertical>
          <template v-slot:before>
            <fit>
              <safa-grid
                title="درخواست های جاری"
                v-model="workflowInstanceList"
                cdcName="workflowInstanceList"
                :columns="requestListColumns"
                :deleteRow="false"
                :addRow="false"
                :allowCopy="false"
                :allowMultipleSelection="true"
                :show-selected-checkbox="false"
                fit
                :suppressRowClickSelection="false"
                max-height="100%"
                min-height="110px"
                height="100%"
                :take="20"
                :pageSize="20"
                m="r"
                paginate
                ref="workflowInstanceListRef"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                title="درخواست های بایگانی موقت"
                v-model="userBlackList"
                cdcName="userBlackList"
                :columns="requestListColumns"
                :addRow="false"
                :allowCopy="false"
                :allowMultipleSelection="true"
                :deleteRow="false"
                :show-selected-checkbox="false"
                :suppressRowClickSelection="false"
                fit
                height="100%"
                max-height="100%"
                min-height="110px"
                :take="20"
                :pageSize="20"
                m="r"
                paginate
                ref="userBlackListRef"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <btn-default label="تغییر کاربر" m="r" @click="saveObj" />
      </template>
    </form-wrapper>
    <safa-popup v-model="showSearchUser" height="500px" width="600px">
      <search-user @getUser="getUser" isSameJobLocationWithCurrentUser />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
import { currentDate } from "src/utils/index"
import SearchUser from "../group-convert-kartable/partials/SearchUser.vue"

export default {
  components: { SearchUser },
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UGroupConvertByJobLocation",
      title: "تغییر گروهی کاربر ایجاد کننده درخواست براساس محل خدمت",
      formKey: "66580f6d-d05c-4bbd-b6e8-e438d1210b47",
      main: true,

      // #variables
      splitterModel: 50,
      fromDate: currentDate(),
      toDate: currentDate(),
      showSearchUser: false,
      userTypeSearch: null,
      RequesterName: "",
      Cellphone: "",
      fromUser: {
        username: "",
        NidUser: "00000000-0000-0000-0000-000000000000"
      },
      toUser: {
        username: "",
        NidUser: "00000000-0000-0000-0000-000000000000"
      },
      // grid
      workflowInstanceList: [],

      requestListColumns: [
        {
          field: "isSelected",
          width: "80px",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false
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

      // #services
      getWorkflowInstanceListRes: null,
      updateProcInitiatorGroupRes: null,
      searchShUserBlackListRes: null
    }
  },
  mounted () {
    this.fromDate = this.subtractCurrentDate()
  },
  methods: {
    getWorkflowInstanceList () {
      const payload = {
        pProcInitiator: this.fromUser.NidUser,
        pFromDate: this.fromDate,
        pToDate: this.toDate,
        IsFromSara10: true
      }
      this.showLoading()
      this.$services.SX.getWorkflowInstanceList(payload)
        .then(async ({ data }) => {
          this.getWorkflowInstanceListRes = this.getResponse(data)
          if (this.getWorkflowInstanceListRes.success) {
            const list =
              this.getWorkflowInstanceListRes.data?.WorkflowInstanceList ?? []
            this.workflowInstanceList = list
              .map((e) => {
                return { ...e, isSelected: false }
              })
              .filter((f) => f.EumProcStatus === 0)
            this.getShUserBlackList()
            await this.log({
              action: this.logActions.view,
              bizCode: this.fromUser.NidUser,
              bizCodeTitle: "NidUser",
              saveDesc: `
              جستجوی درخواست های جاری کاربر 
              ${this.fromUser.username} 
              از تاریخ 
              ${this.fromDate}
               الی 
               ${this.toDate}
               `
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
    getShUserBlackList () {
      this.$services.SA.getShUserBlackList(
        { pBlackUserName: this.fromUser.NidUser }
        // , { config: { District: this.baseNosaziCode.District } }
      )
        .then(async ({ data }) => {
          this.searchShUserBlackListRes = this.getResponse(data)
          if (this.searchShUserBlackListRes.success) {
            const list =
              this.searchShUserBlackListRes.data?.UserBlackList ?? []
            this.userBlackList = list
              .map((e) => {
                return { ...e, isSelected: false }
              })
              .filter((f) => f.EumProcStatus === 5)
            await this.log({
              action: this.logActions.view,
              bizCode: this.fromUser.NidUser,
              bizCodeTitle: "fromUser.NidUser",
              saveDesc: `
                جستجوی درخواست های بایگانی موقت کاربر 
                ${this.fromUser.username} 
                از تاریخ 
                ${this.fromDate}
                الی 
                ${this.toDate}
               `
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (this.fromUser.NidUser === "00000000-0000-0000-0000-000000000000") {
        return this.showError("لطفا کاربر انتقال دهنده را انتخاب نمایید.")
      }
      if (this.toUser.NidUser === "00000000-0000-0000-0000-000000000000") {
        return this.showError("لطفا کاربر منتقل شونده را انتخاب نمایید.")
      }
      this.nidProcList = this.getSelectedRequest()
      if (this.nidProcList.length === 0) {
        return this.showError("لطفا درخواست مورد نظر را انتخاب نمایید.")
      }
      this.showConfirm(
        `آیا از عملیات تغییر کاربر از ${this.fromUser.username} به ${this.toUser.username} اطمینان دارید؟`
      ).onOk(() => {
        this.updateProcInitiatorGroup()
      })
    },
    updateProcInitiatorGroup () {
      this.nidProcList = this.getSelectedRequest()

      const pProcInitiatorFullName =
        (this.toUser?.firstName || "") + " " + (this.toUser?.lastName || "") ??
        ""
      const pProcInitiatorName =
        pProcInitiatorFullName + " (" + this.toUser.username + ")"
      const payload = {
        pNidProcList: this.nidProcList,
        pProcInitiator: this.toUser.NidUser,
        pProcInitiatorName,

        pUserName: this.getUserDisplayName(),
        pNiduser: this.getNidUser(),
        pUserGroup: this.currentUser.JobLocationName ?? "",
        pProcInitiatorFullName,
        pProcInitiatorCellPhone: this.toUser?.mobile ?? "",
        pIsChangeProcInitiator: true,
        pNidWorkItemConvertRequest: 0
      }
      this.showLoading()
      this.$services.SX.updateProcInitiatorGroup(payload)
        .then(async ({ data }) => {
          this.updateProcInitiatorGroupRes = this.getResponse(data)
          if (this.updateProcInitiatorGroupRes.success) {
            const txt = `درخواست های ${this.getNidWorkItems()} از کاربر ${
              this.fromUser.username
            } به کاربر ${this.toUser.username} انتقال داده شد.`
            this.showSuccess(`عملیات با موفقیت انجام شد. ${txt}`)
            await this.log({
              action: this.logActions.save,
              bizCode: payload.pProcInitiator,
              bizCodeTitle: "pProcInitiator",
              saveDesc: txt
            })
            this.redirectToKartable()
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
    getUser (user) {
      this.userTypeSearch === "from"
        ? (this.fromUser = user)
        : (this.toUser = user)
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
    selectedRequestForUser ({ dataItem }) {
      this.selectRequest = dataItem
    },
    subtractCurrentDate () {
      const tmp = currentDate().split("/")
      const y = parseInt(tmp[0])
      const m = parseInt(tmp[1])
      const d = parseInt(tmp[2])
      const today = new PersianDate([y, m, d])
      return today.subtract("month", 1).toLocale("en").format("L")
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
    },
    getNidWorkItems () {
      let tmpNids = []
      const selectedReqs =
        this.$refs.workflowInstanceListRef.gridApi.getSelectedRows() ?? []
      // this.$refs.workflowInstanceListRef.selectedRows ?? []
      if (selectedReqs.length > 0) {
        for (let i = 0; i < selectedReqs.length; i++) {
          const nid = selectedReqs[i].NidWorkItem
          tmpNids.push(nid)
        }
      }
      const selectedTempReqs =
        this.$refs.userBlackListRef.gridApi.getSelectedRows() ?? []
      // this.$refs.userBlackListRef.selectedRows ?? []
      if (selectedTempReqs.length > 0) {
        for (let i = 0; i < selectedTempReqs.length; i++) {
          const nid = selectedTempReqs[i].NidWorkItem
          tmpNids.push(nid)
        }
      }
      const tmp = [...new Set(tmpNids)]
      return tmp.toString()
    }
  },

  watch: {
    "fromUser.username": {
      handler () {
        if (this.fromUser.username !== "" && this.fromUser.NidUser) {
          this.getWorkflowInstanceList()
        } else {
          this.fromUser = { username: "", NidUser: null }
        }
      },
      deep: true
    }
  }
}
</script>
