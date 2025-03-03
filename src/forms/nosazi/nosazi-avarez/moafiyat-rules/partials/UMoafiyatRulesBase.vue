<template>
  <fit>
    <safa-datatable
      ref="grid"
      v-model="formModel.Duty_ExemptionBase"
      :allowCopy='false'
      :allowNewRow='false'
      :allowRemoveRow='false'
      :allowSelect="false"
      :padding="false"
      cdcName="Duty_ExemptionBase"
      height="100%"
      helper="moafiyatRuleBase"
      max-height="100%"
      name="grid"
      title=" معافیت/تخفیف"
      @dbclick="dbclick"
      :allowMultipleSelection="false"
    ></safa-datatable>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import loadBaseDataResponse from '../models/loadBaseDataResponse.js'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      requestResult: {},
      formActionEditMode: 'r',
      formModel: loadBaseDataResponse,
      isShowModal: false
    }
  },
  props: {
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
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
        }).then(async response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: ''
            })
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    dbclick (row) {
      this.$emit('dbclick', row)
    }
  }
}
</script>
