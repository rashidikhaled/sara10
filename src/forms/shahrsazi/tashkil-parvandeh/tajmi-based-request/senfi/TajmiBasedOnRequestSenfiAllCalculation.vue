<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <safa-combo
        label=" سال شروع محاسبه "
        domainName="CI_SaraM1"
        ciName="CI_DutyYear"
        v-model="starttYear"
        class="col-12 col-md-3 col-sm-4"
        label-width="100px"
      >
      </safa-combo>
      <safa-text
        label="تعداد کل کدهای دریافت شده "
        m="r"
        class="col-12 col-md-3 col-sm-4"
        label-width="100px"
      >
      </safa-text>
      <safa-combo
        label="دسته اطلاعاتی "
        sourceType="local"
        class="col-12 col-md-3 col-sm-4"
        label-width="100px"
      >
      </safa-combo>
      <safa-text
        label="شماره درخواست "
        m="r"
        class="col-12 col-md-3 col-sm-4"
        label-width="100px"
      >
      </safa-text>

    </div>
    <safa-datatable
      helper="nosaziAllCalculation"
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      title="محاسبات"
      class="q-mt-sm"
    />
    <template>
      <div class="q-gutter-sm q-mt-sm">
        <btn-default @click="accept" label="محاسبه"></btn-default>
        <btn-default @click="cancle" label=" صدور فیش"></btn-default>
        <btn-default @click="nosazi" label="صدور قسطی"></btn-default>
        <btn-default @click="senfi" label="قطعیت"></btn-default>
        <btn-default @click="accept" label="عدم قطعیت"></btn-default>
        <btn-delete @click="accept" label="حذف"></btn-delete>
      </div>
    </template>
  </fit>
</template>
<script>
export default {
  props: {
    results: Array
  }
}
</script>
