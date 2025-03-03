<template>
  <form-wrapper :title="title">
    <safa-status :result="getOfficesRes" />
    <fit>
      <div class="q-mb-sm">
        <OfficeActoins
          v-model="officeCode"
          :disable="!officeCode"
          class="col-12"
        />
      </div>
      <!-- helper="officeList" -->
      <safa-grid
        :value="[]"
        cdcName="AllOffices"
        title="لیست دفاتر"
        :columns="officeListColumns"
        :allowMultipleSelection="false"
        m="r"
        paginate
        :pageSize="pageSize"
        :cacheBlockSize="pageSize"
        :suppressRowClickSelection="false"
        @row:dblclick="dbClick"
        @row:click="rowClick"
        fit
        @grid:ready="onGridReady"
        rowModelType="serverSide"
      />
    </fit>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { filterModelToSqlQuery } from "../kartable/utils/agQueryTools"

export default {
  mixins: [baseFormMixin],
  props: {},
  data () {
    return {
      name: "SearchOffices",
      formKey: "99d13844-b509-4da1-b1ce-84aec67bb6e8",
      title: "جستجوی دفتر",
      officeCode: null,
      isShowModal: false,
      gridApi: null,
      pageSize: 20,
      getOfficesRes: null
    }
  },
  computed: {
    officeListColumns () {
      return [
        {
          "field": "OfficeName",
          "title": "نام دفتر",
          "width": "200px"
        },
        {
          "field": "OfficeCode",
          "title": "کد دفتر",
          "width": "100px"
        },
        {
          "field": "RegisterDate",
          "title": "تاریخ ثبت",
          "editor": "date",
          "width": "100px"
        },
        {
          "field": "OfficePhone",
          "title": "شماره تلفن",
          "width": "120px"
        },
        {
          "field": "OfficeFax",
          "title": "نمابر",
          "width": "120px"
        },
        {
          "field": "OfficeAddress",
          "title": "آدرس دفتر",
          "width": "400px"
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

  methods: {
    rowClick (row) {
      this.officeCode = row.data.OfficeCode
    },
    dbClick (row) {
      this.$emit("selectedOffice", row.data)
    },
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
      this.setServerSideDatasource()
    },
    reload () {
      // this.gridApi.paginationGoToFirstPage()
      this.gridApi.refreshServerSide()
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

          const pRequest = {
            Skip: startRow,
            Take: endRow,
            PredicateCondition: Object.entries(tmpFilterModel).reduce(
              (acc, [field, filter]) =>
                acc +
                filterModelToSqlQuery(field, filter, {
                  queryBuilder: undefined,
                  normalize: ![].includes(field),
                  appendOperator: "And"
                }),
              ""
            )
          }
          this.$services.engineers.getOffices({ pRequest })
            .then(async ({ data }) => {
              this.getOfficesRes = this.getResponse(data)
              if (this.getOfficesRes.success) {
              // eslint-disable-next-line no-unused-vars
                const { AllOffices, Total } = this.getOfficesRes.data?.GetOfficesResult
                return params.success({
                  rowData: AllOffices ?? [],
                  rowCount: Total ?? 0
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
    getFilterValues (params) {
      try {
        const list = [
          ...new Set(this.getOfficesRes.data.GetOfficesResult.AllOffices.map((e) => e[params.column.colId]))
        ]
          .filter(Boolean)
          .map((str) => `${str}`.convertToPersian())

        return list
      } catch (ex) {
        return []
      }
    },
    mergeLocalFilters (filter, localFilters) {
      Object.entries(localFilters || {}).forEach(([field, value]) => {
        if (value || value === 0) {
          if (!filter.hasOwnProperty(field)) {
            filter[field] = { filterModels: [], filterType: "multi" }
          }
        }
      })
      return filter
    }
  }

}
</script>
