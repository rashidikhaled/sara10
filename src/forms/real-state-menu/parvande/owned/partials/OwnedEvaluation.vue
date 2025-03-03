<template>
  <fit>
    <safa-grid
      v-model="value.Owned_Evaluation"
      cdcName="Owned_Evaluation"
      fit
      paginate
      :suppressRowClickSelection="false"
      :m="m"
      helper="Owned_EvaluationCol"
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    value: { type: Object, default: () => {} }
  },
  data () {
    return {
    }
  }
}
</script>
