<template>
  <Tajmi />
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Tajmi from "src/forms/shahrsazi/tashkil-parvandeh/tajmi/Tajmi.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    Tajmi
  },
  data () {
    return {
      name: "UHouseCollapseHistory",
      title: "تاریخچه تجمیع",
      formKey: "CAE85D25-589C-40F4-AE54-F8D785D80230",
      main: true

    }
  },
  created () {},
  methods: {}
}
</script>
