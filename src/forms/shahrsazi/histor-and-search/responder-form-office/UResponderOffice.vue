<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <form-wrapper
    :padding="!showFormList"
    title="فرم پاسخگو دفاتر"
  >
    <template #header>
      <safa-status :result="result"/>
      <safa-status :result="userListRes"/>
      <safa-status :result="currentData"/>
      <q-btn
        v-if="showFormList"
        flat
        dense
        size="12px"
        color="primary"
        icon-right="arrow_back"
        @click="backToMainForm"
        label="بازگشت به فرم اصلی"
      />
    </template>
    <fit v-if="!showFormList">
      <div class="q-pb-sm">
        <div class="row q-col-gutter-md items-center">
          <!-- <safa-combo
            :options="districts"
            :value="baseNosaziCode.District"
            @input="districtChanged"
            class="col-12 col-sm-auto"
            label="منطقه"
        :use-input="false"
            source-type="local"
            :m="mode"
            style="min-width: 200px;"
            v-if="districts.length>0"
          /> -->
          <div class="col-12 col-sm-auto">
            <nosazi-code-input
              @enter="reload"
              :actions="true"
              v-model="baseNosaziCode"
              :m="mode"
              label="کد نوسازی"
              cdcName="baseNosaziCode"
            />
          </div>
          <!-- <safa-checkbox
            class="col-12 col-sm-auto"
            label="نمایش اطلاعات کد نوسازی حذف شده"
            v-model="showDeletedNosaziCode"
          /> -->
        </div>
      </div>
      <safa-splitter
        horizontal
        v-model="splitterModel"
      >
        <template #before>
          <safa-datatable
            helper="responderOfficeGrid"
            :selectable="true"
            @selectedChange="responseSelected"
            @showFormsClick="showForms"
            fit
            ref="gridMain"
            v-model="responserKartablResult"
            min-height="170px"
            max-height="100%"
            height="100%"
            cdcName="responderOfficeGrid"
            :paginate="false"
            :page="page"
            :take="take"
            :serverServe="true"
            :perPage="[10]"
            :countData="totalRow"
            @updatePagination="updatePaging"
          />
          <!--:pageable="pageable"
          :skip="skip"
          :take="take"
          :total="totalRow"
          @pagechange="pageChange"-->
        </template>
        <template #after>
          <safa-tabs
            v-model="currentTab"
            height="100%"
            fit
          >
            <template v-slot:tabs>
              <tab-menu
                label="لیست فعالیتهای صورت گرفته"
                name="operationList"
              ></tab-menu>
              <tab-menu
                label="گزارشات"
                name="reportList"
              ></tab-menu>
              <tab-menu
                name="CheckList"
                label="چک لیست"
              />
            </template>
            <tab-content
              :padding="false"
              name="operationList"
            >
              <fit>
                <safa-datatable
                  helper="responderOperationsGrid"
                  fit
                  :bordered="false"
                  v-model="performedActivityResult"
                  cdcName="responderOperationsGrid"
                />
              </fit>
            </tab-content>
            <tab-content
              :padding="false"
              name="reportList"
            >
              <fit>
                <safa-datatable
                  helper="responderReportsGrid"
                  fit
                  :bordered="false"
                  v-model="reportList"
                  cdcName="responderReportsGrid"
                />
              </fit>
            </tab-content>
            <tab-content
              name="CheckList"
              title="چک لیست"
              v-if="currentTab==='CheckList'"
            >
              <task-check-list
                :nidProc="selectedResponse.NidProc"
                :nidTask="currentNidTask "
                :readonly="true"
              ></task-check-list>
            </tab-content>
          </safa-tabs>
        </template>
      </safa-splitter>
    </fit>
    <fit v-else>
      <ResponderFormsOffice
        :task-info="selectedResponse"
        @backToMainForm="backToMainForm"
      />
    </fit>
  </form-wrapper>
  </safa-form>
</template>

