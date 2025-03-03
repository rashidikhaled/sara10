<template>
  <fit>
    <div class="row">
      <safa-text
        label="آدرس پوز"
:maxlength="25"
        class="col-12"
        v-model="value.poseAddress"
        label-width="100px"
        :m="m"
        cdcName="poseAddress"
      ></safa-text>
    </div>
  </fit>
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
