<template>
  <td>
    <div class="text-center">
      <q-btn
        @click="onClick"
        v-bind="style"
      />
    </div>
  </td>
</template>
<script>
import gridActionStyle from 'src/components/json/gridActionStyle'

export default {
  props: {
    field: String,
    dataItem: Object,
    format: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    rowType: String,
    level: Number,
    expanded: Boolean,
    editor: String
  },
  computed: {
    style () {
      const key = this.field.toString().toLowerCase()
      return { ...gridActionStyle.defaultOptions, ...gridActionStyle[key], ...gridActionStyle[this.field.toString()] }
    }
  },
  methods: {
    onClick (e) {
      this.$emit(this.field + 'Click', {
        e,
        field: this.field,
        dataItem: this.dataItem,
        expanded: this.expanded
      })
    }
  }
}
</script>
