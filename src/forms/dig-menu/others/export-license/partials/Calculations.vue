<template>
  <fit>
    <FormRow>
      <FormControl class="q-mb-sm">
        <safa-datepicker
          label="تاریخ"
          v-model="value.ClsExportLicense.ExportLicenseDate"
          label-width="60px"
          cdcName="ExportLicenseDate"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره"
          v-model="value.ClsExportLicense.ExportLicenseNo"
          label-width="60px"
          cdcName="ExportLicenseNo"
          m="r"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="splitterHorizontalModel" horizontal>
      <template v-slot:before>
        <fit>
          <safa-grid
            title="محاسبه خسارت روکش آسفالت"
            v-model="licenseAsphaltCoating"
            :columns="licenseAsphaltCoatingColumns"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="License_AsphaltCoating"
            m="r"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="صدور فیش"
            v-model="incomeFichebyNidProcResult.IncomeFiches"
            :columns="incomeFicheColumns"
            :detailCellRendererParams="detailCellRendererParams"
            :masterDetail="true"
            :suppressRowClickSelection="false"
            :getRowClass="getRowClass"
            fit
            paginate
            cdcName="Income_Fiche"
            m="r"
            />
        </fit>
      </template>
    </safa-splitter>
  </fit>
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
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      splitterHorizontalModel: 50,
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          pagination: true,
          detailRowAutoHeight: true,
          detailRowHeight: 300,
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
        {
          field: "FicheNo",
          title: "شماره فیش"
        },
        {
          field: "FicheDate",
          title: "تاریخ فیش"
        },
        {
          field: "ConfirmDate",
          title: "تاریخ تایید"
        },
        {
          field: "CancelDate",
          title: "تاریخ ابطال"
        },
        {
          field: "RequestStatus",
          title: "نحوه تایید"
        },
        {
          field: "Price",
          title: "مبلغ فیش"
        },
        {
          field: "PaymentID",
          title: "شناسه پرداخت"
        },
        {
          field: "BillID",
          title: "شناسه قبض"
        },
        {
          field: "UserName",
          title: "کاربر"
        },
        {
          field: "UserNameShahrdari",
          title: "کاربر تایید کننده شهرداری"
        },
        {
          field: "Deduction",
          title: "کسر هزار ریال"
        }
      ]
    }
  },
  computed: {
    licenseAsphaltCoating: {
      get () {
        const list =
        this.value?.ClsLicense?.ExportLicenseInfo?.License_AsphaltCoating ?? []
        if (Array.isArray(list) && list.length > 0) {
          const tmp = []
          list.forEach((item) => {
            let obj = {}
            for (let key in item) {
              obj[key] = item[key].Value
            }
            tmp.push(obj)
          })
          return tmp
        }
        return []
      },
      set () {
      }

    },
    licenseAsphaltCoatingColumns: {
      get () {
        const list =
        this.value?.ClsLicense?.ExportLicenseInfo?.License_AsphaltCoating ?? []
        if (Array.isArray(list) && list.length > 0) {
          let cols = []
          for (let key in list[0]) {
            const title = list[0][key].Header ?? `${key}.Value`
            cols.push({
              field: key,
              title,
              width: `${title.length * 5 + 50}px`
            })
          }
          return cols
        }
        return []
      },
      set () {
      }

    }
  },
  methods: {
    getRowClass ({ data: row }) {
      if (!row) return
      if (row.ConfirmDate && row.ConfirmDate !== "") return "bg-green-2"
      if (row.CancelDate && row.CancelDate !== "") return "bg-pink-2"
      return { background: "transparent" }
    }
  }
}
</script>
