<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper padding title="مامورین بازدید" vertical>
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              v-model="baseNosaziCode.District"
              cdcName="District"
              :options="districts"
              :use-input="false"
              label="منطقه"
              label-width="94px"
              source-type="local"
              @input="changeDistrict"
            />
          </FormControl>
          <safa-checkbox
            label="عدم در نظر گرفتن دامنه برای ماموران بازدید"
            cdcName="doNotMindTheDomain"
            v-model="doNotMindTheDomain"
          />
        </FormRow>
        <q-separator />
        <FormRow class="q-my-sm">
          <FormControl>
            <safa-text
              v-model="selectedRevisitAgent.Name"
              cdcName="Name"
              :m="mode"
              label="نام"
              label-width="94px"
              required
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="selectedRevisitAgent.LastName"
              cdcName="LastName"
              :m="mode"
              label="نام خانوادگی"
              label-width="94px"
              required
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="selectedRevisitAgent.Phone"
              cdcName="Phone"
              :m="mode"
              label="تلفن"
              label-width="94px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="selectedRevisitAgent.UserName"
              cdcName="UserName"
              label="کاربر"
              label-width="94px"
              m="r"
              readonly
            >
              <template #append>
                <q-btn
                  :disable="!isEditable"
                  flat
                  icon="search"
                  round
                  size="sm"
                  @click="userListDialogState = true"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-combo
              label="گروه"
              label-width="94px"
              v-model="selectedRevisitAgent.CI_RevisitAgentGroup"
              cdcName="CI_RevisitAgentGroup"
              :m="mode"
              ci-name="CI_RevisitAgentGroup"
              domain-name="CI_SaraM1"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="selectedRevisitAgent.MaxVisit"
              cdcName="MaxVisit"
              :m="mode"
              label="حداکثر تعداد بازدید"
              label-width="94px"
              type="number"
            />
          </FormControl>

          <!-- <safa-securityPanel
          id="e861e113-1538-443d-a12c-a8c5472a8632"
          caption="کد دستگاه"
        > -->
          <FormControl>
            <safa-text
              v-model="selectedRevisitAgent.DeviceCode"
              cdcName="DeviceCode"
              :m="deviceModeSync"
              label="کد دستگاه"
              label-width="94px"
            />
            <!-- </safa-securityPanel> -->
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="selectedRevisitAgent.CreateData"
              cdcName="CreateData"
              :m="mode"
              label="تاریخ ایجاد مأمور"
              label-width="94px"
            />
          </FormControl>
          <FormControl class="flex items-center">
            <safa-checkbox
              label="فعال"
              label-width="94px"
              v-model="selectedRevisitAgent.IsActive"
              cdcName="IsActive"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-securityPanel
              id="cfea7056-1e85-47cd-9d95-caa5ad057d2e"
              caption="ظرفیت پایه کل"
            >
              <safa-text
                v-model="selectedRevisitAgent.CapacityVisit"
                cdcName="CapacityVisit"
                :m="mode"
                label="ظرفیت پایه کل"
                label-width="94px"
                type="number"
              />
            </safa-securityPanel>
          </FormControl>
          <safa-text
            v-model="selectedRevisitAgent.Address"
            cdcName="Address"
            :m="mode"
            class="col-12"
            label="آدرس / توضیحات"
            label-width="94px"
          />
        </FormRow>

        <safa-grid
          id="a42a1f51-4a16-4e68-8631-abb774145855"
          v-model="shRevisitAgentList.Sh_RevisitAgentList"
          cdcName="Sh_RevisitAgentList"
          filterable
          fit
          height="100%"
          helper="shRevisitAgent"
          margin="0"
          max-height="100%"
          min-height="170px"
          paginate
          title="مامورین بازدید"
          m="r"
          :suppressRowClickSelection="false"
          @row:click="handleSelectedRevisitAgentChangedOnGrid"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          :show-new-button="true"
          :showEditButton="hasSelectedRevisitAgent"
          @cancel="loadObj"
          @edit="isEditable = true"
          @newInfo="handleAdd"
          @save="handleSave"
        >
          <template v-show="hasSelectedRevisitAgent">
            <btn-delete v-show="!isEditable" label="حذف" @click="handleRemove" />
            <!-- <btn-default
              v-if="selectedRevisitAgent.IsActive"
              label="غیرفعال سازی"
              @click="handleActiveOrInactive"
            />
            <btn-default
              v-else
              label="فعال سازی"
              @click="handleActiveOrInactive"
            /> -->
          </template>
        </form-actions>
      </template>
    </form-wrapper>
    <safa-popup
      v-model="userListDialogState"
      cdcName="userListDialogState"
      height="600px"
      title="لیست کاربران"
      width="900px"
    >
      <UsersList
        :formKey="formKey"
        :name="name"
        :selectDistrict="baseNosaziCode.District"
        :title="title"
        @selected="handleUserSelectionChanged"
      />
    </safa-popup>
  </safa-form>
