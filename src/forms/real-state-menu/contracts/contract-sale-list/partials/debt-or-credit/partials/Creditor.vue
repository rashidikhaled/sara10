<template>
    <fit>
      <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-text
            label="کل مبلغ دریافتی شهرداری(ریال)"
            v-model="value.Sum_DebitCredit_2"
            cdcName="Sum_DebitCredit_2"
            label-width="150px"
            :m="m"
          />
        </FormControl>
      </FormRow>
      <safa-grid
        title="بستانکاری"
        v-model="value.DebitCredit_Info_2"
        :columns="colGirid1"
        fit
        paginate
        :suppressRowClickSelection="false"
        cdcName="DebitCredit_Info_2"
        spId="9856D8E3-21B4-4AE3-9A0E-3B3BB9B1A4AA"
        :m="m"
      />
    </fit>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    m: { type: String }
  },

  data () {
    return {
      name: "Creditor",
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
          title: "شرط پرداخت",
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
  }
}
</script>
