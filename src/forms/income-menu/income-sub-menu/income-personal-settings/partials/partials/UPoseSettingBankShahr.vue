<template>
  <fit>
    <div class="row q-col-gutter-sm q-mb-sm">
      <safa-text
        class="col-12"
        label="IP"
        v-model="value.ip"
        label-width="100px"
        dir="ltr"
        :m="m"
        :maxlength="25"
        cdcName="IP"
      />
      <safa-text
        class="col-12"
        label="پورت"
        :maxlength="10"
        v-model="value.port"
        label-width="100px"
        dir="ltr"
        :m="m"
        cdcName="port"
      />
      <safa-text
        class="col-12"
        label="شماره پایانه"
        v-model="value.terminalNo"
        :maxlength="25"
        label-width="100px"
        dir="ltr"
        :m="m"
        cdcName="terminalNo"
      />
    </div>
    <div class="row q-mb-sm flex items-center">
      <safa-label style="width: 100px">مدل دستگاه</safa-label>
      <safa-radio
        style="min-width: 100px"
        label="S380"
        v-model="value.isS380"
        val="isS380"
        :m="m"
        cdcName="isS380"
      />
      <safa-radio
        label="ingenico"
        v-model="value.isS380"
        val="ingenico"
        :m="m"
        cdcName="ingenico"
      />
    </div>
    <div class="row q-mb-sm flex items-center">
      <safa-label style="width: 100px">روش پرداخت</safa-label>
      <safa-radio
        style="min-width: 100px"
        label="پرداخت قبوض"
        v-model="value.fichePayment"
        val="payment"
        cdcName="payment"
      />
        <!-- :m="value.isS380 === 'ingenico' ? 'e' : 'r'" -->
      <safa-radio
        label="خرید"
        v-model="value.fichePayment"
        val="purchase"
        cdcName="purchase"
      />
        <!-- :m="value.isS380 === 'ingenico' ? 'e' : 'r'" -->
    </div>
    <div class="row q-mb-sm flex items-center">
      <safa-label style="width: 100px">نحوه ی استفاده</safa-label>
      <safa-radio
        style="min-width: 100px"
        label=" سریال پورت"
        v-model="value.portSerial"
        val="serial"
        cdcName="serial"
      />
        <!-- :m="value.isS380 === 'ingenico' ? 'e' : 'r'" -->
      <safa-radio
        label="LAN"
        v-model="value.portSerial"
        val="lan"
        cdcName="lan"
      />
        <!-- :m="value.isS380 === 'ingenico' ? 'e' : 'r'" -->
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UPoseSettingBankShahr"
    }
  },
  props: {
    m: String,
    value: Object
  }
}
</script>
