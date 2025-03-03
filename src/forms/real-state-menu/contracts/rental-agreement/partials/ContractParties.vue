<template>
    <fit>
      <safa-grid
        v-model="value.ContractRent_ContractParties"
        fit
        height="100%"
        max-height="100%"
        min-height="100%"
        :suppressRowClickSelection="false"
        paginate
        :columns="Termscolumns"
        :m="m"
      />
    </fit>
</template>

<script>
export default {
  props: {
    formKey: String,
    title: String,
    name: String,
    m: String,
    value: Object
  },
  data () {
    return {
      // variables
      activeTab: "RentalAgreementDetails",

      // grids
      Termscolumns: [
        {
          field: "CI_OwnerCharacter",
          title: "شخصیت",
          width: "",
          editor: "combo",
          domain: "Estate"
        },
        {
          field: "OwnerLastName",
          title: "نام خانوادگی/شخصیت حقوقی",
          width: ""
        },
        { field: "OwnerName", title: "نام مالک", width: "" },
        { field: "OwnerFatherName", title: "نام پدر/کد سازمانی", width: "" },
        { field: "IdCardNo", title: "شماره شناسنامه/شماره ثبت", width: "" },
        { field: "EmissionPlace", title: "محل صدور", width: "" },
        { field: "NationalCode", title: "کدملی", width: "" },
        { field: "BirthDate", title: "تاریخ تولد", width: "" },
        { field: "ShareAreas", title: "سهم عرصه", width: "" },
        { field: "DongAreas", title: "دانگ عرصه", width: "" },
        { field: "TelNo", title: "تلفن", width: "" },
        { field: "Address", title: "آدرس", width: "" },
        { field: "SignerName", title: "نام امضا کننده", width: "" },
        {
          field: "CI_ContractCompany",
          title: "کد شرکت/موسسه",
          width: "",
          editor: "combo",
          domain: "Estate"
        },
        { field: "ReferenceNo", title: "شماره معرفی نامه", width: "" }
      ]
    }
  }
}
</script>
