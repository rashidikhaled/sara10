<template>
  <FormWrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            v-model="ciUnions"
            cdcName="ciUnions"
            ci-name="CI_Unions"
            domain-name="CI_SaraM1"
            label="اتحادیه"
            label-with="80px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="jobCode"
            cdcName="jobCode"
            label="کد شغل"
            label-with="80px"
            type="number"
            @keypress.enter="loadObj"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="jobName"
            cdcName="jobName"
            label="عنوان شغل"
            label-with="80px"
            @keypress.enter="loadObj"
          />
        </FormControl>
        <div>
          <btn-search label="جستجو" @click="loadObj" />
        </div>
      </FormRow>
      <safa-grid
        :title="title"
        v-model="jobNameDetails"
        cdcName="jobNameDetails"
        :columns="jobNameDetailsColumns"
        max-height="100%"
        height="100%"
        min-height="200px"
        m="r"
        paginate
        :pageSize="100"
        @grid:ready="onGridReady"
        rowModelType="serverSide"
        @row:click="handleSelectedChange"
      />
    </fit>
    <template #footer>
      <btn-default
        :disable="!selectedJobNameDetails"
        label="انتخاب"
        @click="handleOkButton"
      />
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      dialogState: false,
      result: null,
      jobCode: 0,
      jobName: "",
      ciUnions: 0,

      selectedJobNameDetails: null,
      jobNameDetails: [],
      jobNameDetailsColumns: [
        { field: "CI_JobName", title: "کد" },
        { field: "JobName", title: "عنوان" },
        { field: "Unions", title: "اتحادیه" },
        { field: "JobDegree", title: "درجه" },
        { field: "JobDisturbType", title: "نوع مزاحمت" },
        { field: "JobGarbage", title: "زباله شغلی" },
        { field: "JobDisturbStatus", title: "وضعیت مزاحمت شغلی" },
        { field: "JobRadehType", title: "رده شغلی" },
        { field: "TarefehRadif", title: "ردیف تعرفه" }
      ],

      gridApi: null,
      columnApi: null,

      isView: false
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", this.onServerFailCallback)
      this.loadObj()
    },
    onServerFailCallback (params) {
      console.error("onServerFailCallback", params)
    },
    loadObj () {
      this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          if (this.loading) return false
          this.loading = true
          try {
            const res = await this.$services.SC.getJobNameDetails({
              pFromRow: params.request.startRow, // this.fromRecords,
              pToRow: params.request.endRow, // this.toRecords,
              pJobCode: Number(this.jobCode) || 0,
              pJobName: this.jobName,
              pCI_Unions: this.ciUnions
            })
            if (!res.data) {
              params.success({
                rowData: [],
                rowCount: 0
              })
              // return
            }
            this.jobNameDetails = res?.data?.JobName_Details ?? []
            let totalRow =
              this.jobNameDetails.length > 0
                ? this.jobNameDetails[0].TotalCount
                : 0
            params.success({
              rowData: this.jobNameDetails,
              rowCount: totalRow
            })
            if (!this.isView) {
              //   await this.log({
              //     action: this.logActions.view,
              //     bizCode: this.selectedRequest.NidProc,
              //     bizCodeTitle: "NidProc",
              //     nosaziCode: this.selectedRequest.BizCode,
              //     nidWorkItem: this.selectedRequest.NidWorkItem,
              //     saveDesc: `بارگذاری لیست مشاغل برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
              //   })
            }
            this.isView = true
          } catch (e) {
            console.error(e)
            params.fail()
          } finally {
            this.loading = false
          }
        }
      })
    },

    handleSelectedChange ({ data }) {
      const { CI_JobName: ciJobName } = data || {}
      this.selectedJobNameDetails = this.jobNameDetails.filter(
        (x) => x.CI_JobName === ciJobName
      )[0]
    },

    handleOkButton () {
      if (this.selectedJobNameDetails) {
        this.$emit("hide")
        this.$emit("selected", this.selectedJobNameDetails)
      }
    }
  }
}
</script>
