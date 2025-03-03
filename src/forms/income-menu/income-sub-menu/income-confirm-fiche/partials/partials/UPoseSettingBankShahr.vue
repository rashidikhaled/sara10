<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4">
        <safa-text
          label="IP"
          v-model="ip"
          label-width="100px"
          dir="ltr"
          :maxlength="25"
        ></safa-text>
      </div>
    </div>
    <div class="q-my-sm">
      <div class="row">
        <div class="col-12  col-md-4">
          <safa-text
            label="پورت"
            :maxlength="10"
            v-model="port"
            label-width="100px"
            dir="ltr"
          ></safa-text>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12  col-md-4">
        <safa-text
          label="شماره پایانه"
          :maxlength="25"
          v-model="terminalNo"
          label-width="100px"
          dir="ltr"
        ></safa-text>
      </div>
    </div>
    <div class="q-mt-sm">
      <div class="row">
        <div class="col-12  col-md-4">
          <div class="row">
            <safa-label style="width:100px" class="flex items-center">مدل دستگاه</safa-label>
            <safa-radio
              label="S380"
              class="col-3 col-sm-4"
              v-model="isS380"
              val="isS380"
            />
            <safa-radio
              label="ingenico"
              class="col"
              v-model="isS380"
              val="ingenico"
            />
          </div>
        </div>

      </div>
    </div>
    <div class="q-my-md">
      <div class="row">
        <div class="col-12  col-md-4">
          <div class="row">
            <safa-label style="width:100px" class="flex items-center"> روش پرداخت</safa-label>
            <safa-radio
              label="پرداخت قبوض"
              class="col-3 col-sm-4"
              v-model="fichePayment"
              val="payment"
            />
            <safa-radio
              label="خرید"
              class="col"
              v-model="purchase"
              val="purchase"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12  col-md-4">
        <div class="row">
          <safa-label style="width:100px" class="flex items-center"> نحوه ی استفاده</safa-label>
          <safa-radio
            label=" سریال پورت"
            class="col-3 col-sm-4"
            v-model="portSerial"
            val="serial"
          />
          <safa-radio
            label="LAN"
            class="col"
            v-model="lan"
            val="lan"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingBankShahr',
  data () {
    return {
      terminalNo: '',
      port: 0,
      ip: '',
      portSerial: true,
      lan: false,
      purchase: false,
      fichePayment: true,
      ingenico: false,
      isS380: true
    }
  },
  props: {
    m: String
  },
  methods: {}
}
</script>
