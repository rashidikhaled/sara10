<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="fit"
      style="min-height: 300px"
    >
      <template v-slot:before>
        <fit>
          <safa-grid
            :masterDetail="true"
            :detailCellRendererParams="detailCellRendererParams"
            v-model="value.Eng_DutyFiche"
            @row:click="selectDutyFiche"
            :columns="engDutyFicheColumns"
            :getRowStyle="getRowStyle"
            m="r"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            show-selected-checkbox
            allowMultipleSelection
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="dutyFicheSubResult"
            helper="dutyFicheSubEng"
            m="r"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            show-selected-checkbox
            allowMultipleSelection
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: ["value", "formKey", "title"],

  data () {
    return {
      name: "Fish",
      splitterModel: 50,
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          columnDefs: [
            { field: "Subject", title: "عنوان" },
            { field: "Value", title: "مقدار" },
            { field: "Comment", title: "توضیحات" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(function () {
            params.successCallback(params.data)
          }, 1000)
        }
      },
      engDutyFicheColumns: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "100px",
          cellRenderer: "agGroupCellRenderer"
        },
        {
          field: "PayablePrice",
          title: "مبلغ قابل پرداخت",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "TotalPrice",
          title: "مبلغ کل عوارض",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "FromCI_Years",
          title: "از تاریخ",
          width: "150px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "ToCI_Years",
          title: "تا تاریخ",
          width: "150px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "ExportDate",
          title: "تاریخ صدور",
          width: "150px",
          editor: "date"
        },
        { field: "ExportTime", title: "زمان صدور", width: "100px" },
        {
          field: "UserNameExporter",
          title: "کاربر صادر کننده",
          width: "200px"
        },
        { field: "BillID", title: "شناسه قبض", width: "100px" },
        { field: "PaymentID", title: "شناسه پرداخت", width: "100px" },
        {
          field: "EumEngDutyFicheStatus",
          title: "وضعیت فیش",
          width: "100px",
          cellRenderer: (params) =>
            `<span>${this.getDutyFiche(params.value)}</span>`,
          editor: "combo",

          source: [
            { ID: 0, Title: "صدور" },
            { ID: 1, Title: "تایید" },
            { ID: 2, Title: "ابطال" },
            { ID: 3, Title: "چاپ" },
            { ID: 4, Title: "نامشخص" }
          ]
        },
        {
          field: "PaymentDate",
          title: "تاریخ پرداخت",
          width: "150px",
          editor: "date"
        },
        {
          field: "CI_EngDutyFicheExportType",
          title: "نوع صدور فیش",
          width: "100px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "EumEngDutyPaymentType",
          title: "نوع پرداخت فیش",
          width: "100px"
        },
        {
          field: "UserConfirmationDate",
          title: "تاریخ تایید",
          width: "100px",
          editor: "date"
        },
        { field: "UserConfirmationTime", title: "زمان تایید", width: "100px" },
        {
          field: "UserNameConfirmer",
          title: "کاربر تایید کننده",
          width: "200px"
        }
      ],
      dutyFicheSubResult: []
    }
  },
  methods: {
    getDutyFiche (id) {
      let source = [
        { ID: 0, Title: "صدور" },
        { ID: 1, Title: "تایید" },
        { ID: 2, Title: "ابطال" },
        { ID: 3, Title: "چاپ" },
        { ID: 4, Title: "نامشخص" }
      ]
      return (
        (source.find((x) => x.ID === id) &&
          source.find((x) => x.ID === id).Title) ||
        ""
      )
    },
    getRowStyle (params) {
      let row = params.data
      if (row.EumEngDutyFicheStatus === 2) return { background: "#f78484ad" }
      return { background: "transparent" }
    },
    selectDutyFiche (params) {
      let dutyFiche = params.data
      this.$emit("selectDutyFiche", dutyFiche)
      this.showLoading()
      let payload = { pNidDutyFiche: dutyFiche.NidDutyFiche }
      this.$services.eng
        .loadEngDutyFicheCalculateList(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.dutyFicheSubResult =
              res.data.LoadEng_DutyFicheCalculate_ListResult.Eng_DutyFicheCalculate_List
            await this.log({
              action: this.logActions.view,
              bizCode: dutyFiche.NidDutyFiche,
              bizCodeTitle: "NidDutyFiche"
            })
          }
        })
        .catch((response) => {
          console.error(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
    // selectedChange(e) {
    //   this.selectedRows = e.selectedItems;
    // },
  }
}
</script>

<style></style>
