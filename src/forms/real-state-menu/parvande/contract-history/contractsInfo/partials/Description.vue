<template>
    <FormControl>
      <text-template
        v-model="value.ContractBuy_Info.Description"
        cdcName="Description"
        label-width="100px"
        label="توضیحات"
        class="col-12"
        :rows="6"
        :m="m"
        formKey="569C4019-669E-4220-9024-2283A0544C53"
      />
    </FormControl>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    m: { type: String }
  },

  data () {
    return {
      name: "Description"
    }
  }
}
</script>
