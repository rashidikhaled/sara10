<template>
  <div
    title="تاریخ رای"
    class="flex items-center"
    dir="ltr"
    v-if="row.VoteDate"
    style="min-width: 74px; text-align: left; white-space: nowrap"
  >
    <q-icon size="xs" color="grey" name="balance" />&nbsp;<span
      style="font-size: 11px; line-height: 1; padding-top: 3px"
      >{{ row.VoteDate }}</span
    >
  </div>
</template>

<script>
export default {
  name: "VoteDate",
  props: {
    row: Object
  }
}
</script>

<style scoped></style>
