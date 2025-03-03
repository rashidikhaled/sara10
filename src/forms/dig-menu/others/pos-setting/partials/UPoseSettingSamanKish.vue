<template>
  <fit>
    <form-row>
      <safa-text
        v-model="value.serviceAddress"
        :m="m"
        cdcName="serviceAddress"
        class="col-12"
        :maxlength="300"
        label=" آدرس سرویس"
        label-width="100px"
        type="textarea"
      />
    </form-row>
    <div class="row q-mt-sm">
      <safa-text
        v-model="value.terminalNo"
        :m="m"
        cdcName="terminalNo"
        class="col-12"
        label="شماره ترمینال"
        :maxlength="25"
        label-width="100px"
      />
    </div>
    <div class="row q-mt-sm">
      <div class="col-12">
        <div class="row">
          <safa-label class="flex items-center" style="width: 80px">
            روش پرداخت
          </safa-label>
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
  </fit>
</template>
<script>
export default {
  name: "UPoseSettingSamanKish",
  data () {
    return {}
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
