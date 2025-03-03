<template>
  <btn-base
    v-bind="$attrs"
    v-on="$listeners"
    customClass="btn--edit"
    :spId="spId"
    :spCaption="spCaption"
    :formId="formId"
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
      default: 'ویرایش'
    },
    spId: String,
    spCaption: String,
    formId: String
  }
}
</script>
<style lang="scss">
.btn--edit{
  border:1px solid #ffa000;
  background-color: var(--q-color-warning);
  color: #fff;
  border: 1px solid var(--q-color-warning);
}
</style>
