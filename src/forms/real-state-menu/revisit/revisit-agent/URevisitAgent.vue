<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getRevisitAgentListRes" />
        <safa-status :result="getRevisitAgentInfoRes" />
        <safa-status :result="saveRevisitAgentRes" />
        <safa-status :result="deleteRevisitAgentRes" />
      </template>
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              ciName="CI_Region"
              domainName="Estate"
              label="منطقه"
              v-model="CI_Region"
              label-width="100px"
              cdcName="CI_Region"
            />
          </form-control>
        </form-row>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-text
              label="نام"
              v-model="model.FirstName"
              :m="mode"
              label-width="100px"
              cdcName="FirstName"
              validation="required"
              required
            />
          </form-control>
          <form-control>
            <safa-text
              label="نام خانوادگی"
              v-model="model.LastName"
              :m="mode"
              label-width="100px"
              cdcName="LastName"
              validation="required"
              required
            />
          </form-control>
          <form-control>
            <safa-text
              label="تلفن"
              v-model="model.Phone"
              :m="mode"
              label-width="100px"
              cdcName="Phone"
            />
          </form-control>
        </form-row>
        <form-row class="q-mb-sm">
          <form-control>
            <!-- مشخص نیست این از کجا پر میشه -->
            <safa-text
              label="کد دستگاه"
              v-model="model.DeviceCode"
              :m="mode"
              label-width="100px"
              cdcName="DeviceCode"
            />
          </form-control>
          <form-control>
            <!-- مشخص نیست این از کجا پر میشه -->
            <safa-text
              label="حداکثر تعداد بازدید"
              v-model="model.MaxVisit"
              :m="mode"
              label-width="100px"
              cdcName="MaxVisit"
            />
          </form-control>
          <form-control>
            <safa-text
              label="کاربر"
              v-model="model.UserName"
              :m="mode"
              label-width="100px"
              cdcName="UserName"
            />
          </form-control>
          <div>
            <btn-default
              :disabled="mode === 'r' ? true : false"
              label="..."
              @click="showUserList"
            />
          </div>
        </form-row>
        <form-row class="q-mb-sm">
          <form-control class="col-12">
            <safa-text
              label="آدرس"
              v-model="model.Address"
              label-width="100px"
              :m="mode"
              cdcName="Address"
            />
          </form-control>
        </form-row>
        <safa-grid
          v-model="RevisitAgentList"
          cdcName="RevisitAgentList"
          title="لیست مامورین بازدید"
          :columns="revisitAgentListColumns"
          height="100%"
          max-height="100%"
          min-height="200px"
          fit
          m="r"
          paginate
          :take="20"
          @row:click="selectedChange"
        />
      </fit>
      <template #footer>
        <form-actions
          :showEditButton="showEditBtn"
          showNewButton
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @newInfo="newInfoFunc()"
          @save="saveRevisitAgent(false)"
        >
          <template #after v-if="showBtns">
            <btn-delete label="حذف" @click="deleteRevisitAgent" />
            <btn-back
              :label="label"
              @click="ActiveAndDeActive()"
              v-show="showBtnBack"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
    <safa-popup
      v-model="userList"
      cdcName="userList"
      height="400px"
      width="700px"
      title="لیست کاربران"
    >
      <UsersList
        :formKey="formKey"
        :name="name"
        :selectDistrict="CI_Region"
        :title="title"
        @selected="handleUserSelectionChanged"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UsersList from "./partials/UsersList"

import { uid } from "quasar"

