<template>
  <safa-datatable
    title="ظرفیت کمیسیون"
    fit
    helper="commissionCapacityColumns"
    :value="CommissionCapacityList"
    cdcName="CommissionCapacityList"
    @input="$emit('input', CommissionCapacityList)"
    height="100%"
    max-height="100%"
    min-height="200px"
    @selectedChange="selectedChange"
    :show-selected-checkbox="true"
    :allowMultipleSelection="true"
    :addRow="false"
    :deleteRow="false"
    :allowCopy="false"
    paginate
    m="e"
    ref="capacityList"
  />
</template>

<script>
export default {
  props: ["value"],

  data () {
    return {
      name: "Capacity"
    }
  },
  mounted () {
    this.$emit("selectedItems", this.$refs.capacityList.selectedRows)
  },
  methods: {
    selectedChange () {
      this.$emit("selectedItems", this.$refs.capacityList.selectedRows)
    }
  },
  computed: {
    CommissionCapacityList () {
      if (this.value !== null || this.value !== []) return this.value
      return []
    }
  }
}
</script>
