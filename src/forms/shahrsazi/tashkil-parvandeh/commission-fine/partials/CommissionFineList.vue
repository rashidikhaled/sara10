<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo label="اطلاعات دبیرخانه" label-width="100px" :m="m" />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          label="پرونده با حضور نماینده شهرداری"
          label-width="100px"
          v-model="isPresenceUrbanInCase"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <!-- helper="agCommissionFineList" -->
    <safa-grid
      title="لیست خلاف ها"
      v-model="value.Commission_FinePenalty"
      fit
      :columns="agCommissionFineList"
      :pinnedBottomRowData="[{}]"
      :detailCellRendererParams="detailCellRendererParams"
      :masterDetail="true"
      minHeight="100px"
      height="100%"
      max-height="100%"
      :m="m"
      :exportable="true"
      :checkboxSelection="true"
      :showDeletingConfirm="true"
      :allowMultipleSelection="true"
      paginate
    />
  </fit>
</template>
<script>
import converter from "xml-js"
import AgGovermentalPrice from './AgGovermentalPrice.vue'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { AgGovermentalPrice },
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      isPresenceUrbanInCase: false,
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
            { field: "title", title: "عنوان", width: "150px" },
            { field: "amount", title: "مقدار", width: "200px" },
            { field: "comment", title: "توضیحات", width: "auto" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(() => {
            if (params.data.OtherFields) {
              let arrayOfClsLog = converter.xml2json(params.data.OtherFields, {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              })
              const clsLog = JSON.parse(arrayOfClsLog)
              if (clsLog.ArrayOfClsLog && clsLog.ArrayOfClsLog.ClsLog) {
                if (Array.isArray(clsLog.ArrayOfClsLog.ClsLog)) {
                  const list = clsLog.ArrayOfClsLog.ClsLog
                  let logDetail = list.map((m) => {
                    return {
                      title: m.Subject._text || "",
                      amount: m.Value._text || "",
                      comment: m.Comment._text || ""
                    }
                  })
                  params.successCallback(logDetail)
                } else {
                  let list = []
                  list.push({
                    title: clsLog.ArrayOfClsLog.ClsLog.Subject._text || "",
                    amount: clsLog.ArrayOfClsLog.ClsLog.Value._text || "",
                    comment: clsLog.ArrayOfClsLog.ClsLog.Comment._text || ""
                  })
                  params.successCallback(list)
                }
              } else {
                let list = []
                params.successCallback(list)
              }
            } else {
              let list = []
              params.successCallback(list)
            }
          }, 1000)
        }
      },
      agCommissionFineList: [
        // {
        // "cellRenderer": "agGroupCellRenderer",
        //   "field": "CI_CommissionFinePenalty_Group",
        //   "title": "گروه تخلف",
        //   "editor": "ci",
        //   "domain": "CI_SaraM1",
        //   "width": "150px"
        // },
        {
          field: "isSelectedNode",
          title: "",
          width: "74px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          cellRenderer: "agGroupCellRenderer",
          field: "CI_CommissionFinePenalty",
          title: "گروه تخلف/نوع تخلف",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "200px",
          // eslint-disable-next-line no-return-assign
          comboSort: (a, b) => a.ID - b.ID
        },
        {
          field: "CI_CommissionUrbanIdea",
          title: "نظر شهرداری",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "120px"
        },
        {
          field: "CI_VahdatRavieh",
          title: "وحدت رویه",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "120px"
        },
        {
          field: "CI_UsingGroup",
          ciName: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "گروه کاربری اصلی",
          width: 170,
          triggerCells: [["CI_UsingType"]]
        },
        {
          field: "CI_UsingType",
          ciName: "CI_UsingType",
          title: "نوع استفاده فرعی",
          width: 170,
          ignoreCi: true,
          editor: "ADPGridTemplate",
          params: {
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            paramName: "pCI_UsingGroup",
            groupField: "CI_UsingGroup"
          }
        },
        {
          field: "FloorNo",
          title: "شماره طبقه",
          width: "100px"
        },
        {
          field: "Area",
          title: "مساحت",
          width: "80px",
          validations: "required,number",
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          cellClass: 'custom-pinned-row'
        },
        {
          field: "HappenDate",
          title: "تاریخ بررسی تخلف از نظر شهرداری",
          width: "150px",
          editor: "date"
        },
        {
          field: "TrespassDateInMunicipality",
          title: "تاریخ وقوع تخلف از نظر کارشناس",
          width: "150px",
          editor: "date"
        },
        {
          field: "TrespassDateInEngineer",
          title: "تاریخ وقوع تخلف از نظر مهندس ناظر",
          width: "150px",
          editor: "date"
        },
        {
          field: "TrespassDateHappendNotMelak",
          title: "تاریخ وقوع خلاف ملاک عمل",
          width: "150px",
          editor: "date"
        },
        {
          field: "CommissionSarghofliValue",
          title: "ارزش سر قفلی کمیسیون",
          width: "100px"
        },
        {
          field: "FramePrice",
          title: "قیمت اسکلت",
          width: "100px",
          editor: "money"
        },
        {
          field: "EconomicPrice",
          title: "قیمت منطقه ای",
          width: "100px",
          editor: "money"
        },
        {
          field: "MaxPrice",
          title: "حداکثر مبلغ",
          width: "100px",
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          cellClass: 'custom-pinned-row'
        },
        {
          field: "MinPrice",
          title: "حداقل مبلغ",
          width: "100px",
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          cellClass: 'custom-pinned-row'
        },
        {
          field: "MaxFormula",
          title: "فرمول محاسباتی حداکثر",
          width: "150px"
        },
        {
          field: "MinFormula",
          title: "فرمول محاسباتی حداقل",
          width: "150px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "200px"
        },
        {
          field: "CI_UsingGroup_Mojaz",
          ciName: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "گروه کاربری مجاز",
          editor: "ci",
          triggerCells: [["CI_UsingType"]]
        },

        {
          field: "CI_UsingType_Mojaz",
          ciName: "CI_UsingType",
          title: "کد کاربری مجاز",
          width: "170px",
          ignoreCi: true,
          editor: "ADPGridTemplate",
          params: {
            groupField: "CI_UsingGroup_Mojaz",
            paramName: "pCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup"
          }
        },
        {
          field: "AreaMojod",
          title: "متراژ موجود",
          width: "100px"
        },
        {
          field: "AreaMojaz",
          title: "متراژ مجاز",
          width: "100px"
        },
        {
          field: "UnitCount",
          title: "تعداد واحد",
          width: "100px"
        },
        {
          field: "UnitCountMojod",
          title: "تعداد واحد موجود",
          width: "100px"
        },
        {
          field: "UnitCountMojaz",
          title: "تعداد واحد مجاز",
          width: "100px"
        },
        {
          field: "CalculationPrice",
          title: "قیمت محاسباتی",
          width: "100px",
          editor: "money"
        },
        {
          field: "Remark",
          title: "تبصره",
          width: "100px"
        },
        {
          field: "IsComplainant",
          title: "شاکی دارد / ندارد",
          width: "100px",
          editor: "checkbox"
        },
        {
          field: "IsRightsBystanders",
          title: "عدم رعایت حقوق مجاورین",
          width: "100px",
          editor: "checkbox"
        },
        {
          field: "TrepassValueAmar",
          title: "متراژ کسر از آمار",
          width: "100px"
        },
        {
          field: "RemainArea",
          title: "متراژ باقیمانده",
          width: "100px"
        },
        {
          field: "CI_TrepassStatus",
          title: "وضعیت تخلف",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "IncomeArea",
          title: "حوزه ی درآمدی",
          width: "100px"
        },
        {
          field: "CommissionInternalRatio",
          title: "ضریب داخلی کمیسیون",
          width: "140px"
        },

        {
          field: "CI_RoofType",
          title: "نوع سقف",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختمانی",
          width: "150px",
          editor: "ci",
          domain: "CI_SaraM1"

        },
        {
          field: "CI_SazehType",
          title: "نوع اسکلت",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "TradingValue",
          title: "ازش معاملاتی",
          width: "150px"
        }
      ]
    }
  },
  watch: {
    isPresenceUrbanInCase () {
      this.$emit("presenceUrbanInCaseHandler", this.isPresenceUrbanInCase)
    }
  },
  methods: {
    voteTrepassesCellRendererSelector (params) {
      if (params.node.rowPinned === 'bottom') {
        switch (params.column.colId) {
          case 'MaxPrice': {
            return {
              component: "AgGovermentalPrice",
              params: {
                totalValue: () => {
                  let total = 0
                  try {
                    total = this.value.Commission_FinePenalty
                      .reduce(
                        (a, { MaxPrice: b }) =>
                          a + parseFloat(b || 0),
                        0
                      )
                      .toFixed(2)
                  } catch (ex) {
                    total = 0
                  }
                  return `جمع کل : ${Number(
                    total
                  )?.toNumberWithCommas()}`
                }
              }
            }
          }
          case 'MinPrice': {
            return {
              component: 'AgGovermentalPrice',
              params: {
                totalValue: () => {
                  let total = 0
                  try {
                    total = this.value.Commission_FinePenalty
                      .reduce(
                        (a, { MinPrice: b }) =>
                          a + parseFloat(b || 0),
                        0
                      )
                      .toFixed(2)
                  } catch (ex) {
                    total = 0
                  }
                  return `جمع کل : ${Number(
                    total
                  )?.toNumberWithCommas()}`
                }
              }
            }
          }
          case 'Area': {
            return {
              component: 'AgGovermentalPrice',
              params: {
                totalValue: () => {
                  let total = 0
                  try {
                    total = this.value.Commission_FinePenalty
                      .reduce(
                        (a, { Area: b }) =>
                          a + parseFloat(b || 0),
                        0
                      )
                      .toFixed(2)
                  } catch (ex) {
                    total = 0
                  }
                  return `جمع کل : ${Number(
                    total
                  )?.toNumberWithCommas()}`
                }
              }
            }
          }
          default:
            return {
              component: undefined
            }
        }
      }
      return undefined
    }
  }
}
</script>
