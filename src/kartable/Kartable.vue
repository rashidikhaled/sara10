<template>
  <form-wrapper :padding="false" fullscreen hide-close hide-title vertical>
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
            :separator-class="showVerticalPanel ? '' : 'hide'"
          >
            <template v-slot:before>
              <fit>
                <safa-grid
                  :value="[]"
                  :addRow="false"
                  :allowCopy="false"
                  :deleteRow="false"
                  :bordered="true"
                  :paginate="true"
                  :sortable="true"
                  :pageSize="20"
                  :cacheBlockSize="20"
                  :getRowHeight="() => 44"
                  :animateRows="true"
                  :headerHeight="32"
                  rowModelType="serverSide"
                  :filterable="true"
                  :columns="agKartableColumns"
                  :allowMultipleSelection="false"
                  :extra-filters="filter"
                  :groupable="false"
                  @row:click="handleSelectedChange"
                  @grid:ready="onGridReady"
                  @filter:deleted="onFilterReset"
                  @filter:changed="onFilterChanged"
                  @state:updated="onStateUpdated"
                  title="کارتابل"
                  theme="alpine"
                  class="kartable-grid compact"
                  id="main_kartable"
                  ref="kartable"
                >
                  <template v-slot:header>
                    <div class="flex">
                      <div class="flex items-center q-mr-sm q-gutter-x-sm">
                        <safa-text
                          @keydown.enter="search"
                          dir="ltr"
                          label="شماره فرآیند"
                          style="
                            min-width: 170px;
                            max-width: 94px;
                            font-size: 13px;
                          "
                          type="number"
                          v-model="filter.NidWorkItem"
                        />
                        <safa-combo2
                          type="multiple"
                          label="نوع فرآیند"
                          use-input
                          clearable
                          source-type="local"
                          :searchValue="false"
                          :options="allWorkflowTitles"
                          style="min-width: 200px"
                          v-model="filter.WorkflowTitel"
                          @input="search"
                        />
                        <safa-combo2
                          type="multiple"
                          label="مرحله"
                          use-input
                          clearable
                          source-type="local"
                          :searchValue="false"
                          :options="allNodeTitles"
                          style="min-width: 200px"
                          v-model="filter.TaskTitel"
                          @input="search"
                        />
                        <div class="col-auto col-sm-auto">
                          <safa-combo2
                            :options="[
                              {
                                ID: 'Owner',
                                Title: 'فرآیند های منتظر مالک',
                              },
                              {
                                ID: 'User',
                                Title: 'فرآیند های مرتبط با من',
                              },
                              { ID: 'All', Title: 'همه' },
                            ]"
                            :searchValue="false"
                            source-type="local"
                            style="width: 140px"
                            v-model="filter.OwnerMode"
                            @input="search"
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
                        </div>
                      </div>
                      <q-btn
                        dense
                        color="primary"
                        label="جستجو"
                        icon="search"
                        size="sm"
                        @click="search"
                        class="q-mr-sm shadow-1"
                        padding="0 8px"
                      />
                      <q-btn
                        dense
                        color="primary"
                        label="مشاهده همه"
                        icon="filter_alt_off"
                        size="sm"
                        outline
                        @click="reset"
                        class="q-mr-sm shadow-1"
                        padding="0 8px"
                      />
                      <!-- <q-btn
                        dense
                        color="primary"
                        label="جستجو براساس مالک/وکیل"
                        icon="person_search"
                        size="sm"
                        outline
                        @click="ownerSearchHandler"
                        class="q-mr-sm shadow-1"
                        padding="0 8px"
                      /> -->
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
                    </div>
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
                    @showFullSize="showFullSizeVerticalPanel"
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
    <safa-popup
      title="جستجوی مالک/وکیل"
      width="800px"
      height="650px"
      v-model="isOwnerSearchOpen"
      :resizable="false"
      :maximizeButton="false"
    >
      <OwnerAutoSuggestion
        v-model="selectedOwner"
        @hide="isOwnerSearchOpen = false"
      />
    </safa-popup>
  </form-wrapper>
