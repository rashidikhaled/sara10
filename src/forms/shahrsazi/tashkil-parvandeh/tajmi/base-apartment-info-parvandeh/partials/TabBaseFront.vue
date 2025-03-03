<template>
  <safa-form
    id="4e10b4e4-f3f3-4b05-ba87-04d8a3384a26"
    caption="شهرسازی- تشکیل پرونده آپارتمان"
  >
    <fit>
      <safa-securityPanel
        id="9144f430-94db-4b36-a3a7-1570d574adab"
        caption="پیش آمدگی"
        tag="div"
        class="fit"
      >
        <safa-datatable2
          helper="baseFront"
          :m="m"
          v-model="value.Base_Front"
          title="پیشامدگی ها"
          fit
          height="100%"
          max-height="100%"
          :allowCopy="true"
          :copyWithCount="true"
        />   <!-- ولیدیشن قرار داده شد -->
      </safa-securityPanel>

      <safa-securityPanel
        id="d4dffab8-3d47-45eb-938b-8f65daafe999"
        caption="پیش آمدگی-تاریخ احداث"
        tag="div"
        class="fit"
      >
        <safa-datatable2
          helper="extra_baseFront"
          fit
          height="100%"
          max-height="100%"
          :m="m"
          v-model="value.Base_Front"
          title="پیشامدگی ها"
          :allowCopy="true"
          :copyWithCount="true"
          :bordered="false"
        />   <!-- ولیدیشن قرار داده شد -->
      </safa-securityPanel>
    </fit>
  </safa-form>
</template>
<script>
export default {
  name: 'TabBaseFront',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    },
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>
