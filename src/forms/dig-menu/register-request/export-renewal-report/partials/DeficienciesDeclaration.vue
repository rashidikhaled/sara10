<template>
    <fit>
      <safa-datatable
        v-model="value.DeliveryDefectList"
        :columns="DeliveryDefectsColumns"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        fit
        paginate
        cdcName="DeliveryDefectList"
        m="r"
      />
    </fit>
  </template>

<script>
export default {
  props: {
    formKey: String,
    title: String,
    name: String,
    value: Object

  },
  data () {
    return {
      DeliveryDefectsColumns: [

        {
          field: "IsDeficiencies",
          title: "رفع نقص",
          domain: "Dig",
          editor: "checkbox"
        },
        {
          field: "CI_DefectsSubject",
          title: "عنوان",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "Description",
          title: "توضیحات کارشناسی"
        },
        {
          field: "DescCompany",
          title: "توضیحات شرکت خدماتی"
        },
        {
          field: "Place",
          title: "مکان نقص"
        }

      ]
    }
  },
  methods: {}
}
</script>
