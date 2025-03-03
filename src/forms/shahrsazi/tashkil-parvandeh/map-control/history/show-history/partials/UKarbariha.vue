<template>
  <fit>
    <safa-grid
      ref="karbariha-grid"
      v-model="value.Base_Using"
      :loadingAnimation="false"
      helper="shahrsazi.karbariha"
      m="r"
      name="grid"
      seperator="vertical"
      title="کاربری های نقشه"
      :bordered="false"
      fit
    />
  </fit>
</template>

<script>
export default {
  name: 'karbariha',
  data () {
    return {
      items: []
    }
  },
  props: {
    value: Object,
    m: String
  },
  methods: {}
}
</script>
