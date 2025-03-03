<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-text
          label-width="150px"
          v-model="value.Sum_DebitCredit_1"
          cdcName="Sum_DebitCredit_1"
          :m="m"
          label="کل مبلغ پرداختی شهرداری(ریال)"
          class="q-mb-sm"
        />
      </FormControl>
      <div class="q-gutter-x-sm">
        <btn-save label="تایید مالی بدهکاری" @click="financialDebtor" />
        <btn-cancel
          label="ابطال تایید مالی بستانکاری"
          @click="cancelFinancialdebtor"
        />
      </div>
    </FormRow>
    <!-- helper:agDebtorColumns -->
    <safa-grid
    :columns="agDebtorColumns"
      title="بدهکاری"
      v-model="value.DebitCredit_Info_1"
      :suppressRowClickSelection="false"
      fit
      paginate
      cdcName="grid1"
      :m="m"
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: { type: String },
    value: { type: Object, default: () => {} }
  },
  data () {
    return {
      name: "Indebtedness",
      title: "بدهکاری",

      agDebtorColumns: [
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
          width: "100px"
        },
        {
          field: "GoToBetAccount",
          title: "انتقال به حساب فی مابین",
          width: "180px",
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
          width: "150px"
        },
        {
          field: "IncomeLetterDate",
          title: "تاریخ نامه درامد",
          editor: "date",
          width: "150px"
        },
        {
          field: "FinancialLetterNo",
          title: "شماره نامه امور مالی",
          width: "150px"
        },
        {
          field: "FinancialLetterDate",
          title: "تاریخ نامه امور مالی",
          editor: "date",
          width: "150px"
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
          width: "140px"
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
        }
      ]
    }
  },
  methods: {
    financialDebtor () {
      console.log("financialDebtor")
    },
    cancelFinancialdebtor () {
      console.log("financialDebtor")
    }
  }
}
</script>
