<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="نام مالک قبلی و آدرس"
          label-width="110px"
          v-model="value.OldOwnerNameAddress"
          cdcName="OldOwnerNameAddress"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک آبی"
          label-width="110px"
          v-model="value.Plack"
          cdcName="Plack"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام مستاجر"
          label-width="110px"
          v-model="value.RenterName"
          cdcName="RenterName"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="آدرس مستاجر"
          label-width="110px"
          v-model="value.RenterAddress"
          cdcName="RenterAddress"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن مستاجر"
          label-width="110px"
          v-model="value.RenterTel"
          cdcName="RenterTel"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره قرارداد"
          label-width="110px"
          v-model="value.ContractNo"
          cdcName="ContractNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ قرارداد اجاره"
          label-width="110px"
          v-model="value.ContractRentDate"
          cdcName="ContractRentDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="قرارداد اجاره"
          ciName="CI_ContractRent"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_ContractRent"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مبلغ اجاره ماهیانه"
          label-width="110px"
          v-model="value.RentPrice"
          cdcName="RentPrice"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ شروع قرارداد"
          label-width="110px"
          v-model="value.ContractStartDate"
          cdcName="ContractStartDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اتمام قرارداد"
          label-width="110px"
          v-model="value.ContractEndDate"
          cdcName="ContractEndDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره صورتجلسه تحویل مورد اجاره"
          label-width="110px"
          v-model="value.ContractRentDate"
          cdcName="ContractRentDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ صورتجلسه تحویل مورد اجاره"
          label-width="110px"
          v-model="value.TransferRentDate"
          cdcName="TransferRentDate"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <text-template
      label="توضیحات"
      label-width="110px"
      v-model="value.Description2"
      cdcName="Description2"
      :m="m"
      fit
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  }
}
</script>
