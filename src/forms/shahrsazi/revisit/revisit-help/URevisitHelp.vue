<template>
  <safa-form
    :id="formKey"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    :caption="title"
  >
    <form-wrapper :padding="false" title="راهنمای بازدید">
      <fit>
        <embed
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          src="help/02HelpRevisit.pdf"
          title="راهنمای بازدید"
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
  route: 'revisit/revisit-help',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'راهنمای بازدید',
      formKey: '803C16A6-71EA-4D76-8793-8E7CD5A216EB',
      name: 'URevisitHelp',
      main: true
    }
  }
}
</script>
