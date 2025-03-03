<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :padding="false" title="راهنمای تنظیمات">
      <fit>
        <embed
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          src="help/Settings-help.pdf"
          title="راهنمای تنظیمات"
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
  route: 'settings/help',

  mixins: [baseFormMixin],
  data: function () {
    return {
      visible: true,
      title: 'راهنمای تنظیمات',
      formKey: '52D686D5-586A-401A-A1B1-BD18CC2A959B',
      name: 'USettingsHelp',
      main: true
    }
  }
}
</script>
