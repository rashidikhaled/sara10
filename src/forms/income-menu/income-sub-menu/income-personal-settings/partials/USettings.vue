<template>
  <fit>
    <div class="row">
      <safa-checkbox
        label="خودکارسازی عملیات فیش درآمد از صدور تا چاپ"
        :m="m"
        v-model="value.automationFicheProcess"
        cdcName="automationFicheProcess"
      />
    </div>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      name: "USettings"
    }
  },
  props: {
    m: String,
    value: Object
  }
}
</script>
