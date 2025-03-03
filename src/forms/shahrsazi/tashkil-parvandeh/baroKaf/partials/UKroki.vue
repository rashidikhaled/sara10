<template>
  <form-wrapper title="مشاهده کروکی" vertical>
    <fit>
      <div class="flex items-center justify-center">
        <safa-sketch
          height="350px"
          width="400px"
          :readonly="true"
          :sketch-id="value.NidBase_Parvandeh_HouseOrDastgah"
          cdcName="NidBase_Parvandeh_HouseOrDastgah"
        />
      </div>
    </fit>
  </form-wrapper>
</template>

<script>
export default {
  name: "UKroki",
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
