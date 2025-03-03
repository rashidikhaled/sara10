<template>
  <safa-form id="1DD323C3-E294-446A-AF8C-0F77A48DE4FF">
    <fit>
      <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-text
            label="کل مبلغ پرداختی شهرداری(ریال)"
            v-model="value.Sum_DebitCredit_2"
            cdcName="Sum_DebitCredit_2"
            label-width="150px"
            m="r"
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
        m="r"
      />
    </fit>
  </safa-form>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      colGirid1: [
        {
          title: "نوع پرداخت",
          field: "CI_AccountPaymentType",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "انتقال به حساب فی مابین",
          field: "GoToBetAccount"
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
