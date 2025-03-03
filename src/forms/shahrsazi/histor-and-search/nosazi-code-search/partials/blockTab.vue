<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12 col-md-3 col-sm-4">
      <safa-text type="number" label="بلوک:" v-model="Base_NosaziCode1.Block" />
    </div>
    <div class="col-12 col-md-3 col-sm-4">
      <safa-text type="number" label="ملک:" v-model="Base_NosaziCode1.House" />
    </div>
  </div>
</template>

<script>
export default {
  name: "blockTab",

  props: {
    m: String,
    Base_NosaziCode1: Object,
    value: {
      type: Object,
      default: () => ({})
    },
    isGetData: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    resetSearch () {
      this.Base_NosaziCode1 = {}
    },
    onBaseNosaziCode1 () {
      this.$emit("onBaseNosaziCode1", this.Base_NosaziCode1)
    }
  },
  updated () {
    this.onBaseNosaziCode1()
  }
}
</script>
