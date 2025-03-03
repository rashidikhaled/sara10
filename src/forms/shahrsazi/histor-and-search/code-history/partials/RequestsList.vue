<template>
  <fit>
    <safa-tabs v-model="currentTab" :padding="false" class="fit">
      <template v-slot:tabs>
        <tab-menu :closable="false" label="لیست درخواست ها" name="list" />
        <tab-menu
          v-for="tab in tabs"
          :key="tab.name"
          :closable="tab.name !== 'list'"
          v-bind="tab"
          @close="closeTab(tab)"
        />
      </template>

      <tab-content name="list">
        <safa-grid
          title="لیست درخواست ها"
          v-model="responserKartable"
          cdcName="responserKartable"
          :columns="requestListColumns"
          fit
          m="e"
          height="100%"
          max-height="100%"
          min-height="250px"
          :paginate="true"
          :pageSize="20"
          :cacheBlockSize="20"
          :animateRows="true"
          rowModelType="serverSide"
          @grid:ready="onGridReady"
          @selection:changed="selectedChange"
          ref="responserKartable"
        />
      </tab-content>
      <tab-content v-for="tab in tabs" :key="tab.name" v-bind="tab">
        <fit>
          <component
            :is="tab.name.split('-')[0]"
            :formKey="formKey"
            :name="name"
            :request="tab.request"
            :title="title"
            :forceReadonly="true"
            :isSelectFromWorkflow="false"
            :isSelectFromMenu="false"
            :isSelectFromResponder="true"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import TabTemporaryArchive from "./TabTemporaryArchive"
import TabLetters from "./TabLetters"
import TabComments from "./TabComments"
import TabFormAndReport from "./TabFormAndReport"
import TabActions from "./TabActions"

