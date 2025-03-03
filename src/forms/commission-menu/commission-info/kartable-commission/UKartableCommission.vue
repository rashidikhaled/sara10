<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper
    :title="title"
    fullscreen
    hide-title
    hide-close
    :padding="false"
  >
    <div class="tab-kartable fit" id="commission-kartable">
      <safa-splitter
        :limits="splitterLimit"
        class="fit"
        horizontal
        margin="0"
        v-model="splitterValue"
      >
        <template v-slot:before>
          <fit>
     <safa-status :result="kartableResault" />
            <!-- <div style="height: 100%">
<ag-grid-vue

       id="myGrid"
       :columnDefs="columnDefs"
       @grid-ready="onGridReady"
       :defaultColDef="defaultColDef"
       :rowData="rowData"></ag-grid-vue>
     </div> -->

            <!-- :rowGroupPanelShow="'always'"
            :masterDetail="true"
              :suppressRowClickSelection="true"
              :rowMultiSelectWithClick="true"

            :detailCellRendererParams="detailCellRendererParams" -->
            <safa-grid
              id="commisionKartable"
              ref="commisionKartable"
              cdcName="commisionKartable"
              paginate
              @row:click="rowClickHandler"
              :filterable="true"
              sortable
              :groupDisplayType="'multipleColumns'"
              :rowGroupPanelShow= "'always'"
              :rowSelection="'multiple'"
              :isRowSelectable="() => true"
              :suppressRowClickSelection="false"
              :getRowStyle="getRowStyle"
              :checkboxSelection="true"
              v-model="tmpModel"
              :columns="commissionsKartablColumns"
              :showRowNumber="true"
              @selection:changed="onSelectionChanged"
              @model:update="onModelUpdate"
              @filter:changed="handleFilterChanged"
              @grid:ready="onGridReady"
              rowModelType="serverSide"
              :pageSize="50"
            :cacheBlockSize="50"
            :cacheOverflowSize="2"
            :maxBlocksInCache="10"
            :maxConcurrentDatasourceRequests="1"
            :infiniteInitialRowCount="1000"
            >
              <template #header>
                <CKRActions
                  class="q-mr-sm"
                  @refresh="loadData"
                  @back="prevStep"
                  @send="nextStep"
                  @resetFilter="resetFilter"
                  @gardeshParvandeh="btnHistoryClick"
                />
              </template>
            </safa-grid>
          </fit>
        </template>
        <template v-slot:after>
          <keep-alive>
            <UGardeshParvandehDetails
              :NidCommission="selectedNidCommission"
              @close="toggleGardeshParvandehVisible"
              ref="gardeshParvandehDetailsRef"
            />
          </keep-alive>
        </template>
      </safa-splitter>
    </div>
    <safa-popup
      title="برگشت"
      v-model="showPrevStep"
      width="500px"
      height="310px"
    >
      <PrevStep @hide="showPrevStep = false" @done="showPrevStep = false" />
    </safa-popup>

    <safa-popup
      title="توضیحات ارسال"
      v-model="showSendDescription"
      width="500px"
      height="285px"
    >
      <SendDescription
        @hide="showSendDescription = false"
        :sendCompleted="sendCompleted"
        :showMessageBalckList="showMessageBalckList"
        :selectedNidCommission="selectedNidCommission"
        :doSend="doSend"
        :isExpertSend="isExpertSend"
        :formKey="formKey"
      />
    </safa-popup>
    <safa-popup title="" v-model="showNextStep" width="500px" height="285px">
      <NextStep
        @hide="showNextStep = false"
        :nextStateList="nextStateList"
        :nextStephandler="nextStephandler"
      />
    </safa-popup>
    <safa-popup
      v-model="noteDialog"
      width="600px"
      height="500px"
      title="یادداشت"
    >
      <Note :name="name" :formKey="formKey"/>
    </safa-popup>
    <safa-popup
      title="پیغام لیست سیاه"
      v-model="showMessageBalckList"
      width="500px"
      height="300px"
    >
      <MessageBalckList
        :clsCommission_BlankList="clsCommission_BlankList"
        @hide="showMessageBalckList = false"
      />
    </safa-popup>
  </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import mapMixin from 'src/mixins/mapMixin'
