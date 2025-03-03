<template>
  <form-wrapper
    :title="title"
    fullscreen
    hide-title
    hide-close
    :padding="false"
  >

    <safa-status :result="buildingExecRepResult"/>
    <div class="tab-kartable fit" id="phaseReport-kartable">
      <fit>
        <FormRow class="q-my-sm">
          <FormControl>
            <safa-combo
              label="سال"
              label-width="40px"
              ciName="CI_Years"
              domainName="engineer"
              v-model="model.CI_Years"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کدارجاع"
              label-width="40px"
              v-model="model.NidWorkitem"
              @keyup.enter="search"
            />
          </FormControl>
          <!-- <FormControl>
             <safa-datepicker
            label="از تاریخ"
            :m="m"
            v-model="startDate"
          ></safa-datepicker>
          </FormControl>
          <FormControl>
            <safa-datepicker
            label="تا تاریخ"
            :m="m"
            v-model="endDate"
            cdcName="endDate"
           ></safa-datepicker>
          </FormControl> -->
          <FormControl>
            <btn-default label="بازآوری" @click="loadData"/>
          </FormControl>
          <FormControl>
            <safa-checkbox
              label="نمایش موارد تایید شده"
              v-model="chkShowConfirm"
              cdcName="chkShowConfirm"
            ></safa-checkbox>
          </FormControl>
        </FormRow>
        <!-- <div style="height: 100%">
