<template>
  <div>
    <safa-checkbox
      label="خودکارسازی عملیات فیش درآمد از صدور تا چاپ"
      :m="m"
      v-model="automationFicheProcess"
    ></safa-checkbox>
  </div>
</template>

<script>
export default {
  data () {
    return {
      automationFicheProcess: false
    }
  },
  props: {
    m: String
  }
}
</script>
