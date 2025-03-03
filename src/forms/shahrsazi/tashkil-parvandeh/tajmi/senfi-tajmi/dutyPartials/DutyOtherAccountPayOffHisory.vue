<template>
  <div>
     <div class="form-row">
      <safa-datatable
        helper="dutyOtherAccountPayOffHistory"
        v-model="payOfHistory"
        title="تاریخچه"
      />
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {

    }
  },
  props: {
    payOfHistory: Array
  },
  mounted () {

  },
  methods: {}
}
</script>
