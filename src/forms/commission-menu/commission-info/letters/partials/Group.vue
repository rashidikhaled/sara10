<template>
  <fit>
    <div>v</div>
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "Group"
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {},
    selectedChange (selectedItems) {
      this.selectedRows = selectedItems.selectedItems
    },
    accept () {},
    cancel () {
      this.$emit("reload")
    }
  }
}
</script>
