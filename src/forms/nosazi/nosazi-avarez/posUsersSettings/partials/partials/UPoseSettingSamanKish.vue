<template>
  <fit>
    <div class="row">
      <safa-text
        v-model="value.serviceAddress"
        :m="m"
        cdcName="serviceAddress"
        class="col-12"
        label=" آدرس سرویس"
        label-width="80px"
        :maxlength="300"
        type="textarea"
      ></safa-text>
    </div>
    <div class="row q-mt-sm">
      <safa-text
        v-model="value.terminalNo"
        :m="m"
        cdcName="terminalNo"
        class="col-12"
        label="شماره ترمینال"
        :maxlength="25"
        label-width="80px"
      ></safa-text>
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
              v-model="value.transactionType"
              :m="m"
              cdcName="payment"
              class="col-4 col-sm-4"
              dense
              label="پرداخت قبوض"
              :val="1"
            />
            <q-radio
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
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingSamanKish',
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
