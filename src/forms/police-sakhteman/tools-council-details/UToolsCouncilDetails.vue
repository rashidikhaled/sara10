<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    :caption="title"
  >
    <ToolsCouncil />
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ToolsCouncil from "../all-warning-list/partials/ToolsCouncil.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    ToolsCouncil
  },
  data () {
    return {
      title: "اطلاعات صورتمجلس جمع آوری لوازم و مصالح ساختمانی",
      name: "UToolsCouncilDetails",
      formKey: "772CA886-0E34-423D-8A02-759A95B387AD",
      workflowCompatible: true,
      main: true
    }
  }
}
</script>
