<template>
  <fit>
    <div class="q-my-sm">
      <div class="row">
        <safa-text
          v-model="value.TerminalId"
          :m="m"
          cdcName="TerminalId"
          class="col-12"
          label=" کد پایانه"
          label-width="80px"
        ></safa-text>
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-12">
        <div class="row">
          <safa-label class="flex items-center" style="width: 80px">
            روش پرداخت
          </safa-label>
          <safa-radio
            v-model="value.TransactionType"
            :m="m"
            cdcName="payment"
            class="col-4 col-sm-4"
            dense
            label="پرداخت قبوض"
            :val="2"
          />
          <safa-radio
            v-model="value.TransactionType"
            :m="m"
            cdcName="purchase"
            class="col-4 col-sm-4"
            dense
            label="خرید"
            :val="1"
          />
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'UPoseSettingBankTejarat',
  data () {
    return {
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
