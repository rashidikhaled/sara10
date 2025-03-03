<template>
  <fit>
    <safa-grid
      title="مشخصات عملیات حفاری"
      min-height="250px"
      height="100%"
      paginate
      :pageSize="20"
      :suppressRowClickSelection="false"
      fit
      :columns="requestServiceOperationsColumns"
      v-model="value.RequestService_Operations"
      cdcName="RequestService_Operations"
      m="r"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      requestServiceOperationsColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_Section",
          title: "مقطع",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی معبر",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_Diggings",
          title: "خاک برداری",
          editor: "combo",
          domain: "Dig",
          width: "120px"
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
          width: "120px"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "120px"
        },
        {
          field: "CI_CrossType",
          editor: "combo",
          domain: "Dig",
          title: "نوع معبر",
          width: "120px"
        },
        {
          field: "CrossLength",
          title: "طول معبر",
          width: "120px"
        },
        {
          field: "DigLenghtExcess",
          title: "طول مازاد حفاری",
          width: "120px"
        },
        {
          field: "TrenchesWidthExcess",
          title: "عرض مازاد ترانشه",
          width: "120px"
        },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکرار حفاری",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CavalryWidth",
          title: "عرض محل حفاری ",
          width: "120px"
        },
        { field: "Description", title: "توضیحات", width: "auto" }
      ]
    }
  }
}
</script>
