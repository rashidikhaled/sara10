<template>
  <btn-base
    v-bind="$attrs"
    v-on="$listeners"
    customClass="btn--default"
    :spId="spId"
    :spCaption="spCaption"
  >
    <slot>{{ label }}</slot>
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
      default: ''
    },
    spId: String,
    spCaption: String
  }
}
</script>
<style lang="scss">
.btn--default {
  background-color: #d9e5f1;
  border: 1px solid #a6b5c5;
  font-weight: 500;
  color: #223140;

  body.body--dark & {
    background-color: var(--lighten3);
    border-color: var(--dark-border);
    color: var(--dark-text-color);
  }
}

/*background-color: #d9dee3;
border: 1
px
solid #b8c0c9;
color: #415b74;*/
.btn--default:hover {
}
</style>
