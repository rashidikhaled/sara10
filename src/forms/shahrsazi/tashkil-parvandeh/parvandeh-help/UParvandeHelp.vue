<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper title="راهنمای تشکیل پرونده" :padding="false">
      <fit>
        <embed
          src="help/01HelpParvandeh.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
          min-height="100px"
          max-height="100%"
          title="راهنمای تشکیل پرونده "
          fit
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
// import range from 'lodash/range'
import baseFormMixin from 'src/mixins/baseFormMixin'

// import pdf from 'vue-pdf'
// var loadingTask = pdf.createLoadingTask('../../assets/docs/help.pdf')
// // console.log('loadingTask', loadingTask)
// import './help.pdf'

export default {
  route: '/parvande/parvande-help',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'راهنمای تشکیل پرونده',
      formKey: '1E0F7073-B4C6-4EB9-82CE-891D6EB4D3B1',
      name: 'UParvandeHelp',
      main: true
    }
  },
  mounted () {}
  // props: ['url', 'scale']
}
</script>
