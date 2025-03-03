<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="sendObjRes" />
      </template>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="منطقه"
            v-model="model.Region"
            cdcName="Region"
            source-type="local"
            :options="districts"
            label-width="105px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="از تاریخ پرداخت بانک"
            label-width="105px"
            v-model="model.FromDate"
            cdcName="FromDate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تا تاریخ پرداخت بانک"
            label-width="105px"
            v-model="model.ToDate"
            cdcName="ToDate"
          />
        </FormControl>
        <div class="q-gutter-sm">
          <btn-search label="جستجو" @click="loadObj" />
          <btn-delete label="پاک کردن" @click="resetObj" />
        </div>
      </FormRow>
      <safa-grid
        :title="title"
        :columns="columns"
        v-model="notSentList"
        cdcName="Accounting_DocNotSentList"
        :suppressRowClickSelection="false"
        :allowMultipleSelection="true"
        :filterable="false"
        fit
        @grid:ready="onGridReady"
      />
      <template v-slot:footer>
        <btn-default label="ارسال" @click="sendObj" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "فیش های ارسال نشده به سیستم مالی",
      formKey: "A715FED7-7A69-4838-BF02-22CB07E074F3",
      name: "UnsubscribeFinancialSystem",
      main: true,

      loadObjRes: null,
      sendObjRes: null,

      isView: false,
      gridApi: null,

      notSentList: [],
      model: {
        Region: 1,
        FromDate: null,
        ToDate: null
      },
      columns: [
        {
          field: "isSelectedNode",
          width: 41,
          checkboxSelection: true,
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection",
          showDisabledCheckboxes: true,
          resizable: false
        },
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "120px"
        },
        {
          field: "EumObjOnPrice",
          title: "نوع فیش",
          width: "100px",
          editor: "combo",
          ignoreCI: true,
          source: [
            { ID: 1, Title: "درآمد" },
            { ID: 2, Title: "نوسازی" },
            { ID: 3, Title: "صنفی" },
            { ID: 4, Title: "پسماند" },
            { ID: 5, Title: "اشغال معابر" },
            { ID: 6, Title: "کمیسیون 20" },
            { ID: 7, Title: "درآمدهای عمومی" }
          ]
        },
        {
          field: "EumAccountingDocumentingCause",
          title: "نوع سند",
          width: "120px",
          editor: "combo",
          ignoreCI: true,
          source: [
            { ID: 1, Title: "صدور" },
            { ID: 2, Title: "تأیید" },
            { ID: 3, Title: "چاپ" },
            { ID: 4, Title: " ابطال صدور" },
            { ID: 5, Title: "ابطال تایید" },
            { ID: 6, Title: "استرداد" },
            { ID: 7, Title: "چک" }
          ]
        },
        {
          field: "InsertDate",
          title: "تاریخ ارسال",
          width: "120px"
        },
        {
          field: "InsertTime",
          title: "زمان ارسال",
          width: "120px"
        },
        {
          field: "SendCount",
          title: "تعداد دفعات ارسال",
          width: "140px"
        },
        {
          field: "BillID ",
          title: "شناسه قبض ",
          width: "150px"
        },
        {
          field: "PaymentID",
          title: "شناسه پرداخت",
          width: "150px"
        },
        {
          field: "BankPaymentDate",
          title: "تاریخ پرداخت بانک",
          width: "140px"
        },
        {
          field: "PaymentDate ",
          title: "تاریخ پرداخت دستی",
          width: "140px"
        }
      ]
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },

    query () {
      const sql = []
      const obj = this.model
      if (obj.FromDate !== null && obj.FromDate !== "") {
        sql.push(`BankPaymentDate >= '${obj.FromDate}'`)
      }
      if (obj.ToDate !== null && obj.ToDate !== "") {
        sql.push(`BankPaymentDate <= '${obj.ToDate}'`)
      }
      if (!sql.length) {
        return ""
      }
      return " and " + (sql.length > 1 ? sql.join(" and ") : sql.toString())
    }
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SC.getAccountingDocNotSentList(
        { pWhereCondition: this.query },
        { config: { District: this.model.Region } }
      )
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            const res = this.loadObjRes.data?.Accounting_DocNotSentList ?? {
              Accounting_DocNotSentList: []
            }
            this.notSentList = res.map((m) => {
              return {
                ...m,
                isSelectedNode: false
              }
            })
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: "",
                bizCodeTitle: "",
                saveDesc: `بارگذاری اطلاعات  ${this.title} انجام گردید.`
              })
            }
            this.isView = true
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

    sendObj () {
      const selectedRows = this.gridApi.getSelectedRows() ?? []
      if (Array.isArray(selectedRows) && selectedRows.length > 0) {
        this.showLoading()
        const payload = {
          pAccounting_DocNotSentList: selectedRows,
          pUserCode: this.getNidUser()
        }
        this.$services.SC.resendFichesToFinanceSystem(payload, {
          config: { District: this.model.Region }
        })
          .then(async ({ data }) => {
            this.sendObjRes = this.getResponse(data)
            if (this.sendObjRes.success) {
              let fiches = selectedRows.map(m => m.FicheNo).toString()
              this.showSuccess(`ارسال فیش های ${fiches} به سیستم مالی ، با موفقیت انجام گردید.`)
              await this.log({
                action: this.logActions.send,
                bizCode: fiches,
                bizCodeTitle: "FichesNo",
                saveDesc: `ارسال فیش های ${fiches} به سیستم مالی انجام گردید.`
              })
              this.loadObj()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else this.showError("فیشی برای ارسال به سیستم مالی انتخاب نشده است. لطفا حداقل یک فیش انتخاب نمایید.")
    },

    onGridReady (params) {
      this.gridApi = params.api
    },
    resetObj () {
      this.model = {
        Region: 1,
        FromDate: "",
        ToDate: ""
      }
      this.loadObj()
    }
  },

  watch: {
    "model.Region" () {
      this.loadObj()
    }
  },

  mounted () {
    this.loadObj()
  }
}
</script>
