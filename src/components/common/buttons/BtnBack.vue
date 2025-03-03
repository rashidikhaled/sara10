<template>
  <btn-base
    v-bind="$attrs"
    v-on="$listeners"
    customClass="btn--back"
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
      default: 'بازگشت'
    },
    spId: String,
    spCaption: String
  }
}
</script>
<style lang="scss">
  .btn--back {
    background-color: #1976d2;
    color: #fff;
    border: 1px solid #1976d2;
        &:hover {
            opacity: .9;
        }
  }

</style>
