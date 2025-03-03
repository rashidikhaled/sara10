<template>
  <fit>
    <safa-grid
      :title="gridTitle"
      v-model="allTaskByNidProc"
      :columns="allTaskByNidProcColumns"
      fit
      m="r"
      height="100%"
      max-height="100%"
      min-height="200px"
      paginate
      :masterDetail="true"
      :detailCellRendererParams="detailCellRendererParams"
    />

    <safa-popup
      v-model="showModal"
      :title="form.Caption"
      width="1000px"
      height="800px"
    >
      <component
        :is="form.Name"
        :isSelectFromResponder="true"
        :forceReadonly="true"
        :isSelectFromWorkflow="false"
        :showInHistoryForm="true"
        :isSelectFromMenu="false"
        :taskInfo="taskInfo"
      />
    </safa-popup>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import { appendUrls } from "src/utils"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  name: "TabActions",
  mixins: [baseFormMixin],
  props: {
    request: Object,
    title: String,
    formKey: String,
    name: String
  },

  data () {
    return {
      forms: [],
      reports: [],
      taskInfo: null,
      form: {
        Caption: ""
      },
      showModal: false,
      allTaskByNidProc: [],
      allTaskByNidProcColumns: [
        // {
        //   field: 'itemDetail',
        //   title: 'نمایش جزییات',
        //   width: '90px',
        //   editor: 'action'
        // },
        {
          field: "",
          title: "",
          width: "40px",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          cellRenderer: "agGroupCellRenderer"
        },
        {
          field: "TaskTitel",
          title: "نام فعالیت",
          width: "200px",
          lockPosition: true,
          pinned: "right"
        },
        { field: "CreatedByName", title: "درخواست کننده کار", width: "200px" },
        { field: "AssingToUserName", title: "ارجاع شده به", width: "200px" },
        { field: "TaskClosedUserName", title: "انجام دهنده", width: "200px" },
        {
          field: "TaskStartDate",
          title: "تاریخ شروع",
          editor: "date",
          width: "120px"
        },
        { field: "TaskStartTime", title: "ساعت شروع", width: "120px" },
        {
          field: "TaskCloseDate",
          title: "تاریخ پایان",
          editor: "date",
          width: "120px"
        },
        { field: "TaskCloseTime", title: "ساعت پایان", width: "auto" }
      ],
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
            {
              field: "itemDetail",
              title: "",
              btnIcon: "keyboard_arrow_left",
              width: "120px",
              lockPosition: true,
              pinned: "right",
              cellStyle: {
                padding: 0,
                margin: 0
              },
              btnTitle: "نمایش جزئیات",
              cellRenderer: "agCallbackBtn",
              callback: (params) => this.selectMasterDetailsItem(params)
            },
            { field: "Type", title: "نوع", width: "80px" },
            { field: "Caption", title: "عنوان فرم/گزارش", width: "auto" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: async (params) => {
          const res = await this.getTaskInfo(params.data.NidTask)
          setTimeout(async function () {
            await params.successCallback(res)
            // }
          }, 1000)
        }
      }
    }
  },

  mounted () {
    if (this.request) {
      this.getAllTaskByNidProc()
    }
  },

  methods: {
    async selectMasterDetailsItem (e) {
      debugger
      if (e.StrType === "Form") {
        this.selectForm(e)
      } else {
        this.selectReport(e)
      }
    },
    selectForm (params) {
      debugger
      if (!params.Name) return
      this.form = params
      this.showModal = true
      // this.$window.open({
      //   title: params.Caption,
      //   width: '1000px',
      //   height: '800px',
      //   component: params.Name,
      //   componentProps: {
      //     value: this.value,
      //     params: {
      //       ...params,
      //       forceReadonly: true
      //     },
      //     forceReadonly: true,
      //     ...this.$attrs
      //   }
      // })
    },
    async selectReport (report) {
      this.showLoading()
      try {
        const payload = this.buildReportPayload(report)
        // eslint-disable-next-line no-undef
        const { data } = await this.$services.report.setReportParameters(
          payload,
          {}
        )
        const sessionId = data.SetParametersResult
        if (sessionId) {
          // eslint-disable-next-line no-undef
          const url = `${window.getConfigValue(
            "systemReportViewer"
          )}?SessionId=${sessionId}`
          //  popup.moveTo(0, 0)
          const params = [
            "height=" + screen.availHeight - 10,
            "width=" + screen.availWidth - 10,
            "top=300, left=0",
            "fullscreen=no" // only works in IE, but here for completeness
          ].join(",")
          const popup = window.open(url, "_blank", params)
          popup.moveTo(0, 0)
          popup.onload = function () {
            console.log("load popup")
          }
        }
      } finally {
        this.hideLoading()
      }
    },
    buildReportPayload (report) {
      const sessionModel = {}
      const District =
        this.taskInfo && this.taskInfo.BizCode
          ? convertStringToNosaziCodeObject(this.taskInfo.BizCode).District
          : 1
      const NidUser = this.getNidUser()
      const paramsToReplace = {
        District,
        NidUser,
        ...this.taskInfo
      }
      sessionModel.reportPath =
        report.Url.split("&ReportParameter=")[0].split("ReportPath=")[1]
      let baseReqQuery = report.Url.split("&ReportParameter=")[1] // this.createReqQuery(report)
      // console.group('::report params::')
      // console.log('report params: ', baseReqQuery)
      for (const pKey in paramsToReplace) {
        // console.log(`replace "{${pKey}}" with "${paramsToReplace[pKey]}"`)
        baseReqQuery = baseReqQuery.replace(
          new RegExp(`{${pKey}}`, "gi"),
          paramsToReplace[pKey]
        )
      }
      // console.groupEnd()
      // console.log('baseReqQuery', baseReqQuery)
      sessionModel.parameters = baseReqQuery
      return { ...sessionModel }
    },
    async getTaskInfo (NidTask) {
      try {
        this.showLoading()
        const { data } = await this.$srvWorkflow.getTaskInfo({
          NidUser: this.getNidUser(),
          FullName: this.currentUser.FullName,
          NidTask
        })
        const res = data.data
        this.forms = res?.Forms ?? []
        this.reports = res?.Reports ?? []
        if (res.TaskInfo) {
          this.taskInfo = res.TaskInfo
        }
        const tmp = this.forms.concat(this.reports)
        const list = tmp.map((m) => {
          return {
            ...m,
            Type: m.StrType === "Form" ? "فرم" : "گزارش"
          }
        })
        return list
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getAllTaskByNidProc () {
      this.allTaskByNidProc = []
      this.showLoading()
      this.$srvWorkflow
        .getAllTaskByNidProc({
          NidProc: this.request.NidProc
          // "7f6cec18-2edd-46a9-b913-d48e3697c8d1"
        })
        .then(async ({ data }) => {
          this.allTaskByNidProc = data?.data ?? []
        })
        .catch((e) => {
          console.error(e, "getAllTaskByNidProc Error")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  computed: {
    gridTitle () {
      if (!this.request) return ""
      return " لیست اقدامات درخواست " + this.request.NidWorkItem
    }
  }
}
</script>
