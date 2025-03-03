<template>
  <fit>
    <safa-grid
      v-model="value.RevisitRenewal_RequestService.RequestService_Operations"
      cdcName="RequestService_Operations"
      title="مدت و زمان اجرای عملیات حفاری (مجوز)"
      :columns="requestServiceOperationsColumns"
      height="100%"
      max-height="100%"
      min-height="180px"
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
    m: String,
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      requestServiceOperationsColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_Section",
          title: "مقطع",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی معبر",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_Diggings",
          title: "خاک برداری",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "Length",
          title: "طول",
          width: "80px"
        },
        {
          field: "Width",
          title: "عرض",
          width: "80px"
        },
        {
          field: "Depth",
          title: "عمق",
          width: "80px"
        },
        {
          field: "AsphaltLife",
          title: "عمر آسفالت",
          width: "100px"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "150px"
        },
        {
          field: "CI_CrossType",
          title: "نوع معبر",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CrossLength",
          title: "طول معبر",
          width: "150px"
        },
        {
          field: "DigLenghtExcess",
          title: "طول مازاد حفاری",
          width: "150px"
        },
        {
          field: "TrenchesWidthExcess",
          title: "عرض مازاد ترانشه",
          width: "100px"
        },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکرار حفاری",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CavalryWidth",
          title: "عرض معبر ",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ]
    }
  }
}
</script>
