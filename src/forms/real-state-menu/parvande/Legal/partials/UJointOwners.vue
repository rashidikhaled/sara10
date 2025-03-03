<template>
  <fit>
    <safa-grid
      v-model="value.Legal_OwnerShare"
      fit
      paginate
      max-height="100%"
      height="100%"
      minHeight="100%"
      :addRow="true"
      :suppressRowClickSelection="false"
      :deleteRow="false"
      :allowCopy="false"
      :columns="LegalOwnercolumn"
      :m="m"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    m: String,
    value: Object
  },
  data () {
    return {
      name: "row",
      Title: "مالکین مشاعی",
      LegalOwnercolumn: [
        {
          headerName: "Row",
          valueGetter: "node.rowIndex + 1",
          width: '80px',
          title: "ردیف"
        },
        {
          field: "CI_OwnerCharacter",
          title: "شخصیت",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "OwnerName",
          title: "نام مالک",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "OwnerFatherName",
          title: "نام پدر",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "IdCardNo",
          title: "شماره شناسنامه",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "EmissionPlace",
          title: "محل صدور",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "NationalCode",
          title: "کد ملی",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "ShareAreas",
          title: "سهم",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "TransferDate",
          title: "تاریخ انتقال",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "TotalShare",
          title: "سهم کل",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "TotalArea",
          title: "مساحت کل",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "BuyArea",
          title: "مساحت خریداری شده",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "IsOther",
          title: "نمایش از سایر درخواستها",
          domain: "Estate",
          editor: "combo"
        }
      ]
    }
  }
}
</script>
