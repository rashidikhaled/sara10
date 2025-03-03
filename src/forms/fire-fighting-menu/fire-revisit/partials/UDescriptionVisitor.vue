<template>
  <text-template label="توضیحات" v-model="value.Plan_Details" />
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "UDescriptionVisitor",
  mixins: [baseFormMixin],

  data () {
    return {}
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
