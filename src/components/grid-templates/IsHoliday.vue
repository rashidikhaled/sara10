<template>
  <td class="flex justify-center items-center">
    <!-- <q-badge v-if="isFriday()"  color="red">روز جمعه</q-badge> -->
    <q-badge v-if="isEvent()" color="red">تعطیل</q-badge>
    <q-badge v-else-if="isVacation()" color="amber">مرخصی</q-badge>
    <q-badge v-else color="green">روز کاری</q-badge>
  </td>
</template>

<script>
// import PersianDate from 'persian-date'

export default {
  name: "IsHoliday",
  props: {
    dataItem: Object,
    column: Object
  },
  methods: {
    // isFriday () {
    //   // console.log('//////////@@@@@###########this.dataItem', this.dataItem)

    //   if (!this.dataItem) return false
    //   const date = this.dataItem.RevisitDate
    //   const normalizeDate = date.split('/').map(x => Number(x))
    //   return new PersianDate(normalizeDate).format('dddd') === 'جمعه'
    // },
    isVacation () {
      return this.dataItem.IsVacation === true
    },
    isEvent () {
      return this.dataItem.isEvent === true
    }
  }
}
</script>

<style scoped></style>
