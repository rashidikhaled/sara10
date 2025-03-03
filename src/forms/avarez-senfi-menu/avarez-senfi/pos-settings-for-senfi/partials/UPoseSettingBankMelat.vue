<template>
  <section>
    <div class="row q-my-sm">
      <safa-text
        label=" آدرس سرویس"
        class="col-12 "
        type="textarea"
        v-model="value.serviceAddress"
        cdcName="serviceAddress"
        label-width="95px"
        :maxlength="300"
        :m="m"
      ></safa-text>
    </div>
    <!-- <div class="row q-my-sm">
      <safa-text
        label="شناسه واریز"
        class="col-12"
        :maxlength="50"
        v-model="value.depositId"
        cdcName="depositId"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div> -->
    <!-- <div class="row "> -->
    <div class="flex q-mt-sm col-12 items-center q-col-gutter-sm">
      <!-- <div class="row"> -->
      <safa-label style="width:95px"> روش پرداخت</safa-label>
      <safa-radio
        label="پرداخت قبوض"
        class="col-md-4 col-3"
        v-model="value.fichePayment"
        cdcName="payment"
        val="payment"
        :m="m"
      />
      <safa-radio
        label="خرید"
        class="col"
        v-model="value.fichePayment"
        cdcName="purchase"
        val="purchase"
        :m="m"
      />
      <!-- </div> -->
    </div>
    <!-- </div> -->
  </section>
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
