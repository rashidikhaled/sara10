<template>
  <fit>
    <safa-grid
      v-model="incomeDetailResults.Income_LogMethod"
      cdcName="Income_LogMethod"
      ref="grid"
      name="grid"
      :columns="calculateMethods"
      title="روش های محاسبه"
      fit
      height="100%"
      max-height="100%"
      :bordered="false"
      :hideHeader="true"
      paginate
    />
  </fit>
</template>

<script>
export default {
  data () {
    return {
      items: [],

      calculateMethods: [
        {
          field: "MethodTitle",
          title: "عنوان",
          width: "200px"
        },
        {
          field: "CI_IncomeCalculation",
          title: "نوع عوارض درآمد",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "230px"
        },
        {
          field: "MethodStr",
          title: "فرمول",
          width: "auto",
          cellRenderer: (params) =>
            `<div class="formula-block" dir="rtl">${this.getFormulaBlockText(
              params?.value
            )}</div>`,
          wrapText: true,
          autoHeight: true
        },
        {
          field: "MethodValue",
          title: "مقدار",
          width: "120px"
        },
        {
          field: "ValueDesc",
          title: "شرح مقدار",
          width: "auto",
          cellRenderer: (params) =>
            `<div class="formula-block" dir="rtl">${this.getFormulaBlockText(
              params?.value
            )}</div>`,
          wrapText: true,
          autoHeight: true
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "auto",
          cellRenderer: (params) =>
            `<div class="formula-block" dir="rtl">${this.getFormulaBlockText(
              params?.value
            )}</div>`,
          wrapText: true,
          autoHeight: true
        }
      ]
    }
  },
  methods: {
    getFormulaBlockText (formula) {
      if (!formula) return ""
      const lines = `${formula || ""}`.split("\n")
      if (lines.length === 0) return ""
      return `<ul><li>${lines.join("</li><li>")}</li></ul>`
    }
  },
  props: {
    value: Object,
    incomeDetailResults: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  mounted () {
    this.items = this.value
  }
}
</script>

<style>
.formula-block ul {
  margin: 0;
  padding: 0;
}
.formula-block ul li {
  list-style: none;
  border-bottom: 1px dashed #ebebeb;
}
.formula-block ul li:last-child {
  border: none;
}
</style>
