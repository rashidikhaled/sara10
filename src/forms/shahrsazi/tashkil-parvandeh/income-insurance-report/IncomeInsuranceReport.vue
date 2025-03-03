<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      title="گزارش بیمه درآمد"
      vertical
    >
      <safa-status :result="baseLibResult" />
      <div class="row q-col-gutter-md">
        <div class="col-md-3">
          <safa-text
            label="شماره درخواست"
            v-model="nidWorkItem"
          />
        </div>
        <div class="col-md-3">
          <safa-combo
            label="منطقه"
            sourceType="local"
            :use-input="false"
            :options="regionList"
            v-model="selectedRegion"
          ></safa-combo>
        </div>
      </div>
      <template v-slot:footer>
        <btn-default
          label="گزارش"
          @click="report"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  route: '/income-insurance-report',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'شهرسازی- گزارش بیمه درآمد',
      formKey: 'a4b6dad0-8daf-46e5-a5c8-6084f1abbb2f',
      name: 'IncomeInsuranceReport',
      main: true,
      regionList: [
        { ID: 0, Title: '1' },
        { ID: 1, Title: '2' },
        { ID: 2, Title: '3' },
        { ID: 3, Title: '4' },
        { ID: 4, Title: '5' },
        { ID: 5, Title: '6' }
      ],
      selectedRegion: 0,
      baseLibResults: {},
      baseLibResult: null,
      nidWorkItem: null
    }
  },
  methods: {
    report () {
      if (this.nidWorkItem !== null) {
        this.getBaseLibInNosaziCode()
      } else {
        this.showError('لطفا شماره درخواست را وارد نمایید.')
      }
    },
    getBaseLibInNosaziCode () {
      this.showLoading()
      let self = this
      let payload = { pNidWorkItem: this.nidWorkItem }
      this.$services.SA.getBaseLibInNidWorkItem(payload, {
        config: { District: this.selectedRegion + 1 }
      })
        .then(async ({ data }) => {
          self.baseLibResult = self.getResponse(data)
          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: payload.pNidWorkItem,
              bizCodeTitle: 'NidWorkItem'
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
