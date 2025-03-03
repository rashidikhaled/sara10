<template>
  <form-wrapper title="رسم کروکی" vertical>
    <fit>
      <safa-sketch
        class="fit"
        :readonly="!m"
      :sketch-id="value.fil_Info.NidProc"
        cdcName="fil_Info.NidProc"
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
      default: () => ({
        fil_Info: {}
      })
    }
  }
}
</script>
