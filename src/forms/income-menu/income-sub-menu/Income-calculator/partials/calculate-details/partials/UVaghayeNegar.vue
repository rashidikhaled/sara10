<template>
  <div class="fit">
    <safa-datatable
      ref="grid"
      name="grid"
      helper="vaghayeNegar"
      height="100%"
      max-height="100%"
      title="وقایع نگار"
      fit
    ></safa-datatable>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  props: {
    incomeDetailsResults: Object
  },
  mounted () {},
  methods: {}
}
</script>
