<template>
  <td
    v-if="canEdit"
    :class="{ numeric: column.numeric }"
    :style="'min-width: ' + tdWidth"
  >
  <div class="lockable-text">
    <safa-checkbox class="q-mr-sm col-auto" v-model="isLocked" label="بدون تغییر" />
    <input
      v-if="!column.isArea"
      :type="inputType"
      @input="change"
      v-model="val"
      class="grid-text"
      :disabled="isLocked"
    />
    <input
      v-if="column.isArea"
      :type="inputType"
      @input="change"
      v-model="val"
      class="grid-text"
      :disabled="isLocked"
      @blur="onFocus"
    />
    </div>
  </td>
  <td
    v-else
    :class="{ numeric: column.numeric }"
    :style="'min-width: ' + tdWidth"
  >
    <div v-if="column.html" v-html="dataItem[field]" />
    <template v-else>
      <div v-if="!column.isArea">
        {{ dataItem[field] }}
      </div>
      <div v-if="column.isArea">
        {{val}}
      </div>
    </template>
  </td>
</template>
<script>
import { convertNumberToDecimal } from '../common/accounting/moneyConverter'
export default {
  data () {
    return {
      val: '',
      isLocked: false
    }
  },
  computed: {
    inputType () {
      switch (this.editor) {
        case 'numeric':
          return 'number'
        // case 'boolean':
        //   return 'checkbox'  // already using checkbox template for this type
        default:
          return 'text'
      }
    },
    tdWidth () {
      return this.column.width || '160px'
    },
    canEdit () {
      return this.inEdit && (typeof this.editable === 'undefined' || this.editable) && this.mode === 'e'
    }
  },
  mounted () {
    this.val = (this.dataItem && this.dataItem[this.field]) || ''
    this.onFocus()
  },
  inheritAttrs: false,
  props: {
    field: String,
    dataItem: Object,
    inEdit: Boolean,
    editable: Boolean,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    column: Object,
    editor: String,
    mode: String
  },
  methods: {
    change (ev) {
      let value = ev.target.value
      this.$emit('change', {
        field: this.field,
        value: value,
        dataItem: this.dataItem,
        event: ev
      })
    },
    setArea (n) {
      return convertNumberToDecimal(n)
    },
    onFocus () {
      this.val = this.setArea(this.val)
    }
  }
}
</script>
<style scoped lang="scss">
.lockable-text {
    display: flex;
    align-items: center;
}
</style>
