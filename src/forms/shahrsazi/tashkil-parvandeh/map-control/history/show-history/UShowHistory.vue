<template>
  <fit>
    <UMapControlTabs :results="results" :m="mode" />
  </fit>
</template>

<script>
import UMapControlTabs from "./UMapControlTabs"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  components: {
    UMapControlTabs
  },
  props: {
    results: Object
  }
}
</script>
