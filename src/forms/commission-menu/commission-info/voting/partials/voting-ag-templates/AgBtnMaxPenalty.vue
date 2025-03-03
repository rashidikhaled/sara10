<template>
  <btn-default class="full-width full-height" label="حداکثر" @click="clickHandle" />
</template>

<script>
export default {
  name: "AgBtnMaxPenalty",

  methods: {
    clickHandle () {
      this.params.btnMaxClicked()
    }
  }
}
</script>