export default {
  mixins: [baseFormMixin],
  components: { UsersList },

  data () {
    return {
      title: "مامورین بازدید",
      formKey: "C0BA5186-281F-4F14-9F00-260F35F2B45DF",
      name: "URevisitAgent",
      main: true,

      // var
      label: "",
      getRevisitAgentListRes: null,
      getRevisitAgentInfoRes: null,
      saveRevisitAgentRes: null,
      deleteRevisitAgentRes: null,
      model: {
        FirstName: "",
        Name: "",
        LastName: "",
        Phone: "",
        UserName: "",
        DeviceCode: "",
        MaxVisit: 0,
        NidRevisitAgent: "00000000-0000-0000-0000-000000000000",
        Address: ""
      },
      CI_Region: 1,

      // Condition
      showBtns: false,
      showBtnBack: false,
      showEditBtn: false,
      userList: false,

      // grid
      RevisitAgentList: [],
      revisitAgentListColumns: [
        {
          field: "Name",
          title: "نام",
          width: "100px"
        },
        {
          field: "LastName",
          title: "نام خانوادگی",
          width: "100px"
        },
        {
          field: "UserName",
          title: "نام کاربر",
          width: "100px"
        },
        {
          field: "DeviceCode",
          title: "کد دستگاه",
          width: "100px"
        },
        {
          field: "Phone",
          title: "تلفن",
          width: "100px"
        },
        {
          field: "MaxVisit",
          title: "حداکثر تعداد بازدید",
          width: "150px"
        },
        {
          field: "IsActive",
          title: "وضعیت مامور بازدید",
          width: "150px",
          editor: "checkbox"
        }
      ]
    }
  },
  mounted () {
    this.loadObj()
  },
  watch: {
    CI_Region () {
      this.loadObj()
    }
  },
  methods: {
    getRevisitAgentInfo (e) {
      let payload = {}
      if (e.data) {
        payload = {
          pNidRevisit: e.data.NidRevisitAgent
        }
        this.label = e.data.IsActive ? "غیر فعال کردن مامور" : "فعال کردن مامور"
      } else {
        payload = {
          pNidRevisit: e
        }
      }
      this.$services.ES.getRevisitAgentInfo(payload)
        .then(async ({ data }) => {
          this.getRevisitAgentInfoRes = this.getResponse(data)
          if (this.getRevisitAgentInfoRes.success) {
            this.model = {
              ...this.getRevisitAgentInfoRes.data.GetRevisitAgentInfoResult
                .RevisitAgent,
              FirstName:
                this.getRevisitAgentInfoRes.data.GetRevisitAgentInfoResult
                  .RevisitAgent.Name
            }
            await this.log({
              action: this.logActions.view,
              bizCode: e.data ? e.data.NidUser : "",
              bizCodeTitle: "NidUser",
              saveDesc: `نمایش اطلاعات مامور بازدید "${
                e.data ? e.data.NidUser : ""
              }"`
            })
            if (
              this.getRevisitAgentInfoRes.data.GetRevisitAgentInfoResult ===
              null
            ) {
              this.showError("خطا در بازآوری نماینده بازدید")
            }
          }
        })

        .catch((e) => {
          console.error(e)
          this.showError()
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    loadObj () {
      const payload = {
        pDistrict: this.CI_Region
        // for every region call a different service call
      }

      this.showLoading()
      this.$services.ES.getRevisitAgentList(payload)
        .then(async ({ data }) => {
          this.getRevisitAgentListRes = this.getResponse(data)
          if (this.getRevisitAgentListRes.success) {
            this.RevisitAgentList =
              this.getRevisitAgentListRes.data.GetRevisitAgentListResult.RevisitAgentList
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "نمایش لیست اطلاعات مامورین بازدید"
            })
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    saveRevisitAgent () {
      if (!this.isValidForm()) return
      const payload = {
        pObj: {
          ActiveRevisitAgentList: "",
          RevisitAgent: {
            ...this.model,
            Name: this.model.FirstName,
            NidUser: this.model.NidUser || uid(),
            JobLocation: this.model.JobLocation || this.CI_Region
          },
          RevisitAgentAssign_Group: "",
          RevisitAgentAssign_InOneDay: "",
          RevisitAgentList: "",
          _NidRevisitAgent:
            this.model.NidRevisitAgent || "00000000-0000-0000-0000-000000000000"
        }
      }

      this.showLoading()
      this.$services.ES.saveRevisitAgent(payload)
        .then(async ({ data }) => {
          this.saveRevisitAgentRes = this.getResponse(data)
          if (this.saveRevisitAgentRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            this.isEditable = false
            this.showEditBtn = true
            this.showBtnBack = false
            this.loadObj()

            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "تغییر وضعیت مامور بازدید"
            })
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    deleteRevisitAgent () {
      const payload = {
        pObj: {
          ActiveRevisitAgentList: null,
          RevisitAgent: { ...this.model },
          RevisitAgentAssign_Group: null,
          RevisitAgentAssign_InOneDay: null,
          RevisitAgentList: null,
          _NidRevisitAgent: this.model.NidRevisitAgent
        }
      }

      this.showLoading()
      this.$services.ES.deleteRevisitAgent(payload)
        .then(async ({ data }) => {
          this.deleteRevisitAgentRes = this.getResponse(data)
          if (this.deleteRevisitAgentRes.success) {
            this.showSuccess("اطلاعات  مامور بازدید با موفقیت حذف شد")
            this.isEditable = false
            this.showEditBtn = false
            this.showBtns = false
            this.loadObj()
            await this.log({
              action: this.logActions.delete,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "حذف اطلاعات مامور بازدید"
            })
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    showUserList () {
      this.userList = true
    },
    newInfoFunc (e) {
      this.isEditable = true
      this.getRevisitAgentInfo("00000000-0000-0000-0000-000000000000")
    },
    ActiveAndDeActive () {
      if (this.label === "غیر فعال کردن مامور") {
        this.model.IsActive = false
        this.saveRevisitAgent()
      } else if (this.label === "فعال کردن مامور") {
        this.model.IsActive = true
        this.saveRevisitAgent()
      }
    },
    selectedChange (e) {
      this.showBtns = true
      this.showEditBtn = true
      this.showBtnBack = true
      this.getRevisitAgentInfo(e)
    },
    handleUserSelectionChanged (user) {
      this.model.UserName = user.username || user.UserName || ""
      this.model.Address = user.address || ""
      this.model.IsActive = user.Enabled || false
      this.model.LastName = user.lastName || user.LastName || ""
      this.model.MaxVisit = user.MaxVisit || 0
      this.model.Name = user.firstName || user.FirsstName || ""
      this.model.FirstName = user.firstName || user.FirstName || ""
      this.model.NidUser =
        user.NidUser || "00000000-0000-0000-0000-000000000000"
      this.model.Phone = user.tel || ""

      this.userList = false
    }
  }
}
</script>
