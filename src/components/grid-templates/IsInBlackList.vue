<template>
  <td :class="className" class="text-center">
    <div class="text-center">
      <q-icon
        color="red"
        name="dangerous"
        size="sm"
        v-if="dataItem.IsInBlackList === 1"
      >
        <q-tooltip>
          کدنوسازی در لیست سیاه در وضعیت استاپ می باشد
        </q-tooltip>
      </q-icon>
      <q-icon
        color="amber"
        name="warning_amber"
        size="sm"
        v-else-if="dataItem.IsInBlackList === 2"
      >
        <q-tooltip>
          کدنوسازی در لیست سیاه در وضعیت هشدار می باشد
        </q-tooltip>
      </q-icon>
       <q-icon
        color="pink"
        name="report"
        size="sm"
        v-else-if="dataItem.IsInBlackList === 4"
      >
        <q-tooltip>
          کدنوسازی در لیست سیاه در وضعیت توقف صدور می باشد
        </q-tooltip>
      </q-icon>
    </div>
  </td>
</template>

<script>
export default {
  name: 'IsInBlackList',
  props: {
    dataItem: Object,
    column: Object,
    className: String
  }
}
</script>

<style scoped>

</style>
