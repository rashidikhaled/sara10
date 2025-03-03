<template>
    <text-template
      v-model="value.ContractBuy_Info.Description"
      cdcName="Description"
      label-width="100px"
      class="col-12"
      :rows="4"
      m="r"
      formKey="569C4019-669E-4220-9024-2283A0544C53"
    />
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
    }
  }
}
</script>
