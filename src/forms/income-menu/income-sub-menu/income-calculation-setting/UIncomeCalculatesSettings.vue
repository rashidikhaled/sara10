<template>
   <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <form-wrapper title="تنظیمات محاسبات درآمد">
      <safa-status :result="saveResult" />
      <fit>
        <div class="row q-mb-sm">
          <div class="col-6">
            <safa-combo
              label=" نوع درخواست "
              v-model="selectedWorkFlow"
              cdcName="selectedWorkFlow"
              sourceType="local"
              :options="workFlowItemArray"
              :m="mode"
            />
          </div>
        </div>
        <safa-datatable
          v-model="results.CI_IncomeCalculation_All"
          cdcName="CI_IncomeCalculation_All"
          ref="grid"
          name="grid"
          helper="income.incomeClacSetting"
          :allowMultipleSelection="true"
          :selectable="true"
          @update="selectedChange"
          m="r"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          fit
          height="100%"
          max-height="100%"
          title="محاسبات"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          class="col-12"
          @edit="editForm"
          @save="save"
          @cancel="cancelEdit"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "UIncomeCalculatesSettings",
  route: "income/income-calculates-settings",

  mixins: [baseFormMixin],
  data () {
    return {
      name: "UIncomeCalculatesSettings",
      title: "تنظیمات محاسبه درآمد",
      formKey: "7b0f3071-0f3d-4645-9b8c-ac118c1bd65b",
      main: true,
      sidebarCompatible: true,
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      selectedRegion: 1,
      workFlowItemArray: [],
      workflowListResults: { Sh_NewWorkflowList: [] },
      workflowListResult: null,
      result: null,
      results: { CI_IncomeCalculation_All: [] },
      selectedRow: [],
      selectedWorkFlow: null,
      loadIncomeCalcSettingResults: { Income_CalculationSettings: [] },
      loadIncomeCalcSettingResult: null,
      selectedRowForSave: [],
      saveResult: null,
      isView: false
    }
  },
  props: {},
  mounted () {
    this.getShWorkFlow()
    this.getCIIncomeCalculationAll()
  },
  watch: {
    selectedWorkFlow () {
      this.selectedRow = []
      this.getCIIncomeCalculationAll()
    }
  },
  methods: {
    selectedChange (e) {
      // // console.log('@@@@', e)
      // this.selectedRowForSave = e.selectedItems
      // this.loadIncomeCalcSettingResults.Income_CalculationSettings.push({
      //   CI_IncomeCalculation: e.ID,
      //   NidSet: '00000000-0000-0000-0000-000000000000',
      //   NidWorkflowDeff: this.selectedWorkFlow
      // })
    },
    getShWorkFlow () {
      let self = this
      let WorkflowList = {}
      this.showLoading()
      this.$services.SA.loadNeworkflowList(WorkflowList, {
        config: { District: this.selectedDistrict }
      })
        .then(({ data }) => {
          self.workflowListResult = this.getResponse(data)
          if (self.workflowListResult.success) {
            self.workflowListResults = self.workflowListResult.data
            this.workFlowItemArray =
              self.workflowListResults.Sh_NewWorkflowList.map((x) => ({
                ID: x.NidWorkflowDeff,
                Title: x.WorkflowTitel
              })).sort(({ Title: xID }, { Title: yID }) => {
                if (xID < yID) {
                  return -1
                }
                if (xID > yID) {
                  return 1
                }
                return 0
              })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    getCIIncomeCalculationAll () {
      this.showLoading()
      let data = {}
      this.$services.SD.getCIIncomeCalculationAll(data, {
        config: { District: this.selectedDistrict }
      })
        .then(({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            if (this.selectedWorkFlow !== null) {
              this.loadIncomeCalculationSetting()
            }
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    editForm () {
      this.isEditable = true
    },
    cancelEdit () {
      this.selectedWorkFlow = null
      this.isEditable = false
    },
    loadIncomeCalculationSetting () {
      this.showLoading()
      let data = {
        pNidWorkflowDef: this.selectedWorkFlow
      }
      this.$services.SD.loadIncomeCalculationSettings(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.loadIncomeCalcSettingResult = this.getResponse(data)

          if (this.loadIncomeCalcSettingResult.success) {
            this.loadIncomeCalcSettingResults =
              this.loadIncomeCalcSettingResult.data
            let selectedRows =
              this.loadIncomeCalcSettingResults.Income_CalculationSettings
            this.results.CI_IncomeCalculation_All =
              this.results.CI_IncomeCalculation_All.map((x) => ({
                ...x,
                Title: x.Title + "--" + x.ID,
                selected: selectedRows.some(
                  (sr) => sr.CI_IncomeCalculation === x.ID
                )
              })).sort((a, b) => Number(b.selected) - Number(a.selected))
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedWorkFlow,
                bizCodeTitle: "selectedWorkFlow"
              })
            }
            this.isView = true
            // this.results.CI_IncomeCalculation_All = this.results.CI_IncomeCalculation_All.map(
            //   item => {
            //     const selected =
            //       selectedRows.some(sr => sr.CI_IncomeCalculation === item.ID)

            //     return {
            //       ...item,
            //       selected
            //     }
            //   }
            // )
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    save () {
      if (this.selectedWorkFlow === null) {
        this.showError("لطفا نوع درخواست را انتخاب کنید")
        return
      }
      this.showLoading()
      console.log(
        "all-list",
        this.results.CI_IncomeCalculation_All.filter((x) => x.selected)
      )
      const lst = this.results.CI_IncomeCalculation_All.filter(
        (x) => x.selected
      ).map((x) => ({
        CI_IncomeCalculation: x.ID,
        NidSet: "00000000-0000-0000-0000-000000000000",
        NidWorkflowDeff: this.selectedWorkFlow
      }))

      this.loadIncomeCalcSettingResults.Income_CalculationSettings = lst
      let payload = {
        pIncomeCalcSettings: this.loadIncomeCalcSettingResults
      }
      this.$services.SD.saveIncomeCalculationSettings(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.loadIncomeCalcSettingResults.NidWorkflowDef,
              bizCodeTitle: "NidWorkflowDef"
            })
            this.isEditable = false
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.selectedWorkFlow = null
          }
        })
        .catch((response) => {
          this.serverError()
          console.log("save error", response)
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
