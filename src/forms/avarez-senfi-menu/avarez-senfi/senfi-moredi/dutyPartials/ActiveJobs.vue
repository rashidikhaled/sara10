<template>
  <div>
    <safa-combo2
      label="شغل"
      class="q-mt-lg"
      source-type="local"
      :options="jobNameList"
      v-model="selcetedJob"
      @input="handleSelection"
      type="multiple"
      ref="jobcmbRef"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      selcetedJob: []
    }
  },
  props: {
    jobNameList: Array
  },
  methods: {
    handleSelection (e) {
      this.$emit("selctedJob", e)
    }
  }
}
</script>
