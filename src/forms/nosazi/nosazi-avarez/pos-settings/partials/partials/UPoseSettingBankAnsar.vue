<template>
  <fit>
    <form-row>
      <safa-text
        v-model="value.port"
        :m="m"
        class="col-12"
        label="پورت"
        :maxlength="10"
        label-width="100px"
      />
    </form-row>
    <div class="q-my-sm">
      <form-row>
        <safa-text
          v-model="value.terminalNo"
          :m="m"
          class="col-12"
          label=" شماره ترمینال"
          :maxlength="25"
          label-width="100px"
        />
      </form-row>
    </div>

    <form-row>
      <safa-text
        v-model="value.serverAddress"
        :m="m"
        class="col-12"
        label="آدرس سرور LAN"
        label-width="100px"
      />
    </form-row>
  </fit>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  name: 'UPoseSettingBankAnsar',
  data () {
    return {
      // port: 0,
      // terminalNo: '',
      // serverAddress: ''
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
