<template>
  <section class="q-card q-pa-md">
    <section class="q-mb-sm">
      <q-form
        class="row q-col-gutter-md items-center"
        @submit="loadData"
        @reset="reset"
      >
        <safa-text
          clearable
          class="col-12 col-sm-6 col-md-2"
          placeholder="جستجو کد ارجاع"
          v-model="filterModel.NidWorkItem"
          @change="filterTextChanged"
        />
        <safa-text
          clearable
          class="col-12 col-sm-6 col-md-2"
          placeholder=" جستجو کد ارجاع شهرداری"
          v-model="filterModel.UrbanNidKartablItem"
          @change="filterTextChanged"
        />
        <safa-text
          clearable
          class="col-12 col-sm-6 col-md-2"
          placeholder="جستجو کد نوسازی"
          v-model="filterModel.NosaziCode"
          @change="filterTextChanged"
        />
        <safa-combo
          clearable
          source-type="local"
          :options="workflowTitleGroups"
          class="col-12 col-sm-6 col-md-2"
          placeholder="جستجو منطقه"
          v-model="filterModel.WorkflowTitel"
          @input="filterTextChanged"
        />
        <safa-combo
          clearable
          source-type="local"
          :options="workflowTitleGroups"
          class="col-12 col-sm-6 col-md-2"
          placeholder="جستجو نوع درخواست"
          v-model="filterModel.WorkflowTitel"
          @input="filterTextChanged"
        />
        <safa-combo
          clearable
          source-type="local"
          :options="workflowTitleGroups"
          class="col-12 col-sm-6 col-md-2"
          placeholder="جستجو نوع پرونده"
          v-model="filterModel.WorkflowTitel"
          @input="filterTextChanged"
        />
        <safa-text
          clearable
          class="col-12 col-sm-6 col-md-2"
          placeholder="جستجو شماره دبیرخانه شهرداری"
          v-model="filterModel.StrNoTownDabir"
          @change="filterTextChanged"
        />
        <safa-text
          clearable
          class="col-12 col-sm-6 col-md-2"
          placeholder="جستجو نام مالک"
          v-model="filterModel.OwnerName"
          @change="filterTextChanged"
        />
        <safa-text
          clearable
          class="col-12 col-sm-6 col-md-2"
          placeholder="جستجو پلاک ثبتی"
          v-model="filterModel.RegisterPlack"
          @change="filterTextChanged"
        />
        <safa-text
          clearable
          class="col-12 col-sm-6 col-md-4"
          placeholder="جستجو آدرس"
          v-model="filterModel.Address"
          @change="filterTextChanged"
        />
        <safa-combo
          clearable
          source-type="local"
          :options="workflowTitleGroups"
          class="col-12 col-sm-6 col-md-2"
          placeholder="جستجو سال"
          v-model="filterModel.Year"
          @input="filterTextChanged"
        />
        <safa-text
          clearable
          class="col-12 col-sm-6 col-md-2"
          placeholder="شماره مجور"
          v-model="filterModel.Address"
          @change="filterTextChanged"
        />
        <safa-datepicker
          clearable
          class="col-12 col-sm-6 col-md-2"
          placeholder="تاریخ مجوز"
          v-model="filterModel.ExportLicenseDate"
          @change="filterTextChanged"
        />

        <div class="col">
          <div class="row items-center q-gutter-x-sm">
            <q-btn
              dense
              flat
              round
              icon="search"
            >
              <q-tooltip>
                جستجو
              </q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              round
              icon="sync"
              @click="reset"
            >
              <q-tooltip>
                بازنشانی
              </q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              round
              icon="fact_check"
              :disable="!selectedRequest"
              @click="gardeshParvandehDialogState = !gardeshParvandehDialogState"
            >
              <q-tooltip>
                گردش پرونده
              </q-tooltip>
            </q-btn>
            <!-- <q-btn
              :disable="resetBtn"
              dense
              flat
              round
              icon="search_off"
              @click="resetFilter"
            >
              <q-tooltip>
                حذف فیلتر ها
              </q-tooltip>
            </q-btn> -->
          </div>
        </div>
      </q-form>
    </section>

    <safa-status
      :result="result"
      :is-loading="loading"
    />
    <safa-datagrid
      ref="kartable"
      class="col-12 fit"
      hide-toolbar
      m="r"
      :columns="kartableColumns"
      :allowNewRow="false"
      :allowRemoveRow="false"
      :allowCopy="false"
      :total="totalRow"
      :skip="skip"
      :take="take"
      :filter="filter"
      v-model="currentData"
      :pageable="pageable"
      height="calc(100vh - 270px)"
      maxHeight="100vh"
      @selectedChange="handleSelectedChange"
    >
      <template #BizCode="{props, listeners}">
        <td v-on="listeners">
          <div
            class="row justify-between items-center"
            style="pointer-events: none"
          >
            <q-img
              style="width: 18px; height: 18px"
              :src="'http://dev.safarayaneh.com:7010/img/' + props.dataItem.IconUrl"
            />
            {{ props.dataItem.BizCode }}
          </div>
        </td>
      </template>
    </safa-datagrid>

    <q-dialog
      full-width
      position="bottom"
      v-model="gardeshParvandehDialogState"
    >
      <q-card class="q-pa-md">
        <gardesh-parvandeh :value="selectedRequest" />
      </q-card>
    </q-dialog>

    <q-dialog v-model="groupGuidToViewMembersDialog">
      <view-group-members
        v-if="groupGuidToViewMembersDialog"
        :group-guid="groupGuidToViewMembers"
      />
    </q-dialog>
  </section>
