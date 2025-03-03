<template>
  <fit>
    <safa-datatable
      v-model="attachResults.RequestListCanAttach"
      helper="requestSubmissionAttach"
      @row-click="click"
      height="100%"
      max-height="100%"
      :margin="false"
      class="q-pb-sm"
      fit
      title="پیوست"
      :allowMultipleSelection="true"
    />

  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      selectedRow: null
    }
  },
  computed: {
    mode: function () {
      return this.isEditable ? 'e' : 'r'
    }
  },
  props: {
    attachResults: {}
  },
  methods: {
    back () {
      this.$emit('backMainForm')
    },
    click (row) {
      this.selectedRow = row
      this.$emit('getAttachInfo', row)
    },
    selectAttach () {
      if (this.selectedRow !== null) {
        this.back()
      } else {
        this.showError('درخواستی برای پیوست انتخاب نشده است.')
      }
    }
  },
  mounted () {}
}
</script>
