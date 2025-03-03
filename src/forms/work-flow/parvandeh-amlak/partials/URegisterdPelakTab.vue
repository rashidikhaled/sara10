<template>
  <section>
    <div class="row q-col-gutter-lg items-end">
      <div class="col-12 col-sm-4 col-md-3">
        <safa-custom-text
          type="decimal"
          label="مساحت طبق سند"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          label="بخش ثبتی"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          label="شماره سند اعیان"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-combo
          ciName="CI_Criterion"
          domainName="CI_SaraM1"
          input-debounce="0"
          label="نوع سند"
          :m="m"
        ></safa-combo>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          label="شماره قطعه"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-datepicker
          locale="fa"
          placeholder="تاریخ صدور سند"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          label="تاریخ صدور سند"
          :m="m"
        ></safa-datepicker>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-combo
          ciName="CI_Criterion"
          domainName="CI_SaraM1"
          input-debounce="0"
          label="مرجع صدور سند"
          :m="m"
        ></safa-combo>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          label="شماره سند عرصه"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-datepicker
          locale="fa"
          placeholder="تاریخ انتقال سند"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          label="تاریخ انتقال سند"
          :m="m"
        ></safa-datepicker>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-combo
          ciName="CI_Criterion"
          domainName="CI_SaraM1"
          input-debounce="0"
          label="وضعیت سند"
          :m="m"
        ></safa-combo>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-custom-text
          type="decimal"
          label="مساحت سند مادر"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-checkbox
          label="حقوق ارتفاقی"
          :m="m"
        ></safa-checkbox>
      </div>

      <div class="col-6">
        <safa-datatable
          v-model="items"
          :m="mode"
          helper="registerdPelak"
          title="پلاک ثبتی"
        ></safa-datatable>
      </div>

      <div class="col-6">
        <text-template label="ملاحضات سند"
                       formKey="ac307e96-e1a3-465a-b236-1808a36990c3"
                       :m="m"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'URegisterdPelakTab',
  data () {
    return {
      items: []
    }
  }
}
</script>

<style scoped>

</style>
