<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <form-wrapper title="راهنمای درآمد" :padding="false">
      <fit>
        <embed
          src="help/Income-help.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
          min-height="100px"
          max-height="100%"
          title="راهنمای درآمد"
          fit
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
      title: 'راهنمای درآمد',
      formKey: '87917171-9369-4EDA-8BA5-BF3ECD04C437',
      name: 'UIncomeHelp',
      main: true
    }
  }
}
</script>
