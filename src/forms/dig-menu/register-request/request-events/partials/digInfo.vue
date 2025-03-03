<template>
  <fit>
    <safa-grid
      v-model="value.ClsRequestService_Info.RequestService_Operations"
      cdcName="RequestService_Operations"
      title="مشخصات عملیات حفاری"
      :columns="digOperationInfoColumns"
      paginate
      :m="m"
      fit
      :defaultNewRow="defaultNewRow"
      required
      validations="required"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: "e"
    }
  },

  data () {
    return {
      name: "digInfo",

      digOperationInfoColumns: [
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
          width: "120px",
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
          width: "120px"
        },
        {
          field: "Depth",
          title: "عمق",
          validations: "required",
          width: "80px"
        },
        { field: "Description", title: "توضیحات", width: "auto" }
      ],
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
      }
    }
  }
}
</script>
