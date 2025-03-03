<template>
  <div>
    <div class="row">
      <safa-text
        label="پورت"
        class="col-12 col-md-4"
        :maxlength="10"
        v-model="port"
        label-width="100px"
      ></safa-text>
    </div>
    <div class="q-my-sm">
      <div class="row">
        <safa-text
          label=" شماره تزمینال"
          class="col-12 col-md-4"
          v-model="terminalNo"
          label-width="100px"
        ></safa-text>
      </div>
    </div>

    <div class="row">
      <safa-text
        label="آدرس سرور LAN"
        class="col-12 col-md-4"
        v-model="serverAddress"
        label-width="100px"
      ></safa-text>
    </div>
  </div>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingBankAnsar',
  data () {
    return {
      portL: 0,
      terminalNo: '',
      serverAddress: ''
    }
  },
  props: {
    m: String
  },
  methods: {}
}
</script>
