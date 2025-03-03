<template>
  <safa-form
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :padding="false" :title="title">
      <fit>
        <embed
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          src="help/helpDig.pdf"
          title="راهنمای حفاری"
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
  route: 'dig-menu/help',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'راهنمای حفاری',
      formKey: "32D8619D-8DD4-42F6-B47F-476127EAE231",
      name: 'UHelpDig',
      main: true
    }
  }
}
</script>
