<template>
          <FormControl>
        <safa-combo
        :label="getLabel"
        v-model="value.SelectedItem"
        cdcName="treeSelectedItem"
        label-width="80px"
        :m="mode"
        :ciName="value.CI"
        domainName="CI_SaraM1"
        />
        </FormControl>
</template>
<script>

export default {
  data: function () {
    return {
      name: 'UpriceComboIllustration'
    }
  },
  computed: {
    getLabel () {
      return this.value?.CICaption || ""
    }
  },
  props: {
    value: Object,
    mode: {
      type: String,
      default: 'r'
    },
    optionsArray: {
      type: Array,
      default: () => []
    }
  },
  methods: {
  }
}
</script>
