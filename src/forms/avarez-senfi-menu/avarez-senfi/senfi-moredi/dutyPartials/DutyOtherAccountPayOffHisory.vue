<template>
  <fit>
    <safa-datatable
      helper="dutyOtherAccountPayOffHistory"
      v-model="payOfHistory"
      title="تاریخچه"
      :borderd="false"
    />
  </fit>
</template>
<script>
export default {
  data: function () {
    return {}
  },
  props: {
    payOfHistory: Array
  },
  mounted () {},
  methods: {}
}
</script>
