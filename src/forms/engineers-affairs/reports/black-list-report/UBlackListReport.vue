<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-status :result="getBlackListHistoryRes" />
      <fit>
        <safa-grid
          :value="tmpModel"
          :addRow="false"
          :allowCopy="false"
          :deleteRow="false"
          :bordered="false"
          :paginate="true"
          m="r"
          :pageSize="50"
          :cacheBlockSize="50"
          :animateRows="true"
          rowModelType="serverSide"
          :filterable="true"
          :columns="blackListHistoryColumns"
          :suppressRowClickSelection="false"
          :allowMultipleSelection="false"
          @grid:ready="onGridReady"
          cdcName="blackListHistory"
              @model:update="onModelUpdate"
              @filter:changed="handleFilterChanged"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { filterModelToSqlQuery } from "../../../../kartable/utils/agQueryTools"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UBlackListReport",
      title: "گزارش لیست سیاه",
      formKey: "74fb01c8-55b6-4d56-b9ce-86c796785e76",
      main: true,
      workflowCompatible: true,
      // #services
      getBlackListHistoryRes: null,
      // #variables
      blackListHistory: [],
      model: {
        CI_RequestType: 0,
        CI_Years: 0,
        NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
        NidEng: "00000000-0000-0000-0000-000000000000",
        NidFil: "00000000-0000-0000-0000-000000000000",
        NidWorkitem: 0,
        CI_CancelType: 0,
        CI_ExecFloor: 0,
        CI_ExecLevel: 0,
        CI_SazeType: 0,
        CI_Year: 0,
        Floor: 0,
        Height: 0,
        Infrastructure: 0,
        IsConfirm: false,
        IsRefreshOnly: false,
        IsSendToSaraRequest: false,
        NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
        NIdDetail: "00000000-0000-0000-0000-000000000000",
        NIdRealPerson: "00000000-0000-0000-0000-000000000000",
        NidBlackList: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000",
        NidRefer: "00000000-0000-0000-0000-000000000000",
        NidTask: "00000000-0000-0000-0000-000000000000",
        NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
        OtherFileType: 0,
        Sara_WorkflowID: 0,
        SecretariatNo: 0,
        Skip: 0,
        StudyFiled: 0,
        SysCI_RequestStatus: 0,
        Take: 50,
        UserGUID: "00000000-0000-0000-0000-000000000000",
        PredicateCondition: ""
      }
    }
  },
  computed: {
    blackListHistoryColumns () {
      return [

        {
          field: "OfficeCode",
          title: "کد دفتر",

          width: 185
        },
        {
          field: "OfficeName",
          title: "نام دفتر",
          width: 185
        },
        {
          field: "IdentityCode",
          title: "کدعضویت",

          width: 105
        },
        {
          field: "EngName",
          title: "نام",

          width: 105
        },
        {
          field: "EngFamily",
          title: "نام خانوادگی",
          width: 105
        },
        {
          field: "NidWorkItem",
          title: "شماره ارجاع",
          width: 110
        },
        {
          field: "UrbanNidKartablItem",
          title: "دبیرخانه شهرداری",

          width: 110
        },
        {
          field: "BlackListNIdType",
          title: "نوع",

          width: 115
        },
        {
          field: "BlackList",
          title: "علت ورود به لیست",

          width: 185
        },
        {
          field: "CI_Years",
          title: " سال",

          width: 150
        },
        {
          field: "BL_Date",
          title: "تاریخ ورود",

          width: 160
        },
        {
          field: "MunicipalityCode",
          title: "کد نظام مهندسی",

          width: 190
        },
        {
          field: "ArchitectureCode",
          title: "کد نظام معماری",

          width: 115
        },
        {
          field: "BL_Comments",
          title: "توضیحات",

          width: 115
        }
      ].map((e) => ({ ...e,
        ...{
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

      })
      )
    },
    customFilterValues () {
      return {
        filter: 'agSetColumnFilter',
        filterParams: {
          values: (params) =>
            params.success(this.getFilterValues(params)),
          refreshValuesOnOpen: true,
          defaultToNothingSelected: true
        }
      }
    }
  },

  mounted () {
    // this.setServerSideDatasource()
  },

  methods: {
    getFilterValues (params) {
      try {
        const list = [
          ...new Set(this.getBlackListHistoryRes.data.GetBlackListHistoryResult.BlackListHistory.map((e) => e[params.column.colId]))
        ]
          .filter(Boolean)
          .map((str) => `${str}`.convertToPersian())

        return list
      } catch (ex) {
        return []
      }
    },
    reload () {
      // this.gridApi.paginationGoToFirstPage()
      this.gridApi.refreshServerSide()
    },
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
      this.setServerSideDatasource()
    },
    onServerFailCallback (params) {
      console.error("onServerFailCallback", params)
    },
    setServerSideDatasource () {
      this.gridApi.setGridOption("serverSideDatasource", {
        getRows: async (params) => {
          if (this.loading) return false
          this.loading = true
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
          const tmpFilterModel = this.mergeLocalFilters(params.api.getFilterModel())
          const pWhere = Object.entries(tmpFilterModel).reduce(
            (acc, [field, filter]) =>
              acc +
                filterModelToSqlQuery(field, filter, {
                  queryBuilder: undefined,
                  normalize: ![].includes(field),
                  appendOperator: "And"
                }),
            ""
          )
          this.model.Take = endRow
          this.model.Skip = startRow === 0 ? startRow : startRow + 1
          this.model.PredicateCondition = 'where 1=1 ' + pWhere
          let pRequest = this.model
          this.$services.engineers
            .getBlackListHistory({ pRequest })
            .then(async ({ data }) => {
              this.getBlackListHistoryRes = this.getResponse(data)
              if (this.getBlackListHistoryRes.success) {
                console.log(`take: ${this.model.Take}, skip: ${this.model.Skip}, total records: ${this.getBlackListHistoryRes.data.GetBlackListHistoryResult
                  .BlackListHistory[0]?.TotalRow || 0}`)
                return params.success({
                  rowData:
                    this.getBlackListHistoryRes.data.GetBlackListHistoryResult
                      .BlackListHistory,
                  rowCount:
                    this.getBlackListHistoryRes.data.GetBlackListHistoryResult
                      .BlackListHistory[0]?.TotalRow || 0
                })
              } else return params.fail()
            })
            .catch((ex) => {
              console.error(ex)
              this.serverError()
              return params.fail()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    mergeLocalFilters (filter, localFilters) {
      Object.entries(localFilters || {}).forEach(([field, value]) => {
        if (value || value === 0) {
          if (!filter.hasOwnProperty(field)) {
            filter[field] = { filterModels: [], filterType: "multi" }
          }
          switch (field) {
            case "NidWorkItem":
              filter[field].filterModels.push({
                filterType: "text",
                filter: value,
                values: null,
                type: "contains"
              })
              break
          }
        }
      })
      return filter
    }
  }
}
</script>
