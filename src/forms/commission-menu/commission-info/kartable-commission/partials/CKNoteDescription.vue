<template>
  <span
    style="width: 15px; display: inline-block; color: var(--q-color-primary)"
  >
    <q-icon
      size="15px"
      name="comment"
      v-if="row.HasComments"
      @click="$emit('showNote')"
    />
  </span>
</template>

<script>
export default {
  name: "CKNoteDescription",
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
