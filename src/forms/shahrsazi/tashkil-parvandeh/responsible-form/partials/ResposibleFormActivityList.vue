<template>
  <safa-tabs
    v-model="activeTab"
  >
    <template v-slot:tabs>
      <tab-menu label="لیست فعالیت های صورت گرفته" name="showActivityTab"/>
      <tab-menu label="گزارشات" name="showReportTab"/>
    </template>
    <tab-content :padding="false" name="showActivityTab">
      <ResponsibleFormActivity :processInfoResults="processInfoResults"/>
    </tab-content>
    <tab-content :padding="false" name="showReportTab">
      <ResposibleFormReport :processInfoResults="processInfoResults"/>
    </tab-content>
  </safa-tabs>
</template>
<script>
import ResponsibleFormActivity from '../partials/ResponsibleFormActivity'
import ResposibleFormReport from '../partials/ResposibleFormReport'

export default {
  data: function () {
    return {
      activeTab: 'showActivityTab'

    }
  },
  props: {
    processInfoResults: Object
  },
  components: {
    ResponsibleFormActivity,
    ResposibleFormReport
  }
}
</script>
