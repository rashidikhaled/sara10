<template>
  <text-template
    v-model="results.Zabeteh.Comments"
    cdcName="Comments"
    formKey="caa94d5a-783b-4177-a3d3-6bf6dd92e408"
    :m="m"
    label="توضیحات ضابطه"
    class="full-height"
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
