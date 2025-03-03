<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="fit"
      style=" min-height:300px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Eng_DutyFiche"
            @row-click="selectDutyFiche"
            :columns="engDutyFicheColumns"
            m="r"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            show-selected-checkbox
            allowMultipleSelection
            @selectedChange="selectedChange"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="dutyFicheSubResult"
            :columns="dutyFicheSubColumns"
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
      engDutyFicheColumns: [
        { field: "FicheNo", title: "شماره فیش", width: "100px" },
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
        { field: "EumEngDutyFicheStatus", title: "وضعیت فیش", width: "100px" },
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
      dutyFicheSubColumns: [
        {
          field: "CI_Years",
          title: "سال",
          width: "100px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "CurrentDebtValue",
          title: "بدهی فعلی",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "PeriorDebtValue",
          title: "بدهی قبلی",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "CalculateDate",
          title: "تاریخ محاسبه",
          width: "150px",
          editor: "date"
        },
        { field: "CalculateTime", title: "زمان محاسبه", width: "100px" },
        {
          field: "UserNameCalculator",
          title: "کاربر محاسبه کننده",
          width: "200px"
        },
        { field: "", title: "وضعیت فیش", width: "100px" }
      ],
      dutyFicheSubResult: []
    }
  },
  methods: {
    selectDutyFiche (dutyFiche) {
      this.$emit('selectDutyFiche', dutyFiche)
      this.showLoading()
      let payload = { pNidDutyFiche: dutyFiche.NidDutyFiche }
      this.$services.engineers
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
    },
    selectedChange (e) {
      this.selectedRows = e.selectedItems
    }
  }
}
</script>

<style></style>
