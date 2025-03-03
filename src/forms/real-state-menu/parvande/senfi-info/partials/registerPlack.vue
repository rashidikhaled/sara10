<template>
    <safa-datatable
      title="پلاک ثبتی"
      fit
      min-height="100px"
      height="100%"
      max-height="100%"
      v-model="Result.Base_RegisterPlack"
      :columns="Base_RegisterPlack"
      :m="mode"
      :take="20"
      :addRow="false"
      :allowCopy="false"
      :deleteRow="false"
      :isEditable="true"
      class="q-mb-sm"
    />
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "registerPlack",
      Result: { Base_RegisterPlack: [] },

      // columns
      Base_RegisterPlack: [
        {
          title: "گروه نوع پلاک ثبتی",
          field: "CI_RegisterPlackTypeGroup",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        },
        {
          title: "نوع پلاک ثبتی",
          field: "CI_RegisterPlackType",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        },
        {
          title: "اولویت",
          field: "Priority",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        },
        {
          title: "مقدار",
          field: "RegisterPlackTypeValue",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        }
      ]
    }
  }
}
</script>
