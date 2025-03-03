<template>
  <!-- <div> -->
  <fit>
    <div class="row q-ma-sm full-height">
      <text-template
        formKey="199C1BB1-CAFA-4F59-ABF2-ADC20342A160"
        label="توضیحات"
        class="col-12"
        :m="m"
        v-model="results.Foul_Info.Comments"
      />
    </div>
  </fit>
  <!-- </div> -->
</template>
<script>
export default {
  data: function () {
    return {}
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
