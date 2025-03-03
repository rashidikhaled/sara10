<template>
  <div>
    <div class="row">
      <safa-text
        label="آدرس پوز"
maxlength="25"
        class="col-12"
        v-model="value.poseAddress"
        cdcName="poseAddress"
        label-width="95px"
        :m="m"
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
      // poseAddress: ''
    }
  },
  props: {
    title: String,
    formKey: String,
    name: String,
    m: String,
    value: Object
  },
  methods: {}
}
</script>
