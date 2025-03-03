<template>
    <!-- <span class="ckrow__region">{{regionText}}</span> -->
    <span class="ckrow__region">{{params.data.CI_Region}}</span>
</template>

<script>
export default {
  name: 'RegionTemplate',
  data () {
    return {
      regionText: ''
    }
  },
  created () {
    this.getRegion()
  },
  methods: {
    getRegion () {
      this.$ci.getName({
        name: 'CI_Region',
        domain: 'Commission100',
        value: this.params.data.CI_Region
      }).then(data => {
        this.regionText = data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ckrow__region {
    background-color: #e6f0ff;
    border: 1px solid #ddd;
    color: #0067ff;
    min-width: 50px;
    padding: 0 0.375rem;
    white-space: nowrap;
    border-radius: 20px;
    text-align: center;
    font-size: 10px;

    body.body--dark & {
      background-color: var(--lighten2);
      border-color: var(--dark-border);
    }
  }
</style>