</template>

<script>
import { generateSQLQuery } from 'src/utils/gridOperations'
import baseFormMixin from 'src/mixins/baseFormMixin'
import ViewGroupMembers from './ViewGroupMembers'
import { mapActions, mapGetters } from 'vuex'
import GardeshParvandeh from './GardeshParvandeh'

export default {
  name: 'kartable-pasokhgo',
  route: '/kartable-pasokhgo',

  mixins: [baseFormMixin],

  components: {
    GardeshParvandeh,
    ViewGroupMembers
  },

  data () {
    return {
      loading: false,
      result: null,
      filter: null,
      gardeshParvandehDialogState: false,
      groupGuidToViewMembers: null,
      groupGuidToViewMembersDialog: false,
      filterModel: {
        // NidWorkItem: '',
        BizCode: '',
        WorkflowTitel: '',
        ProcRequester: '',
        Apartment: '',
        Block: '',
        Building: '',
        District: '',
        House: '',
        Region: '',
        Shop: '',
        NidWorkItem: '',
        CI_FilesType: [],
        CI_Region: [],
        CI_RequestType: [],
        CI_Years: [],
        CI_FilesTypeSelected: [],
        From: '',
        To: 200,
        CI_YearsSelected: [],
        UrbanNidKartablItem: '',
        StrNoTownDabir: '',
        RegisterPlack: '',
        OwnerName: '',
        ExportLicenseDate: '',
        Address: ''
      },
      currentData: [],
      skip: 0,
      take: 200,
      pageable: {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: [10, 50, 75, 100, 150, 200, 300, 400],
        previousNext: true
      },
      kartableColumns: [
        {
          field: 'rowId',
          title: ' ',
          width: 50
        },
        {
          field: 'CodeString',
          title: 'کدنوسازی'
        },
        {
          field: 'NidWorkItem',
          title: 'کد ارجاع',
          width: 80
        },
        {
          field: 'WorkflowTitel',
          title: 'نوع درخواست',
          width: 180
        },

        {
          field: 'UrbanNidKartablItem',
          title: 'کدارجاع شهرداری',
          width: 140
        },
        {
          field: 'CI_Years',
          title: 'سال'
        },
        {
          field: 'SInfrastructure',
          title: 'زیربنا'
        },
        {
          field: 'RequestDate',
          title: 'تاریخ درخواست'
        },
        {
          field: 'CreatedByName',
          title: 'تاریخ خروج از سهمیه',
          width: 220
        },
        {
          field: 'AssingToUserName',
          title: 'تاریخ مهر سبز',
          width: 200
        },
        {
          field: 'TaskStartDate',
          title: 'وضعیت پرونده'
        },

        {
          field: 'Starttime',
          title: 'مرحله'
        },
        {
          field: 'TaskArea',
          title: 'کاربر'
        },
        {
          field: 'TaskDesc',
          title: 'منطقه'
        },
        {
          field: 'TaskDesc',
          title: 'نوع پرونده '
        },
        {
          field: 'TaskDesc',
          title: 'کاربری'
        },
        {
          field: 'TaskDesc',
          title: 'شماره مجوز'
        },
        {
          field: 'TaskDesc',
          title: 'تاریخ مجوز'
        },
        {
          field: 'CI_RequestType',
          title: 'نوع درخواست'
        },
        {
          field: 'نام مالک',
          title: 'منطقه'
        },
        {
          field: 'Address',
          title: 'آدرس'
        }
      ],
      workflowTitleGroups: []
    }
  },

  computed: {
    ...mapGetters('kartable', ['kartableState']),

    totalRow () {
      return (this.currentData[0] && this.currentData[0].TotalRow) || 1
    },
    filterText () {
      const queries = Object.keys(this.filterModel)
        .filter((field) => Boolean(this.filterModel[field]))
        .map((field) => {
          const value = this.filterModel[field]
          if (value) {
            return `${field} LIKE N'%${value}%'`
          }
        })
      return queries.join(' AND ')
    },
    query () {
      if (this.filterText) {
        return `WHERE 1=1 AND ${this.filterText}`
      }
      const sql = generateSQLQuery(this.filter)
      if (!sql) {
        return ''
      }
      return `WHERE 1=1 AND ${sql}`
    },
    resetBtn () {
      return this.filter === null || this.filter === {}
    }
  },
  methods: {
    ...mapActions('kartable', ['setKartableState']),

    dbClickHandle () {
      // this.$router.push('/task')
      // this.$root.$emit('setForm', 'task')
      this.setForm({ formKey: 'system', formName: 'task', title: 'گردش کار' })
    },
    handlePageChange (e) {
      this.skip = e.page.skip
      this.take = e.page.take
      this.loadData()
    },
    handleSelectedChange (e) {
      this.$stKartable.dispatch('setSelectedRequestPasokhgo', e.dataItem)
    },
    handleGridFilter (e) {
      this.$stKartable.dispatch('setFilter', e.filter)
      this.filter = e.filter
      this.loadData()
    },
    async filterTextChanged () {
      await this.loadData()
      if (this.currentData.length === 1) {
        this.$stKartable.dispatch(
          'setSelectedRequest',
          this.currentData[0]
        )
        // this.$router.push('/task')
        // this.$root.$emit('setForm', 'task')
        this.setForm({ formKey: 'system', formName: 'task', title: 'گردش کار' })
      }
    },

    viewGroupMembersClick ({ dataItem }) {
      console.log('viewGroupMembersClick', dataItem)
      this.groupGuidToViewMembers = dataItem.AssingTo
      this.groupGuidToViewMembersDialog = !!this.groupGuidToViewMembers
    },

    storeCurrentState () {
      this.setKartableState({
        currentData: this.currentData,
        workflowTitleGroups: this.workflowTitleGroups,
        skip: this.skip,
        take: this.take,
        filter: this.filter,
        filterModel: this.filterModel
      })
    },
    restoreCurrentState () {
      this.currentData = this.kartableState.currentData || []
      this.workflowTitleGroups = this.kartableState.workflowTitleGroups
      this.skip = this.kartableState.skip
      this.take = this.kartableState.take
      this.filter = this.kartableState.filter
      this.filterModel = {
        NidWorkItem: '',
        BizCode: '',
        WorkflowTitel: '',
        ...this.kartableState.filterModel
      }
    },

    resetFilter () {
      this.filter = null
      this.skip = 0
      this.take = 200
      this.filterModel = {
        NidWorkItem: this.filterModel.NidWorkItem,
        BizCode: this.filterModel.BizCode,
        WorkflowTitel: this.filterModel.WorkflowTitel
      }
      this.loadData()
    },

    reset () {
      this.filter = null
      this.skip = 0
      this.take = 200
      this.filterModel = {
        NidWorkItem: '',
        BizCode: '',
        WorkflowTitel: ''
      }
      this.loadData()
    },
    // loading data
    loadData (searchValue) {
      this.showLoading()
      // this.pRequest.EngineerCode = searchValue
      // this.memberCode = searchValue
      // let data = { pRequest: this.pRequest }
      let ncode = null
      if (this.filterModel.NosaziCode) { ncode = this.filterModel.NosaziCode.split('-') }
      if (ncode) { console.log(ncode) }
      let pData = {
        ClsSearchEngine: {
          Apartment: 0,
          Block: 0,
          Building: 0,
          District: 0,
          House: 0,
          Region: 0,
          Shop: 0,
          NidWorkItem: this.filterModel.NidWorkItem,
          CI_FilesType: [],
          CI_Region: [],
          CI_RequestType: [],
          CI_Years: [],
          CI_FilesTypeSelected: [],
          From: 0,
          To: 20,
          CI_YearsSelected: [],
          UrbanNidKartablItem: this.filterModel.UrbanNidKartablItem,
          StrNoTownDabir: this.filterModel.StrNoTownDabir,
          RegisterPlack: this.filterModel.RegisterPlack,
          OwnerName: this.filterModel.OwnerName,
          ExportLicenseDate: this.filterModel.ExportLicenseDate,
          Address: this.filterModel.Address
        }
      }
      this.$services.engineers.GetSearchResult(pData)
        .then(({ data }) => {
          this.hideLoading()

          this.requestResults = this.getResponse(data)
          this.currentData = this.requestResults.data.GetSearchResultResult.SearchResult
        })
        .catch(response => {
          this.hideLoading()

          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async load () {
      try {
        this.loading = true
        this.currentData = []
        console.log(' engineers GetSearchResult')
        let ncode = this.filterModel.NosaziCode.split('-')
        if (ncode) { console.log(ncode) }
        let pData = {
          ClsSearchEngine: {
            Apartment: 0,
            Block: 0,
            Building: 0,
            District: 0,
            House: 0,
            Region: 0,
            Shop: 0,
            NidWorkItem: this.filterModel.NidWorkItem,
            CI_FilesType: [],
            CI_Region: [],
            CI_RequestType: [],
            CI_Years: [],
            CI_FilesTypeSelected: [],
            From: 0,
            To: 20,
            CI_YearsSelected: [],
            UrbanNidKartablItem: this.filterModel.UrbanNidKartablItem,
            StrNoTownDabir: this.filterModel.StrNoTownDabir,
            RegisterPlack: this.filterModel.RegisterPlack,
            OwnerName: this.filterModel.OwnerName,
            ExportLicenseDate: this.filterModel.ExportLicenseDate,
            Address: this.filterModel.Address
          }
        }
        const { data } = await this.$services.engineers.GetSearchResult(pData)
        console.log('@@@@@@@ GetSearchResult', data)
        this.result = this.getResponse(data)
        if (!this.result.success) {
          this.showError('کارتابل پاسخگو بارگذاری نشد')
          return
        }

        this.currentData = this.result.data
        this.currentData.forEach((x, i) => {
          x.rowId = this.skip + (i + 1)
        })
        this.workflowTitleGroups = []
        this.currentData.forEach(({ WorkflowTitel }) => {
          if (!this.workflowTitleGroups.includes(WorkflowTitel)) {
            this.workflowTitleGroups.push(WorkflowTitel)
          }
        })
        this.workflowTitleGroups = this.workflowTitleGroups.map(
          (WorkflowTitel) => ({
            ID: WorkflowTitel,
            Title: WorkflowTitel
          })
        )

        this.storeCurrentState()
        // end
      } catch (e) {
        console.log('eeeee', e)
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.loading = false
      }
    },
    reload () {
      this.loadData()
    }
  },
  mounted () {
    if (this.kartableState.currentData) {
      this.restoreCurrentState()
    }
    if (!this.currentData.length) {
      this.loadData()
    }
    if (this.filter) {
      this.filter = this.kartable.filter
    }
  }
  // beforeUpdate () {
  //   this.filter = this.$store.state.kartable.filter
  // }
}
</script>
<style>
.kartable-grid .k-grid {
  height: 100% !important;
}
</style>
