<template>
  <form-wrapper
    :padding="false"
    fullscreen
    hide-close
    hide-title
    vertical
  >
    <q-ajax-bar
      color="primary"
      position="top"
      ref="bar"
      size="3px"
      skip-hijack
    />
    <div
      class="fit q-pa-sm"
      id="kartable-launcher"
    >
      <div
        class="full-height"
      >
        <div
          :class="{'show-gardeshparvandeh':showVerticalPanel}"
          class="tab-kartable fit"
        >
          <safa-splitter
            :limits="splitterLimit"
            class="fit"
            horizontal
            margin="0"
            v-model="splitterValue"
          >
            <template v-slot:before>
              <fit>
                <safa-grid
                  @grid:ready="onReady"
                  v-model="currentData"
                  :m="'r'"
                  :height="'100%'"
                  :actions="[]"
                  :filterable="true"
                  :pagination="true"
                  :paginationPageSize="filter.take"
                  :getRowHeight="rowHeightComputed"
                  :columns="kartableColumns"
                  :context="{ allTaskCollapsed, suppressViewMore: true }"
                  :title="'کارتابل'"
                  ref="kartable"
                  id="main_kartable"/>

                <!--                <safa-datatable
                                  :lazyLoad="false"
                                  :allowCopy="false"
                                  :allowMultipleSelection="false"
                                  :allowNewRow="false"
                                  :allowRemoveRow="false"
                                  :bordered="true"
                                  :columns="kartableColumns"
                                  :contextmenu="false"
                                  :countData="totalRow"
                                  :custom-filter="true"
                                  :customButtons="customButtons"
                                  :extraProps="{collapsed: allTaskCollapsed}"
                                  :filterable="false"
                                  :loading-animation="loading"
                                  :paginate="true"
                                  :perPage="[20]"
                                  :serverServe="true"
                                  :show-row-number="false"
                                  :take="filter.take"
                                  :value="currentData"
                                  @selectedChange="handleSelectedChange"
                                  @updatePagination="updatePagination"
                                  class="fit kartable-grid"
                                  height="100%"
                                  m="r"
                                  margin="0"
                                  maxHeight="100%"
                                  minHeight="0"
                                  ref="kartable"
                                  searchable
                                  :settings="true"
                                  title="کارتابل"
                                  id="main_kartable"
                                >
                                  <template v-slot:col-TaskTitel-before>
                                      <span
                                        class="q-pr-sm"
                                        style="min-width: 24px;"
                                      >
                                        <q-btn
                                          @click="allTaskCollapsed=false"
                                          color="grey-2"
                                          dense
                                          icon="add"
                                          size="7px"
                                          style="color: #333 !important"
                                          v-if="allTaskCollapsed"
                                        ></q-btn>
                                        <q-btn
                                          @click="allTaskCollapsed=true"
                                          color="grey-2"
                                          dense
                                          icon="remove"
                                          size="7px"
                                          style="color: #333 !important"
                                          v-else
                                        ></q-btn>
                                      </span>
                                  </template>
                                </safa-datatable>-->
              </fit>
            </template>
            <template
              v-show="showVerticalPanel"
              v-if="verticalPanelTarget === 'gardesh_kar'"
              v-slot:after
            >
              <fit v-if="verticalPanelTarget === 'gardesh_kar'">
                <keep-alive>
                  <GardeshParvandehDetails
                    :NidProc="currentNidProc"
                    @close="showVerticalPanel=false"
                  />
                </keep-alive>
              </fit>
              <template v-if="verticalPanelTarget === 'mention'">
                <keep-alive>
                  <mentionGrid
                    @reload="loadMentions"
                    @close="showVerticalPanel=false"
                    :mention-list="mentionList"
                  />
                </keep-alive>
              </template>
            </template>
          </safa-splitter>
        </div>
      </div>
    </div>
    <WorkflowChart @back="isWorkflowChartVisible=false" v-if="isWorkflowChartVisible"/>
  </form-wrapper>
</template>

<script>
import {
  getMentionsByNidUser,
  getTaskByUser
  // getAllNodeTitle,
  // getAllWorkflowTitle
} from './services/kartable'
import mentionGrid from './partials/MentionGrid'
import GardeshParvandehDetails from './partials/GardeshParvandehDetails'
import WorkflowChart from './partials/WorkflowChart'
// import RevokeRequest from './task/RevokeRequest'
import mapMixin from 'src/mixins/mapMixin'
import { debounce } from 'quasar'

