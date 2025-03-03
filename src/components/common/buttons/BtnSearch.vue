<template>
  <btn-base
    v-bind="$attrs"
    v-on="$listeners"
    :customClass="`btn--search${flat?' is-flat':''}`"
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
      default: 'جستجو'
    },
    spId: String,
    spCaption: String,
    flat: Boolean
  }
}
</script>
<style lang="scss">
  .btn--search {
    &:not(.is-flat) {
      background-color: #7ea2c7;
      border-color: #6084a9;
      color: #fff;
    }
    &.is-flat {
      border: none;
      color: #7ea2c7;

      &:hover .q-focus-helper {
        background-color: darken(#7ea2c7,5%);
      }
    }
  }
</style>
