<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    :caption="title"
  >
    <!-- <form-wrapper :title="title" :padding="false"> -->
    <ConstructionCouncil />
    <!-- </form-wrapper> -->
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ConstructionCouncil from "../all-warning-list/partials/ConstructionCouncil.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    ConstructionCouncil
  },
  data () {
    return {
      title: "صورتمجلس جلوگیری از عملیات ساختمانی",
      name: "UConstructionCouncil",
      formKey: "C9FFBBFD-ECCA-455C-ABF3-236A7308EADB",
      workflowCompatible: true,
      main: true
    }
  }
}
</script>