const defaultFilter = {
  NidWorkItem: '',
  WorkflowTitel: [],
  ProcInitiatorName: '',
  ProcRequester: '',
  NodeTitle: [],
  BizCode: '0-0-0-0-0-0-0',
  showOwnerTasks: false,
  page: 1,
  take: 20,
  createdByName: '',
  startDates: [],
  taskStartDate: [],
  assingToUserName: '',
  groupTitel: '',
  ownerMode: 'User'
}
const GARDESH_KAR = 'gardesh_kar'
const MENTION = 'mention'

// const ignoreKartalbeOverride = ['Task', 'WorkflowTitel', 'IconUrl']

export default {
  name: 'KartablePasokhgoo',
  route: '/',
  mixins: [mapMixin],
  components: {
    GardeshParvandehDetails,
    WorkflowChart,
    mentionGrid
    // RevokeRequest
  },
  data () {
    return {
      customButtons: [
        {
          icon: 'restore',
          onClick: this.toggleGardeshParvandehVisible,
          text: 'گردش فرآیند'
        },
        {
          icon: 'assignment_turned_in',
          onClick: this.toggleMentionVisible,
          text: 'درخواست های مرتبط با من'
        }
      ],
      isWorkflowChartVisible: false,
      mentionFilterStatus: 2,
      mentionFilters: [
        {
          Title: 'همه',
          ID: 2,
          Icon: 'markunread',
          Color: 'blue'
        },
        {
          Title: 'پاسخ داده شده',
          ID: 0,
          Icon: 'mark_email_read',
          Color: 'grey-5'
        },
        {
          Title: 'پاسخ داده نشده',
          ID: 1,
          Icon: 'mark_email_unread',
          Color: 'green'
        }
      ],
      loading: false,
      filter: {
        ...defaultFilter
      },
      currentData: [],
      // .map(col => {
      // const overrideCol = (kartableConfig.columns || []).find(x => x.field.toUpperCase() === col.field.toUpperCase() && !ignoreKartalbeOverride.map(x => x.toUpperCase()).includes(col.field.toUpperCase()))
      // return {
      //   ...col,
      //   ...(overrideCol || {})
      // }
      // }),
      mentionList: [],
      workflowTitleGroups: [],
      activeTab: 'kartable',
      currentDetail: {},
      currentNidProc: null,
      showVerticalPanel: false,
      verticalPanelTarget: GARDESH_KAR,
      splitterValue: 100,
      splitterLimit: [0, 100],
      taskInformation: {},

      //
      allTaskCollapsed: true,
      gridApi: null,
      columnApi: null
    }
  },
  props: {
    defaultActiveTab: String,
    layoutMode: String,
    layoutSplitterWidth: Number,
    q: [String, Number]
    //  taskInfo: Object,
  },
  computed: {
    isWorkflowChartLayoutVertical () {
      const isLayoutConditionTrue =
        this.layoutMode === 'half' && this.layoutSplitterWidth < 50
      return isLayoutConditionTrue || this.$q.screen.lt.lg
    },
    totalRow () {
      return (
        (this.currentData &&
          this.currentData.length > 0 &&
          this.currentData[0].Total) ||
        0
      )
    },
    kartableColumns () {
      return [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          field: 'NidWorkItem',
          title: 'شماره فرآیند',
          width: 100,
          type: 'numeric',
          cellRenderer: params => `<span dir="ltr" class="request-num text-center flex items-center justify-start no-wrap" style="line-height: normal">${params.value}</span>`,
          cellStyle: params => {
            if (params.data.BackgroundColor) {
              // mark police cells as red
              return { backgroundColor: params.data.BackgroundColor }
            }
            return null
          }
        },
        {
          field: 'TaskTitel',
          title: 'مرحله',
          width: 500,
          autoHeight: 'auto',
          cellRenderer: 'agTaskTitleTemplate',
          exportRender ({ row, column }) {
            const result = []
            for (let i = 0; i < row.Task.length; i++) {
              const task = row.Task[i]
              const statusText =
                parseInt(task.EumTaskStatus) === 0
                  ? 'درحال انجام'
                  : parseInt(task.EumTaskStatus) === 1
                    ? 'انجام شد'
                    : 'بررسی نشده'
              result.push(`مرحله: ${task.TaskTitel} , وضعیت: ${statusText}`)
            }

            return result.join(' *** ')
          }
        },
        {
          field: 'WorkflowTitel',
          title: 'نوع فرآیند',
          wrap: true,
          width: 260
        },
        {
          field: 'ProcRequester',
          title: 'متقاضی',
          width: 150
        },
        {
          field: 'BizCode',
          title: 'کد',
          width: 200,
          cellRenderer: params => `<div dir="ltr" class="bizcode justify-start flex no-wrap items-center">${this.generateBizCodeHtml(params.value)}</div>`
        },
        {
          field: 'IconUrl',
          title: 'تصویر',
          width: 75,
          filterable: false,
          cellRenderer: 'agKartableImageTemplate'
        },
        {
          field: 'OwnerTask',
          title: 'دلایل انتظار',
          width: 360,
          cell: 'agOwnerTaskDetailsTemplate'
        },
        {
          field: 'StartDate',
          title: 'تاریخ و زمان ایجاد',
          width: 150,
          cellRenderer: params => `<div dir="ltr" class="text-center flex items-center justify-center"><span>${params.data.StartDate} ${params.data.StartTime}</span></div>`
        },
        {
          field: 'TaskStartDate',
          title: 'تاریخ و زمان ارجاع',
          width: 150,
          cellRenderer: 'agKartableRequestStartDateTemplate',
          exportRender ({ row, column }) {
            return row.Task.map(x => x.TaskStartDate).join(' ، ')
          }
        },
        {
          field: 'CreatedByName',
          title: 'ارسال کننده',
          width: 150,
          cell: 'KartableCreatedByNameTemplate',
          exportRender ({ row, column }) {
            return row.Task.map(x => x.CreatedByName).join(' ، ')
          }
        },
        {
          field: 'AssingToUserName',
          title: 'ارسال به',
          width: 200,
          cell: 'KartableAssingToUserNameTemplate',
          exportRender ({ row, column }) {
            return row.Task.map(x => x.AssingToUserName).join(' ، ')
          }
        },
        {
          field: 'ProcInitiatorName',
          title: 'ایجاد کننده درخواست',
          width: 150
        },
        // {
        //   field: 'RevokeRequest',
        //   title: 'ابطال درخواست',
        //   label: 'ابطال درخواست',
        //   width: 120,
        //   editor: 'action'
        // },
        {
          field: 'GroupTitel',
          title: 'گروه',
          width: 140,
          editor: 'badge',
          color: 'indigo-1',
          style: {
            minWidth: '90px',
            color: '#1a237e'
          }
        },
        {
          field: 'TaskDesc',
          title: 'توضیحات',
          width: 250,
          cell: 'KartableTaskDescTemplate',
          exportRender ({ row, column }) {
            return row.Task.map(x => x.TaskDesc).join(' *** ')
          }
        }
      ].filter(x =>
        this.filter.ownerMode === 'Owner' ? true : x.field !== 'OwnerTask'
      )
    },
    currentUser () {
      // console.log('this.$stSecurity.getters[\'authorize/loggedUser\']', this.$stSecurity.getters['authorize/loggedUser'])
      return this.$stSecurity.getters['authorize/loggedUser'] || {}
    }
  },
  methods: {
    generateBizCodeHtml (val) {
      if (typeof val === 'string' && val.indexOf('-')) {
        let strResult = []
        val.split('-').forEach(s => {
          strResult.push(`<span>${s}</span>`)
        })
        return strResult.join(' <b>-</b> ')
      }
      return `<strong>${val}</strong>`
    },
    rowHeightComputed (params) {
      const taskCount = params.data.Task.length
      console.log('rowHeightComputed', taskCount, params.data.collapsed)
      if (!this.allTaskCollapsed || !params.data.collapsed) return taskCount * 44
      return 44
    },
    onReady ({ api, columnApi }) {
      this.gridApi = api
      this.columnApi = columnApi
    },
    updateContext () {
      this.allTaskCollapsed = !this.allTaskCollapsed
      if (this.gridApi) {
        this.$nextTick(() => {
          this.gridApi.refreshHeader()
          this.gridApi.redrawRows()
        })
      }
    },
    showWorkflowChart () {
      this.$store.dispatch('ui/setLayoutMode', 'half')
      this.$store.dispatch('ui/setLayoutWidth', 50)
      this.isWorkflowChartVisible = !this.isWorkflowChartVisible
    },
    returnToKartable () {
      this.reset()
    },
    toggleGardeshParvandehVisible () {
      if (this.verticalPanelTarget !== GARDESH_KAR) {
        this.showVerticalPanel = true
        this.verticalPanelTarget = GARDESH_KAR
      } else {
        this.showVerticalPanel = !this.showVerticalPanel
      }
    },
    toggleMentionVisible () {
      if (this.verticalPanelTarget !== MENTION) {
        this.showVerticalPanel = true
        this.verticalPanelTarget = MENTION
      } else {
        this.showVerticalPanel = !this.showVerticalPanel
      }
    },
    switchTo (key) {
      this.activeTab = key
    },
    updatePagination ({ page, perPage }) {
      this.filter.page = page
      this.filter.take = perPage
      this.load()
    },
    handleSelectedChange: debounce(function ({ dataItem, event }) {
      // const { BizCode } = dataItem
      // this.showCodeOnMap(BizCode)
      this.currentNidProc = dataItem.NidProc
      const tasks = document.querySelectorAll('.task--inner')
      let inSide = false
      tasks.forEach(element => {
        if (element === event.target || element.contains(event.target)) {
          inSide = true
        }
      })

      if (inSide || !dataItem['Task']) return

      const list = dataItem.Task
      if (list.length > 0) {
        const checkOk = item => {
          const checkSwimLine = parseInt(item.SwimLineName) !== 1
          const checkEnumTaskStatus =
            item.EumTaskStatus && parseInt(item.EumTaskStatus) === 1
          return checkSwimLine && !checkEnumTaskStatus
        }

        const result = list.filter(item => checkOk(item))
        let selectedRow = null
        if (result && result.length > 0) {
          selectedRow = {
            ...dataItem,
            Task: null,
            ...result[0]
          }
        } else {
          selectedRow = {
            ...dataItem,
            Task: null,
            ...list[0]
          }
        }

        const { BizCode } = selectedRow
        BizCode && this.showCodeOnMap(BizCode)

        this.$stKartable.dispatch('setSelectedNidTask', selectedRow.NidTask)
        this.$stKartable.dispatch('setSelectedRequest', selectedRow)
        this.$store.dispatch('engineer/selectRequest', selectedRow)
      }

      // this.$root.$emit('setForm', 'task')
    }, 10),
    normalizeBizCode (bizcode) {
      if (!bizcode) return ''
      const data = bizcode.split('-').reduce((result, s) => {
        if (!result) result = []
        if (parseInt(s) > 0) {
          result.push(s)
        }
        return result
      }, [])
      return data.join('-') + (data.length < 7 ? '-' : '')
    },
    reset () {
      this.filter = { ...defaultFilter }
      this.search()
    },
    convertToPersian (str) {
      if (typeof str === 'number') str = str.toString().trim()
      if (typeof str !== 'string') return str
      return str
        .replace(/ي/g, 'ی')
        .replace(/ك/g, 'ک')
        .replace(/ة/g, 'ه')
        .replace(/\u06A9/g, '\u0643') // ک
        .replace(/\u06CC/g, '\u0649') // ی
        .replace(/\u06CC/g, '\u064A') // ی
        .trim()
    },
    convertToArabic (str) {
      if (typeof str === 'number') str = str.toString().trim()
      if (typeof str !== 'string') return str
      return str
        .replace(/ی/g, 'ي')
        .replace(/ک/g, 'ك')
        // // .replace(/ه/g, 'ة')
        .replace(/\u0643/g, '\u06A9') // ک
        // .replace(/\u0649/g, '\u06CC') // ی
        // .replace(/\u064A/g, '\u06CC') // ی
        .trim()
    },
    normalizeFilter (strQuery, term) {
      return `(${strQuery.replace(
        /#term#/g,
        this.convertToArabic(term)
      )} OR ${strQuery.replace(/#term#/g, this.convertToPersian(term))})`
    },
    search () {
      this.filter.page = 1
      this.load()
    },
    async load () {
      if (this.loading) return
      try {
        this.loading = true
        this.$refs.bar.start()

        const from = (this.filter.page - 1) * this.filter.take
        const to = from + this.filter.take
        // const to = ((this.page - 1) * this.take + this.take) - 1
        const strWhere = []

        let payload = {
          PAssingUser: this.getNidUser(),
          NidUser: this.$stSecurity.getters['authorize/session'], // this.getNidUser(), // => send session instead of niduser
          PtaskState: 0,
          From: from,
          To: to,
          PMode: this.filter.ownerMode
          // PStrWhere: ` AND BizCode='12-11-128-3-1-8-0'`
          // PStrWhere: this.getSqlQuery()
        }

        if (this.filter.NidWorkItem) {
          strWhere.push(
            ` NidWorkItem LIKE '%${this.filter.NidWorkItem.toString().trim()}%'`
          )
        }
        /* if (this.filter.NodeTitle.length > 0) {
          let WorkflowWhere = []
          this.filter.NodeTitle.forEach(x => {
            WorkflowWhere.push(
              this.normalizeFilter(`TaskTitel LIKE N'%#term#%'`, x)
            )
          })
          strWhere.push('(' + WorkflowWhere.join(' OR ') + ')')
        }
        if (this.filter.WorkflowTitel.length > 0) {
          let WorkflowWhere = []
          this.filter.WorkflowTitel.forEach(x => {
            WorkflowWhere.push(
              this.normalizeFilter(`WorkflowTitel LIKE N'%#term#%'`, x)
            )
          })
          strWhere.push('(' + WorkflowWhere.join(' OR ') + ')')
        }
        if (this.filter.ProcInitiatorName) {
          strWhere.push(
            this.normalizeFilter(
              `ProcInitiatorName LIKE N'%#term#%'`,
              this.filter.ProcInitiatorName
            )
          )
        }
        if (this.filter.ProcRequester) {
          strWhere.push(
            this.normalizeFilter(
              `ProcRequester LIKE N'%#term#%'`,
              this.filter.ProcRequester
            )
          )
        }
        const bizcode = this.filter.BizCode
        if (bizcode && bizcode !== '0-0-0-0-0-0-0') {
          strWhere.push(
            ` (BizCode LIKE N'${this.normalizeBizCode(bizcode)}%')`
          )
        }
        // if (!this.filter.showOwnerTasks) strWhere.push(` SwimLineName !== 1`)
        if (this.filter.createdByName) {
          strWhere.push(
            this.normalizeFilter(
              `CreatedByName LIKE N'%#term#%'`,
              this.filter.createdByName
            )
          )
        }
        if (this.filter.assingToUserName) {
          strWhere.push(
            this.normalizeFilter(
              `AssingToUserName LIKE N'%#term#%'`,
              this.filter.assingToUserName
            )
          )
        }
        if (this.filter.groupTitel) {
          strWhere.push(
            this.normalizeFilter(
              `[GroupTitel] LIKE N'%#term#%'`,
              this.filter.groupTitel
            )
          )
        }
        if (this.filter.startDates.length > 0) {
          let DateQueryWhere = []
          this.filter.startDates.forEach(date => {
            DateQueryWhere.push(` ([StartDate] = '${date}')`)
          })
          strWhere.push('(' + DateQueryWhere.join(' OR ') + ')')
        }
        if (this.filter.taskStartDate.length > 0) {
          let DateQueryWhere = []
          this.filter.taskStartDate.forEach(date => {
            DateQueryWhere.push(` ([TaskStartDate] = '${date}')`)
          })
          strWhere.push('(' + DateQueryWhere.join(' OR ') + ')')
        } */
        // if (this.filter.NidWorkItem) payload.NidWorkItem = this.filter.NidWorkItem.toString() // .convertToPersian()
        // if (this.filter.NodeTitle) payload.NodeTitle = this.filter.NodeTitle // .convertToPersian()
        // if (this.filter.WorkflowTitel) payload.WorkflowTitel = this.filter.WorkflowTitel // .convertToPersian()
        // if (this.filter.ProcInitiatorName) payload.ProcInitiatorName = this.filter.ProcInitiatorName // .convertToPersian()
        // if (this.filter.BizCode) payload.BizCode = this.normalizeBizCode(this.filter.BizCode)
        // payload.SwimLineName = this.filter.showOwnerTasks ? 1 : 2

        if (strWhere.length > 0) {
          payload.StrWhere = ' AND ' + strWhere.join(' AND ')
        }
        const { data } = await getTaskByUser(payload)
        if (!Array.isArray(data) && data.hasOwnProperty('success') && !data.success) {
          const msg =
            typeof data.msg === 'string' ? data.msg : 'کارتابل بارگذاری نشد'
          this.showError(msg)
          if (msg.indexOf('دوباره وارد شوید') > -1) {
            this.$stSecurity.dispatch('authorize/clearSession')
            this.$stSecurity.dispatch('security/resetPermissions')
            // this.$root.$emit('setCommand', 'login')
            location.reload(true)
          }
          return
        }
        this.activeTab = 'kartable'
        this.currentData = (Array.isArray(data) ? data : data.data).map(x => {
          const Task = (x.Task && JSON.parse(x.Task)) || []
          return {
            ...x,
            Task,
            TaskStartDate: Task.length > 0 ? Task[Task.length - 1].TaskStartDate : '',
            TaskDesc: x.TaskDesc || Task.length > 0 ? Task[Task.length - 1].TaskDesc : '',
            TaskTitel: x.TaskTitel || '',
            CreatedByName: x.CreatedByName || Task.length > 0 ? Task[Task.length - 1].CreatedByName : '', // ایجاد کننده درخواست / ارسال کننده
            AssingToUserName: x.AssingToUserName || Task.length > 0 ? Task[Task.length - 1].AssingToUserName : '', // ارسال به
            TaskStartTime: x.TaskStartTime || Task.length > 0 ? Task[Task.length - 1].TaskStartTime : '',
            collapsed: this.allTaskCollapsed || false
          }
        })

        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.loading = false
        if (this.$refs.bar) this.$refs.bar.stop()
      }
    },
    reload () {
      console.log('kartable::reload')
      this.search()
      this.loadMentions()
    },
    loadMentions () {
      const self = this
      getMentionsByNidUser({
        NidUser: this.getNidUser(),
        status: self.mentionFilterStatus
      }).then(({ data }) => {
        self.mentionList = data && data.data && data.data.map(x => {
          return {
            ...x,
            class: parseInt(x.IsOpen) === 1 ? 'is-seen' : 'is-not-seen'
          }
        })
      })
    }
  },
  created () {
    this.$nextTick(() => {
      this.load()
    })
    /* if (this.filter) {
                                  this.filter = this.kartable.filter
                                } */
  },
  beforeMount () {
    this.$root.$on('refresh:kartable', this.reload)
    if (this.defaultActiveTab) {
      this.activeTab = this.defaultActiveTab
    }
    this.loadMentions()
  },
  beforeDestroy () {
    this.$root.$off('refresh:kartable', this.reload)
  },
  beforeUpdate () {
    // this.filter = this.$store.state.kartable.filter
  },
  watch: {
    'filter.showOwnerTasks' () {
      this.search()
    },
    'filter.ownerMode' () {
      this.search()
    },
    'filter.WorkflowTitel' () {
      this.search()
    },
    'filter.NodeTitle' () {
      this.search()
    },

    // 'filter.NodeTitle' () {
    //   this.search()

    //   // handler () {
    //   //   this.search()
    //   // },
    //   // deep: true
    // },
    mentionFilterStatus () {
      this.loadMentions()
    },
    showVerticalPanel () {
      this.splitterLimit = this.showVerticalPanel ? [0, Infinity] : [0, 100]
      this.splitterValue = this.showVerticalPanel ? 60 : 100
    },
    q (newVal) {
      if (newVal) {
        this.load()
      }
    }
  }
}
</script>
<style lang="scss">
.kartable-grid .k-grid {
  height: 100% !important;
}

