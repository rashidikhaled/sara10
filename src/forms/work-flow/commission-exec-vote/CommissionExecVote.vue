<template>
  <safa-form :id="formKey" :caption="title" appId="ace63a06-e835-457d-a1ea-3b477dd9e69b">
      <form-wrapper :title="title" :padding="false">
     <template #header>
      <safa-status  :result="baseLibResult" />
      <safa-status  :result="saveResult" />
     </template>
        <safa-datatable
          :m="mode"
          v-model="results.CommissionExecVote"
          ref="grid2"
          helper="commissionExecVote"

        ></safa-datatable>
      <template v-slot:footer>
      <form-actions
        :m="mode"
        class="col-12 q-my-sm "
        @edit="isEditable = true"
        @save="save"
        @cancel="isEditable = false"
      ></form-actions>
      </template>
      </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/CommissionExecuteVote',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'اجرای احکام',
      formKey: '91ccd08c-ad22-4afb-9700-0232c64437b1',
      name: 'CommissionExecVote',
      main: true,

      nidWorkItem: '',
      requestDate: '',
      workFlowTitle: '',
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResult: null,
      saveResult: null,
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: [],
        BuildingObj: {},
        Sh_RequestInfo: {},
        MainObj: {}
      },
      ownerName: '',
      oldNosaziCode: '',
      nosaziCode: '',
      nidBase: '',
      nosaziCodeResults: {},
      nosaziCodeResult: null,
      results: { CommissionExecVote: [] }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.loadRequestHeader()
    } else {
      this.showError('هیچ درخواستی از کارتابل انتخاب نشده است.')
    }
  },
  methods: {
    loadRequestHeader () {
      // loadRequestHeader method
      let self = this
      let data = {
        pNidProc: this.selectedRequest.NidProc,
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.loadRequestHeader(data)
        .then(async ({ data }) => {
          self.baseLibResult = this.getResponse(data)

          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })

            this.nosaziCode = self.baseLibResults._NidNosaziCode
            if (self.baseLibResults.Base_Owner.length !== 0) {
              for (var i = 0; i < self.baseLibResults.Base_Owner.length; i++) {
                if (
                  self.baseLibResults.Base_Owner[i].OwnerName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerLastName !== null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerName +
                    ' ' +
                    self.baseLibResults.Base_Owner[i].OwnerLastName +
                    ','
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerLastName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerName + ','
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerLastName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerLastName + ','
                }
              }
            }

            if (self.baseLibResults.Sh_RequestInfo !== null) {
              this.nidWorkItem = self.baseLibResults.Sh_RequestInfo.NidWorkItem
              this.requestDate = self.baseLibResults.Sh_RequestInfo.RequestDate
              this.workFlowTitle =
                self.baseLibResults.Sh_RequestInfo.WorkflowTitel
            }
            this.load()
          }
        })
        .catch(response => {
          // console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    load () {
      this.showLoading()
      let data = {
        pCommission: {
          FormulaErrorCode: 0,
          _NidProc: this.selectedRequest.NidProc,
          IsAnyCommisionInNosaziCode_: false,
          _NidCommission: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SC.getCommissionExecVote(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
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
    save () {
      this.showLoading()
      // console.log(this.results._NidProc)
      let data = { pCommission: this.results }
      this.$services.SC.saveCommissionExecVote(data)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess('عملیات ذخیره سازی با موفقیت انجام شد.')

            await this.log({
              action: this.logActions.save,
              bizCode: this.results._NidProc,
              bizCodeTitle: '_NidProc'
            })

            this.load()
            this.isEditable = false
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
