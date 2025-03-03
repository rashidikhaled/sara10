<template>
  <fit>
    <!-- <safa-grid
      title="لیست محاسبات"
      v-model="value.IncomeList"
      cdcName="IncomeList"
      :columns="calculateRow"
      @row:dblclick="dbclick"
      fit
      min-height="100px"
      height="100%"
      max-height="100%"
      ref="gridIncomeList"
    /> -->
    <safa-datatable
      v-model="value.IncomeList"
      cdcName="IncomeList"
      ref="grid"
      name="grid"
      helper="calculateRow"
      @dbclick="dbclick"
      @selectedChange="selectedChange"
      @calculateHistoryClick="calculateHistoryClick"
      :hideHeader="true"
      fit
      height="100%"
      max-height="100%"
      :bordered="false"
      title="لیست محاسبات"
    />

    <safa-popup
      v-model="isShowModal"
      @hide="isShowModal = false"
      @onCloseModal="isShowModal = false"
    >
      <UCalculateHistory
        :selectedRow="selectedRow"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </safa-popup>
  </fit>
</template>

<script>
import UCalculateHistory from './UCalculateHistory'
export default {
  components: { UCalculateHistory },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          IncomeList: []
        }
      }
    }
  },
  data () {
    return {
      isShowModal: false,
      selectedRow: null
    }
  },
  methods: {
    calculateHistoryClick (e) {
      this.selectedRow = e.dataItem
      this.isShowModal = true
    },
    selectedChange ({ dataItem, selectedItems }) {
      this.selectedRow = dataItem
      this.$emit('clickRow', this.selectedRow)
    },
    dbclick ({ event, target, row }) {
      this.selectedRow = row
      this.$emit('showDetailIncomeTab', this.selectedRow)
    }
  }
}
</script>
