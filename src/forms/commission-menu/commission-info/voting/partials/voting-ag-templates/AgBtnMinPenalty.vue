<template>
  <btn-default class="full-width full-height" label="حداقل" @click="clickHandle" />
</template>

<script>
export default {
  name: "AgBtnMinPenalty",

  methods: {
    clickHandle () {
      this.params.btnMinClicked()
    }
  }
}
</script>
