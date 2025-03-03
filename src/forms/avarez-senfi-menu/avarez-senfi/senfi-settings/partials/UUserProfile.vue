<template>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <safa-checkbox
            v-model="value.ChkshowAvarezInNewWindow"
            cdcName="ChkshowAvarezInNewWindow"
            color="primary"
            label="نشان دادن عوارض صنفی در پنجره جدید"
            :m="m"
          ></safa-checkbox>
        </div>

        <div class="col-12">
          <safa-checkbox
            v-model="value.ChkshowAllAvarezInNewWindow"
            cdcName="ChkshowAllAvarezInNewWindow"
            color="primary"
            label="نشان دادن عوارض صنفی جمعی در پنجره جدید"
            :m="m"
          ></safa-checkbox>
        </div>
      </div>
</template>

<script>
export default {
  data () {
    return {
      // SenfiSettingUser: {
      //   ChkshowAvarezInNewWindow: true,
      //   ChkshowAllAvarezInNewWindow: false
      // }
    }
  },
  props: {
    value: Object,
    m: String,
    formKey: String,
    name: String,
    title: String
  },
  mounted () {},
  methods: {}
}
</script>
