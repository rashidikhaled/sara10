<template>
  <span
    :style="`color: ${row.IsLaterDate ? '#de2209' : '#777'}`"
    :class="`ckg_later_title`"
  >
    <span style="width: 15px; display: inline-block">
      <q-icon size="15px" name="report_problem" v-if="row.IsLaterDate" />
      <q-icon size="15px" name="hourglass_top" v-else />
    </span>
    {{ row.LaterTime }} روز</span
  >
</template>

<script>
export default {
  name: "CKLaterTime",
  props: {
    row: Object
  }
}
</script>

<style scoped lang="scss">
.ck-row {
  .ckg_later_title {
    font-size: 11px;
    min-width: 58px;
  }
}
</style>
