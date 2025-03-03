<template>
  <fit>
    <div class="row q-col-gutter-sm q-mb-sm">
      <safa-text label="پورت" class="col-12" v-model="value.port" label-width="100px" :maxlength="10" :m="m"
        cdcName="port" />
      <safa-text label="آدرس پوز" :maxlength="25" class="col-12" v-model="value.poseAddress" label-width="100px" :m="m"
        cdcName="poseAddress" />
      <safa-text label="ترمینال" :maxlength="25" class="col-12" v-model="value.terminalId" cdcName="terminal" label-width="100px"
        :m="m" />
      <safa-text label="آدرس سرویس" :maxlength="300" class="col-12" v-model="value.serviceAddress" label-width="100px" :m="m"
        cdcName="serviceAddress" />
      <safa-text label="پذیرنده" :maxlength="25" class="col-12" v-model="value.merchantId" cdcName="merchantId" label-width="100px"
        :m="m" />
    </div>
    <div class="row flex items-center">
      <safa-label style="width: 100px">روش پرداخت</safa-label>
      <div class="q-gutter-x-lg">
        <safa-radio label="پرداخت قبوض" v-model="value.fichePayment" val="payment" :m="m" cdcName="payment" />
        <safa-radio label="خرید" class="col" v-model="value.fichePayment" val="purchase" :m="m" cdcName="purchase" />
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      name: "UPoseSettingBankMeli"
    }
  },
  props: {
    m: String,
    value: Object
  }
}
</script>
