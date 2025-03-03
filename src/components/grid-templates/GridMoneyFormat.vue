<template>
  <td dir="ltr">
    <div v-if="!canEdit" class="q-px-sm">
      {{ internalvalue }}
    </div>
    <div v-else>
      <safa-text
        style="direction:ltr"
        :m="canEdit?'e':'r'"
        :dense="true"
        v-model="internalvalue"
        onclick="this.select()"
        @blur="change"
        ref="inputEditor"
      />
    </div>
  </td>
</template>
<script>
import { convertNumberToMoney, convertBackMoneyToNumber } from '../common/accounting/moneyConverter'

export default {
  props: {
    inEdit: Boolean,
    editable: Boolean,
    field: String,
    dataItem: Object,
    mode: {
      type: String,
      default: 'r'
    },
    value: {
      type: [Number],
      default: 0
    }
  },
  data () {
    return {
      internalvalue: null
    }
  },
  computed: {
    canEdit () {
      return (
        this.inEdit &&
        (typeof this.editable === 'undefined' || this.editable) &&
        (this.mode === 'e' || this.mode === 'ne')
      )
    }
  },
  watch: {
    value () {
      this.internalvalue = this.setMoney(this.value)
    },
    canEdit () {
      if (this.canEdit) {
        const self = this
        this.$nextTick(() => {
          setTimeout(() => {
            if (self.$refs.inputEditor) {
              self.$refs.inputEditor.setFocus()
            }
          }, 50)
        })
      }
    }
  },
  methods: {
    setMoney (n) {
      return convertNumberToMoney(n)
    },
    change () {
      let val = this.internalvalue
      // console.log(val)
      this.$emit('change', {
        field: this.field,
        value: convertBackMoneyToNumber(val),
        dataItem: this.dataItem
      })
    }
  },
  mounted () {
    this.internalvalue = this.dataItem[this.field] || ''
  },
  updated () {
    this.internalvalue = this.setMoney(this.internalvalue)
  }
}
</script>
