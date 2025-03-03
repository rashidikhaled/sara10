<template>
  <safa-text
      :label="label"
      v-model="internalvalue"
      :label-width="labelWidth"
      :labelShrink="labelShrink"
      :m="m"
      :dir="dir"
      :subtext="subtext"
      :class="{readonlyShowLabel}"
      @blur="onFocus"
      onclick="this.select()"
    />
    <!-- <q-input
      :value="value"
      @input="updateText"
      >
    </q-input> -->
</template>

<script>
import { convertNumberToMoney, convertBackMoneyToNumber, convertNumberToDecimal, convertNumberToDiscount } from '../accounting/moneyConverter'
export default {
  name: 'SafaCustomText',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    labelShrink: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
      default: 0
    },
    dir: {
      type: String,
      default: 'ltr'
    },
    subtext: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'money'
    },
    labelWidth: {
      type: String,
      default: ''
    },
    m: {
      type: String,
      default: 'e'
    },
    readonlyShowLabel: Boolean
  },
  data () {
    return {
      internalvalue: this.value
      // changedValue: false
    }
  },
  watch: {
    // value (newValue) {
    //   if (!this.changedValue) {
    //     this.initValue = newValue
    //   } else {
    //     if (this.initValue === newValue) {
    //       this.changedValue = false
    //     }
    //     this.history = {
    //       old: this.initValue,
    //       new: newValue !== this.initValue ? this.value : null
    //     }
    //   }
    // },
    value () {
      if (this.type === 'money') {
        this.internalvalue = this.convertNumberToMoney(this.value)
      }
      if (this.type === 'decimal' && this.m === 'e' && this.internalvalue !== 0) {
        this.internalvalue = this.convertNumberToDecimal(this.value)
      } else if (this.type === 'decimal' && this.m === 'r') {
        this.internalvalue = this.value
      }
      if (this.type === 'discount') { // not ready
        this.internalvalue = this.convertNumberToDiscount(this.value)
      }
    }
  },
  methods: {
    convertNumberToMoney (n) {
      return convertNumberToMoney(n)
    },
    convertNumberToDecimal (n) {
      return convertNumberToDecimal(n)
    },
    convertNumberToDiscount (n) {
      return convertNumberToDiscount(n)
    },
    onFocus () {
      if (this.type === 'decimal') {
        this.internalvalue = this.convertNumberToDecimal(this.internalvalue)
        this.$emit('input', this.internalvalue)
      }
    }
  },
  mounted () {
    if (this.type === 'money') {
      this.internalvalue = this.convertNumberToMoney(this.value)
    }
    if (this.type === 'decimal' && this.m === 'e' && this.internalvalue !== 0) {
      this.internalvalue = this.convertNumberToDecimal(this.value)
    } else if (this.type === 'decimal' && this.m === 'r') {
      this.internalvalue = this.value
    }
    if (this.type === 'discount' && this.internalvalue !== 0) {
      this.internalvalue = this.convertNumberToDiscount(this.value)
    }
  },
  updated () {
    if (this.type === 'money') {
      this.internalvalue = this.convertNumberToMoney(this.internalvalue)
      // let tets= convertBackMoneyToNumber(this.internalvalue)
      this.$emit('input', convertBackMoneyToNumber(this.internalvalue))
    }
    // if (this.type === 'decimal' && this.value.toString().includes('.')) {
    //   this.internalvalue = this.convertNumberToDecimal(this.internalvalue)
    // }
    if (this.type === 'discount' && this.internalvalue !== 0) {
      this.internalvalue = this.convertNumberToDiscount(this.internalvalue)
    }
  }

}
</script>
