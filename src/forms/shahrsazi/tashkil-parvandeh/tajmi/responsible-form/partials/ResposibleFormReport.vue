<template>
  <fit>
    <safa-datatable
     helper="responsibleFormReport"
     v-model="taskLog"
      title="گزارشات"
      fit
      height="100%"
      :bordered="false"/>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      taskLog: [
        {
          ReportTitle: 'توضیحات درخواست'

        }
      ]
    }
  },
  props: {
    processInfoResults: Object
  }
}
</script>
