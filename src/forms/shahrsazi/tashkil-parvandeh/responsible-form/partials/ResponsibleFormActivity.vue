<template>
  <fit>
    <safa-datatable
      helper="responsibleFormActivity"
      class="fit"
      :bordered="false"
      v-model="processInfoResults.Task"
     title="فعالیت ها"/>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {

    }
  },
  props: {
    processInfoResults: Object
  }
}
</script>
