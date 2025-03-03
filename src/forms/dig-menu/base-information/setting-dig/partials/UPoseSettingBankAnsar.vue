<template>
  <div>
    <div class="row">
      <safa-text
        label="پورت"
        class="col-12"
        v-model="value.port"
        :maxlength="10"
        cdcName="port"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div>
    <div class="row q-my-sm">
      <safa-text
        label=" شماره ترمینال"
        class="col-12"
        v-model="value.terminalNo"
        cdcName="terminalNo"
        :maxlength="25"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div>

    <div class="row">
      <safa-text
        label="آدرس سرور LAN"
        class="col-12"
        v-model="value.serverAddress"
        cdcName="serverAddress"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UPoseSettingBankAnsar',
  data () {
    return {
      // port: 0,
      // terminalNo: '',
      // serverAddress: ''
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
