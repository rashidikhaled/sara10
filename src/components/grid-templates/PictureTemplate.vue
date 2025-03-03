<template>
  <td class="datatable-text-template">
    <q-img
      v-if="dataItem && dataItem[field]"
      :style="`${'width: ' + tdWidth} ${'height: ' + tdHeight}`"
      :src="image"
      alt=""
      class=""
    />
  </td>
</template>

<script>
export default {
  name: "PictureTemplate",
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
      image: null
    }
  },
  mounted () {
    if (this.dataItem && this.dataItem[this.field]) {
      this.image = this.convertToImage(
        this.dataItem && this.dataItem[this.field]
      )
    }
  },
  computed: {
    tdWidth () {
      if (this.column && this.column.width) return this.column.width
      return '40px'
    },
    tdHeight () {
      if (this.column && this.column.he) return this.column.height
      return '40px'
    }
  },
  methods: {
    convertToImage (buffer) {
      return (
        "data:image/jpg;base64," +
        btoa(String.fromCharCode(...new Uint8Array(buffer)))
      )
    }
  }
}
</script>
<style lang="scss">
.safa-datatable table td.datatable-text-template:not(.wrap) {
  white-space: nowrap;
}
</style>
