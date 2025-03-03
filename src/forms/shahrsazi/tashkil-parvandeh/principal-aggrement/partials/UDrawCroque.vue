<template>
  <form-wrapper title="رسم کروکی" vertical>
    <fit>
      <safa-sketch
        class="fit"
        :readonly="!m"
        :sketch-id="value.NidLib.RMovafeghatOsooli.NidBase"
      />
    </fit>
    <form-actions :showEditButton="false">
      <template #after>
        <btn-cancel label="بستن" @click="$emit('cancel')" />
      </template>
    </form-actions>
  </form-wrapper>
</template>

<script>
export default {
  name: "UDrawCroque",

  props: {
    m: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
