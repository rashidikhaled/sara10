<template>
  <safa-splitter v-model="splitterModel" horizontal margin="0">
    <template v-slot:before>
      <fit>
        <safa-grid
          v-model="licenseAsphaltCoatingRows"
          cdcName="LicenseAsphaltCoating"
          :columns="licenseAsphaltCoatingColumns"
          title="محاسبه خسارت روکش آسفالت"
          :suppressRowClickSelection="false"
          fit
          :pageSize="20"
          paginate
        />
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <safa-grid
          title="صدور فیش"
          v-model="incomeFichebyNidProcResult.IncomeFiches"
          :columns="incomeFicheColumns"
          cdcName="incomeFiche"
          :suppressRowClickSelection="false"
          :detailCellRendererParams="detailCellRendererParams"
          :masterDetail="true"
          :getRowClass="getRowClass"
          fit
          :pageSize="20"
          paginate
          @row:click="selectedIncomeFicheHandler"
          ref="Grd_Fiche"
        />
      </fit>
    </template>
  </safa-splitter>
</template>

<script>
export default {
  props: {
    incomeFichebyNidProcResult: {
      type: Object,
      default: () => {
        return { IncomeFiches: [] }
      }
    },
    value: Object,
    m: String
  },

  computed: {
    licenseAsphaltCoatingRows: {
      get () {
        const list = this.value?.ExportLicenseInfo?.License_AsphaltCoating ?? []
        if (Array.isArray(list) && list.length > 0) {
          const tmp = []
          list.forEach((item) => {
            let obj = {}
            for (let key in item) {
              obj[key] = item[key].Value
            }
            tmp.push(obj)
          })
          return tmp ?? []
        }
        return []
      }
    },
    licenseAsphaltCoatingColumns () {
      const list = this.value?.ExportLicenseInfo?.License_AsphaltCoating ?? []
      if (Array.isArray(list) && list.length > 0) {
        let cols = []
        for (let key in list[0]) {
          const title = list[0][key]?.Header ?? `${key}.Value`
          cols.push({
            field: key,
            title,
            width: `${title.length * 5 + 50}px`
          })
        }
        return cols
      }
      return []
    }
  },

  data () {
    return {
      splitterModel: 50,
      licenseAsphaltCoating: [],
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          // rowSelection: 'multiple',
          // suppressRowClickSelection: true,
          // enableRangeSelection: true,
          pagination: true,
          detailRowAutoHeight: true,
          detailRowHeight: 300,
          // paginationAutoPageSize: true,
          defaultColDef: {
            sortable: true,
            flex: 1
          },
          columnDefs: [
            { field: "Key", title: "عنوان", width: "200px" },
            { field: "Value", title: "مقدار", width: "200px" },
            { field: "Comment", title: "توضیحات", width: "auto" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: async (params) => {
          const list = params?.data?.ExportLicenseInfo ?? []
          await params.successCallback(list)
        }
      },
      incomeFicheColumns: [
        {
          field: "",
          title: "",
          width: "40px",
          filterable: false,
          resizable: false,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          cellRenderer: "agGroupCellRenderer"
        },
        { title: "شماره فیش", field: "FicheNo", width: "120px" },
        { title: "تاریخ فیش", field: "FicheDate", width: "120px" },
        { title: "تاریخ تایید", field: "ConfirmDate", width: "120px" },
        { title: "تاریخ ابطال", field: "CancelDate", width: "120px" },
        { title: "مبلغ فیش", field: "Price", width: "120px" },
        { title: "مبلغ قابل تقسیط", field: "InstallmentPrice", width: "120px" },
        { title: "شناسه پرداخت", field: "PaymentID", width: "120px" },
        { title: "شناسه قبض", field: "BillID", width: "120px" },
        { title: "مهلت پرداخت", field: "PaymentBreakDate", width: "120px" },
        { title: "نحوه تایید", field: "RequestStatus", width: "120px" },
        {
          title: "کاربر محاسبه کننده",
          field: "UserCalculated",
          width: "150px"
        },
        { title: "تاریخ محاسبه", field: "DateCalculated", width: "120px" },
        { title: "زمان محاسبه", field: "TimeCalculated", width: "120px" },
        { title: "مبلغ تخفیف", field: "Discount", width: "120px" },
        {
          title: "نوع تایید فیش",
          field: "CI_ConfrimFicheType",
          width: "170px",
          editor: "combo",
          domain: "Dig"
        },
        { title: "تاریخ پرداخت", field: "PaymentDate", width: "120px" },
        {
          title: "تاریخ پرداخت بانک",
          field: "BankPaymentDate",
          width: "120px"
        },
        {
          title: "کاربر تایید کننده",
          field: "UserNameConfirmer",
          width: "150px"
        },
        {
          title: "کد رهگیری پرداخت",
          field: "PaymentRahgiriCode",
          width: "150px"
        },
        {
          title: "شماره ارجاع پرداخت",
          field: "PaymentReferenceNo",
          width: "120px"
        },
        { title: "بدهکار", field: "Deptor", width: "120px" },
        { title: "بستانکار", field: "Creditor", width: "120px" },
        { title: "کاربر شرکت خدماتی", field: "UserName", width: "140px" },
        {
          title: "کاربر تایید کننده شهرداری",
          field: "UserNameShahrdari",
          width: "120px"
        },
        { title: "توضیحات", field: "Comments", width: "380px" },
        { title: "کسر هزار ریال", field: "Deduction", width: "120px" }
      ]
    }
  },

  methods: {
    getRowClass ({ data: row }) {
      if (!row) return
      if (row.ConfirmDate && row.ConfirmDate !== "") return "bg-green-2"
      if (row.CancelDate && row.CancelDate !== "") return "bg-pink-2"
      return { background: "transparent" }
    },
    selectedIncomeFicheHandler ({ data }) {
      this.$emit("selectedIncomeFicheHandler", data)
    }
  }
}
</script>
