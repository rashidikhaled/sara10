<template>
  <form-wrapper title="راهنمای تاریخچه و جستجو" :padding="false">
    <fit>
      <embed
        src="help/05HelpHistory.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
        min-height="100px"
        max-height="100%"
        title="راهنمای تاریخچه و جستجو"
        fit
      />
    </fit>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  route: 'history-and-search/help',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'راهنمای تاریخچه و جستجو',
      formKey: 'AD85356A-E66C-452C-B5DE-D76FE2CE7580',
      name: 'UHistoryAndSearchHelp',
      main: true
    }
  }
}
</script>
