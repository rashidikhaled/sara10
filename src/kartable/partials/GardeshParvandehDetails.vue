<template>
  <fit>
    <q-card id="gardesh-parvandeh" flat bordered class="fit column q-my-sm" v-if="cmd === 'form'">
      <q-card-section class="q-pa-none col-auto">
        <div class="flex  q-pa-sm q-gutter-sm">
          <div>
            <q-btn
              flat
              dense
              padding="2px 8px"
              size="12px"
              color="primary"
              icon="arrow_forward"
              label="بازگشت به گردش پرونده"
              @click="cmd = 'default'"
            />
          </div>
          <div class="q-px-lg"></div>
          <safa-text
            label="نوع فرآیند"
            label-width="70px"
            v-model="taskInfo.WorkflowTitel"
            m="r"
          />
          <safa-text
            dir="ltr"
            label="شماره فرآیند"
            label-width="70px"
            type="number"
            v-model="taskInfo.NidWorkItem"
            m="r"
          />
          <safa-text
            label="نام متقاضی"
            label-width="70px"
            v-model="taskInfo.ProcRequester"
            m="r"
          />
          <safa-text label="کد" label-width="70px" v-model="taskInfo.BizCode" m="r"/>
          <safa-text
            label="مرحله"
            label-width="70px"
            v-model="taskInfo.TaskTitel"
            m="r"
          />
        </div>
        <!--        <gardesh-parvandehdetail-header @back="cmd = 'default'" :taskInfo="taskInfo"/>-->
      </q-card-section>
      <q-card-section class="q-pa-none col custom-scroll" style="min-height: 0; flex-grow: 1">
        <component
          fit
          :hideNosaziCodeHeader="true"
          :is="formName"
          :isLoading="isLoading"
          :taskInfo="taskInfo"
          :formState="currentFormState"
          :isSelectFromMenu="false"
          ref="selectedForm"
          @load="onFormLoaded"
          :forceReadonly="true"
          :isSelectFromGardeshParvandeh="true"
        />
      </q-card-section>
    </q-card>
    <safa-tabs
      v-model="activeTab"
      height="100%"
      :bordered="false"
      v-if="cmd !== 'form'"
    >
      <template v-slot:tabs>
        <tab-menu
          name="performedActivityList"
          label="لیست فعالیت های صورت گرفته"
        />
        <tab-menu name="description" label="توضیحات"/>
        <tab-menu name="checkList" label="چک لیست"/>
      </template>
      <template #after>
        <div class="flex items-center" style="margin-top: 5px">
          <q-btn
            size="sm"
            flat
            round
            color="primary"
            dense
            @click="$emit('close')"
          >
            <q-icon size="20px">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path
                  d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                />
                <path
                  d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                  fill="none"
                />
                <path
                  d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41z"
                />
              </svg>
            </q-icon>
          </q-btn>
        </div>
      </template>
      <tab-content name="performedActivityList" :padding="false">
        <safa-grid
          v-model="performedActivityResult"
          :columns="performedActivityColumns"
          fit
          m="r"
          :masterDetail="true"
          :detailCellRendererParams="detailCellRendererParams"
        />
      </tab-content>
      <tab-content name="description">
        <task-comments v-if="NidProc" :nidProc="NidProc" :readonly="true"/>
      </tab-content>
      <tab-content name="checkList">
        <task-checkList
          v-if="nidTask"
          :nidProc="NidProc"
          :nidTask="nidTask"
          :readonly="true"
        />
      </tab-content>
    </safa-tabs>
    <q-inner-loading
      :showing="loading"
      label="در حال بارگذاری اطلاعات..."
      label-class="text-primary"
      label-style="font-size: 1.1em"
    />
  </fit>
</template>
<script>
import { getAllTaskByNidProc, getTaskInfo } from '../services/task'
import TaskComments from '../task/TaskComments'
import TaskCheckList from '../task/TaskCheckList'
import TaskLauncherMixin from '../task/TaskLauncherMixin'
import ShowThumbnails from '../task/ShowThumbnails.vue'
import { convertStringToNosaziCodeObject } from '../utils/nosaziCodeOperation'
import { appendUrls } from 'src/utils'

