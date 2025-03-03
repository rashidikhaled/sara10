<template>
  <fit>
    <safa-status :result="clacResult"/>
    <safa-status :result="clacAndSaveResult"/>
    <safa-status :result="clacAndSaveAndTepmFicheResult"/>
    <safa-status :result="getIncomeResult"/>
    <safa-splitter v-model="splitterValue" :limits="[20, Infinity]">
      <template #before>
        <div class="full-height overflow-auto fit">
          <!--          :suppressRowClickSelection="isManualSelection"
                    :suppressRowDeselection="isManualSelection"
                     :is-row-selectable="isManualSelection ? isRowSelectable : undefined"
                    :rowMultiSelectWithClick="isManualSelection"-->
          <safa-grid
            filterable
            sortable
            selectable
            allow-multiple-selection
            :m="m"
            ref="grv_calculation"
            id="grv_calculation"
            :actions="[]"
            :columns="calculationColumns"
            @grid:ready="gridLoaded"
            @row:click="selectedChange"
            v-model="incomeDetailResults.Income_Calculation_ForChange"
          />
        </div>
      </template>
      <template #after>
        <UCalculatetabs
          :incomeDetailResults="incomeDetailResults"
          :m="m"
          :formKey="formKey"
          :name="name"
          :title="title"
          :logDetail="logDetail"
        />
      </template>
    </safa-splitter>
    <div
      class="q-pa-sm full-width"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-blue-1'"
    >
      <div class="row items-center q-gutter-x-md">
        <div class="col-12 col-md-auto">
          <div class="flex q-col-gutter-x-md">
            <safa-custom-text
              label="مجموع مبلغ کاربر:"
              type="money"
              m="r"
              readonlyShowLabel
              :value="totalUserAmount"
              cdcName="totalUserAmount"
              style="width: 200px"
            />
            <safa-custom-text
              label="مجموع عوارض:"
              m="r"
              readonlyShowLabel
              v-model="totalSysAmount"
              cdcName="totalSystemAmount"
              style="width: 200px"
            />
          </div>
        </div>
        <div class="col-auto">
          <q-separator style="height: 12px" vertical/>
        </div>
        <div class="col-12 col-md" v-if="showInnerBtn">
          <button-group height="30px" ref="bgroups">
            <!-- <btn-default
              label="امکان انتخاب عوارض"
              spId="2cb770bc-91b5-4997-8ef1-c190d09408f7"
              spCaption="امکان انتخاب عوارض"
            />
            <btn-default
              label="امکان تغییر مبلغ کاربر"
              spId="3be08968-a827-44af-97c5-8fae16a3d2c3"
              spCaption="امکان تغییر مبلغ کاربر"
            />
            <btn-default
              label="امکان ویرایش بستانکاری"
              spId="68548464-a8f5-4881-b15b-ef76a4671322"
              spCaption="امکان ویرایش بستانکاری و پرداختهای قبلی"
            /> -->
            <btn-default label="محاسبه" @click="getCalculateIncome"/>
            <btn-default
              label="محاسبه و ذخیره"
              @click="getCalculateIncomeAndSave"
            />
            <btn-default
              label="محاسبه و صدور فیش موقت"
              @click="getCalculateIncomeAndSaveAndTemporaryExportFiche"
              spId="e831d896-997f-4884-a03c-fb9e477d2278"
              spCaption="محاسبه و صدور فیش موقت"
            />
          </button-group>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
