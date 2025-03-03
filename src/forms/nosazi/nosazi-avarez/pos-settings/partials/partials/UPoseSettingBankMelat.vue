<template>
  <fit>
    <form-row class="q-mb-sm">
      <safa-text
        v-model="value.serviceAddress"
        :m="m"
        cdcName="serviceAddress"
        class="col-12"
        label=" آدرس سرویس"
        label-width="100px"
        :maxlength="300"
        type="textarea"
      />
    </form-row>
    <!-- <div class="row q-my-sm">
      <safa-text
        v-model="value.depositId"
        :m="m"
        cdcName="depositId"
        class="col-12"
        label="شناسه واریز"
        :maxlength="50"
        label-width="100px"
      />
    </div> -->
    <div class="row q-col-gutter-sm flex items-center">
      <safa-label style="width:100px"> روش پرداخت</safa-label>
      <safa-radio
        v-model="value.fichePayment"
        :m="m"
        cdcName="bill"
        class="col-auto"
        label="پرداخت قبوض"
        val="bill"
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