export default {
  name: 'GardeshParvandehDetails',
  mixins: [TaskLauncherMixin],
  components: {
    TaskComments,
    TaskCheckList,
    ShowThumbnails
  },
  data: function () {
    return {
      activeTab: 'performedActivityList',
      loading: false,
      performedActivityColumns: [
        // {
        //   field: 'itemDetail',
        //   title: 'نمایش جزییات',
        //   width: '90px',
        //   editor: 'action'
        // },
        {
          field: '',
          title: '',
          width: '40px',
          filterable: false,
          lockPosition: true,
          pinned: 'right',
          cellRenderer: 'agGroupCellRenderer'
        },
        {
          field: 'TaskTitel',
          title: 'نام فعالیت',
          width: '200px',
          lockPosition: true,
          pinned: 'right'
        },
        { field: 'CreatedByName', title: 'درخواست کننده کار', width: '200px' },
        { field: 'AssingToUserName', title: 'ارجاع شده به', width: '200px' },
        { field: 'TaskClosedUserName', title: 'انجام دهنده', width: '200px' },
        {
          field: 'TaskStartDate',
          title: 'تاریخ شروع',
          editor: 'date',
          width: '120px'
        },
        { field: 'TaskStartTime', title: 'ساعت شروع', width: '120px' },
        {
          field: 'TaskCloseDate',
          title: 'تاریخ پایان',
          editor: 'date',
          width: '120px'
        },
        { field: 'TaskCloseTime', title: 'ساعت پایان', width: 'auto' }
      ],
      performedActivityResult: [],
      nidTask: '',

      forms: [],
      reports: [],
      taskInfo: {
        WorkflowTitel: '',
        BizCode: '',
        NidWorkItem: '',
        ProcRequester: 'علي ص',
        TaskTitel: 'بروکف'
      },
      form: null,
      cmd: 'default',
      params: {},
      report: null,

      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          // rowSelection: 'multiple',
          // suppressRowClickSelection: true,
          // enableRangeSelection: true,
          pagination: true,
          detailRowAutoHeight: true,
          detailRowHeight: 400,
          // paginationAutoPageSize: true,
          defaultColDef: {
            sortable: true,
            flex: 1
          },
          columnDefs: [
            {
              field: 'itemDetail',
              title: '',
              btnIcon: 'keyboard_arrow_left',
              width: '120px',
              lockPosition: true,
              filterable: true,
              pinned: 'right',
              cellStyle: {
                padding: 0,
                margin: 0
              },
              btnTitle: 'نمایش جزئیات',
              cellRenderer: 'agCallbackBtn',
              callback: (params) => this.selectMasterDetailsItem(params)
            },
            { field: 'Type', title: 'نوع', width: '80px' },
            { field: 'Caption', title: 'عنوان فرم/گزارش', width: 'auto' }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: async (params) => {
          const res = await this.getTaskInfo(params.data.NidTask)
          setTimeout(async function () {
            await params.successCallback(res)
            // }
          }, 1000)
        }
      }
    }
  },
  props: {
    NidProc: String
  },
  methods: {
    loadPerformedActivity () {
      if (!this.NidProc) {
        this.performedActivityResult = []
        return
      }
      this.loading = true
      getAllTaskByNidProc({ NidProc: this.NidProc })
        .then(async ({ data }) => {
          this.performedActivityResult = data.data
          this.nidTask = data.data[0].NidTask
          this.cmd = 'default'
        })
        .catch((e) => {
          console.error(e, 'getAllTaskByNidProc Error')
        }).finally(() => {
          this.loading = false
        })
    },
    async selectMasterDetailsItem (e) {
      if (e.StrType === 'Form') {
        this.selectForm(e)
      } else {
        this.selectReport(e)
      }
    },
    async getTaskInfo (NidTask) {
      try {
        this.showLoading()
        const { data } = await getTaskInfo({
          NidUser: this.getNidUser(),
          FullName: this.currentUser.FullName,
          NidTask
        })
        const res = data.data
        this.forms = res?.Forms ?? []
        this.reports = res?.Reports ?? []
        if (res.TaskInfo) {
          this.taskInfo = res.TaskInfo
        }
        const tmp = this.forms.concat(this.reports)
        const list = tmp.map((m) => {
          return {
            ...m,
            Type: m.StrType === 'Form' ? 'فرم' : 'گزارش'
          }
        })
        return list
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    onFormLoaded () {
      this.$nextTick(() => {
        if (this.$refs.selectedForm) {
          this.$refs.selectedForm.title = this.formCaption
        }
      })
    },
    selectForm (form) {
      this.form = form
      this.cmd = 'form'
      this.$emit('showFullSize', true)
    },
    async selectReport (report) {
      this.showLoading()
      try {
        const payload = this.buildReportPayload(report)
        // eslint-disable-next-line no-undef
        const baseUrl = window.getConfigValue('systemReportUrl')
        const methodName = 'SetParameters'
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        const res = await fetch(appendUrls([baseUrl, methodName]), {
          headers,
          method: 'POST',
          body: JSON.stringify(payload)
        })
        const result = await res.json()
        const sessionId = result.SetParametersResult
        if (sessionId) {
          // eslint-disable-next-line no-undef
          const url = `${window.getConfigValue(
            'systemReportViewer'
          )}?SessionId=${sessionId}`
          const params = [
            'height=' + screen.height - 10,
            'width=' + screen.width - 10,
            'fullscreen=yes' // only works in IE, but here for completeness
          ].join(',')
          // eslint-disable-next-line no-unused-vars
          const popup = window.open(url, '_blank', params)
          popup.moveTo(0, 0)
        }
      } finally {
        this.hideLoading()
      }
    },
    buildReportPayload (report) {
      const sessionModel = {}
      const District =
        this.taskInfo && this.taskInfo.BizCode
          ? convertStringToNosaziCodeObject(this.taskInfo.BizCode).District
          : 1
      const NidUser = this.getNidUser()
      const paramsToReplace = {
        District,
        NidUser,
        ...this.taskInfo
      }
      sessionModel.reportPath =
        report.Url.split('&ReportParameter=')[0].split('ReportPath=')[1]
      let baseReqQuery = report.Url.split('&ReportParameter=')[1] // this.createReqQuery(report)
      console.group('::report params::')
      console.log('report params: ', baseReqQuery)
      for (const pKey in paramsToReplace) {
        console.log(`replace "{${pKey}}" with "${paramsToReplace[pKey]}"`)
        baseReqQuery = baseReqQuery.replace(
          new RegExp(`{${pKey}}`, 'gi'),
          paramsToReplace[pKey]
        )
      }
      console.groupEnd()
      console.log('baseReqQuery', baseReqQuery)
      sessionModel.parameters = baseReqQuery
      return { ...sessionModel }
    }
  },
  mounted () {
    this.loadPerformedActivity()
  },
  computed: {
    currentFormState () {
      return this.form
    },
    formName () {
      return (this.form && this.form.FormUrl?.trim()) || ''
    },
    formCaption () {
      return (this.form && this.form.Caption) || ''
    }
  },
  watch: {
    NidProc () {
      this.loadPerformedActivity()
    },
    forms () {
      if (this.forms.length === 0 && this.activeTab === 'tabForms') {
        this.activeTab = 'performedActivityList'
      }
    },
    reports () {
      if (this.reports.length === 0 && this.activeTab === 'tabReports') {
        this.activeTab = 'performedActivityList'
      }
    }
  }
}
</script>
<style lang="scss">
#gardesh-parvandeh {
  .fw-close-btn {
    display: none !important;
    pointer-events: none !important;
  }
}
</style>
