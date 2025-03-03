<template>
  <form-wrapper title="مشاهده کروکی" vertical>
    <fit>
      <safa-sketch
        class="fit"
        height="100%"
        :readonly="m!=='e'"
        :sketch-id="value._nidBase"
        cdcName="_nidBase"
      />
    </fit>
  </form-wrapper>
</template>

<script>
export default {
  name: 'TabCroquie',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
