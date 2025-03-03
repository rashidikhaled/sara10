<template>
  <fit>
    <safa-grid
      title="مشخصات عملیات حفاری"
      v-model="value.ClsRequestService_Info.RequestService_Operations"
      :columns="ExecutiveSpecificationColumns"
      fit
      spId="75456489-4318-444b-816f-4d3c12345ghf"
      paginate
      cdcName="Request_Operations"
      m="r"
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    value: Object
  },
  components: {},
  data () {
    return {
      ExecutiveSpecificationColumns: [
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
          width: "100px",
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
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ],
      splitterValue: 50
    }
  },
  methods: {}
}
</script>
