<template>
  <div>
    <div class="row">
      <safa-text label="پورت" class="col-12" v-model="value.port" cdcName="port" label-width="95px" :maxlength="10"
        :m="m" />
    </div>
    <div class="row q-my-sm">
      <safa-text label=" آدرس پوز" :maxlength="25" class="col-12" v-model="value.poseAddress" cdcName="poseAddress"
        label-width="95px" :m="m" />
    </div>
    <div class="row">
      <safa-text label="آدرس سرویس (Tomcat service)" class="col-12" :maxlength="300" v-model="value.serviceAddress"
        cdcName="serviceAddress" label-width="95px" :m="m" />
    </div>
  </div>
</template>
<script>
export default {
  name: "UPoseSettingAsanPardakht",
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