</template>
<script>
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import requestModel from "./models/requestModel"
import shRevisitAgentModel from "./models/shRevisitAgent"
import UsersList from "./partials/UsersList"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  components: { UsersList },

  data () {
    return {
      title: "مامورین بازدید",
      formKey: "4275084d-c876-41f6-a14c-ed74d56a2acb",
      name: "URevisitAgents",
      main: true,
      sidebarCompatible: true,

      result: {},
      currentAction: "view",
      doNotMindTheDomain: true,
      userListDialogState: false,
      selectedRevisitAgent: { ...shRevisitAgentModel },
      shRevisitAgentList: { ...requestModel },
      baseNosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      deviceMode: "r",
      allowedAccessID: []
    }
  },

  computed: {
    hasSelectedRevisitAgent () {
      return (
        this.selectedRevisitAgent.NidRevisitAgent &&
        this.selectedRevisitAgent.NidRevisitAgent !==
          "00000000-0000-0000-0000-000000000000"
      )
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    deviceModeSync () {
      if (this.mode === "e" && this.deviceMode === "e") {
        return "e"
      } else if (this.mode === "r" && this.deviceMode === "e") {
        return "r"
      } else if (this.mode === "e" && this.deviceMode === "r") {
        return "r"
      } else {
        return "r"
      }
    }
  },

  async created () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
    }
    await this.loadObj()
    await this.fetchPermissions()
  },

  methods: {
    async loadObj () {
      this.currentAction = "view"
      this.selectedRevisitAgent = { ...shRevisitAgentModel }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitAgentList(
          {
            pJobLocation: this.doNotMindTheDomain
              ? null
              : this.baseNosaziCode.District
          },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.shRevisitAgentList = this.result.data
          this.isEditable = false
          await this.log({
            action: this.logActions.view,
            bizCode: this.baseNosaziCode.District.toString(),
            bizCodeTitle: "منطقه انتخاب شده"
          })
        } else {
          return this.showError("لیست مامورین بازدید بارگذاری نشد")
        }
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
      }
    },

    handleSelectedRevisitAgentChangedOnGrid (e) {
      const row = e.node.data ?? {}
      if (this.currentAction === "view") {
        const { NidRevisitAgent } = row || {}
        this.selectedRevisitAgent =
          this.shRevisitAgentList.Sh_RevisitAgentList.filter(
            (x) => x.NidRevisitAgent === NidRevisitAgent
          )[0] || { ...shRevisitAgentModel }
        this.currentAction = "edit"
      }
      this.selectedRevisitAgent = row
    },
    handleUserSelectionChanged (user) {
      // this.selectedRevisitAgent.NidUser = user.GUID
      // this.selectedRevisitAgent.UserName = user.UserName
      // this.selectedRevisitAgent.Name = user.FirstName
      // this.selectedRevisitAgent.LastName = user.LastName

      // this.selectedRevisitAgent.CI_RevisitAgentGroup = user.CI_RevisitAgentGroup || 0  // نداریم
      // this.selectedRevisitAgent.CrowdSourcingAssingNumber = user.CrowdSourcingAssingNumber || 0
      // this.selectedRevisitAgent.DeviceCode = user.DeviceCode || ""
      // this.selectedRevisitAgent.JobLocation = this.baseNosaziCode.District
      // this.selectedRevisitAgent.LastCrowdSourcingAssingTime = user.LastCrowdSourcingAssingTime || null
      // this.selectedRevisitAgent.JobLocation = user.jobLocation
      // this.selectedRevisitAgent.NidRevisitAgent = user.NidRevisitAgent || "00000000-0000-0000-0000-000000000000"
      // this.selectedRevisitAgent.TmpNidRevisitAgent = user.TmpNidRevisitAgent || null
      // this.selectedRevisitAgent.TmpNidUser = user.TmpNidUser || null
      this.selectedRevisitAgent.UserName = user.username || user.UserName || ""
      this.selectedRevisitAgent.Address = user.address || ""
      this.selectedRevisitAgent.IsActive = user.Enabled || false
      this.selectedRevisitAgent.LastName = user.lastName || user.LastName || ""
      this.selectedRevisitAgent.MaxVisit = user.MaxVisit || 0
      this.selectedRevisitAgent.Name = user.firstName || user.FirstName || ""
      this.selectedRevisitAgent.NidUser =
        user.NidUser || "00000000-0000-0000-0000-000000000000"
      this.selectedRevisitAgent.Phone = user.tel || ""

      this.userListDialogState = false
    },

    handleAdd () {
      this.selectedRevisitAgent = { ...shRevisitAgentModel }
      this.currentAction = "new"
      this.isEditable = true
    },
    handleEdit () {
      if (!this.hasSelectedRevisitAgent) {
        return
      }
      this.currentAction = "edit"
    },
    handleRemove () {
      // if (!this.hasSelectedRevisitAgent) {
      //   return
      // }

      this.showConfirm(
        "آیا از حذف مامور بازدید (" +
          this.selectedRevisitAgent.Name +
          " " +
          this.selectedRevisitAgent.LastName +
          ") مطمئن هستید؟ "
      ).onOk(async () => {
        this.showLoading()
        try {
          const response = await this.$services.SC.deleteRevisitAgent(
            { pNidRevisitAgent: this.selectedRevisitAgent.NidRevisitAgent },
            { config: { District: this.baseNosaziCode.District } }
          )
          this.result = this.getResponse(response.data)
          if (!this.result.success) {
            this.showError("حذف انجام نشد")
            return
          }
          this.showSuccess("با موفقیت حذف شد")

          await this.log({
            action: this.logActions.delete,
            bizCode: this.baseNosaziCode.District.toString(),
            bizCodeTitle: "منطقه انتخاب شده"
          })

          this.loadObj()

          // end
        } catch (e) {
          console.error(e)
          this.showError("خطایی در سرویس رخ دارد")
        } finally {
          this.hideLoading()
        }
      })
    },

    handleActiveOrInactive () {
      this.selectedRevisitAgent.IsActive = !this.selectedRevisitAgent.IsActive
      return this.handleSave()
    },

    async handleSave () {
      this.showLoading()
      try {
        this.selectedRevisitAgent.JobLocation = this.baseNosaziCode.District
        const response = await this.$services.SC.saveRevisitAgent(
          {
            pClsRA: {
              ...this.shRevisitAgentList,
              Sh_RevisitAgentList: null,
              Sh_RevisitAgent: this.selectedRevisitAgent,
              _NidRevisitAgent: this.selectedRevisitAgent.NidRevisitAgent
            },
            pUser: this.currentUser
          },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.result = this.getResponse(response.data)
        if (!this.result.success) {
          this.showError("اطلاعات ذخیره نشد")
          return
        }
        await this.log({
          action: this.logActions.save,
          bizCode: this.baseNosaziCode.District.toString(),
          bizCodeTitle: "منطقه انتخاب شده"
        })
        this.showSuccess("اطلاعات با موفقیت ذخیره شد")
        this.loadObj()
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
      }
    },
    async fetchPermissions () {
      try {
        this.loading = true
        const allowedAccess = await this.$stSecurity.dispatch(
          "security/fetchPermissions",
          {
            parent: "4275084d-c876-41f6-a14c-ed74d56a2acb".toUpperCase(),
            type: ""
          }
        )
        this.allowedAccessID = allowedAccess.filter(
          (f) => f === "E861E113-1538-443D-A12C-A8C5472A8632"
        )
        if (this.allowedAccessID.length > 0) {
          this.deviceMode = "e"
        } else {
          this.deviceMode = "r"
        }
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    changeDistrict () {
      if (this.doNotMindTheDomain === false) {
        this.loadObj()
      }
    }
  },

  watch: {
    doNotMindTheDomain () {
      this.loadObj()
    }
  }
}
</script>
