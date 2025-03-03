<template>
  <div class="row">
    <safa-text
      label="کد قدیم"
      v-model="Base_PreCodeInfo.PreCode"
      class="col-12 col-lg-3 col-md-3"
      cdcName="PreCode"
    />
  </div>
</template>

<script>
export default {
  name: "preCode",

  props: {
    m: String,
    Base_PreCodeInfo: Object
  },
  updated () {
    this.$emit("basePreCodeInfo", this.Base_PreCodeInfo)
  }
}
</script>
