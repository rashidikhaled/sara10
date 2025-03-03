<template>
  <div>
    <div class="row">
      <safa-text
        label="پورت"
        :maxlength="10"
        class="col-12 col-md-4"
        v-model="port"
        label-width="100px"
      />
    </div>
    <div class="row">
      <safa-text
        label=" شماره ترمینال"
        :maxlength="25"
        v-model="terminalNo"
        class="col-12 col-md-4 q-my-sm"
        label-width="100px"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-text
        label="آدرس سرور LAN"
        class="col-12 col-md-4 "
        v-model="serverAddress"
        label-width="100px"
      />
    </div>
    <div class="row q-col-gutter-sm flex items-center">
      <safa-label style="width:100px" >روش پرداخت</safa-label>
      <safa-radio
        label="پرداخت قبوض"
        v-model="fichePayment"
        class="col-auto"
        val="payment"
      />
      <safa-radio
        label="خرید"
        v-model="fichePayment"
        class="col-auto"
        val="purchase"
      />
    </div>
  </div>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingAsanPardakht',
  data () {
    return {
      port: 0,
      poseAddress: '',
      serviceAddress: '',
      fichePayment: true,
      purchase: false
    }
  },
  props: {
    m: String
  },
  methods: {}
}
</script>
