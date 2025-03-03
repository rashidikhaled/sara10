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
          v-model="codeInfoResults.NidList.length"
          m="r"
          class="col-12 col-md-3 col-sm-4"
          label-width="100px"
        >
        </safa-text>
        <safa-combo
          label="دسته اطلاعاتی "
          sourceType="local"
          :options="infoCategories"
          v-model="selectedInfoGroup"
          class="col-12 col-md-3 col-sm-4"
          label-width="100px"
        >
        </safa-combo>
        <safa-text
          label="شماره درخواست "
          v-model="nosaziResult.NidWorkItems"
          m="r"
          class="col-12 col-md-3 col-sm-4"
          label-width="100px"
        >
        </safa-text>
      </div>
      <safa-datatable
        helper="nosaziAllCalculation"
        v-model="nosaziResult.DutySessionHeaders"
        fit
        max-height="100%"
        height="100%"
        minHeight="100%"
        title="محاسبات"
        class="q-mt-sm"
      />
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      infoCategories: [
        {
          ID: 0,
          Title: 'اطلاعات پرونده'
        },
        {
          ID: 2,
          Title: 'بازدید'
        },
        {
          ID: 3,
          Title: ' مجاز پایانکار '
        },
        {
          ID: 100,
          Title: ' نوسازی '
        }
      ],
      selectedInfoGroup: 100,
      starttYear: 0
    }
  },
  props: {
    results: Array,
    nosaziResult: Object,
    selectedNosaziCode: Object,
    codeInfoResults: Object
  }
}
</script>
