<template>
  <fit style="flex:1">
    <FormRow class="q-ma-sm q-px-sm">
      <FormControl>
        <safa-text
          label="نام گروه ساختمانی"
          label-width="100px"
          class="col-md-3"
          m="r"
          v-model="model.BuildingGroupName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="سال کاری"
          label-width="100px"
          class="col-md-3"
          m="r"
          v-model="model.CI_Years"
        />
      </FormControl>
    </FormRow>
    <safa-datatable
      helper="groupBuildingDetails"
      :m="mode"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      show-selected-checkbox
      paginate
      v-model="loadRefBuildingEngReq.Ref_BuildingEngReq"
      class="q-px-sm"
    />
    <form-actions
      :m="mode"
      @edit="isEditable = true"
      @save="saveData"
      @cancel="isEditable = false"
      class="q-px-sm"
    >
    </form-actions>
  </fit>

</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  components: {},
  mixins: [baseFormMixin],
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    formKey: String,
    title: String
  },
  data () {
    return {
      name: "CompetentConstructionGroupsDetails",
      loadRefBuildingEngReq: {
        NidBuildingGroup: "",
        Ref_BuildingEngReq: []
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.showLoading()
      let payLoad = {
        pNidBuildingGroup: this.model.NIdBuildingGroup
      }
      this.$services.engineers
        .loadRefBuildingEngReq(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.loadRefBuildingEngReq =
              response.data.LoadRef_BuildingEngReqResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.model.NIdBuildingGroup,
              bizCodeTitle: "NIdBuildingGroup"
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
        pObj: {
          NidBuildingGroup: this.model.NIdBuildingGroup,
          Ref_BuildingEngReq: this.loadRefBuildingEngReq.Ref_BuildingEngReq
        }
      }
      this.$services.engineers
        .saveRefBuildingEngReq(payLoad)
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
    }
  }
}
</script>
