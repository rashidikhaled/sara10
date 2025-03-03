<template>
  <div>
    <div class="row">
      <safa-text
        label="پورت"
        class="col-12"
        v-model="value.port"
        cdcName="port"
        label-width="95px"
        :m="m"
        :maxlength="10"
      />
    </div>
    <div class="row q-my-sm">
      <safa-text
        label=" کد پایانه"
        class="col-12"
        v-model="value.terminalCode"
        cdcName="terminalCode"
        :maxlength="25"
        label-width="95px"
        :m="m"
      />
    </div>
    <div class="row">
      <safa-text
        label="شماره پذیرنده"
        class="col-12"
        :maxlength="25"
        v-model="value.receptive"
        cdcName="receptive"
        label-width="95px"
        :m="m"
      />
    </div>
    <div class="row q-mt-sm">
      <safa-text
        label="شماره سریال"
        class="col-12"
        :maxlength="50"
        v-model="value.serialNo"
        cdcName="serialNo"
        label-width="95px"
        :m="m"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "UPoseSettingBankTejarat",
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
