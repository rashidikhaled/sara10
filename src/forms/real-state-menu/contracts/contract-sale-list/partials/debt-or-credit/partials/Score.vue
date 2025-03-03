<template>
  <!-- <safa-form id="1DD323C3-E294-446A-AF8C-0F77A48DE4FF"> -->
  <fit>
    <safa-grid
      title="امتیاز"
      v-model="value.ContractSale_Privilege"
      :columns="colGirid1"
      :suppressRowClickSelection="false"
      fit
      paginate
      :defaultNewRow="defaultNewRow"
      spId="91A6B911-6CD1-4B05-B9BE-AE2EA82748E4"
      cdcName="ContractSale_Privilege"
      :m="m"
    />
  </fit>
  <!-- </safa-form> -->
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    NIdContractSale: { type: String, default: () => "" },
    m: { type: String }
  },

  data () {
    return {
      name: "Score",
      defaultNewRow: {
        CI_PrivilegeType: null,
        CodeString: null,
        NIdContractSale: "00000000-0000-0000-0000-000000000000",
        NIdPrivilege: "00000000-0000-0000-0000-000000000000",
        NIdPrivilege_tmp: 0,
        PrivilegeAmount: null,
        PrivilegeDate: null,
        PrivilegeDesc: null,
        PrivilegePrice: null
      },
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
  }
}
</script>
