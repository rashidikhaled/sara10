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
    <section
      class="full-width"
      id="kartable-header"
    >
      <q-form
        @reset="reset"
        @submit="search"
      >
        <!-- پراپرتی placeHolder موقتا برای فیلترها با label جایگزین شد  -->
        <!-- به دلیل اینکه کامپوننت کمبو مالتی سلکت این قابلیت رو ندارد و قرار است در آینده بازنگری شود -->
        <div :class="$q.dark.isActive?'bg-lighten4 text-white':'bg-grey-2 text-dark'"
             class="row q-pa-sm items-center q-col-gutter-sm">
          <safa-text
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto text-left input-number col-lg-auto kartable-field"
            dir="ltr"
            label="شماره فرآیند"
            style="min-width: 170px;max-width: 94px;font-size: 13px;"
            type="number"
            v-model="filter.NidWorkItem"
          />
          <safa-combo
            type="multiple"
            label="نوع فرآیند"
            use-input
            clearable
            source-type="local"
            :searchValue="false"
            :options="allWorkflowTitles"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            style="min-width: 220px;"
            v-model="filter.WorkflowTitel"
          />
          <safa-combo
            type="multiple"
            label="مرحله"
            use-input
            clearable
            source-type="local"
            :searchValue="false"
            :options="allNodeTitles"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            style="min-width: 200px;"
            v-model="filter.NodeTitle"
          />
          <!-- <safa-text
            :list="allWorkflowTitles"
            :placeholder="'نوع فرآیند'"
            @autocomplete:select="search"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="min-width: 140px;"
            v-model="filter.WorkflowTitel"
          /> -->
          <div class="col-auto col-sm-auto">
            <safa-combo
              :options="[{ID:'Owner',Title:'فرآیند های منتظر مالک'},{ID:'User',Title:'فرآیند های مرتبط با من'},{ID:'All',Title:'همه'}]"
              :searchValue="false"
              source-type="local"
              style="width: 170px;"
              v-model="filter.ownerMode"
            />
          </div>
          <div class="col-auto col-sm-auto">
            <nosazi-code-input
              :actions="false"
              @enter="search"
              m="e"
              enabled="1-1-1-1-1-1-1"
              :loading="loading"
              v-model="filter.BizCode"
            />
            <!--            <nosazi-code-input
                          @input="reload"
                          actions
                          v-model="filter.BizCode"
                          :NosaziCode="baseNosaziCode"
                          enabled="0-0-0-1-1-1-1"

                          :m="mode"
                          label="کد نوسازی"
                          cdcName="baseNosaziCode"
                        />-->
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              :class="{'q-px-sm': $q.screen.lt.lg }"
              :dense="$q.screen.lt.lg"
              @click="search"
              class="no-wrap"
              :loading="loading"
              color="primary"
              size="11px"
            >
              <q-icon name="search"/>&nbsp;
              جستجو
            </q-btn>
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              :class="{'q-px-sm': $q.screen.lt.lg }"
              :dense="$q.screen.lt.lg"
              @click="reset"
              class="no-wrap"
              :loading="loading"
              color="primary"
              outline
              size="11px"
            >
              <q-icon name="refresh"/>&nbsp;
              نمایش همه
            </q-btn>
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              :class="{'q-px-sm': $q.screen.lt.lg }"
              :color="isAdvFilteredUsed?'green':'grey'"
              :dense="$q.screen.lt.lg"
              :outline="!showAdvancedSearch"
              @click="showAdvancedSearch=!showAdvancedSearch"
              class="no-wrap"
              size="11px"
            >
              <q-icon :name="showAdvancedSearch?'expand_less':'expand_more'"/>&nbsp;
              جستجوی پیشرفته
            </q-btn>
          </div>
          <q-space/>
          <div class="col-12 col-sm-auto">
            <q-btn
              :class="{'q-px-sm': $q.screen.lt.lg }"
              :color="isWorkflowChartVisible?'amber':'grey'"
              :dense="true"
              flat
              round
              @click="showWorkflowChart"
              class="no-wrap"
              icon="pie_chart"
              size="12px"
            />
          </div>
          <!--<div class="col-12 col-sm-auto">
            <div class="row">
              <div class="col-auto col-md-3 col-lg-auto" v-if="activeTab==='mention'">
                <safa-select2 :clearable="false" :customValue="x=> x.ID" :filterable="false" :options="mentionFilters"
                              :searchable="false" option-label="Title" style="width: 160px;"
                              v-model="mentionFilterStatus">
                  <template v-slot:option="option">
                    <q-icon :name="option.Icon" color="grey-6" size="xs"/>
                    {{ option.Title }}
                  </template>
                </safa-select2>
              </div>
              <div class="col-auto q-px-sm">
                <div class="q-gutter-x-md flex items-center">
                  <q-btn :color="activeTab==='mention' ? 'green':'grey'" @click="switchTo('mention')"
                         icon="assignment_turned_in" round
                         size="sm" title="درخواست های مرتبط با من">
                    &lt;!&ndash;                      <q-badge color="red" floating>3</q-badge>&ndash;&gt;
                  </q-btn>
                  <q-btn :color="activeTab==='kartable' ? 'primary':'grey'" @click="switchTo('kartable')"
                         icon="list_alt" round size="sm"
                         title="کارتابل">
                    &lt;!&ndash;                      <q-badge color="red" floating>1</q-badge>&ndash;&gt;
                  </q-btn>
                </div>
              </div>
            </div>
          </div>-->
        </div>
      </q-form>
    </section>
    <q-separator v-if="showAdvancedSearch" :dark="$q.dark.isActive"/>
    <div
      class="advanced-search q-pa-sm"
      :class="$q.dark.isActive?'bg-lighten4 text-white':'bg-grey-2 text-dark'"
      v-if="showAdvancedSearch"
    >
      <div class="row items-center q-col-gutter-sm">
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'ایجاد کننده فرآیند'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="min-width: 150px;"
            v-model="filter.ProcInitiatorName"
          />
        </div>
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'متقاضی'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="min-width: 150px;"
            v-model="filter.ProcRequester"
          />
        </div>
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'ارسال کننده'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="min-width: 150px;"
            v-model="filter.createdByName"
          />
        </div>
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'ارسال به'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="min-width: 150px;"
            v-model="filter.assingToUserName"
          />
        </div>
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'گروه'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="width: 200px;"
            v-model="filter.groupTitel"
          />
        </div>
        <div class="col-sm-auto col-6">
          <q-btn
            class="q-px-sm"
            color="primary"
            dense
            icon="add"
            label="تاریخ ایجاد"
            outline
            size="12px"
          >
            <q-popup-proxy>
              <q-date
                calendar="persian"
                landscape
                multiple
                v-model="filter.startDates"
              />
            </q-popup-proxy>
          </q-btn>
        </div>
        <div
          class="col-12 col-sm-auto"
          v-if="filter.startDates.length>0"
        >
          <div class="flex q-gutter-sm">
            <q-badge
              :key="i"
              color="grey"
              dense
              outline
              size="sm"
              v-for="(date,i) in filter.startDates"
            >{{ date }}
              <q-btn
                @click="filter.startDates = filter.startDates.filter((x,indx)=> x!==date)"
                colo="dark"
                flat
                icon="close"
                round
                size="xs"
              ></q-btn>
            </q-badge>
          </div>
        </div>
        <div class="col-sm-auto col-6">
          <q-btn
            class="q-px-sm"
            color="primary"
            dense
            icon="add"
            label="تاریخ ارجاع"
            outline
            size="12px"
          >
            <q-popup-proxy>
              <q-date
                calendar="persian"
                landscape
                multiple
                v-model="filter.taskStartDate"
              />
            </q-popup-proxy>
          </q-btn>
        </div>
        <div
          class="col-12 col-sm-auto"
          v-if="filter.taskStartDate.length>0"
        >
          <div class="flex q-gutter-sm">
            <q-badge
              :key="i"
              color="grey"
              dense
              outline
              size="sm"
              v-for="(date,i) in filter.taskStartDate"
            >{{ date }}
              <q-btn
                @click="filter.taskStartDate = filter.taskStartDate.filter((x)=> x!==date)"
                colo="dark"
                flat
                icon="close"
                round
                size="xs"
              ></q-btn>
            </q-badge>
          </div>
        </div>
      </div>
    </div>
    <q-separator :dark="$q.dark.isActive"/>
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
                <safa-datatable
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
                  <!-- <template v-slot:before-thead>
                    <span class="q-pr-sm" style="min-width: 24px;">
                      <q-btn @click="allTaskCollapsed=false" color="white" dense icon="add" size="7px"
                            style="color: #333 !important"
                            v-if="allTaskCollapsed"></q-btn>
                    </span>
                  </template> -->
                </safa-datatable>
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
  <!--    <safa-popup
        v-model="showRevokeRequest"
        width="500px"
        height="330px"
      >
        <RevokeRequest
          :taskInfo="taskInformation"
          @revokeDone="returnToKartable"
        />
      </safa-popup>-->
