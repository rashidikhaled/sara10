<template>
  <fit>
    <div class="row">
      <safa-text
        label=" سریال"
        class="col-12 "
        v-model="value.serialNo"
        :maxlength="50"
        cdcName="serialNo"
        label-width="95px"
        :m="m"
      />
    </div>
    <div class="row q-my-sm">
      <safa-text
        label="ترمینال"
        class="col-12"
        :maxlength="25"
        v-model="value.terminal"
        cdcName="terminal"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div>
    <div class="row">
      <safa-text
        label="پذیرنده"
        :maxlength="25"
        class="col-12"
        v-model="value.receptive"
        cdcName="receptive"
        label-width="95px"
        :m="m"
      />
    </div>

    <div class="row">
      <safa-text
        label="پورت"
        class="col-12 q-mt-sm"
        v-model="value.port"
        cdcName="port"
        label-width="95px"
        :maxlength="10"
        :m="m"
      ></safa-text>
    </div>
       <div class="row">
      <safa-text
        label="آدرس پوز"
 :maxlength="25"
        class="col-12 q-mt-sm"
        v-model="value.poseAddress"
        cdcName="poseAddress"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div>
  </fit>
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
