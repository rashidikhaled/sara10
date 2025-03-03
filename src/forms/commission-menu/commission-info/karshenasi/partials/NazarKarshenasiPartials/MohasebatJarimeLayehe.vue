<template>
  <div class="full-height" style="flex: 1">
    <safa-datatable
      :allowNewRow="false"
      :allowRemoveRow="false"
      :allowCopy="false"
      :allowSelect="false"
      height="100%"
      max-height="100%"
      min-height="250px"
      :columns="mohasebatKarshenasi"
      :bordered="false"
      :value="mohasebatJarime"
      cdcName="mohasebatJarime"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      mohasebatKarshenasi: [
        { field: "Id", title: "کد تخلف" },
        { field: "Title", title: "تخلف" },
        { field: "CI_Years", title: "سال تخلف" },
        {
          field: "TrepassValue",
          title: "مقدار تخلف",
          calculateFunc: ({ column, rows }) => {
            if (!rows) return ""
            const result = rows.reduce(function (a, b) {
              return a + parseFloat(b[column.field])
            }, 0)
            return `جمع : ${result.toFixed(2)}`
          }
        },
        // { field: "TrepassValue", title: "جمع" },
        {
          field: "MinPenalty",
          title: "حداقل جریمه"
          // calculateFunc: ({ column, rows }) => {
          //   if (!rows) return ""
          //   const result = rows.reduce(function (a, b) {
          //     return a + parseFloat(b[column.field])
          //   }, 0)
          //   return `جمع : ${result.toNumberWithCommas()}`
          // }
        },
        {
          field: "MaxPenalty",
          title: "حداکثر جریمه"
          // calculateFunc: ({ column, rows }) => {
          //   if (!rows) return ""
          //   const result = rows.reduce(function (a, b) {
          //     return a + parseFloat(b[column.field])
          //   }, 0)
          //   return `جمع : ${result.toNumberWithCommas()}`
          // }
        },
        { field: "Floor", title: "طبقه" },
        { field: "UsingGroupTitle", title: "گروه کاربری" },
        { field: "UsingTitle", title: "کاربری" },
        { field: "P", title: "p" },
        { field: "K", title: "ارزش معاملاتی طبق تبصره ماده صد (k)" },
        {
          field: "KCoeffiecient",
          title: "ارزش معاملاتی طبق تبصره 11 ماده صد (k)"
        },
        {
          field: "TrespassDateInMunicipality",
          title: "تاریخ وقوع تخلف از نظر شهرداری"
        },
        {
          field: "TrespassDateInEngineer",
          title: "تاریخ وقوع تخلف از نظر مهندس ناظر"
        },
        {
          field: "TrespassDateHappendNotMelak",
          title: "تایخ وقوع خلاف ملاک عمل"
        },
        {
          field: "CI_SazeType",
          title: "نوع اسکلت",
          editor: "combo",
          domain: "Commission100",
          width: "100px"
        },
        { field: "BuildingStep", title: "مرحله ساختمانی" },
        { field: "DescriptionOfSystem", title: "شرح مقدار سیستمی" },
        { field: "VahedCountMojaz", title: "تعداد واحد موجود" },
        { field: "VahedCountMosavab", title: "تعداد واحد مجاز" },
        { field: "AreaMojod", title: "متراژ موجود " },
        { field: "AreaMojaz", title: "متراز مجاز" },
        { field: "Trepass_Comments", title: "توضیحات" },
        { field: "Note", title: "تبصره" },
        {
          field: "IsComplainant",
          title: "شاکی دارد / ندارد",
          editor: "checkbox"
        },
        {
          field: "IsRightsBystanders",
          title: "حقوق مجاورین",
          editor: "checkbox"
        },
        { field: "TrepassValueAmar", title: "متراژ کسر از آمار" },
        {
          field: "CI_TrepassStatus",
          title: "وضعیت تخلف",
          editor: "combo",
          domain: "Commission100",
          width: "100px"
        },
        { field: "CalculationPrice", title: "قیمت محاسباتی" },
        { field: "CommissionSarghofliValue", title: "ارزش سر قفلی" }
      ]
    }
  },
  props: {
    value: Object
  },
  computed: {
    mohasebatJarime () {
      return this.value.CommissionTrepasses || []
    }
  }
}
</script>
