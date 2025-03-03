<template>
  <fit>
    <safa-grid
      v-model="loadResult"
      :allowMultipleSelection="false"
      :bordered="false"
      :clickable="true"
      :loadingAnimation="false"
      :m="m"
      :selectable="true"
      cdcName="baseEdgeInEffectDate"
      fit
      height="100%"
      helper="nosazi.baseEdgeInEffectDate"
      max-height="100%"
      title="جهات اربعه"
    >
    </safa-grid>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      loadResult: []
    }
  },
  props: {
    m: String
  }
}
</script>

<style lang="scss" scoped>
</style>
