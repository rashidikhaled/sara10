<template>
  <fit>
    <safa-text label="پورت"
    v-model="value.port"
    :maxlength="10"
     label-width="100px" :m="m"></safa-text>
    <safa-text
      label=" شماره ترمینال"
      class="q-my-sm"
      v-model="value.terminalNo"
      :maxlength="25"
      label-width="100px"
      :m="m"
    ></safa-text>
    <safa-text label="آدرس سرور LAN" v-model="value.serverAddress" label-width="100px" :m="m"></safa-text>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: "UPoseSettingBankAnsar",
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
