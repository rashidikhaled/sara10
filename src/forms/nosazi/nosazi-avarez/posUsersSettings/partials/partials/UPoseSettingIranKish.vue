<template>
  <div>
    <div class="row">
      <safa-text
        v-model="value.serialNo"
        :m="m"
        cdcName="serialNo"
        class="col-12"
        label=" سریال"
        :maxlength="50"
        label-width="80px"
      />
    </div>
    <div class="row q-my-sm">
      <safa-text
        v-model="value.terminal"
        :m="m"
        cdcName="terminal"
        class="col-12"
        label="ترمینال"
        :maxlength="25"
        label-width="80px"
      ></safa-text>
    </div>
    <div class="row">
      <safa-text
        v-model="value.receptive"
        :m="m"
        cdcName="receptive"
        class="col-12"
        label="پذیرنده"
        :maxlength="25"
        label-width="80px"
      />
    </div>

    <div class="row">
      <safa-text
        v-model="value.port"
        :m="m"
        cdcName="port"
        class="col-12 q-mt-sm"
        label="پورت"
        :maxlength="10"
        label-width="80px"
      ></safa-text>
    </div>
    <div class="row">
      <safa-text
        v-model="value.poseAddress"
        :m="m"
        cdcName="poseAddress"
        class="col-12 q-mt-sm"
        label="آدرس پوز"
        :maxlength="25"
        label-width="80px"
      ></safa-text>
    </div>
    <div class="row">
      <safa-text
        v-model="value.apiUrl"
        :m="m"
        cdcName="apiUrl"
        class="col-12 q-mt-sm"
        label="آدرس سرویس"
        :maxlength="300"
        label-width="80px"
      ></safa-text>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UPoseSettingIranKish',
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
