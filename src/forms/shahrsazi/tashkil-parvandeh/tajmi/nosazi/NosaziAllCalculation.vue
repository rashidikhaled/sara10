<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <safa-combo
        label=" سال شروع محاسبه "
        class="col-12 col-md-3  col-sm-4"
        domainName="CI_SaraM1"
        ciName="CI_DutyYear"
        v-model="dutyYear"
        label-width="100px"
      >
      </safa-combo>
      <!-- v-model="results.NidList.length" -->

      <safa-text
        class="col-12 col-md-3  col-sm-4"
        label="تعداد کل کدهای دریافت شده "
        m="r"
        label-width="140px"
      >
      </safa-text>
      <safa-combo
        class="col-12 col-md-3  col-sm-4"
        label="دسته اطلاعاتی"
        sourceType="local"
        :options="infoCategories"
        v-model="selectedInfoCategory"
        label-width="100px"
      >
      </safa-combo>

      <safa-text
        class="col-12 col-md-3  col-sm-4"
        label="شماره درخواست "
        v-model="selectedNidWorkItem"
        label-width="100px"
        m="r"
      >
      </safa-text>
    </div>
      <safa-datatable
        helper="dutyAllCalculation"
        :allowMultipleSelection="false"
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
      selectedInfoCategory: null,
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
      starttYear: 0,
      dutyYear: null,
      selectedNidWorkItem: ''
    }
  },
  props: {
    nosaziResult: Object,
    selectedNosaziCode: Object,
    codeInfoResults: Object
  }
}
</script>
