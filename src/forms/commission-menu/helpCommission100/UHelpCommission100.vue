<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
    <form-wrapper title="راهنما" :padding="false">
      <fit>
        <embed
          src="help/HelpCommission.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
          min-height="100px"
          max-height="100%"
          title="راهنما"
          fit
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  route: 'commission-menu/HelpCommission',
  mixins: [baseFormMixin],
  data: function () {
    return {
      visible: true,
      title: 'راهنما',
      formKey: '79BD1AA4-D234-452D-B9A2-2345A2BFAFE3',
      name: 'UHelpCommission100',
      main: true
    }
  }
}
</script>
