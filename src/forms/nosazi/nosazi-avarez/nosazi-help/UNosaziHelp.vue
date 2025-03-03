<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper :padding="false" title="راهنمای نوسازی">
      <fit>
        <embed
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          src="help/Nosazi-help.pdf"
          title="راهنمای نوسازی"
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
  route: 'nosazi-avarez/nosazi-help',
  mixins: [baseFormMixin],
  data: function () {
    return {
      visible: true,
      title: 'راهنمای نوسازی',
      formKey: '6e20e8dd-ed46-4076-945e-14e8d047a14c',
      name: 'UNosaziHelp',
      main: true
    }
  }
}
</script>