.tab-mention {
  tr.is-not-seen {
    background-color: #ffffff;
  }

  tr.is-seen {
    background-color: rgba(242, 245, 245, 0.8);
    opacity: 0.9;
  }
}

@media screen and (max-width: 992px) {
  th.field-Comments {
    width: 500px !important;
  }
}

.input-number input {
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::-webkit-input-placeholder {
    /* Edge */
    text-align: left;
    direction: ltr /* rtl:ignore */
  ;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    text-align: left;
    direction: ltr /* rtl:ignore */
  ;
  }

  &::placeholder {
    text-align: left;
    direction: ltr /* rtl:ignore */
  ;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1300px) {
  .kartable-field {
    max-width: 120px !important;
  }
}

.tab-kartable:not(.show-gardeshparvandeh)
.q-splitter__separator.safa-sp--separator {
  display: none;
}

.adv-search-btn {
}

/*.adv-search-btn {
  width: 32px;
  height: 32px;
  display: inline-block;

  svg {
    width: 100%;
    height: 100%;
  }
}*/

.task-line-items {
  .task-line {
    height: 32px;
    margin-bottom: 5px;
    border-radius: 5px;
    border: 1px solid #eee;
    background-color: #fff;
    position: relative;
    padding: 4px;

    &:before {
      content: "";
      width: 10px;
      height: 10px;
      background-color: #fff;
      border-left: 1px solid #eee;
      border-top: 1px solid #eee;
      transform: rotate(-45deg) translateY(-50%);
      left: -2px;
      top: 50%;
      position: absolute;
      border-radius: 3px;
      z-index: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