<ag-grid-vue

       id="myGrid"
       :columnDefs="columnDefs"
       @grid-ready="onGridReady"
       :defaultColDef="defaultColDef"
       :rowData="rowData"></ag-grid-vue>
     </div> -->

        <!-- :rowGroupPanelShow="'always'"

              :suppressRowClickSelection="true"
              :rowMultiSelectWithClick="true"

              @selection:changed="onSelectionChanged"
             -->
        <safa-grid
          id="phaseReportKartable"
          paginate
          :masterDetail="true"
          :rowGroupPanelShow="'always'"
          :detailCellRendererParams="detailCellRendererParams"
          @row:click="rowClickHandler"
          filterable
          sortable
          :paginationPageSize="50"
          :getRowStyle="getRowStyle"
          :checkboxSelection="true"
          :value="phaseReportKartablResult"
          :columns="phaseReportKartablColumns"
        >
        </safa-grid>
      </fit>
    </div>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import kartableReferencesMixin from '../mixins/kartableReferencesMixin'

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],
  components: {},

  data () {
    return {
      title: 'کارتابل گزارشات مرحله ای',
      name: 'UAcceptBuildingExeReport',
      formKey: '5845D691-6730-4B5F-896B-965383A3B1DD',
      main: true,
      chkShowConfirm: null,
      detailCellRendererParams: null,
      buildingExecRepResult: null,
      phaseReportKartablColumns: [
        // {
        //   field: "Header",
        //   title: "Header",
        //   width: "880px",
        //   cellRenderer: 'CKRActions',
        // },
        // {
        //   field: "name",
        //   title: "",
        //   width: "80px",
        //   cellRenderer: 'agGroupCellRenderer'
        // },
        {
          field: 'select',
          title: '',
          width: '80px',
          cellRenderer: 'agGroupCellRenderer'
        },
        {
          field: 'SerialID',
          title: 'کد پیگیری',
          width: '100px',
          cellRenderer: 'agGroupCellRenderer'
        },
        {
          field: 'IsAcceptCaption',
          title: 'وضعیت',
          width: '100px',
          cellRenderer: 'agGroupCellRenderer'
        },
        {
          field: 'IdentityCode',
          title: 'کد مهندس',
          width: '100px'
        },
        {
          field: 'StudyFieldRel',
          title: 'رشته تحصیلی',
          width: '110px'
        },
        {
          field: 'NidWorkItem',
          title: 'کدارجاع',
          width: '110px'
        },
        {
          field: 'NosaziCodeStr',
          title: 'کد نوسازی',
          width: '110px'
        },
        {
          field: 'BuildingExecDate',
          title: 'تاریخ گزارش',
          width: '115px'
        },
        {
          field: 'BuildingExecTime',
          title: 'ساعت گزارش',
          width: '130px'
        },
        {
          field: 'ExecLevel',
          title: 'عنوان گزارش',
          width: '135px'
        },
        {
          field: 'CI_ExecFloor',
          title: 'طبقه',
          editor: 'combo',
          domain: 'Engineer',
          width: '290px'
        },
        {
          field: 'SecretariatDate',
          title: 'تاریخ دبیرخانه',
          width: '200px'
        },
        {
          field: 'SecretariatNo',
          title: 'شماره دبیرخانه',
          width: '200px'
        },

        // { field: 'OwnerNationalCode', title: 'کدملی مالک', width: '100px' },
        {
          field: 'IsObservedBuilding',
          title: 'ساختمان دارای تخلف است؟',
          width: '127px'
        },
        {
          field: 'CI_ExecSendStatus',
          title: 'وضعیت ارسال',
          editor: 'combo',
          domain: 'Engineer',
          width: '200px'
        },
        { field: 'AcceptDate', title: 'تاریخ تایید', width: '150px' },
        { field: 'AcceptTime', title: 'ساعت تایید', width: '150px' },

        {
          field: 'Eng_Accept',
          title: 'کاربر تایید کننده',
          width: '100px',
          editor: 'date'
        },
        {
          field: 'OperationStartDate',
          title: 'ناریخ شروع عملیات',
          width: '100px',
          editor: 'date'
        },
        {
          field: 'RevokeDate',
          title: 'تاریخ عدم تایید',
          width: '140px'
        },
        {
          field: 'RevokeTime',
          title: 'ساعت عدم تایید',
          width: '110px'
        },
        {
          field: 'Eng_Revoke',
          title: 'کاربر عدم تایید کننده',
          width: '100px',
          editor: 'date'
        },
        {
          field: 'CommissionDateExpert',
          title: 'تاریخ انجام کارشناسی',
          width: '145px',
          editor: 'date'
        },
        {
          field: 'RandomCommissionDate',
          title: 'تاریخ ارسال به کمیسیون',
          width: '140px',
          editor: 'date'
        },
        {
          field: 'VoteDate',
          title: 'تاریخ رای',
          width: '100px',
          editor: 'date'
        },
        {
          field: 'PenaltyValue',
          title: 'متراژ کل تخلفات',
          width: '100px'
        },
        {
          field: 'UsingGroup_Mojood',
          title: 'کاربری تخلفات',
          width: '100px'
        },
        // {
        //   field: 'AgentTextFilter',
        //   title: 'نماینده های تایید کننده',
        //   width: '100px'
        // },
        {
          field: 'AgentName',
          title: 'نماینده های تایید کننده',
          width: '250px',
          cellRenderer: 'agAgentNameCellRenderer'
        },
        { field: 'OwnerTelNo', title: 'تلفن مالک', width: '180px' },
        { field: 'OwnerCellNo', title: 'همراه مالک', width: '180px' },
        { field: 'ExpertName', title: 'کارشناس انجام دهنده', width: '215px' },
        { field: 'BackStateTitle', title: 'مرحله شهرسازی', width: '150px' },
        { field: 'VoterUserName', title: 'انشاء کننده رای', width: '250px' }
      ],
      model: {
        CI_Years: 0,
        NidWorkitem: 0,
        CI_ExecLevels: ''
      }
    }
  },

  created () {
    this.detailCellRendererParams = {
      // provide the Grid Options to use on the Detail Grid
      detailGridOptions: {
        columnDefs: [
          // ستون های تستی
          // { field: "NosaziCodeStr", title: "NosaziCodeStrخانوادگی مالک" },
        ],
        defaultColDef: {
          flex: 1
        }
      },
      // get the rows for each Detail Grid
      getDetailRowData: (params) => {
        setTimeout(function () {
          console.log('row', params.data)
          let makeArra = []
          makeArra.push(params.data)
          params.successCallback(makeArra)
        }, 1000)
      }
    }
    this.loadData()
  },
  computed: {
    phaseReportKartablResult () {
      const result =
        this.buildingExecRepResult?.data?.GetBuildingExecRep_Info_MainListResult
          ?.BuildingExecRep_Info_MainList || []
      return result || []
    }
  },

  methods: {
    // onSelectionChanged(e){
    //   let selectedRows = e.api.getSelectedRows()
    //   this.$store.dispatch("commission/setCheckedRow",selectedRows);
    // },

    getRowStyle (params) {
      let row = params.data
      if (row.IsObservedBuilding === true) return { background: '#f78484ad' }

      return { background: 'transparent' }
    },

    async rowClickHandler (params) {
    },
    getInfo () {
      let status = '1,3'
      if (this.chkShowConfirm ?? false) status = '1,2,3'
      const payload = {
        // pCI_Year: 0,
        // pDistricts: "1,2,3",
        // pNidEngineer: "06191d4d-8d9d-44fc-9fe8-0756e0cfd984",
        // pNidWorkItem: 0,
        // pCI_ExecLevels: "",
        // pStatus: "1,2,3",
        // From: 0,
        // To: 200,
        pCI_Year: this.model.CI_Years,
        pNidEngineer: this.getNidUser(),
        pNidWorkItem: this.model.NidWorkitem,
        pDistricts: this.currentUser.JobLocation?.allowDomains,
        pCI_ExecLevels: this.model.CI_ExecLevels,
        IsSara10: true,
        pStatus: status,
        From: 0,
        To: 100000
      }
      this.showLoading()
      this.$services.engineers
        .GetBuildingExecRepInfoMainList(payload)
        .then(({ data }) => {
          this.buildingExecRepResult = this.getResponse(data)
          if (this.buildingExecRepResult.success) {
          }
        })
        .catch((error) => {
          this.showError(error.message)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async loadData () {
      try {
        this.showLoading()
        await this.getInfo()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
<style lang="scss">

#phaseReport-kartable {
  .safa-gridview .ag-row-selected {
    background: var(
        --ag-selected-row-background-color,
        rgba(33, 150, 243, 0.3)
    ) !important;
  }
}
</style>
