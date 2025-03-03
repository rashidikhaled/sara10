<template>
  <safa-form
    id="5efe105e-d0b1-4d97-a427-26ef415cd26b"
    caption="شهرسازی- بازدید ساختمان"
  >

    <fit>
      <safa-datatable2
        v-model="value.Base_Front"
        :allowCopy="true"
        :bordered="false"
        :m="m"
        :selectable="true"
        fit
        height="100%"
        helper="baseFront"
        max-height="100%"
        title="پیشامدگیها و سایر کاربری های خاص"
      />
    </fit>

  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'PartialBaseFrontTab',
  mixins: [baseFormMixin],
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
