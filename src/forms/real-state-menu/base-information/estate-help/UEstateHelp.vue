<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :padding="false" title="راهنمای املاک">
      <fit>
        <embed
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          src="help/EstateHelp.pdf"
          title="راهنمای املاک"
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
  route: 'base-information/estate-help',
  mixins: [baseFormMixin],
  data: function () {
    return {
      visible: true,
      title: 'راهنمای املاک',
      formKey: '26095E6D-C582-4B17-A62D-22D5A4E282C1',
      name: 'UEstateHelp',
      main: true
    }
  }
}
</script>
