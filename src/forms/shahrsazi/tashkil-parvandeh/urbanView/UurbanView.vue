<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      vertical
      :hasFooter="false"
      title="نمای شهری"
      :padding="false"
    >
      <safa-status :result="requestResult"></safa-status>
      <fit>
        <safa-datatable
          v-model="formData.Sh_UrbanView"
          helper="UrbanView"
          height="100%"
          max-height="100%"
          min-height="100%"
          margin="0"
          title="نمای شهری"
          :bordered="false"
          fit
          :m="mode"
        ></safa-datatable>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable= true"
          @cancel="isEditable= false"
          @save="SaveUrbanView"
        >
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'نمای شهری',
      formKey: 'b006abfb-55ae-4ba5-9420-2dd824187d3c',
      name: 'UurbanView',
      main: true,
      // Sh_UrbanView: { Sh_UrbanView: [] },
      formData: {
        Sh_UrbanView: []
      },
      // pRequest: {
      //   Sh_UrbanView: [
      //     {
      //       CI_UrbanView: '',
      //       CI_UrbanViewDetailes: '',
      //       Comments: '',
      //       EumConfirm: '',
      //       NidProc: '00000000-0000-0000-0000-000000000000',
      //       NidUrbanView: '00000000-0000-0000-0000-000000000000'
      //     }
      //   ]
      // },
      requestResult: []
    }
  },
  mounted () {
    this.Load()
  },
  methods: {
    Load () {
      if (!this.selectedRequest) {
        return this.showError('هیچ درخواستی از کارتابل انتخاب نشده است')
      }
      this.showLoading()
      let payload = {
        pNidProc: this.selectedNidProc
      }
      this.$services.SC.getUrbanView(payload,
        {
          config: {
            District: this.selectedDistrict
          }
        })
        .then(async (response) => {
          this.requestResult = this.getResponse(response)
          if (this.requestResult.success) {
            this.formData = this.getResponse(response).data.data
            console.log('form-data', this.formData)
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.bizCode
            })
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    SaveUrbanView () {
      this.showLoading()
      this.formData.Sh_UrbanView = this.normalizeformData()
      let payload = {
        pUrbanView: {
          ErrorResult: {
            BizErrors: null,
            Requirements: null
          },
          Sh_UrbanView: { Sh_UrbanView: this.formData.Sh_UrbanView }
        },
        pNidProc: this.selectedNidProc
      }
      this.$services.SC.SaveUrbanView(payload,
        {
          config: {
            District: this.selectedDistrict
          }
        })
        .then(async (response) => {
          this.requestResult = this.getResponse(response)
          if (this.requestResult.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد.')
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.bizCode
            })
          }
          this.Load()
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeformData () {
      return this.formData.Sh_UrbanView.map((m) => {
        return {
          ...m,
          NidProc: m.NidProc || '00000000-0000-0000-0000-000000000000',
          NidUrbanView:
            m.NidUrbanView || '00000000-0000-0000-0000-000000000000',
          CI_UrbanViewDetailes: m.CI_UrbanViewDetailes || 0
        }
      })
    }
  }
}
</script>
