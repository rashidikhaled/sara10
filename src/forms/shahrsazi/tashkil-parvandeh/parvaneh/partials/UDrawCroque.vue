<template>
  <form-wrapper title="رسم کروکی" vertical>
    <fit>
      <safa-sketch
        class="fit"
        :readonly="!m"
        :sketch-id="calcSketchId"
      />
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
  },
  computed: {
    calcSketchId () {
      if (
        this.value.NidLib &&
        this.value.NidLib.RMovafeghatOsooli &&
        this.value.NidLib.RMovafeghatOsooli.NidBase
      ) {
        return this.value.NidLib.RMovafeghatOsooli.NidBase
      } else {
        return "00000000-0000-0000-0000-000000000000"
      }
    }
  }
}
</script>
