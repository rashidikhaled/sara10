<template>
  <fit>
    <safa-splitter v-model="splitterValue" class="fit" horizontal margin="0">
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="shahrsazi.baseOwner"
            title="مالکین"
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            helper="baseRegisterPlack"
            title="پلاک ثبتی"
            :m="m"
            v-model="value.Base_RegisterPlack"
            cdcName="Base_RegisterPlack"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabRegisterPlaque",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      splitterValue: 50
    }
  }
}
</script>
