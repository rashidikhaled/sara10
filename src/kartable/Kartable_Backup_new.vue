<template>
  <form-wrapper :padding="false" fullscreen hide-close hide-title vertical>
    <section class="full-width" id="kartable-header">
      <q-form @reset="reset" @submit="search">
        <!-- پراپرتی placeHolder موقتا برای فیلترها با label جایگزین شد  -->
        <!-- به دلیل اینکه کامپوننت کمبو مالتی سلکت این قابلیت رو ندارد و قرار است در آینده بازنگری شود -->
        <div
          :class="
            $q.dark.isActive ? 'bg-lighten4 text-white' : 'bg-grey-2 text-dark'
          "
          class="row q-pa-sm items-center q-col-gutter-sm"
        >
          <safa-text
            @keydown.enter="nidWorkItemEntered"
            class="col-12 col-sm-3 col-md-auto text-left input-number col-lg-auto kartable-field"
            dir="ltr"
            label="شماره فرآیند"
            style="min-width: 170px; max-width: 94px; font-size: 13px"
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
            style="min-width: 220px"
            v-model="filter.WorkflowTitel"
            @input="workflowTitelChanged"
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
            style="min-width: 200px"
            v-model="filter.NodeTitle"
            @input="nodeTitelChanged"
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
              :options="[
                { ID: 'Owner', Title: 'فرآیند های منتظر مالک' },
                { ID: 'User', Title: 'فرآیند های مرتبط با من' },
                { ID: 'All', Title: 'همه' },
              ]"
              :searchValue="false"
              source-type="local"
              style="width: 170px"
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
              :class="{ 'q-px-sm': $q.screen.lt.lg }"
              :dense="$q.screen.lt.lg"
              @click="search"
              class="no-wrap"
              :loading="loading"
              color="primary"
              size="11px"
            >
              <q-icon name="search" />&nbsp; جستجو
            </q-btn>
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              :class="{ 'q-px-sm': $q.screen.lt.lg }"
              :dense="$q.screen.lt.lg"
              @click="reset"
              class="no-wrap"
              :loading="loading"
              color="primary"
              outline
              size="11px"
            >
              <q-icon name="refresh" />&nbsp; نمایش همه
            </q-btn>
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              :class="{ 'q-px-sm': $q.screen.lt.lg }"
              :color="isAdvFilteredUsed ? 'green' : 'grey'"
              :dense="$q.screen.lt.lg"
              :outline="!showAdvancedSearch"
              @click="showAdvancedSearch = !showAdvancedSearch"
              class="no-wrap"
              size="11px"
            >
              <q-icon
                :name="showAdvancedSearch ? 'expand_less' : 'expand_more'"
              />&nbsp; جستجوی پیشرفته
            </q-btn>
          </div>
          <q-space />
          <div class="col-12 col-sm-auto">
            <q-btn
              :class="{ 'q-px-sm': $q.screen.lt.lg }"
              :color="isWorkflowChartVisible ? 'amber' : 'grey'"
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
    <q-separator v-if="showAdvancedSearch" :dark="$q.dark.isActive" />
    <div
      class="advanced-search q-pa-sm"
      :class="
        $q.dark.isActive ? 'bg-lighten4 text-white' : 'bg-grey-2 text-dark'
      "
      v-if="showAdvancedSearch"
    >
      <div class="row items-center q-col-gutter-sm">
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'ایجاد کننده فرآیند'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="min-width: 150px"
            v-model="filter.ProcInitiatorName"
          />
        </div>
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'متقاضی'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="min-width: 150px"
            v-model="filter.ProcRequester"
          />
        </div>
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'ارسال کننده'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="min-width: 150px"
            v-model="filter.CreatedByName"
          />
        </div>
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'ارسال به'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="min-width: 150px"
            v-model="filter.AssingToUserName"
          />
        </div>
        <div class="col-sm-auto col-6">
          <safa-text
            :placeholder="'گروه'"
            @keydown.enter="search"
            class="col-12 col-sm-3 col-md-auto col-lg-auto kartable-field"
            label=""
            style="width: 200px"
            v-model="filter.GroupTitel"
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
        <div class="col-12 col-sm-auto" v-if="filter.startDates.length > 0">
          <div class="flex q-gutter-sm">
            <q-badge
              :key="i"
              color="grey"
              dense
              outline
              size="sm"
              v-for="(date, i) in filter.startDates"
              >{{ date }}
              <q-btn
                @click="
                  filter.startDates = filter.startDates.filter(
                    (x, indx) => x !== date
                  )
                "
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
        <div class="col-12 col-sm-auto" v-if="filter.taskStartDate.length > 0">
          <div class="flex q-gutter-sm">
            <q-badge
              :key="i"
              color="grey"
              dense
              outline
              size="sm"
              v-for="(date, i) in filter.taskStartDate"
              >{{ date }}
              <q-btn
                @click="
                  filter.taskStartDate = filter.taskStartDate.filter(
                    (x) => x !== date
                  )
                "
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
    <q-separator :dark="$q.dark.isActive" />
    <div class="fit q-pa-sm" id="kartable-launcher">
      <div class="full-height">
        <div
          :class="{ 'show-gardeshparvandeh': showVerticalPanel }"
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
                  :addRow="false"
                  :allowCopy="false"
                  :deleteRow="false"
                  :bordered="true"
                  :paginate="true"
                  :pageSize="20"
                  :cacheBlockSize="20"
                  :getRowHeight="() => 44"
                  :animateRows="true"
                  :headerHeight="32"
                  rowModelType="serverSide"
                  :filterable="true"
                  :columns="agKartableColumns"
                  :allowMultipleSelection="false"
                  @row:click="handleSelectedChange"
                  @pagination:changed="onPaginationChanged"
                  @grid:ready="onGridReady"
                  title="کارتابل"
                  theme="alpine"
                  class="kartable-grid compact"
                  id="main_kartable"
                  ref="kartable"
                  @filter:changed="onFilterChanged"
                >
                  <template v-slot:header>
                    <q-btn
                      v-for="(button, i) in customButtons"
                      flat
                      dense
                      color="grey-8"
                      :title="button.text"
                      :icon="button.icon"
                      size="sm"
                      @click="button.onClick"
                      :key="i"
                      class="q-mr-sm"
                    />
                  </template>
                </safa-grid>
              </fit>
            </template>
            <template v-if="showVerticalPanel" v-slot:after>
              <fit v-if="verticalPanelTarget === 'gardesh_kar'">
                <keep-alive>
                  <GardeshParvandehDetails
                    :NidProc="currentNidProc"
                    @close="showVerticalPanel = false"
                  />
                </keep-alive>
              </fit>
              <template v-else-if="verticalPanelTarget === 'mention'">
                <keep-alive>
                  <mentionGrid
                    @reload="loadMentions"
                    @close="showVerticalPanel = false"
                    :mention-list="mentionList"
                  />
                </keep-alive>
              </template>
            </template>
          </safa-splitter>
        </div>
      </div>
    </div>
    <WorkflowChart
      @back="isWorkflowChartVisible = false"
      v-if="isWorkflowChartVisible"
    />
  </form-wrapper>
