<template>
    <td
    :class="{ numeric: column.numeric, wrap: column.wrap }"
    :style="'min-width: ' + tdWidth"
    class="datatable-text-template"
    :title="dataItem[field]"
    v-if="canEdit"
  >
    <input
      type="text"
      @blur="change"
      class="cc-number-input grid-text "
      style="max-width: 100%; width: 100%;direction: ltr;"
      v-model="EconomicCode"
      maxlength="12"
    />
  </td>
  <td
    :style="'width: ' + tdWidth"
    class="datatable-text-template"
    :title="EconomicCode"
    v-else
  >
     {{ EconomicCode }}
  </td>
</template>

<script>

export default {
  name: 'EconomicCodeTemplate',
  props: {
    field: String,
    dataItem: Object,
    inEdit: Boolean,
    editable: Boolean,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    column: Object,
    mode: String
  },
  data () {
    return {
      EconomicCode: ''
    }
  },
  updated () {
    this.maskNumber()
  },
  mounted () {
    this.EconomicCode = (this.dataItem && this.dataItem[this.field])
  },
  watch: {
    dataItem () {
      this.EconomicCode = (this.dataItem && this.dataItem[this.field])
    }
  },
  computed: {
    canEdit () {
      return (
        this.inEdit &&
        (typeof this.editable === 'undefined' || this.editable) &&
        this.mode === 'e'
      )
    },
    tdWidth () {
      return this.column.width || 'auto'
    }
  },
  methods: {
    change () {
      let val = this.EconomicCode
      // console.log(val)
      this.$emit('change', {
        field: this.field,
        value: val,
        dataItem: this.dataItem
      })
    },
    maskNumber () {
      let ccNumberInput = document.querySelector('.cc-number-input'),
        ccNumberPattern = /^\d{0,16}$/g,
        ccNumberSeparator = '', // for credit card u can use space so the separator is set
        ccNumberInputOldValue,
        ccNumberInputOldCursor,
        mask = (value, limit, separator) => {
          var output = []
          for (let i = 0; i < value.length; i++) {
            if (i !== 0 && i % limit === 0) {
              output.push(separator)
            }

            output.push(value[i])
          }

          return output.join('')
        },
        unmask = (value) => value.replace(/[^\d]/g, ''),
        checkSeparator = (position, interval) => Math.floor(position / (interval + 1)),
        ccNumberInputKeyDownHandler = (e) => {
          let el = e.target
          ccNumberInputOldValue = el.value
          ccNumberInputOldCursor = el.selectionEnd
        }
      let ccNumberInputInputHandler = (e) => {
        let el = e.target,
          newValue = unmask(el.value),
          newCursorPosition

        if (newValue.match(ccNumberPattern)) {
          newValue = mask(newValue, 4, ccNumberSeparator)
          newCursorPosition = ccNumberInputOldCursor - checkSeparator(ccNumberInputOldCursor, 4) + checkSeparator(ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length), 4) + (unmask(newValue).length - unmask(ccNumberInputOldValue).length)
          el.value = (newValue !== '') ? newValue : ''
        } else {
          el.value = ccNumberInputOldValue
          newCursorPosition = ccNumberInputOldCursor
        }

        el.setSelectionRange(newCursorPosition, newCursorPosition)
      }
      if (ccNumberInput === null || ccNumberInput === undefined) return
      ccNumberInput.addEventListener('keydown', ccNumberInputKeyDownHandler)
      ccNumberInput.addEventListener('input', ccNumberInputInputHandler)
    }
  }

}
</script>
<style lang="scss">
  .safa-datatable table td.datatable-text-template:not(.wrap) {
    white-space: nowrap;
  }
</style>
