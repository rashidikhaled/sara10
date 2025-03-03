<template>
  <fit>
    <safa-datatable
      v-model="value.Base_Front"
      helper="shahrsazi.pishamadegiha"
      m="r"
      :loadingAnimation="false"
      title="پیش آمدگیها"
      height="100%"
      max-height="100%"
      :bordered="false"
    ></safa-datatable>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  props: {
    value: Object,
    m: String
  },
  mounted () {
    this.items = this.value.Base_Front
  },
  watch: {
    value: function () {
      this.items = this.value.Base_Front
    }
  },
  methods: {
    rowUpdated (e) {
      this.value.Base_Front = e.gridItems
    },
    comboChanged (combo) {
      combo.dataItem.CI_UsingGroup = combo.CI_UsingGroup

      combo.dataItem.CI_UsingType = combo.CI_UsingType
    }
  }
}
</script>
