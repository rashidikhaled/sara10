<template>
  <fit>
    <safa-text label="پورت"
    :maxlength="10"
    v-model="value.port" label-width="100px" :m="m" cdcName="port"></safa-text>
    <safa-text
      label=" کد پایانه"
      class="q-my-sm"
      v-model="value.terminalCode"
      label-width="100px"
      :m="m"
      :maxlength="25"
      cdcName="terminalCode"
    ></safa-text>
    <safa-text
      label="شماره پذیرنده"
      :maxlength="25"
      v-model="value.receptiveNo"
      label-width="100px"
      :m="m"
      cdcName="receptiveNo"
    ></safa-text>
    <safa-text
      label="شماره سریال"
      class="q-mt-sm"
      :maxlength="50"
      v-model="value.serialNo"
      label-width="100px"
      :m="m"
      cdcName="serialNo"
    ></safa-text>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: "UPoseSettingBankTejarat",
  data () {
    return {
      // port: 0,
      // terminalCode: '',
      // receptiveNo: '',
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
