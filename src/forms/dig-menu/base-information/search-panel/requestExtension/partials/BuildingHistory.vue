<template>
  <fit>
    <safa-grid
      v-model="buildingHistory"
      cdcName="buildingHistory"
      title="سوابق شهرسازی ملک و تایید درخواست"
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
    m: String,
    value: Object,
    rowSelectData: Object
  },
  data () {
    return {
      buildingHistory: [],
      buildingHistoryColumns: [
        {
          field: "EumShahrsaziArchiveGroup",
          title: "گروه سوابق شهرسازی",
          width: "200px"
        },
        {
          field: "CI_ShahrsaziArchiveKind",
          title: "نوع سوابق شهرسازي",
          width: "200px",
          editor: "combo",
          domain: "Dig"
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
          width: "auto"
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>
