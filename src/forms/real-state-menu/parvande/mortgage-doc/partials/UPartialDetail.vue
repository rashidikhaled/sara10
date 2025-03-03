<template>
  <fit>
    <safa-grid
      cdcName="MortgageDoc_MortgageProvider"
      title="مشخصات رهن دهنده"
      v-model="value.MortgageDoc_MortgageProvider"
      :columns="MortgageProviderColumns"
      fit
      class="q-mb-sm"
    />
    <safa-grid
      cdcName="MortgageDoc_CancelMortgage"
      title="مشخصات درخواست کننده فک رهن"
      v-model="value.MortgageDoc_CancelMortgage"
      :columns="CancelMortgageColumns"
      fit
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data () {
    return {
      title: "مشخصات طرفین",
      name: "UPartialDetail",
      MortgageProviderColumns: [
        {
          field: "CI_OwnerCharacter",
          title: "شخصیت"
        },
        { field: " FirstName", title: "نام" },
        { field: "LastName", title: "نام خانوادگی" },
        { field: "FatherName", title: "نام پدر" },
        { field: "IdCardNo", title: "شماره شناسنامه" },
        { field: "RegLocation", title: "محل صدور" },
        { field: "NationalCode", title: "کد ملی" },
        { field: "BirthDate", title: "تاریخ تولد", editor: "date" },
        { field: "ShareAreas", title: "سهم عرصه" },
        { field: "DongAreas", title: "دانگ عرصه" },
        { field: "Address", title: "آدرس" },
        { field: "TelNo", title: "تلفن" },
        { field: "SignerName", title: "نام امضاء کننده" },
        {
          field: "CI_ContractCompany",
          title: "کد شرکت/موسسه",
          domain: "Estate",
          editor: "combo"
        },
        { field: "RefrenceNo", title: "شماره معرفی نامه" }
      ],
      CancelMortgageColumns: [
        {
          field: "CancelMortgageRequesterRef",
          title: "مرجع درخواست کننده فک رهن"
        },
        {
          field: "RequestNo",
          title: "شماره درخواست"
        },
        {
          field: "RegisterPlackTypeValue",
          title: "تاریخ درخواست",
          editor: "date"
        },
        {
          field: "CI_MortgageDoc_CancelMortgageResult",
          title: "نتیجه",
          domain: "Estate",
          editor: "combo"
        }
      ]
    }
  }
}
</script>
