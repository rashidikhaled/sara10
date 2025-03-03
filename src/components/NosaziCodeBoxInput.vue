<template>
    <div
        class="row no-wrap reverse"
        ref="nosazi"
        v-if="m==='e'"
    >
        <span
        :key="part"
        class="nosazi-input-wrap"
        v-for="(part, i) in sections"
        >
        <auto-width-input
        :disabled="false"
        :index="i"
        :min="0"
        :maxlength="inputLengths[i]"
        :readonly="getMode(i)==='r'"
        :ref="'nosaziCodeInputRef' + i"
        :title="getPartName(i)"
        @change="inputValueChanged"
        @focus="onFocus"
        @keyup="inputKeyPressed"
        class="nosazi-input input-number"
        type="number"
        v-model="code[part]"
        />
    </span>
    </div>
    <div v-else class="nosazi-preview flex no-wrap items-center" style="cursor: not-allowed" dir="ltr">
        <span
        :key="part"
        :title="getPartName(i)"
        v-for="(part, i) in sections">
        {{code[part]}}
        </span>
    </div>
</template>

<script>
import AutoWidthInput from './common/AutoWidthInput.vue'

export default {
  components: { AutoWidthInput },
  name: 'NosaziCodeBoxInput',
  props: {
    m: {
      type: String,
      default: 'e'
    },
    enabled: {
      type: String,
      default: '1-1-1-1-1-1-1'
    },
    lengths: {
      type: String,
      default: '10-10-10-10-10-10-10'
      // default: '2-4-4-4-3-3-3'
    },
    value: [String, Object],
    liveUpdate: Boolean,
    liveUpdateOnEnd: Boolean,
    loadSelectedRequestOnMount: Boolean
  },
  mounted () {
    this.init()
  },
  data () {
    return {
      nextPartIndex: 0,
      focusCount: 0,
      sections: [
        'District',
        'Region',
        'Block',
        'House',
        'Building',
        'Apartment',
        'Shop'
      ],
      code: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  computed: {
    nosaziCodeObject () {
      const newCodeObj = {}
      this.sections.forEach((part) => {
        newCodeObj[part] = Number(this.code[part]) || 0
      })
      return newCodeObj
    },
    nosaziCodeString () {
      return this.sections.map((part) => this.code[part]).join('-')
    },
    inputLengths () {
      return this.lengths.split('-').map((x) => Number(x) || 1)
    },
    inputWidths () {
      // console.log('therererere')
      const totalUnits = this.inputLengths.reduce(
        (state, x) => state + Math.max(x, 2),
        0
      )
      return this.inputLengths.map((x) => {
        return (100 * Math.max(x, 2)) / totalUnits
      })
    }
  },
  methods: {
    getMode (index) {
      const status = Number(this.enabled.split('-')[index])
      return status === 0 || this.m === 'r' ? 'r' : 'e'
    },
    isValidNosaziCode (code) {
      return !!(code && code.District && code.Region && code.Block)
    },
    convert (val) {
      const codeObj = {}
      if (val && typeof val === 'string') {
        const split = val.split('-').map(Number)
        this.sections.forEach((part, i) => {
          codeObj[part] = split[i] || 0
        })
      } else if (val && typeof val === 'object') {
        this.sections.forEach((part) => {
          codeObj[part] = Number(val[part]) || 0
        })
      } else {
        this.sections.forEach((part) => {
          codeObj[part] = 0
        })
      }
      return codeObj
    },
    loadSelectedRequestInKartable () {
      const { BizCode, NosaziCode } = this.selectedRequest || {}
      if (BizCode || NosaziCode) {
        this.code = this.convert(BizCode || NosaziCode)
        this.emitValues()
      }
    },
    init () {
      // If provided value is a valid nosazi code then use it
      // Otherwise use the selectedRequest (in Kartable)
      const code = this.convert(this.value)
      if (this.isValidNosaziCode(code)) {
        this.code = this.convert(this.value)
        // Emit init value
        if (this.isValidNosaziCode(this.code)) {
          this.emitValues()
        }
      } else if (this.loadSelectedRequestOnMount) {
        this.loadSelectedRequestInKartable()
      }
    },
    setFocus () {
      this.$refs['nosaziCodeInputRef0'][0].setFocus()
    },
    inputKeyPressed (e) {
      let index = Number(e.target.getAttribute('index')) || 0
      if (e.keyCode === 13) {
        while (index < 6) {
          const nextPartIndex = index + 1
          if (this.getMode(nextPartIndex) === 'e') {
            const nextPartInput = this.$el.querySelector(
              'input[index="' + nextPartIndex + '"]'
            )

            if (nextPartInput && typeof nextPartInput.focus === 'function') {
              nextPartInput.focus()
            }

            if (this.liveUpdate) {
              this.emitValues()
            }

            break
          }
          ++index
        }
        if (index === 6) {
          this.emitValues()
          this.$emit('search', typeof this.value === 'string' ? this.nosaziCodeString : this.nosaziCodeObject)
        }
      }

      if (e.keyCode === 9) {
        while (index < 7) {
          // Move forward to find next input (next editable input)
          const nextPartIndex = index + 1
          if (this.getMode(nextPartIndex) === 'e') {
            // Focus only if is editable

            this.nextPartIndex = nextPartIndex
            break
          }
          ++index
        }
      }
    },
    inputValueChanged (e) {
      let index = Number(e.target.getAttribute('index')) || 0
      const nextPartIndex = index + 1

      if (this.liveUpdate || nextPartIndex > 6) {
        this.emitValues()
      }
    },
    // onBlur () {
    //   if (this.nextPartIndex > 6 && this.liveUpdateOnEnd) {
    //     this.emitValues()
    //   }
    //   this.focusCount -= 1
    //   if (this.focusCount === 0) {
    //     this.$emit('blur')
    //   }
    // },
    emitValues () {
      if (typeof this.value === 'string') {
        this.$emit('input', this.nosaziCodeString)
      } else {
        this.$emit('input', this.nosaziCodeObject)
      }
    },
    onFocus (e) {
      if (e.target && typeof e.target.select === 'function') {
        e.target.select()
      }

      if (this.focusCount === 0) {
        this.$emit('focus')
      }
      this.focusCount += 1
    },
    getPartName (index) {
      const arr = [
        'منطقه',
        'حوزه',
        'بلوک',
        'ملک',
        'ساختمان',
        'آپارتمان',
        'صنفی'
      ]
      return arr[index]
    }
  }
}
</script>

<style  lang="scss">
 .nosazi-preview {
    > span {
      height: 24px;
      font-weight: 500;
      font-size: 14px;
      outline: none !important;
      padding: 0;
      margin: 0 2px;
      border-radius: 4px;
      text-align: center;
      min-width: 24px;
      color: #474747;
      border: 2px solid #d0d0d0;
      background-color: #efefef;
    }
  }
</style>
