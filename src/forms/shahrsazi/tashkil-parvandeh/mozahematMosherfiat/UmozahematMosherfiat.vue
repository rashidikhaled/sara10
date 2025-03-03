<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      vertical
      :hasFooter="false"
      title="مزاحمت مشرفیت"
      :padding="false"
    >
      <safa-status :result="requestResult"></safa-status>
      <fit>
        <safa-group label-width="90px" :size="{lg:5,md:8,sm:auto}">
          <safa-text  class="q-mt-sm q-ml-sm"/>
          <div class="col-auto  q-mt-sm" >
          <btn-default
            label="محاسبه"
          />
          </div>
          <safa-text label="کد لایه وضع موجود"  class="q-mt-sm"></safa-text>
          <safa-text label="کد لایه اعیان"  class="q-mt-sm"></safa-text>
          <safa-text label="کد لایه معابر"  class="q-mt-sm"></safa-text>
          <safa-text label="طول سایه اندازی"  class="q-mt-sm"></safa-text>
          <safa-checkbox
            label="نمایش سایه"
            class="col-2 col-md-auto q-mt-sm"
            v-model="saye"
          ></safa-checkbox>
          <safa-checkbox
            label="نمایش ملک"
            class="col-2 col-md-auto q-mt-sm"
            v-model="melk"
          ></safa-checkbox>
        </safa-group>

        <safa-datatable
          helper="Moshrefiat"
          height="100%"
          max-height="100%"
          min-height="100%"
          margin="0"
          title="آنالیز عقب نشینی از سمت شمال"
          :bordered="false"
          fit
        ></safa-datatable>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'مزاحمت مشرفیت',
      formKey: 'b0ac4dc0-e407-4386-b3c3-6bebc95edcf0',
      name: 'UmozahematMosherfiat',
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
