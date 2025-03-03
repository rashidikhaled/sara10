<template>
  <fit>
  <form-row>
    <form-control>
      <safa-combo
        label="سال شروع محاسبه"
        ciName="CI_Years"
        domainName="engineer"
        class="col-md-3"
        label-width="100px"
        v-model="startCalculationYear"
        @input="$emit('startCalculationYear', startCalculationYear)"
      />
    </form-control>
    </form-row>
    <safa-grid
      :masterDetail="true"
      :detailCellRendererParams="detailCellRendererParams"
      title="لیست محاسبات"
      v-model="value.Eng_DutyCalculate"
      helper="agDutyCalculate"
      m="r"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      class="q-mt-sm"
      @selection:changed="selectedChange"
      :show-selected-checkbox="true"
      :allowMultipleSelection="true"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
    />
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  props: ["value", "m"],
  data () {
    return {
      name: "Calculation",
      startCalculationYear: 0,
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          columnDefs: [
            { field: "Ex", title: "عنوان" },
            { field: "Exval", title: "مقدار" },
            { field: "ExValDesc", title: "توضیحات" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(function () {
            params.successCallback(params.data)
          }, 1000)
        }
      }
    }
  },
  methods: {
    selectedChange (e) {
      let selectedRows = e.api.getSelectedRows()
      this.$emit("selectedChange", selectedRows)
    }
  }
}
</script>