</template>

<!-- eslint-disable no-unused-vars -->
<script>
// Services
import {
  getAllNodeTitle,
  getAllWorkflowTitle,
  getMentionsByNidUser,
  getTaskByUser
} from "./services/kartable"

// Components
import mentionGrid from "./partials/MentionGrid"
import GardeshParvandehDetails from "./partials/GardeshParvandehDetails"
import WorkflowChart from "./partials/WorkflowChart"

// Mixins
import mapMixin from "src/mixins/mapMixin"

// Utils
import { debounce } from "quasar"
import {
  customQueryBuilder,
  filterModelToSqlQuery
} from "./utils/agQueryTools"
import OwnerAutoSuggestion from "./partials/OwnerAutoSuggestion.vue"

// Default Constants
const GARDESH_KAR = "gardesh_kar"
const MENTION = "mention"
const defaultFilter = {
  NidWorkItem: "",
  WorkflowTitel: [],
  TaskTitel: [],
  OwnerMode: "User",
  BizCode: "0-0-0-0-0-0-0"
}

export default {
  name: "Kartable",
  route: "/",
  mixins: [mapMixin],
  components: {
    GardeshParvandehDetails,
    WorkflowChart,
    mentionGrid,
    OwnerAutoSuggestion
    // RevokeRequest
  },
  data () {
    return {
      activeTab: "kartable",
      prvPage: null,
      isload: null,
      customButtons: [
        {
          icon: "pie_chart",
          onClick: this.showWorkflowChart,
          text: "چارت"
        },
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
      mentionList: [],
      allNodeTitles: [],
      allWorkflowTitles: [],
      currentNidProc: null,
      showVerticalPanel: false,
      verticalPanelTarget: GARDESH_KAR,
      splitterValue: 100,
      splitterLimit: [0, 100],
      gridApi: null,
      isOwnerSearchOpen: false,
      selectedOwner: null
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
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter",
                filterParams: { defaultOption: "contains" }
              },
              this.customFilterValues
            ]
          },
          tooltip: (params) => "شماره فرآیند: " + params.value
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
              for (const task of params.data.Task) {
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
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          },
          onShowTaskUsersGroup: this.showTaskUsersGroup
        },
        {
          field: "WorkflowTitel",
          title: "نوع فرآیند",
          width: 260,
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
        },
        {
          field: "ProcRequester",
          title: "متقاضی",
          width: 150,
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
        },
        {
          field: "BizCode",
          title: "کد",
          width: 200,
          cellRenderer: "agKartableBizCode",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              /* {
                filter: 'agKartableBizCodeFilter'
              }, */
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
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
          cellRenderer: "OwnerTaskDetailsTemplate",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
        },
        {
          field: "StartDate",
          title: "تاریخ و زمان ایجاد",
          width: 150,
          cellRenderer: "agKartableTaskStartDateTimeTemplate",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
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
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
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
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
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
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
        },
        {
          field: "ProcInitiatorName",
          title: "ایجاد کننده درخواست",
          width: 240,
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
        },
        {
          field: "GroupTitel",
          title: "گروه",
          width: 140,
          cellRenderer: "agKartableTaskGroupTitel",
          cellStyle: {
            justifyContent: "center",
            padding: "0"
          },
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
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
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter"
              },
              this.customFilterValues
            ]
          }
        }
      ]
      /* .filter((x) =>
      this.filter.OwnerMode === 'Owner' ? true : x.field !== 'OwnerTask'
    ) */
    },
    customFilterValues () {
      return {
        filter: "agSetColumnFilter",
        filterParams: {
          values: (params) => params.success(this.getFilterValues(params)),
          refreshValuesOnOpen: true,
          defaultToNothingSelected: true
        }
      }
    },
    currentUser () {
      return this.$stSecurity.getters["authorize/loggedUser"] || {}
    },
    isGardeshParvandehActive () {
      return this.verticalPanelTarget === GARDESH_KAR && this.showVerticalPanel
    },
    ownerDisplayName () {
      return `${this.selectedOwner.OwnerFirstName} ${this.selectedOwner.OwnerLastName}`
    }
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", this.onServerFailCallback)
      this.setKartableDatasource()
    },
    search () {
      this.gridApi.paginationGoToFirstPage()
      this.gridApi.refreshServerSide()
    },

    returnToKartable () {
      this.reset()
    },
    switchTo (key) {
      this.activeTab = key
    },
    showFullSizeVerticalPanel (b) {
      if (b) this.splitterValue = 30
    },
    mergeLocalFilters (filter, localFilters) {
      Object.entries(localFilters || {}).forEach(([field, value]) => {
        if (value || value === 0) {
          if (!filter.hasOwnProperty(field)) {
            filter[field] = { filterModels: [], filterType: "multi" }
          }
          switch (field) {
            case "BizCode":
              if (value !== "0-0-0-0-0-0-0") {
                filter[field].filterModels.push({
                  filterType: "text",
                  filter: value,
                  type: "startsWith"
                })
              }
              break
            case "NidWorkItem":
              filter[field].filterModels.push({
                filterType: "text",
                filter: value,
                values: null,
                type: "contains"
              })
              break
            case "TaskTitel":
            case "WorkflowTitel":
              filter[field].filterModels.push({
                filterType: "set",
                values: value,
                type: "contains"
              })
              break
          }
        }
      })
      return filter
    },
    showSelectedRequestOnMap: debounce(function (row) {
      const { BizCode, WKT } = row
      // const isValidBizCode = BizCode && BizCode.indexOf("-") > -1
      const isValidWKT = !!WKT

      this.mapClear()
      if (isValidWKT) this.showWKT(row, true, null, false, "task")
      setTimeout(
        () => {
          this.showCodeOnMap(BizCode)
        },
        isValidWKT ? 10 : 0
      )
    }, 500),
    handleSelectedChange: debounce(function (params) {
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

        this.showSelectedRequestOnMap(selectedRow)
        this.$store.dispatch("engineer/selectRequest", params.data)
        this.$store.dispatch("engineer/setNidFil", params.data)
        this.$stKartable.dispatch("setSelectedNidTask", selectedRow.NidTask)
        this.$stKartable.dispatch("setSelectedRequest", selectedRow)
      }

      // this.$root.$emit('setForm', 'task')
    }, 10),

    onFilterReset () {
      this.filter = { ...defaultFilter }

      if (this.gridApi) {
        this.gridApi.paginationGoToPage(0)
        this.gridApi.refreshServerSide({
          purge: true
        })
      }
    },
    async setKartableDatasource () {
      this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          try {
            const { startRow, endRow } = params.request
            if (startRow >= 10000) {
              this.showError(
                "با توجه به حجم بالای اطلاعات، لطفا بازه تاریخی کمتری جستجو نمایید. یا جهت جستجو از فیلتر بیشتری، استفاده نمایید.",
                { title: "خطا در دریافت اطلاعات" }
              )
              this.$nextTick(() => {
                params.api.paginationGoToFirstPage()
              })
              return
            }

            this.loading = true

            let payload = {
              PAssingUser: this.getNidUser(),
              NidUser: this.$stSecurity.getters["authorize/session"],
              PtaskState: 0,
              From: startRow,
              To: endRow,
              PMode: this.filter.OwnerMode
            }

            let strWhere = ""
            const filterModel = params.api.getFilterModel()
            const gridFilterModel = this.mergeLocalFilters(
              filterModel,
              this.filter
            )
            Object.entries(gridFilterModel).forEach(([field, filter]) => {
              const queryBuilder = ["NidWorkItem", "BizCode"].includes(field)
                ? customQueryBuilder
                : undefined
              const normalize = ![].includes(field)
              strWhere += `${filterModelToSqlQuery(field, filter, {
                queryBuilder,
                normalize,
                appendOperator: "AND"
              })}`
            })
            // if (this.selectedOwner) {
            //   const { NidProc } = this.selectedOwner ?? {}
            //   strWhere += ` AND (w.NidProc Like N'${NidProc}')`
            // }
            payload.StrWhere = strWhere
            // // console.log('payload', payload)
            const { data } = await getTaskByUser(payload)
            const hasError =
              typeof data === "object" &&
              data.hasOwnProperty("success") &&
              !data.success
            let list = (Array.isArray(data) ? data : data.data) ?? []

            if (hasError) {
              list = []
              const msg =
                typeof data.msg === "string"
                  ? data.msg
                  : "کارتابل بارگذاری نشد"
              if (msg.indexOf("دوباره وارد شوید") > -1) {
                params.success({
                  rowData: [],
                  rowCount: 0
                })
                this.showError(msg).onDismiss(() => {
                  setTimeout(async () => {
                    await this.$stSecurity.dispatch("authorize/clearSession")
                    await this.$stSecurity.dispatch(
                      "security/resetPermissions"
                    )
                    document.write(
                      `<div style="background-color: #cecece;"></div>`
                    )
                    location.reload(true)
                  })
                })
              } else {
                this.showError(msg)
                return params.fail()
              }
            }
            this.activeTab = "kartable"

            this.currentData = list.map((x) => {
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
            })

            const rowData = this.currentData

            return params.success({
              rowData,
              rowCount: this.totalRow
            })

            // this.isload = !this.isload
          } catch (e) {
            console.error(e)
            return params.fail()
          } finally {
            this.loading = false
          }
        }
      })
    },
    onServerFailCallback (params) {
      console.error("onServerFailCallback", params)
    },
    reset () {
      console.log("reset")
      this.selectedOwner = null
      this.$refs.kartable.deleteAllFilters()
    },
    /* search () {
      console.log("search")
      // this.gridApi.onFilterChanged()
      this.prvPage = this.gridApi.paginationGetCurrentPage()
      this.gridApi.refreshServerSide({
        purge: true
      })
    }, */
    ownerSearchHandler () {
      this.isOwnerSearchOpen = true
      // console.log('isOwnerSearchOpen', this.isOwnerSearchOpen)
    },
    onStateUpdated (state) {
      // console.log('onStateUpdated', state)
      // ({extraFilters})=> filter=extraFilters
    },
    onFilterChanged (params) {
      // // console.log('onFilterChanged', params)
    },
    getFilterValues (params) {
      // // console.log('-----------getFilterValues', params)
      try {
        let list = []
        switch (params.column.colId) {
          case "WorkflowTitel":
            list = this.allWorkflowTitles
              .map((item) => item.Title)
              .filter(Boolean)
              .map((str) => `${str}`.convertToPersian())
            break
          case "TaskTitel":
            list = this.allNodeTitles
              .map((item) => item.Title)
              .filter(Boolean)
              .map((str) => `${str}`.convertToPersian())
            break
          case "NidWorkItem":
            list = [
              ...new Set(this.currentData.map((e) => e[params.column.colId]))
            ].filter(Boolean)
            break
          default:
            list = [
              ...new Set(this.currentData.map((e) => e[params.column.colId]))
            ]
              .filter(Boolean)
              .map((str) => `${str}`.convertToPersian())
            break
        }
        return list
      } catch (ex) {
        // console.log(ex)
        return []
      }
    },

    // search autosuggestion
    initSearchAutocomplete () {
      // console.log('----------------------initSearchAutocomplete')
      this.allNodeTitles = []
      this.allWorkflowTitles = []
      Promise.allSettled([getAllNodeTitle({}), getAllWorkflowTitle({})]).then(
        ([nodeResult, workflowResult]) => {
          if (nodeResult.status === "fulfilled") {
            this.allNodeTitles = (nodeResult.value.data?.data ?? []).map(
              (x) => {
                return {
                  Title: `${x.NodeTitle}`.convertToPersian(),
                  Id: `${x.NodeTitle}`.convertToPersian()
                }
              }
            )
          }

          if (workflowResult.status === "fulfilled") {
            this.allWorkflowTitles = (
              workflowResult.value.data?.data ?? []
            ).map((x) => {
              return {
                Title: `${x.WorkflowCaption}`.convertToPersian(),
                Id: `${x.WorkflowCaption}`.convertToPersian()
              }
            })
          }
        }
      )
    },

    showWorkflowChart () {
      this.$store.dispatch("ui/setLayoutMode", "half")
      this.$store.dispatch("ui/setLayoutWidth", 50)
      this.isWorkflowChartVisible = !this.isWorkflowChartVisible
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
    },
    showTaskUsersGroup (task) {
      if (!task || !task.AssingTo) return
      this.gridApi.showLoadingOverlay()

      this.$services.security.getGroupUsers
        .apply(this, [{ NidUserGroup: task.AssingTo }])
        .then(({ data }) => {
          if (data && data.data && data.data.list && Array.isArray(data.data.list)) {
            this.$window.open({
              component: 'safa-grid',
              title: `لیست کاربران این گروه (${task.NidWorkItem})`,
              keepAlive: false,
              padding: false,
              width: '620px',
              height: '550px',
              componentProps: {
                value: Array.prototype.concat.apply([], data.data.list.map(e => ({ firstName: e.firstName, lastName: e.lastName, username: e.username, jobLocationName: e?.jobLocation?.name || "" }))),
                columns: [
                  {
                    field: "firstName",
                    title: "نام",
                    width: 105
                  },
                  {
                    field: "lastName",
                    title: "نام خانوادگی",
                    width: 125
                  },
                  {
                    field: "username",
                    title: "نام کاربری",
                    width: 125
                  },
                  {
                    field: "jobLocationName",
                    title: "محل خدمت",
                    width: 'auto'
                  }
                ],
                title: 'لیست کاربران این گروه',
                m: "r",
                fit: true,
                bordered: true,
                height: "100%",
                maxHeight: "100%",
                minHeight: "250px",
                suppressRowClickSelection: false,
                allowMultipleSelection: false
              }
            })
          } else {
            throw new Error()
          }
        })
        .catch(ex => {
          console.error(ex)
          this.showError("خطا در دریافت لیست کاربران گروه!")
        })
        .finally(() => this.gridApi.hideOverlay())
    }
  },
  created () {
    if (this.defaultActiveTab) {
      this.activeTab = this.defaultActiveTab
    }

    this.initSearchAutocomplete()
    this.loadMentions()
  },
  async beforeMount () {
    this.$root.$on("refresh:kartable", this.search)
  },
  beforeDestroy () {
    this.$root.$off("refresh:kartable", this.search)
  },
  watch: {
    selectedOwner () {
      if (this.selectedOwner) {
        this.search()
      }
    },
    isload () {
      if (this.prvPage > 0) {
        this.gridApi.paginationGoToPage(this.prvPage)
        this.prvPage = null
      }
    },
    loading (val) {
      if (this.gridApi) {
        if (val) {
          this.gridApi.showLoadingOverlay()
        } else {
          this.gridApi.hideOverlay()
        }
      }
    },
    mentionFilterStatus () {
      this.loadMentions()
    },
    showVerticalPanel () {
      this.splitterLimit = this.showVerticalPanel ? [0, Infinity] : [0, 100]
      this.splitterValue = this.showVerticalPanel ? 40 : 100
    },
    q (newVal) {
      if (newVal) {
        this.search()
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
    background-color: rgb(232, 232, 232) !important;
  }

  .ag-row-animation .ag-row {
    transition: transform 0.4s, top 0.4s, background-color 0.1s, opacity 0.2s,
      height 0.4s;
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
