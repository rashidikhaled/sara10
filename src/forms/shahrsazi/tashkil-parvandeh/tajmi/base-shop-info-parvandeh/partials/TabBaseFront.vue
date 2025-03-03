<template>
  <fit>
    <safa-securityPanel
      id="b0c593c0-ab19-4bd3-a460-82db9968452a"
      caption="پیشامدگی"
      class="fit"
    >
      <safa-datatable2
        title="پیشامدگی ها"
        helper="baseFront"
        :m="m"
        v-model="value.Base_Front"
        fit
        height="100%"
        max-height="100%"
        :bordered="false"
        :allowCopy="true"
        :copyWithCount="true"
      />   <!-- ولیدیشن قرار داده شد -->
    </safa-securityPanel>
    <safa-securityPanel
      id="ffddd936-aa92-4c82-aaa4-155420f8c70b"
      caption="پیش آمدگی-تاریخ احداث"
      class="fit"
    >
      <safa-datatable2
        title="پیشامدگی ها"
        helper="baseFront"
        :m="m"
        v-model="value.Base_Front"
        fit
        height="100%"
        max-height="100%"
        :bordered="false"
      />   <!-- ولیدیشن قرار داده شد -->
    </safa-securityPanel>
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
