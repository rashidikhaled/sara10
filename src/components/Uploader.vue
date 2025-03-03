<template>
<div>
<q-uploader
        url="http://localhost:4444/upload"
        color="purpule"
        flat
        bordered
        style="max-width: 300px"
        accept=".txt"
        id="upl"
        @added="added"
      />

<!-- <q-input
        @input="val => { file = val[0] }"
        filled
        type="file"
        hint="لطفا یک فایل با پسوند .txt انتخاب کنید"
        accept=".txt"
      /> -->
</div>
</template>
<script>
export default {
  methods: {
    added (files) {
      // console.log('/////////////files', files)
    }
  }
}
</script>

<style>
/* #upl{
width:100%
} */
</style>
