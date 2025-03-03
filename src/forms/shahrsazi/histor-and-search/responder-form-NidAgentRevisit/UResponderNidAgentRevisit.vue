<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <form-wrapper :padding="!showFormList" title="فرم پاسخگو بازدید">
    <template #header>
      <safa-status :result="result"/>
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
      <div class="row q-col-gutter-sm q-pb-sm">
        <div class="col-12 col-xl-2 col-lg-2 col-md-3 col-sm-3">
          <safa-text
            label="کد ارجاع"
            v-model="filtering.NidWorkItem"
            @keyup.enter="search"
          />
        </div>
        <div>
          <btn-search @click="search"/>
        </div>
      </div>
      <safa-splitter horizontal v-model="splitterModel">
        <template #before>
          <safa-datatable
            helper="responderOfficeGrid"
            :selectable="true"
            @selectedChange="responseSelected"
            @showFormsClick="showForms"
            fit
            ref="gridMain"
            v-model="currentData.ResponserKartabl"
            min-height="170px"
            max-height="100%"
            height="100%"
            cdcName="responderOfficeGrid"
          />
          <!--:pageable="pageable"
          :skip="skip"
          :take="take"
          :total="totalRow"
          @pagechange="pageChange"-->
        </template>
        <template #after>
          <safa-tabs v-model="currentTab" height="100%" fit>
            <template v-slot:tabs>
              <tab-menu
                label="لیست فعالیتهای صورت گرفته"
                name="operationList"
              ></tab-menu>
              <tab-menu label="گزارشات" name="reportList"></tab-menu>
              <tab-menu name="CheckList" label="چک لیست"/>
            </template>
            <tab-content :padding="false" name="operationList">
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
            <tab-content :padding="false" name="reportList">
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
              v-if="currentTab === 'CheckList'"
            >
              <task-check-list
                :nidProc="selectedResponse.NidProc"
                :nidTask="currentNidTask"
                v-if="currentNidTask"
                :readonly="true"
              ></task-check-list>
            </tab-content>
          </safa-tabs>
        </template>
      </safa-splitter>
    </fit>
    <fit v-else>
      <ResponderFormsRevisit
        :task-info="selectedResponse"
        @backToMainForm="backToMainForm"
      />
    </fit>
  </form-wrapper>
  </safa-form>
</template>

<script>
import responderFilteringModel from './models/responderFiltering'
import responseKartableModel from './models/responseKartable'
import ResponderFormsRevisit from './partials/ResponderFormsRevisit'
import baseFormMixin from 'src/mixins/baseFormMixin'
import TaskCheckList from './partials/TaskCheckList'
import { getAllTaskByNidProc } from 'src/kartable/services/task'

export default {
  components: { ResponderFormsRevisit, TaskCheckList },
  route: '/responsible-form-revisit/UResponderRevisit',
  mixins: [baseFormMixin],
  data () {
    return {
      name: 'UResponderNidAgentRevisit',
      title: 'فرم پاسخگو بازدید براساس کد ارجاع',
      formKey: '521ca3d4-b60f-4af6-99fc-cdbfad8a2da8',
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      showFormList: false,
      splitterModel: 50,
      result: null,
      currentTab: 'operationList',
      currentData: { ...responseKartableModel },
      expansionState: true,
      selectedResponse: null,
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
      take: 20,
      pageable: {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: [20, 50, 75, 100, 150, 200],
        previousNext: true
      },
      // eslint-disable-next-line no-undef
      districts: [],
      currentNidTask: null,
      performedActivityResult: []
    }
  },
  props: ['nidProc', 'nosaziCode', 'bizCode'],
  created () {
    this.districts = window.getConfigValue('districts', [])
  },
  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode && this.baseNosaziCode.District
        }
      }
    },
    totalRow () {
      return (this.currentData.ResponserKartabl[0] || {}).TableCount || 0
    },
    query () {
      const sql = [];
      ['NidWorkItem']
        .filter((field) => this.filtering[field] !== null)
        .forEach((field) => {
          sql.push(`${field} = N'${this.filtering[field]}'`)
        })
      if (!sql.length) {
        return ''
      }
      sql.push('**')
      return ' WHERE ' + sql.join(' AND ')
    }
  },
  methods: {
    backToMainForm () {
      this.showFormList = false
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
    responseSelected ({ dataItem }) {
      this.selectedResponse = dataItem || {}
      this.loadPerformedActivity()
    },
    // pageChange (e) {
    //   this.skip = e.page.skip
    //   this.take = e.page.take
    //   this.load()
    // },
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
        .catch((response) => {
          console.error(response, 'responseError')
        })
    },
    async search () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.SC.getRevisitAgentResponserKartabl(
            {
              pFromRow: this.skip,
              pToRow: this.skip + this.take,
              pWhere: this.query,
              NidRevisitAgent: this.getNidUser()
            },
            this.config
          )
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('اطلاعات بارگذاری نشد')
        }
        this.currentData = this.result.data
        this.expansionState = false
        // await this.log({
        //   action: this.logActions.view,
        //   bizCode: this.nosaziCode,
        //   bizCodeTitle: "کد نوسازی",
        //   nosaziCode: this.nosaziCode
        // })
        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
      }
    }
  }

}
</script>