export default {
  mixins: [baseFormMixin],
  components: {
    TabFormAndReport,
    TabComments,
    TabLetters,
    TabTemporaryArchive,
    TabActions
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    baseNosaziCode: Object,
    selectNosaziCode: Object,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      currentTab: "list",
      tabs: [],
      selectedRow: null,
      request: null,
      skip: 0,
      take: 10,
      page: 1,
      perPage: [10, 20, 30, 50, 100],
      totalRow: 100,
      getResponserKartablRes: null,
      responserKartable: [],
      requestListColumns: [
        {
          field: "historyActionsClick",
          title: "لیست اقدامات",
          btnTitle: "لیست اقدامات",
          editor: "action",
          width: "110px",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          btnColor: "primary",
          cellRenderer: "agCallbackBtn",
          showBtn: (data) => data,
          callback: (params) =>
            this.handleActionsClick({
              name: "TabActions",
              label: "لیست اقدامات",
              e: params
            })
        },
        {
          field: "historyFormsAndReportsClick", // مشهد تسک زده باشه اگه شهر دیگه ای درخواست حذف شدن داره باید یکاری دیگه کرد کامنت نشه لطفا
          title: "فرمها و گزارش ها",
          btnTitle: "فرمها و گزارش ها",
          editor: "action",
          width: "120px",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          btnColor: "primary",
          cellRenderer: "agCallbackBtn",
          showBtn: (data) => data,
          callback: (params) =>
            this.handleActionsClick({
              name: "TabFormAndReport",
              label: "فرمها و گزارش ها",
              e: params
            })
        },
        {
          field: "historyExplanationsClick",
          title: "توضیحات",
          btnTitle: "توضیحات",
          editor: "action",
          width: "90px",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          btnColor: "primary",
          cellRenderer: "agCallbackBtn",
          showBtn: (data) => data,
          callback: (params) =>
            this.handleActionsClick({
              name: "TabComments",
              label: "توضیحات",
              e: params
            })
        },
        {
          field: "historyLettersClick",
          title: "نامه ها",
          btnTitle: "نامه ها",
          editor: "action",
          width: "80px",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          btnColor: "primary",
          cellRenderer: "agCallbackBtn",
          showBtn: (data) => data,
          callback: (params) =>
            this.handleActionsClick({
              name: "TabLetters",
              label: "نامه ها",
              e: params
            })
        },
        {
          field: "historyTemporaryArchiveClick",
          title: "سوابق بایگانی موقت",
          btnTitle: "سوابق بایگانی موقت",
          editor: "action",
          width: "140px",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          btnColor: "primary",
          cellRenderer: "agCallbackBtn",
          showBtn: (data) => data,
          callback: (params) =>
            this.handleActionsClick({
              name: "TabTemporaryArchive",
              label: "سوابق بایگانی موقت",
              e: params
            })
        },
        {
          field: "NidWorkItem",
          title: "شماره درخواست",
          editable: false,
          width: "120px"
        },
        {
          field: "WorkflowTitel",
          title: "نوع درخواست",
          editable: false,
          width: "150px"
        },
        {
          field: "RequestStatusTitle",
          title: "وضعیت درخواست",
          editable: false,
          width: "130px"
        },
        {
          field: "RequesterName",
          title: "نام متقاضی",
          editable: false,
          width: "110px"
        },
        {
          field: "RequestDate",
          title: "تاریخ درخواست",
          editable: false,
          width: "120px",
          editor: "date"
        },
        {
          field: "ExportDate",
          title: "تاریخ صدور گواهی",
          editable: false,
          width: "140px",
          editor: "date"
        },
        {
          field: "OwnerName",
          title: "نام مالک",
          editable: false,
          width: "150px"
        }
      ],

      // grid
      gridApi: null,
      loading: false
    }
  },

  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
    },
    getResponserKartabl () {
      this.setServerSideDatasource()
      this.gridApi.refreshServerSide({
        purge: true
      })
    },
    setServerSideDatasource () {
      this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          try {
            if (this.loading) return false
            this.loading = true
            const payload = {
              pFromRow: params.request.startRow,
              pToRow: params.request.endRow,
              pWhere: `Where bn.NidNosaziCode = '${
                this.selectNosaziCode?.NidNosaziCode?.toString() ?? ""
              }'`
            }
            const { data } = await this.$services.SC.getResponserKartabl(
              payload,
              this.config
            )
            this.getResponserKartablRes = this.getResponse(data)
            if (this.getResponserKartablRes.success) {
              const list = this.getResponserKartablRes?.data?.ResponserKartabl.map(m => {
                return {
                  ...m,
                  NidProc: m.NidProc === '' ? "00000000-0000-0000-0000-000000000000" : m.NidProc
                }
              }) ?? []
              this.responserKartable = list?.map(r => ({ ...r, BizCode: r.NosaziCode }))
              this.$nextTick(() => {
                const total = this.responserKartable[0]?.TableCount ?? 0
                params.success({
                  rowData: this.responserKartable,
                  rowCount: total
                })
              })
              this.$emit('afterLoadResponserKartabl')
            } else {
              params.fail()
              this.showError("لیست درخواست ها بارگذاری نشد")
            }
          } catch (ex) {
            console.error(ex)
            this.serverError()
            params.fail()
          } finally {
            this.loading = false
          }
        }
      })
    },
    handleActionsClick ({ name, label, e }) {
      this.selectedRow = e
      this.addNewTabs(name, label, this.selectedRow)
    },
    addNewTabs (name, label, request) {
      if (!request) return
      this.request = request
      const NidWorkItem = request.NidWorkItem
      const tabKey = `${name}-${NidWorkItem}`
      const alreadyTabIndex = this.tabs.findIndex(
        (x) => x.name === tabKey // .startsWith(`${name}-`)
      )
      if (alreadyTabIndex > -1) {
        // const alreadyTab = this.tabs[alreadyTabIndex];
        this.tabs.splice(alreadyTabIndex, 1, {
          name: tabKey,
          label: `${label} - ${NidWorkItem}`,
          request
        })
      } else {
        this.tabs.push({
          name: tabKey,
          label: `${label} - ${NidWorkItem}`,
          request
        })
      }
      setTimeout(() => {
        this.currentTab = tabKey
      }, 10)
    },
    closeTab ({ name }) {
      if (name === "list") return
      this.tabs = this.tabs.filter((x) => x.name !== name)
      this.currentTab = "list"
      const lastTab = this.tabs.length - 1
      if (lastTab >= 0) {
        this.currentTab = this.tabs[lastTab].name
      }
      if (this.$refs[name] && this.$refs[name][0]) {
        this.$refs[name][0].$destroy()
      }
    },
    selectedChange (e) {
      this.$emit("selectRequestFromRequestList", e.data)
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    }
  }
}
</script>
