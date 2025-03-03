<template>
  <fit>
    <div class="row q-my-sm">
      <safa-text
        v-model="value.serviceAddress"
        :m="m"
        cdcName="serviceAddress"
        class="col-12 q-my-sm"
        label=" آدرس سرویس"
        label-width="80px"
        type="textarea"
        :maxlength="300"
      ></safa-text>
    </div>
    <!-- <div class="row q-my-sm">
      <safa-text
        v-model="value.depositId"
        :m="m"
        cdcName="depositId"
        class="col-12 "
        label="شناسه واریز"
        :maxlength="50"
        label-width="80px"
      ></safa-text>
    </div> -->
    <div class="row q-col-gutter-sm flex items-center">
      <safa-label style="width:80px"> روش پرداخت</safa-label>
      <safa-radio
        v-model="value.fichePayment"
        :m="m"
        cdcName="payment"
        class="col-auto"
        label="پرداخت قبوض"
        val="payment"
      />
      <safa-radio
        v-model="value.fichePayment"
        :m="m"
        cdcName="purchase"
        class="col-auto"
        label="خرید"
        val="purchase"
      />
    </div>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingBankMelat',
  data () {
    return {
      // serviceAddress: '',
      // depositId: '',
      // fichePayment: true,
      // purchase: false
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
