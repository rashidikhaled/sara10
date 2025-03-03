<template>
  <section>
    <div class="row q-my-sm">
      <safa-text
        label=" آدرس سرویس"
        class="col-12"
        type="textarea"
        :maxlength="300"
        v-model="value.serviceAddress"
        cdcName="serviceAddress"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div>
    <!-- <div class="row q-my-sm">
      <safa-text
        label="شناسه واریز"
        :maxlength="50"
        class="col-12"
        v-model="value.depositId"
        cdcName="depositId"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div> -->
    <div class="flex q-mt-sm col-12 items-center q-col-gutter-sm">
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
        va="purchase"
        :m="m"
      />
    </div>
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
      // fichePayment: false,
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
