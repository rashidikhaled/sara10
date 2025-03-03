<template>
  <form-wrapper title="مشاهده کروکی" vertical>
    <fit>
      <div class="flex items-center justify-center">
        <safa-sketch
          :readonly="true"
          :sketch-id="value.fil_Info.NidProc"
          cdcName="fil_Info.NidProc"
          height="250px"
          width="300px"
        />
      </div>
    </fit>
  </form-wrapper>
</template>

<script>
export default {
  name: "TabCroque",

  props: {
    value: {
      type: Object,
      default: () => ({
        fil_Info: {}
      })
    },
    m: String
  }
}
</script>
