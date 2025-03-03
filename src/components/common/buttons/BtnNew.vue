<template>
  <btn-base
    v-bind="$attrs"
    v-on="$listeners"
    customClass="btn--new"
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
      default: 'جدید'
    },
    spId: String,
    spCaption: String
  }
}
</script>
<style lang="scss">
.btn--new{
  background: var(--q-color-secondary);
  color: #fff;
  border-color: var(--q-color-secondary);
}
</style>
