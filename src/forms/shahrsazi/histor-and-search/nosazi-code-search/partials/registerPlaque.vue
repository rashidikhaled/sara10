<template>
  <div class="row q-gutter-lg">
    <safa-text
      label="اصلی"
      ci-name="CI_RegisterPlackTypeGroup"
      domain-name="CI_SaraM1"
      v-model="Base_RegisterPlack_1.CI_RegisterPlackTypeGroup"
      class="col-12 col-lg-3 col-md-3 col-sm-3"
      cdcName="RegisterPlackTypeGroup"
    />
    <safa-text
      label="فرعی"
      ci-name="CI_RegisterPlackType"
      domain-name="CI_SaraM1"
      v-model="Base_RegisterPlack_1.CI_RegisterPlackType"
      class="col-12 col-lg-3 col-md-3 col-sm-3"
      cdcName="RegisterPlackType"
    />
    <safa-text
      label="قطعه"
      v-model="Base_RegisterPlack_1.RegisterPlackTypeValue"
      class="col-12 col-lg-3 col-md-3 col-sm-3"
      cdcName="RegisterPlackTypeValue"
    />
  </div>
</template>

<script>
export default {
  name: "registerPlaque",

  props: {
    m: String,
    Base_RegisterPlack_1: Object
  },
  updated () {
    this.$emit("baseRegisterPlack1", this.Base_RegisterPlack_1)
  }
}
</script>
