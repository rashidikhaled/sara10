<template>
  <safa-form :id="formKey" :caption="title" appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE">
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="resLoadObj" />
        <safa-status :result="resSaveObj" />
      </template>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="سال"
            label-width="40px"
            ciName="CI_Years"
            domainName="engineer"
            v-model="getRefBuildingGroupResult.CI_Years"
          />
        </FormControl>
        <FormControl>
          <btn-default label="نمایش" @click="loadObj" />
        </FormControl>
      </FormRow>
      <safa-grid
        helper="groupBuilding"
        :m="mode"
        fit
        height="100%"
        max-height="100%"
        min-height="200px"
        show-selected-checkbox
        v-model="
          getRefBuildingGroupResult.ClsRef_BuildingGroup.Ref_BuildingGroup
        "
      />
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="onEdit"
          @save="saveObj"
          @cancel="isEditable = false"
        >
        </form-actions>
      </template>
      <safa-popup title="" vertical v-model="showDetails">
        <CompetentConstructionGroupsDetails
          :name="name"
          :title="title"
          :formKey="formKey"
          :model="selectedRow"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import CompetentConstructionGroupsDetails from "./partials/CompetentConstructionGroupsDetails"
export default {
  components: { CompetentConstructionGroupsDetails },
  mixins: [baseFormMixin],
  props: {},
  data () {
    return {
      title: "گروه های ساختمانی ذیصلاح",
      formKey: "8B1A8554-3F78-454E-ABF1-B5AE5B8335B0",
      name: "UCompetentConstructionGroups",
      main: true,

      // edit
      showEditMessage: true,

      // popupDetailsButton
      selectedRow: {},
      showDetails: false,

      // grid
      getRefBuildingGroupResult: {
        CI_RequestType: 0,
        CI_Years: 0,
        ClsRef_BuildingGroup: {
          Ref_BuildingGroup: [],
          NIdBuildingGroup: "00000000-0000-0000-0000-000000000000"
        }
      },

      // res services
      resLoadobj: null,
      resSaveObj: null
    }
  },
  methods: {
    onEdit () {
      if (this.showEditMessage) {
        this.showError(
          "ابتدا دکمه نمایش را بزنید تا اطلاعات نمایش داده شود و سپس ویرایش کنید."
        )
      } else {
        this.isEditable = true
      }
    },
    loadObj () {
      if (this.getRefBuildingGroupResult.CI_Years === 0) {
        this.showError("لطفا سال را وارد نمایید.")
        return
      }
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_Years: this.getRefBuildingGroupResult.CI_Years
        }
      }
      this.$services.engineers
        .getRefBuildingGroup(payLoad)
        .then(({ data }) => {
          this.resLoadobj = this.getResponse(data)
          if (this.resLoadobj.success) {
            this.showEditMessage = false
            this.getRefBuildingGroupResult =
              this.resLoadobj.data.GetRef_BuildingGroupResult
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
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
    saveObj () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: "0",
          CI_Years: "0",
          ClsRef_BuildingGroup:
            this.getRefBuildingGroupResult.ClsRef_BuildingGroup
        }
      }
      this.$services.engineers
        .saveRefBuildingGroup(payLoad)
        .then(async ({ data }) => {
          this.resSaveObj = this.getResponse(data)
          if (this.resSaveObj.success) {
            this.showSuccess("عملیات با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: ""
            })
            this.isEditable = false
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
    handleShowDetail (row) {
      this.selectedRow = { ...row }
      this.showDetails = true
    }
  }
}
</script>
