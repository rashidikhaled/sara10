<template>
  <section>
    <form-wrapper
      :title="title"
    >
      <div class="row q-col-gutter-lg">
        <div class="col-12">
          <safa-datatable
            helper="amlakControl"
            v-model="loadDataResult.Sh_EstateControl"
            :m="mode"
          />
        </div>

        <div class="col-12">
          <text-template label="توضیحات"
                         formKey="10278357-9286-4db6-be10-3affb217095e"
                         :m="mode"
                         v-if="loadDataResult.Sh_EstateControl.length === 0"
          />
        </div>

        <div class="col-12">
        <text-template label="توضیحات"
                       formKey="10278357-9286-4db6-be10-3affb217095e"
                       :m="mode"
                       v-model="loadDataResult.Sh_EstateControl[0].TechnicalComments"
                       v-if="loadDataResult.Sh_EstateControl.length > 0"
        />
        </div>
      </div>

      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable=true"
          @cancel="isEditable=false"
          @save="saveData"
        >
        </FormActions>
      </template>
    </form-wrapper>
  </section>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/work-flow/amlak-control',
  mixins: [baseFormMixin],
  data () {
    return {
      formKey: '10278357-9286-4db6-be10-3affb217095e',
      saveDataPrequest: {
        'pObj': {
          'ErrorResult': {
            'BizErrors': [],
            'Requirements': null
          },
          'Sh_EstateControl': [],
          'Sh_RequestInfoList': [],
          '_NidProc': '269df9f0-5348-4466-903f-2cb17025ab8f'
        },
        'pNidProc': '269df9f0-5348-4466-903f-2cb17025ab8f',
        'pDtoWorkflowData': {
          'StateName': 'baea57df-4bb2-4ba2-956b-1617ba73a85d',
          'WorkflowGuid': '5ca8477d-2a3a-4962-9c63-a8690ff8975c'
        }
      },
      loadDataResult: {},
      name: 'UAmlakControl',
      title: 'کنترل املاک',
      items: [],
      loadDataPRequest: {
        pNidProc: ''
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    saveData () {
      this.showSending()

      this.saveDataPrequest.pObj.Sh_EstateControl = this.loadDataResult.Sh_EstateControl

      this.$services.SC.saveEstateControl(this.saveDataPrequest)
        .then(({ data }) => {
          if (data.ErrorResult.BizErrors.length === 0) {
            this.loadData()

            this.isEditable = false

            this.showSuccess('اطلاعات با موفقیت ذخیره شد')
          }
        })
        .catch(err => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideSending()
        })
    },
    loadData () {
      this.showLoading()

      this.loadDataPRequest.pNidProc = this.selectedRequest.NidProc

      this.$services.SC.getEstateControl(this.loadDataPRequest)
        .then(({ data }) => {
          this.loadDataResult = data
        })
        .catch(err => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>

<style scoped>

</style>
