<template>
    <fit>
          <safa-grid
            title="مشخصات عملیات حفاری"
            v-model="value.ClsRevisit_RequestService.RequestService_Operations"
            :columns="requestServiceOperationsColumns"
            :show-selected-checkbox="true"
            :allowMultipleSelection="false"
            :suppressRowClickSelection="false"
            :addRow="true"
            :deleteRow="false"
            :allowCopy="false"
            fit
            paginate
            cdcName="RequestService_Operations"
            m="r"
            height="100%"
            min-height="200px"
            max-height="100%"
          />
            </fit>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data ()
  {
    return {
      name: "DigInfoReviewEve",
      requestServiceOperationsColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_Section",
          title: "مقطع",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی معبر",
          width: "150px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_Diggings",
          title: "خاک برداری",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "Length",
          title: "طول",
          width: "100px"
        },
        {
          field: "Width",
          title: "عرض",
          width: "100px"
        },
        {
          field: "Depth",
          title: "عمق",
          width: "100px"
        },
        {
          field: "AsphaltLife",
          title: "عمر آسفالت",
          width: "100px"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          width: "150px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "170px"
        },
        {
          field: "CI_CrossType",
          title: "نوع معبر",
          width: "200px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CrossLength",
          title: "طول معبر",
          width: "200px"
        },
        {
          field: "DigLenghtExcess",
          title: "طول مازاد حفاری",
          width: "150px"
        },
        {
          field: "TrenchesWidthExcess",
          title: "عرضه مازاد ترانشه",
          width: "150px"
        },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکراری حفاری",
          width: "150px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CavalryWidth",
          title: "عرض محل حفاری",
          width: "150px"
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