import UCalculatetabs from "../partials/calculates/UCalculateTabs.vue"
import converter from "xml-js"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "UCalculates",
  mixins: [baseFormMixin],
  components: {
    UCalculatetabs
  },
  data () {
    return {
      splitterValue: 70,
      clacResult: null,
      clacResults: { Income_Calculation_ForChange: [] },
      clacAndSaveResult: null,
      clacAndSaveResultS: { Income_Calculation_ForChange: [] },
      clacAndSaveAndTepmFicheResult: null,
      clacAndSaveAndTepmFicheResults: {},
      copySettings: {
        incomeCalculationUserSettings: null,
        incomeSettings: null,
        buildingSettings: null
      },
      allowSelection: false,
      selectedRows: [],
      selectedId: null,
      logDetail: [],
      totalIncome: 0,
      loadIncomeCalculationSettingsPrequest: {
        pNidWorkflowDef: ""
      },
      getResult: null,
      loadResult: null,
      saveResult: null,
      loadDetailsPreqsuest: {
        pNidIncome: "", // 8fc98967-7d59-484b-942b-2f1271604875
        PLoadFun:
          "Income_LogMethod,Income,Income_Calculation_ForChange,Income_PrePayment,Income_OddmentAccount,Income_Discount,NidBase"
      },
      getIncomeResult: null,
      getCalculateIncomeResult: null,
      editSelection: false,
      isCalculate: false,
      calculationData: []
    }
  },
  computed: {
    isManualSelection () {
      return !JSON.parse(
        `${
          (this.buildingSettings &&
            this.buildingSettings.calculateIncomeBaseOnSettings) ||
          false
        }`
      )
    },
    calculationColumns () {
      return [
        {
          field: "selected",
          title: "",
          width: "74px",
          filterable: true,
          editable: true,
          // editable: this.isManualSelection,
          // headerCheckboxSelection: this.isManualSelection,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "IncomeCalculation_Title",
          title: "نوع عوارض",
          width: "360px",
          editable: false
        },
        {
          field: "SysValue",
          title: "مبلغ سیستمی",
          name: "SysValue",
          width: "200px",
          editor: "money",
          editable: false
        },
        !this.buildingSettings.hideUserPriceColumn
          ? {
            field: "Value",
            title: "مبلغ کاربر",
            width: "200px",
            editor: "money",
            type: "numeric",
            // cell: 'money',
            editable: true
          }
          : {},
        {
          field: "Comments",
          title: "توضیحات",
          width: "auto",
          minWidth: "250px",
          flex: 1,
          editable: false
          // render: ({ row, column, options }) => {
          //   return (row[column.field]) ? row[column.field] : '-';
          // }
        },
        {
          field: "UserName",
          title: "کاربر محاسبه کننده",
          width: "150px",
          editable: false
          // render: ({ row, column, options }) => {
          //   return (row[column.field]) ? row[column.field] : '-';
          // }
        },
        {
          field: "CalcDate",
          title: "زمان محاسبه",
          width: "150px",
          editor: "date",
          editable: false
        }
      ].filter((col) => col.field)
    }
  },
  props: {
    value: Object,
    incomeCalculationUserSettings: Object,
    buildingSettings: Object,
    config: Object,
    incomeDetailResults: Object,
    m: String,
    selectedCalculationRow: Object,
    totalUserAmount: Number,
    totalSysAmount: Number,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    activeTab: String,
    mainTab: String,
    showInnerBtn: Boolean,
    loadFromMenu: Boolean,
    hideUserPriceColumn: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.$refs.bgroups) {
        this.$refs.bgroups.onResize()
      }
    }, 3000)
    JSON.stringify({ title: "test", number: 23 })
    // console.log(converter.json2xml(str, {}));
  },
  watch: {
    buttons () {
      this.applyButtons()
    }
  },
  beforeDestroy () {
    this.$root.$emit("removeButtons", "ucalculate")
  },

  methods: {
    gridLoaded () {
      this.$emit("loaded")
    },
    updateSettings ({
      buildingSettings,
      incomeSettings,
      incomeCalculationUserSettings
    }) {
      this.copySettings.buildingSettings = buildingSettings
      this.copySettings.incomeSettings = incomeSettings
      this.copySettings.incomeCalculationUserSettings =
        incomeCalculationUserSettings
      console.log(
        "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ updateSettings",
        incomeCalculationUserSettings
      )
      if (
        !buildingSettings.calculateIncomeBaseOnSettings &&
        incomeCalculationUserSettings &&
        incomeCalculationUserSettings.RecentlySelection &&
        Array.isArray(incomeCalculationUserSettings.RecentlySelection) &&
        incomeCalculationUserSettings.RecentlySelection.length > 0
      ) {
        this.setSelectedRows(incomeCalculationUserSettings.RecentlySelection)
      } else {
        this.setSelectedRows(
          incomeSettings.Income_CalculationSettings.map(
            (x) => x.CI_IncomeCalculation
          )
        )
      }
    },
    setSelectedRows (keys) {
      // console.log('setSelectedRows', keys)
      /* if (this.$refs.grv_calculation.gridApi) {
        this.$refs.grv_calculation.gridApi.forEachRowNode((node) => {
          // // console.log('node', node)
          node.setSelected(keys.includes(node.data.CI_IncomeCalculation));
        });
      } */
      this.incomeDetailResults.Income_Calculation_ForChange.forEach((row) => {
        row.selected = keys.includes(row.CI_IncomeCalculation)
      })

      this.$nextTick(() => {
        this.$refs?.grv_calculation?.gridApi?.applyColumnState({
          state: [{ colId: 'selected', sort: 'desc' }],
          defaultState: { sort: null }
        })
      })
    },
    applyButtons () {
      this.$root.$emit("setButtons", "ucalculate", this.buttons)
    },

    selectedChange (params) {
      this.selectedId = params.data.CI_IncomeCalculation
      if (params.data.CalculateLog) {
        let arrayOfClsLog = converter.xml2json(params.data.CalculateLog, {
          compact: true
        })
        const clsLog = JSON.parse(arrayOfClsLog)
        if (clsLog && Array.isArray(clsLog?.ArrayOfClsLog?.ClsLog)) {
          this.logDetail = clsLog?.ArrayOfClsLog?.ClsLog.map((x) => {
            return {
              ...x,
              Subject: x.Subject._text,
              value: x.Value._text,
              Comment: x.Comment._text
            }
          })
        } else {
          this.logDetail = []
          let obj = clsLog?.ArrayOfClsLog?.ClsLog
          this.logDetail.push({
            Subject: obj.Subject._text,
            value: obj.Value._text,
            Comment: obj.Comment._text
          })
        }
      }
    },
    getSelectedRows () {
      /*      if (this.isManualSelection) {
              return this.incomeDetailResults.Income_Calculation_ForChange.filter(
                (x) => x.selected
              ).sort((a, b) => {
                if (a.SortID > b.SortID) return 1;
                if (a.SortID < b.SortID) return -1;
                return 0;
              });
            }
            return (
              (this.$refs.grv_calculation &&
                this.$refs.grv_calculation.gridApi &&
                this.$refs.grv_calculation.gridApi.getSelectedRows()) ||
              this.incomeDetailResults.Income_Calculation_ForChange.filter(
                (x) => x.selected
              )
            ).sort((a, b) => {
              if (a.SortID > b.SortID) return 1;
              if (a.SortID < b.SortID) return -1;
              return 0;
            }); */
      debugger
      return this.incomeDetailResults.Income_Calculation_ForChange.filter(
        (x) => x.selected
      ).sort((a, b) => {
        if (a.SortID > b.SortID) return 1
        if (a.SortID < b.SortID) return -1
        return 0
      })
    },
    getCalculateIncome () {
      this.showLoading()
      this.totalIncome = 0
      let data = {
        pNidProc: this.selectedRequest.NidProc,
        pNidIncome: this.incomeDetailResults.NidIncome,
        pSelectedList: this.getSelectedRows(),
        /* pSelectedList:
           this.incomeDetailResults.Income_Calculation_ForChange.filter(
             (x) => x.selected === true
           ).sort((a, b) => {
             if (a.SortID > b.SortID) return 1
             if (a.SortID < b.SortID) return -1
             return 0
           }), */
        pInputParameters: this.incomeDetailResults.IncomeParameters,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        pIsLoadFromMenu: this.loadFromMenu
      }
      this.$services.SD.getCalculateIncome(data, this.config)
        .then(async ({ data }) => {
          this.clacResult = this.getResponse(data)

          if (this.clacResult.success) {
            this.isCalculate = true
            this.clacResults = this.clacResult.data
            this.incomeDetailResults.Income_Calculation_ForChange =
              this.clacResults.Income_Calculation_ForChange.map((row) => {
                return {
                  ...row,
                  totalIncome:
                    row.totalIncome && row.SysValue
                      ? row.totalIncome + row.SysValue
                      : 0
                }
              })
            this.clacResults.Income_Calculation_ForChange.forEach((x) => {
              this.totalIncome += x.SysValue
            })
            this.updateSettings({
              buildingSettings: this.copySettings.buildingSettings,
              incomeSettings: this.copySettings.incomeSettings,
              incomeCalculationUserSettings:
              this.copySettings.incomeCalculationUserSettings
            })
            // this.amount = this.totalIncome
            if (!this.buildingSettings.calculateIncomeBaseOnSettings) {
              this.saveIncomeCalculationUserSettings()
            }

            await this.log({
              action: this.logActions.calculate,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `محاسبه درآمد برای ردیف محاسباتی ${this.incomeDetailResults.Income.UserName} که در تاریخ ${this.incomeDetailResults.Income.CreateDate} و ساعت ${this.incomeDetailResults.Income.CreateTime} ایجاد گردیده است، انجام گردید.`
            })

            // this.incomeDetailResults.Income_Calculation_ForChange = this.incomeDetailResults.Income_Calculation_ForChange
            // this.clacAndSaveResults.Income_Calculation_ForChange.forEach(x => {
            //   this.totalIncome += x.SysValue
            // })
          }
        })
        .catch((response) => {
          // // console.log(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    loadIncomeCalculationSettings () {
      try {
        this.$q.loading.show()
        this.$services.SD.loadIncomeCalculationSettings(
          this.loadIncomeCalculationSettingsPrequest,
          this.config
        ).then(async (response) => {
          this.loadResult = this.getResponse(response.data)
          if (this.loadResult.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.NidBase,
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "NidBase"
            })
          }
        })
      } catch (error) {
        this.$q.dialog({
          title: "خطا در سرور",
          // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
          message: error.message
        })
      } finally {
        this.$q.loading.hide()
      }
    },

    getCalculateIncomeAndSave () {
      this.amount = 0
      this.totalIncome = 0
      this.showLoading()
      let self = this
      // this.getUserDisplayName() = this.getUserDisplayName()
      let data = {
        pNidProc: this.selectedRequest.NidProc,
        pNidIncome: this.incomeDetailResults.NidIncome,
        pSelectedList: this.getSelectedRows(),
        pInputParameters: this.incomeDetailResults.IncomeParameters,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        pIsLoadFromMenu: this.loadFromMenu
      }
      this.$services.SD.getCalculateIncomeAndSave(data, this.config)
        .then(async ({ data }) => {
          self.clacAndSaveResult = this.getResponse(data)

          if (self.clacAndSaveResult.success) {
            self.clacAndSaveResults = self.clacAndSaveResult.data

            await this.log({
              action: this.logActions.calcAndSave,
              bizCode: this.incomeDetailResults.NidIncome,
              bizCodeTitle: "NidIncome",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `محاسبه و ذخیره درآمد برای ردیف محاسباتی ${this.incomeDetailResults.Income.UserName} که در تاریخ ${this.incomeDetailResults.Income.CreateDate} و ساعت ${this.incomeDetailResults.Income.CreateTime} ایجاد گردیده است، انجام گردید.`
            })

            // this.incomeDetailResults.Income_Calculation_ForChange = this.incomeDetailResults.Income_Calculation_ForChange
            this.clacAndSaveResults.Income_Calculation_ForChange.forEach(
              (x) => {
                this.totalIncome += x.SysValue
              }
            )
            // this.amount = this.totalIncome
            if (!this.buildingSettings.calculateIncomeBaseOnSettings) {
              this.saveIncomeCalculationUserSettings()
            }
            this.showSuccess("محاسبه با موفقیت انجام شد.")
            this.$emit("reloadMainForm", this.clacAndSaveResults)
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    async saveIncomeCalculationUserSettings () {
      try {
        const userSettings = { ...this.incomeCalculationUserSettings }
        const selectedIds = this.getSelectedRows().map(
          (x) => x.CI_IncomeCalculation
        )
        userSettings.RecentlySelection = selectedIds
        await this.saveFormSetting("IncomeCalculation", userSettings)
      } catch (e) {
        console.log("error", e)
      }
    },
    getIncomeDetails () {
      try {
        this.showLoading()
        this.$services.SD.getIncomeDetails(
          this.loadDetailsPreqsuest,
          this.config
        ).then(async (response) => {
          this.getIncomeResult = this.getResponse(response.data)
          if (this.getIncomeResult.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش جزئیات درآمد برای ردیف محاسباتی ${this.incomeDetailResults.Income.UserName} که در تاریخ ${this.incomeDetailResults.Income.CreateDate} و ساعت ${this.incomeDetailResults.Income.CreateTime} ایجاد گردیده است، انجام گردید.`
            })
          }
        })
      } catch (error) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getCalculateIncomeAndSaveAndTemporaryExportFiche () {
      this.showLoading()
      let data = {
        pNidIncome: this.incomeDetailResults.NidIncome,
        pSelectedList: this.getSelectedRows(),
        pInputParameters: this.incomeDetailResults.IncomeParameters,
        pNidProc: this.selectedRequest.NidProc,

        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: "baea57df-4bb2-4ba2-956b-1617ba73a85d",
          WorkflowGuid: "5ca8477d-2a3a-4962-9c63-a8690ff8975c"
        },
        pIsBreakInDay: false,
        pBreakDay: 0,
        pIsLoadFromMenu: this.loadFromMenu
      }
      this.$services.SD.getCalculateIncomeAndSaveAndTemporaryExportFiche(
        data,
        this.config
      )
        .then(async ({ data }) => {
          this.clacAndSaveAndTepmFicheResult = this.getResponse(data)

          if (this.clacAndSaveAndTepmFicheResult.success) {
            this.clacAndSaveAndTepmFicheResults =
              this.clacAndSaveAndTepmFicheResult.data
            this.showSuccess("محاسبه و صدور فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.calculateAndExportTemporaryFiche,
              bizCode: this.incomeDetailResults.NidIncome,
              bizCodeTitle: "NidIncome",
              saveDesc: `محاسبه و صدور فیش درآمد برای ردیف محاسباتی ${this.incomeDetailResults.Income.UserName} که در تاریخ ${this.incomeDetailResults.Income.CreateDate} و ساعت ${this.incomeDetailResults.Income.CreateTime} ایجاد گردیده است، انجام گردید.`,
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem
            })

            this.$emit("reloadMainForm")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
<style lang="scss">
.income-table .q-table {
  thead tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  }

  td {
    padding: 2px 4px;
    height: auto;
    min-height: 26px;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }
}
</style>
