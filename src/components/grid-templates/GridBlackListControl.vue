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
          this.icon = 'warning'
          return 'هشدار عملیات :  توجه داشته باشید که روی این کد نوسازی فعالیت میتواند انجام گیرد'
        case 1:
          this.icon = 'block'
          return 'توقف عملیات : توجه داشته باشید که روی این کد نوسازی هیچ گونه فعالیتی نمیتواند انجام گیرد'
        case 2:
          this.icon = 'bookmark_remove'
          return 'توقف صدور : توجه داشته باشید که روی این کد نوسازی فعالیت میتواند انجام گیرد'
        default:
          break
      }
    }
  }

}
</script>
