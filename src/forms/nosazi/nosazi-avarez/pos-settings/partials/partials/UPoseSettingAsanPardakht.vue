<template>
  <fit>
    <form-row>
      <safa-text
        v-model="value.port"
        :m="m"
        cdcName="port"
        class="col-12"
        label="پورت"
        label-width="100px"
        :maxlength="10"
      />
    </form-row>
    <form-row>
      <safa-text
        v-model="value.IP"
        :m="m"
        cdcName="IP"
        class="col-12 q-my-sm"
        label=" IP دستگاه پوز"
        label-width="100px"
        :maxlength="25"
      />
    </form-row>
    <div class="row q-mb-sm">
      <safa-text
        v-model="value.serverAddress"
        :m="m"
        cdcName="serverAddress"
        class="col-12"
        label="آدرس سرویس (Tomcat service)"
        :maxlength="300"
        label-width="100px"
      />
    </div>
    <div class="row q-col-gutter-sm flex items-center">
      <safa-label style="width: 100px">روش پرداخت</safa-label>
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
  name: 'UPoseSettingAsanPardakht',
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
