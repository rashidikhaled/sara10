<template>
  <section>
    <safa-text
      v-model="nationalCode"
      :rules="[nationalCodeRule,requiredRule]"
      :label="label"
      :maxlength="10"
      type="number"
    />
  </section>
</template>

<script>
export default {
  name: 'NationalCodeInput',
  data () {
    return {
      nationalCode: ''
    }
  },
  props: {
    label: {
      type: String,
      default: 'کد ملی'
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    value: [Number, String]
  },
  mounted () {
    this.nationalCode = this.value || ''
  },
  watch: {
    nationalCode () {
      this.$emit('input', this.nationalCode)
    },
    value () {
      this.nationalCode = this.value
    }
  },
  computed: {
    getListeners () {
      const { input, ...others } = this.$listeners
      return { ...others }
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    },
    nationalCodeRule (val) {
      if (!val) {
        return
      }

      if (!/^\d{10}$/.test(val) ||
        val === '0000000000' ||
        val === '1111111111' ||
        val === '2222222222' ||
        val === '3333333333' ||
        val === '4444444444' ||
        val === '5555555555' ||
        val === '6666666666' ||
        val === '7777777777' ||
        val === '8888888888' ||
        val === '9999999999') {
        return 'کد ملی وارد شده اشتباه است'
      }
      let check = parseInt(val[9])
      let sum = 0
      let i

      for (i = 0; i < 9; ++i) {
        sum += parseInt(val[i]) * (10 - i)
      }
      sum %= 11

      let result = (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)

      if (!result) {
        return 'کد ملی وارد شده اشتباه است'
      }

      return undefined
    },
    requiredRule (val) {
      if (!val && this.isRequired) {
        return 'لطفا کد ملی را وارد کنید'
      }
    }
  }
}
</script>

<style scoped>

</style>
