<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <fit>
    <template #header>
      <safa-status :result="result" />
      <safa-status :result="baseLibResult" />
    </template>
    <nosazi-code-input
      label="کد مبدأ"
      from-request
      v-model="baseNosaziCodeFrom"
      @input="handleBaseNosaziCodeChanged"
      class="q-mb-sm"
    />
    <safa-datatable
      v-model="results.TajmiHistoryList"
      ref="grid2"
      helper="tajmiSearch"
      min-height="100%"
      height="100%"
      max-height="100%"
      fit
      title="کد نوسازی مقصد"
    />
  </fit>
 </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  data: function () {
    return {
      baseNosaziCodeFrom: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseNosaziCodeTo: '',
      results: { TajmiHistoryList: [] },
      nosaziForm: null
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
  mixins: [baseFormMixin],
  methods: {
    handleBaseNosaziCodeChanged () {
      this.showLoading()
      let data = {
        NosaziCodeFrom:
          this.baseNosaziCodeFrom.District +
          '-' +
          this.baseNosaziCodeFrom.Region +
          '-' +
          this.baseNosaziCodeFrom.Block +
          '-' +
          this.baseNosaziCodeFrom.House +
          '-' +
          this.baseNosaziCodeFrom.Building +
          '-' +
          this.baseNosaziCodeFrom.Apartment +
          '-' +
          this.baseNosaziCodeFrom.Shop
      }
      this.showLoading()
      this.$services.SC.getTajmiHistoryList(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
            if (this.results.TajmiHistoryList.length === 0) {
              this.showError('موردی یافت نشد.')
            }
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.nosaziForm = false
      this.$emit('showmTajmiContainer', this.nosaziForm)
    }
  }
}
</script>
