<template>
<safa-form :id="formKey" caption="ابلاغیه کمیسیون" app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
  <form-wrapper :title="title" vertical>
    <safa-status :result=" requestResult "></safa-status>
    <fit>
      <safa-grid
        v-model="model.Commission_Order"
        cdcName="Commission_Order"
        :allowCopy="false"
        filterable
        sortable
        :allowMultipleSelection="false"
        :allowRemoveRow="false"
        :deleteRow="false"
        :loadingAnimation="false"
        :m="mode"
        :selectable="true"
        helper="eblaghyeComision"
        fit
         height="100%"
        maxHeight="100%"
        minHeight="300px"
        margin="0"
        title="ابلاغیه کمیسیون"
      />
    </fit>
    <template v-slot:footer>
      <FormActions
        :m="mode"
        @cancel="isEditable = false"
        @edit="isEditable = true"
        @save="saveData"
      />
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
// import saveOddmentPrequest from 'src/models/saveOddmentPrequest.js'
// import saveDataPrequest from './models/saveDataPrequest.js'
import baseFormMixin from 'src/mixins/baseFormMixin'
// import ShamsiAndMiladiDatePicker from '../../../../components/legal/ShamsiAndMiladiDatePicker'

export default {
  route: '/parvande/eblaghye-comision',

  mixins: [baseFormMixin],
  data () {
    return {
      persianDate: '',
      gregorianDate: '',
      testDate: { shamsi: '', miladi: '2020/10/12' },
      mobilenumber: '',
      nationalCode: '',
      title: 'ابلاغیه کمیسیون',
      formKey: '34F4E9C0-545A-4CA2-AAC9-E5A378D24CD2',
      name: 'UEblaghyeComision',
      main: true,
      workflowCompatible: true,
      loadResult: {},
      isGoToEdit: false,
      editMode: 'r',
      savePrequest: {
        pTechnicalCommittee: {
          ErrorResult: {
            BizErrors: null,
            Requirements: null
          },
          NidProc: '10ba38db-dba4-40a2-9079-4e7b4bc592b9',
          Sh_TechnicalCommittee: {
            Sh_TechnicalCommittee: {
              CI_TechnicalCommittee: '1',
              CI_TechnicalCommitteeMainUsing: '1',
              CI_TechnicalCommitteeSubUsing: '1',
              Comment: 'Test Description',
              NidProc: '00000000-0000-0000-0000-000000000000',
              NidTechnicalCommittee: '00000000-0000-0000-0000-000000000000',
              VoteDate: '1398/12/20',
              VoteNo: '1'
            }
          }
        }
      },
      items: [],
      loadDataPrequest: {
        pNidProc: 'e486e04d-983b-4df0-87d5-5e9e07502f48'
      },

      // selectedNosaziCode: '0-0-0-0-0-0-0',
      result: null,
      isDeleteDisabled: true,
      formActionEditMode: 'r',
      model: {
        Commission_Order: []
      },
      requestResult: null
    }
  },
  components: {
    // ShamsiAndMiladiDatePicker,
  },
  beforeMount () {
    if (this.isSelectedRequest()) this.loadData()
  },
  methods: {
    async saveData () {
      this.showLoading()
      try {
        let isCICommissionOrderType = false
        let saveDataPrequest = { pCommissionOrder: { Commission_Order: null,
          _NidProc: '00000000-0000-0000-0000-000000000000',
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          } },
        pUser: { Username: null, Password: null },
        pDtoWorkflowData: { StateName: '', WorkflowGuid: '' }

        }
        saveDataPrequest.pCommissionOrder.Commission_Order = this.model.Commission_Order
        saveDataPrequest.pCommissionOrder?.Commission_Order?.forEach((itm) => {
          itm.CI_CommissionOrderGetter = itm.CI_CommissionOrderGetter
            ? itm.CI_CommissionOrderGetter
            : null
          if (
            itm.CI_CommissionOrderType == null ||
          itm.CI_CommissionOrderType === 0
          ) {
            this.showError('لطفا نوع را در اطلاعات ابلاغیه مشخص کنید')
            isCICommissionOrderType = true
          }
        })
        if (isCICommissionOrderType === true) {
          return
        }
        saveDataPrequest.pCommissionOrder._NidProc = this.selectedRequest.NidProc // sheikhi added
        saveDataPrequest.pUser = { ...this.currentUser }
        saveDataPrequest.pUser.Username = this.getUserDisplayName()
        if (this.taskInfo) {
          saveDataPrequest.pDtoWorkflowData.StateName = this.taskInfo.WorkflowTitel
          saveDataPrequest.pDtoWorkflowData.WorkflowGuid = this.taskInfo.NidWorkflowDeff
        }
        const { data } = await this.$services.SC.saveCommissionOrder(saveDataPrequest, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.requestResult = await this.getResponse(data)
        if (this.requestResult.success) {
          // problem with table cdcName
          this.showSuccess('ذخیره ابلاغیه با موفقیت انجام شد')
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: 'NidProc',
            nosaziCode: this.selectedRequest.bizCode
          })
          await this.loadData()
        }
      } catch (error) {
        console.log('save error', error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadData () {
      this.showLoading()
      try {
        this.loadDataPrequest.pNidProc = this.selectedRequest.NidProc
        const { data } = await this.$services.SC.loadCommissionOrder(this.loadDataPrequest, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.model = { ...this.requestResult.data }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: 'NidProc',
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (error) {
        console.log('load error', error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
س
