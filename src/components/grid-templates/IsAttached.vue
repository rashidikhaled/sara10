<template>
  <td :class="className">
    {{ dataItem.IsAttached ? 'بلی' : 'خیر'}}
  </td>
</template>

<script>
export default {
  name: 'IsAttached',
  props: {
    dataItem: Object,
    column: Object,
    className: String
  }
}
</script>

<style scoped>

</style>
