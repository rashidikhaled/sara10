<template>
  <fit>
    <div class="row">
      <safa-text
        label="پورت"
        class="col-12"
        v-model="value.port"
        cdcName="port"
        :maxlength="10"
        label-width="100px"
        :m="m"
      />
    </div>
    <div class="row">
      <safa-text
        label=" شماره ترمینال"
        v-model="value.terminalNo"
        :maxlength="25"
        cdcName="terminalNo"
        class="col-12 q-my-sm"
        label-width="100px"
        :m="m"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-text
        label="آدرس سرور LAN"
        class="col-12 "
        v-model="value.serverAddress"
        cdcName="serverAddress"
        label-width="100px"
        :m="m"
      />
    </div>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingAsanPardakht',
  data () {
    return {
      // port: 0,
      // terminalNo: '',
      // serverAddress: '',
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
