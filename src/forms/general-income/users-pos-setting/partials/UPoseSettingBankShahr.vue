<template>
  <fit>
    <div class="row">
      <div class="col-12">
        <safa-text
          label="IP"
          v-model="value.ip"
          cdcName="ip"
          label-width="100px"
          dir="ltr"
          :m="m"
          :maxlength="25"
        ></safa-text>
      </div>
    </div>
    <div class="q-my-sm">
      <div class="row">
        <div class="col-12">
          <safa-text
            label="پورت"
            v-model="value.port"
            :maxlength="10"
            cdcName="port"
            label-width="100px"
            dir="ltr"
            :m="m"
          ></safa-text>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <safa-text
          label="شماره پایانه"
          v-model="value.terminalNo"
          :maxlength="25"
          cdcName="terminalNo"
          label-width="100px"
          dir="ltr"
          :m="m"
        ></safa-text>
      </div>
    </div>
    <div class="q-mt-sm">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <safa-label style="width: 100px" class="flex items-center"
              >مدل دستگاه</safa-label
            >
            <safa-radio
              label="S380"
              class="col-4 col-sm-4"
              v-model="value.isS380"
              cdcName="isS380"
              val="isS380"
              :m="m"
            />
            <safa-radio
              label="ingenico"
              class="col"
              v-model="value.isS380"
              cdcName="ingenico"
              val="ingenico"
              :m="m"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="q-my-md">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <safa-label style="width: 100px" class="flex items-center">
              روش پرداخت</safa-label
            >
            <safa-radio
              label="پرداخت قبوض"
              class="col-8 col-sm-4"
              v-model="value.fichePayment"
              cdcName="payment"
              val="payment"
              :disable="disableIngenicoBtn"
              :m="m"
            />
            <safa-radio
              label="خرید"
              class="col-8 col-sm-4"
              v-model="value.fichePayment"
              cdcName="purchase"
              val="purchase"
              :disable="disableIngenicoBtn"
              :m="m"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <safa-label style="width: 100px" class="flex items-center">
            نحوه ی استفاده</safa-label
          >
          <safa-radio
            label=" سریال پورت"
            class="col-4 col-sm-4"
            v-model="value.portSerial"
            cdcName="serial"
            val="serial"
            :disable="disableIngenicoBtn"
            :m="m"
          />
          <safa-radio
            label="LAN"
            class="col"
            v-model="value.portSerial"
            cdcName="lan"
            val="lan"
            :disable="disableIngenicoBtn"
            :m="m"
          />
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: "UPoseSettingBankShahr",
  data () {
    return {
      // terminalNo: "",
      // port: 0,
      // ip: "",
      // portSerial: true,
      // fichePayment: "",
      // isS380: "",
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
  methods: {},
  watch: {
    isS380 () {
      if (this.value.isS380 === "ingenico") {
        this.disableIngenicoBtn = true
      } else {
        this.disableIngenicoBtn = false
      }
    }
  }
}
</script>
