<template>
  <div style="text-align: center !important">
    <q-img :title="label" :src="require(`../static/kartable/${icon}`)" width="24px" />
  </div>
</template>

<script>
export default {
  name: 'agKartableImageTemplate2',
  computed: {
    icon () {
      if (this.isSenfi()) return 'shop.png'
      if (this.isApartment()) return 'apartment.png'
      if (this.isBuilding()) return 'building.png'
      return 'melk.png'
    },
    label () {
      if (this.isSenfi()) return 'صنفی'
      if (this.isApartment()) return 'آپارتمان'
      if (this.isBuilding()) return 'ساختمان'
      return 'ملک'
    },
    bizCode () {
      const str = (this.params.data.BizCode || this.params.data.bizCode) || '0-0-0-0-0-0-0'
      return str.split('-')
    }
  },
  methods: {
    isMelki () {
      return parseInt(this.bizCode[this.bizCode.length - 4]) > 0
    },
    isSenfi () {
      return parseInt(this.bizCode[this.bizCode.length - 1]) > 0
    },
    isApartment () {
      return parseInt(this.bizCode[this.bizCode.length - 2]) > 0
    },
    isBuilding () {
      return parseInt(this.bizCode[this.bizCode.length - 3]) > 0
    }
  }
}
</script>
