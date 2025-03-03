<template>
  <fit>
      <safa-text
        label=" آدرس سرویس"
        type="textarea"
        class="q-my-sm"
        v-model="value.serviceAddress"
        :maxlength="300"
        label-width="100px"
        :m="m"
        cdcName="serviceAddress"
      ></safa-text>
      <!-- <safa-text
        label="شناسه واریز"
        class="q-my-sm"
        :maxlength="50"
        v-model="value.depositId"
        label-width="100px"
        :m="m"
        cdcName="depositId"
      ></safa-text> -->
    <div class="row q-col-gutter-sm flex items-center">
      <safa-label style="width:100px"> روش پرداخت</safa-label>
      <safa-radio
        label="پرداخت قبوض"
        class="col-auto"
        v-model="value.fichePayment"
        val="payment"
        :m="m"
        cdcName="payment"
      />
      <safa-radio
        label="خرید"
        class="col-auto"
        v-model="value.purchase"
        val="purchase"
        :m="m"
        cdcName="purchase"
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
