<template>
  <fit>
    <form-row :xl="4">
      <form-control>
        <safa-text
          label="نام مودی"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-text
          label="کد ملی"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-text
          label="میزان بدهی(ریال)"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-text
          label="تاریخ بدهی"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm">
      <form-control class="col-12">
        <nosazi-code-input
          label="کدنوسازی"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          label-width="115px"
          :m="'r'"
          :actions="false"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm" :xl="4">
      <form-control>
        <safa-combo
          label="علت بدهی"
          ciName="CI_CauseDebt"
          domainName="Estate"
          label-width="120px"
          :m="m"
          v-model="CI_CauseDebt"
        />
      </form-control>
      <form-control>
        <safa-text
          label="نامه اعلام بدهی به مرکز"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-text
          label="شماره"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ"
          label-width="120px"
          :m="m"
          clearable
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm" :xl="4">
      <form-control>
        <safa-text
          label="نام مالک"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control>
        <safa-text
          label="کد ملی"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm">
      <form-control class="col-6">
        <safa-text
          label="آدرس"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
      <form-control class="col-6">
        <safa-text
          label="پلاک ثبتی"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm">
      <form-control class="col-12">
        <nosazi-code-input
          label="کدنوسازی"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          label-width="115px"
          :m="'r'"
          :actions="false"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm" :xl="4">
      <form-control>
        <safa-combo
          label="نوع سند"
          ciName="CI_DocType2"
          domainName="Estate"
          label-width="120px"
          :m="m"
          v-model="CI_DocType2"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="نوع مالکیت عرصه"
          ciName="CI_OwnerType"
          domainName="Estate"
          label-width="120px"
          :m="m"
          v-model="CI_OwnerType"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="مورد واگذاری"
          ciName="CI_CessionItem"
          domainName="Estate"
          label-width="120px"
          :m="m"
          v-model="CI_CessionItem"
        />
      </form-control>
      <form-control>
        <safa-text
          label="کلاسه بایگانی"
          label-width="120px"
          :m="m"
          v-model="BudgetTitle"
          cdcName="BudgetTitle"
        />
      </form-control>
    </form-row>

    <form-row class="q-mt-sm">
      <form-control class="col-12">
        <text-template
          v-model="Description"
          label-width="120px"
          :m="m"
          formKey="3B9A44AD-260F-45F4-80BB-99801FC59CEE"
          label="توضیحات"
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
      default: "e"
    }
  },
  data () {
    return {
      name: "InfoEstate"
    }
  }
}
</script>
