<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-text
          label-width="150px"
          v-model="value.Sum_DebitCredit_2"
          cdcName="Sum_DebitCredit_2"
          m="r"
          label="کل مبلغ پرداختی شهرداری(ریال)"
          class="q-mb-sm"
        />
      </FormControl>
      <div class="q-gutter-x-sm">
       <btn-save label="تایید مالی بستانکاری" @click="financialApproval" />
        <btn-cancel
          label="ابطال تایید مالی بستانکاری"
          @click="cancelFinancial"
        />
        <btn-cancel label="ارسال به رایورز" @click="sendRayvarz" />
      </div>
       </FormRow>
    <!-- helper="agCreditorColumns" -->
    <safa-grid
    :columns="agCreditorColumns"
      title="بستانکاری"
      v-model="value.DebitCredit_Info_2"
      minHeight="250px"
      :suppressRowClickSelection="false"
      ref="creditor"
      fit
      paginate
      cdcName="DebitCredit_Info_2"
      :m="m"
         />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: { type: Object },
    m: { type: String },
    model: Object
  },
  data () {
    return {
      name: "Creditor",
      title: "بستانکاری",
      activeTab: "description",
      agCreditorColumns: [
        {
          field: "RowNo",
          title: "ردیف",
          width: "100px"
        },
        {
          field: "IsConfirm",
          title: "تایید",
          width: "100px",
          editor: "checkbox"

        },
        {
          field: "IsRevoke",
          title: "ابطال",
          width: "100px",
          editor: "checkbox"

        },
        {
          field: "CI_AccountPaymentType",
          title: "نوع پرداخت",
          editor: "combo",
          domain: "Estate",
          width: "150px"
        },
        {
          field: "GoToBetAccount",
          title: "انتقال به حساب فی مابین",
          width: "170px",
          editor: "checkbox"

        },
        {
          field: "DebitCreditDate",
          title: "سررسید",
          editor: "date",
          width: "100px"
        },
        {
          field: "DebitCreditPrice",
          title: "مبلغ(ریال)",
          width: "100px"
        },
        {
          field: "DebitCreditNo",
          title: "شماره",
          width: "100px"
        },
        {
          field: "DebitCreditCnt",
          title: "تعداد",
          width: "100px"
        },
        {
          field: "DebitCreditOwner",
          title: "نام پرداخت کننده",
          width: "140px"
        },
        {
          field: "BankName",
          title: "نام بانک",
          width: "100px"
        },
        {
          field: "BranchCode",
          title: "کد شعبه",
          width: "100px"
        },
        {
          field: "AccountNo",
          title: "شماره حساب",
          width: "120px"
        },
        {
          field: "GetterName",
          title: "نام گیرنده",
          width: "100px"
        },
        {
          field: "CI_PaymentDueCheck",
          title: "علت پرداخت چک",
          editor: "combo",
          domain: "Estate",
          width: "140px"
        },
        {
          field: "IncomeLetterNo",
          title: "شماره نامه درامد",
          width: "140px"
        },
        {
          field: "IncomeLetterDate",
          title: "تاریخ نامه درامد",
          editor: "date",
          width: "140px"
        },
        {
          field: "FinancialLetterNo",
          title: "شماره نامه امور مالی",
          width: "160px"
        },
        {
          field: "FinancialLetterDate",
          title: "تاریخ نامه امور مالی",
          editor: "date",
          width: "160px"
        },
        {
          field: "CI_PaymentTime",
          title: "زمان پرداخت",
          editor: "combo",
          domain: "Estate",
          width: "120px"
        },
        {
          field: "CI_CompensationMethod",
          title: "روش جبران خسارت",
          editor: "combo",
          domain: "Estate",
          width: "140px"
        },
        {
          field: "DebitCreditTimecond",
          title: "شرط پرداخت",
          width: "130px"
        },
        {
          field: "IsGet",
          title: "گرفته شده",
          width: "100px"
        },
        {
          field: "IsVosool",
          title: "وصول/پاس",
          width: "100px"
        },
        {
          field: "DamageDeadline",
          title: "مهلت جبران خسارت",
          editor: "date",
          width: "140px"
        },
        {
          field: "DamagePrice",
          title: "تعرفه جبران خسارت",
          width: "140px"
        },
        {
          field: "PaytmpOwned",
          title: "علی الحساب پرداختی",
          width: "160px"
        },
        {
          field: "PaytmpOffer",
          title: "پیشنهادی علی الحساب",
          width: "160px"
        },
        {
          field: "Paytmp",
          title: "مبلغ پرداختی علی الحساب",
          width: "170px"
        }
      ]
    }
  },
  methods: {
    financialApproval () {
      console.log("financialApproval")
    },
    cancelFinancial () {
      console.log("cancelFinancial")
    },
    sendRayvarz () {
      this.showConfirm("آیا از ارسال به رایورز اطمینان دارید؟").onOk(() => {
        this.sendObj()
      })
    },
    async sendObj () {
      this.showLoading()
      await this.$services.ES.getRequestNoFromNidRequest({
        pNidRequest: this.currentObj?.NIdRequest
      })
        .then(({ data }) => {
          this.sendObjRes = this.getResponse(data)
          if (this.sendObjRes.success) {
            this.showSuccess("ارسال اطلاعات با موفقیت انجام شد")
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
