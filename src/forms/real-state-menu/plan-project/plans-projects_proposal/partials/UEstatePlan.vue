<template>
  <fit>
    <!-- helper="CGHouseInPlansprojectsProposalColumns" -->
    <safa-grid
      v-model="value.Plansprojects_Proposal_Code"
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      paginate
      ID="E7FAF38E-13A0-4196-BA6F-6E0ABF46DC67"
      :allow-new-row="true"
      :deleteRow="true"
      :allowCopy="true"
      :columns="plansprojectsProposalCodeColumns"
      :m="m"
    />
  </fit>
</template>

<script>

export default {
  props: {
    title: String,
    formKey: String,
    m: String,
    value: Object
  },
  data () {
    return {
      name: "UEstatePlan",
      Plansprojects_Proposal_Code: [],
      plansprojectsProposalCodeColumns: [
        {
          field: "CheckPlansprojects_Proposal_Code",
          title: "وضعیت اولویت",
          editor: "checkbox"
        },
        {
          field: "CodeString",
          title: "کد نوسازی"
        },
        {
          field: "EconomicPrice",
          title: "قیمت منطقه ای"
        },
        {
          field: "ProposalPrice",
          title: "برآورد ریالی"
        },
        { field: "CurrentArea",
          title: "مساحت عرصه وضع موجود"
        },
        { field: "DocArea",
          title: "مساحت عرصه طبق سند"
        },
        { field: "AreaInPlan",
          title: "مساحت عرصه در مسیر"
        },
        { field: "CI_BudgetRow",
          title: "ردیف بودجه",
          editor: "combo",
          domain: "Estate"
        },
        { field: "BudgetPlace",
          title: "محل برداشت بودجه"
        },
        { field: "OwnerName",
          title: "نام مالک"
        },
        { field: "Address",
          title: "آدرس"
        },
        { field: "Description",
          title: "توضیحات"
        }
      ]
    }
  }
}
</script>
