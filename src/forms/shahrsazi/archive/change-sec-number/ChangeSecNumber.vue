<template>
  <safa-form
    id="e14bbfbd-d9ea-49e5-b3dd-50d0a2076d6f"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- تغییر شماره دبیرخانه"
  >
    <form-wrapper title="تغییر شماره دبیرخانه">
      <safa-status :result='result'></safa-status>
      <safa-status :result='saveResult'></safa-status>
      <fit>
        <internal-section>
          <div class="row q-gutter-md">
            <safa-text
              v-model="secNumber"
              :label-shrink="false"
              :m="mode"
              cdcName="secNumber"
              class="col-12 col-md-2 col-sm-3"
              dir="ltr"
              label="شماره دبیرخانه"
              @keyup.enter="getShRequest"
            >
            </safa-text>
            <safa-datepicker
              v-model="selectedDate"
              :label-shrink="false"
              :m="mode"
              cdcName="Date"
              class="col-12 col-md-2 col-sm-3"
              label="تاریخ"
            ></safa-datepicker>

            <safa-combo
              v-model="selectedRegion"
              :label-shrink="false"
              :options="regionList"
              :use-input="false"
              cdcName="Region"
              class="col-12 col-md-auto col-sm-3"
              label="منطقه"
              sourceType="local"
            ></safa-combo>
          </div>
        </internal-section>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          editSPId="e09bb240-d907-462e-b429-166aeaf74961"
          editFormId="e14bbfbd-d9ea-49e5-b3dd-50d0a2076d6f"
          @cancel="cancel"
          @edit="isEditable=true"
          @save="save"
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/archive/change-number',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'تغییر شماره دبیرخانه',
      formKey: 'e14bbfbd-d9ea-49e5-b3dd-50d0a2076d6f',
      name: 'ChangeSecNumber',
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
      m: 'r',
      secNumber: '',
      results: { Sh_RequestSec: {} },
      result: null,
      selectedDate: '',
      saveResult: null
    }
  },
  methods: {
    getShRequest () {
      this.selectedDate = ''
      this.showLoading()
      let data = { pSecretariatNo: this.secNumber }
      this.$services.SC.getShRequestSec(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            if (this.results.Sh_RequestSec !== null) {
              this.selectedDate = this.results.Sh_RequestSec.SecDate
            } else {
              this.showError('شماره دبیرخانه یافت نشد.')
            }
          }
        })
        .catch(response => {
          this.serverError()
          console.log('error', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.showLoading()
      this.results.Sh_RequestSec.SecDate = this.selectedDate
      let data = { pSecretariatInfo: this.results }
      this.$services.SC.saveSecretariatDate(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess('ذخیره با موفقیت انجام شد.')
            this.getShRequest()
          }
        })
        .catch(response => {
          this.serverError()
          console.log('error', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.isEditable = false
      this.selectedDate = ''
      this.secNumber = ''
    }
  }
}
</script>
