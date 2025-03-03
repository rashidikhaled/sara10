<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title">
      <safa-status :result="loadResult" />
      <safa-status :result="revokeCoordinatorRes" />
      <safa-status :result="confirmCoordinatorRes" />
      <fit>
        <internal-section title="جستجو">
          <FormRow class="q-mb-sm">
            <FormControl>
              <safa-text
                label="کد مهندس"
                label-width="70px"
                v-model="model.engCoordinator.pIdentityCode"
                @keyup.enter="loadData"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام"
                label-width="70px"
                v-model="model.engCoordinator.pEngName"
                @keyup.enter="loadData"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام خانوادگی"
                label-width="70px"
                v-model="model.engCoordinator.pEngFamily"
                @keyup.enter="loadData"
              />
            </FormControl>
            <FormControl>
              <div class="q-gutter-sm">
                <btn-search @click="loadData" />
                <btn-cancel label="پاک کردن" @click="clearFilter" />
              </div>
            </FormControl>
          </FormRow>
        </internal-section>
        <safa-datatable
          v-model="engCoordinatorList"
          helper="engCoordinatorListColumns"
          fit
          paginate
          hideHeader
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :selectable="false"
          @ConfirmCoordinatorClick="confirmCoordinator"
          @RevokeCoordinatorClick="revokeCoordinator"
          :take="20"
          :pageSize="20"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
const defaultModel = {
  pIdentityCode: "",
  pEngName: "",
  pEngFamily: "",
  pFromRow: 0,
  pToRow: 50
}
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UCoordinatingEngineers",
      title: "مهندسین هماهنگ کننده",
      formKey: "3f99772d-3bb4-4dd8-9e6f-6f59f00c17a6",
      main: true,
      engCoordinatorList: null,
      model: {
        engCoordinator: { ...defaultModel }
      },
      loadResult: null,
      revokeCoordinatorRes: null,
      confirmCoordinatorRes: null
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.showLoading()
      const payload = this.model.engCoordinator
      this.$services.engineers
        .GetRefEngineerCoordinatorList(payload)
        .then(async (response) => {
          this.loadResult = this.getResponse(response.data)
          if (this.loadResult.success) {
            this.engCoordinatorList =
              this.loadResult.data.GetRefEngineerCoordinator_ListResult.RefEngineerCoordinator_List
            await this.log({
              action: this.logActions.view,
              bizCode: this.model.engCoordinator.pIdentityCode
                ? this.model.engCoordinator.pIdentityCode
                : "",
              bizCodeTitle: "کد مهندس"
            })
          }
        })
        .catch((er) => {
          console.error(er, "error_GetRefEngineerCoordinatorList")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    confirmCoordinator (row) {
      this.showLoading()
      const payload = {
        pNidRef: row.dataItem.NidRef,
        pUser: this.currentUser
      }
      this.$services.engineers
        .ConfirmCoordinator(payload)
        .then(async (response) => {
          this.confirmCoordinatorRes = this.getResponse(response)
          if (this.confirmCoordinatorRes.success) {
            this.showSuccess("تایید با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.confirm,
              bizCode: row.dataItem.NidRef,
              bizCodeTitle: "NidRef"
            })
            this.loadData()
          }
        })
        .catch((er) => {
          console.error(er, "err_RevokeCoordinator")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    revokeCoordinator (row) {
      this.showLoading()
      const payload = {
        pNidRef: row.dataItem.NidRef,
        pUser: this.currentUser
      }
      this.$services.engineers
        .RevokeCoordinator(payload)
        .then(async (response) => {
          this.revokeCoordinatorRes = this.getResponse(response)
          if (this.revokeCoordinatorRes.success) {
            this.showSuccess("ابطال با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.cancel,
              bizCode: row.dataItem.NidRef,
              bizCodeTitle: "NidRef"
            })
            this.loadData()
          }
        })
        .catch((er) => {
          console.error(er, "err_RevokeCoordinator")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    clearFilter () {
      this.model.engCoordinator = { ...defaultModel }
      this.loadData()
    }
  }
}
</script>
