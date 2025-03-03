<template>
  <!-- <fit> -->
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      vertical
      title="نامه های صادره"
      :padding="false"
    >
      <safa-status :result="result" />
      <safa-datatable
        v-model="currentData.Sh_Communication"
        :m="mode"
        helper="shCommunication"
        fit
        :bordered="false"
        max-height="100%"
        height="100%"
        minHeight="100%"
        title="نامه ها"
      />
      <template v-slot:footer>
        <!--Security form action-->
        <FormActions
          :m="mode"
          editSPId="13f0ccb3-0ab6-4fae-981f-28a1e1892b31"
          editFormId="cc75340c-dded-48d0-b424-8bbbf654d876"
          @cancel="load"
          @edit="isEditable = true"
          @save="handleSave"
        ></FormActions>
      </template>
    </form-wrapper>
  </safa-form>
  <!-- </fit> -->
</template>
<script>
import requestModel from './models/request'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/export-letters',
  mixins: [baseFormMixin],
  main: true,
  data () {
    return {
      result: null,
      baseNosaziCode: {},
      currentData: { ...requestModel },
      title: 'شهرسازی- نامه های صادره',
      formKey: 'cc75340c-dded-48d0-b424-8bbbf654d876',
      name: 'UExportLetters',
      main: true
    }
  },

  methods: {
    normalizeCommunication () {
      return this.currentData.Sh_Communication.map(m => {
        return {
          ...m,
          ReportCode: m.ReportCode || null,
          ReportName: m.ReportName || null,
          ReportTitle: m.ReportTitle || null
        }
      })
    },
    handleSave () {
      this.showLoading()
      this.currentData.Sh_Communication = this.normalizeCommunication()
      this.$services.SC.saveCommunication({
        pCommunication: this.currentData,
        pNidProc: this.selectedRequest.NidProc
      })
        .then(async ({ data }) => {
          this.resultSave = this.getResponse(data)
          if (this.resultSave.success) {
            this.showSuccess('ذخیره باموفقیت انجام شد')

            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })

            this.load()
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    load () {
      this.isEditable = false
      if (this.selectedRequest === null) {
        this.showError('درخواستی انتخاب نشده است.')
        return
      }

      this.showLoading()
      this.$services.SC.loadCommunication({
        pNidProc: this.selectedRequest.NidProc
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.currentData = this.result.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
          } else {
            this.showError('اطلاعات بارگذاری نشد')
          }
        })
        .finally(() => {
          this.hideLoading()
          this.loading = false
        })
    }
  },
  created () {
    this.currentData = { ...requestModel }
  },
  mounted () {
    this.load()
  }
}
</script>
