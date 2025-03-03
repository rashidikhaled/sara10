<template>
  <safa-popup title="لیست مشاغل" v-model="dialogState" vertical>
    <form-wrapper>
      <safa-status :result="result" />
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              ci-name="CI_Unions"
              domain-name="CI_SaraM1"
              label="اتحادیه"
              use-input
              v-model="ciUnions"
              cdcName="ciUnions"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد شغل"
              v-model="jobCode"
              cdcName="jobCode"
              type="number"
            />
          </FormControl>
          <FormControl>
            <safa-text label="عنوان شغل" v-model="jobName" cdcName="jobName" />
          </FormControl>
          <div>
            <btn-default label="جستجو" @click="search" />
          </div>
        </FormRow>

          <safa-grid
            :columns="jobNameDetailsColumns"
            fit
            min-height="170px"
            max-height="100%"
            height="100%"
            v-model="tmpModel"
            rowModelType="serverSide"
            cdcName="responderGrid"
            :checkboxSelection="true"
            :filterable="true"
            :suppressRowClickSelection="false"
            :showRowNumber="true"
            ref="responderGrid"
            id="responderGrid"
            :bordered="true"
            :paginate="true"
            :pageSize="20"
            :cacheBlockSize="20"
            :cacheOverflowSize="2"
            :maxBlocksInCache="10"
            :maxConcurrentDatasourceRequests="1"
            :infiniteInitialRowCount="1000"
            :add-row="false"
            :allow-copy="false"
            :delete-row="false"
            @row:click="handleSelectedChange"
            @grid:ready="onGridReady"
          />
      </fit>
      <template v-slot:footer>
        <btn-default
          label="انتخاب"
          :disable="!selectedJobNameDetails"
          @click="handleOkButton"
          class="q-mr-sm"
        />
        <btn-default label="بستن" />
      </template>
    </form-wrapper>
  </safa-popup>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "JobSelectionDialog",

  mixins: [baseFormMixin],
  props: {
    show: Boolean,
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
    }
  },

  watch: {
    show () {
      this.dialogState = this.show
    },
    loading (val) {
      if (this.gridApi) {
        if (val) this.gridApi.showLoadingOverlay()
        else this.gridApi.hideOverlay()
      }
    }
  },

  data () {
    return {
      isSearchButtonClicked: false,
      dialogState: false,
      result: null,
      gridApi: null,
      tmpModel: [],
      loading: false,
      jobCode: 0,
      jobName: "",
      ciUnions: 0,

      totalRow: 0,
      currentPage: 1,

      selectedJobNameDetails: null,
      jobNameDetails: [],
      jobNameDetailsColumns: [
        {
          field: "RowId",
          title: "ردیف",
          width: "82px"
        },
        { field: "CI_JobName", title: "کد" },
        { field: "JobName", title: "عنوان" },
        { field: "Unions", title: "اتحادیه" },
        { field: "JobDegree", title: "درجه" },
        { field: "JobDisturbType", title: "نوع مزاحمت" },
        { field: "JobGarbage", title: "زباله شغلی" },
        { field: "JobDisturbStatus", title: "وضعیت مزاحمت شغلی" },
        { field: "JobRadehType", title: "رده شغلی" },
        { field: "TarefehRadif", title: "ردیف تعرفه" }
      ]
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.totalRow / this.$refs.jobNameDetailsRef.maxPage)
    },
    fromRecords () {
      return ((this.$refs.jobNameDetailsRef.currentPage - 1) * this.$refs.jobNameDetailsRef.maxPage) || 0
    },
    toRecords () {
      return (this.$refs.jobNameDetailsRef.currentPage * this.$refs.jobNameDetailsRef.maxPage) || 100
    }
  },
  methods: {
    async onGridReady (params) {
      this.gridApi = params.api
      await this.load()
    },
    handleSelectedChange ({ data: row }) {
      const { CI_JobName: ciJobName } = row || {}
      this.selectedJobNameDetails = this.jobNameDetails.filter(
        (x) => x.CI_JobName === ciJobName
      )[0]
    },
    handleOkButton () {
      if (this.selectedJobNameDetails) {
        this.dialogState = false
        this.$emit("selected", this.selectedJobNameDetails)
      }
    },
    async search () {
      this.isSearchButtonClicked = true
      await this.load()
      this.gridApi.refreshServerSide({
        purge: true
      })
    },
    async load () {
      const _this = this

      if (_this.loading) return false
      _this.loading = true
      if (!_this.isSearchButtonClicked) {
        _this.ciUnions = 0
      }
      if (!_this.dialogState) {
        return
      }
      _this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          try {
            _this.showLoading()
            // #region payload & config
            const payload = {
              pFromRow: params.request.startRow,
              pToRow: params.request.endRow,
              pJobCode: Number(_this.jobCode) || 0,
              pJobName: _this.jobName,
              pCI_Unions: _this.ciUnions
            }
            // #endregion
            const { data } = await _this.$services.SC.getJobNameDetails(
              payload

            )
            _this.result = _this.getResponse(data)
            if (_this.result.success) {
              _this.jobNameDetails = _this.result.data["JobName_Details"]
              _this.totalRow =
              Number((_this.jobNameDetails[0] || {})["TotalCount"]) || 1

              await _this.log({
                action: _this.logActions.view,
                bizCode: _this.jobName,
                bizCodeTitle: "jobName",
                saveDesc: `لیست مشاغل بارگذاری گردید.`
              })
            } else {
              _this.showError("لیست مشاغل بارگذاری نشد")
            }
            let gridData = _this.jobNameDetails.map((row, _i) => {
              return {
                ...row,
                RowId: ++_i
              }
            })
            // const rowsThisPage = gridData.slice(
            //   params.request.startRow,
            //   params.request.endRow
            // );
            // if on or after the last page, work out the last row.
            // let lastRow = -1;
            // if (gridData.length <= params.request.endRow) {
            //   lastRow = gridData.length;
            // }
            params.success({
              rowData: gridData,
              rowCount: gridData[0]?.TotalCount || 0
            })

            // params.success(rowsThisPage, lastRow)
          } catch (ex) {
            params.fail()
          } finally {
            _this.hideLoading()
            _this.loading = false
          }
        }
      })
    }
  }
}
</script>
