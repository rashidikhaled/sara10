<template>
  <fit>
    <safa-datatable
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      helper="apartmentInfo"
      :m="m"
      v-model="results.Sh_ApartmentEarlySold_Owner_List"
      title="اطلاعات آپارتمان"
      :boredered="false"
    />
  </fit>
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
