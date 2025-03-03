<template>
  <fit>
    <div class="row">
      <safa-text
        v-model="value.port"
        :m="m"
        cdcName="port"
        class="col-12"
        label="پورت"
        :maxlength="10"
        label-width="80px"
      ></safa-text>
    </div>
    <div class="q-my-sm">
      <div class="row">
        <safa-text
          v-model="value.terminalNo"
          :m="m"
          cdcName="terminalNo"
          class="col-12"
          label=" شماره ترمینال"
          :maxlength="25"
          label-width="80px"
        ></safa-text>
      </div>
    </div>

    <div class="row">
      <safa-text
        v-model="value.serverAddress"
        :m="m"
        cdcName="serverAddress"
        class="col-12"
        label="آدرس سرور LAN"
        label-width="80px"
      ></safa-text>
    </div>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

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
