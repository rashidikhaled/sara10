<template>
  <div>
     <div class="row q-my-sm">
      <safa-text
        label=" آدرس سرویس"
        class="col-12 col-md-4"
        type="textarea"
        :maxlength="300"
        v-model="serviceAddress"
        label-width="100px"
      ></safa-text>
    </div>
    <!-- <div class="row q-my-sm">
      <safa-text
        label="شناسه واریز"
        :maxlength="50"
        class="col-12 col-md-4"
        v-model="depositId"
        label-width="100px"
      ></safa-text>
    </div> -->
    <div class="row q-col-gutter-sm flex items-center">
      <safa-label style="width:100px"> روش پرداخت</safa-label>
      <safa-radio
        label="پرداخت قبوض"
        class="col-auto"
        v-model="fichePayment"
        val="payment"
      />
      <safa-radio
        label="خرید"
        class="col-auto"
        v-model="purchase"
        va="purchase"
      />
    </div>
  </div>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingBankMelat',
  data () {
    return {
      serviceAddress: '',
      depositId: '',
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
