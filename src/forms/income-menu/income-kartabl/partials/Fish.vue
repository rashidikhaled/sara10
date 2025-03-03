<template>
  <fit>
    <safa-datatable
      v-model="value"
      helper="fish1"
      title="لیست تمام فیش ها"
      cdcName="allFiches"
      fit
      paginate
      min-height="200px"
      height="100%"
      max-height="100%"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      :showRowNumber="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
    />
  </fit>
</template>

<script>
export default {
  props: ["value"],
  data () {
    return {
      name: "Fish"
    }
  }
}
</script>
