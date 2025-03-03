<template>
  <fit>
    <safa-splitter v-model="splitterValue" vertical>
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="registerdPlackMap"
            fit
            title="پلاک ثبتی"
            min-height="150px"
            height="100%"
            max-height="100%"
            m="r"
            v-model="model.Base_RegisterPlack"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            helper="postalCodeMap"
            fit
            title="کدپستی"
            min-height="150px"
            height="100%"
            max-height="100%"
            m="r"
            v-model="model.Base_AddressPostCode"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      splitterValue: 50
    }
  },
  props: {
    model: Object
  }
}
</script>
