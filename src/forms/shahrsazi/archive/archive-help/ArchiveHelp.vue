<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :padding="false" title="راهنمای آرشیو و بایگانی">
      <fit>
        <embed
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          src="help/03HelpArchive.pdf"
          title="راهنمای آرشیو و بایگانی"
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
  route: 'archive/help',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'راهنمای آرشیو و بایگانی',
      formKey: '87917171-9369-4EDA-8BA5-BF3ECD04C437',
      name: 'ArchiveHelp',
      main: true
    }
  }
}
</script>
