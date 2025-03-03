<template>
  <div
    class="nosazicode-wrapper flex no-wrap items-center"
    :class="(loading ? 'loading' : '') + (showActions ? ' show-actions' : '')"
  >
    <div class="col-auto" v-if="hasSlot('before')">
      <slot name="before"></slot>
    </div>
    <div class="col-auto" v-if="hasSlot('label') || label">
      <slot name="label">
        <div :style="{ width: labelWidth || 'auto' }">
          <label>{{ label }}</label>
        </div>
      </slot>
    </div>
    <div class="nosazicode-box relative-position items-center" dir="ltr">
      <div
        v-if="!isEditable"
        class="nosazi-disabled flex no-wrap items-center"
        style="cursor: not-allowed"
      >
        <!-- :title="getPartName(i)" -->
        <span
          class="nosazi-disabled-input"
          :key="part"
          v-for="(part) in sections"
        >
          {{ code[part] }}
        </span>
      </div>
      <template v-else>
        <!-- :title="getPartName(i)" -->
        <auto-width-input
          v-for="(part, i) in sections"
          :key="part"
          :min="0"
          :readonly="!isEnable(i)"
          type="number"
          :data-index="i"
          @keyup.enter="processKey"
          onclick="this.select()"
          v-model="code[part]"
          @invalidRange="($event) => {}"
          @keydown.ctrl.86.prevent="ctrlVPressed"
          :class="`${
            invalidRange === false
              ? invalidDistrict === false
                ? `${code[part]}` === '0'
                  ? 'is-empty'
                  : 'is-valid'
                : `${code[part]}` === '0'
                ? 'is-empty'
                : 'is-invalid'
              : 'is-invalid'
          }`"
          :ref="`nosaziInputRef_${i}`"
        />
      </template>
      <div v-if="loading" class="loading-overlay text-center absolute-full">
        <q-spinner-dots color="primary" size="sm"/>
      </div>
    </div>
    <div class="col-auto" v-if="hasSlot('after')">
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
import mapMixin from 'src/mixins/mapMixin'
import AutoWidthInput from './common/AutoWidthInput.vue'

const defaultCode = {
  District: 0,
  Region: 0,
  Block: 0,
  House: 0
}
const defaultCodeString = '0-0-0-0'

export default {
  name: 'ClasseParvandeh',
  components: { AutoWidthInput },
  mixins: [mapMixin],
  data () {
    return {
      sections: ['District', 'Region', 'Block', 'House'],
      code: { ...defaultCode },
      showActions: false,
      showOnMapLoading: false,
      invalidRange: false
    }
  },
  computed: {
    isEditable () {
      const readonly = this.m && this.m === 'r'
      return !readonly
    },
    inputLengths () {
      if (!this.lengths) return 4
      if (typeof this.lengths === 'object' && Array.isArray(this.lengths)) {
        return this.lengths
      }
      return this.lengths.split('-').map((x) => Number(x) || 4)
    },
    selectedRequest () {
      return this.$stKartable.getters['selectedRequest']
    },
    currentValue () {
      if (typeof this.value === 'string') {
        return this.convertToNosaziCodeString(this.code)
      } else {
        return this.convertToNosaziCodeObject(this.code)
      }
    }
  },
  props: {
    loading: Boolean,
    label: String,
    labelWidth: String,
    serviceFunc: Function, // undefined  OR  function
    value: [Object, String], // 1-2-3-7  OR  nosazi => OBJECT
    lengths: {
      type: String,
      default: '5-5-5-5'
    }, // [String, Array], // 2-4-4-10  OR  [2,4,10,10]
    enabled: [String, Array], // 1-1-1-1  OR  [true,true,false,false]
    invalidDistrict: {
      type: Boolean,
      default: false
    },
    m: {
      type: String,
      default: 'e'
    },
    actionIndex: {
      type: Number,
      default: 4 // service call on which input position
    }
  },
  methods: {
    selectNosaziCode (nosaziCode) {
      if (nosaziCode) {
        this.code = this.convertToNosaziCodeObject(nosaziCode)
        this.callService()
      }
    },

    async ctrlVPressed ($event) {
      const _this = this

      // checking the input is enabled
      if (
        !_this.isEnable(
          parseInt($event.target.getAttribute('data-index') || -1)
        )
      ) {
        return
      }

      // just to be sure
      $event.preventDefault()

      await navigator.clipboard
        .readText()
        .then((data) => {
          const tmpCode = _this.convertToNosaziCodeObject(data),
            codeResult = {}

          _this.sections.forEach((part, i) => {
            if (_this.isEnable(i)) {
              codeResult[part] = tmpCode[part]
            }
          })

          Object.assign(_this.code, codeResult)
        })
        .catch((ex) => {
          console.log(ex.message)
        })
    },
    // helpers
    isEnable (index) {
      if (!this.enabled) return true
      if (typeof this.enabled === 'string') {
        return this.enabled.split('-')[index] === '1'
      } else if (
        typeof this.enabled === 'object' &&
        Array.isArray(this.enabled)
      ) {
        return this.enabled[index]
      }
      return true
    },

    // check slots
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },

    // emit values
    emitValue () {
      console.log('emit code: ', this.currentValue)
      this.$emit('input', this.currentValue)
    },

    // bind model
    bindModelValue () {
      this.code = this.convertToNosaziCodeObject(this.value)
    },

    // converter
    convertToNosaziCodeObject (str = '') {
      if (typeof str === 'object') return str
      if (!str) return { ...defaultCode }
      const split = str.split('-')
      const obj = {}
      this.sections.forEach((part, i) => {
        obj[part] = Number(split[i]) || 0
      })
      return obj
    },
    convertToNosaziCodeString (nosaziCode) {
      if (typeof nosaziCode === 'string') return nosaziCode
      if (!nosaziCode) return defaultCodeString
      return `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}`
    },

    // service call
    callService () {
      if (typeof this.serviceFunc === 'function') {
        this.serviceFunc(this.currentValue)
      }
      this.$emit('enter', this.currentValue)
    },

    // handle keyboard events
    isLastSection (currentIndex) {
      return currentIndex >= this.actionIndex
    },
    processKey (e) {
      if (e.key === 'Enter' && e.ctrlKey) {
        this.callService()
      } else {
        const currentIndex = parseInt(e.target.getAttribute('data-index'))
        this.focusNextInput(currentIndex)
      }
    },
    focusNextInput (currentIndex) {
      let nextIndex = currentIndex + 1
      for (nextIndex; nextIndex <= 4; nextIndex++) {
        if (this.isLastSection(nextIndex)) {
          this.callService()
          break
        }
        const elem = this.$refs[`nosaziInputRef_${nextIndex}`]
        if (elem) {
          if (elem[0].isDisabledInput()) continue
          elem[0].setFocus()
          break
        }
      }
    },

    // helpers
    getPartName (index) {
      return ['منطقه', 'حوزه', 'بلوک', 'ملک'][index]
    },
    runAction (actionName) {
      this.showActions = false
      switch (actionName) {
        case 'kartable':
          const bizcode =
            this.$stKartable.getters['selectedRequest'] &&
            this.$stKartable.getters['selectedRequest'].BizCode
          if (bizcode) {
            this.code = this.convertToNosaziCodeObject(bizcode)
            this.callService()
          } else {
            // alert('ابتدا یک درخواست از کارتابل انتخاب نمایید.')
            this.showError('ابتدا یک درخواست از کارتابل انتخاب نمایید')
          }

          break
        case 'codeFromMap':
          const { Code, NidLayer } = this.$store.getters['map/lastLocation']
          if (Code && NidLayer) {
            // eslint-disable-next-line no-undef
            if (
              NidLayer !== window.getConfigValue('mapConfig').DefaultSelectLayer
            ) {
              this.showError('لایه وضع موجود روی نقشه انتخاب نشده است.')
              return
            }
            this.code = this.convertToNosaziCodeObject(Code)
            this.callService()
          } else {
            // alert('ابتدا روی نقشه کلیک نمایید.')
            this.showError('ابتدا روی نقشه کلیک نمایید.')
            this.$store.dispatch('ui/setLayoutMode', 'half')
            this.$store.dispatch('ui/setLayoutWidth', 50)
          }
          break
      }
    }
  },
  beforeMount () {
    this.bindModelValue()
  },
  mounted () {
    this.$nextTick(function () {
      this.focusNextInput(-1)
    })
  },
  watch: {
    value () {
      if (
        this.convertToNosaziCodeString(this.value) !==
        this.convertToNosaziCodeString(this.code)
      ) {
        this.bindModelValue()
      }
    },
    currentValue () {
      this.emitValue()
    }
  }
}
</script>

<style lang="scss" scoped>
.nosazicode-wrapper {
  .nosazicode-box {
    padding: 2px 0;
    min-width: 130px;
    transition: 0.2s all ease;

    input[type="number"],
    .nosazi-disabled-input {
      border: 1px solid $primary;
      margin: 0 1px;
      border-radius: 4px;
      background: none;
      font-size: 12px;
      font-weight: bold;
      transition: 0.4s all ease;
      opacity: 1;
      height: 24px;
      line-height: 24px;
      min-width: 20px;
      text-align: center;
      cursor: default;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);

      .show-actions & {
        box-shadow: none !important;
      }

      &.is-valid {
        background-color: #e9ffeb;
        border-color: $positive;
        color: darken($positive, 4%) !important;
        box-shadow: 1px 1px 4px rgba($positive, 0.2);
      }

      &.is-invalid {
        background-color: #e9ffeb;
        border-color: $red-4;
        color: darken($red-4, 4%) !important;
        box-shadow: 1px 1px 4px rgba($red-4, 0.2);
      }

      &.is-empty {
        background-color: #fff;
        border-color: #909890;
        color: dimgrey !important;
      }

      body.body--dark & {
        background-color: var(--dark) !important;
        color: var(--text-color) !important;
        border-color: var(--border-color) !important;
      }
    }

    input:read-only,
    [read-only],
    .nosazi-disabled-input,
    .disabled,
    :disabled,
    [disabled] {
      border-style: dotted !important;
      opacity: 0.9;
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  .loading-overlay {
    background: rgba(255, 255, 255, 0.3);
    color: $primary;
    border-radius: 4px;
  }

  .nosazi-actions {
    .n-action-wrap {
      position: relative;
      z-index: 501;

      .n-action-handler {
        height: 24px;
        background-color: #e5e6e7;
        border-radius: 4px;
        width: 24px;
        display: inline-block;
        color: #8d9ba8;
        margin-left: 4px;
        cursor: default;
        position: relative;

        body.body--dark & {
          background-color: var(--dark);
          color: var(--dark-text-color);
        }
      }

      .n-action-items {
        position: absolute;
        top: 0;
        right: 30px;
        bottom: 0;
        display: flex;
        align-items: center;
        min-width: 100px;
        direction: rtl;
        transform: translateX(0);
        opacity: 1;
        padding: 0 10px;
        border-radius: 4px;
        box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.1);
        transition: 0.2s all ease-in;
        border: 1px solid #c3d1de;
        animation: action-in 0.3s ease alternate;

        &:before {
          content: "";
          width: 10px;
          height: 10px;
          transform: rotate(45deg);
          background-color: #fff;
          position: absolute;
          right: -5px;
          z-index: -1;
          border: 1px solid #c3d1de;
          border-radius: 2px;
          border-left: none;
          border-bottom: none;
        }

        > span:not(.n-gap) {
          > em {
            display: none;
          }
        }

        body.body--dark & {
          background-color: $dark-page !important;
          border-color: var(--border-color);

          &:before {
            background-color: inherit;
            border: 1px solid var(--border-color) !important;
          }
        }
      }
    }
  }

  &.loading {
    .nosazicode-box input[type="number"] {
      opacity: 0.5;
      transition: 0.4s all ease;
      user-select: none;
      pointer-events: none;
    }
  }

  &.show-actions {
    .nosazicode-box {
      opacity: 0.2;
      transition: 0.2s all ease;
    }
  }
}

@keyframes action-in {
  0% {
    transform: translateX(10px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
    pointer-events: all;
  }
}
</style>
