<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <safa-text
        label="پورت"
        class="col-12"
        :maxlength="10"
        v-model="value.port"
        label-width="100px"
        :m="m"
      />
      <safa-text
        label=" شماره ترمینال"
        :maxlength="25"
        class="col-12"
        v-model="value.terminalNo"
        label-width="100px"
        :m="m"
      />
      <safa-text
        label="آدرس سرور LAN"
        class="col-12"
        v-model="value.serverAddress"
        label-width="100px"
        :m="m"
      />
    </div>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      name: "UPoseSettingBankAnsar"
    }
  },
  props: {
    m: String,
    value: Object
  }
}
</script>
