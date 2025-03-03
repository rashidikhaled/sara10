<template>
  <safa-form
    id="52189054-a984-47b7-bd89-393db66b9497"
    caption="شهرسازی- بازدید صنفی"
  >
    <fit>
      <safa-securityPanel
        id="7acaf028-dd8b-460c-9bd7-e4f1285f95a6"
        caption="پیش آمدگی"
        class="fit"
        tag="div"
      >
        <safa-datatable
          v-model="value.Base_Front"
          :bordered="false"
          :m="m"
          fit
          height="100%"
          helper="baseFront"
          max-height="100%"
          title="پیشامدگی ها"
        />
      </safa-securityPanel>

      <safa-securityPanel
        id="a0c3b85d-b3d9-4032-9ffb-574d5dce89b1"
        caption="پیش آمدگی-تاریخ احداث"
        class="fit"
        tag="div"
      >
        <safa-datatable
          v-model="value.Base_Front"
          :bordered="false"
          :m="m"
          fit
          height="100%"
          helper="extra_baseFront"
          max-height="100%"
          title="پیشامدگی ها"
        />
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
    }
  }
}
</script>
