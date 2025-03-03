<template>
  <div>
    <div class="row">
      <safa-text
        label="پورت"
        class="col-12"
        v-model="value.port"
        cdcName="port"
        label-width="95px"
        :maxlength="10"
        :m="m"
      />
    </div>
    <div class="row q-my-sm">
      <safa-text
        label=" آدرس پوز"
    :maxlength="25"
        class="col-12"
        v-model="value.poseAddress"
        cdcName="poseAddress"
        label-width="95px"
        :m="m"
      />
    </div>
    <div class="row">
      <safa-text
        label="آدرس سرویس (Tomcat service)"
        class="col-12"
        v-model="value.serviceAddress"
        :maxlength="300"
        cdcName="serviceAddress"
        label-width="95px"
        :m="m"
      />
    </div>
    <div class="flex q-col-gutter-sm col-12 q-mt-xs items-center">
      <safa-label style="width: 95px">روش پرداخت</safa-label>
      <safa-radio
        label="پرداخت قبوض"
        v-model="value.fichePayment"
        cdcName="payment"
        class="col-md-4 col-3"
        val="payment"
        :m="m"
      />
      <safa-radio
        label="خرید"
        v-model="value.fichePayment"
        cdcName="purchase"
        class="col"
        val="purchase"
        :m="m"
      />
    </div>
  </div>
</template>
<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: "UPoseSettingAsanPardakht",
  data () {
    return {
      // port: 0,
      // poseAddress: "",
      // serviceAddress: "",
      // fichePayment: true,
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
