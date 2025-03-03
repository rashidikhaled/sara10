<template>
  <td>
    <div class="text-center flex items-center justify-center"><span>{{dataItem.StartDate}} {{dataItem.StartTime}}</span></div>
  </td>
</template>

<script>
export default {
  name: 'KartableTaskStartDateTimeTemplate',
  props: {
    dataItem: Object
  }
}
</script>

<style scoped>

</style>
