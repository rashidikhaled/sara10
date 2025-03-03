<template>
  <div>
    <safa-text label=" سریال" :maxlength="50" v-model="value.serialNo" label-width="100px" :m="m" cdcName="serialNo" />
    <safa-text label="ترمینال" :maxlength="25" class="q-my-sm" v-model="value.terminal" label-width="100px" :m="m"
      cdcName="terminal"></safa-text>
    <safa-text label="  پذیرنده" :maxlength="25" v-model="value.receptive" label-width="100px" :m="m" cdcName="receptive" />
    <safa-text label="پورت" class="q-mt-sm" :maxlength="10" v-model="value.port" label-width="100px" :m="m"
      cdcName="port"></safa-text>
    <safa-text label="آدرس پوز" :maxlength="25" class="q-mt-sm" v-model="value.poseAddress" label-width="100px" :m="m"
      cdcName="poseAddress"></safa-text>
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