import kartableCommissionMixin from 'src/forms/commission-menu/mixins/kartableCommissionMixin.js'
import UGardeshParvandehDetails from '../gardesh-parvandeh-details/UGardeshParvandehDetails.vue'
import CKRActions from './partials/CKRActions'
import PrevStep from './partials/PrevStep.vue'
import NextStep from './partials/NextStep.vue'
import SendDescription from './partials/SendDescription.vue'
import Note from './partials/Note.vue'

import MessageBalckList from './partials/MessageBalckList.vue'

export default {
  mixins: [baseFormMixin, kartableCommissionMixin, mapMixin],
  components: {
    CKRActions,
    UGardeshParvandehDetails,
    PrevStep,
    NextStep,
    SendDescription,
    Note,
    MessageBalckList
  },

  data () {
    return {
      title: 'کارتابل کمیسیون',
      name: 'UKartableCommission',
      formKey: '1dc491c8-26b9-45ca-9e56-d8e2de6fa0bd',
      main: true,
      page: 1,
      take: 50,
      detailCellRendererParams: null,
      priorityText: '',
      regionText: '',
      commissionType: '',
      currentCommission: '',
      // totalItems: 1000,
      showGardeshParvandeh: false,
      showPrevStep: false,
      NidCommission: '',
      useGhararKartabl: false,
      noteDialog: false,
      clsCommission_BlankList: null,
      addUserRes: null,
      kartableList: [],
      kartableResault: null,
      tmpModel: [],
      isload: null,
      customButtons: [
        {
          icon: 'refresh',
          onClick: this.loadData,
          text: 'بازآوری کارتابل'
        },
        {
          icon: 'restore',
          onClick: this.toggleGardeshParvandehVisible,
          text: 'گردش پرونده'
        }
      ],
      splitterValue: 100,
      splitterLimit: [0, 100],

      sendDesc: ''
    }
  },
  // updated () {
  // },

  created () {
    this.sendCompleted = async function (val) {
      if (val) {
        this.showSendDescription = false
        this.showLoading()
        await this.loadData()
        this.showSuccess("ارسال با موفقیت انجام شد")
      } else {
        this.hideLoading()
      }
    }
    this.addUser()

    this.loadData()
    if (this.getApplicationParam.hasOwnProperty('UseGhararKartabl')) {
      this.useGhararKartabl = this.getApplicationParam.UseGhararKartabl
    }
    this.detailCellRendererParams = {
      // provide the Grid Options to use on the Detail Grid
      detailGridOptions: {
        columnDefs: [
          // ستون های تستی

          { field: 'OwnerName', title: 'نام و نام خانوادگی مالک' },
          { field: 'OwnerNationalCode' },
          { field: 'OwnerTelNo' }
        ],
        defaultColDef: {
          flex: 1
        }
      },
      // get the rows for each Detail Grid
      getDetailRowData: (params) => {
        setTimeout(function () {
          console.log(params.data)
          let makeArra = []
          makeArra.push(params.data)
          params.successCallback(makeArra)
        }, 1000)
      }
    }
  },
  computed: {
    customFilterValues () {
      return {
        filter: 'agSetColumnFilter',
        filterParams: {
          values: params => params.success(this.getFilterValues(params)),
          refreshValuesOnOpen: true,
          defaultToNothingSelected: true
        }
      }
    },
    commissionsKartablColumns () {
      return [
        // {
        //   field: "Header",
        //   title: "Header",
        //   width: "880px",
        //   cellRenderer: 'CKRActions',
        // },
        // field: 'RowId',
        {
          headerName: "Row",
          valueGetter: "node.rowIndex + 1",
          title: 'ردیف',
          width: '82px',
          ignoreRowGroup: true
        },
        // filter: 'agMultiColumnFilter'
        {
          field: 'CompeletPrecent',
          title: '',
          width: '180px',
          cellRenderer: 'agInlinePercentageCellRenderer',
          cellRendererParams: (params) => (params?.node?.group) ? { component: "" } : undefined,
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'HasComments',
          title: '',
          width: '82px',
          cellRenderer: 'agNoteAndLaterTimeCellRenderer',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              {
                filter: 'agTextColumnFilter'
              },
              this.customFilterValues
            ]
          }
        },
        {
          field: 'isSelected',
          width: '80px',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: 'center',
          headerAlign: 'center',
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false,
          ignoreRowGroup: true
          // showDisabledCheckboxes: true,
          // editor: 'selection',
        },
        {
          field: 'CI_Region',
          title: 'منطقه',
          width: '100px',
          // cellRenderer: (params) => `<span class="ckrow__region">${this.getRegion(params.value)}</span>`,
          // cell: 'RegionTemplate',
          cellRenderer: 'agRegionTemplate',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'CI_CommissionPriority',
          title: 'اولویت پرونده',
          width: '100px',
          cellRenderer: 'agPriorityTemplate',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'CI_BlackListType',
          title: 'علت',
          width: '100px',
          editor: 'combo',
          domain: 'Commission100',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'IsRelapse',
          title: 'عودتی',
          width: '85px',
          editor: 'checkbox',
          // cellRenderer: (params) => `<span :class="ckrow__badge text-lime-8 ${params.value?'is__active':'not__active'}">عودتی</span>`,
          cellRenderer: 'agRelapseTemplate',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'IsPast',
          title: 'سابقه',
          width: '80px',
          editor: 'checkbox',
          cellRenderer: 'agPastTemplate',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'IsKarbari',
          title: 'تغییر کاربری',
          width: '110px',
          editor: 'checkbox',
          cellRenderer: 'agKarbariTemplate',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'IsMeeting',
          title: 'حضور نماینده',
          width: '115px',
          editor: 'checkbox',
          cellRenderer: 'agMeetingTemplate',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'HasTasmim',
          title: 'دارای رای تصمیم',
          width: '130px',
          editor: 'checkbox',
          cellRenderer: 'agTasmimTemplate',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'UrbanNidRequest',
          title: 'شماره ارجاع منطقه',
          width: '135px',
          // cellRenderer: 'agGroupCellRenderer',
          filter: 'agMultiColumnFilter'
        },
        { field: 'BizCode', title: 'کد نوسازی', width: '180px', filter: 'agMultiColumnFilter' },
        { field: 'WorkflowTitel', title: 'نوع درخواست', width: '237px', filter: 'agMultiColumnFilter' },
        {
          field: 'AgentCount',
          title: 'تعداد امضا',
          width: '113px',
          cellRenderer: 'agAgentCountTemplate',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'AgentName',
          title: 'نماینده های تایید کننده',
          width: '220px',
          filter: 'agMultiColumnFilter',
          cellRenderer: (params) =>
            `<span>${this.splitAgentName(params.value)}</span>`

        },
        { field: 'SecrNo', title: 'شماره دبیرخانه', width: '131px', filter: 'agMultiColumnFilter' },
        {
          field: 'OwnerName',
          title: 'نام و نام خانوادگی مالک',
          width: '290px',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'OwnerNationalCode',
          title: 'کد ملی مالک',
          width: '200px',
          filter: 'agMultiColumnFilter'
        },

        // { field: 'OwnerNationalCode', title: 'کدملی مالک', width: '100px' },
        { field: 'Requester', title: 'متقاضی', width: '127px', filter: 'agMultiColumnFilter' },
        { field: 'Regplaque', title: 'پلاک ثبتی', width: '200px', filter: 'agMultiColumnFilter' },
        { field: 'BackStateTitle', title: 'مرحله شهرسازی', width: '150px', filter: 'agMultiColumnFilter' },
        { field: 'TaskTitel', title: 'مرحله', width: '150px', filter: 'agMultiColumnFilter' },

        {
          field: 'SendDate',
          title: 'تاریخ ورود',
          width: '100px',
          editor: 'date',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'DateCommissionExpert',
          title: 'تاریخ کمیسیون',
          width: '100px',
          editor: 'date',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'CI_CommissionType',
          title: 'نوع کمیسیون',
          width: '140px',
          editor: 'combo',
          domain: 'Commission100',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'CI_Commission',
          title: 'کمیسیون جاری',
          editor: 'combo',
          domain: 'Commission100',
          width: '110px',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'CommissionDate',
          title: 'تاریخ کارشناسی',
          width: '100px',
          editor: 'date',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'CommissionDateExpert',
          title: 'تاریخ انجام کارشناسی',
          width: '145px',
          editor: 'date',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'RandomCommissionDate',
          title: 'تاریخ ارسال به کمیسیون',
          width: '140px',
          editor: 'date',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'VoteDate',
          title: 'تاریخ رای',
          width: '100px',
          editor: 'date',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'PenaltyValue',
          title: 'متراژ کل تخلفات',
          width: '100px',
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'UsingGroup_Mojood',
          title: 'کاربری تخلفات',
          width: '100px',
          filter: 'agMultiColumnFilter'
        },

        { field: 'OwnerTelNo', title: 'تلفن مالک', width: '180px', filter: 'agMultiColumnFilter' },
        { field: 'OwnerCellNo', title: 'همراه مالک', width: '180px', filter: 'agMultiColumnFilter' },
        { field: 'ExpertName', title: 'کارشناس انجام دهنده', width: '215px', filter: 'agMultiColumnFilter' },
        { field: 'BackStateTitle', title: 'مرحله شهرسازی', width: '150px', filter: 'agMultiColumnFilter' },
        { field: 'VoterUserName', title: 'انشاء کننده رای', width: '250px', filter: 'agMultiColumnFilter' }
      ].map(e => ({ ...e, enableRowGroup: !e.ignoreRowGroup }))
    },
    viewportWidth () {
      return (
        20 +
        this.commissionsKartablColumns
          .map((x) => parseInt(`${x.width || 160}`))
          .reduce((total, one) => total + one, 0)
      )
    },
    commissionsKartablResult () {
      return (
        this.$store.getters['commission/kartableRows'].map((x, i) => {
          return {
            ...x,
            RowId: i + 1
          }
        }) || []
      )
    },
    // selectedRows(){
    //     let ids=this.$store.getters['commission/selectedIds']
    //      const filterdResult = this.commissionsKartablResult.filter(
    //         (x) => {
    //           return ids.some((y) => {
    //             return y === x.NidCommission;
    //           });
    //         }
    //       );
    //   return filterdResult
    // },
    totalItems () {
      return this.$store.getters['commission/kartableRows'].length
    },
    rowKey () {
      return this.$store.getters['commission/RowKey']
    },
    maxPage () {
      return Math.ceil(this.totalItems / this.take)
    },
    pages () {
      return new Array(this.maxPage).fill().map((r, i) => i + 1)
    },
    from () {
      return (this.page - 1) * this.take
    },
    to () {
      return this.from + this.take
    }
  },

  methods: {
    btnHistoryClick () {
      this.toggleGardeshParvandehVisible()
      this.$nextTick(() => {
        this.$refs.UGardeshParvandehDetails.getTaskHistory()
      })
    },
    async addUser () {
      this.showLoading()
      this.$services.commissions
        .addUser({
          PRequest: {
            UserName: this.currentUser.FirstName,
            UserFamily: this.currentUser.LastName,
            NidUser: this.getNidUser()
          }
        })
        .then(async ({ data }) => {
          this.addUserRes = this.getResponse(data)
          if (this.addUserRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleFilterChanged (e) {
      e.api.refreshCells()
    },
    getFilterValues (params) {
      // // console.log('-----------getFilterValues', params)
      try {
        let list = []
        switch (params.column.colId) {
          case 'HasComments':
            list = [...new Set(this.commissionsKartablResult.map((e) => e[params.column.colId]))]
            break
          default:
            list = []
            break
        }
        return list
      } catch (ex) {
        // console.log(ex)
        return []
      }
    },
    splitAgentName (agentName = '') {
      try {
        if (!agentName) return ''
        let tmp = agentName.split('-')
        let result = ''

        try {
          tmp.forEach((item, _index) => {
            if (tmp.length >= _index) {
              result += (_index !== 0 ? '  ,  ' : '') + item.split('|')[0]
            }
          })
        } catch {
        }

        return result
      } catch {
        return agentName
      }
    },
    findRowId (row) {
      return row[this.rowKey]
    },
    onSelectionChanged (params) {
      this.updateCheckedRows(params)
    },
    onModelUpdate (e) {
      let filteredRows = []
      // let help = 0
      if (!e?.api?.forEachRowNodeAfterFilterAndSort) return
      e.api.forEachRowNodeAfterFilterAndSort((node) => {
        // help += 1
        filteredRows.push({
          ...node.data
        })
        // ,
        // RowId: help
      })
      this.$store.dispatch('commission/setKartableFilters', filteredRows)
    },
    updateCheckedRows (params) {
      const selectedRows = params.api.getSelectedRows()
      const checkedIds = (selectedRows || []).map(row => this.findRowId(row))
      this.$store.dispatch("commission/setSelectedRows", selectedRows)
      this.$store.dispatch("commission/setCheckedRow", checkedIds)
    },
    getRowStyle (params) {
      let row = params.data
      if (!row) return {}
      if (row.HasLegalExpert) return { background: '#F78484' }

      if (this.useGhararKartabl) {
        if (row.HasGharar && !row.ResponseGharar) {
          return { background: '#F1C2C2' }
        } else if (row.HasGharar && row.IsVote === -1 && row.ResponseGharar) {
          return { background: '#B4B4F9' }
        }
      }

      if (row.IsVote == null) return {}

      if (row.HasTasmim === true) return { background: '#F1C2C2' }

      switch (row.IsVote) {
        case 400:
          return { background: '#FDFDC9' }
        case -1:
          return { background: 'white' }
        case 418:
          return { background: '#F1C2C2' }
        default:
          return { background: '#D1FBFB' }
      }

      // تاریخ رأی
      // eslint-disable-next-line no-unreachable
      if (row.VoteDate) return { background: '#D1FBFB' }

      if (row.HasHoghoghi) return { background: 'white' }

      return { background: '#D1FBFB' }
    },
    async setKartableDatasource () {
      this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          try {
            this.kartableResault = this.commissionsKartablResult
            params.success({
              rowData: this.kartableResault
            })
          } catch (e) {
            console.error(e)
            params.fail()
          } finally {
            this.loading = false
          }
        }
      })
    },
    // async setKartableDatasource () {
    //   this.selectedRow = null
    //   if (!this.currentUser.FirstName) {
    //     let msg = `محل خدمت برای کاربر ${this.getUserDisplayName()} تعریف نشده است `
    //     this.showError(msg)
    //     return
    //   }

    //   this.gridApi.setServerSideDatasource({
    //     getRows: async (params) => {
    //       try {
    //         const store = getStore()
    //         const payload = {
    //           From: 0,
    //           To: 10000,
    //           UserID: store.getters['authorize/userId'],
    //           // eslint-disable-next-line no-undef
    //           UseGharar: window.getConfigValue('esupParams')?.UseGhararKartabl || false
    //         }
    //         const { data } =
    //           await getKartabl(
    //             payload
    //           )
    //         this.kartableResault = this.getResponse(data)
    //         console.log("ressssss", this.kartableResault)
    //         if (
    //           this.kartableResault.success &&
    //           this.kartableResault.data.GetKartablResult

    //         ) {
    //           this.kartableList = this.kartableResault.data.GetKartablResult ?? []
    //           this.kartableList.forEach(item => { item.isSelected = false })
    //           console.log("kartableList:", this.kartableList)
    //           this.resetValidation()
    //           params.success({
    //             rowData: this.kartableList
    //           })
    //         } else {
    //           params.fail()
    //         }
    //         this.isload = !this.isload
    //       } catch (e) {
    //         console.error(e)
    //         params.fail()
    //       } finally {
    //         this.loading = false
    //       }
    //     }
    //   })
    // },

    async onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", this.onServerFailCallback)
    },

    onServerFailCallback (params) {
      console.error("onServerFailCallback", params)
    },
    async nextStep () {
      if (
        !this.selectedCommission &&
        !this.$refs?.commisionKartable?.gridApi.getSelectedRows()
      ) {
        this.showError('لطفا یک سطر از کارتابل کمیسیون انتخاب نمایید.')
        return false
      }

      if (!this.chk_BlackList(true)) {
        if (
          this.getApplicationParam.hasOwnProperty('IsCheckBalckList') &&
          !this.getApplicationParam.IsCheckBalckList
        ) {
          this.sendMethod(false, '')
        } else if (!this.isBlackList) {
          this.sendMethod(false, '')
        }
      } else {
        this.hideLoading()
      }
    },

    async prevStep () {
      if (
        !(await this.canOpenWindow('', { closeForm: false, redirect: false }))
      ) {
        return false
      }

      // if (
      //   this.getApplicationParam.hasOwnProperty("IsCheckBalckList") &&
      //   !this.getApplicationParam.IsCheckBalckList
      // ) {
      //   if (
      //     this.selectedCommission.VoteDate &&
      //     !this.selectedCommission.HasHoghoghi
      //   ) {
      //     this.showError("برگشت پرونده بدلیل داشتن رای امکان پذیر نمی باشد");
      //     return false;
      // }
      //   }

      if (!this.chk_BlackList(false)) {
        if (
          this.getApplicationParam.hasOwnProperty('IsCheckBalckList') &&
          !this.getApplicationParam.IsCheckBalckList
        ) {
          this.showPrevStep = true
        } else if (!this.isBlackList) this.showPrevStep = true
      }
    },

    async rowClickHandler (params) {
      if (params?.node?.group) return

      this.showCodeOnMap(params.data.BizCode)
      await this.$store.dispatch(
        'commission/setSelectedCommission',
        params.data
      )
      await this.$store.dispatch("commission/setIsMainCommissionKartab", true)
      // this.updateCheckedRows(params)

      if (this.selectedCommission) {
        if (
          this.getApplicationParam.hasOwnProperty('IsCheckBalckList') &&
          this.getApplicationParam.IsCheckBalckList
        ) {
          this.showLoading()
          const payload = {
            pCodeString: this.selectedCommission.BizCode
          }

          await this.$services.commissions
            .getBlankList(payload)
            .then(async ({ data }) => {
              const getBlankListRes = this.getResponse(data)
              if (getBlankListRes.success) {
                await this.log({
                  action: this.logActions.view,
                  bizCode: this.selectedNidCommission,
                  bizCodeTitle: "NidCommission",
                  nosaziCode: this.selectedCommission.BizCode,
                  saveDesc: `بارگذاری اطلاعات لیست سیاه در فرم ${this.title} انجام گردید.`
                })
                this.clsCommission_BlankList =
                  getBlankListRes.data.Get_BlankListResult.ClsCommission_BlankList
              }
            })
            .catch((e) => {
              console.error(e)
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      }
    },
    // nextPage() {
    //   if (this.page >= this.maxPage) return;
    //   this.page++;
    // },
    // prevPage() {
    //   if (this.page <= 1) return;
    //   this.page--;
    // },
    // updatePaginateTake(e) {
    //   const value = parseInt(e.target.value);
    //   if ([25, 50, 100, 150, 200].indexOf(value) === -1) return;
    //   this.take = value;
    //   this.page = 1;
    // },
    // scrollEvent(e) {
    //   this.$el.querySelector(".ckg-header-clipper").scrollLeft =
    //     e.target.scrollLeft;
    // },

    // updateExpandable({ row, status }) {
    //   /*for (let i = 0; i < this.commissionsKartablResult.length; i++) {
    //     const item = this.commissionsKartablResult[i]
    //     this.commissionsKartablResult.splice(i, 1, Object.freeze({
    //       ...item,
    //       MoreInfo: item.NidCommission === row.NidCommission ? status : false
    //     }))
    //   }*/
    //   const id = this.findRowId(row);
    //   this.$store.dispatch("commission/setExpandedRow", {
    //     id,
    //     isExpanded: status
    //   });
    //   this.$el.querySelector(".ckg-body").scrollLeft = 0;
    // },
    async loadData () {
      try {
        this.showLoading()
        await this.$store.dispatch('commission/fetchKartableRows')
        await this.log({
          action: this.logActions.view,
          bizCode: '',
          bizCodeTitle: "",
          saveDesc: `بارگذاری اطلاعات  ${this.title} انجام گردید.`
        })
      } finally {
        this.hideLoading()
      }
    },
    toggleGardeshParvandehVisible () {
      this.showGardeshParvandeh = !this.showGardeshParvandeh
    },
    resetFilter () {
      this.$refs?.commisionKartable?.gridApi.setFilterModel(null)
    }
  },

  watch: {
    async commissionsKartablResult () {
      console.log('update kartable rows...')
      await this.setKartableDatasource()

      // this.updateSelected({row:params.data,value:params.data.select})
    },
    isload () {
      if (this.gridApi > 0) {
        this.gridApi.paginationGoToPage(this.gridApi)
        this.gridApi = null
      }
    },
    showGardeshParvandeh () {
      this.splitterLimit = this.showGardeshParvandeh ? [0, Infinity] : [0, 100]
      this.splitterValue = this.showGardeshParvandeh ? 60 : 100
    }
  }
}
</script>
<style lang="scss">

.bg__s0 {
  background-color: white;
}

.bg__s1 {
  background-color: #d1fbfb;
}

.bg__s2 {
  background-color: #fdfdc9;
}

.bg__s7 {
  background-color: #f1c2c2;
}

.bg__s8 {
  background-color: #b4b4f9;
}

.bg__s9 {
  background-color: #f78484ad;
}

.ckrow__badge {
  color: #1e95cb;
  min-width: 32px;
  padding: 0 4px;
  white-space: nowrap;
  font-size: 10px;
  border: 1px solid;
  line-height: normal;
  background-color: #fff;
  border-radius: 20px;
  text-align: center;
  position: relative;

  body.body--dark & {
    border-color: var(--dark-border);
    background-color: var(--dark);
    color: var(--dark-text-color);
  }

  &:before {
    content: "";
    width: 5px;
    height: 5px;
    display: inline-block;
    border-radius: 50px;
    background-color: currentColor;
    margin-right: 4px;
  }

  &.not__active {
    color: #777777 !important;
    opacity: 0.3;

    body.body--dark & {
      color: var(--dark-text-color) !important;
      opacity: 0.65;
    }
  }
}

// body.body--dark & {
//   &.bg__s0 {
//     background-color: var(--dark);
//   }
//   &.bg__s1 {
//     background-color: darken($dark, 3%);
//   }
//   &.bg__s2 {
//     background-color: darken(rgba(#fdfdc9, 0.15), 30%);
//   }
//   &.bg__s7 {
//     background-color: darken(rgba(#f1c2c2, 0.25), 15%);
//   }
//   &.bg__s8 {
//     background-color: darken(rgba(#b4b4f9, 0.25), 10%);
//   }
//   &.bg__s9 {
//     background-color: darken(rgba(#f78484, 0.25), 15%);
//   }
// }

// body.body--dark & {
//   &.bg__s0 {
//     background-color: var(--dark);
//   }
//   &.bg__s1 {
//     background-color: darken($dark, 3%);
//   }
//   &.bg__s2 {
//     background-color: darken(rgba(#fdfdc9, 0.15), 30%);
//   }
//   &.bg__s7 {
//     background-color: darken(rgba(#f1c2c2, 0.25), 15%);
//   }
//   &.bg__s8 {
//     background-color: darken(rgba(#b4b4f9, 0.25), 10%);
//   }
//   &.bg__s9 {
//     background-color: darken(rgba(#f78484, 0.25), 15%);
//   }
// }

#ck-grid {
  margin: 10px;
  //border-radius: 10px;
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #fff;
  //box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);

  body.body--dark & {
    background-color: var(--dark);
  }

  .ckg-header-clipper {
    height: calc(48px - 8px);
    overflow: hidden;
    border-bottom: 1px solid #eee;

    body.body--dark & {
      border-bottom-color: var(--dark-border);
    }

    .ckg-header {
      white-space: nowrap;
      height: 40px;
      align-items: center;

      .ckg__col {
        display: inline-block;
        white-space: nowrap;
        font-size: 10px;
        padding: 0 8px;
        color: #202020;
        cursor: default;
        position: relative;
        text-align: center;

        body.body--dark & {
          color: var(--dark-text-color);
        }

        &:after {
          content: "";
          width: 1px;
          height: 12px;
          background-color: rgba(0, 0, 0, 0.1);
          align-self: stretch;
          display: inline-block;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          margin: 0;
          padding: 0;
        }
      }
    }
  }

  .ckg-body {
    min-height: 0;
    height: 0;
    flex-grow: 1;
    overflow: auto;
    scroll-behavior: smooth;
    will-change: scroll-position;

    .ckrow_wrap {
      min-height: 36px;

      &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      }
    }
  }

  .ckg-footer {
    height: 34px;
  }
}

#commission-kartable {
  .ag-header-cell-text {
    font-size: 11px !important;
  }

  div.ag-theme-alpine div.ag-row {
    font-size: 10px !important;
  }

  div.ag-theme-alpine div.ag-header-cell {
    font-size: 10px !important;
  }

  .safa-gridview .ag-row-selected {
    background: var(
        --ag-selected-row-background-color,
        rgba(33, 150, 243, 0.3)
    ) !important;
  }
}
</style>
