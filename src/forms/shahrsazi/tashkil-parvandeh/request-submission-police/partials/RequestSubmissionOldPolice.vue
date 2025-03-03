<template>
  <fit>
    <safa-datatable
      v-model="allRequestListResults.AllRequestList"
      ref="grid2"
      helper="requestSubmissionOld"
      fit
      :bordered="false"
      max-height="100%"
      height="100%"
      title="درخواست های قبلی پلیس ساختمان"
      :allowMultipleSelection="true"
    >
    </safa-datatable>
  </fit>
</template>
<script>
export default {
  computed: {
    mode: function () {
      return this.isEditable ? 'e' : 'r'
    }
  },
  props: {
    allRequestListResults: {}
  },
  methods: {},
  mounted () {}
}
</script>