</template>

<script>
import {
  getAllNodeTitle,
  getAllWorkflowTitle,
  getMentionsByNidUser,
  getTaskByUser
} from "./services/kartable"
import mentionGrid from "./partials/MentionGrid"
import GardeshParvandehDetails from "./partials/GardeshParvandehDetails"
import WorkflowChart from "./partials/WorkflowChart"
// import RevokeRequest from './task/RevokeRequest'
import mapMixin from "src/mixins/mapMixin"
import { debounce } from "quasar"

// eslint-disable-next-line no-undef
// const kartableConfig = window.getConfigValue('kartableConfig')

const defaultFilter = {
  NidWorkItem: "",
  WorkflowTitel: [],
  ProcInitiatorName: "",
  ProcRequester: "",
  NodeTitle: [],
  BizCode: "0-0-0-0-0-0-0",
  showOwnerTasks: false,
  page: 1,
  take: 20,
  CreatedByName: "",
  startDates: [],
  taskStartDate: [],
  AssingToUserName: "",
  GroupTitel: "",
  ownerMode: "User"
}
const GARDESH_KAR = "gardesh_kar"
const MENTION = "mention"
const FILTER_PARAMS = ["NidWorkItem", "TaskTitel", "WorkflowTitel", "ProcRequester", "BizCode", "OwnerTask", "StartDate", "TaskStartDate", "CreatedByName", "AssingToUserName", "ProcInitiatorName", "GroupTitel"]

