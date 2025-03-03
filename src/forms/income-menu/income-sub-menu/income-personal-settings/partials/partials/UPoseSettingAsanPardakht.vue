<template>
  <fit>
    <div class="row q-col-gutter-sm q-mb-sm">
      <safa-text
        label="پورت"
        class="col-12"
        :maxlength="10"
        v-model="value.port"
        label-width="100px"
        :m="m"
        cdcName="port"
      />
      <safa-text
        label="IP دستگاه پوز"
        v-model="value.IP"
        class="col-12"
        label-width="100px"
        :m="m"
        cdcName="IP"
        :maxlength="25"
      />
      <safa-text
        label="آدرس سرویس (Tomcat service)"
        class="col-12"
        v-model="value.serverAddress"
        :maxlength="300"
        label-width="100px"
        :m="m"
        cdcName="serverAddress"
      />
    </div>
    <div class="row flex items-center">
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
      name: "UPoseSettingAsanPardakht"
    }
  },
  props: {
    m: String,
    value: Object
  }
}
</script>