<script>
import responderFilteringModel from './models/responderFiltering'
// import responseKartableModel from './models/responseKartable'
import processInfoModel from './models/processInfo'
import ResponderFormsOffice from './partials/ResponderFormsOffice'
import baseFormMixin from 'src/mixins/baseFormMixin'
import TaskCheckList from './partials/TaskCheckList'
import { getAllTaskByNidProc } from 'src/kartable/services/task'

export default {
  components: { ResponderFormsOffice, TaskCheckList },
  route: '/responsible-form-office/UResponderOffice',
  mixins: [baseFormMixin],
  data () {
    return {
      name: 'UResponderOffice',
      title: 'فرم پاسخگو دفاتر',
      formKey: '1906e953-2142-4353-a5a5-da85e8424d7c',
      main: true,
      sidebarCompatible: true,
      performedActivityResult: [],
      showFormList: false,
      splitterModel: 50,
      result: null,
      userListRes: null,
      userListData: null,
      currentTab: 'operationList',
      currentData: null,
      expansionState: true,
      responserKartablResult: [],
      selectedWorkflow: null,
      selectedResponse: null,
      selectedResponseData: { ...processInfoModel },
      showDeletedNosaziCode: false,
      reportList: [],
      baseNosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      filtering: { ...responderFilteringModel },
      skip: 0,
      take: 10,
      page: 1,
      total: 34,
      pageable: {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: [20, 50, 75, 100, 150, 200],
        previousNext: true
      },
      // eslint-disable-next-line no-undef
      districts: []
    }
  },

  props: ['nidProc', 'nosaziCode', 'bizCode'],
  created () {
    this.districts = window.getConfigValue('districts', [])
  },
  computed: {
    totalRow () {
      if (this.responserKartablResult.length > 0) {
        return (this.responserKartablResult[0] || {}).TableCount || 0
      } else {
        return 0
      }
    },
    config () {
      return {
        config: {
          District: this.baseNosaziCode && this.baseNosaziCode.District
        }
      }
    },

    query () {
      const sql = [];

      // NosaziCode fields
      ['District', 'Region', 'Block', 'House', 'Building', 'Apartment', 'Shop']
        .filter(field => this.baseNosaziCode[field] !== 0)
        .forEach(field => {
          sql.push(`BN.${field} = ${this.baseNosaziCode[field]}`)
        });

      // Number fields
      ['Base_RegisterPlack.CI_RegisterPlackTypeGroup']
        .filter(field => this.filtering[field] !== null)
        .forEach(field => {
          sql.push(`${field} = ${this.filtering[field]}`)
        });

      // Equal Op fields
      [
        'NidWorkItem',
        'EumRequestStatus',
        'w.WorkflowTitel',
        'Base_RegisterPlack.RegisterPlackTypeValue'
      ]
        .filter(field => this.filtering[field] !== null)
        .forEach(field => {
          sql.push(`${field} = N'${this.filtering[field]}'`)
        });

      // Like Op fields
      [
        'Base_PreCodeInfo.PreCode',
        'RequesterName',
        'NidWorkItemOld',
        'TelephoneNo'
      ]
        .filter(field => this.filtering[field] !== null)
        .forEach(field => {
          sql.push(`${field} LIKE N'%${this.filtering[field]}%'`)
        })

      // Dates fields
      if (this.filtering.RequestDateFrom != null) {
        sql.push(`RequestDate >= N'${this.filtering.RequestDateFrom}'`)
      }
      if (this.filtering.RequestDateTo != null) {
        sql.push(`RequestDate <= N'${this.filtering.RequestDateTo}'`)
      }
      if (this.filtering.ExportDateFrom != null) {
        sql.push(`ExportDate >= N'${this.filtering.ExportDateFrom}'`)
      }
      if (this.filtering.ExportDateTo != null) {
        sql.push(`ExportDate <= N'${this.filtering.ExportDateTo}'`)
      }
      if (!sql.length) {
        return ''
      }
      sql.push('**')
      return ' WHERE ' + sql.join(' AND ')
    }
  },
  beforeMount () {
    if (!this.forceReadonly) this.isEditable = true
    if (this.nosaziCode) {
      this.baseNosaziCode = this.convertToNosaziCodeObject(
        this.nosaziCode
      )
    }
  },
  methods: {
    updatePaging ({ page, perPage, total, lastPage, from, to }) {
      this.page = page
      this.take = perPage
      this.load()
    },
    backToMainForm () {
      this.showFormList = false
    },
    districtChanged (District) {
      this.baseNosaziCode = { ...this.baseNosaziCode, District }
    },
    resetFiltering () {
      this.filtering = { ...responderFilteringModel }
      this.selectedWorkflow = null
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    },

    showForms ({ dataItem }) {
      // // console.log('showForms', dataItem)
      this.selectedResponse = dataItem
      if (
        !this.selectedResponse.NidProc ||
        this.selectedResponse.NidProc === '00000000-0000-0000-0000-000000000000'
      ) {
        return this.showError('پروسه یافت نشد. NidProc Not Found')
      }
      this.showFormList = true
    },
    showArchiveCommissionClick (dataItem) {
      // console.log('showArchiveCommission', dataItem)
    },
    showArchiveShahrsaziClick (dataItem) {
      // console.log('showArchiveShahrsazi', dataItem)
    },
    showReportClick ({ dataItem }) {
      // console.log('showReport', dataItem)
    },

    responseSelected ({ dataItem }) {
      this.selectedResponse = dataItem || {}
      this.loadPerformedActivity()
    },
    pageChange (e) {
      this.skip = e.page.skip
      this.take = e.page.take
      this.load()
    },
    reload () {
      this.skip = 0
      this.take = 100
      this.load()
    },
    loadPerformedActivity () {
      if (!this.selectedResponse) {
        this.performedActivityResult = []
        return
      }
      getAllTaskByNidProc({ NidProc: this.selectedResponse.NidProc })
        .then(({ data }) => {
          this.performedActivityResult = data.data
          if (data.data.length > 0) {
            this.currentNidTask = data.data[0].NidTask
          }
          // console.log(this.currentNidTask, '@@@')
          // this.currentNidProc = data.data[0].NidProc
        })
        .catch(response => {
          console.error(response, 'responseError')
        })
    },
    async getUsersFromJobLocation () {
      try {
        this.showLoading()
        const payload = {
          NidJobLocation: this.$stSecurity.getters["authorize/user"].JobLocationGuid
        // search: this.searchUser
        }
        const { data } = await this.$services.security.getUsersFromJobLocation(payload)
        this.userListRes = this.getResponse(data)
        if (this.userListRes.success) {
          this.userListData = this.userListRes.data.data.list
          this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: "نمایش اطلاعات لیست کاربران"
          })
        }
      } catch (error) {

      } finally {
        this.hideLoading()
      }
    },
    async load () {
      if (
        !this.baseNosaziCode ||
        (this.baseNosaziCode && this.baseNosaziCode.District === 0)
      ) {
        return this.showError('لطفا منطقه را برای کد نوسازی تعیین نمایید')
      }
      try {
        this.showLoading()
        const from = (this.page - 1) * this.take
        const { data } = await this.$services.SC.getResponserKartabl(
          {
            pFromRow: from,
            pToRow: from + this.take,
            pWhere: this.query
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('اطلاعات بارگذاری نشد')
        }
        await this.getUsersFromJobLocation()
        let UserList = this.userListData.map(f => f.NidUser)
        this.currentData = this.result.data
        this.responserKartablResult = this.currentData.ResponserKartabl.filter(a => UserList.includes(a.ProcInitiator?.toUpperCase()))
        // let filterdOwnerName = this.currentData.ResponserKartabl.filter(x =>
        //   x.OwnerName === this.selectedRequest.ProcRequester
        // )
        // this.currentData.ResponserKartabl = filterdOwnerName.map(x => {
        //   return {
        //     ...x,
        //     BizCode: x.NosaziCode
        //   }
        // })
        this.expansionState = false
        await this.log({
          action: this.logActions.view,
          bizCode: this.nosaziCode,
          bizCodeTitle: 'کد نوسازی',
          nosaziCode: this.nosaziCode
        })
        // end
      } catch (e) {
        // this.showError('خطایی در سرویس رخ دارد')
        let user = this.currentUser
        console.log(user)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
