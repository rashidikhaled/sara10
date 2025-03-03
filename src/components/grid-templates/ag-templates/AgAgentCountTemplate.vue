<template>
  <span class="ckrow__agentCount" :class="agentCountColor">
    {{ params.data.AgentCount }}
  </span>
</template>

<script>
export default {
  name: "AgAgentCountTemplate",

  computed: {
    agentCountColor () {
      let agentColor = "s0",
        count = this.params.data.AgentCount

      if (count === 0 || count === 2) agentColor = "s0"
      else if (count === 1) agentColor = "s1"
      else if (count === 3) agentColor = "s3"
      else agentColor = "s0"

      return `ckr__${agentColor}`
    }
  }
}
</script>
<style lang="scss" scoped>
.ckrow__agentCount {
  background-color: #fdf1d0;
  border: 1px solid #fdf1d0;
  color: #a17704;
  min-width: 50px;
  width: 50px;
  padding: 0 1.625rem;
  white-space: nowrap;
  border-radius: 20px;
  text-align: center;
  font-size: 10px;

  body.body--dark & {
    background-color: var(--lighten3);
    border-color: var(--dark-border);
  }

  &.ckr__more {
    background-color: #ffe8e6;
    color: red;

    body.body--dark & {
      background-color: var(--lighten2);
      color: var(--dark-text-color);
    }
  }

  &.ckr__s0,
  &.ckr__s2 {
    background-color: white;
    border-color: #ddd;

    body.body--dark & {
      background-color: var(--dark);
    }
  }

  &.ckr__s1 {
    background-color: #fe6062;
    border-color: #fe6062;
    color: white;

    body.body--dark & {
      background-color: darken(rgba(#f78484, 0.25), 15%);
    }
  }

  &.ckr__s3 {
    background-color: #fba300b5;
    border-color: #fba300b5;
    color: white;

    body.body--dark & {
      background-color: darken(rgba(#fba300, 0.25), 10%);
    }
  }
}
</style>
