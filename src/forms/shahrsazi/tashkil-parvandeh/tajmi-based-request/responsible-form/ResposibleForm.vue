<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <fit>
    <safa-checkbox
      label="نمایش اطلاعات کد نوسازی حذف شده"
      v-model="showNosazicodeInfo"
      class="q-pa-sm"
    />
    <safa-splitter
      horizontal
      v-model="splitterModel"
    >
      <template #before>
          <safa-datatable
          helper="responsibleForm"
          v-model="results.ResponserKartabl"
          @FormsClick="formsClick"
          @row-click="click"
          :hideHeader="true"
          :addRow="false"
          :deleteRow="false"
          :selectable="true"
          :allow-multiple-selection="false"
          title="پلاک ثبتی"
          m="r"
          min-height="100px"
          height="100%"
          max-height="100%"
          fit
        />
      </template>
      <template #after>
        <ResposibleFormActivityList :processInfoResults="processInfoResults" />
      </template>
    </safa-splitter>
    <ShowModal
      :show="isShowFormListModal"
      title="فرم ها"
      @onCloseModal="isShowFormListModal = false"
    >
      <ResponsibleFormList
        :selectedRow="selectedRow"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </ShowModal>
    <!-- <ShowModal
      v-model="isShowFormListModal"
      title="فرم ها"
      vertical
    >
      <responder-forms
        :selectedRow="selectedRow"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </ShowModal> -->
  </fit>
 </safa-form>
