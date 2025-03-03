<template>
  <FormWrapper hideTitle :padding="false">
      <div class="q-gutter-sm q-mx-sm q-py-sm">
        <btn-default
          v-for="el in list"
          :key="el.Key"
          :label="el.Header"
          :class="`full-width ${customClass}`"
        />
      </div>
    <template #footer>
      <div class="q-gutter-sm">
        <btn-default label="محاسبه" @click="$emit('calculate', true)" />
        <btn-default label="انصراف" @click="$emit('calculate', false)" />
      </div>
    </template>
  </FormWrapper>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    m: String
  },

  computed: {
    list () {
      if (Array.isArray(this.value)) {
        return this.value
      } else return []
    },
    customClass () {
      return ""
    }
  },

  data () {
    return {}
  },

  methods: {
  }
}
</script>
