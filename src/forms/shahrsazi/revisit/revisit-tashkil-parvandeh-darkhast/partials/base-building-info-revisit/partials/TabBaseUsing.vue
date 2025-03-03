<template>
  <safa-form
    id="5efe105e-d0b1-4d97-a427-26ef415cd26b"
    caption="شهرسازی- بازدید ساختمان"
  >
    <fit>
      <safa-datatable2
        v-model="value.Base_Using"
        :allowCopy="true"
        :bordered="false"
        :m="m"
        :selectable="true"
        fit
        height="100%"
        helper="shahrsazi.baseUsing"
        max-height="100%"
        title="کاربری ها"
      />
    </fit>
  </safa-form>
</template>

<script>
export default {
  name: 'PartialBaseUsingTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
