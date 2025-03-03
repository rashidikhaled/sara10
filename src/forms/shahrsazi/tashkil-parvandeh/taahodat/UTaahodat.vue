<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"

  >
    <form-wrapper
      title="تعهدات"
      vertical
      :padding="false"
    >
      <safa-datatable
        helper="taahodVaRezayat"
        v-model="items"
        title="تعهدات"
        class="fit"
        height="100%"
        max-height="100%"
        min-height="100%"
        margin="0"
        :bordered="false"
      />
      <template v-slot:footer>
        <FormActions />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
export default {
  route: '/shahrsazi/taahodat',
  data () {
    return {
      title: 'تعهدات',
      formKey: '34d5eef9-fb54-4740-8024-0bf00781adde',
      name: 'UTaahodat2',
      main: true,
      workflowCompatible: true,
      items: []
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
