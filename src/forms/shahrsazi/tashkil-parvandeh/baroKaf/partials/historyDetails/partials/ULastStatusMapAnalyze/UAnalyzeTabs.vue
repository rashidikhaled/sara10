<template>
    <safa-tabs
      v-model="activeTabMpa"
      height="100%"
      type="fixed"
      ref="analyzeTabs"
    >
      <template v-slot:tabs>
        <tab-menu
          name="mojaverin"
          label="مجاورین"
        />

        <tab-menu
          name="deeps"
          label="عمق ها"
        />
      </template>
      <tab-content name="mojaverin" title="مجاورین">
        <UMojaverin />
      </tab-content>

      <tab-content name="deeps" title="عمق ها">
        <UDeeps />
      </tab-content>
    </safa-tabs>
</template>

<script>
import UMojaverin from './partials/UMojaverin'
import UDeeps from './partials/UDeeps'

export default {
  name: 'baro-kaf',
  title: 'برو کف',
  components: {
    UMojaverin,
    UDeeps
  },
  mounted () {
    this.$refs.analyzeTabs.changeTab('mojaverin')
  },
  data () {
    return {
      activeTabMpa: 'mojaverin'
    }
  }
}
</script>
