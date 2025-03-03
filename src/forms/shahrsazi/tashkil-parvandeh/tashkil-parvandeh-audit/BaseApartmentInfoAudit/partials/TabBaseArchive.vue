<template>
  <section>
    <safa-datatable
      minHeight="150px"
      title="سوابق شهرسازی"
      helper="baseShahrsaziArchive"
      :m="m"
      v-model="value.Base_ShahrsaziArchive"
    />

    <safa-datatable
      minHeight="150px"
      title="سوابق شهرسازی ملک"
      helper="baseShahrsaziArchiveHouse"
      :m="m"
      v-model="value.Base_ShahrsaziArchiveHouse"
      class="q-mt-lg"
      :margin="null"
    />

  </section>
</template>

<script>
export default {
  name: 'TabBaseArchive',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
