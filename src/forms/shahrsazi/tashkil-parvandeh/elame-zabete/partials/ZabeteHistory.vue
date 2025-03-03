<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <safa-tabs
      v-model="activeTab"
      :bordered="false"
      class="fit"
      height="100%"
      :padding="false"
    >
      <template v-slot:tabs>
        <tab-menu label="ضابطه" name="zabeteh" />
        <tab-menu
          v-for="tab in tabs"
          :key="tab.name"
          v-bind="tab"
          :name="tab.name"
          closable
          @close="closeTab(tab)"
        />
      </template>
      <tab-content name="zabeteh">
        <fit>
          <safa-datatable
            helper="zabeteHistory"
            v-model="result.ZabetehChidemanHistory"
            cdcName="ZabetehChidemanHistory"
            @dbclick="showDetailTab"
            :hideHeader="true"
            :bordered="false"
          />
        </fit>
      </tab-content>
      <tab-content
        v-for="tab in tabs"
        :key="tab.name"
        v-bind="tab"
        :name="tab.name"
        :padding="false"
      >
        <safa-datatable2
          :ref="tab.name + '-details'"
          v-model="logDetail"
          cdcName="baseUsing"
          helper="baseUsing"
          :hideHeader="true"
        />
        <!-- تاریخ قابل ویرایش نیست -->
      </tab-content>
    </safa-tabs>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import converter from "xml-js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  mixins: [baseFormMixin],
  props: {
    selectedRow: Object,
    fromKey: String,
    title: String,
    name: String,
    baseNosaziCode: Object
  },
  data () {
    return {
      // title: "شهرسازی- تاریخچه چیدمان در طبقات",
      formKey: "ca255fd8-32dd-491b-8e5d-8abaff8b9a88",
      requestResult: null,
      result: { ZabetehChidemanHistory: [] },
      tabs: [],
      activeTab: "zabeteh",
      logDetail: []
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.showLoading()
      let payLoad = {
        pNidZabeteh: this.selectedRow.NidZabeteh
      }

      this.$services.SC.loadZabetehChidemanHistory(payLoad)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data, {
            config: {
              District: this.selectedDistrict
            }
          })
          if (this.requestResult.success) {
            this.result = this.requestResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow.NidZabeteh,
              bizCodeTitle: "NidZabeteh",
              nosaziCode: this.selectedRequest
                ? this.selectedRequest.BizCode
                : convertNosaziCodeObjectToString(this.baseNosaziCode),
              nidWorkItem: this.selectedRequest
                ? this.selectedRequest.NidWorkItem
                : "",
              saveDesc: `بارگذاری اطلاعات  تاریخچه چیدمان در طبقات انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.log(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDetails (e) {
      let arrayOfClsLog = converter.xml2json(e.row.UsingLog, {
        compact: true,
        ignoreDoctype: true,
        ignoreCdata: true
      })
      const clsLog = JSON.parse(arrayOfClsLog)
      this.logDetail = clsLog.ArrayOfBase_Using.Base_Using
      this.logDetail.map((x) => {
        Object.keys(x).map((key) => {
          x[key] = x[key]._text || null
          return x
        })
        return x
      })
      this.logDetail = this.logDetail.map((x) => {
        return {
          ...x,
          CI_UsingGroup: parseInt(x.CI_UsingGroup),
          CI_UsingType: parseInt(x.CI_UsingType)
        }
      })
    },
    showDetailTab (e) {
      this.activeTab = "details"
      this.isEditable = false
      this.addTab(e.row)
      this.getDetails(e)
    },
    addTab (row) {
      const { NidZabetehChidemanHistory } = row
      const tabKey = `tab-${NidZabetehChidemanHistory}`
      const preferName =
        " تاریخ " + row.DateZabeteh + " - ساعت " + row.TimeZabeteh
      const already = this.tabs.some(
        (x) => x.name.toLowerCase() === tabKey.toLowerCase()
      )
      this.activeTab = tabKey

      if (already) {
        return
      }

      this.tabs.push({
        name: tabKey,
        label: preferName
      })
    },
    closeTab (tab) {
      const tabKey = tab.name
      this.tabs = this.tabs.filter((x) => x.name !== tabKey)
      const detailsPartial = this.$refs[tabKey + "-details"]
      if (detailsPartial && detailsPartial.destroy) {
        detailsPartial.destroy()
      }
      this.activeTab = "zabeteh"
    }
  }
}
</script>
