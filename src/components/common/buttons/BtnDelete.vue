<template>
  <btn-base
    v-bind="$attrs"
    v-on="$listeners"
    customClass="btn--delete"
    :spId="spId"
    :spCaption="spCaption"
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
      default: 'حذف'
    },
    spId: String,
    spCaption: String
  }
}
</script>
<style lang="scss">
.btn--delete{
  color: #444 !important;
  border-color: #cdc8be;
  background-color: #dfdbd3;
}
</style>
