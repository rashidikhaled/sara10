<template>
  <safa-form :id="formKey" :caption="title" app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b">
    <form-wrapper :title="title" vertical>
      <fit>
        <template #header>
          <safa-status :result="result" />
          <safa-status :result="sendResult" />
        </template>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo label="نوع فیش" :options="ficheOptions" cdcName="Fiche" v-model="model.EumObjOnPrice"
              source-type="local" class="q-pb-sm" />
          </FormControl>
          <FormControl>
            <safa-text label="شماره فیش" label-width="80px" v-model="model.FicheNo" cdcName="fichNo" class="col-12" />
          </FormControl>
          <FormControl>
            <safa-text label="شناسه قبض" label-width="80px" v-model="model.BillID" cdcName="billID" class="col-12" />
          </FormControl>
          <FormControl>
            <safa-text label="شناسه پرداخت" label-width="80px" v-model="model.PaymentID" cdcName="fichNo"
              class="col-12" />
          </FormControl>
          <FormControl>
            <safa-combo label="منطقه" :options="districts" cdcName="Region" v-model="selectedRegion" source-type="local"
              class="q-pb-sm" />
          </FormControl>
          <FormControl>
            <safa-datepicker v-model="model.FromConvertDate" cdcName="FromConvertDate" label="از تاریخ"
              label-width="82px" />
          </FormControl>
          <FormControl>
            <safa-datepicker v-model="model.ToConvertDate" cdcName="ToConvertDate" label="تا تاریخ"
              label-width="82px" />
          </FormControl>
          <div>
            <btn-search label="جستجو" class="q-mr-sm" @click="load" />
            <btn-delete label="پاک کردن" @click="reset" />
          </div>
        </FormRow>

        <!-- helper="unsubscribeFinancialSystem" -->
        <safa-grid :columns="columns" v-model="results.Accounting_DocNotSentList" cdcName="Accounting_DocNotSentList"
          :suppressRowClickSelection="false" :allowMultipleSelection="false" :filterable="true" height="100%"
          max-height="100%" min-height="100%" margin="0" fit title="فیش های ارسال نشده به سیستم مالی"
          @grid:ready="onGridReady" />
      </fit>
      <template v-slot:footer>
        <btn-default label="ارسال" @click="send" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
