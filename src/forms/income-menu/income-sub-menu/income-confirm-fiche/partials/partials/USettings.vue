<template>
  <section class="UWaitListSendToReviewer">
    <section padding>
      <div class="row q-col-gutter-md">
        <div class="col-12">
      <safa-checkbox
      label="خودکارسازی عملیات فیش درآمد از صدور تا چاپ"
      :m="m"
      v-model="automationFicheProcess"
    ></safa-checkbox>
        </div>
      </div>
    </section>
  </section>
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
