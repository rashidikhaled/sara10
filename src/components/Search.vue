<template>
  <section class="q-mb-lg">
    <div class="row q-col-gutter-md items-end">
      <slot name="before"></slot>
      <div class="col-12 col-sm-6 col-md-4">
        <safa-text
          m="e"
          :value="initValue"
          :label="title"
          @input="updateText"
          :type="inputType"
          v-bind="$attrs"
          @keyup.enter="keyUp"
        >
        </safa-text>
      </div>
      <div class="col-12 col-sm">
        <div class="row items-center q-col-gutter-md">
          <span class="col col-sm-auto">
            <q-btn
              :label="buttonText"
              :icon="buttonIcon"
              :color="buttonColor"
              @click="onclick"
              class="btn-search"
            /></span>
          <span class="col">
            <slot></slot>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Search',
  data: function () {
    return {
      initValue: ''
    }
  },
  methods: {
    keyUp (e) {
      this.$emit('enterPressed', e)
    },
    onclick () {
      this.$emit('click', this.initValue)
    },
    updateText ($value) {
      this.$emit('input', $value)
    }
  },
  mounted () {
    this.initValue = this.value
  },
  watch: {
    value (newVal) {
      this.initValue = newVal
    }
  },
  props: {
    inputType: String,
    title: {
      type: String,
      default: 'جستجو'
    },
    buttonColor: {
      type: String,
      default: 'primary'
    },
    buttonIcon: {
      type: String,
      default: 'search'
    },
    buttonText: {
      type: String,
      default: 'جستجو'
    },
    value: String
  }
}
</script>

<style scoped>
</style>
