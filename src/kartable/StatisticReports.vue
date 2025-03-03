<template>
  <form-wrapper :padding="false" fullscreen :title="title" hide-close vertical>
    <fit>
      <SRMain />
    </fit>
  </form-wrapper>
</template>

<script>
export default {
  data () {
    return {
      title: "گزارشات آماری",
      name: "StatisticReports",
      formKey: "86FCC7AA-E0DD-4A55-ADEB-DE7FCF8DDE62", // آیدی که داخل سکوریتی قدیم تهران مشخص شده
      main: true
    }
  },
  created () {
    this.formKey = window.getConfigValue(
      "StatisticReports.ID",
      "86FCC7AA-E0DD-4A55-ADEB-DE7FCF8DDE62"
    )
  }
}
</script>
<style lang="scss">
:root {
  --SR-sidebar-search-padding: 0 14px !important;
}

.q-mini-drawer-hide {
  top: 8px !important;
}

.SR-sidebar-wrapper {
  padding-top: 10px;

  .q-field__native,
  .q-field__input {
    font-size: 13px;
  }
}
</style>
