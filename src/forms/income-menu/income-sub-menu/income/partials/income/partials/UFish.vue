<template>
  <fit>
    <safa-status :result="getIncomeFicheSubRes" />
    <safa-status :result="doAllProcessToPrintRes" />
    <safa-status :result="cancelPermanentExportRes" />
    <safa-status :result="temporaryExportFicheRes" />
    <safa-status :result="permanentExportRes" />
    <safa-status :result="ficheRefundRes" />
    <safa-status :result="ficheConfirmOnDemandCityBankRes" />
    <safa-status :result="ficheConfirmOnDemandCityBank2Res" />
    <safa-status :result="changeFicheStatusFromConfirmToPrintRes" />
    <safa-status :result="ficheRevokeRes" />
    <safa-status :result="changeFicheStatusFromRevokeRes" />
    <safa-status :result="fichePrintRes" />
    <safa-status :result="transferFicheRes" />
    <safa-status :result="getAllFicheRes" />

    <div class="q-ma-sm">
      <button-group height="30px">
        <btn-default
          label="صدور موقتی فیش"
          @click="temporaryExportFiche"
          spId="fce64400-fd51-4859-84ca-4521dfd54cf8"
          spCaption="صدور موقتی فیش"
        />
        <btn-default label="تاریخچه وضعیت فیش" @click="showHistoryFiche" />
        <btn-default
          label="تأیید لحظه ای بانک شهر"
          @click="tempConfirmBankShahr"
          spId="8464cdd4-d728-423d-89ba-8b1dd01c38dd"
          spCaption="تایید لحظه ای بانک شهر"
        />
        <btn-default
          label="تأیید لحظه ای بانک  شهر 2"
          @click="tempConfirmBankShahr2"
          spId="6ceb70a1-ea47-4981-8ef1-e9b5d42b605b"
          spCaption="تایید لحظه ای بانک شهر 2"
        />
        <btn-default
          label="تأیید لحظه ای بانک"
          @click="isShowTempConfirmBankModal = true"
          spId="b41e9f4f-48be-4d89-9f73-567b88d184de"
          spCaption="تایید لحظه ای بانک"
        />
        <btn-default label="تاریخچه ی پوز" @click="handelShowPoseHistory" />
        <btn-default label="گزارش تقسیط" @click="installmentReport" />
        <btn-default label="توضیحات" @click="isShowCemmentModal = true" />
        <btn-default label="انتقال به حساب درآمدی" @click="transfer" />
        <btn-default
          label="برگشت از ابطال"
          @click="changeStatusFromRevoke"
          spId="7f9b945b-6237-4ac8-a693-48d1f730479b"
          spCaption="برگشت از ابطال"
        />
        <!-- spId="7f9b945b-6237-4ac8-a693-48d1f730479b"
          spCaption="برگشت از ابطال" -->
        <btn-default
          label="قطعیت صدور فیش"
          @click="finalityExportFiche"
          spId="aaa04986-6162-416a-895d-2de57ee4db78"
          spCaption="قطعیت صدور فیش"
        />
        <btn-default
          label="صدور فیش"
          @click="exportFiche"
          spId="853e02a5-3cb5-4564-bbb5-aa0c1da90d0d"
          spCaption="صدور فیش"
        />
        <btn-default
          label="چاپ فیش پرفراژ"
          spId="1519c8ce-75ef-43a0-bdd0-dfc9040e2440"
          spCaption="چاپ فیش پراژ"
          :disable="!lockParaphrase"
          @click="paraphraseHandler"
        />
        <btn-default
          label="چاپ فیش"
          @click="printFiche"
          spId="c607ab29-0973-444c-9084-6ea1c46ebe92"
          spCaption="چاپ فیش"
        />

        <btn-default label="تأیید فیش" @click="handelShowConfirmFish" />
        <btn-default
          label="تأیید با Pose"
          @click="confirmWithPose"
          spId="6cdc3ea4-d1a3-4999-b0c8-1f258fc5c6e2"
          spCaption="تایید با Pose"
        />
        <btn-default
          label="ابطال فیش"
          @click="revokeFiche"
          spId="7849b2eb-ea80-4005-a26d-7381c0d18e97"
          spCaption="ابطال فیش"
          :disable="lockRevokeconfiche"
        />
        <btn-default
          label="ابطال تأیید"
          @click="revokeConfirm"
          spId="3509d477-3073-4430-bf41-40feeb79171f"
          spCaption="ابطال تایید"
        />
        <btn-default
          label="تقسیط"
          @click="installmentMethod"
          spId="5edee0e1-998e-4834-9891-9a9b05d901d8"
          spCaption="تقسیط"
        />
        <btn-default
          label="عدم قطعیت"
          @click="cancelPermanentExport"
          spId="cfef8a28-df02-4120-9aee-edb8de416644"
          spCaption="عدم قطعییت"
        />
        <btn-default
          label="استرداد"
          @click="refundFiche"
          :disable="!isShowRefundFicheBtn"
          spId="f9102a5b-372f-4ee1-a75d-e8f139f891ac"
          spCaption="استرداد"
        />
      </button-group>
    </div>
    <safa-splitter class="fit" margin="0" v-model="splitterValue" vertical>
      <template v-slot:before>
        <fit>
          <safa-grid
            v-model="fiches"
            title="لیست تمام فیش ها"
            cdcName="allFiches"
            :columns="columns"
            fit
            height="100%"
            max-height="100%"
            :addRow="false"
            :allowCopy="false"
            :deleteRow="false"
            :detailCellRendererParams="detailCellRendererParams"
            :masterDetail="true"
            :allowMultipleSelection="false"
            :suppressRowClickSelection="false"
            :getRowClass="getRowClass"
            @row:click="selectedFiche"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="جزئیات فیش ها"
            v-model="incomeFicheSub"
            cdcName="incomeFicheSub"
            helper="fichDetail"
          />
        </fit>
      </template>
    </safa-splitter>

    <safa-popup
      @hide="isShowModalFicheStatusHistory = false"
      @onCloseModal="isShowModalFicheStatusHistory = false"
      title="تاریخچه ی وضعیت فیش"
      v-model="isShowModalFicheStatusHistory"
    >
      <FicheStatusHistory
        :selectedRow="selectedRow"
        :formKey="formKey"
        :name="name"
        :title="title"
        :config="config"
      />
    </safa-popup>

    <safa-popup
      @hide="isShowTempConfirmBankModal = false"
      @onCloseModal="isShowTempConfirmBankModal = false"
      title="انتخاب بانک"
      v-model="isShowTempConfirmBankModal"
      width="400px"
      height="300px"
    >
      <TempConfirmBank
        :formKey="formKey"
        :name="name"
        :selectedRow="selectedRow"
        :title="title"
        @exitTempConfirmBank="exitTempConfirmBank"
        :config="config"
      />
    </safa-popup>

    <safa-popup
      @hide="isShowPoseHistoryModal = false"
      @onCloseModal="isShowPoseHistoryModal = false"
      title="تاریخچه پرداخت با پوز"
      v-model="isShowPoseHistoryModal"
    >
      <PosePaymentHistory
        :selectedRow="selectedRow"
        :formKey="formKey"
        :name="name"
        :title="title"
        :config="config"
        @exitTempConfirmBank="exitTempConfirmBank"
      />
    </safa-popup>

    <safa-popup
      @hide="isShowInstallmentModal = false"
      @onCloseModal="isShowInstallmentModal = false"
      title="تقسیط"
      v-model="isShowInstallmentModal"
      width="800px"
      height="800px"
    >
      <Installment
        :selectedRow="selectedRow"
        :formKey="formKey"
        :name="name"
        :title="title"
        :selectedCalculationRow="selectedCalculationRow"
        :loadFromMenu="loadFromMenu"
        :config="config"
        @backToFicheTab="backToFicheTab"
        @exitTempConfirmBank="exitTempConfirmBank"
        @reloadMainForm="$emit('reloadMainForm')"
      />
    </safa-popup>

    <safa-popup title="توضیحات" v-model="isShowCemmentModal" width="400px">
      <Comment
        :selectedRow="selectedRow"
        :formKey="formKey"
        :name="name"
        :title="title"
        :config="config"
        @backToFicheTab="backToFicheTab"
        @exitTempConfirmBank="exitTempConfirmBank"
      />
    </safa-popup>

    <safa-popup
      height="220px"
      width="350px"
      title="انتخاب کردن پوز"
      v-model="isShowConfirmWithPoseModal"
    >
      <ConfirmWithPose
        :formKey="formKey"
        :name="name"
        :selectedRow="selectedRow"
        :title="title"
        :config="config"
        @backToFicheTab="backToFicheTab"
        @exitTempConfirmBank="exitTempConfirmBank"
        ref="confirmFiche"
      />
    </safa-popup>

    <safa-popup
      title="تایید فیش"
      v-model="isShowConfirmFishModal"
      width="800"
      height="650"
    >
      <ConfirmFiche
        :selectedRow="selectedRow"
        :formKey="formKey"
        :name="name"
        :title="title"
        :selectedCalculationRow="selectedCalculationRow"
        :config="config"
        @backToFicheTab="backToFicheTab"
        @exitTempConfirmBank="exitTempConfirmBank"
      />
    </safa-popup>
  </fit>
