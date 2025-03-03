<template>
  <fit>
    <safa-datatable
      v-model="gridShahrsazi"
      cdcName="gridShahrsazi"
      title="سوابق شهرسازی ملک"
      :columns="buildingHistoryColumns"
      height="100%"
      max-height="100%"
      min-height="200px"
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
    gridShahrsazi: Array
  },
  data () {
    return {
      name: "BuildingHistory",
      buildingHistoryColumns: [
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
        {
          field: "CertificateNo",
          title: "شماره گواهي",
          width: "200px"
        },
        {
          field: "CertificateDate",
          title: "تاريخ گواهي",
          editor: "date",
          width: "200px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "200px"
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>
