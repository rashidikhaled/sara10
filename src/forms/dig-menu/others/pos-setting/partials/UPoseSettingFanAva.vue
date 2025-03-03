<template>
  <div>
    <div class="row">
      <safa-text
        label="شماره ترمینال"
        class="col-12"
        :maxlength="25"
        v-model="value"
        cdcName=""
        label-width="95px"
        :m="m"
      />
    </div>
    <div class="row q-my-sm">
      <safa-text
        label="آدرس سرویس"
        class="col-12"
        :maxlength="300"
        v-model="value"
        cdcName=""
        label-width="95px"
        :m="m"
      />
    </div>
    <div class="flex q-col-gutter-sm col-12 q-mt-xs items-center">
      <safa-label style="width: 95px"> روش پرداخت</safa-label>
      <safa-radio
        label="پرداخت قبوض"
        class="col-md-4 col-3"
        v-model="value"
        cdcName="payment"
        val="payment"
        :m="m"
      />
      <safa-radio
        label="خرید"
        class="col"
        v-model="value"
        cdcName="purchase"
        val="purchase"
        :m="m"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "UPoseSettingFanAva",
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
