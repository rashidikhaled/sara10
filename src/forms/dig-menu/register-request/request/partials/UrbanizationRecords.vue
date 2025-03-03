<template>
  <fit>
    <safa-grid
      title="لیست سوابق شهرسازی ملک و تایید درخواست"
      v-model="gridShahrsazi"
      cdcName="gridShahrsazi"
      :columns="UrbanizationRecordsColumns"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      fit
      m="r"
      paginate

      />
    </fit>
  </template>

<script>
export default {
  props: {
    value: Object,
    gridShahrsazi: Array
  },
  data () {
    return {
      UrbanizationRecordsColumns: [
        {
          field: "CI_ShahrsaziArchiveGroup",
          title: "گروه سوابق شهرسازی",
          width: "200px",
          editor: "combo",
          ignoreCi: true,
          source: [
            { ID: "1", Title: 'پروانه' },
            { ID: "2", Title: 'پایانکار' },
            { ID: "3", Title: 'عدم خلاف' },
            { ID: "4", Title: 'پاسخ استعلام' },
            { ID: "5", Title: 'مجوز خدماتی' },
            { ID: "6", Title: 'املاک' }
          ]
        },
        {
          field: "CI_ShahrsaziArchiveKind",
          title: "نوع سوابق شهرسازي",
          width: "200px",
          editor: "combo",
          domain: "Estate"
        },
        { field: "CertificateNo", title: "شماره گواهی" },
        { field: "CertificateDate", title: "تاریخ گوهی", editor: "date" },
        { field: "Comments", title: "توضیحات" }
      ],
      Base_ShahrsaziArchive: []
    }
  },
  methods: {}
}
</script>
