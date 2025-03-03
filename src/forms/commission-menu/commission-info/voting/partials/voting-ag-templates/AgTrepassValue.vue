<template>
  <div class="flex items-center full-height">
    <safa-label>{{ totalValue }}</safa-label>
  </div>
</template>

<script>
export default {
  name: "AgTrepassValue",

  computed: {
    totalValue () {
      return this.params.totalValue()
    }
  }
}
</script>
