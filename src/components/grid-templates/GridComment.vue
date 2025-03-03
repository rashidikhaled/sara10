<template>
  <td>
    <text-template
      :formKey="column.formKey"
      :value="dataItem.Comments"
      @input="change"
      :m="canEdit?'e':'r'"
      :rows="1"
    />
  </td>
</template>

<script>
export default {
  data () {
    return {
      val: ''
    }
  },
  props: {
    column: Object,
    dataItem: Object,
    field: String,
    mode: String,
    inEdit: Boolean,
    editable: Boolean
  },
  computed: {
    canEdit () {
      return (
        this.inEdit &&
        (typeof this.editable === 'undefined' || this.editable) &&
        this.mode === 'e'
      )
    }
  },
  mounted () {
    this.val = (this.dataItem && this.dataItem[this.field]) || ''
  },
  methods: {
    change (value) {
      this.$emit('change', {
        field: this.field,
        value: value,
        dataItem: this.dataItem,
        event: null
      })
    }
  },
  created () {
    this.customText = (this.dataItem && this.dataItem[this.field]) || ''
  }
}
</script>

<style lang="scss" scoped>
</style>
