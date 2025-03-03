<template>
  <div class="full-height">
    <safa-tabs v-model="activeTab" :padding="false">
      <template v-slot:tabs>
        <tab-menu
          name="showActivityTab"
          label="لیست فعالیت های صورت گرفته"
        />
        <tab-menu
          name="showReportTab"
          label="گزارشات"
        />
      </template>
      <tab-content name="showActivityTab">
        <ResponsibleFormActivity :processInfoResults="processInfoResults" />
      </tab-content>
      <tab-content name="showReportTab">
        <ResposibleFormReport :processInfoResults="processInfoResults" />
      </tab-content>

    </safa-tabs>

  </div>
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
