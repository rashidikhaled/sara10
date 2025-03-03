<template>
  <FormWrapper :padding="false">
    <safa-status :result="loadObjRes" />
    <safa-status :result="confirmBuildingExecRepHistoryRes" />
    <safa-status :result="revokeBuildingExecRepHistoryRes" />
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
        @row:click="handleClickRow"
      />
    </fit>
    <template #footer v-if="selectedRow">
      <div class="q-gutter-sm">
        <btn-default label="تایید" @click="Confirm" />
        <btn-default label="ابطال" @click="Revoke" />
      </div>
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      loadObjRes: null,
      buildingExecRep_DetailRes: null,
      historyExecList: [],
      selectedRow: false,
      detailList: [],
      confirmBuildingExecRepHistoryRes: null,
      revokeBuildingExecRepHistoryRes: null,
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
            { field: "ExecRep", title: "عنوان گزارش", width: "130px" },
            { field: "ExecStatus", title: "خلاصه وضعیت", width: "130px" },
            { field: "DetailComments", title: "شرح", width: "130px" },
            { field: "BuildingExecDate", title: "تاریخ", width: "130px" },
            { field: "Comments", title: "متن", width: "auto" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: async (params) => {
          await this.getDetailList(params.data.NIdBuildingExecRep)
          setTimeout(() => {
            let logDetail = this.detailList.map((m) => {
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

  methods: {
    loadObj () {
      // eslint-disable-next-line camelcase
      const { NIdFil, NIdEng, CI_ExecFloor, CI_ExecLevel, NidWorkItem } = this.value
      const payload = {
        pNidFil: NIdFil ?? "",
        pNidEng: NIdEng ?? "",
        // eslint-disable-next-line camelcase
        pCI_ExecFloor: CI_ExecFloor ?? 100,
        // eslint-disable-next-line camelcase
        pCI_ExecLevel: CI_ExecLevel ?? 0
      }
      this.historyExecList = []
      this.showLoading()
      this.$services.engineers
        .getBuildingExecRepInfoHistoryList(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            const list = this.loadObjRes.data?.GetBuildingExecRep_Info_HistoryListResult?.BuildingExecRep_Info_HistoryList ?? []
            this.historyExecList = list.filter(f => f.NIdEng === NIdEng)
            await this.log({
              action: this.logActions.view,
              bizCode: NIdFil,
              bizCodeTitle: "NIdFil",
              nidWorkItem: NidWorkItem
            })
          }
        })
        .catch((e) => {
          console.error(e)
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
    },
    Confirm () {
      this.showLoading()
      const payload = {
        pNIdBuildingExecRep: this.selectedItem.NIdBuildingExecRep,
        pFloorNo: this.selectedItem.CI_ExecFloor,
        pNidUser_Accept: this.getNidUser(),
        pSecretariatNo: this.selectedItem.SecretariatNo,
        pSecretariatDate: this.selectedItem.SecretariatDate,
        pReportPath: "/Engineers/EngineerRpt/RptBuildingExecRep", // مشخص نیست
        pArchiveDomain_Engineer: "EngineersCertificate",
        pUserName: this.getUserDisplayName()
      }
      this.$services.engineers
        .confirmBuildingExecRepHistory(payload)
        .then(async ({ data }) => {
          this.confirmBuildingExecRepHistoryRes = this.getResponse(data)
          if (this.confirmBuildingExecRepHistoryRes.success) {
            this.showSuccess("تایید با موفقیت انجام شد")
            this.loadObj()
            this.log({
              action: this.logActions.confirm,
              bizCode: this.selectedItem?.NIdBuildingExecRep,
              bizCodeTitle: "NIdBuildingExecRep"
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
    Revoke () {
      this.showLoading()
      const payload = {
        pNIdBuildingExecRep: this.selectedItem.NIdBuildingExecRep,
        pNidUser_Revoke: this.getNidUser(),
        pSecretariatNo: this.selectedItem.SecretariatNo,
        pSecretariatDate: this.selectedItem.SecretariatDate,
        pArchiveDomain_Engineer: "EngineersCertificate",
        pReportPath: "/Engineers/EngineerRpt/RptBuildingExecRep"
      }
      this.$services.engineers
        .revokeBuildingExecRepHistory(payload)
        .then(async ({ data }) => {
          this.revokeBuildingExecRepHistoryRes = this.getResponse(data)
          if (this.revokeBuildingExecRepHistoryRes.success) {
            this.showSuccess("ابطال با موفقیت انجام شد")
            this.loadObj()
            this.log({
              action: this.logActions.delete,
              bizCode: this.selectedItem?.NIdBuildingExecRep,
              bizCodeTitle: "NIdBuildingExecRep"
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
    handleClickRow (e) {
      this.selectedRow = e.data
    }
  },

  watch: {
    value: {
      handler () {
        this.loadObj()
      },
      deep: true
    }
  },

  mounted () {
    if (this.value) this.loadObj()
  }
}
</script>
