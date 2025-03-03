<template>
<safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    :caption="title"
  >
  <form-wrapper :padding="false" title="راهنمای لیست سیاه">
    <fit>
      <embed
        fit
        height="100%"
        max-height="100%"
        min-height="100px"
        src="help/04HelpBlackList.pdf"
        title="راهنمای لیست سیاه"
        type="application/pdf"
        width="100%"
      />
    </fit>
  </form-wrapper>
</safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: 'income/help',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'راهنمای لیست سیاه',
      formKey: 'B22458DA-E996-47CD-9B5E-68652A8A7DC0',
      name: 'UBlackListHelp',
      main: true
    }
  }
}
</script>
