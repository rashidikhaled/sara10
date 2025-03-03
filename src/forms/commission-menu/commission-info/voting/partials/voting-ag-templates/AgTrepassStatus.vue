<template>
  <safa-combo2
    v-model="params.data.TrepassStatus"
    cdcName="TrepassStatus"
    ciName="CI_TrepassStatus"
    domainName="CI_SaraM1"
    :useInput="false"
    m="r"
  />
</template>

<script>
export default {
  name: "AgTrepassStatus",

  methods: {
    getValue () {
      return this.params.data.VoteType_S
    }
  }
}
</script>
