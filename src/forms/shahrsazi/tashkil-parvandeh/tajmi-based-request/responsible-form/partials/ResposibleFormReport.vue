<template>
  <fit>
    <safa-datatable
      helper="responsibleFormReport"
      v-model="taskLog"
      fit
      title="گزارشات"/>
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
