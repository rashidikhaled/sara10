<template>
  <fit>
    <form-row>
      <safa-text
        v-model="value.poseAddress"
        :m="m"
        cdcName="poseAddress"
        class="col-12"
        label="آدرس پوز"
        :maxlength="25"
        label-width="100px"
      />
    </form-row>
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
