<template>
  <text-template
    type="textarea"
    label="توضیحات درآمد"
    formKey="2be6bfdf-75f4-450d-9be3-7eabc9283061"
    v-model="incomeDetailResults.Income.Comments"
    cdcName="Comments"
    :m="m"
    class="fit"
  />
</template>
<script>
export default {
  data () {
    return {
      items: []
    }
  },
  props: { m: String, incomeDetailResults: Object },
  components: {}
}
</script>
