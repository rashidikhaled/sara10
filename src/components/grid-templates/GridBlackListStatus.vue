<template>
  <td>
    <div :title="tooltip">
        <q-icon :name="icon" class="q-pa-xs" size="21px"/>
    </div>
  </td>
</template>
<script>
export default {
  props: {
    inEdit: Boolean,
    editable: Boolean,
    field: String,
    dataItem: Object
  },
  data () {
    return {
      tooltip: null,
      icon: ''
    }
  },
  mounted () {
    this.tooltip = this.typeConvert(this.dataItem[this.field])
  },
  watch: {
    dataItem () {
      this.tooltip = this.typeConvert(this.dataItem[this.field])
    }
  },
  methods: {
    typeConvert (val) {
      switch (val) {
        case 0:
          this.icon = 'south'
          return 'به لیست سیاه وارد شده است'
        case 1:
          this.icon = 'north'
          return 'از لیست سیاه خارج شده است'
        default:
          break
      }
    }
  }

}
</script>
