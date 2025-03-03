<template>
    <span class="ckrow__priority"
                :class="priorityText==='آنی' || priorityText==='فوری'?'ckr__urgent':''">{{ priorityText }}</span>
</template>

<script>
export default {
  name: 'AgPriorityTemplate',
  data () {
    return {
      priorityText: ''
    }
  },
  created () {
    this.getPriority()
  },
  methods: {
    getPriority () {
      this.$ci.getName({
        name: 'CI_CommissionPriority',
        domain: 'Commission100',
        value: this.params.data.CI_CommissionPriority
      }).then(data => {
        this.priorityText = data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .ckrow__priority {
    background-color: #fdf1d0;
    border: 1px solid #fdf1d0;
    color: #a17704;
    min-width: 50px;
    padding: 0 0.375rem;
    white-space: nowrap;
    border-radius: 20px;
    text-align: center;
    font-size: 10px;

    body.body--dark & {
      background-color: var(--lighten3);
      border-color: var(--dark-border);
    }

    &.ckr__urgent {
      background-color: #ffe8e6;
      color: red;

      body.body--dark & {
        background-color: var(--lighten2);
        color: var(--dark-text-color);
      }
    }
  }
</style>