// const ignoreKartalbeOverride = ['Task', 'WorkflowTitel', 'IconUrl']

export default {
  // name: "Kartable",
  route: "/",
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
      customButtons: [
        {
          icon: "restore",
          onClick: this.toggleGardeshParvandehVisible,
          text: "گردش فرآیند"
        },
        {
          icon: "assignment_turned_in",
          onClick: this.toggleMentionVisible,
          text: "درخواست های مرتبط با من"
        }
      ],
      allTaskCollapsed: true,
      isWorkflowChartVisible: false,
      mentionFilterStatus: 2,
      mentionFilters: [
        {
          Title: "همه",
          ID: 2,
          Icon: "markunread",
          Color: "blue"
        },
        {
          Title: "پاسخ داده شده",
          ID: 0,
          Icon: "mark_email_read",
          Color: "grey-5"
        },
        {
          Title: "پاسخ داده نشده",
          ID: 1,
          Icon: "mark_email_unread",
          Color: "green"
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
      activeTab: "kartable",
      allNodeTitles: [],
      allWorkflowTitles: [],
      currentDetail: {},
      currentNidProc: null,
      showVerticalPanel: false,
      verticalPanelTarget: GARDESH_KAR,
      splitterValue: 100,
      splitterLimit: [0, 100],
      taskInformation: {},
      gridApi: null,
      // Pagination
      pagination: {
        CurrentPage: 1,
        PageSize: 20
      }
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
        this.layoutMode === "half" && this.layoutSplitterWidth < 50
      return isLayoutConditionTrue || this.$q.screen.lt.lg
    },
    kartableState () {
      return this.$stKartable.getters["kartableState"]
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
        this.filter.AssingToUserName ||
        this.filter.GroupTitel ||
        this.filter.startDates.length > 0 ||
        this.filter.taskStartDate.length > 0
      )
    },
    agKartableColumns () {
      return [
        {
          field: "NidWorkItem",
          title: "شماره فرآیند",
          width: 125,
          minWidth: 125,
          align: "center",
          cellRenderer: "agRequestNumberTemplate",
          cellStyle: {
            justifyContent: "center"
          },
          filter: "agSetColumnFilter",
          filterExtra: this.filterExtra
        },
        {
          field: "TaskTitel",
          title: "مرحله",
          width: 500,
          cellRenderer: "agTaskStatusTemplate",
          valueGetter: (col, params) => {
            const result = []
            if (
              Array.isArray(params?.data?.Task) &&
              params.data.Task.length > 0
            ) {
              for (let i = 0; i < params.data.Task.length; i++) {
                const task = params.data.Task[i]
                const statusText =
                  parseInt(task.EumTaskStatus) === 0
                    ? "درحال انجام"
                    : parseInt(task.EumTaskStatus) === 1
                      ? "انجام شد"
                      : "بررسی نشده"
                result.push(`مرحله: ${task.TaskTitel} , وضعیت: ${statusText}`)
              }
            }

            return result.join(" *** ")
          },
          collapsed: this.allTaskCollapsed,
          cellStyle: {
            display: "block",
            padding: "0"
          },
          filter: "agSetColumnFilter",
          filterExtra: this.filterExtraCombo
        },
        {
          field: "WorkflowTitel",
          title: "نوع فرآیند",
          width: 260,
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtraCombo
        },
        {
          field: "ProcRequester",
          title: "متقاضی",
          width: 150,
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        },
        {
          field: "BizCode",
          title: "کد",
          width: 200,
          cellRenderer: "agKartableBizCode",
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        },
        {
          field: "IconUrl",
          title: "تصویر",
          width: 70,
          minWidth: 70,
          filter: false,
          filterable: false,
          floatingFilter: false,
          suppressMenu: true,
          resizable: false,
          cellRenderer: "agKartableImageTemplate2"
        },
        {
          field: "OwnerTask",
          title: "دلایل انتظار",
          width: 360,
          cell: "OwnerTaskDetailsTemplate",
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        },
        {
          field: "StartDate",
          title: "تاریخ و زمان ایجاد",
          width: 150,
          cellRenderer: "agKartableTaskStartDateTimeTemplate",
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        },
        {
          field: "TaskStartDate",
          title: "تاریخ و زمان ارجاع",
          width: 150,
          cellRenderer: "agKartableRequestStartDateTimeTemplate",
          valueGetter: (col, params) => {
            return (
              params?.data?.Task.map((x) => x.TaskStartDate).join(" ، ") || ""
            )
          },
          cellStyle: {
            padding: "0"
          },
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        },

        {
          field: "CreatedByName",
          title: "ارسال کننده",
          width: 150,
          cellRenderer: "agKartableCreatedByNameTemplate2",
          valueGetter: (col, params) => {
            return (
              params?.data?.Task.map((x) => x.CreatedByName).join(" ، ") || ""
            )
          },
          cellStyle: {
            padding: "0"
          },
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        },
        {
          field: "AssingToUserName",
          title: "ارسال به",
          width: 200,
          cellRenderer: "agKartableAssingToUserNameTemplate2",
          valueGetter: (col, params) => {
            return (
              params?.data?.Task.map((x) => x.AssingToUserName).join(" ، ") ||
              ""
            )
          },
          cellStyle: {
            padding: "0"
          },
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        },
        {
          field: "ProcInitiatorName",
          title: "ایجاد کننده درخواست",
          width: 240,
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        },
        // {
        //   field: 'RevokeRequest',
        //   title: 'ابطال درخواست',
        //   label: 'ابطال درخواست',
        //   width: 120,
        //   editor: 'action'
        // },
        {
          field: "GroupTitel",
          title: "گروه",
          width: 140,
          cellRenderer: "agKartableTaskGroupTitel",
          cellStyle: {
            justifyContent: "center",
            padding: "0"
          },
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        },
        {
          field: "TaskDesc",
          title: "توضیحات",
          width: 250,
          cellRenderer: "agKartableTaskDescTemplate",
          valueGettfer: (col, params) => {
            return (
              params?.data?.Task.map((x) => x.TaskDesc).join(" *** ") || ""
            )
          },
          cellStyle: {
            padding: "0"
          },
          filter: 'agSetColumnFilter',
          filterExtra: this.filterExtra
        }
      ].filter((x) =>
        this.filter.ownerMode === "Owner" ? true : x.field !== "OwnerTask"
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
      return this.$stSecurity.getters["authorize/loggedUser"] || {}
    },
    isGardeshParvandehActive () {
      return this.verticalPanelTarget === GARDESH_KAR && this.showVerticalPanel
    },

    filterExtra: {
      get () {
        return {
          filterParams: {
            values: params => {
              params.success(this.getFilterValues(params))
            },
            refreshValuesOnOpen: true
          }
        }
      }
    },

    filterExtraCombo: {
      get () {
        return {
          filterParams: {
            values: params => {
              // V1
              let requestedList
              if (params.column.colId === 'WorkflowTitel') {
                requestedList = 'allWorkflowTitles'
              }
              else if (params.column.colId === 'TaskTitel') {
                requestedList = 'allNodeTitles'
              }

              if (!requestedList) return false

              const listResult = (this[requestedList] && this[requestedList].length > 0)
                ? this[requestedList].filter(task => task.Title).map(task => task.Title)
                : []
              params.success(listResult)

              // V2
              // params.success([
              //   ...new Set(
              //     this.currentData
              //       .map((task) => task.Task)
              //       .flat()
              //       .map((innerTask) => innerTask.TaskTitel)
              //   )
              // ])
            },
            refreshValuesOnOpen: true
          }
        }
      }
    }
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.load()
    },
    onPaginationChanged (params) {
      if (params.newPage) {
        this.filter.page = params.api.paginationGetCurrentPage()
      }
    },
    showWorkflowChart () {
      this.$store.dispatch("ui/setLayoutMode", "half")
      this.$store.dispatch("ui/setLayoutWidth", 50)
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
    initSearchAutocomplete () {
      getAllNodeTitle().then(({ data }) => {
        const list = data.data
        if (data.success && list) {
          this.allNodeTitles = list.map((x) => {
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
          this.allWorkflowTitles = list.map((x) => {
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
    handleSelectedChange: debounce(function (params) {
      // const { BizCode } = params
      // this.showCodeOnMap(BizCode)
      this.currentNidProc = params.data.NidProc
      const tasks = document.querySelectorAll(".task--inner")
      let inSide = false
      tasks.forEach((element) => {
        if (
          element === params.event.target ||
          element.contains(params.event.target)
        ) {
          inSide = true
        }
      })

      if (inSide || !params.data["Task"]) return

      const list = params.data.Task
      if (list.length > 0) {
        const checkOk = (item) => {
          const checkSwimLine = parseInt(item.SwimLineName) !== 1
          const checkEnumTaskStatus =
            item.EumTaskStatus && parseInt(item.EumTaskStatus) === 1
          return checkSwimLine && !checkEnumTaskStatus
        }

        const result = list.filter((item) => checkOk(item))
        let selectedRow = null
        if (result && result.length > 0) {
          selectedRow = {
            ...params.data,
            Task: null,
            ...result[0]
          }
        } else {
          selectedRow = {
            ...params.data,
            Task: null,
            ...list[0]
          }
        }

        if (this.layoutSplitterWidth < 100) {
          const { BizCode } = selectedRow
          BizCode && this.showCodeOnMap(BizCode)
        }

        this.$stKartable.dispatch("setSelectedNidTask", selectedRow.NidTask)
        this.$stKartable.dispatch("setSelectedRequest", selectedRow)
        this.$store.dispatch("engineer/selectRequest", selectedRow)
      }

      // this.$root.$emit('setForm', 'task')
    }, 10),
    normalizeBizCode (bizcode) {
      if (!bizcode) return ""
      const data = bizcode.split("-").reduce((result, s) => {
        if (!result) result = []
        if (parseInt(s) > 0) {
          result.push(s)
        }
        return result
      }, [])
      return data.join("-") + (data.length < 7 ? "-" : "")
    },
    reset () {
      this.filter = { ...defaultFilter }
      this.showAdvancedSearch = false

      if (this.gridApi) {
        this.gridApi.paginationGoToPage(0)
        this.gridApi.setFilterModel(null)
        this.load()
      }
    },
    convertToPersian (str) {
      if (typeof str === "number") str = str.toString().trim()
      if (typeof str !== "string") return str
      return str
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/ة/g, "ه")
        .replace(/\u06A9/g, "\u0643") // ک
        .replace(/\u06CC/g, "\u0649") // ی
        .replace(/\u06CC/g, "\u064A") // ی
        .trim()
    },
    convertToArabic (str) {
      if (typeof str === "number") str = str.toString().trim()
      if (typeof str !== "string") return str
      return (
        str
          .replace(/ی/g, "ي")
          .replace(/ک/g, "ك")
          // // .replace(/ه/g, 'ة')
          .replace(/\u0643/g, "\u06A9") // ک
          // .replace(/\u0649/g, '\u06CC') // ی
          // .replace(/\u064A/g, '\u06CC') // ی
          .trim()
      )
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
      const self = this
      // self.gridApi && self.gridApi.setFilterModel(null)

      if (self.loading) return false
      self.loading = true

      self.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          self
            .initKartableDatasource(params)
            .then((data) => {
              self.currentData = [...data]
              params.success({
                rowData: data,
                rowCount: self.totalRow
              })
            })
            .catch((ex) => {
              params.fail(ex)
            })
            .finally(() => {
              self.loading = false
            })
        }
      })
    },
    async initKartableDatasource (params) {
      return new Promise(async (resolve, reject) => {
        try {
          this.filter.from = params.request.startRow // (this.filter.page - 1) * this.filter.take
          this.filter.to = params.request.endRow // from + this.filter.take // ((this.page - 1) * this.take + this.take) - 1

          const strWhere = []

          let payload = {
            PAssingUser: this.getNidUser(),
            NidUser: this.$stSecurity.getters["authorize/session"], // this.getNidUser(), // => send session instead of niduser
            PtaskState: 0,
            From: this.filter.from,
            To: this.filter.to,
            PMode: this.filter.ownerMode
            // PStrWhere: ` AND BizCode='12-11-128-3-1-8-0'`
            // PStrWhere: this.getSqlQuery()
          }

          // #region grid filter request
          const gridFilterModel = params.api.getFilterModel(),
            gridFilterModelKeys = Object.keys(gridFilterModel),
            ignoreFilters = []
          // #endregion

          const checkFilterModelHaveValue = (gridFilterModel, filterName) => {
            return (gridFilterModel?.[filterName] &&
              Array.isArray(gridFilterModel[filterName].values))
          }

          // #region generate query for each safa-grid column filter
          FILTER_PARAMS.forEach(colFilterKey => {
            if (gridFilterModelKeys.includes(colFilterKey)) {
              if (checkFilterModelHaveValue(gridFilterModel, colFilterKey)) {
                if (gridFilterModel[colFilterKey].values.length < 1) {
                  strWhere.push(` ${colFilterKey} IS NULL`)
                  return true
                }

                let scopedWhere = []
                let needNormalizeFilter = !['NidWorkItem', 'BizCode'].includes(colFilterKey)

                if (colFilterKey === 'BizCode' && gridFilterModel[colFilterKey].values.length > 0) {
                  if (gridFilterModel[colFilterKey].values.some(bizcode => bizcode === "0-0-0-0-0-0-0") === true) return false
                }
                gridFilterModel[colFilterKey].values.forEach((filterValues) => {
                  scopedWhere.push(needNormalizeFilter
                    ? this.normalizeFilter(`${colFilterKey} LIKE N'%#term#%'`, filterValues)
                    : ` ${colFilterKey} LIKE '${filterValues}'`
                  )
                })
                if (scopedWhere.length > 0) {
                  strWhere.push("(" + scopedWhere.join(" OR ") + ")")
                }
                ignoreFilters.push(colFilterKey)
              }
            }
          })
          // #endregion

          // #region the filter check can be ignored
          const ignorableFilter = (ignorableList, params) => {
            if (!ignorableList || !Array.isArray(ignorableList) || ignorableList.length < 1) return true
            return !ignorableList.includes(params)
          }

          if (this.filter.NidWorkItem && ignorableFilter(ignoreFilters, "NidWorkItem")) {
            strWhere.push(
              ` NidWorkItem LIKE '%${this.filter.NidWorkItem.toString().trim()}%'`
            )
          }
          if (this.filter.NodeTitle.length > 0 && ignorableFilter(ignoreFilters, "NodeTitle")) {
            let WorkflowWhere = []
            this.filter.NodeTitle.forEach((x) => {
              WorkflowWhere.push(
                this.normalizeFilter(`TaskTitel LIKE N'%#term#%'`, x)
              )
            })
            strWhere.push("(" + WorkflowWhere.join(" OR ") + ")")
          }
          if (this.filter.WorkflowTitel.length > 0 && ignorableFilter(ignoreFilters, "WorkflowTitel")) {
            let WorkflowWhere = []
            this.filter.WorkflowTitel.forEach((x) => {
              WorkflowWhere.push(
                this.normalizeFilter(`WorkflowTitel LIKE N'%#term#%'`, x)
              )
            })
            strWhere.push("(" + WorkflowWhere.join(" OR ") + ")")
          }
          if (this.filter.ProcInitiatorName && ignorableFilter(ignoreFilters, "ProcInitiatorName")) {
            strWhere.push(
              this.normalizeFilter(
                `ProcInitiatorName LIKE N'%#term#%'`,
                this.filter.ProcInitiatorName
              )
            )
          }
          if (this.filter.ProcRequester && ignorableFilter(ignoreFilters, "ProcRequester")) {
            strWhere.push(
              this.normalizeFilter(
                `ProcRequester LIKE N'%#term#%'`,
                this.filter.ProcRequester
              )
            )
          }
          const bizcode = this.filter.BizCode
          if (bizcode && bizcode !== "0-0-0-0-0-0-0" && ignorableFilter(ignoreFilters, "BizCode")) {
            strWhere.push(
              ` (BizCode LIKE N'${this.normalizeBizCode(bizcode)}%')`
            )
          }
          // if (!this.filter.showOwnerTasks) strWhere.push(` SwimLineName !== 1`)
          if (this.filter.CreatedByName && ignorableFilter(ignoreFilters, "CreatedByName")) {
            strWhere.push(
              this.normalizeFilter(
                `CreatedByName LIKE N'%#term#%'`,
                this.filter.CreatedByName
              )
            )
          }
          if (this.filter.AssingToUserName && ignorableFilter(ignoreFilters, "AssingToUserName")) {
            strWhere.push(
              this.normalizeFilter(
                `AssingToUserName LIKE N'%#term#%'`,
                this.filter.AssingToUserName
              )
            )
          }
          if (this.filter.GroupTitel && ignorableFilter(ignoreFilters, "GroupTitel")) {
            strWhere.push(
              this.normalizeFilter(
                `[GroupTitel] LIKE N'%#term#%'`,
                this.filter.GroupTitel
              )
            )
          }
          if (this.filter.startDates.length > 0 && ignorableFilter(ignoreFilters, "startDates")) {
            let DateQueryWhere = []
            this.filter.startDates.forEach((date) => {
              DateQueryWhere.push(` ([StartDate] = '${date}')`)
            })
            strWhere.push("(" + DateQueryWhere.join(" OR ") + ")")
          }
          if (this.filter.taskStartDate.length > 0 && ignorableFilter(ignoreFilters, "taskStartDate")) {
            let DateQueryWhere = []
            this.filter.taskStartDate.forEach((date) => {
              DateQueryWhere.push(` ([TaskStartDate] = '${date}')`)
            })
            strWhere.push("(" + DateQueryWhere.join(" OR ") + ")")
          }
          // #endregion

          // if (this.filter.NidWorkItem) payload.NidWorkItem = this.filter.NidWorkItem.toString() // .convertToPersian()
          // if (this.filter.NodeTitle) payload.NodeTitle = this.filter.NodeTitle // .convertToPersian()
          // if (this.filter.WorkflowTitel) payload.WorkflowTitel = this.filter.WorkflowTitel // .convertToPersian()
          // if (this.filter.ProcInitiatorName) payload.ProcInitiatorName = this.filter.ProcInitiatorName // .convertToPersian()
          // if (this.filter.BizCode) payload.BizCode = this.normalizeBizCode(this.filter.BizCode)
          // payload.SwimLineName = this.filter.showOwnerTasks ? 1 : 2

          if (strWhere.length > 0) {
            payload.StrWhere = " AND " + strWhere.join(" AND ")
          }

          const { data } = await getTaskByUser(payload)
          if (
            !Array.isArray(data) &&
            data.hasOwnProperty("success") &&
            !data.success
          ) {
            const msg =
              typeof data.msg === "string" ? data.msg : "کارتابل بارگذاری نشد"
            this.showError(msg)
            if (msg.indexOf("دوباره وارد شوید") > -1) {
              this.$stSecurity.dispatch("authorize/clearSession")
              this.$stSecurity.dispatch("security/resetPermissions")
              // this.$root.$emit('setCommand', 'login')
              location.reload(true)
            }
            return
          }
          this.activeTab = "kartable"
          const currentData = (Array.isArray(data) ? data : data.data).map(
            (x) => {
              const Task = (x.Task && JSON.parse(x.Task)) || []
              return {
                showAll: false,
                ...x,
                Task,
                TaskStartDate:
                  Task.length > 0 ? Task[Task.length - 1].TaskStartDate : "",
                TaskDesc:
                  x.TaskDesc || Task.length > 0
                    ? Task[Task.length - 1].TaskDesc
                    : "",
                TaskTitel: x.TaskTitel || "",
                CreatedByName:
                  x.CreatedByName || Task.length > 0
                    ? Task[Task.length - 1].CreatedByName
                    : "", // ایجاد کننده درخواست / ارسال کننده
                AssingToUserName:
                  x.AssingToUserName || Task.length > 0
                    ? Task[Task.length - 1].AssingToUserName
                    : "" // ارسال به
              }
            }
          )
          this.$stKartable.dispatch("setFilter", this.filter)
          resolve(currentData)
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
          this.showError("خطایی در سرویس رخ داد")

          reject(e)
        }
      })
    },
    onFilterChanged (params) {
      if (!params.hasOwnProperty('afterDataChange')) return false

      const colKey = params.columns?.[0]?.colId || null
      if (!colKey) return false

      switch (colKey) {
        case "NidWorkItem":
        case "ProcInitiatorName":
        case "ProcRequester":
        case "CreatedByName":
        case "AssingToUserName":
        case "GroupTitel":
          this.filter[colKey] = ""
          break

        case "WorkflowTitel":
          this.filter.WorkflowTitel = this.gridApi.getFilterModel().hasOwnProperty(colKey) ? this.gridApi.getFilterModel()[colKey].values : []
          break

        case "TaskTitel":
          this.filter.NodeTitle = this.gridApi.getFilterModel().hasOwnProperty(colKey) ? this.gridApi.getFilterModel()[colKey].values : []
          break

          // case "BizCode":
          //   this.filter[colKey] = "0-0-0-0-0-0-0"
          //   break

        case "startDates":
        case "taskStartDate":
          this.filter[colKey] = []
          break
      }
    },
    getFilterValues (params) {
      return [...new Set(this.currentData.map(e => e[params.column.colId]))]
    },
    nodeTitelChanged () {
      if (this.loading) return false
      if (!this.gridApi) return

      // V1
      // const nodeTitleFilter = {
      //   TaskTitel: {
      //     type: "set",
      //     values: [...this.filter.NodeTitle]
      //   }
      // }
      // this.gridApi.setFilterModel(nodeTitleFilter)

      // V2
      const nodeTitleFilterInstance = this.gridApi.getFilterInstance('TaskTitel')
      nodeTitleFilterInstance.setModel({
        values: [...this.filter.NodeTitle]
      })

      this.gridApi.onFilterChanged()
    },
    workflowTitelChanged () {
      if (this.loading) return false
      if (!this.gridApi) return

      // V1
      // const workflowTitelFilter = {
      //   WorkflowTitel: {
      //     type: "set",
      //     values: [...this.filter.WorkflowTitel]
      //   }
      // }
      // this.gridApi.setFilterModel(workflowTitelFilter)

      // V2
      const workflowTitelFilterInstance = this.gridApi.getFilterInstance('WorkflowTitel')
      workflowTitelFilterInstance.setModel({
        values: [...this.filter.WorkflowTitel]
      })

      this.gridApi.onFilterChanged()
    },
    nidWorkItemEntered () {
      const nidWorkItemFilterInstance = this.gridApi.getFilterInstance('NidWorkItem')
      nidWorkItemFilterInstance.setModel(null)

      this.search()
    },
    reload () {
      console.log("kartable::reload")
      this.search()
      this.loadMentions()
    },
    loadMentions () {
      const self = this
      getMentionsByNidUser({
        NidUser: this.getNidUser(),
        status: self.mentionFilterStatus
      }).then(({ data }) => {
        self.mentionList =
          data &&
          data.data &&
          data.data.map((x) => {
            return {
              ...x,
              class: parseInt(x.IsOpen) === 1 ? "is-seen" : "is-not-seen"
            }
          })
      })
    }
  },
  beforeMount () {
    this.$root.$on("refresh:kartable", this.reload)
    if (this.defaultActiveTab) {
      this.activeTab = this.defaultActiveTab
    }
    const preloadFilter = this.$stKartable.getters["filter"]
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
    this.$root.$off("refresh:kartable", this.reload)
  },
  beforeUpdate () {
    // this.filter = this.$store.state.kartable.filter
  },
  watch: {
    "filter.showOwnerTasks" () {
      this.search()
    },
    "filter.ownerMode" () {
      this.search()
    },
    // "filter.WorkflowTitel" () {
    //   this.gridApi.setFilterModel(null)
    //   this.workflowTitelChanged()
    // },
    // "filter.NodeTitle" () {
    //   this.gridApi.setFilterModel(null)
    //   this.nodeTitelChanged()
    // },
    loading (val) {
      if (this.gridApi) {
        if (val) this.gridApi.showLoadingOverlay()
        else this.gridApi.hideOverlay()
      }
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
.safa-gridview.ag-theme-alpine.compact {
  --ag-font-size: 10.3px !important;
  // --ag-alpine-active-color: var(--ag-secondary-border-color) !important;
  --ag-alpine-active-color: #0091ea;
  --ag-selected-row-background-color: rgb(232, 232, 232) !important;
  --ag-checkbox-checked-color: var(--ag-alpine-active-color) !important;
  --ag-checkbox-background-color: #fff !important;

  .ag-row-focus {
    background-color: rgb(232, 232, 232) !important
  }

  .ag-row-animation .ag-row {
    transition: transform 0.4s, top 0.4s, background-color 0.1s, opacity 0.2s, height 0.4s;
  }

  .ag-cell {
    display: flex;
    align-items: center;
  }
}

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
    direction: ltr /* rtl:ignore */;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    text-align: left;
    direction: ltr /* rtl:ignore */;
  }

  &::placeholder {
    text-align: left;
    direction: ltr /* rtl:ignore */;
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
</style>
