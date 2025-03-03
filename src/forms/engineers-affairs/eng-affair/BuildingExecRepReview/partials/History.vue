<template>
  <FormWrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="loadObjRes" />
      <safa-status :result="revokeBuildingExecRep_HistoryRes" />
      <safa-status :result="confirmBuildingExecRep_HistoryRes" />
    </template>
    <fit>
      <safa-grid
        v-model="historyExecList"
        cdcName="historyExecList"
        title="لیست سوابق"
        :columns="historyExecListColumns"
        m="r"
        fit
        paginate
        min-height="100px"
        height="100%"
        max-height="100%"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        :detailCellRendererParams="detailCellRendererParams"
        :masterDetail="true"
        :showRowNumber="true"
        :suppressRowClickSelection="false"
      />
    </fit>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    selectedItem: {
      type: Object,
      default: () => {}
    },
    name: String,
    formKey: String,
    title: String
  },

  data () {
    return {
      loadObjRes: null,
      buildingExecRep_DetailRes: null,
      historyExecList: [],
      detailList: [],
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
            { field: "ExecRep", title: "عنوان گزارش", width: "200px" },
            { field: "ExecLevel", title: "مرحله گزارش", width: "200px" },
            { field: "ExecStatus", title: "خلاصه وضعیت", width: "200px" },
            { field: "DetailComments", title: "شرح", width: "200px" },
            { field: "BuildingExecDate", title: "تاریخ", width: "200px" },
            { field: "Comments", title: "متن", width: "auto" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(async () => {
            if (params.data.NIdBuildingExecRep) {
              const list = await this.getDetailList(
                params.data.NIdBuildingExecRep
              )
              let logDetail = list.map((m) => {
                return {
                  ExecRep: m.ExecRep || "",
                  ExecLevel: m.ExecLevel || "",
                  ExecStatus: m.ExecStatus || "",
                  DetailComments: m.DetailComments || "",
                  BuildingExecDate: m.BuildingExecDate || "",
                  Comments: m.Comments || ""
                }
              })
              params.successCallback(logDetail)
            }
          }, 1000)
        }
      },
      historyExecListColumns: [
        {
          field: "",
          title: "",
          width: "40px",
          cellRenderer: "agGroupCellRenderer",
          filterable: false,
          lockPosition: true,
          pinned: "right"
        },
        {
          field: "SerialID",
          title: "کد پیگیری",
          width: "150px"
        },
        {
          field: "IsAcceptCaption",
          title: "وضعیت",
          width: "150px"
        },
        {
          field: "IdentityCode",
          title: "کد مهندس",
          width: "100px"
        },
        {
          field: "NidWorkItem",
          title: "کدارجاع",
          width: "100px"
        },
        {
          field: "BuildingExecDate",
          title: "تاریخ گزارش",
          width: "100px",
          editor: "date"
        },
        {
          field: "CI_ExecLevel",
          title: "عنوان گزارش",
          width: "200px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "CI_ExecFloor",
          title: "طبقه",
          width: "100px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "SecretariatDate",
          title: "تاریخ دبیرخانه",
          width: "120px",
          editor: "date"
        },
        {
          field: "SecretariatNo",
          title: "شماره دبیرخانه",
          width: "120px"
        },
        {
          field: "AcceptDate",
          title: "تاریخ تایید",
          width: "120px",
          editor: "date"
        },
        {
          field: "AcceptTime",
          title: "ساعت تایید",
          width: "120px"
        },
        {
          field: "RevokeDate",
          title: "تاریخ عدم تایید",
          width: "120px",
          editor: "date"
        },
        {
          field: "RevokeTime",
          title: "ساعت عدم تایید",
          width: "120px"
        }
      ]
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.historyExecList = []
      const tmp = this.selectedItem
      const payload = {
        pNidFil: tmp.NIdFil ?? "",
        pNidEng: tmp.NIdEng ?? "",
        pCI_ExecFloor: tmp.CI_ExecFloor ?? 100,
        pCI_ExecLevel: tmp.CI_ExecLevel ?? 0
      }
      this.$services.engineers
        .getBuildingExecRepInfoHistoryList(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.historyExecList =
              this.loadObjRes.data?.GetBuildingExecRep_Info_HistoryListResult
                ?.BuildingExecRep_Info_HistoryList ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: tmp.NIdFil,
              bizCodeTitle: "NIdFil",
              nidWorkItem: tmp.NidWorkItem
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async getDetailList (pNIdBuildingExecRep) {
      try {
        this.detailList = []
        this.showLoading()
        const { data } =
          await this.$services.engineers.getBuildingExecRepDetailHistoryList({
            pNIdBuildingExecRep
          })
        this.buildingExecRep_DetailRes = this.getResponse(data)
        if (this.buildingExecRep_DetailRes.success) {
          this.detailList =
            this.buildingExecRep_DetailRes.data
              ?.GetBuildingExecRep_Detail_HistoryListResult
              ?.BuildingExecRep_Detail_HistoryList ?? []
          await this.log({
            action: this.logActions.view,
            bizCode: pNIdBuildingExecRep,
            bizCodeTitle: "NIdBuildingExecRep"
          })
          return this.detailList
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
