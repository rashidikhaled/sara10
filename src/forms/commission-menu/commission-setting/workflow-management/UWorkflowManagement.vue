<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
    <FormWrapper :title="title">
      <safa-status :result="deleteUserAccessRes" />
      <safa-status :result="getAllStateRes" />
      <safa-status :result="saveObjRes" />
      <safa-status :result="getUserInfoRes" />
      <safa-status :result="getUserAllStateRes" />
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="کاربر"
              label-width="60px"
              :options="allUsers"
              source-type="local"
              v-model="nidUser"
              cdcName="nidUser"
            />
          </FormControl>
          <FormControl>
            <btn-search @click="getUserAllState" />
          </FormControl>
        </FormRow>
        <FormRow>
          <FormControl class="row q-mb-sm">
            <safa-combo2
              type="multiple"
              label="منطقه"
              label-width="60px"
              v-model="regions"
              cdcName="regions"
              ciName="CI_Region"
              domainName="Commission100"
              class="col-12"
            />
          </FormControl>
          <FormControl class="row q-mb-sm">
            <safa-combo2
              type="multiple"
              label="نوع پرونده"
              label-width="60px"
              v-model="commissions"
              cdcName="commissions"
              ciName="CI_CommissionType"
              domainName="Commission100"
              class="col-12"
            />
          </FormControl>
          <FormControl class="row q-mb-sm">
            <safa-combo2
              type="multiple"
              label="مرحله"
              label-width="60px"
              v-model="selectedState"
              cdcName="selectedState"
              :options="states"
              source-type="local"
              class="col-12"
              ref="stateRef"
            />
          </FormControl>
          <FormControl>
            <btn-new label="اضافه" @click="addRow" class="q-mr-sm" />
          </FormControl>
        </FormRow>
        <safa-grid
          v-model="model.UserState"
          cdcName="UserState"
          helper="UserStates"
          :m="mode"
          fit
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="true"
          @selectedChange="selectedChange"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          ref="userStateRef"
        />
      </fit>
      <!-- <div class="row q-mb-sm">
          <safa-combo2
            type="multiple"
            label="منطقه"
            label-width="60px"
            v-model="regions"
            cdcName="regions"
            ciName="CI_Region"
            domainName="Commission100"
            class="col-12"
          />
        </div>
        <div class="row q-mb-sm">
          <safa-combo2
            type="multiple"
            label="نوع پرونده"
            label-width="60px"
            v-model="commissions"
            cdcName="commissions"
            ciName="CI_CommissionType"
            domainName="Commission100"
            class="col-12"
          />
        </div>
        <div class="row q-mb-sm">
          <safa-combo2
            type="multiple"
            label="مرحله"
            label-width="60px"
            v-model="selectedState"
            cdcName="selectedState"
            :options="states"
            source-type="local"
            class="col-12"
            ref="stateRef"
          />
        </div>
          <btn-new label="اعمال تغییرات" @click="addRow" class="q-mr-sm" />
          <btn-delete label="انصراف" @click="ShowAllState = false" /> -->
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template #after v-if="!isEditable">
            <!-- <btn-new label="افزودن" @click="newInfo" /> -->
            <btn-delete label="حذف" @click="deleteData" />
          </template>
        </form-actions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { uid } from "quasar"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "مديريت گردش کار",
      name: "UWorkflowManagement",
      formKey: "b00f4ffd-08b3-43d9-b68a-c82977071425",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      // Var
      ShowAllState: false,
      nidUser: null,
      district: null,
      commissionFileType: null,
      regions: [],
      commissions: [],
      selectedState: [],
      allUsers: [],
      states: [],
      state: null,

      // Res
      getAllStateRes: null,
      saveObjRes: null,
      getUserInfoRes: null,
      getUserAllStateRes: null,
      deleteUserAccessRes: null,
      deleteState: null,

      // model
      model: {
        UserState: []
      }

      // userStatesColumns: [
      //   {
      //     field: "CI_Region",
      //     title: "منطقه",
      //     editor: "combo",
      //     domain: "Commission100",
      //     width: "200px"
      //   },
      //   {
      //     field: "CI_CommissionType",
      //     title: "نوع پرونده",
      //     editor: "combo",
      //     domain: "Commission100",
      //     width: "200px"
      //   },
      //   {
      //     field: "TaskTitle",
      //     title: "مرحله",
      //     width: "200px",
      //     isEditable: false
      //   },
      //   {
      //     field: "CanGetFile",
      //     title: "دریافت پرونده",
      //     width: "auto",
      //     editor: "checkbox"
      //   }
      // ],
    }
  },

  mounted () {
    this.getUserInfo()
    this.getAllState()
  },

  methods: {
    async getUserInfo () {
      this.showLoading()
      this.$services.commissions
        .getUserInfo()
        .then(async ({ data }) => {
          this.getUserInfoRes = this.getResponse(data)
          if (this.getUserInfoRes.success) {
            const list = []
            list.push(
              ...this.getUserInfoRes.data.GetUserInfoResult.UserInfo.map(
                (item) => {
                  let r = {}
                  r.ID = item.NidUser
                  r.Title = item.Name
                  return r
                }
              )
            )
            this.allUsers = list
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات در  ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async getUserAllState () {
      if (!this.nidUser) return this.showError("لطفا یک کاربر انتخاب نمایید.")
      this.showLoading()
      const payload = { PRequest: { NidUser: this.nidUser } }
      try {
        const { data } = await this.$services.commissions.getUserAllState(
          payload
        )
        this.getUserAllStateRes = this.getResponse(data)
        if (this.getUserAllStateRes.success) {
          this.model =
            this.getUserAllStateRes.data.GetUserAllStateResult.UserStates
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async getAllState () {
      this.showLoading()
      await this.$services.commissions
        .getAllState()
        .then(({ data }) => {
          this.getAllStateRes = this.getResponse(data)
          if (this.getAllStateRes.success) {
            this.model = this.getAllStateRes.data.GetAllStateResult
            this.states = this.getAllStateRes.data.GetAllStateResult.map(
              (item) => {
                let r = { ...item }
                r.ID = item.NidTaskState
                r.Title = item.TaskTitle
                return r
              }
            )
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    isInternalValidation () {
      if (this.regions.length === 0) {
        this.showError("لطفا منطقه را انتخاب نمایید")
        return false
      }
      if (this.commissions.length === 0) {
        this.showError("لطفا کمیسیون را انتخاب نمایید")
        return false
      }
      if (this.selectedState.length === 0) {
        this.showError("لطفا مرحله را انتخاب نمایید")
        return false
      }
      return true
    },
    saveObj () {
      if (!this.isValidForm()) return

      this.showLoading()
      this.$services.commissions
        .saveUserAccess({
          PRequest: { UserStates: { ...this.model } }
        })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")
            await this.log({
              action: this.logActions.save,
              bizCode: this.nidUser,
              bizCodeTitle: "NidUser",
              saveDesc: `ذخیره اطلاعات در ${this.title} انجام گردید.`
            })
            this.getUserAllState()
            this.isEditable = false
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // newInfo () {
    //   this.ShowAllState = true
    // },
    addRow () {
      if (!this.nidUser) return this.showError("لطفا یک کاربر انتخاب نمایید.")
      if (!this.isValidForm()) return
      if (!this.isInternalValidation()) return
      let newRow = {}
      let userStatetemp = []
      this.$refs.stateRef.selectedItems.forEach((s) => {
        this.regions.forEach((r) => {
          this.commissions.forEach((c) => {
            if (
              !this.model.UserState.some(
                (f) =>
                  f.CI_CommissionType === c &&
                  f.CI_Region === r &&
                  f.NidTaskState === s.NidTaskState &&
                  f.CommissionState === s.CommissionState
              )
            ) {
              newRow = {
                CI_CommissionType: c,
                CI_Region: r,
                CanGetFile: false,
                CommissionState: s.CommissionState,
                Nid: uid(),
                NidTaskState: s.NidTaskState,
                NidUser: this.nidUser,
                NidSort: s.NidSort,
                // NidTaskState: this.state,
                // CommissionState: "Commission1",
                // NidSort: this.model.UserState.length + 1,
                // TaskTitle: this.states.find((item) => item.ID === this.state).Title,
                TaskTitle: s.TaskTitle
              }
              // this.model.UserState.push({ ...newRow })
              userStatetemp.push({ ...newRow })
            }
          })
        })
      })
      console.log(userStatetemp)
      this.model.UserState = this.model.UserState.concat(userStatetemp)
      this.ShowAllState = false
      this.reset()
      this.saveObj()
    },
    reset () {
      this.commissionFileType = 0
      this.state = ""
      this.district = 0
    },
    selectedChange (e) {
      this.deleteState = e.selectedItems
    },
    deleteData () {
      this.showConfirm("آیا از حذف اطمینان دارید؟").onOk(() => {
        this.deleteUserAccess()
      })
    },
    deleteUserAccess () {
      let selectedUserState =
        this.$refs.userStateRef.gridApi.getSelectedRows() ?? []
      if (selectedUserState.length === 0) {
        this.showError("لطفا یک سطر را انتخاب نمایید")
        return
      }
      this.showLoading()
      this.$services.commissions
        .deleteUserAccess({
          PRequest: {
            UserStates: {
              NidUser: this.nidUser,
              UserState: selectedUserState,
              CommissionStatus: 0
            }
          }
        })
        .then(async ({ data }) => {
          this.deleteUserAccessRes = this.getResponse(data)
          if (
            this.deleteUserAccessRes.success &&
            this.deleteUserAccessRes.data.DelUserAccessResult
          ) {
            this.showSuccess("حذف با موفقیت انجام شد")
            await this.log({
              action: this.logActions.delete,
              bizCode: this.nidUser,
              bizCodeTitle: "NidUser",
              saveDesc: `حذف اطلاعات در ${this.title} انجام گردید.`
            })
            this.getUserAllState()
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }

  // computed: {
  //   userStatesColumns() {
  //     return [
  //       {
  //         field: "CI_Region",
  //         title: "منطقه",
  //         editor: "combo",
  //         domain: "Commission100",
  //         width: "200px",
  //         validations: "required,number",
  //       },
  //       {
  //         field: "CI_CommissionType",
  //         title: "نوع پرونده",
  //         editor: "combo",
  //         domain: "Commission100",
  //         width: "200px",
  //         validations: "required,number",
  //       },
  //       {
  //         field: "TaskTitle",
  //         title: "مرحله",
  //         width: "200px",
  //         validations: "required,number",
  //       },
  //       // {
  //       //   field: "TaskTitle",
  //       //   title: "مرحله",
  //       //   width: "200px",
  //       //   validations: "required,number",
  //       // },
  //       // {
  //       //   field: "SelectState",
  //       //   title: " انتخاب مرحله",
  //       //   width: "200px",
  //       // },
  //       {
  //         field: "CanGetFile",
  //         title: "دریافت پرونده",
  //         editor: "checkbox",
  //         width: "100px",
  //       },
  //     ];
  //   },
  // },
}
</script>
