<template>
  <fit>
    <safa-grid
      v-model="gvDocInfo"
      fit
      max-height="100%"
      height="100%"
      minHeight="400px"
      paginate
      :suppressRowClickSelection="false"
      m="r"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      :columns="columns"
    />
    <form-row class="q-mt-sm" :sm="1" :md="3" :xl="3" :lg="3">
      <form-control>
        <safa-text
          label="جمع قیمت تمام شده برای شهرداری"
          label-width="170px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-text
          label="شماره صلح نامه"
          label-width="170px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ صلح نامه"
          label-width="170px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ تحویل ملک به شهرداری"
          label-width="170px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ انتقال سند به نام شهرداری"
          label-width="170px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
    </form-row>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    m: {
      type: String,
      default: "r"
    }
  },
  data () {
    return {
      name: "CostAnalysisForMunicipality",
      columns: [
        {
          field: "OwnershipPrice",
          title: "ارزش ملک مورد تهاتر",
          width: "130px"
        },
        {
          field: "TechnicianPrice",
          title: "هزینه کارشناس رسمی دادگستری سهم شهرداری",
          width: "250px"
        },
        {
          field: "DebtEntryLimits",
          title: "بدهی پلاک بابت مزایای ورود به محدوده",
          width: "250px"
        },
        {
          field: "RightToReside",
          title: "تخفیف نقدی",
          width: "100px"
        },
        {
          field: "CashDiscountFloatingPoint",
          title: "سایر هزینه ها",
          width: "110px"
        }
      ]
    }
  }
}
</script>
