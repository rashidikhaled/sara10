<template>
  <fit>
    <safa-combo
      label="تست"
      domainName=""
      ciName=""
      v-model="dutyYear"
      :labelWidth="$q.screen.gt.sm ? 'auto' : '135px'"
    />
  </fit>
</template>
<script>
export default {
  data: function () {
    return { dutyYear: 1400 }
  }
}
</script>