</template>

<script>
import FicheStatusHistory from "../partials/fiche/FicheStatusHistory.vue"
import TempConfirmBank from "../../income/partials/fiche/TempConfirmBank.vue"
import PosePaymentHistory from "../partials/fiche/PosePaymentHistory.vue"
import Installment from "../../income/partials/fiche/Installment.vue"
import Comment from "../partials/fiche/Comment.vue"
import ConfirmWithPose from "../partials/fiche/ConfirmWithPose.vue"
import ConfirmFiche from "../partials/fiche/ConfirmFiche.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import converter from "xml-js"
const unSelectedFicheErr =
  "هیچ فیشی انتخاب نشده است. برای انجام عملیات، فیش مورد نظر را انتخاب نمایید."
export default {
  mixins: [baseFormMixin],

  components: {
    FicheStatusHistory,
    TempConfirmBank,
    PosePaymentHistory,
    Installment,
    Comment,
    ConfirmWithPose,
    ConfirmFiche
  },

  props: {
    config: Object,
    m: String,
    selectedCalculationRow: Object,
    incomeDetailResults: Object,
    isSelectFromResponder: Boolean,
    fiches: {
      type: Array,
      default: () => []
    },
    formKey: String,
    title: String,
    name: String,
    showInnerBtn: Boolean,
    loadFromMenu: Boolean
  },

  data () {
    return {
      // #region services
      cancelPermanentExportRes: null,
      getIncomeFicheSubRes: null,
      doAllProcessToPrintRes: null,
      ficheConfirmOnDemandCityBankRes: null,
      getAllFicheRes: null,
      temporaryExportFicheRes: null,
      permanentExportRes: null,
      ficheConfirmOnDemandCityBank2Res: null,
      changeFicheStatusFromConfirmToPrintRes: null,
      ficheRevokeRes: null,
      changeFicheStatusFromRevokeRes: null,
      fichePrintRes: null,
      transferFicheRes: null,
      ficheRefundRes: null,
      // #endregion

      // #region variables
      splitterValue: 60,
      incomeFicheSub: [],
      isShowModalFicheStatusHistory: false,
      isShowTempConfirmBankModal: false,
      isShowPoseHistoryModal: false,
      isShowInstallmentModal: false,
      isShowCemmentModal: false,
      allFicheCount: 0,
      selectedRow: null,
      isShowConfirmWithPoseModal: false,
      isShowFinalityBtn: false,
      isShowConfirmByPose: false,
      isShowRevokeFicheBtn: false,
      isShowRevokeConfirm: false,
      isShowPrintFicheBtn: false,
      isShowPrintbtn: false,
      isShowInstallmentBtn: true,
      isShowInstallmentReport: true,
      isShowCancelFromRevoke: false,
      isShowConfirmModal: false,
      isShowConfirmFishModal: false,
      isShowConfirmBtn: false,
      isshowUnconfirm: false,
      columns: [
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "180px",
          cellRenderer: "agGroupCellRenderer"
        },
        {
          field: "EumFicheStatus",
          title: "وضعیت فیش",
          editor: "combo",
          source: [
            { ID: 0, Title: "صدور موقتی" },
            { ID: 1, Title: "صدور قطعی" },
            { ID: 2, Title: "چاپ فیش" },
            { ID: 3, Title: "تأیید" },
            { ID: 4, Title: "ابطال" },
            { ID: 5, Title: "تایید بانک" },
            { ID: 6, Title: "استرداد" },
            { ID: 7, Title: "در حال انتقال" }
          ],
          width: "150px"
        },
        {
          field: "IncomeValue",
          title: "کل عوارض",
          width: "100px",
          editor: "money"
        },
        {
          field: "DiscountValue",
          title: "جمع تخفیف",
          width: "100px",
          editor: "money"
        },
        {
          field: "OddmentValue",
          title: "جمع بدهکاری / بستانکاری",
          width: "180px",
          editor: "money"
        },
        {
          field: "Payable",
          title: "قابل پرداخت",
          width: "120px",
          editor: "money"
        },
        //   {
        //     field: "PaymentBreakDate",
        //     title: "مهلت پرداخت",
        //     width: "110px",
        //   },
        {
          field: "CI_IncomeAccountGroup",
          title: "مالکیت حساب",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "120px"
        },
        {
          field: "InsatllmentValue",
          title: "مبلغ تقسیط",
          width: "100px"
        },
        {
          field: "IncomeCreateDate",
          title: "تاریخ آخرین محاسبه",
          editor: "date",
          width: "150px"
        },
        {
          field: "CreateTime",
          title: "ساعت آخرین محاسبه",
          width: "150px"
        },
        {
          field: "CheckNo",
          title: "مبلغ چک بین بانکی",
          width: "140px"
        },
        {
          field: "CheckNo",
          title: "شماره چک بین بانکی",
          width: "150px"
        },
        {
          field: "BankCheckName",
          title: "نام بانک چک بین بانکی",
          width: "150px"
        },
        {
          field: "BankBranchCheckName",
          title: "نام شعبه صادره چک بین بانکی",
          width: "190px"
        },
        {
          field: "PaymentBank",
          title: "بانک پرداخت شده",
          width: "130px"
        },
        {
          field: "PaymentBranch",
          title: "شعبه پرداخت شده",
          width: "130px"
        },
        {
          field: "PaymentDate",
          title: "تاریخ پرداخت",
          width: "130px"
        },
        {
          field: "PaymentTime",
          title: "ساعت پرداخت",
          width: "150px"
        },
        {
          field: "BankPaymentDate",
          title: "تاریخ پرداخت بانک",
          width: "150px"
        },
        {
          field: "BankConfirmDate",
          title: "تاریخ تایید بانک",
          editor: "date",
          width: "130px"
        },
        {
          field: "BankConfirmTime",
          title: "ساعت تایید بانک",
          width: "130px"
        },
        {
          field: "UserNamePayment",
          title: "کاربر پرداخت کننده",
          width: "180px"
        },
        {
          field: "UserNamePayment",
          title: "تاریخ پرداخت بانک",
          width: "180px"
        },
        {
          field: "UserNamePayment",
          title: "تاریخ تأیید بانک",
          width: "180px"
        },
        {
          field: "BillID",
          title: "شناسه قبض",
          width: "130px"
        },
        {
          field: "PaymentID",
          title: "شناسه پرداخت",
          width: "130px"
        },
        {
          field: "BuildingNo",
          title: "شناسه واریز",
          width: "130px"
        },
        {
          field: "EumIncomePaymentType",
          title: "نحوه پرداخت",
          editor: "combo",
          source: [
            { ID: 1, Title: "دستی" },
            { ID: 2, Title: "پی سی پوز" },
            { ID: 3, Title: "فایل بانک" },
            { ID: 4, Title: "تایید آنی بانک" },
            { ID: 5, Title: "وب سرویس بانک" },
            { ID: 6, Title: "خدمات شهروندان" },
            { ID: 7, Title: "شهروند سپاری" }
          ],
          width: "130px"
        },
        {
          field: "ExportTemporaryDate",
          title: "تاریخ صدور موقتی",
          width: "180px"
        },
        {
          field: "ExportTemporaryTime",
          title: "ساعت صدور موقتی",
          width: "180px"
        },
        {
          field: "UserNameExportTemporary",
          title: "کاربر صدور موقتی",
          width: "180px"
        },
        {
          field: "ExportPermanentDate",
          title: "تاریخ صدور دائمی",
          width: "180px"
        },
        {
          field: "ExportPermanentTime",
          title: "ساعت صدور دائمی",
          width: "180px"
        },
        {
          field: "UserNameExportPermanent",
          title: "کاربر صدور دائمی",
          width: "180px"
        },
        {
          field: "PrintDate",
          title: "تاریخ چاپ",
          width: "120px"
        },
        {
          field: "PrintTime",
          title: "ساعت چاپ",
          width: "120px"
        },
        {
          field: "UserNamePrint",
          title: "کاربر چاپ",
          width: "130px"
        },
        {
          field: "UserConfirmDate",
          title: "تاریخ تایید کاربر",
          width: "180px"
        },
        {
          field: "UserConfirmTime",
          title: "ساعت تایید کاربر",
          width: "180px"
        },
        {
          field: "UserNameUserConfirm",
          title: "کاربر تایید",
          width: "130px"
        },
        {
          field: "DateRevokeConfirm",
          title: "تاریخ ابطال تایید",
          width: "180px"
        },
        {
          field: "TimeRevokeConfirm",
          title: "ساعت ابطال تایید",
          width: "180px"
        },
        {
          field: "UserNameRevokeConfirm",
          title: "کاربرابطال تایید",
          width: "180px"
        },
        {
          field: "RevokeDate",
          title: "تاریخ ابطال/استرداد",
          width: "180px"
        },
        {
          field: "RevokeTime",
          title: "ساعت ابطال/استرداد",
          width: "180px"
        },
        {
          field: "UserNameRevoke",
          title: "کاربر ابطال/استرداد",
          width: "180px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "150px"
        },
        {
          field: "PaymentRahgiriCode",
          title: "کد رهگیری پرداخت",
          width: "150px"
        },
        {
          field: "PaymentReferenceNo",
          title: "شماره ارجاع پرداخت",
          width: "180px"
        },
        {
          field: "Discount",
          title: "تخفیف",
          width: "110px"
        },
        {
          field: "Brokers",
          title: "کارگزاری",
          width: "110px"
        },
        {
          field: "Deposit",
          title: "سپرده",
          width: "110px"
        },
        {
          field: "CreditorPapers",
          title: "اوراق بستانکار",
          width: "150px"
        },
        {
          field: "CI_IncomeFicheConfirmType",
          title: "روش تایید",
          domain: "CI_SaraM1"
        },
        {
          field: "ConfirmTypeDetailes",
          title: "توضیحات روش تایید",
          width: "200px"
        },
        {
          field: "BankFilePath",
          title: "نام فایل بانکی",
          width: "150px"

        }
      ],
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          columnDefs: [
            { field: "title", title: "عنوان", width: "150px" },
            { field: "amount", title: "مقدار", width: "200px" },
            { field: "comment", title: "توضیحات", width: "auto" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(() => {
            if (params.data.OtherFields) {
              let arrayOfClsLog = converter.xml2json(params.data.OtherFields, {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              })
              const clsLog = JSON.parse(arrayOfClsLog)
              if (clsLog.ArrayOfClsLog && clsLog.ArrayOfClsLog.ClsLog) {
                const list = clsLog.ArrayOfClsLog.ClsLog
                let logDetail = list.map((m) => {
                  return {
                    title: m.Subject._text || "",
                    amount: m.Value._text || "",
                    comment: m.Comment._text || ""
                  }
                })
                params.successCallback(logDetail)
              }
            }
            params.successCallback([])
          }, 1000)
        }
      }
      // #endregion
    }
  },

  computed: {
    lockParaphrase () {
      return this.selectedRow?.EumFicheStatus === 3 ?? false
    },
    isShowRefundFicheBtn () {
      if (!this.selectedRow) return !1
      if (this.selectedRow.EumFicheStatus === 3 || this.selectedRow.EumFicheStatus === 5) return !0
      return !1
    },
    lockRevokeconfiche () {
      if (!this.selectedRow) return true
      switch (this.selectedRow.EumFicheStatus) {
        case 0: // صدور موقتی
          return false
        case 1: // صدور قطعی
          return false
        case 2: // چاپ فیش
          return false
        case 3: // تایید
          return true
        case 4: // ابطال
          return true
        case 5: // تایید بانک همانند تایید
          return true
        default:
          return true
      }

      // if (
      //   this.selectedRow.EumFicheStatus !== 2 &&
      //   this.selectedRow.EumFicheStatus !== 1
      // ) {
      //   return false
      // }
      // return true
    }
  },

  methods: {
    getRowClass (params) {
      let row = params.data
      if (row.EumFicheStatus === 0) {
        // 'صدور موقتی' dutyFichePermanent
        return "bg-white"
      }
      if (row.EumFicheStatus === 1) {
        // 'صدور قطعی' dutyFicheConfirm
        return "bg-green-2"
      }
      if (row.EumFicheStatus === 2) {
        // 'چاپ فیش' dutyFichePrint
        return "bg-orange-2"
      }
      if (row.EumFicheStatus === 3) {
        // 'تأیید' dutyFicheTempExport
        return "bg-blue-2"
      }
      if (row.EumFicheStatus === 4) {
        // 'ابطال' dutyFicheRevoke
        return "bg-red-2"
      }
      if (row.EumFicheStatus === 5) {
        // 'تأیید انتقال' dutyFicheConfirmBank
        return "bg-blue-2"
      }
      return { background: "transparent" }
    },

    async installmentReport () {
      if (!this.selectedRow) {
        return this.showError("لطفا یک فیش انتخاب نمایید.")
      }
      const reportPath =
        "/Sara8Reports/RptInstallment_Income"
      const queryParams = {
        NidFiche: this.selectedRow.NidFiche,
        District: this.convertToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@99@80",
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NidFiche,
        bizCodeTitle: "NidFiche",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `چاپ فیش درآمد با شماره فیش ${this.selectedRow.FicheNo} انجام گردید.`
      })
    },

    applyButtons () {
      this.$root.$emit("setButtons", "ufish", this.buttons)
    },

    selectedFiche ({ data: row }) {
      this.selectedRow = row
      this.isShowFinalityBtn = false
      this.isShowConfirmByPose = false
      this.isShowRevokeFicheBtn = false
      this.isShowRevokeConfirm = false
      this.isShowPrintFicheBtn = false
      this.isShowPrintbtn = false
      this.isShowInstallmentBtn = true
      this.isShowInstallmentReport = true
      this.isShowConfirmBtn = false
      this.isShowCancelFromRevoke = false
      this.isshowUnconfirm = false
      if (this.selectedRow.EumFicheStatus === 0) {
        this.isShowFinalityBtn = true
        this.isShowRevokeFicheBtn = true
        this.isShowInstallmentBtn = false
        this.isShowInstallmentReport = false
      } else if (this.selectedRow.EumFicheStatus === 1) {
        this.isShowRevokeFicheBtn = true
        this.isShowPrintFicheBtn = true
        this.isshowUnconfirm = true
      } else if (this.selectedRow.EumFicheStatus === 2) {
        this.isShowConfirmByPose = true
        this.isShowConfirmBtn = true
        this.isShowRevokeFicheBtn = true
        this.isShowPrintFicheBtn = true
      } else if (this.selectedRow.EumFicheStatus === 3) {
        this.isShowRevokeConfirm = true
        this.isShowPrintbtn = true
      } else if (this.selectedRow.EumFicheStatus === 4) {
        this.isShowCancelFromRevoke = true
      } else if (this.selectedRow.EumFicheStatus === 5) {
        this.isShowRevokeConfirm = true
        this.isShowPrintbtn = true
      }
      this.getIncomeFicheSub()
    },

    async getIncomeFicheSub () {
      try {
        this.showLoading()
        const { data } = await this.$services.SD.getIncomeFicheSub(
          { pNidFiche: this.selectedRow.NidFiche },
          this.config
        )
        this.getIncomeFicheSubRes = this.getResponse(data)
        if (this.getIncomeFicheSubRes.success) {
          this.incomeFicheSub =
            this.getIncomeFicheSubRes.data?.IncomeFicheSub ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideSending()
      }
    },
    temporaryExportFiche () {
      this.showLoading()
      this.$services.SD.getAllFiche(
        {
          pNidProc: this.selectedRequest.NidProc
        },
        this.config
      )
        .then(async ({ data }) => {
          this.getAllFicheRes = this.getResponse(data)
          if (this.getAllFicheRes.success) {
            if (Array.isArray(this.getAllFicheRes?.data?.All_Fiche)) {
              this.allFicheCount = this.getAllFicheRes?.data?.All_Fiche?.length
            }
            this.exportTepmFiche()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    exportTepmFiche () {
      this.showLoading()
      if (this.allFicheCount > 0) {
        this.showConfirm(
          "قبلا برای این درخواست فیش صادر شده است.آیا از صدور فیش اطمینان دارید؟"
        ).onOk(() => {
          this.temFich()
        })
      } else {
        this.temFich()
      }
    },
    temFich () {
      this.showLoading()
      this.$services.SD.temporaryExportFiche(
        {
          pNidIncome: this.selectedCalculationRow.NidIncome,
          pIsBreakInDay: false,
          pBreakDay: 0,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          },
          pIsLoadFromMenu: this.loadFromMenu
        },
        this.config
      )
        .then(async ({ data }) => {
          this.temporaryExportFicheRes = this.getResponse(data)
          if (this.temporaryExportFicheRes.success) {
            this.showSuccess("عملیات صدور موقت فیش، با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.exportTemporaryFiche,
              bizCode: this.selectedCalculationRow.NidIncome,
              bizCodeTitle: "NidIncome",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `صدور موقت فیش برای ${this.selectedCalculationRow?.FicheNo ?? ''} انجام گردید.`
            })
            this.$emit("reloadMainForm")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    finalityExportFiche () {
      this.showConfirm(
        "آیا از قطعیت صدور فیش به شماره" +
          `${this.selectedRow.FicheNo}` +
          "اطمینان دارید؟"
      ).onOk(() => {
        this.permanentExport()
      })
    },
    permanentExport () {
      this.$services.SD.permanentExport(
        {
          pNidFiche: this.selectedRow.NidFiche,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        },
        this.config
      )
        .then(async ({ data }) => {
          this.permanentExportRes = this.getResponse(data)
          if (this.permanentExportRes.success) {
            this.showSuccess("قطعیت صدور فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.update,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `قطعیت صدور فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `
            })
            this.$emit("reloadMainForm")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    cancelPermanentExport () {
      this.showConfirm(
        "آیا از عدم قطعیت صدور فیش به شماره" +
          `${this.selectedRow.FicheNo}` +
          "اطمینان دارید؟"
      ).onOk(() => {
        this.cancelPermanentExportHandler()
      })
    },
    cancelPermanentExportHandler () {
      this.$services.SD.cancelPermanentExport(
        {
          pNidFiche: this.selectedRow.NidFiche,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        },
        this.config
      )
        .then(async ({ data }) => {
          this.cancelPermanentExportRes = this.getResponse(data)
          if (this.cancelPermanentExportRes.success) {
            this.showSuccess("وضعیت فیش به عدم قطعیت تغییر یافت.")
            await this.log({
              action: this.logActions.update,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `عدم قطعیت صدور فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `
            })
            this.$emit("reloadMainForm")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    refundFiche () {
      if (this.selectedRow) {
        this.showConfirm(
          "آیا از استرداد فیش به شماره" +
            `${this.selectedRow.FicheNo}` +
            "اطمینان دارید؟"
        ).onOk(() => {
          this.refundFicheClosed()
        })
      } else {
        this.showError(unSelectedFicheErr)
      }
    },
    async refundFicheClosed () {
      const payload = {
        pNidFiche: this.selectedRow.NidFiche,
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      }
      try {
        const { data } = await this.$services.SD.ficheRefund(payload)
        this.ficheRefundRes = this.getResponse(data)
        if (this.ficheRefundRes.success) {
          this.showSuccess("استرداد فیش با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.ficheRefund,
            bizCode: this.selectedRow.NidFiche,
            bizCodeTitle: "NidFiche",
            saveDesc: `استرداد فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `,
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async exportFiche () {
      try {
        this.showLoading()
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pNidIncome: this.selectedCalculationRow.NidIncome,
          pSelectedList: this.incomeDetailResults.Income_Calculation_ForChange,
          pInputParameters: this.incomeDetailResults.IncomeParameters,
          pIsBreakInDay: false,
          pBreakDay: 0,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          },
          pIsLoadFromMenu: this.loadFromMenu
        }
        const { data } = await this.$services.SD.doAllProcessToPrint(payload, this.config)
        this.doAllProcessToPrintRes = this.getResponse(data)
        if (this.doAllProcessToPrintRes.success) {
          this.showSuccess("صدور فیش با موفقیت انجام پذیرفت.")
          this.$emit("reloadMainForm")
          await this.log({
            action: this.logActions.exportFiche,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `صدور فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `
          })
        }
      }
      catch (e) {
        this.showError(e)
      } finally {
        this.hideLoading()
      }
    },
    tempConfirmBankShahr () {
      //  EumFicheConfirmMethode: this.selectedRow.EumFicheConfirmMethode, but EumFicheConfirmMethode is null in the main data
      // CI_IncomeFicheConfirmType: this.selectedRow.CI_IncomeFicheConfirmType , similar above mentioned
      const payload = {
        pDto: {
          CI_IncomeFicheConfirmType: 0,
          EumFicheConfirmMethode: 0,
          EumIncomePaymentType: this.selectedRow.EumIncomePaymentType,
          NidFiche: this.selectedRow.NidFiche,
          NidUser: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.SD.ficheConfirmOnDemandCityBank(payload, this.config)
        .then(async ({ data }) => {
          this.ficheConfirmOnDemandCityBankRes = this.getResponse(data)
          if (this.ficheConfirmOnDemandCityBankRes.success) {
            this.showSuccess("تایید فیش با موفقیت انجام پذیرفت.")
            await this.log({
              action: this.logActions.confirmFiche,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `تایید بانک شهر در فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `
            })
            this.$emit("reloadMainForm")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    tempConfirmBankShahr2 () {
      //  EumFicheConfirmMethode: this.selectedRow.EumFicheConfirmMethode, but EumFicheConfirmMethode is null in the main data
      // CI_IncomeFicheConfirmType: this.selectedRow.CI_IncomeFicheConfirmType , similar above mentioned
      const payload = {
        pDto: {
          CI_IncomeFicheConfirmType: 0,
          EumFicheConfirmMethode: 0,
          EumIncomePaymentType: this.selectedRow.EumIncomePaymentType,
          NidFiche: this.selectedRow.NidFiche,
          NidUser: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.SD.ficheConfirmOnDemandCityBank2(payload, this.config)
        .then(async ({ data }) => {
          this.ficheConfirmOnDemandCityBank2Res = this.getResponse(data)
          if (this.ficheConfirmOnDemandCityBank2Res.success) {
            await this.log({
              action: this.logActions.confirmFiche,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `تایید بانک شهر 2 در فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `
            })
            // this.$emit('reloadMainForm')
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    exitTempConfirmBank () {
      this.isShowTempConfirmBankModal = false
      this.$emit("reloadMainForm")
    },
    revokeConfirm () {
      this.showConfirm(
        "آیا از ابطال تأیید فیش به شماره" +
          `${this.selectedRow.FicheNo}` +
          "اطمینان دارید؟"
      ).onOk(() => {
        this.changeFicheStatusFromConfirmToPrint()
      })
    },
    changeFicheStatusFromConfirmToPrint () {
      this.showSending()
      this.$services.SD.changeFicheStatusFromConfirmToPrint(
        {
          pNidFiche: this.selectedRow.NidFiche,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        },
        this.config
      )
        .then(async ({ data }) => {
          this.changeFicheStatusFromConfirmToPrintRes = this.getResponse(data)
          if (this.changeFicheStatusFromConfirmToPrintRes.success) {
            this.showSuccess("ابطال تأیید با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.revokeconfirmedFiche,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              saveDesc: `ابطال تأیید فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `,
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem
            })
            this.$emit("reloadMainForm")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    revokeFiche () {
      if (this.selectedRow) {
        this.showConfirm(
          "آیا از ابطال فیش به شماره" +
            `${this.selectedRow.FicheNo}` +
            "اطمینان دارید؟"
        ).onOk(() => {
          this.ficheRevoke()
        })
      } else {
        this.showError(unSelectedFicheErr)
      }
    },
    ficheRevoke () {
      this.$services.SD.ficheRevoke(
        {
          pNidFiche: this.selectedRow.NidFiche,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        },
        this.config
      )
        .then(async ({ data }) => {
          this.ficheRevokeRes = this.getResponse(data)
          if (this.ficheRevokeRes.success) {
            this.showSuccess("ابطال فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.revokeFiche,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              saveDesc: `ابطال فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `,
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem
            })
            this.$emit("reloadMainForm")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    changeStatusFromRevoke () {
      this.$services.SD.changeFicheStatusFromRevoke(
        { pNidFiche: this.selectedRow.NidFiche },
        this.config
      )
        .then(async ({ data }) => {
          this.changeFicheStatusFromRevokeRes = this.getResponse(data)
          if (this.changeFicheStatusFromRevokeRes.success) {
            this.showSuccess("وضعیت فیش ابطال شده با موفقیت تغییر کرد.")
            await this.log({
              action: this.logActions.update,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `تغییر وضعیت ابطال فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `
            })
            this.$emit("reloadMainForm")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    backToFicheTab () {
      if (this.isShowInstallmentModal) {
        this.isShowInstallmentModal = false
      }
      if (this.isShowCemmentModal) {
        this.isShowCemmentModal = false
      }
      if (this.isShowConfirmWithPoseModal) {
        this.isShowConfirmWithPoseModal = false
      }
      if (this.isShowConfirmModal) {
        this.isShowConfirmModal = false
      }
      if (this.isShowConfirmFishModal) {
        this.isShowConfirmFishModal = false
      }
      this.$emit("reloadMainForm")
    },
    printFiche () {
      this.showLoading()
      this.$services.SD.fichePrint(
        {
          pNidFiche: this.selectedRow.NidFiche,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        },
        this.config
      )
        .then(async ({ data }) => {
          this.fichePrintRes = this.getResponse(data)
          if (this.fichePrintRes.success) {
            await this.log({
              action: this.logActions.printReport,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `چاپ فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `
            })
            this.print()
            this.$emit("reloadMainForm")
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
    async paraphraseHandler () {
      const reportPath =
        "/Sara8Reports/RptPosPrint"
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidFiche: this.selectedRow.NidFiche,
        District: this.convertToNosaziCodeObject(this.selectedRequest.BizCode)
          .District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NidFiche,
        bizCodeTitle: "NidFiche",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `چاپ فیش پراژ فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `
      })
    },
    async print () {
      const reportPath =
        "/Sara8Reports/RptIncomeFiche"
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidFiche: this.selectedRow.NidFiche,
        RptDomain: "2@3@4@5@6@7@8@9@10@11@12@80@1@99",
        District: this.convertToNosaziCodeObject(this.selectedRequest.BizCode)
          .District
      }
      this.showReport(reportPath, queryParams)
    },
    transfer () {
      this.showConfirm(
        "آیا ازانتقال فیش شماره" +
          `${this.selectedRow.FicheNo}` +
          "به حساب درآمدی اطمینان دارید؟"
      ).onOk(() => {
        this.transferFiche()
      })
    },
    transferFiche () {
      this.$services.SD.transferFiche(
        { pIncome_Fiche: this.selectedRow },
        this.config
      )
        .then(async ({ data }) => {
          this.transferFicheRes = this.getResponse(data)
          if (this.transferFicheRes.success) {
            this.showSuccess("انتقال به حساب درآمدی با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.transfer,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `انتقال به حساب درآمدی، فیش با شماره  ${this.selectedRow.FicheNo} انجام گردید. `
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    installmentMethod () {
      if (this.selectedRow !== null) {
        this.isShowInstallmentModal = true
      } else {
        this.showError(unSelectedFicheErr)
      }
    },
    confirmWithPose () {
      if (this.selectedRow !== null) {
        this.isShowConfirmWithPoseModal = true
      } else {
        this.showError(unSelectedFicheErr)
      }
    },
    showHistoryFiche () {
      if (this.selectedRow !== null) {
        this.isShowModalFicheStatusHistory = true
      } else {
        this.showError(unSelectedFicheErr)
      }
    },
    handelShowPoseHistory () {
      if (this.selectedRow) {
        this.isShowPoseHistoryModal = true
      } else {
        this.showError(unSelectedFicheErr)
      }
    },
    handelShowConfirmFish () {
      if (this.selectedRow) {
        this.isShowConfirmFishModal = true
      } else {
        this.showError(unSelectedFicheErr)
      }
    }
  },
  watch: {
    buttons () {
      this.applyButtons()
    }
  },
  beforeDestroy () {
    this.$root.$emit("removeButtons", "ufish")
  }
}
</script>
