<template>
    <fit>
      <safa-grid
        v-model="value.ClsRevisit_RequestService.RequestService_Scouring"
        :suppressRowClickSelection="false"
        :columns="RequestService_ScouringColumns"
        cdcName="RequestService_Scouring"
        fit
        :m="m"
        paginate
        :pageSize="20"
      />
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String,
    name: String,
    title: String,
    formKey: String
  },

  data () {
    return {
      RequestService_ScouringColumns: [
        {
          field: "CI_Scouring",
          title: "نوع",
          width: "150px",
          editor: 'combo',
          domain: 'Dig'

        },
        {
          field: "Value",
          title: "مقدار",
          width: "150px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "150px"
        }
      ]
    }
  }
}
</script>
