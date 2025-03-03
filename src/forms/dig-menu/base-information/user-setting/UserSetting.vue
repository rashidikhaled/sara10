<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              label="کاربران گروه حفاری"
              label-width="115px"
              v-model="currentNidUser"
              cdcName="currentNidUser"
              source-type="local"
              :options="userGroupDigOptions"
              :m="mode"
              required
            />
          </form-control>
          <form-control>
            <safa-combo
              v-model="currentRequesterType"
              cdcName="CI_RequesterType"
              label="شرکت خدماتی"
              label-width="95px"
              :m="mode"
              ciName="CI_RequesterType"
              domainName="Dig"
              ref="ciRequesterType"
              class="col q-mr-sm"
              required
            />
          </form-control>
          <form-control>
            <btn-default
              label="اضافه"
              @click="addHandler"
              :disable="!isEditable"
            />
          </form-control>
        </form-row>
        <safa-grid
          title="اطلاعات کاربران"
          min-height="100px"
          height="100%"
          max-height="100%"
          :addRow="false"
          :allowCopy="false"
          :suppressRowClickSelection="false"
          v-model="assignRequesterToUser"
          cdcName="assignRequesterToUser"
          :columns="userInfoColumns"
          :pageSize="20"
          paginate
          :m="mode"
          fit
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
        </form-actions>
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
      title: "تنظیمات کاربر",
      formKey: "7E0050EC-951A-43DB-A9E2-5E70746B1B6A",
      name: "UserSetting",
      main: true,
      sidebarCompatible: true,

      ciList: [],
      loadObjRes: null,
      saveObjRes: null,
      getCIRes: null,

      isView: false,
      assignRequesterToUser: [],
      currentNidUser: null,
      currentRequesterType: null,
      userGroupDigOptions: []
    }
  },
  computed: {
    userInfoColumns () {
      return [
        {
          field: "UserName",
          title: "نام کاربری",
          width: "200px",
          isEditable: true
        },
        {
          field: "CI_RequesterType",
          title: "شرکت های خدماتی",
          domain: "Dig",
          editor: "combo",
          width: "200px",
          editable: false,
          triggerCells: [["CI_RedirectName"]]
        },
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          ignoreCi: true,
          // domain: "Dig",
          editor: "ADPGridTemplate",
          width: "200px",
          valueFormatter: (col, { data }) => {
            if (data.CI_RedirectName === 0) {
              return "نامشخص"
            } else {
              return (
                this.ciList.find((f) => f.ID === data.CI_RedirectName)?.Title ||
                data.CI_RedirectName
              )
            }
          },
          // serviceUrl نباید به GetAssignRequestToUser_WrappedRequest تغییر کند.
          // چون خروجی آن قابل استفاده برای کمبوهایی که سمت CI  هست نمیباشد.
          params: {
            serviceKey: "excavation",
            serviceUrl: "GetClsCI_RedirectName_WrappedRequest",
            responseKey: "CI_RedirectName",
            paramName: "CI_RequesterType",
            groupField: "CI_RequesterType"
          }
        },
        {
          field: "StrDate",
          title: "تاریخ ایجاد",
          editor: "date",
          width: "100px",
          isEditable: true
        }
      ]
    }
  },
  methods: {
    async getCI_RequesterType () {
      try {
        const self = this
        this.$ci.get({
          name: "CI_RedirectName",
          domain: "Dig",
          callback: function (list) {
            self.ciList = list ?? []
          }
        })
      } catch (e) {
        console.error(e)
      }
    },
    async loadObj () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getAssignRequestToUser()
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          let list =
            this.loadObjRes.data?.GetAssignRequestToUserResult
              ?.ClsAssignRequestToUser?.AssignRequesterToUser ?? []
          this.assignRequesterToUser = list.sort((a, b) => {
            return Number(a.StrDate ?? 0) - Number(b.StrDate ?? 0)
          })
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات ${this.title} انجام گردید.`
            })
          }
          this.isView = true
          this.currentNidUser = null
        }
      } catch (e) {
        console.error()
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    saveObj () {
      this.showLoading()
      this.$services.excavation
        .saveAssignRequestToUser({
          pRequest: {
            ClsAssignRequestToUser: {
              AssignRequesterToUser: this.assignRequesterToUser
            }
          }
        })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.isEditable = false
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc || "",
              bizCodeTitle: "NidProc",
              saveDesc: `ذخیره اطلاعات ${this.title} انجام گردید.`
            })
            this.loadObj()
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    addHandler () {
      if (!this.isValidForm()) {
        return
      }

      if (this.assignRequesterToUser.find(e => e.UserGUID === this.currentNidUser && e.CI_RequesterType === this.currentRequesterType)) {
        return this.showError("نام شرکت خدماتی نمیتواند تکراری باشد !")
      }
      const { ID, Title } = this.userGroupDigOptions.find(
        (f) => f.ID === this.currentNidUser
      )
      this.assignRequesterToUser = [
        {
          AccessToPayment: null,
          CI_RedirectName: 0,
          CI_RequesterType: this.currentRequesterType,
          NIdAssingn: "00000000-0000-0000-0000-000000000000",
          StrDate: currentDate(),
          UserGUID: ID,
          UserName: Title
        },
        ...this.assignRequesterToUser
      ]

      this.currentRequesterType = ""
    },
    async getUserListByNidGroup (NidGroup) {
      try {
        this.showLoading()
        const { data } = await this.$services.security.userList({ NidGroup })
        const res = this.getResponse(data)
        if (res.success) {
          if (res.data.success) {
            const list = (res.data?.data?.list || res.data?.list) ?? []
            this.userGroupDigOptions =
              list.map((m) => {
                return {
                  ID: m.NidUser,
                  Title: `${m.firstName} ${m.lastName}` ?? ""
                }
              }) ?? []
          } else if (res.data.msg !== "") this.showError(res.data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },

  async created () {
    await this.getCI_RequesterType()
    this.loadObj()

    const nidGroup =
      window.getConfigValue("esupParams")?.ClsDigParams?.DigUsersNidGroup ??
      null
    if (nidGroup) this.getUserListByNidGroup(nidGroup)
  }
}
</script>
