<template>
  <form-wrapper :padding="false" :title="title" vertical>
    <safa-status :result="results" />
    <safa-status :result="dutyFicheSubResults" />
    <safa-status :result="getDutyFicheSubsRes" />

    <fit>
      <!-- helper="dutyFicheBuilding" -->
      <safa-grid
      v-model="fichesResults.DutyFiches"
       cdcName="DutyFiches"
        class="q-mb-sm"
           :columns="columns"
                 :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
              :detailCellRendererParams="detailCellRendererParams"
              :masterDetail="true"
              :allowSelectionWhenReadonlyMode="true"
              fit
              m="r"
              paginate
              :getRowClass="getRowClass"
              title="فیش ها"
              :suppressRowClickSelection="false"
              @selection:changed="selectedRowHandler"

              />

      </fit>
    <template v-slot:footer>
      <div class="row q-qutter-sm">
        <btn-default class="q-mr-sm" label="فیش صنف های حذف شده" @click="deletedFiches" />
        <btn-default label="چاپ گزارش مفاصا" @click="onMafasaReportPrintClick" />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'DutyFicheBuilding',
  mixins: [baseFormMixin],
  data: function () {
    return {
      results: { NidNosaziCode: [] },
      result: null,
      fichesResult: null,
      fichesResults: { DutyFiches: [] },
      selectedRow: null,
      selectedDutyFiche: null,
      getDutyFicheSubsRes: null,

      columns: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection',
          editable: true
        },
        {
          field: "FicheNo",
          title: "شماره فیش"
        },
        {
          field: "PayablePrice",
          title: "مبلغ قابل پرداخت",
          cell: "grid-money-format"
        },
        {
          field: "TotalPrice",
          title: "مبلغ کل عوارض",
          cell: "grid-money-format"
        },
        {
          field: "FromDate",
          title: "از تاریخ",
          editor: 'date'
        },
        {
          field: "ToDate",
          title: "تا تاریخ",
          editor: 'date'
        },
        {
          field: "ExportDate",
          title: "تاریخ صدور",
          editor: 'date'
        },
        {
          field: "ExportTime",
          title: "زمان صدور"
        },
        {
          field: "UserNameExporter",
          title: "کاربر صادر کننده"
        },
        {
          field: "PaymentBreakDate",
          title: "مهلت پرداخت",
          editor: 'date'
        },
        {
          field: "BillID",
          title: "شناسه ی قبض"
        },
        {
          field: "PaymentID",
          title: "شناسه ی پرداخت"
        },

        {
          field: "EumDutyFicheStatus",
          title: "وضعیت فیش",
          editor: "combo",
          source: [
            { ID: 0, Title: "صدور دائم" },
            { ID: 1, Title: "تایید" },
            { ID: 2, Title: "باطل" },
            { ID: 3, Title: "صدور موقت" },
            { ID: 4, Title: "تایید بانک" },
            { ID: 5, Title: "استرداد" }
          ]
        },
        {
          field: "CI_DutyFicheExportType",
          title: "نوع صدور فیش",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        {
          field: "PaymentDate",
          title: "تاریخ پرداخت",
          editor: 'date'
        },

        {
          field: "EumFicheConfirmMethode",
          title: "نوع پرداخت فیش",
          editor: "combo",
          source: [
            { ID: 1, Title: "نامشخص" },
            { ID: 2, Title: "ATM" },
            { ID: 3, Title: "شعبه" },
            { ID: 5, Title: "اينترانت" },
            { ID: 6, Title: "SMS" },
            { ID: 7, Title: "تلفن بانک" },
            { ID: 8, Title: "خود دريافت" },
            { ID: 9, Title: "بانک پرداخت" },
            { ID: 13, Title: "Web Kiosk" },
            { ID: 14, Title: "پوز" },
            { ID: 59, Title: "اينترنت" }
          ]
        },
        {
          field: "UserConfirmationDate",
          title: "تاریخ تأیید"
        },
        {
          field: "UserConfirmationTime",
          title: "زمان تأیید"
        },
        {
          field: "UserNameConfirmer",
          title: "کاربر تأیید کننده"
        },
        {
          field: "CanceledDate",
          title: "تاریخ ابطال",
          editor: 'date'
        },
        {
          field: "CanceledTime",
          title: "زمان ابطال"
        },
        {
          field: "UserNameCanceler",
          title: " کاربر ابطال کننده"
        },
        {
          field: "BankConfirmationDate",
          title: "تاریخ تأیید بانک",
          editor: 'date'
        },
        {
          field: "BankConfirmationTime",
          title: "زمان تأیید بانک"
        },
        {
          field: "UserNameBankConfirmer",
          title: "کاربر تأیید بانک"
        },
        {
          field: "BankConfirmPrice",
          title: "مبلغ تأیید بانک",
          cell: "grid-money-format"
        },
        { field: "", title: "شماره فیش بانکی" },
        {
          field: "ConfirmBankCode",
          title: "کد بانک تأیید شده"
        }
      ]

    }
  },
  props: {
    payOfHistory: Array,
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  mounted () {
    this.getNidNosaziCode()
  },
  methods: {
    getNidNosaziCode () {
      this.showLoading()
      debugger
      let self = this
      this.ownerName = ''
      let data = {
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: 0,
        pApartment: 0,
        pShop: this.baseNosaziCode.Shop,
        pDutyType: 1,
        pEumNosaziCodeGroup: 0,
        pEumBaseInfoGroup: 0,
        pIsHouseFiche: true
      }
      this.$services.SB.getNidNosaziCode(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          self.result = this.getResponse(data)

          if (this.result.success) {
            self.results = self.result.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.getDutyFiches()
          }
        })

        .catch(err => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDutyFiches () {
      this.showLoading()
      debugger
      let data = {
        pNidList: this.results.NidNosaziCode,
        pSysCiDutyType: 1,
        pUnLoadCancelFiches: false
      }
      console.log("getDutyFichesPayload:", data)

      this.$services.SB.getDutyFiches(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.results.NidNosaziCode,
              bizCodeTitle: 'NidNosaziCode'
            })
          }
        })

        .catch(err => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    selectedRowHandler (e) {
      this.selectedRow = null
      this.$nextTick(() => {
        const rows = e.api.getSelectedRows()
        if (rows.length > 0) {
          this.selectedRow = rows[0]
          this.loadDutyFicheSub()
        }
      })
    },

    async loadDutyFicheSub () {
      try {
        this.showLoading()
        const payload = { pNidFiche: this.selectedRow.NidFiche }
        const { data } = await this.$services.SB.getDutyFicheSubs(payload, {
          config: { District: this.baseNosaziCode.District }
        })
        this.getDutyFicheSubsRes = this.getResponse(data)
        if (this.getDutyFicheSubsRes.success) {
          this.getDutyFicheSubsResult = this.getDutyFicheSubsRes.data
          let dutyFicheSub = this.getDutyFicheSubsResult.DutyFicheSub
          if (dutyFicheSub && dutyFicheSub.length > 0) {
            this.nidFk = dutyFicheSub[0].NidFK
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRow.NidFiche,
            bizCodeTitle: "NidFiche"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    // rowClick (dataItem) {
    //   this.selectedRow = dataItem
    //   this.showLoading()
    //   let data = { pNidFiche: dataItem.NidFiche }
    //   this.$services.SB.getDutyFicheSubs(data, { config: { District: this.baseNosaziCode.District } })
    //     .then(async ({ data }) => {
    //       this.dutyFicheSubResult = this.getResponse(data)

    //       if (this.dutyFicheSubResult.success) {
    //         this.dutyFicheSubResults = this.dutyFicheSubResult.data
    //         await this.log({
    //           action: this.logActions.view,
    //           bizCode: dataItem.NidFiche,
    //           bizCodeTitle: 'NidFiche'
    //         })
    //       }
    //     })

    //     .catch(err => {
    //       console.error(err)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
    getRowClass (params) {
      let row = params.data
      // if (row.EumDutyFicheStatus === 0) return "bg-green-3"
      if (row.EumDutyFicheStatus === 1) return "bg-green-2"
      if (row.EumDutyFicheStatus === 2) return "bg-pink-2"
      if (row.EumDutyFicheStatus === 3) return "bg-grey-1"
      if (row.EumDutyFicheStatus === 4) return "bg-green-3"
      if (row.EumDutyFicheStatus === 5) return "bg-grey-3"
      return { background: "transparent" }
    },
    async onMafasaReportPrintClick () {
      if (this.selectedRow === null) {
        this.showError('هیچ فیشی انتخاب نشده است.')
      } else {
        const reportPath =
        "/Sara8Reports/RptMafasaHesab"

        const pd1 = '\x54\x6F\x6B\x65\x6E\x4B\x65\x79'

        const queryParams = {
          NidFK: this.dutyFicheSubResults.DutyFicheSub[0].NidFK,
          NidFiche: this.selectedRow.NidFiche,
          District: this.baseNosaziCode.District,
          [pd1]: "KeyA3301B7F8D95BB71FE477F9B14FECB10B629C12458",
          NIdUser: this.getNidUser()
        }
        this.showReport(reportPath, queryParams)
        await this.log({
          action: this.logActions.printReport,
          bizCode: this.selectedRow.NidFiche,
          bizCodeTitle: "NidFiche"
        })
      }
    },
    async deletedFiches () {
      debugger
      if (this.selectedRow === null) {
        this.showError('هیچ فیشی انتخاب نشده است.')
      } else {
        const reportPath =
        "/Sara8Reports/RptDeletedJobsFiche"
        const queryParams = {
          NidNosaziCodeHouse: this.results.NidNosaziCode[0],
          District: this.baseNosaziCode.District
        }
        this.showReport(reportPath, queryParams)
        await this.log({
          action: this.logActions.printReport,
          bizCode: this.results.NidNosaziCode[0],
          bizCodeTitle: "NidNosaziCodeHouse"
        })
      }
    }
  }
}
</script>