</template>

<script>
import { getAllNodeTitle, getAllWorkflowTitle, getMentionsByNidUser, getTaskByUser } from './services/kartable'
import mentionGrid from './partials/MentionGrid'
import GardeshParvandehDetails from './partials/GardeshParvandehDetails'
import WorkflowChart from './partials/WorkflowChart'
// import RevokeRequest from './task/RevokeRequest'
import mapMixin from 'src/mixins/mapMixin'
import { debounce } from 'quasar'

// eslint-disable-next-line no-undef
// const kartableConfig = window.getConfigValue('kartableConfig')

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
  name: 'Kartable',
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
      showAdvancedSearch: false,
      showRevokeRequest: false,
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
      allTaskCollapsed: true,
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
      allNodeTitles: [],
      allWorkflowTitles: [],
      currentDetail: {},
      currentNidProc: null,
      showVerticalPanel: false,
      verticalPanelTarget: GARDESH_KAR,
      splitterValue: 100,
      splitterLimit: [0, 100],
      taskInformation: {}
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
    kartableState () {
      return this.$stKartable.getters['kartableState']
    },
    totalRow () {
      return (
        (this.currentData &&
          this.currentData.length > 0 &&
          this.currentData[0].Total) ||
        0
      )
    },
    isAdvFilteredUsed () {
      return (
        this.filter.createrByName ||
        this.filter.assingToUserName ||
        this.filter.groupTitel ||
        this.filter.startDates.length > 0 ||
        this.filter.taskStartDate.length > 0
      )
    },
    kartableColumns () {
      return [
        {
          field: 'NidWorkItem',
          title: 'شماره فرآیند',
          width: 90,
          type: 'numeric',
          cell: 'request-number-template'
        },
        {
          field: 'TaskTitel',
          title: 'مرحله',
          width: 500,
          cell: 'task-status-template',
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
          cell: 'kartable-bizcode-template'
        },
        {
          field: 'IconUrl',
          title: 'تصویر',
          width: 50,
          cell: 'kartable-image-template'
        },
        {
          field: 'OwnerTask',
          title: 'دلایل انتظار',
          width: 360,
          cell: 'OwnerTaskDetailsTemplate'
        },
        {
          field: 'StartDate',
          title: 'تاریخ و زمان ایجاد',
          width: 150,
          cell: 'KartableTaskStartDateTimeTemplate'
        },
        {
          field: 'TaskStartDate',
          title: 'تاریخ و زمان ارجاع',
          width: 150,
          cell: 'KartableRequestStartDateTimeTemplate',
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
    /* FilteresItems () {
        return this.currentData
          .map(x => {
            return {
              TaskDesc: '',
              TaskTitel: '',
              CreatedByName: '', // ایجاد کننده درخواست / ارسال کننده
              AssingToUserName: '', // ارسال به
              TaskStartDate: '',
              TaskStartTime: '',
              ProcInitiatorName: '', // متقاضی
              showAll: false,
              ...x
            }
          })
          .filter(x => x.Task.length > 0)
      }, */
    currentUser () {
      // console.log('this.$stSecurity.getters[\'authorize/loggedUser\']', this.$stSecurity.getters['authorize/loggedUser'])
      return this.$stSecurity.getters['authorize/loggedUser'] || {}
    }
  },
  methods: {

    showWorkflowChart () {
      this.$store.dispatch('ui/setLayoutMode', 'half')
      this.$store.dispatch('ui/setLayoutWidth', 50)
      this.isWorkflowChartVisible = !this.isWorkflowChartVisible
    },
    // RevokeRequestClick (e) {
    //   this.taskInformation = e.dataItem
    //   this.showRevokeRequest = true
    // },
    returnToKartable () {
      this.reset()
      if (this.showRevokeRequest) {
        this.showRevokeRequest = false
      }
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
    initSearchAutocomplete () {
      getAllNodeTitle().then(({ data }) => {
        const list = data.data
        if (data.success && list) {
          this.allNodeTitles = list.map(x => {
            return {
              Title: x.NodeTitle,
              Id: x.NodeTitle
            }
          })
        }
      })

      getAllWorkflowTitle().then(({ data }) => {
        const list = data.data
        if (data.success && list) {
          // this.allWorkflowTitles = list
          //   .map(x => x.WorkflowCaption)
          //   .filter(x => typeof x === 'string')
          this.allWorkflowTitles = list.map(x => {
            return {
              Title: x.WorkflowCaption,
              Id: x.WorkflowCaption
            }
          })
        }
      })
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
      this.showAdvancedSearch = false
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
        // const to = ((this.page - 1) * this.take + this.take) - 1
        const strWhere = []

        let payload = {
          PAssingUser: this.getNidUser(),
          NidUser: this.$stSecurity.getters['authorize/session'], // this.getNidUser(), // => send session instead of niduser
          PtaskState: 0,
          From: from,
          PMode: this.filter.ownerMode
          // PStrWhere: ` AND BizCode='12-11-128-3-1-8-0'`
          // PStrWhere: this.getSqlQuery()
        }

        if (this.filter.NidWorkItem) {
          strWhere.push(
            ` NidWorkItem LIKE '%${this.filter.NidWorkItem.toString().trim()}%'`
          )
        }
        if (this.filter.NodeTitle.length > 0) {
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
        }
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
            showAll: false,
            ...x,
            Task,
            TaskStartDate: Task.length > 0 ? Task[Task.length - 1].TaskStartDate : '',
            TaskDesc: x.TaskDesc || Task.length > 0 ? Task[Task.length - 1].TaskDesc : '',
            TaskTitel: x.TaskTitel || '',
            CreatedByName: x.CreatedByName || Task.length > 0 ? Task[Task.length - 1].CreatedByName : '', // ایجاد کننده درخواست / ارسال کننده
            AssingToUserName: x.AssingToUserName || Task.length > 0 ? Task[Task.length - 1].AssingToUserName : '', // ارسال به
            TaskStartTime: x.TaskStartTime || Task.length > 0 ? Task[Task.length - 1].TaskStartTime : ''
          }
        })
        this.$stKartable.dispatch('setFilter', this.filter)
        /* this.workflowTitleGroups = []
                    this.currentData.forEach(({ WorkflowTitel }) => {
                      if (!this.workflowTitleGroups.some(x => x.Title === WorkflowTitel)) {
                        this.workflowTitleGroups.push({
                          ID: WorkflowTitel,
                          Title: WorkflowTitel
                        })
                      }
                    }) */

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
    const preloadFilter = this.$stKartable.getters['filter']
    if (preloadFilter) {
      this.filter = preloadFilter
      if (this.isAdvFilteredUsed) {
        this.showAdvancedSearch = true
      }
    }
    this.initSearchAutocomplete()
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
