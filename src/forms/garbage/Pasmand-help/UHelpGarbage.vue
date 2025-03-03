<template>
   <safa-form
    :id="formKey"
    :caption="title"
    app-id='3C1CAD2C-BC81-4568-B146-501ED62FFA23'
  >
    <form-wrapper :padding="false" title="راهنمای کاربری پسماند">
      <fit>
        <embed
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          src="help/Pasmand-help.pdf"
          title="راهنمای کاربری پسماند"
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
  route: 'garbage/Pasmand-help',
  mixins: [baseFormMixin],
  data: function () {
    return {
      visible: true,
      title: 'راهنمای کاربری پسماند',
      formKey: 'a15944e5-cd28-44d6-a090-261b248f26e0',
      name: 'UHelpGarbage',
      main: true
    }
  }
}
</script>
