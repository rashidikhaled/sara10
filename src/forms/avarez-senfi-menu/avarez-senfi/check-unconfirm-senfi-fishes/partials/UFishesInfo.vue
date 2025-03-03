<template>
  <fit>
    <safa-datatable
      v-model="results.BankFilesError"
      cdcName="BankFilesError"
      ref="grid"
      name="grid"
      helper="checkUncorfirmSenfiFishesInfo"
      :hideToolbar="true"
      title="لیست فیش ها"
    />
  </fit>
</template>

<script>
export default {
  data () {
    return {
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      selectedRegion: 1
    }
  },
  props: {
    results: Object,
    name: String,
    title: String,
    formKey: String
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
.splitter
  color green
</style>
