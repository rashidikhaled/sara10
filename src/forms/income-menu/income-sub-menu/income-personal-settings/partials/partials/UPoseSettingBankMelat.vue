<template>
  <fit>
    <div class="row q-col-gutter-sm q-mb-sm">
      <safa-text
        label=" آدرس سرویس"
        class="col-12"
        type="textarea"
        v-model="value.serviceAddress"
        :maxlength="300"
        label-width="100px"
        :m="m"
        cdcName="serviceAddress"
      />
      <safa-text
        label="شناسه واریز"
        class="col-12"
        :maxlength="50"
        v-model="value.depositId"
        label-width="100px"
        :m="m"
        cdcName="depositId"
      />
    </div>
    <div class="row">
      <safa-label style="width: 100px">روش پرداخت</safa-label>
      <safa-radio
        style="min-width: 100px"
        label="پرداخت قبوض"
        v-model="value.fichePayment"
        val="payment"
        :m="m"
        cdcName="payment"
      />
      <safa-radio
        label="خرید"
        v-model="value.fichePayment"
        val="purchase"
        :m="m"
        cdcName="purchase"
      />
    </div>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      name: "UPoseSettingBankMelat"
    }
  },
  props: {
    m: String,
    value: Object
  }
}
</script>
