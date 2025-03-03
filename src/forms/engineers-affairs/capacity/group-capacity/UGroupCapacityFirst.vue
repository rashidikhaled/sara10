<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper
      :title="title"
      vertical
    >
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="سال"
            label-width="60px"
            class="col-md-3"
            ciName="CI_Years"
            domainName="engineer"
            v-model="getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota.CI_Years"
          />
        </FormControl>
        <FormControl>
          <btn-default
            label="نمایش"
            @click="loadData"
          />
        </FormControl>
      </FormRow>
      <safa-datatable
        :helper="groupCapacity"
        :m="mode"
        fit
        height="100%"
        max-height="100%"
        min-height="200px"
        show-selected-checkbox
        allowMultipleSelection
        v-model="getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota.Qta_GroupStudyFieldQuota"
        @selectedChange="selectedChange"
      />
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveData"
          @cancel="isEditable = false"
        >
          <template v-slot:after>
            <btn-default
              label="اعمال سهمیه اول دوره"
              @click="acceptQtaGroup"
              v-if="!isEditable"
            />
            <btn-default
              @click="acceptQtaGroupFiltered"
              label="اعمال سهمیه بر روی موارد انتخاب شده"
            />
          </template>
        </form-actions>
      </template>
    </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  components: {},
  mixins: [baseFormMixin],
  props: {},
  data () {
    return {
      title: "ظرفیت گروهی",
      formKey: "fa1c509c-9e10-4a84-a564-b2df0657f8d6",
      name: "UGroupCapacity",
      main: true,
      selectedRows: [],
      getQtaGroupDetailResult: {
        CI_RequestType: "0",
        CI_Years: "0",
        ClsQta_GroupStudyFieldQuota: {
          CI_Years: "1399",
          Qta_GroupStudyFieldQuota: []
        }
      }
    }
  },
  methods: {
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: "0",
          CI_Years:
            this.getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota.CI_Years
        }
      }
      this.$services.engineers
        .getQtaGroupDetail(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.getQtaGroupDetailResult =
              response.data.GetQtaGroupDetailResult
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: "0",
          CI_Years: "0",
          ClsQta_GroupStudyFieldQuota:
            this.getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota
        }
      }
      this.$services.engineers
        .saveQtaGroupDetail(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.showSuccess("عملیات با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: ""
            })
            this.isEditable = false
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    acceptQtaGroup () {
      this.showConfirm("آیا سهمیه اول دوره تمامی مهندسین اعمال شود؟").onOk(
        () => {
          this.saveAcceptQtaGroup()
        }
      )
    },
    saveAcceptQtaGroup () {
      this.showLoading()
      let payLoad = {
        pYear:
          this.getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota.CI_Years
      }
      this.$services.engineers
        .saveAcceptQtaGroup(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.data.SaveAcceptQtaGroupResult) {
            this.showSuccess("عملیات با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.save,
              bizCode:
                this.getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota
                  .CI_Years,
              bizCodeTitle: "CI_Years"
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    acceptQtaGroupFiltered () {
      if (this.selectedRows.length === 0) {
        this.showError('سطری انتخاب نشده است.')
        return
      }
      this.showConfirm(
        "آیا سهمیه اول دوره تمامی مهندسین دسته های انتخاب شده اعمال شود؟"
      ).onOk(() => {
        this.saveAcceptQtaGroupFiltered()
      })
    },
    saveAcceptQtaGroupFiltered () {
      this.showLoading()
      let payLoad = {
        pObj: {
          CI_Years: this.getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota.CI_Years,
          SelectedQtaGroupStudyFieldQuotaList: this.selectedRows
        }
      }
      this.$services.engineers
        .saveAcceptQtaGroupFiltered(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.data.SaveAcceptQtaGroupFilteredResult) {
            this.showSuccess("عملیات با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.save,
              bizCode:
                this.getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota
                  .CI_Years,
              bizCodeTitle: "CI_Years"
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.selectedRows = e.selectedItems
    }
  }
}
</script>
