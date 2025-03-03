<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-combo
        :m="m"
        :value="ciShahrsazRequestType"
        cdcName="ciShahrsazRequestType"
        ci-name="CI_ShahrsazRequestType"
        class="col-12 col-sm-6 col-md-3"
        domain-name="CI_SaraM1"
        label="نوع درخواست اظهارنظر شهرساز"
        @input="handleCiShahrsazRequestTypeChange"
      />
    </div>
    <safa-datatable
      v-model="value.Base_OtherEquipment"
      cdcName="Base_OtherEquipment"
      :m="m"
      fit
      height="100%"
      helper="baseOtherEquipment"
      max-height="100%"
      min-height="150px"
      title="سایر امکانات"
    />
  </fit>
</template>

<script>
export default {
  name: "TabOther2",

  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    m: String
  },

  computed: {
    ciShahrsazRequestType () {
      if (
        !this.value.Base_OtherEquipment ||
        !this.value.Base_OtherEquipment.length
      ) {
        return null
      }
      return this.value.Base_OtherEquipment[0].CI_ShahrsazRequestType
    }
  },

  methods: {
    handleCiShahrsazRequestTypeChange (e) {
      // console.log('CI_ShahrsazRequestType - input', e)
      if (
        this.value.Base_OtherEquipment &&
        this.value.Base_OtherEquipment.length
      ) {
        this.value.Base_OtherEquipment[0].CI_ShahrsazRequestType = e
      }
    }
  }
}
</script>
