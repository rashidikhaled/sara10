<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="26E7876C-210C-4D2D-93EF-16DEA5DA4544"
  >
    <form-wrapper :title="title" :padding="false">
      <fit>
        <safa-datatable
          fit
          helper="referenceToLegalExpert"
          v-model="ReferenceToLegalExpertList"
          cdcName="ReferenceToLegalExpertList"
          m="r"
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "درخواست های ارجاع شده به کارشناس حقوقی",
      name: "URequestsReferredToLegalExpert",
      formKey: "66e7866c-210c-4d2d-93ef-16dea5da4169",
      main: true,
      ReferenceToLegalExpertList: []
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.isEditable = false
      this.showLoading()
      const payload = {
        PRequest: {
          NIDCommission: "00000000-0000-0000-0000-000000000000",
          NIDVote: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.commissions
        .getCommissionRefrenceToLegalExpert(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.ReferenceToLegalExpertList =
              res.data.GetCommissionRefrenceToLegalExpertResult.ReferenceToLegalExpertList
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
