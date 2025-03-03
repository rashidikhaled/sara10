<template>
  <div>
    <div class="row">
      <safa-text
        label="آدرس پوز"
:maxlength="25"
        class="col-12 col-md-4"
        v-model="poseAddress"
        label-width="100px"
      ></safa-text>
    </div>
  </div>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingPostBank',
  data () {
    return {
      poseAddress: ''
    }
  },
  props: {
    m: String
  },
  methods: {}
}
</script>
