<template>
  <div>
    <div class="row">
      <safa-text
        label="IP"
        v-model="value.ip"
        cdcName="ip"
        label-width="95px"
        class="col-12"
        :m="m"
        :maxlength="25"
      ></safa-text>
    </div>
    <div class="row q-my-sm">
      <safa-text
        label="پورت"
        v-model="value.port"
        cdcName="port"
        label-width="95px"
        class="col-12"
        :m="m"
        :maxlength="10"
      ></safa-text>
    </div>
    <div class="row">
      <safa-text
        label="شماره پایانه"
        class="col-12"
        :maxlength="25"
        v-model="value.terminalNo"
        cdcName="terminalNo"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div>
    <div class="q-mt-sm">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <safa-label style="width: 95px" class="flex items-center"
              >مدل دستگاه</safa-label
            >
            <safa-radio
              label="S380"
              class="col-3 col-sm-4"
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
            <!-- <div class="flex col-12 q-my-xs q-col-gutter-sm items-center"> -->
            <safa-label style="width: 95px" class="flex items-center">
              روش پرداخت</safa-label
            >
            <safa-radio
              label="پرداخت قبوض"
              class="col-3 col-sm-4"
              v-model="value.fichePayment"
              cdcName="payment"
              val="payment"
              :disable="disableIngenicoBtn"
              :m="m"
            />
            <safa-radio
              label="خرید"
              class="col"
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
          <!-- <div class="flex col-12 q-mt-xs q-col-gutter-sm items-center"> -->
          <safa-label style="width: 95px" class="flex items-center">
            نحوه ی استفاده</safa-label
          >
          <safa-radio
            label=" سریال پورت"
            class="col-3 col-sm-4"
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
  </div>
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
