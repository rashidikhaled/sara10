<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <FormWrapper :title="title">
      <safa-status :result="loadObjRes" />
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره ارجاع"
              v-model="nidWorkItem"
              cdcName="nidWorkItem"
              required
              validations="required"
              @keypress.enter="loadObj"
            >
              <template v-slot:append>
                <q-icon
                  v-if="nidWorkItem"
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="nidWorkItem = ''"
                  color="primary"
                  name="clear"
                  class="cursor-pointer"
                />
              </template>
            </safa-text>
          </FormControl>
          <div class="q-gutter-x-sm">
            <btn-default label="جستجو" @click="loadObj" />
            <btn-default label="گزارش" @click="reportObj" />
          </div>
        </FormRow>
        <safa-grid
          v-model="historyList"
          cdcName="historyList"
          title="لیست سوابق"
          :columns="historyListColumns"
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
          @reportClick="reportHandler"
          @commentsClick="commentsHandler"
          @revokeReportClick="historyHandler"
        />
        <!-- :getRowClass="getRowClass" -->
      </fit>

      <safa-popup
        title="توضیحات گزارش"
        v-model="showCommentsModal"
        width="1000px"
        height="750px"
      >
        <Comment
          :selectedItem="selectedItem"
          :name="name"
          :formKey="formKey"
          title="توضیحات گزارش"
        />
      </safa-popup>
      <safa-popup
        title="سوابق گزارشات"
        v-model="showHistoryModal"
        width="1000px"
        height="750px"
      >
        <History
          :selectedItem="selectedItem"
          :name="name"
          :formKey="formKey"
          title="سوابق گزارشات"
        />
      </safa-popup>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Comment from "./partials/Comment.vue"
import History from "./partials/History.vue"
export default {
  mixins: [baseFormMixin],

  components: { Comment, History },

  data () {
    return {
      title: "سوابق گزارشات مرحله ای",
      formKey: "a8e6d093-6d69-4203-8ad4-eb5da7ff797d",
      name: "UBuildingExecRepReview",
      main: true,

      // #variables
      nidWorkItem: "",
      detailList: [],
      historyList: [],
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
            { field: "DetailComments", title: "متن", width: "auto" }
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
                  DetailComments: m.DetailComments || ""
                }
              })
              params.successCallback(logDetail)
            }
          }, 1000)
        }
      },
      historyListColumns: [
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
          field: "reportHandler",
          btnTitle: "گزارش",
          cellRenderer: "agCallbackBtn",
          width: "70px",
          callback: (params) => this.reportHandler(params),
          cellStyle: {
            padding: "0",
            border: "none !important",
            backgroundColor: "transparent !important"
          }
        },
        {
          field: "commentsHandler",
          btnTitle: "توضیحات",
          cellRenderer: "agCallbackBtn",
          width: "70px",
          callback: (params) => this.commentsHandler(params),
          cellStyle: {
            padding: "0",
            border: "none !important",
            backgroundColor: "transparent !important"
          }
        },
        {
          field: "historyHandler",
          btnTitle: "سوابق",
          cellRenderer: "agCallbackBtn",
          width: "70px",
          callback: (params) => this.historyHandler(params),
          cellStyle: {
            padding: "0",
            border: "none !important",
            backgroundColor: "transparent !important"
          }
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
      ],
      showRowDetail: false,
      showHistoryModal: false,
      showCommentsModal: false,
      selectedItem: null
    }
  },

  methods: {
    reportObj () {
      this.showError("گزارش مورد نظر تعریف نشده است")
    },
    loadObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = { pNidWorkItem: this.nidWorkItem }
      this.$services.engineers
        .getBuildingExecRepInfoMainListInNidWorkItem(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.historyList =
              this.loadObjRes.data
                ?.GetBuildingExecRep_Info_MainList_InNidWorkItemResult
                ?.BuildingExecRep_Info_MainList_InNidProc ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidWorkItem,
              bizCodeTitle: "nidWorkItem",
              nidWorkItem: this.nidWorkItem
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
          await this.$services.engineers.getBuildingExecRepDetailMainList({
            pNIdBuildingExecRep
          })
        this.buildingExecRep_DetailRes = this.getResponse(data)
        if (this.buildingExecRep_DetailRes.success) {
          this.detailList =
            this.buildingExecRep_DetailRes.data
              ?.GetBuildingExecRep_DetailMainListResult
              ?.BuildingExecRep_DetailMainList ?? []
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

    async reportHandler (params) {
      const reportPath =
        "/sara8Reports/RptRevisitHouse"
      const queryParams = {
        NidProc: params.NidProc,
        District: params.District,
        CodeString: params.CodeString,
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: params.NidProc,
        bizCodeTitle: "NidProc"
      })
    },
    commentsHandler (params) {
      this.selectedItem = params
      this.showCommentsModal = true
    },
    historyHandler (params) {
      this.selectedItem = params
      this.showHistoryModal = true
    }
    // getRowClass (params) {
    //   let row = params.data
    //   // if (row.IsAcceptCaption === 0) return "bg-green-3"
    //   if (row.IsAcceptCaption === 1) return "bg-green-2"
    //   if (row.IsAcceptCaption === 2) return "bg-pink-2"
    //   if (row.IsAcceptCaption === 3) return "bg-grey-1"
    //   if (row.IsAcceptCaption === 4) return "bg-green-3"
    //   if (row.IsAcceptCaption === 5) return "bg-grey-3"

    //   return { background: "transparent" }
    // }
  }
}
</script>
