<template>
  <fit>
    <safa-text
      label=" آدرس سرویس"
      :maxlength="300"
      type="textarea"
      v-model="value.serviceAddress"
      label-width="100px"
      :m="m"
      cdcName="serviceAddress"
    ></safa-text>
    <safa-text
      label="شماره ترمینال"
      :maxlength="25"
      class="q-mt-sm"
      v-model="value.terminalNo"
      label-width="100px"
      :m="m"
      cdcName="terminalNo"
    ></safa-text>
    <div class="q-my-md">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <safa-label class="flex items-center" style="width: 80px">
              روش پرداخت
            </safa-label
            >
            <safa-radio
              v-model="value.transactionType"
              :m="m"
              cdcName="payment"
              class="col-4 col-sm-4"
              dense
              label="پرداخت قبوض"
              :val="1"
            />
            <safa-radio
              v-model="value.transactionType"
              :m="m"
              cdcName="purchase"
              class="col-4 col-sm-4"
              dense
              label="خرید"
              :val="0"
            />
          </div>
        </div>
      </div>
       <div class="row q-mt-sm">
        <div class="col-12">
          <div class="row">
            <safa-label class="flex items-center" style="width: 80px">
              نوع متد
            </safa-label>
            <safa-radio
              v-model="value.posMethod"
              :m="m"
              cdcName="Central"
              class="col-4 col-sm-4"
              dense
              label="Central"
              :val="1"
            />
            <safa-radio
              v-model="value.posMethod"
              :m="m"
              cdcName="SSP"
              class="col-4 col-sm-4"
              dense
              label="SSP"
              :val="0"
            />
          </div>
        </div>
    </div>
    <div class="row q-gutter-sm q-mt-sm" v-if="value.posMethod===0">
      <safa-text
        label="IP Address"
        class="col-6"
        :maxlength="25"
        v-model="value.iPAddress"
        cdcName="iPAddress"
        label-width="95px"
        :m="m"
      ></safa-text>
      <safa-text
        label="Server Port"
        class="col-4"
        :maxlength="25"
        v-model="value.serverPort"
        cdcName="serverPort"
        label-width="95px"
        :m="m"
      ></safa-text>
    </div>
    </div>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: "UPoseSettingSamanKish",
  data () {
    return {
      // serviceAddress: '',
      // terminalNo: ''
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
