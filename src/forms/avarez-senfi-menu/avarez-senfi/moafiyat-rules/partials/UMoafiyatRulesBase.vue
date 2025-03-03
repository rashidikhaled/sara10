<template>
  <fit>
    <safa-datatable
      v-model="formModel.Duty_ExemptionBase"
      ref="grid"
      name="grid"
      helper="moafiyatRuleBase"
      @dbclick="dbclick"
      :allowNewRow="false"
      :allowRemoveRow="false"
      :allowCopy="false"
      :allowSelect="false"
      height="100%"
      max-height="100%"
      :padding="false"
      title=" معافیت/تخفیف"
      cdcName="Duty_ExemptionBase"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
import loadBaseDataResponse from "../models/loadBaseDataResponse.js"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      requestResult: null,
      formActionEditMode: "r",
      formModel: loadBaseDataResponse,
      isShowModal: false
    }
  },
  props: {
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      try {
        this.showLoading()

        this.$services.SB.getDutyExemptionBase(null, {
          config: {
            District: this.selectedDistrict
          }
        }).then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    dbclick (event, dataItem, target) {
      this.$emit("dbclick", dataItem)
    }
  }
}
</script>
