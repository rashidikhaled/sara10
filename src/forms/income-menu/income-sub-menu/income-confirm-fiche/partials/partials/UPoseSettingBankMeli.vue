<template>
  <div>
    <div class="row">
      <safa-text label="پورت" :maxlength="10" class="col-12  col-md-4" v-model="port" label-width="100px" />
    </div>
    <div class="q-my-sm">
      <div class="row">
        <safa-text label="آدرس پوز" :maxlength="25" class="col-12 col-md-4" v-model="poseAddress" label-width="100px" />
      </div>
    </div>
    <div class="row">
      <safa-text label="ترمینال" :maxlength="25" class="col-12  col-md-4" v-model="terminal" label-width="100px" />
    </div>
    <div class="q-my-sm">
      <div class="row">
        <safa-text label="آدرس سرویس" :maxlength="300" class="col-12  col-md-4" v-model="serviceAddress" label-width="100px" />
      </div>
    </div>
    <div class="row">
      <safa-text label="پذیرنده" :maxlength="25" class="col-12  col-md-4" v-model="receptive" label-width="100px" />
    </div>
    <div class="row q-my-md items-center ">
      <div class="col-12  col-md-4">
        <div class="row">
          <safa-label style="width:100px" class="flex items-center"> روش پرداخت</safa-label>
          <safa-radio label="پرداخت قبوض" class="col-md-4 col-3" v-model="fichePayment" val="payment" />
          <safa-radio label="خرید" class="col" v-model="fichePayment" val="purchase" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingBankMeli',
  data () {
    return {
      port: 0,
      poseAddress: '',
      terminal: '',
      serviceAddress: '',
      receptive: '',
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
