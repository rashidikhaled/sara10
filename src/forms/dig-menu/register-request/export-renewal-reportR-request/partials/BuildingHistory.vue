<template>
  <fit>
    <safa-grid
      v-model="gridShahrsazi"
      :columns="ExecutiveSpecificationColumns"
      paginate
      class="q-ma-sm"
      cdcName="BuildingHistoryList"
      m="r"
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    model2: Object,
    gridShahrsazi: Array,
    value: Object
  },
  components: {},
  data () {
    return {
      ExecutiveSpecificationColumns: [
        {
          field: "EumShahrsaziArchiveGroup",
          title: "گروه سوابق شهرسازی",
          editor: "combo",
          domain: "Estate"
        },
        {
          field: "CI_ShahrsaziArchiveKind",
          title: "نوع سوابق شهرسازی",
          editor: "combo",
          domain: "Estate"
        },
        { field: "CertificateNo", title: "شماره گواهی" },
        { field: "CertificateDate", title: "تاریخ گواهی" },
        { field: "Comments", title: "توضیحات" }
      ]
    }
  },
  methods: {}
}
</script>
