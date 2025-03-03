<template>
    <fit>
      <safa-grid
        title="مدت و زمان اجرای عملیات حفاری (تمدید)"
        v-model="value.ClsExportLicense"
        :columns="exportLicenseColumn"
        :suppressRowClickSelection="false"
        fit
        paginate
        cdcName="License_Person"
        m="r"
      />
    </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      exportLicenseColumn: [
        {
          title: "تاریخ شروع",
          field: "StartDateExtension",
          editor: "date"
        },
        {
          title: "تاریخ اتمام",
          field: "EndDateExtension",
          editor: "date"
        },
        {
          title: "علت تمدید",
          field: "CI_CauseRenewal",
          editor: "combo",
          domain: "dig"
        },
        {
          title: "تاخیرات مجاز(روز)",
          field: "Delay"
        },
        {
          title: "مدت (روز)",
          field: "Duration"
        },
        {
          title: "توضیحات",
          field: "Description"
        }
      ]
    }
  }
}
</script>
