<template>
  <div>
    <div class="row">
      <safa-text label="پورت" class="col-12" v-model="value.port" cdcName="port" :maxlength="10" label-width="95px"
        :m="m" />
    </div>
    <div class="row q-my-sm">
      <safa-text label="آدرس پوز" :maxlength="25" class="col-12" v-model="value.poseAddress" cdcName="poseAddress"
        label-width="95px" :m="m" />
    </div>
    <div class="row">
      <safa-text label="ترمینال"
      :maxlength="25"
      class="col-12" v-model="value.terminalId" cdcName="terminal" label-width="95px"
        :m="m" />
    </div>
    <div class="row q-my-sm">
      <safa-text label="آدرس سرویس" :maxlength="300" class="col-12" v-model="value.serviceAddress" cdcName="serviceAddress"
        label-width="95px" :m="m" />
    </div>
    <div class="row">
      <safa-text label="پذیرنده" :maxlength="25" class="col-12" v-model="value.merchantId" cdcName="merchantId" label-width="95px"
        :m="m" />
    </div>
    <div class="flex q-col-gutter-sm col-12 q-mt-xs items-center">
      <safa-label style="width:95px"> روش پرداخت</safa-label>
      <safa-radio label="پرداخت قبوض" class="col-md-4 col-3" v-model="value.fichePayment" cdcName="payment"
        val="payment" :m="m" />
      <safa-radio label="خرید" class="col" v-model="value.fichePayment" cdcName="purchase" val="purchase" :m="m" />
    </div>
  </div>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingBankMeli',
  data () {
    return {
      // port: 0,
      // poseAddress: '',
      // terminal: '',
      // serviceAddress: '',
      // receptive: '',
      // fichePayment: true,
      // purchase: false,
      // code: ''
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
