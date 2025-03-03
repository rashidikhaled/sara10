<template>
  <btn-base
    v-bind="$attrs"
    v-on="$listeners"
    customClass="btn--save"
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
      default: 'ذخیره'
    },
    spId: String,
    spCaption: String
  }
}
</script>
<style lang="scss">
.btn--save {
  background-color: var(--q-color-positive);
  border-color: var(--q-color-positive);
  color: #fff;
}
</style>
