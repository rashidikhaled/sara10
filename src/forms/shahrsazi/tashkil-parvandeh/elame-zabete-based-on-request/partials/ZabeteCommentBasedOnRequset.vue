<template>
  <text-template
    v-model="results.Zabeteh.Comments"
    cdcName="Comments"
    formKey="df483f09-e2df-4ee8-a394-c871d61e1fac"
    :m="m"
    label="توضیحات"
  />
</template>
<script>
export default {
  props: {
    results: Object,
    m: String
  }
}
</script>
