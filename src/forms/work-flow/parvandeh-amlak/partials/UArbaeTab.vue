<template>
  <section>
    <safa-datatable
      v-model="items"
      :m="mode"
      helper="parvandehAmlakOwners"
      title="مالکین"
    ></safa-datatable>

    <safa-grid
      v-model="items"
      :m="mode"
      helper="parvandehAmlakJahateArbae"
      title="جهات اربعه"
      fit
    ></safa-grid>
  </section>
</template>

<script>
export default {
  name: 'UArbaeTab'
}
</script>

<style scoped>

</style>
