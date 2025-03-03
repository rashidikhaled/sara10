<template>
  <td>
    <image-cropper width="48px" title="" height="48px" :initialPath="imageData" />
  </td>
</template>
<script>
export default {
  data () {
    return {
      selectedValue: ''
    }
  },
  computed: {
    imageData: function () {
      // console.log(this.dataItem)
      // console.log('field', this.dataItem[this.field])
      return this.dataItem[this.field]
    }
  },
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
  }
  // methods: {
  //   change (value) {
  //     this.$emit('change', this.$refs.gcombo, value)
  //   }
  // }
}
</script>
