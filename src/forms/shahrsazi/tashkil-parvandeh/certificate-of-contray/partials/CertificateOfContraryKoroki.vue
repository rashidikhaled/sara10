<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      class="fit"
      horizontal
      margin="0"
      style="min-height:180px"
    >
      <template v-slot:before>
        <text-template
          label="توضیحات بروکف"
          v-model="results.Sh_BaroKaf.BarKafComments"
          formKey="DA43FBC6-DC73-439A-851B-FDEB7D24E591"
          m="r"
          label-width="130px"
        />
      </template>
      <template v-slot:after>
        <text-template
          label="توضیحات گواهی عدم خلاف"
          v-model="results.Sh_MissFoul.Comments"
          formKey="DA43FBC6-DC73-439A-851B-FDEB7D24E591"
          :m="m"
          label-width="130px"
        />
      </template>
    </safa-splitter>

  </fit>
</template>
<script>
export default {
  props: {
    results: Object,
    m: String
  },
  data () {
    return {
      splitterValue: 50
    }
  }
}
</script>