</template>
<script>
import ResposibleFormActivityList from './partials/ResposibleFormActivityList'
import ResponsibleFormList from './partials/ResponsibleFormList'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      workFlowList: null,
      workFlowLists: { Sh_WorkflowList: [] },
      workFlow: [],
      splitterModel: 50,
      // baseNosaziCode: {
      //   District: 0,
      //   Region: 0,
      //   Block: 0,
      //   House: 0,
      //   Building: 0,
      //   Apartment: 0,
      //   Shop: 0
      // },
      regionList: [
        { ID: 0, Title: '1' },
        { ID: 1, Title: '2' },
        { ID: 2, Title: '3' },
        { ID: 3, Title: '4' },
        { ID: 4, Title: '5' },
        { ID: 5, Title: '6' }
      ],
      selectedRegion: 0,
      result: null,
      results: { ResponserKartabl: [] },
      baseLibResult: null,
      baseLibResults: {},
      nidWorkItem: '',
      preCode: '',
      requesterName: '',
      requeststatus: '',
      selectedWorkFlow: null,
      nidWorkItemOld: '',
      telephoneNo: '',
      requestDateFrom: '',
      requestDateTo: '',
      exportDateFrom: '',
      exportDateTo: '',
      processInfoResult: null,
      processInfoResults: { Task: [] },
      isShowFormListModal: false,
      selectedRow: null,
      isShowFormModal: false,
      showNosazicodeInfo: true
    }
  },
  components: {
    ResposibleFormActivityList,
    ResponsibleFormList
  },
  props: {
    baseNosaziCode: Object,
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
    this.loadWorkflowTitle()
    this.search()
  },
  methods: {
    isShowForm () {
      this.isShowFormModal = true
    },
    loadWorkflowTitle () {
      this.showLoading()
      let data = {}
      this.$services.SA.loadWorkflowListAll(data)
        .then(async ({ data }) => {
          this.workFlowList = this.getResponse(data)

          if (this.workFlowList.success) {
            this.workFlowLists = this.workFlowList.data
            this.workFlowLists.Sh_WorkflowList.forEach(x => {
              this.workFlow.push({
                ID: x.NidWorkflowDeff,
                Title: x.WorkflowTitel
              })
            })

            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    search () {
      this.showLoading()
      let districtStr
      let regionStr
      let blockStr
      let hoseStr
      let buildingStr
      let apartmentStr
      let shopStr
      let conditionStr = ''
      if (this.baseNosaziCode.District !== 0) {
        districtStr = 'BN.District = ' + this.baseNosaziCode.District
        conditionStr = 'Where ' + districtStr
      } else if (this.baseNosaziCode.District === 0) {
        conditionStr = 'Where BN.District =  ' + (this.selectedRegion + 1)
      }
      if (this.baseNosaziCode.Region !== 0) {
        regionStr = 'BN.Region = ' + this.baseNosaziCode.Region
        conditionStr += '  AND ' + regionStr
      } else {
        regionStr = ''
      }
      if (this.baseNosaziCode.Block !== 0) {
        blockStr = 'BN.Block = ' + this.baseNosaziCode.Block
        conditionStr += '  AND  ' + blockStr
      } else {
        blockStr = ''
      }
      if (this.baseNosaziCode.House !== 0) {
        hoseStr = 'BN.House = ' + this.baseNosaziCode.House
        conditionStr += '  AND  ' + hoseStr
      } else {
        hoseStr = ''
      }
      if (this.baseNosaziCode.Building !== 0) {
        buildingStr = 'BN.Building = ' + this.baseNosaziCode.Building
        conditionStr += '  AND  ' + buildingStr
      } else {
        buildingStr = ''
      }
      if (this.baseNosaziCode.Apartment !== 0) {
        apartmentStr = 'BN.Apartment = ' + this.baseNosaziCode.Apartment
        conditionStr += '  AND ' + apartmentStr
      } else {
        apartmentStr = ''
      }
      if (this.baseNosaziCode.Shop !== 0) {
        shopStr = 'BN.Shop = ' + this.baseNosaziCode.Shop
        conditionStr += ' AND ' + shopStr
      } else {
        shopStr = ''
      }
      if (this.nidWorkItem !== '') {
        conditionStr += " And  NidWorkItem = N '" + this.nidWorkItem + "' "
      }
      if (this.preCode !== '') {
        conditionStr +=
          " And  Base_PreCodeInfo.PreCode Like N'%" + this.preCode + "%'"
      }
      if (this.requesterName !== '') {
        conditionStr +=
          " And  RequesterName Like '%" + this.requesterName + "%' "
      }
      if (this.requeststatus !== '') {
        conditionStr +=
          " And  EumRequestStatus = N'" + this.requeststatus + "' "
      }
      if (this.selectedWorkFlow !== null) {
        conditionStr +=
          " And  w.WorkflowTitel = N'" + this.selectedWorkFlow.Title + "' "
      }
      if (this.nidWorkItemOld !== '') {
        conditionStr +=
          " And  NidWorkItemOld Like '%" + this.nidWorkItemOld + "%' "
      }
      if (this.telephoneNo !== '') {
        conditionStr += " And  TelephoneNo Like '%" + this.telephoneNo + "%' "
      }
      if (this.requestDateFrom !== '' && this.requestDateTo !== '') {
        conditionStr +=
          "And RequestDate >= N'" +
          this.requestDateFrom +
          "'" +
          "And RequestDate <= N'" +
          this.requestDateTo +
          "'"
      }
      if (this.exportDateFrom !== '' && this.exportDateTo !== '') {
        conditionStr +=
          "And RequestDate >= N'" +
          this.exportDateFrom +
          "'" +
          "And RequestDate <= N'" +
          this.exportDateTo +
          "'"
      }
      // if (this.exitDateFrom !== '' && this.exitDateTo !== '') {
      //   conditionStr += ' And ExitDate between \'' + this.exitDateFrom + '\' and \'' + this.exitDateTo + '\' '
      // }
      // if (this.outgoingUser !== '') {
      //   conditionStr += ' And  UserExit Like \'%' + this.outgoingUser + '%\''
      // }
      // if (this.entryCause !== 0) {
      //   conditionStr += ' And CI_BlackListCause = ' + this.entryCause
      // }
      conditionStr += ' And ***'
      let data = {
        pFromRow: 0,
        pToRow: 20,
        pWhere: conditionStr
      }
      this.$services.SC.getResponserKartabl(data)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.results = response.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })

            if (this.selectedWorkFlow !== null && this.selectedRow !== null) {
              this.getProcessInfo()
            }
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
    // getInfo () {
    //   this.getProcessInfo(this.selectedRow.NidProc)
    // },
    getProcessInfo () {
      this.showLoading()
      this.workFlow = []
      let data = { PNidProc: this.selectedRow.NidProc }
      this.$srvWorkflow
        .getProcessInfo(data)
        .then(async ({ data }) => {
          this.processInfoResult = this.getResponse(data)

          if (this.processInfoResult.success) {
            this.processInfoResults = this.processInfoResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleBaseNosaziCodeChanged () {
      this.getBaseLibInNosaziCode()
    },
    getBaseLibInNosaziCode () {
      this.showLoading()
      let self = this
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(async ({ data }) => {
          self.baseLibResult = self.getResponse(data)
          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    clearInputParam () {
      this.nidWorkItem = ''
      this.preCode = ''
      this.requesterName = ''
      this.requeststatus = ''
      this.selectedWorkFlow = null
      this.nidWorkItemOld = ''
      this.telephoneNo = ''
      this.requestDateFrom = ''
      this.requestDateTo = ''
      this.exportDateFrom = ''
      this.exportDateTo = ''
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.results = { ResponserKartabl: [] }
    },
    formsClick (e) {
      this.selectedRow = e.dataItem
      this.isShowFormListModal = true
    },
    click (row) {
      this.selectedRow = row
      this.getProcessInfo()
    }
  }
}
</script>
