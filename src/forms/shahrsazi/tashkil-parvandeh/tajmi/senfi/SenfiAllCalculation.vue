<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <safa-combo
        label=" سال شروع محاسبه "
        domainName="CI_SaraM1"
        ciName="CI_ShahrsaziArchiveKind"
        class="col-12 col-md-3 col-sm-4"
        label-width="100px"
      />
      <safa-text
        label="تعداد کل شغل های دریافت شده "
        m="r"
        class="col-12 col-md-3 col-sm-4"
        label-width="100px"
        />
      <safa-combo
        label="دسته اطلاعاتی "
        domainName="CI_SaraM1"
        ciName="CI_ShahrsaziArchiveKind"
        class="col-12 col-md-3 col-sm-4"
        label-width="100px"
      />
      <safa-combo
        label="شماره درخواست "
        domainName="CI_SaraM1"
        ciName="CI_ShahrsaziArchiveKind"
        class="col-12 col-md-3 col-sm-4"
        label-width="100px"
      />
    </div>
    <safa-datatable
      helper="senfiAllCalculation"
      v-model="results"
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      class="q-mt-sm"
      title="تمام محاسبات"
    />
    <template>
      <div class="q-gutter-sm q-mt-sm">
        <btn-default @click="accept" label="محاسبه"/>
        <btn-default @click="cancle" label=" صدور فیش"/>
        <btn-default @click="nosazi" label="صدور قسطی"/>
        <btn-default @click="senfi" label="قطعیت"/>
        <btn-default @click="accept" label="عدم قطعیت"/>
        <btn-delete @click="accept" label="حذف"/>
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
