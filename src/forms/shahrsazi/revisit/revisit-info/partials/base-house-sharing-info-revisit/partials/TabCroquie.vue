<template>
  <form-wrapper title="مشاهده کروکی" vertical>
    <fit>
      <div class="flex items-center justify-center">
        <safa-sketch
          :readonly="true"
          :sketch-id="value.NidBase_Parvandeh_HouseOrDastgah"
          height="250px"
          width="300px"
        />
      </div>
    </fit>
  </form-wrapper>
</template>

<script>
export default {
  name: "TabCroquie",
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
