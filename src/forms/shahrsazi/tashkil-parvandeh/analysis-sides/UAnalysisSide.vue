<template>
  <safa-form :id="formKey" :caption="title" appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <form-wrapper :hasFooter="false" title="مزاحمت مشرفیت">
      <safa-status :result="requestResult"></safa-status>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text label-width="70px" />
            <div class="col-auto q-mt-sm">
              <btn-default label="محاسبه" />
            </div>
          </FormControl>
          <FormControl>
            <safa-text label="کد لایه وضع موجود" label-width="70px" />
          </FormControl>
          <FormControl>
            <safa-text label="کد لایه اعیان" label-width="70px" />
          </FormControl>
          <FormControl>
            <safa-text label="کد لایه معابر" label-width="70px" />
          </FormControl>
          <FormControl>
            <safa-text label="طول سایه اندازی" label-width="70px" />
          </FormControl>
          <FormControl>
            <safa-checkbox
              label="نمایش سایه"
              label-width="70px"
              v-model="saye"
              cdcName="saye"
            />
          </FormControl>
          <FormControl>
            <safa-checkbox
              label="نمایش ملک"
              label-width="70px"
              v-model="melk"
              cdcName="melk"
            />
          </FormControl>
        </FormRow>
        <fit>
          <safa-datatable
            helper="AnalysisJahat"
            cdcName="AnalysisJahat"
            height="100%"
            max-height="100%"
            min-height="100%"
            margin="0"
            title="آنالیز جهات"
            :bordered="false"
            fit
          ></safa-datatable>
        </fit>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: '"آنالیز جهات',
      formKey: "b0ac4dc0-e407-4386-b3c3-6bebc95edcf0",
      name: "UAnalysisSide",
      main: true,
      requestResult: [],
      saye: false,
      melk: false
    }
  },
  mounted () {},
  methods: {}
}
</script>
