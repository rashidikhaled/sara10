<template>
  <fit class="q-mt-sm">
    <safa-grid
      v-model="companyCaption"
      cdcName="SpecificationsExecutiveAgents"
      title="مشخصات عوامل اجرایی"
      :columns="SpecificationsExecutiveAgentsColumns"
      height="100%"
      max-height="100%"
      min-height="200px"
      fit
      m="r"
      paginate
      :pageSize="20"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    rowSelectData: Object
  },
  data () {
    return {
      companyCaption: this.value?.RevisitRenewal_Request?.Request_Contractor || [],
      SpecificationsExecutiveAgentsColumns: [
        {
          field: "company",
          title: "شرکت",
          width: "200px"
          // editor: "action",
          // cellStyle: {
          //   padding: 0,
          //   margin: 0,
          //   color: "red"
          // },
          // btnTitle: "",
          // btnIcon: "",
          // cellRenderer: (params) =>
          //   `<div style="${
          //     params.data?.DaysRemain > 0
          //       ? "background:#31e747;text-align:center"
          //       : "background:#f76666d9;text-align:center"
          //   }">${params.data?.DaysRemain || ""}</div>`,
          // callback: (params) => this.handleCompany(params)
        },
        {
          field: "ManagerMobile",
          title: "همراه مدیر عامل",
          width: "200px"
        },
        {
          field: "ManagerTel",
          title: "تلفن شرکت",
          width: "200px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "200px"
        }
      ]
    }
  }
}
</script>
