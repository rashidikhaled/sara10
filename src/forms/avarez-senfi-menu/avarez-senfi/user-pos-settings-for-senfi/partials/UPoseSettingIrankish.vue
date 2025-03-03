<template>
  <div>
    <div class="row">
      <safa-text
        label="پورت"
        class="col-12"
        v-model="value.port"
        cdcName="port"
        :maxlength="10"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div>
    <div class="row q-my-sm">
      <safa-text
        label="کد پایانه"
        class="col-12"
        v-model="value.terminalCode"
        cdcName="terminalCode"
        label-width="95px"
        :maxlength="25"
        :m="m"
      ></safa-text>
    </div>
    <div class="row">
      <safa-text
        label=" شماره پذیرنده"
        class="col-12"
        :maxlength="25"
        v-model="value.receptive"
        cdcName="receptive"
        label-width="95px"
        :m="m"
      />
    </div>
    <div class="row">
      <safa-text
        label="شماره سریال"
        class="col-12 q-mt-sm"
        v-model="value.serialNo"
        cdcName="serialNo"
        :maxlength="50"
        label-width="95px"
        :m="m"
      />
    </div>

  </div>
</template>

<script>

export default {
  name: 'UPoseSettingIranKish',
  data () {
    return {
      // receptive: '',
      // terminalCode: '',
      // port: '',
      // serialNo: ''
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
