<template>
  <div>
    <form-row class="q-mt-sm">
      <form-control>
        <safa-text
          label=" شماره سند رهنی"
          label-width="100px"
          cdcName="MortgageDocNo"
          v-model="value.MortgageDocNo"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ سند رهنی"
          cdcName="MortgageDocDate"
          label-width="100px"
          v-model="value.MortgageDocDate"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-checkbox
          label="شهرداری راهن می باشد"
          v-model="value.MunicipalMortgagor"
          label-width="100px"
          :m="m"
          cdcName="MunicipalMortgagor"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm">
       <form-control>
        <safa-text
          label=" شماره دفتر خانه"
          v-model="value.BureauNo"
          label-width="100px"
          cdcName="BureauNo"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="مبلغ سند"
          v-model="value.MortgageDocPrice"
          label-width="100px"
          cdcName="MortgageDocPrice"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ شروع قرارداد"
          v-model="value.ContractStartDate"
          cdcName="ContractStartDate"
          label-width="100px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label=" تاریخ پایان قرارداد"
          v-model="value.ContractEndDate"
          cdcName="ContractEndDate"
          label-width="100px"
          :m="m"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm">
      <text-template
        label="توضیحات"
        v-model="value.Description"
        label-width="100px"
        cdcName="Description"
        :rows="2"
        formKey="D9068C25-2DA0-41EC-BF38-BD8BECE86405"
        class="col-12"
        :m="m"
      />
    </form-row>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      title: "مشخصات اسناد رهنی",
      name: "UMortgageDocument"
    }
  }
}
</script>
