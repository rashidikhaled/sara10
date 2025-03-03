<template>
  <safa-form
    appId="0F9623AC-4BC7-42AD-A8E6-52A72187C6B5"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="userListRes" />
        <safa-status :result="searchShUserBlackListRes" />
        <safa-status :result="updateProcInitiatorRes" />
        <safa-status :result="getUsersFromJobLocation" />
        <!-- <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
        /> -->
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="نوع درخواست"
              label-width="80px"
              m="r"
              v-model="workflowTitel"
              cdcName="workflowTitel"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره درخواست"
              label-width="80px"
              m="r"
              v-model="nidWorkItem"
              cdcName="nidWorkItem"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کاربر ایجاد کننده"
              label-width="80px"
              m="r"
              v-model="createdByName"
              cdcName="createdByName"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ درخواست"
              label-width="80px"
              m="r"
              v-model="taskStartDate"
              cdcName="taskStartDate"
            />
          </FormControl>
          <FormControl>
            <safa-text
              cdcName="userName"
              label="جستجوی کاربر"
              label-width="80px"
              v-model="userName"
              @keypress.enter="searchHandler"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  color="primary"
                  name="search"
                  size="xs"
                  style="position: relative; right: 5px"
                  title="جستجوی کاربر"
                  @click="searchHandler"
                />
              </template>
            </safa-text>
          </FormControl>
        </FormRow>
        <safa-grid
          title="لیست کاربران"
          v-model="usersList"
          cdcName="usersList"
          helper="changeProcInitiatorUser"
          fit
          paginate
          :getRowStyle="getRowStyle"
          @selection:changed="selectedChange"
          :allowMultipleSelection="false"
          :take="20"
          :pageSize="20"
        />
      </fit>
      <template v-slot:footer>
        <btn-default label="تغییر کاربر" @click="convert" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "ChangeProcInitiator",
      title: "تغییر کاربر ایجاد کننده درخواست",
      formKey: "bc735273-db82-4fa4-a13f-0f1702e73193",
      main: true,

      isView: false,
      Cellphone: "",
      workflowTitel: "",
      nidWorkItem: "",
      createdByName: "",
      taskStartDate: "",
      userName: "",
      selectedUser: null,
      getUsersFromJobLocation: null,
      updateProcInitiatorRes: null,
      userListRes: null,
      searchShUserBlackListRes: null,
      usersList: [],
      allUsers: [],
      userBlackList: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  async mounted () {
    if (this.isSelectedRequest()) {
      this.workflowTitel = this.selectedRequest.WorkflowTitel
      this.nidWorkItem = this.selectedRequest.NidWorkItem
      this.createdByName = this.selectedRequest.ProcInitiatorName
      this.taskStartDate = this.selectedRequest.TaskStartDate

      await this.getShUserBlackList()
      await this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          NidJobLocation: this.$stSecurity.getters["authorize/user"].JobLocationGuid
        }
        const { data } = await this.$services.security.getUsersFromJobLocation(
          payload
        )
        if (data.success) {
          this.getUsersFromJobLocation = this.getResponse(data).data
          if (this.getUsersFromJobLocation.success) {
            const tmpList = this.getUsersFromJobLocation.data?.list ?? []
            this.usersList = this.checkUsersInBlackList(tmpList).map((m) => {
              return {
                ...m,
                isSelectedNode: false
              }
            })
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode || "",
                nidWorkItem: this.selectedRequest.NidWorkItem || "",
                saveDesc: `نمایش لیست کاربران در فرم تغییر کاربر ایجاد کننده درخواست انجام گردید.`
              })
            }
            this.isView = true
          }
        } else this.showError(data.msg)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async searchUser () {
      try {
        this.showLoading()
        const { data } = await this.$services.security.userList({
          search: this.userName,
          filter: [["enabled", true]]
        })
        if (data.success) {
          this.userListRes = this.getResponse(data).data
          if (this.userListRes.success) {
            const tmpList = Array.isArray(this.userListRes.data.list)
              ? this.userListRes.data.list
              : []
            this.usersList = this.checkUsersInBlackList(tmpList).map((m) => {
              return {
                ...m,
                isSelectedNode: false
              }
            })
          }
        } else this.showError(data.msg)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    checkUsersInBlackList (users) {
      const blackList = this.userBlackList
      for (let obj1 of blackList) {
        let blackNid = obj1.BlackNiduser
        let obj2 = users.find(
          (obj2) => obj2.NidUser.toUpperCase() === blackNid.toUpperCase()
        )
        if (obj2) {
          Object.assign(obj2, { IsInBlackList: true })
        }
      }
      return users
    },
    selectedChange (e) {
      this.selectedUser =
        e.api.getSelectedRows().length === 0
          ? null
          : e.api.getSelectedRows()[0]
    },
    convert () {
      if (this.selectedUser) {
        if (this.selectedUser.IsInBlackList) {
          return this.showError(
            "کاربر انتخاب شده در لیست سیاه می باشد. کاربرانی که در لیست سیاه هستند مجاز به انتخاب نمی باشند.",
            { title: "خطا" }
          )
        } else {
          this.showConfirm(
            `آیا از تغییر کاربر ایجاد کننده درخواست به کاربر با نام کاربری (${this.selectedUser.username}) اطمینان دارید؟`
          ).onOk(async () => {
            await this.updateProcInitiator()
          })
        }
      } else return this.showError("لطفا کاربر مورد نظر را انتخاب نمایید.")
    },
    async updateProcInitiator () {
      try {
        const group = this.selectedUser.JobLocationName
          ? this.selectedUser.JobLocationName
          : this.currentUser.jobLocation
            ? this.currentUser.jobLocation.name
            : ""
        const pProcInitiatorFullName = (this.selectedUser?.firstName || '') + ' ' + (this.selectedUser?.lastName || '') ?? ''
        const pProcInitiatorName = pProcInitiatorFullName + ' (' + this.selectedUser.username + ')'
        const payload = {
          pNidProc: this.selectedRequest.NidProc,

          pProcInitiator: this.selectedUser.NidUser,
          pProcInitiatorName, // : this.selectedUser.username
          pProcInitiatorFullName,
          pProcInitiatorCellPhone: this.selectedUser?.mobile ?? '',

          pUserName: this.getUserDisplayName(),
          pNiduser: this.getNidUser(),
          pUserGroup: group,
          pNidWorkItemConvertRequest: this.nidWorkItem
        }
        this.showLoading()
        const { data } = await this.$services.SX.updateProcInitiator(payload, this.config)
        this.updateProcInitiatorRes = this.getResponse(data)
        if (this.updateProcInitiatorRes.success) {
          this.showSuccess("کاربر ایجاد کننده درخواست با موفقیت ویرایش شد.")
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode || "",
            nidWorkItem: this.selectedRequest.NidWorkItem || "",
            saveDesc: `تغییر کاربر ایجاد کننده درخواست با شماره درخواست ${this.nidWorkItem} به کاربر با نام کاربری (${this.selectedUser.username}) انجام گردید.`
          })
          this.redirectToKartable()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async searchHandler () {
      if (this.userName) {
        await this.searchUser()
      } else {
        this.userName = ""
        await this.loadObj()
      }
    },
    async getShUserBlackList () {
      try {
        this.showLoading()
        const { data } = await this.$services.SA.getShUserBlackList(
          { pBlackUserName: null }
          , this.config
        )
        this.searchShUserBlackListRes = this.getResponse(data)
        if (this.searchShUserBlackListRes.success) {
          this.userBlackList =
            this.searchShUserBlackListRes.data.UserBlackList.filter(
              (f) => f.EumBlackListStatus === 0
            ).map((m) => {
              return {
                BlackNiduser: m.BlackNiduser,
                BlackUserName: m.BlackUserName
              }
            }) ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getRowStyle (params) {
      if (params.data.IsInBlackList) return { background: "#fdc9c9ad" }
      return { background: "transparent" }
    }
  },
  computed: {
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  }
}
</script>
