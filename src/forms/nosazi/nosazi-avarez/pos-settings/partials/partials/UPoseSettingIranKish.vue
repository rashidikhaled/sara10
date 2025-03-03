<template>
  <div>
    <form-row>
      <safa-text v-model="value.serialNo"         :maxlength="50"
 :m="m" cdcName="serialNo" class="col-12" label=" سریال" label-width="100px" />
    </form-row>
    <div class="row q-my-sm">
      <safa-text v-model="value.terminal" :m="m" cdcName="terminal" class="col-12" label="ترمینال"
      :maxlength="25"
        label-width="100px" />
    </div>
    <form-row>
      <safa-text v-model="value.receptive" :maxlength="25" :m="m" cdcName="receptive" class="col-12" label="  پذیرنده"
        label-width="100px" />
    </form-row>

    <form-row>
      <safa-text v-model="value.port" :m="m" cdcName="port" class="col-12 q-mt-sm" label="پورت" :maxlength="10"
        label-width="100px" />
    </form-row>
    <form-row>
      <safa-text v-model="value.poseAddress" :m="m" cdcName="poseAddress" class="col-12 q-mt-sm" label="آدرس پوز"
        :maxlength="25" label-width="100px" />
    </form-row>
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
