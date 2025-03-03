<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :title="title" vertical>
      <u-nosazi-code-search
        :formKey="formKey"
        :title="title"
        :name="name"
        @select="changeFromSearch"
        :isFromComponent="isFromComponent"
      />
    </form-wrapper>
  </safa-form>
</template>
<script>
import UNosaziCodeSearch from "./UNosaziCodeSearch.vue"
export default {
  components: { UNosaziCodeSearch },
  props: {
    isFromComponent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: "جستجوی ملک",
      formKey: "320655BE-DFBA-4FF5-ABE0-B2F5F90550E3",
      name: "UNosaziCodeSearchMain",
      main: true,
      sidebarCompatible: true
    }
  },
  methods: {
    changeFromSearch (e) {
      this.$emit("changeNosaziCode", e)
    }
  }
}
</script>
