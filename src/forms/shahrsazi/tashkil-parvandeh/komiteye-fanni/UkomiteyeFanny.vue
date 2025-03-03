<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      title="کمیته فنی"
      :padding="false"
      vertical
    >
      <!--    <formHeader  :task-info="taskInfo"/>-->
      <safa-datatable
        v-model="loadResult.data.Sh_TechnicalCommittee"
        helper="shahrsazi.technicalComite"
        :m="m"
        height="100%"
        max-height="100%"
        min-height="100%"
        margin="0"
        :bordered="false"
        title="کمیته فنی"
      />
      <template v-slot:footer>
        <FormActions
          :m="formActionm"
          @edit="isEditable=true"
          @cancel="isEditable=false"
          @save="saveTechnicalCommittee"
          editSPId="c2a91a61-664c-4516-857b-61a378c8eada"
          editFormId="ab3c440b-4dc7-4bb2-b949-fc97bab8ee07"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions'
export default {
  route: '/parvande/komiteye-fanny',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'شهرسازی- کمیته فنی',
      formKey: 'ab3c440b-4dc7-4bb2-b949-fc97bab8ee07',
      name: 'UkomiteyeFanny',
      main: true,
      loadPrequest: {
        pNidProc: ''
      },
      loadResult: {
        data: {
          Sh_TechnicalCommittee: []
        }
      },
      editMode: 'r',
      savePrequest: {
        pTechnicalCommittee: {
          ErrorResult: {
            BizErrors: null,
            Requirements: null
          },
          NidProc: '',
          Sh_TechnicalCommittee: []
        }
      },
      formActionEditMode: 'r'
    }
  },
  components: {
    FormActions
  },
  mounted () {
    this.loadData()
  },
  methods: {
    goToReadonlyMode () {
      this.formActionEditMode = 'r'

      this.editMode = 'r'
    },
    loadData () {
      const isSelected = this.isSelectedRequest()

      if (isSelected) {
        this.showLoading()

        this.loadPrequest.pNidProc = this.selectedRequest.NidProc

        this.$services.SC.getTechnicalCommittee(this.loadPrequest, {
          config: {
            District: this.selectedDistrict
          }
        })
          .then(async response => {
            this.$q.loading.hide()

            this.loadResult = this.getResponse(response.data)

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
          })
          .catch(err => {
            this.serverError()
            console.error(err)
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    saveTechnicalCommittee () {
      this.showLoading()

      this.savePrequest.pTechnicalCommittee.NidProc = this.selectedRequest.NidProc

      this.savePrequest.pTechnicalCommittee.Sh_TechnicalCommittee = this.loadResult.data.Sh_TechnicalCommittee

      this.$services.SC.saveTechnicalCommittee(this.savePrequest, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async response => {
          if (response.data.BizErrors === null) {
            this.showSuccess('عملیات با موفقیت انجام شد')

            await this.log({
              action: this.logActions.save,
              bizCode: this.loadPrequest.pNidProc,
              bizCodeTitle: 'pNidProc',
              nosaziCode: this.selectedRequest.BizCode
            })

            this.goToReadonlyMode()

            this.loadData()
          }
        })
        .catch(err => {
          this.serverError()
          console.error('saveTechnicalCommittee error', err)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
