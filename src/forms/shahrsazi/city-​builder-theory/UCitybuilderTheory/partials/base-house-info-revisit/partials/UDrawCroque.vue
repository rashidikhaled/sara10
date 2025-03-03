<template>
  <form-wrapper title="رسم کروکی" vertical>
    <fit>
      <safa-sketch :readonly="!m" :sketch-id="value.NidBase_Parvandeh_HouseOrDastgah" class="fit" />
    </fit>
    <form-actions :showEditButton="false">
      <template #after>
        <btn-cancel label="بستن" @click="$emit('cancel')"></btn-cancel>
      </template>
    </form-actions>
  </form-wrapper>
</template>

<script>
export default {
  name: 'UDrawCroque',

  props: {
    m: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },

  updated () {
    debugger
  }
}
</script>
