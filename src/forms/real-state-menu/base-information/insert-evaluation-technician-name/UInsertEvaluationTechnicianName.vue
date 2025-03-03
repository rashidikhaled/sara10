<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getCIEvaluationTechnicianNameRes" />
        <safa-status :result="saveCIEvaluationTechnicianNameRes" />
      </template>
      <fit>
        <safa-grid
          v-model="technicianList.CI_EvaluationTechnician_Name"
          cdcName="CI_EvaluationTechnician_Name"
          :columns="technicianColumns"
          height="100%"
          max-height="100%"
          min-height="200px"
          fit
          :m="mode"
          paginate
        />
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        >
        </form-actions>
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
      title: "وارد کردن اطلاعات کارشناس",
      formKey: "E253A1B6-5739-4445-80E9-488F9385BC9B",
      name: "UInsertEvaluationTechnicianName",
      main: true,
      technicianColumns: [
        {
          title: "کد نام کارشناس",
          field: "ID"
        },
        {
          title: "نام کارشناس",
          field: "Title"
        },
        {
          title: "نوع کارشناس",
          field: "CI_TechnicianType",
          editor: "combo",
          domain: "Estate"
        }
      ],
      technicianList: {},
      NIdRequest: "00000000-0000-0000-0000-000000000000",

      // services
      getCIEvaluationTechnicianNameRes: null,
      saveCIEvaluationTechnicianNameRes: null
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {}
      this.$services.ES.getCIEvaluationTechnicianName(payload)
        .then(async ({ data }) => {
          this.getCIEvaluationTechnicianNameRes = this.getResponse(data)
          if (this.getCIEvaluationTechnicianNameRes.success) {
            this.technicianList =
              this.getCIEvaluationTechnicianNameRes.data.GetCI_EvaluationTechnician_NameResult
            this.NIdRequest = this.technicianList._NIdRequest
            await this.log({
              action: this.logActions.view,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NIdRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: ""
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
      const payload = {
        PObj: this.technicianList
      }
      this.$services.ES.saveCIEvaluationTechnicianName(payload)
        .then(async ({ data }) => {
          this.saveCIEvaluationTechnicianNameRes = this.getResponse(data)
          if (this.saveCIEvaluationTechnicianNameRes.success) {
            this.isEditable = false
            this.loadObj()
            await this.log({
              action: this.logActions.save,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NIdRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: `ذخیره اطلاعات فرم وارد کردن اطلاعات کارشناس برای شماره درخواست ${this.NIdRequest} انجام گردید.`
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
    }
  }
}
</script>
