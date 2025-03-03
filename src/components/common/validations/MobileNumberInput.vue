<template>
  <section>
    <safa-text
      label="شماره تلفن همراه"
      :rules="[mobileNumberRule,requiredRule]"
      v-model="mobileNumber"
      type="number"
    />
  </section>
</template>

<script>
export default {
  name: 'MobileNumberInput',
  data () {
    return {
      mobileNumber: ''
    }
  },
  props: {
    isRequired: {
      type: Boolean,
      default: false
    },
    value: [Number, String]
  },
  watch: {
    mobileNumber () {
      this.$emit('input', this.mobileNumber)
    },
    value () {
      this.nationalCode = this.value
    }
  },
  mounted () {
    this.mobileNumber = this.value || ''
  },
  computed: {
    getListeners () {
      const { input, ...others } = this.$listeners
      return { ...others }
    }
  },
  methods: {
    mobileNumberRule (val) {
      if (!val) {
        return
      }
      if (!/^(\0|0)?9\d{9}$/.test(val)) {
        return 'شماره تلفن همراه وارد شده اشتباه است'
      }
    },
    requiredRule (val) {
      if (!val && this.isRequired) {
        return 'لطفا شماره تلفن همراه را وارد کنید'
      }
    }
  }
}
</script>

<style scoped>

</style>