const defaultModel = {
  FromConvertDate: null,
  ToConvertDate: null,
  FicheNo: null,
  PaymentID: null,
  BillID: null,
  EumObjOnPrice: null
}
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'واسط های مالی',
      formKey: 'EA8A2707-7F7E-4B42-9277-AAEE84F3B3FE',
      name: 'FinancialIntermediaries',
      main: true,
      isView: false,
      true: true,
      gridApi: null,
      ficheOptions: [
        {
          ID: 1,
          Title: "درآمد"
        },
        {
          ID: 2,
          Title: "نوسازی"
        },
        {
          ID: 3,
          Title: "صنفی"
        },
        {
          ID: 4,
          Title: "پسماند"
        },
        {
          ID: 5,
          Title: 'اشغال معابر'
        },
        {
          ID: 6,
          Title: 'کمیسیون 20'
        },
        {
          ID: 7,
          Title: 'درآمدهای عمومی'
        }
      ],
      regionList: [
        { ID: 0, Title: '1' },
        { ID: 1, Title: '2' },
        { ID: 2, Title: '3' },
        { ID: 3, Title: '4' },
        { ID: 4, Title: '5' },
        { ID: 5, Title: '6' }
      ],
      selectedRegion: 1,
      selectedFiche: null,
      results: { Accounting_DocNotSentList: [] },
      result: null,
      sendResult: null,
      sendResults: {},
      selectedRow: {},
      model: {
        ...defaultModel
      },
      columns: [
        {
          field: "isSelected",
          width: 41,
          headerCheckboxSelection: false,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false,
          resizable: false
        },
        {
          "field": "FicheNo",
          "title": "شماره فیش",
          "width": "100px"
        },
        {
          "field": "EumObjOnPrice",
          "title": "نوع فیش",
          "width": "100px",
          editor: "combo",
          ignoreCI: true,
          source: [
            {
              ID: 1,
              Title: "درآمد"
            },
            {
              ID: 2,
              Title: "نوسازی"
            },
            {
              ID: 3,
              Title: "صنفی"
            },
            {
              ID: 4,
              Title: "پسماند"
            },
            {
              ID: 5,
              Title: 'اشغال معابر'
            },
            {
              ID: 6,
              Title: 'کمیسیون 20'
            },
            {
              ID: 7,
              Title: 'درآمدهای عمومی'
            }
          ]
        },
        {
          "field": "EumAccountingDocumentingCause",
          "title": "نوع سند",
          "width": "100px",
          editor: "combo",
          ignoreCI: true,
          source: [
            {
              ID: 1,
              Title: "صدور"
            },
            {
              ID: 2,
              Title: "تأیید"
            },
            {
              ID: 3,
              Title: "چاپ"
            },
            {
              ID: 4,
              Title: " ابطال صدور"
            },
            {
              ID: 5,
              Title: "ابطال تایید"
            },
            {
              ID: 6,
              Title: "استرداد"
            },
            {
              ID: 7,
              Title: "چک"
            }
          ]

        },
        {
          "field": "InsertDate",
          "title": "تاریخ ارسال",
          "width": "120px"
        },
        {
          "field": "InsertTime",
          "title": "زمان ارسال",
          "width": "120px"
        },
        {
          "field": "SendCount",
          "title": "تعداد دفعات ارسال",
          "width": "140px"
        },
        {
          "field": "BillID ",
          "title": "شناسه قبض ",
          "width": "120px"
        },
        {
          "field": "PaymentID",
          "title": "شناسه پرداخت",
          "width": "120px"
        },
        {
          "field": "BankPaymentDate",
          "title": "تاریخ پرداخت بانک",
          "width": "120px"
        },
        {
          "field": "PaymentDate ",
          "title": "تاریخ پرداخت دستی",
          "width": "120px"
        }

      ]
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    },
    query () {
      const sql = [];
      ["FicheNo",
        "PaymentID",
        "BillID",
        "EumObjOnPrice"
      ]
        .filter(field => this.model[field] !== null)
        .forEach(field => {
          sql.push(`(${field} ='${this.model[field]}')`)
        })
      // Dates fields
      if (
        this.model.FromConvertDate != null && this.model.FromConvertDate !== ""
      ) {
        sql.push(`(InsertDate >= N'${this.model.FromConvertDate}')`)
      }
      if (this.model.ToConvertDate != null && this.model.ToConvertDate !== "") {
        sql.push(`(InsertDate <= N'${this.model.ToConvertDate}')`)
      }
      if (!sql.length) {
        return ""
      }
      // sql.push("**")
      return " And " + (sql.length > 1 ? sql.join(" AND ") : sql.toString())
    }
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
    },
    reset () {
      this.model = { ...defaultModel }
    },
    load () {
      this.showLoading()
      debugger
      console.log("this.query", this.query)
      let data = { pWhereCondition: this.query }
      this.$services.SC.getAccountingDocNotSentList(data, {
        config: { District: this.selectedRegion }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            // let data = { pWhereCondition: '' }
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: '',
                bizCodeTitle: ''
              })
            }
            this.isView = true
            this.results = this.result.data
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    send () {
      debugger
      const selectedRow = this.gridApi.getSelectedRows()?.[0] || null
      console.log("@@@@:", selectedRow)
      if (selectedRow) {
        this.showLoading()
        let data = {
          pAccounting_DocNotSentList: selectedRow,
          pUserCode: this.getNidUser()
        }
        this.$services.SC.resendFichesToFinanceSystem(data, {
          config: { District: this.selectedRegion }
        })
          .then(async ({ data }) => {
            this.sendResult = this.getResponse(data)

            if (this.sendResult.success) {
              await this.log({
                action: this.logActions.send,
                bizCode: selectedRow.FicheNo.toString(),
                bizCodeTitle: 'FicheNo'
              })
              this.showSuccess('با موفقیت انجام شد')
              this.sendResults = this.sendResult.data
              this.load()
            }
          })
          .catch(response => {
            this.sendResult = this.getResponse(response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError('حداقل یک ردیف از جدول انتخاب نمایید!')
      }
    }
  },
  // mounted () {
  //   this.load()
  // },
  watch: {
    selectedRegion () {
      this.load()
    }
  }
}
</script>
