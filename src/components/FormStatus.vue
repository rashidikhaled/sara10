<template>
  <safa-status :result="formResult" />
</template>
<script>
import ResponseParser from 'src/utils/responseParser'
export default {
  data () {
    return {
      formResult: {}
    }
  },
  props: {
    value: {
      type: [Object, Array],
      default: () => {}
    }
  },
  methods: {
    checkResponse () {
      if (!this.value) return

      this.formResult = new ResponseParser(this.value).get()
    }
  },
  mounted () {
    this.checkResponse()
  },
  watch: {
    value: {
      handler () {
        this.checkResponse()
      },
      deep: true
    }
  }
}
</script>
