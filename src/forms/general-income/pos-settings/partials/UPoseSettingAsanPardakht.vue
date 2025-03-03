<template>
  <fit>
    <safa-text
    label="پورت"
    :maxlength="10"
    v-model="value.port" label-width="100px" :m="m" cdcName="port" />
    <safa-text
      label=" IP دستگاه پوز"
      v-model="value.IP"
      class="q-my-sm"
      label-width="100px"
      :m="m"
      cdcName="IP"
      :maxlength="25"
    />
    <safa-text
      label="آدرس سرویس (Tomcat service)"
      class="q-mb-sm"
      :maxlength="300"
      v-model="value.serverAddress"
      label-width="100px"
      :m="m"
      cdcName="serverAddress"
    />
    <div class="row q-col-gutter-sm flex items-center">
      <safa-label style="width: 100px">روش پرداخت</safa-label>
      <safa-radio
        label="پرداخت قبوض"
        v-model="value.fichePayment"
        class="col-auto"
        val="payment"
        :m="m"
        cdcName="payment"
      />
      <safa-radio
        label="خرید"
        v-model="value.fichePayment"
        class="col-auto"
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
  name: "UPoseSettingAsanPardakht",
  data () {
    return {
      // port: 0,
      // poseAddress: '',
      // serviceAddress: '',
      // fichePayment: true,
      // purchase: false,
      // IP: ''
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
