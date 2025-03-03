<template>
  <div class="sec-title">
    <h2>
      <span
        ><slot>{{ title }}</slot></span
      >
    </h2>
  </div>
</template>
<script>
export default {
  props: ['title']
}
</script>
<style lang="scss">
.sec-title {
  margin-bottom: 20px;
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: normal;
    color: #232425;
  }
}
</style>
