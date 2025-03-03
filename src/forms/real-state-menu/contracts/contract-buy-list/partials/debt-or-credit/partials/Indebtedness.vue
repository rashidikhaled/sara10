<template>
    <fit>
      <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-text
            label="کل مبلغ دریافتی شهرداری(ریال)"
            v-model="value.Sum_DebitCredit_1"
            cdcName="Sum_DebitCredit_1"
            label-width="150px"
            :m="m"
          />
        </FormControl>
      </FormRow>
      <safa-grid
        title="بدهکاری"
        v-model="value.DebitCredit_Info_1"
        :columns="colGirid1"
        fit
        :suppressRowClickSelection="false"
        paginate
        cdcName="girid1"
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
      colGirid1: [
        {
          title: "نوع پرداخت",
          field: "CI_AccountPaymentType",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "انتقال به حساب فی مابین",
          field: "GoToBetAccount",
          editor: "checkbox"
        },
        {
          title: "سررسید",
          field: "DebitCreditDate"
        },
        {
          title: "مبلغ(ریال)",
          field: "DebitCreditPrice"
        },
        {
          title: "شماره",
          field: "DebitCreditNo"
        },
        {
          title: "تعداد",
          field: "DebitCreditCnt"
        },
        {
          title: "نام پرداخت کننده",
          field: "DebitCreditOwner"
        },
        {
          title: "نام بانک",
          field: "BankName"
        },
        {
          title: "کد شعبه",
          field: "BranchCode"
        },
        {
          title: "شماره حساب",
          field: "AccountNo"
        },
        {
          title: "نام گیرنده",
          field: "GetterName"
        },
        {
          title: "علت پرداخت چک",
          field: "CI_PaymentDueCheck",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "شماره نامه درآمد",
          field: "IncomeLetterNo"
        },
        {
          title: "تاریخ نامه درآمد",
          editor: "date",
          field: "IncomeLetterDate"
        },
        {
          title: "شماره نامه امور مالی",
          field: "FinancialLetterNo"
        },
        {
          title: "تاریخ نامه امور مالی",
          editor: "date",
          field: "FinancialLetterDate"
        },
        {
          title: "زمان پرداخت",
          field: "CI_PaymentTime",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "روش جبران خسارت",
          field: "CI_CompensationMethod",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "شزط پرداخت",
          field: "DebitCreditTimecond"
        },
        {
          title: "گرفته شده",
          field: "IsGet"
        },
        {
          title: "وصول/پاس",
          field: "IsVosool"
        }
      ]
    }
  },
  methods: {

  }
}
</script>
