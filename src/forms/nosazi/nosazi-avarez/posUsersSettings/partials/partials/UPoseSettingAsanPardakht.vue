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
      />
    </div>
    <div class="row">
      <safa-text
        v-model="value.terminalNo"
        :m="m"
        cdcName="terminalNo"
        class="col-12 q-my-sm"
        label=" شماره ترمینال"
        :maxlength="25"
        label-width="80px"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-text
        v-model="value.serverAddress"
        :m="m"
        cdcName="serverAddress"
        class="col-12 "
        label="آدرس سرور LAN"
        label-width="80px"
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
      // poseAddress: '',
      // serviceAddress: '',
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
