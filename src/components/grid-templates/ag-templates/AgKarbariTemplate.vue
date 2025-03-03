<template>
    <span :class="`ckrow__badge text-teal-5 ${params.data.IsKarbari?'is__active':'not__active'}`">تغییر کاربری</span>
</template>

<script>
export default {
  name: 'AgKarbariTemplate'
}
</script>
<style lang="scss">
 .ckrow__badge {
    color: #1e95cb;
    min-width: 32px;
    padding: 0 4px;
    white-space: nowrap;
    font-size: 10px;
    border: 1px solid;
    line-height: normal;
    background-color: #fff;
    border-radius: 20px;
    text-align: center;
    position: relative;

    body.body--dark & {
      border-color: var(--dark-border);
      background-color: var(--dark);
      color: var(--dark-text-color);
    }

    &:before {
      content: '';
      width: 5px;
      height: 5px;
      display: inline-block;
      border-radius: 50px;
      background-color: currentColor;
      margin-right: 4px;
    }

    &.not__active {
      color: #777777 !important;
      opacity: .3;

      body.body--dark & {
        color: var(--dark-text-color) !important;
      opacity: .65;
      }
    }
  }
</style>
