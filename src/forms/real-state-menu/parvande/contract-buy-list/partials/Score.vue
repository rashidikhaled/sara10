<template>
  <safa-form id="1DD323C3-E294-446A-AF8C-0F77A48DE4FF">
    <fit>
      <safa-grid
        title="امتیاز"
        v-model="value.ContractBuy_Privilege"
        :columns="colGirid1"
        :suppressRowClickSelection="false"
        fit
        paginate
        cdcName="ContractBuy_Privilege"
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
    accessBuyOrSale: Boolean,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      colGirid1: [
        {
          title: "کد نوع امتیاز",
          field: "CI_PrivilegeType",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "تاریخ صدور امتیاز",
          editor: "date",
          field: "PrivilegeDate"
        },
        {
          title: "میزان امتیاز",
          field: "PrivilegeAmount"
        },
        {
          title: "ارزش ریالی",
          field: "PrivilegePrice"
        },
        {
          title: "کدنوسازی",
          field: "CodeString"
        },
        {
          title: "شرح امتیاز",
          field: "PrivilegeDesc"
        }
      ]
    }
  },
  computed: {
    isSaleOrBuy () {
      if (this.accessBuyOrSale) {
        return this.value.ContractBuy_Privilege
      } else {
        return this.value.ContractSale_Privilege
      }
    }
  }
}
</script>
