<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <safa-combo
        label="سال شروع محاسبه"
        ciName="CI_Years"
        domainName="engineer"
        class="col-md-3"
        label-width="70px"
        v-model="startCalculationYear"
        :m="m"
        @input="$emit('startCalculationYear', startCalculationYear)"
      />
    </div>
    <safa-datatable
      title="لیست محاسبات"
      v-model="value.Eng_DutyCalculate"
      :columns="dutyCalculateColumns"
      m="r"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      class="q-mt-sm"
      @row-click="selectedRow"
      @selectedChange="selectedChange"
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
      dutyCalculateColumns: [
        {
          field: "CalculateDate",
          title: "تاریخ محاسبه",
          width: "100px",
          editor: "date"
        },
        { field: "CalculateTime", title: "زمان محاسبه", width: "100px" },
        {
          field: "CI_Years",
          title: "سال محاسبه",
          width: "100px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "PeriorDebtValue",
          title: "مبلغ بدهکاری قبلی",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "CurrentDebtValue",
          title: "مبلغ بدهکاری فعلی",
          width: "100px",
          cell: "grid-money-format"
        },
        { field: "UserNameCalculator", title: "کاربر", width: "200px" },
        { field: "", title: "عنوان", width: "100px" },
        { field: "", title: "مقدار", width: "100px" },
        { field: "", title: "توضیحات", width: "200px" }
      ],
      startCalculationYear: 0
    }
  },
  methods: {
    selectedRow (val) {
      this.$emit('selectedRow', val)
    },
    selectedChange (val) {
      this.$emit('selectedChange', val)
    }
  }
}
</script>

<style></style>
