<template>
  <safa-select
    v-model="selectionValue"
    source-type="local"
    :useInput="false"
    :hideOnDisabled="true"
    :m="selection_SelectionMode"
    :options="[
      { ID: 0, Title: 'همه' },
      { ID: 1, Title: 'هیچکدام' },
      { ID: 2, Title: 'معکوس' },
    ]"
    @input="selection_SelectionChanged"
    class="full-width"
  />
</template>

<script>
export default {
  name: "AgBtnMaxPenalty",

  data () {
    return {
      selectionValue: 0
    }
  },

  computed: {
    selection_SelectionMode: {
      get () {
        return this.params.selection_SelectionMode
      }
    }
  },

  methods: {
    selection_SelectionChanged ($event) {
      this.params.selection_SelectionChanged($event)
    }
  }
}
</script>
