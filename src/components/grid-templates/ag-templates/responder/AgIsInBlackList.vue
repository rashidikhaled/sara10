<template>
  <div class="text-center">
    <div class="text-center">
      <q-icon color="red" name="dangerous" size="sm" v-if="isInBlackList === 1">
        <q-tooltip> کدنوسازی در لیست سیاه در وضعیت استاپ می باشد </q-tooltip>
      </q-icon>
      <q-icon
        color="amber"
        name="warning_amber"
        size="sm"
        v-else-if="isInBlackList === 2"
      >
        <q-tooltip> کدنوسازی در لیست سیاه در وضعیت هشدار می باشد </q-tooltip>
      </q-icon>
      <q-icon
        color="pink"
        name="report"
        size="sm"
        v-else-if="isInBlackList === 4"
      >
        <q-tooltip>
          کدنوسازی در لیست سیاه در وضعیت توقف صدور می باشد
        </q-tooltip>
      </q-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgIsInBlackList',

  computed: {
    isInBlackList () {
      return this.params?.data?.IsInBlackList
    }
  }
}
</script>

<style scoped></style>
