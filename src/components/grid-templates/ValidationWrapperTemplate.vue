<template>
  <td>
    <div
      :class="`${
        validationStatus === 0
          ? ''
          : validationStatus === 1
          ? 'valid--feedback'
          : 'invalid--feedback'
      }`"
    >
      <div v-if="canEdit" class="flex">
        <slot
          class="wrapper"
          v-bind="{ row, col, onChangeCellValue, inEdit: inEdit, errorMessage }"
        >
          <!-- {{ row[col.field] }} -->
        </slot>
        <div v-if="enableValidation && validationStatus !== 0" class="col-auto">
          <span
            v-if="validationStatus === -1"
            :title="errorMessage"
            class="validation-error col-auto"
          >
            <q-icon name="priority_high"></q-icon>
          </span>
          <span
            v-if="validationStatus === 1"
            class="validation-success col-auto"
          >
            <q-icon name="check"></q-icon>
          </span>
        </div>
      </div>
      <div v-else>
        <span>
          {{ internalvalue }}
        </span>
        &nbsp;
        <span
          v-if="enableValidation && validationStatus === -1"
          :title="errorMessage"
          class="validation-error col-auto"
        >
          <q-icon name="priority_high"></q-icon>
        </span>
      </div>
    </div>
  </td>
</template>

<script>
import { gridTemplateValidation } from "ui-core"
export default {
  name: "ValidationWrapperTemplate",
  mixins: [gridTemplateValidation],

  data () {
    return {
      internalvalue: null
    }
  },
  props: {
    inEdit: Boolean,
    row: Object,
    col: Object,
    onChangeCellValue: Function,
    errorMessage: String,
    enableValidation: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    canEdit () {
      return this.inEdit
    }
  },

  mounted () {
    let res = (this.row[this.col.field] === undefined || this.row[this.col.field] === null) ? '' : this.row[this.col.field]
    if (this.type === '') {
      this.internalvalue = res
    } else if (this.type === 'Money' || this.type === 'money') {
      this.internalvalue = res.separateWithCommas()
    }
  },
  watch: {
    validationStatus () {
      this.$nextTick(() => {
        this.isValidForm()
      })
    },
    canEdit () {
      if (!this.canEdit) {
        let res = (this.row[this.col.field] === undefined || this.row[this.col.field] === null) ? '' : this.row[this.col.field]
        if (this.type === '') {
          this.internalvalue = res
        } else if (this.type === 'Money' || this.type === 'money') {
          this.internalvalue = res.separateWithCommas()
        }
      } else {
        let wrapper = document.querySelector('.wrapper')
        let isSafaDatePicker = wrapper.querySelector('.safa-datepicker')
        console.log('*****SafaDatePicker*****', isSafaDatePicker)
      }
    }
  }
}
</script>

<style scoped>
</style>
