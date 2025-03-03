<template>
  <fit>
    <safa-grid
      title="مشخصات عملیات حفاری"
      min-height="250px"
      height="100%"
      paginate
      :m="m"
      fit
      :defaultNewRow="defaultNewRow"
      :columns="requestServiceOperationsColumns"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      v-model="value.ClsRequestService_Info.RequestService_Operations"
      required
      validations="required"
      cdcName="RequestService_Operations"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      name: "SpecificationsOperations",
      defaultNewRow: {
        CI_Phase: 2,
        CI_Section: 2,
        CI_DigType: 0,
        CI_MaterialsType: 0,
        CI_Diggings: 0,
        CI_PathType: 0,
        Width: null,
        Length: null,
        Depth: null,
        Description: ""
      },
      requestServiceOperationsColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          editor: "combo",
          domain: "Dig",
          width: "120px",
          validations: "required"
        },
        {
          field: "CI_Section",
          title: "مقطع",
          editor: "combo",
          domain: "Dig",
          width: "120px",
          validations: "required"
        },
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          editor: "combo",
          domain: "Dig",
          width: "120px",
          validations: "required"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی معبر",
          editor: "combo",
          domain: "Dig",
          width: "160px",
          validations: "required"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          editor: "combo",
          domain: "Dig",
          width: "120px",
          validations: "required"
        },
        {
          field: "CI_Diggings",
          title: "خاک برداری",
          editor: "combo",
          domain: "Dig",
          width: "120px",
          validations: "required"
        },
        {
          field: "Length",
          title: "طول",
          validations: "required",
          width: "80px"
        },
        {
          field: "Width",
          title: "عرض",
          validations: "required",
          width: "80px"
        },
        {
          field: "Depth",
          title: "عمق",
          validations: "required",
          width: "80px"
        },
        { field: "Description", title: "توضیحات", width: "auto" }
      ]
    }
  }
}
</script>
