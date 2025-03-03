<template>
  <fit>
    <div class="row">
      <div class="col-12">
        <safa-text
          v-model="value.ip"
          :m="m"
          cdcName="IP"
          dir="ltr"
          label="IP"
          label-width="80px"
          :maxlength="25"
        ></safa-text>
      </div>
    </div>
    <div class="q-my-sm">
      <div class="row">
        <div class="col-12">
          <safa-text
            v-model="value.port"
            :m="m"
            cdcName="port"
            dir="ltr"
            label="پورت"
            :maxlength="10"
            label-width="80px"
          ></safa-text>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <safa-text
          v-model="value.terminalNo"
          :m="m"
          cdcName="terminalNo"
          dir="ltr"
          label="شماره پایانه"
          :maxlength="25"
          label-width="80px"
        ></safa-text>
      </div>
    </div>
    <div class="q-mt-sm">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <safa-label class="flex items-center" style="width: 80px"
            >مدل دستگاه
            </safa-label
            >
            <q-radio
              v-model="value.isS380"
              :m="m"
              cdcName="isS380"
              class="col-4 col-sm-4"
              dense
              label="S380"
              val="isS380"
            />
            <q-radio
              v-model="value.isS380"
              :m="m"
              cdcName="ingenico"
              class="col-4 col-sm-4"
              dense
              label="ingenico"
              val="ingenico"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="q-my-md">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <safa-label class="flex items-center" style="width: 80px">
              روش پرداخت
            </safa-label
            >
            <q-radio
              v-model="value.fichePayment"
              :disable="disableIngenicoBtn"
              :m="m"
              cdcName="payment"
              class="col-4 col-sm-4"
              dense
              label="پرداخت قبوض"
              val="payment"
            />
            <q-radio
              v-model="value.fichePayment"
              :disable="disableIngenicoBtn"
              :m="m"
              cdcName="purchase"
              class="col-4 col-sm-4"
              dense
              label="خرید"
              val="purchase"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <safa-label class="flex items-center" style="width: 80px">
            نحوه ی استفاده
          </safa-label
          >
          <q-radio
            v-model="value.portSerial"
            :disable="disableIngenicoBtn"
            :m="m"
            cdcName="serial"
            class="col-4 col-sm-4"
            dense
            label=" سریال پورت"
            val="serial"
          />
          <q-radio
            v-model="value.portSerial"
            :disable="disableIngenicoBtn"
            :m="m"
            cdcName="lan"
            class="col-4 col-sm-4"
            dense
            label="LAN"
            val="lan"
          />
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'UPoseSettingBankShahr',
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
      if (this.value.isS380 === 'ingenico') {
        this.disableIngenicoBtn = true
      } else {
        this.disableIngenicoBtn = false
      }
    }
  },

  methods: {}
}
</script>
