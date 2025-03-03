<template>
  <FormRow>
    <FormControl>
      <safa-text
        label="شماره فیش"
        label-width="100px"
        v-model="value.ClsIncome_Payment.Income_Fiche.FicheNo"
        cdcName="FicheNo"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-datepicker
        label="تاریخ فیش"
        v-model="value.ClsIncome_Payment.Income_Fiche.FicheDate"
        label-width="100px"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-datepicker
        label="تاریخ تایید"
        v-model="value.ClsIncome_Payment.Income_Fiche.ConfirmDate"
        label-width="100px"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-datepicker
        label="تاریخ ابطال"
        v-model="value.ClsIncome_Payment.Income_Fiche.CancelDate"
        label-width="100px"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="مبلغ فیش"
        label-width="100px"
        v-model="value.ClsIncome_Payment.Income_Fiche.Price"
        cdcName="Price"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شناسه قبض"
        label-width="100px"
        v-model="value.ClsIncome_Payment.Income_Fiche.BillID"
        cdcName="BillID"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شناسه پرداخت"
        label-width="100px"
        v-model="value.ClsIncome_Payment.Income_Fiche.PaymentID"
        cdcName="PaymentID"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="کد رهگیری"
        label-width="100px"
        v-model="value.ClsIncome_Payment.NidWorkItem"
        cdcName="NidWorkItem"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-combo
        ciName="CI_RequesterType"
        domainName="Dig"
        label="شرکت خدماتی"
        label-width="100px"
        v-model="value.ClsIncome_Payment.CI_RequesterType"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-combo
        ciName="CI_RedirectName"
        domainName="Dig"
        label="نام تابعه"
        label-width="100px"
        v-model="value.ClsIncome_Payment.CI_RedirectName"
        m="r"
      />
    </FormControl>
  </FormRow>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: String
  }
}
</script>
