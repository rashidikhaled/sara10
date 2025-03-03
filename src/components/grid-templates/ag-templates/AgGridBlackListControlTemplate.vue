<template>
  <td>
    <div :title="tooltip">
        <q-icon :name="icon" class="q-pa-xs" size="21px"/>
    </div>
  </td>
</template>
<script>
export default {
  data () {
    return {
      tooltip: null,
      icon: ''
    }
  },
  mounted () {
    this.tooltip = this.typeConvert(this.params.data.EumBlackListControl)
  },
  watch: {
    'params.data': {
      handler () {
        this.tooltip = this.typeConvert(this.params.data.EumBlackListControl)
      },
      deep: true
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
