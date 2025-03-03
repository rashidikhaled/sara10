<template>
    <td
    :class="{ numeric: column.numeric, wrap: column.wrap }"
    :style="'min-width: ' + tdWidth"
    class="datatable-text-template flex items-center"
    :title="dataItem[field]"
    v-if="canEdit"
  >
                   <!-- :style="{padding: (typeof padding==='undefined' || padding===false)?0: '8px'}" -->
    <input
      @blur="change"
      @keydown="onNationalCodeChanged"
      class="cc-number-input grid-text "
      style="max-width: 100%; width: 100%;direction: ltr; flex:1"
      :style="{borderStyle: errorMessage===null? 'solid': 'dashed' , borderColor: errorMessage===null ? 'gray':'#c74f47' }"
      v-model="nationalCode"
      maxlength="10"
    />
    <span class="validation-error" :title="errorMessage"  v-if="errorMessage">
      <q-icon
        name="priority_high"></q-icon>
      </span>
  </td>
  <td
    :style="'width: ' + tdWidth"
    class="datatable-text-template"
    :title="nationalCode"
    v-else
  >
     {{ nationalCode }}
  </td>
</template>

<script>
import Joi from "joi"

// import changeNosaziCodeInBlockPrequest from '../../forms/shahrsazi/tashkil-parvandeh/change-refresh-code-in-block/models/changeNosaziCodeInBlockPrequest'
export default {
  name: 'NationalCodeTemplate',
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
      nationalCode: '',
      // validation: Joi.number().min(10).max(10).message({
      //   'string.base': `مقدار این فیلد عددی می باشد`,
      //   'string.min': `${this.column.title} باید ده رقم وارد شود.`,
      //   'string.max': `${this.column.title} باید ده رقم وارد شود.`
      // }),
      validation: {},
      errorMessage: null,
      timer: null,
      enableValidation: true
    }
  },
  // updated () {
  //   this.maskNumber()
  // },
  mounted () {
    this.nationalCode = (this.dataItem && this.dataItem[this.field])
  },
  watch: {
    dataItem () {
      this.nationalCode = (this.dataItem && this.dataItem[this.field])
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
    onNationalCodeChanged () {
      const syncLetter = async () => {
        this.checkForError(this.nationalCode, this.column)
      }
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(syncLetter, 1000)
    },
    checkForError (val, column) {
      debugger
      this.validation = Joi.custom(function (value, helper) {
        if (!value) return true
        if (isNaN(value)) return helper.message(`${column.title} مقدار عددی می باشد.`)
        let chars = `${value}`.split('').map(Number).filter(x => `${x}` !== 'NaN')
        if (chars.length < 10) return helper.message(`${column.title} باید ده رقم وارد شود.`)
      })
      if (val === null || val === '') return
      try {
        let error = this.validation.validate(val)
        if (error.error) {
          this.errorMessage = error.error.message
        } else {
          this.errorMessage = null
        }
      } catch (error) {
        console.log(error)
      }
    },
    // isValid () {
    //   return this.nationalCode.length === 10
    // },
    // getErrorMessageUserFriendly () {
    //   return `${this.column.title} باید ده رقم وارد شود.`
    // },
    change () {
      let val = this.nationalCode
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
