<template>
    <fit>
      <!-- <safa-securityPanel
        id="1443cc80-3664-48f4-b2ca-d0898d079db1"
        caption="پیش آمدگی"
        tag="div"
        class="fit"
      > -->
        <safa-grid
          title="پیش آمدگیها"
          helper="agbaseFront"
          :m="m"
          v-model="value.Base_Front"
          cdcName="Base_Front"
          :selectable="false"
          :emptyRowLimit="1"
          fit
          height="100%"
          max-height="100%"
          min-height="150px"
          :bordered="false"
        />
      <!-- </safa-securityPanel> -->
      <!-- <safa-securityPanel
        id="85578f1d-d267-4cfe-b9f8-d42cc5e3f1e7"
        caption="پیش آمدگی-تاریخ احداث"
        tag="div"
        class="fit"
      >
        <safa-datatable
          title="پیش آمدگی ها"
          helper="baseFront"
          :m="m"
          v-model="value.Base_Front"
          cdcName="Base_Front"
          :selectable="false"
          :emptyRowLimit="1"
          fit
          height="100%"
          max-height="100%"
          min-height="150px"
          :bordered="false"
        />
      </safa-securityPanel> -->
    </fit>
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
