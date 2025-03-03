<template>
  <fit>
    <text-template
      label="توضیحات دستور نقشه"
      formKey="fab63156-ae04-4edd-bccf-a0db49bc149f"
      :m="m"
      class="fit"
      v-model="value.Sh_PlanOrder.Comments"
      cdcName="Comments"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: {
      type: String,
      default: "e"
    }
  }
}
</script>
