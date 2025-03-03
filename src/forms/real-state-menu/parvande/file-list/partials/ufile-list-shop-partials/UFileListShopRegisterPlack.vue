<template>
  <fit>
    <safa-datatable
      title="پلاک ثبتی"
      fit
      min-height="100px"
      height="100%"
      max-height="100%"
      v-model="value.Base_RegisterPlack"
      :columns="Base_RegisterPlack"
      :m="m"
      :showRowNumber="false"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      // columns
      Base_RegisterPlack: [
        {
          title: "گروه نوع پلاک ثبتی",
          field: "CI_RegisterPlackTypeGroup",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "نوع پلاک ثبتی",
          field: "CI_RegisterPlackType",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "اولویت",
          field: "Priority",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "مقدار",
          field: "RegisterPlackTypeValue",
          editor: "combo",
          domain: "Estate"
        }
      ]
    }
  }
}
</script>
