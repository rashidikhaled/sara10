<template>
  <td style="text-align: center !important" :style="backgroundColor && `background: ${backgroundColor}`">
    <input :value="dataItem[field]" readonly class="request-num text-center" onclick="this.select()" type="text"/>
  </td>
</template>

<script>
export default {
  name: 'request-number-template',
  props: {
    dataItem: Object,
    field: String
  },
  computed: {
    backgroundColor () {
      return this.dataItem['BackgroundColor'] || ''
    }
    // textColor(){
    //   return this.backgroundColor !== 'transparent' ? '#2e629c':''
    // }
  }
}
</script>

<style lang="scss">
.request-num {
  display: inline-block;
  font-size: 15px;
  letter-spacing: 1px;
  color: #2e629c;
  position: relative;
  max-width: 100%;
  border: none;
  border-top-width: initial;
  background: none;

  body.body--dark & {
    color: var(--dark-text-color);
  }
}
</style>
