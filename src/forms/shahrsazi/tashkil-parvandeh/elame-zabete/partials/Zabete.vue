<template>
  <fit>
    <safa-status :result="deleteZabetehRes" />
    <safa-status :result="createNewZabetehRes" />
    <safa-datatable
      v-model="results.ZabetehList"
      cdcName="ZabetehList"
      helper="zabete"
      m="r"
      @dbclick="dbclick"
      @row-click="click"
      fit
      :bordered="false"
      max-height="100%"
      height="100%"
      minHeight="100%"
      :hideHeader="false"
      @HistoryplanClick="historyplanClick"
      title="ضابطه"
    />
    <safa-popup
      vertical
      v-model="showHistory"
      title="تاریخچه ی چیدمان در طبقات"
      :padding="false"
    >
      <ZabeteHistory
        :formKey="formKey"
        :title="title"
        :name="name"
        :selectedRow="selectedRow"
        :baseNosaziCode="baseNosaziCode"
      />
    </safa-popup>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
import loaderMixin from "src/mixins/loaderMixin.js"
import ZabeteHistory from "./ZabeteHistory"

export default {
  mixins: [baseFormMixin, loaderMixin],
  components: { ZabeteHistory },
  data: function () {
    return {
      createNewZabetehRes: null,
      newResults: {},
      selectedRow: null,
      showDeleteBtn: false,
      deleteZabetehRes: null,
      deleteRows: {},
      showHistory: false,
      username: ""
    }
  },
  props: {
    results: Object,
    nidNosaziCode: String,
    formKey: String,
    title: String,
    name: String,
    baseNosaziCode: Object
  },
  methods: {
    createNewRecord () {
      if (this.selectedRequest === null) {
        this.showError("لطفا یک درخواست از کارتابل انتخاب نمایید.")
      } else {
        this.showLoading()
        const payload = {
          pNidNosaziCode: this.nidNosaziCode,
          pNidProc: this.selectedRequest.NidProc,
          pUser: { ...this.currentUser, UserName: this.getUserDisplayName() },
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          },
          pIsLoadDeletedNosaziCode: false
        }
        this.$services.SC.createNewZabeteh(payload, {
          config: { District: this.selectedDistrict }
        })
          .then(async ({ data }) => {
            this.createNewZabetehRes = this.getResponse(data)
            if (this.createNewZabetehRes.success) {
              this.newResults = this.createNewZabetehRes.data
              await this.log({
                action: this.logActions.save,
                bizCode: this.nidNosaziCode,
                bizCodeTitle: "nidNosaziCode",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `ایجاد ردیف محاسبه جدید در فرم اعلام ضابطه انجام گردید.`
              })
              this.$emit("reload")
            }
          })
          .catch((e) => {
            console.log(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    dbclick (event, dataItem, target) {
      this.selectedRow = event.row
      this.$emit("showZabeteDetailes", this.selectedRow)
    },
    click (row) {
      this.selectedRow = row
      this.username = row.UserName
      this.showDeleteBtn = true
      this.$emit("clickRow", this.selectedRow)
    },
    historyplanClick (e) {
      this.selectedRow = e.dataItem
      this.showHistory = true
    },
    deleteRecord () {
      this.showConfirm("آیا از حذف ردیف ضابطه اطمینان دارید؟").onOk(() => {
        this.deleteZabeteh()
      })
    },
    deleteZabeteh () {
      if (
        this.currentUser.FullName !==
        (this.convertToPersian(this.username) ||
          this.convertToArabic(this.username))
      )
      { return this.showError(
        "کاربر موردنظر با کاربر ایجاد کننده متفاوت است و امکان تغییر اطلاعات نیست"
      ) }
      const payload = {
        pNidZabeteh: this.selectedRow.NidZabeteh,
        pNidUser: this.getNidUser()
      }
      this.showLoading()
      this.$services.SC.deleteZabeteh(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.deleteZabetehRes = this.getResponse(data)
          if (this.deleteZabetehRes.success) {
            this.showError("حذف با موفقیت انجام شد")
            this.deleteRows = this.deleteZabetehRes.data
            this.showDeleteBtn = false
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedRow.NidZabeteh,
              bizCodeTitle: "NidZabeteh",
              // nosaziCode: this.selectedRequest.BizCode,
              // nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `حذف در فرم اعلام ضابطه انجام گردید.`
            })
            this.$emit("reload")
          }
        })
        .catch((e) => {
          console.log("e :>> ", e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    convertToPersian (str) {
      if (typeof str === "number") str = str.toString().trim()
      if (typeof str !== "string") return str
      return (
        str
          .replace(/ي/g, "ی")
          .replace(/ك/g, "ک")
          .replace(/ة/g, "ه")
          // .replace(/\u06A9/g, "\u0643") // ک
          // .replace(/\u06CC/g, "\u0649") // ی
          // .replace(/\u06CC/g, "\u064A") // ی
          .trim()
      )
    },
    convertToArabic (str) {
      if (typeof str === "number") str = str.toString().trim()
      if (typeof str !== "string") return str
      return (
        str
          .replace(/ی/g, "ي")
          .replace(/ک/g, "ك")
          // // .replace(/ه/g, 'ة')
          .replace(/\u0643/g, "\u06A9") // ک
          // .replace(/\u0649/g, '\u06CC') // ی
          // .replace(/\u064A/g, '\u06CC') // ی
          .trim()
      )
    }
  }
}
</script>
