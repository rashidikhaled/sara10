<template>
  <div>
    <div class="row">
      <safa-text label=" سریال"  :maxlength="50" class="col-12" v-model="value.serialNo" label-width="100px" :m="m" cdcName="serialNo" />
    </div>
    <div class="row q-my-sm">
      <safa-text label="ترمینال" :maxlength="25" class="col-12" v-model="value.terminal" label-width="100px" :m="m"
        cdcName="terminal"></safa-text>
    </div>
    <div class="row">
      <safa-text label="  پذیرنده" :maxlength="25" class="col-12" v-model="value.receptive" label-width="100px" :m="m"
        cdcName="receptive" />
    </div>

    <div class="row">
      <safa-text label="پورت" class="col-12 q-mt-sm" :maxlength="10" v-model="value.port" label-width="100px" :m="m"
        cdcName="port"></safa-text>
    </div>
    <div class="row">
      <safa-text label="آدرس پوز" :maxlength="25" class="col-12 q-mt-sm" v-model="value.poseAddress" label-width="100px"
        :m="m" cdcName="poseAddress"></safa-text>
    </div>
  </div>
</template>

<script>
export default {
  name: "UPoseSettingIranKish",
  data () {
    return {
      // receptive: '',
      // terminal: '',
      // port: '',
      // serialNo: '',
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
