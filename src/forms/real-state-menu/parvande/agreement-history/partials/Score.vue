<template>
  <fit>
    <FormRow>
      <FormControl class="q-mb-sm">
        <safa-text
          label-width="120px"
          v-model="value.Total_Price"
          cdcName="Total_Price"
          :m="m"
          label="مبلغ کل نهایی(ریال)"
        />
      </FormControl>
    </FormRow>
    <!-- helper="agColGirid1" -->
    <safa-grid
      title="امتیاز"
      v-model="isSaleOrBuy"
      helper="agColGirid1"
      :suppressRowClickSelection="false"
      ref="ContractBuy_Privilege"
      fit
      paginate
      cdcName="ContractBuy_Privilege"
      :m="m"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    m: { type: String },
    accessBuyOrSale: { type: Boolean, default: () => true }
  },
  data () {
    return {
      name: "Score",
      isSaleOrBuy: null
      // agColGirid1: [
      //   {
      //     title: "کد نوع امتیاز",
      //     field: "CI_PrivilegeType",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "تاریخ صدور امتیاز",
      //     editor: "date",
      //     field: "PrivilegeDate"
      //   },
      //   {
      //     title: "میزان امتیاز",
      //     field: "PrivilegeAmount"
      //   },
      //   {
      //     title: "ارزش ریالی",
      //     field: "PrivilegePrice"
      //   },
      //   {
      //     title: "کدنوسازی",
      //     field: "CodeString"
      //   },
      //   {
      //     title: "شرح امتیاز",
      //     field: "PrivilegeDesc"
      //   }
      // ]
    }
  },
  mounted () {
    // isSaleOrBuy () {
    if (this.accessBuyOrSale) {
      this.isSaleOrBuy = this.value.ContractBuy_Privilege
    } else {
      this.isSaleOrBuy = this.value.ContractSale_Privilege
    }
    // }
  }
}
</script>
