<template>
  <btn-base
    v-bind="$attrs"
    v-on="$listeners"
    customStyle="border:1px solid #ccc;background-color: #e9e9e9; color: #565656; border: 1px solid #d3d3d3;"
    customClass="btn--cancel"
  >
    <slot>{{label}}</slot>
  </btn-base>
</template>
<script>
import BtnBase from './BtnBase'
export default {
  components: {
    'btn-base': BtnBase
  },
  props: {
    label: {
      type: String,
      default: 'انصراف'
    },
    spId: String,
    spCaption: String
  }
}
</script>
<style lang="scss">
.btn--cancel{
}
</style>
