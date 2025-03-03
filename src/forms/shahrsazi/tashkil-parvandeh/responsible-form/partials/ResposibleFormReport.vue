<template>
  <fit>
    <safa-datatable
      helper="responsibleFormReport"
      class="fit"
      :bordered="false"
      v-model="taskLog"
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
