<template>
  <fit>
    <safa-splitter v-model="spliterModel">
      <template v-slot:before>
        <safa-datatable
          :title="` تاریخچه فرم های درخواست ${request.NidWorkItem} `"
          v-model="forms"
          :columns="historyFormAndReport"
          cdcName="historyFormAndReport"
          fit
          m="r"
          height="100%"
          max-height="100%"
          min-height="200px"
          :addRow="false"
          :allowCopy="false"
          :allowMultipleSelection="false"
          :deleteRow="false"
          :show-selected-checkbox="false"
          :take="20"
          :pageSize="20"
          paginate
          @displayClick="showFormHandler"
        />
      </template>
      <template v-slot:after>
        <safa-datatable
          :title="` تاریخچه گزارشات درخواست ${request.NidWorkItem} `"
          v-model="reports"
          :columns="historyFormAndReport"
          cdcName="historyFormAndReport"
          fit
          m="r"
          height="100%"
          max-height="100%"
          min-height="200px"
          :addRow="false"
          :allowCopy="false"
          :allowMultipleSelection="false"
          :deleteRow="false"
          :show-selected-checkbox="false"
          :take="20"
          :pageSize="20"
          paginate
          @displayClick="showReportHandler"
        />
      </template>
    </safa-splitter>

    <safa-popup
      v-model="showModal"
      :title="selectedRow.Caption"
      height="700px"
      width="1200px"
    >
      <component
        :is="menuDropDownTarget"
        ref="comp"
        @load="formLoaded"
        :forceReadonly="true"
        :isSelectFromWorkflow="false"
        :isSelectFromMenu="false"
        :isSelectFromResponder="true"
        :taskInfo="request"
      />
    </safa-popup>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import { createPostRequest } from "src/kartable/services/baseService"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import {
  getAllTaskByNidProc,
  getTaskInfo
} from "../../responder-form/partials/services/task"

export default {
  name: "TabFormAndReport",
  mixins: [baseFormMixin],
  props: {
    request: Object,
    title: String,
    formKey: String,
    name: String
  },

  data () {
    return {
      selectedRow: { Caption: "" },
      spliterModel: 50,
      forms: [],
      reports: [],
      showModal: false,
      menuDropDownTarget: "",
      historyFormAndReport: [
        {
          field: "display",
          title: "نمایش",
          editor: "action",
          width: "80px"
        },
        {
          field: "Caption",
          title: "عنوان",
          width: "300px"
        },
        {
          field: "TaskClosedUserName",
          title: "آخرین کاربری که روی فرم کار کرده",
          width: "200px"
        },
        {
          field: "TaskStartDate",
          title: "تاریخ",
          editor: "date",
          width: "100px"
        },
        {
          field: "TaskStartTime",
          title: "ساعت",
          width: "100px"
        }
      ],
      allTaskByNidProcRes: null
    }
  },

  async mounted () {
    if (this.request) {
      this.onLoad()
    }
  },

  methods: {
    async onLoad () {
      try {
        this.showLoading()
        const { data } = await getAllTaskByNidProc({
          NidProc: this.request.NidProc
        })
        this.allTaskByNidProcRes = this.getResponse(data.data)

        if (
          this.allTaskByNidProcRes.success &&
          this.allTaskByNidProcRes.data.length > 0
        ) {
          this.allTaskByNidProcRes.data
            .reduce(
              async (acc, item) =>
                acc.then(async (val) => {
                  const { Forms, Reports } = await this.getTaskInfo(
                    item.NidTask
                  )
                  val.Forms.push(
                    ...Forms.map((e) => ({
                      ...e,
                      TaskClosedUserName: item.TaskClosedUserName,
                      TaskStartDate: item.TaskStartDate,
                      TaskStartTime: item.TaskStartTime
                    }))
                  )

                  val.Reports.push(
                    ...Reports.map((e) => ({
                      ...e,
                      TaskClosedUserName: item.TaskClosedUserName,
                      TaskStartDate: item.TaskStartDate,
                      TaskStartTime: item.TaskStartTime
                    }))
                  )

                  return Promise.resolve(val)
                }),
              Promise.resolve({
                Forms: [],
                Reports: []
              })
            )
            .then((result) => {
              debugger
              this.forms = result.Forms
              this.reports = result.Reports
              console.log(result)
            })
        }

        await this.log({
          action: this.logActions.view,
          bizCode: this.request.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.request.BizCode,
          nidWorkItem: this.request.NidWorkItem
        })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getTaskInfo (NidTask) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!NidTask) return reject(null)
          const { data } = await getTaskInfo({
            NidUser: this.getNidUser(),
            FullName: this.currentUser.FullName,
            NidTask
          })
          const result = this.getResponse(data.data)
          if (result.success) {
            const { Forms, Reports } = result.data || {}
            return resolve({
              Forms,
              Reports
            })
          } else {
            return reject()
          }
        } catch (ex) {
          return reject(ex)
        }
      })
    },

    showFormHandler (e) {
      this.selectedRow = e.dataItem
      if (e.dataItem.FormUrl) {
        this.menuDropDownTarget = e.dataItem.FormUrl
        this.showModal = true
        this.$nextTick(() => {
          if (this.$refs.comp) {
            this.$refs.comp.baseNosaziCode = convertStringToNosaziCodeObject(
              this.request.NosaziCode
            )

            const loadMethod =
              this.$refs.comp?.loadObj ??
              this.$refs.comp?.loadData ??
              this.$refs.comp?.load
            if (typeof loadMethod === "function") loadMethod()
          }
        })
      } else {
        this.showError("لطفا از فرم پاسخگو استفاده نمایید.")
      }
    },
    normalizeParams (array) {
      let result = {}
      for (let element of array) {
        let pair = element.split(";")
        let key = pair[0]
        let value = pair[1]
        if (value === "") {
          value = null
        }
        if (!isNaN(value)) {
          value = Number(value)
        }
        result[key] = value
      }
      return result
    },
    formLoaded () {
      console.log("form loaded.")
    },
    async showReportHandler (e) {
      debugger
      if (e.dataItem.Url) {
        const url = e.dataItem.Url
        const path = url.split("&ReportParameter=")[0].split("ReportPath=")[1]
        console.log("path :>> ", path)

        const tmpParams = url
          .split(".aspx?")[1]
          .split("ReportParameter=")[1]
          .split(",")
        const params = this.normalizeParams(tmpParams)

        console.log("params :>> ", params)

        const reportPath = path

        const queryParams = {
          NIdUser: this.getNidUser(),
          NidProc: this.request.NidProc,
          // RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
          District: this.request.District
          // TokenKey: "HTTP/1.1"
        }

        this.showReport(reportPath, queryParams)
        debugger
        await this.log({
          action: this.logActions.printReport,
          bizCode: this.request.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.request.BizCode,
          nidWorkItem: this.request.NidWorkItem
        })
      }
    }
  }
}
</script>
