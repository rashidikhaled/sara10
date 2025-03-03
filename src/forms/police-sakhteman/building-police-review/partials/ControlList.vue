<template>
  <fit>
    <safa-tabs v-model="activeTab" class="fit" :padding="false">
      <template v-slot:tabs>
        <tab-menu name="list" label="لیست" :closable="false" />
        <tab-menu
          v-for="tab in tabs"
          :key="tab.name"
          v-bind="tab"
          @close="closeTab(tab)"
          :closable="tab.name !== 'list'"
        />
      </template>
      <tab-content name="list">
        <safa-datatable
          :title="gridTitle"
          v-model="value"
          helper="KartableList"
          cdcName="KartableList"
          fit
          m="r"
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
          @displayClick="handleDisplayClick"
          @selectedChange="selectedChange"
          @historyActionsClick="
            handleActionsClick({
              name: 'Actions',
              label: 'اقدامات',
              e: $event,
            })
          "
          @historyFormsAndReportsClick="
            handleActionsClick({
              name: 'FormAndReport',
              label: 'فرمها و گزارش ها',
              e: $event,
            })
          "
          @historyExplanationsClick="
            handleActionsClick({
              name: 'Comments',
              label: 'توضیحات',
              e: $event,
            })
          "
        />
      </tab-content>
      <tab-content v-for="tab in tabs" :key="tab.name" v-bind="tab">
        <component
          :is="tab.name.split('-')[0]"
          :request="tab.request"
          :title="title"
          :formKey="formKey"
          :name="name"
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Actions from "./Actions"
import FormAndReport from "./FormAndReport"
import Comments from "./Comments"
export default {
  name: "ControlList",
  mixins: [baseFormMixin],
  components: {
    Actions,
    FormAndReport,
    Comments
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    request: Object,
    title: String,
    formKey: String,
    name: String
  },

  data () {
    return {
      model: { requestsList: [] },
      selectedRow: null,
      showReportHistory: false,
      requestsList: [],
      tabs: [],
      activeTab: "list"
    }
  },

  mounted () {
    if (this.request) {
      this.loadData()
    }
  },
  watch: {
    baseNosaziCode () {
      this.loadData()
    }
  },
  methods: {
    loadData () {
      // this.baseNosaziCode
      this.showLoading()
      const userInfo = this.$stSecurity.getters["authorize/user"]
      const payload = {
        NidProc:
          this.request.NidProc === ""
            ? "00000000-0000-0000-0000-000000000000"
            : this.request.NidProc,
        UserInfo: {
          UserName: this.getUserDisplayName(),
          IsSysAdmin: userInfo.isSysAdmin,
          Domain: userInfo.domains,
          DomainNames: userInfo.domainNames,
          NidUser: this.getNidUser(),
          GUID: this.getNidUser()
        }
      }
      this.$srvWorkflow
        .getAllTaskByNidProc(payload, {
          config: { District: this.selectedDistrict }
        })
        .then(async ({ data }) => {
          this.model.requestsList = data.data
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleActionsClick ({ name, label, e }) {
      this.selectedRow = e.dataItem
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
      this.activeTab = tabKey
    },
    closeTab ({ name }) {
      if (name === "list") return
      this.tabs = this.tabs.filter((x) => x.name !== name)
      this.activeTab = "list"
      const lastTab = this.tabs.length - 1
      this.activeTab = this.tabs[lastTab].name
      if (this.$refs[name] && this.$refs[name][0]) {
        this.$refs[name][0].$destroy()
      }
    },

    handleDisplayClick (e) {
      this.selectedRow = e.dataItem
      this.showReportHistory = true
    },
    selectedChange (e) {
      this.$emit("selectRequestFromRequestList", e.dataItem)
    }
  },

  computed: {
    gridTitle () {
      if (!this.request) return ""
      return " تاریخچه و گزارش درخواست " + this.request.NidWorkItem
    }
  }
}
</script>
