<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc"
  >
    <h1 class="form-title text-h6">
      <span> راهنمای عوارض صنفی </span>
    </h1>
    <!-- <q-pdfviewer
    v-model="visible"
    src="../../asstes/docs/help.pdf"
    type="html5"
  /> -->
    <embed
      src="help/senfi-help.pdf"
      type="application/pdf"
      width="100%"
      title="راهنمای عوارض صنفی"
      height="1000"
    />
  </safa-form>
</template>
<script>
// import range from 'lodash/range'

// import pdf from 'vue-pdf'
// var loadingTask = pdf.createLoadingTask('../../assets/docs/help.pdf')
// // console.log('loadingTask', loadingTask)
// import './help.pdf'

export default {
  route: 'avareze-senfi/senfi-help',
  data: function () {
    return {
      title: 'راهنمای عوارض صنفی',
      formKey: 'a395d73c-5996-45bb-b930-91c3cebca9b2',
      name: 'USenfiHelp',
      main: true
    }
  },
  mounted () {
  }
  // props: ['url', 'scale']
}
</script>
