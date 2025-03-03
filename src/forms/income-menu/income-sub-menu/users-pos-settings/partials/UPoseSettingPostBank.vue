<template>
  <fit>
    <div class="row">
      <safa-text label=" پورت" class="col-12 q-mb-sm" v-model="value.port" cdcName="port" label-width="100px" dir="ltr"
        :maxlength="10" :m="m"></safa-text>
    </div>
    <div class="row">
      <safa-text label="آدرس پوز" :maxlength="25" class="col-12" v-model="value.poseAddress" cdcName="poseAddress"
        label-width="100px" :m="m"></safa-text>
    </div>
    <div class="row q-mt-sm">
      <safa-text label="آدرس سرویس  (Tomcat service)" class="col-12" :maxlength="300" v-model="value.serviceAddress"
        cdcName="serviceAddress" type="textarea" label-width="100px" :m="m"></safa-text>
    </div>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingPostBank',
  data () {
    return {
      // port: 0,
      // poseAddress: '',
      // serviceAddress: ''
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
