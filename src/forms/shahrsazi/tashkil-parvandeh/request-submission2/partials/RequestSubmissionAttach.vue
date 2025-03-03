<template>
  <form-wrapper vertical :padding="false">
    <safa-datatable
      v-model="attachResults.RequestListCanAttach"
      ref="grid2"
      helper="requestSubmissionAttach"
      @row-click="click"
      class="fit"
      height="100%"
      max-height="100%"
      min-height="100%"
      margin="0"
      :bordered="false"
      title="پیوست"
    />
    <template v-slot:footer>
      <div class="row q-gutter-sm">
        <div>
          <btn-default label="انتخاب پیوست" @click="selectAttach" />
        </div>

        <div>
          <btn-default label="بازگشت" @click="back" />
        </div>
      </div>
    </template>
  </form-wrapper>
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
    click (dataItem) {
      this.selectedRow = dataItem
      this.$emit('getAttachInfo', dataItem)
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
