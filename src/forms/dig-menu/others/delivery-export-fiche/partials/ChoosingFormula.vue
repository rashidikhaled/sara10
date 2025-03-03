<template>
  <fit>
    <fit>
      <div class="grid q-pa-sm">
        <safa-checkbox
          v-for="el in value"
          :key="el.Key"
          class="q-mb-sm"
          :label="el.Header"
          v-model="el.IsSelected"
          :m="e"
        />
      </div>
    </fit>
    <div class="q-gutter-x-sm">
      <btn-default label="محاسبه" @click="handleCalc" />
      <btn-default label="انصراف" @click="handleCancel" />
    </div>
  </fit>
</template>

<script>
export default {
  props: {
    value: Array,
    m: String,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {

    }
  },
  methods: {
    handleCalc () {
      this.$emit("calculate", true)
    },
    handleCancel () {
      this.$emit("calculate", false)
    }
  }
}
</script>
