<template>
  <fit>
    <safa-text label="IP" :maxlength="25" v-model="value.ip" label-width="100px" dir="ltr" :m="m" cdcName="IP"></safa-text>
    <safa-text
      label="پورت"
      v-model="value.port"
      label-width="100px"
      :maxlength="10"
      dir="ltr"
      :m="m"
      cdcName="port"
      class="q-my-sm"
    ></safa-text>
    <safa-text
      label="شماره پایانه"
      v-model="value.terminalNo"
      :maxlength="25"
      label-width="100px"
      dir="ltr"
      :m="m"
      cdcName="terminalNo"
    ></safa-text>

    <div class="row q-mt-sm">
      <safa-label style="width: 100px" class="flex items-center">مدل دستگاه</safa-label>
      <safa-radio
        label="S380"
        class="col-3 col-sm-4"
        v-model="value.isS380"
        val="isS380"
        :m="m"
        dense
        cdcName="isS380"
      />
      <safa-radio
        label="ingenico"
        class="col"
        v-model="value.isS380"
        val="ingenico"
        :m="m"
        dense
        cdcName="ingenico"
      />
    </div>

    <div class="row q-my-md">
      <safa-label style="width: 100px" class="flex items-center">روش پرداخت</safa-label>
      <safa-radio
        label="پرداخت قبوض"
        class="col-3 col-sm-4"
        v-model="value.fichePayment"
        val="payment"
        :disable="disableIngenicoBtn"
        :m="m"
        dense
        cdcName="payment"
      />
      <safa-radio
        label="خرید"
        class="col"
        v-model="value.fichePayment"
        val="purchase"
        :disable="disableIngenicoBtn"
        :m="m"
        dense
        cdcName="purchase"
      />
    </div>
    <div class="row">
      <safa-label style="width: 100px" class="flex items-center">نحوه ی استفاده</safa-label>
      <safa-radio
        label=" سریال پورت"
        class="col-3 col-sm-4"
        v-model="value.portSerial"
        val="serial"
        :disable="disableIngenicoBtn"
        :m="m"
        dense
        cdcName="serial"
      />
      <safa-radio
        label="LAN"
        class="col"
        v-model="value.portSerial"
        val="lan"
        :disable="disableIngenicoBtn"
        :m="m"
        dense
        cdcName="lan"
      />
    </div>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  name: "UPoseSettingBankShahr",
  data () {
    return {
      // terminalNo: "",
      // port: 0,
      // ip: "",
      // portSerial: true,
      // fichePayment: true,
      // isS380: true,
      disableIngenicoBtn: false
    }
  },
  props: {
    title: String,
    formKey: String,
    name: String,
    m: String,
    value: Object
  },
  watch: {
    isS380 () {
      if (this.value.isS380 === "ingenico") {
        this.disableIngenicoBtn = true
      } else {
        this.disableIngenicoBtn = false
      }
    }
  },
  methods: {}
}
</script>
