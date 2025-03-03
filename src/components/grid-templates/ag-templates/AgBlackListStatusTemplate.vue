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
    this.tooltip = this.typeConvert(this.params.data.EumBlackListStatus)
  },
  watch: {
    'params.data': {
      handler () {
        this.tooltip = this.typeConvert(this.params.data.EumBlackListStatus)
      },
      deep: true
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
