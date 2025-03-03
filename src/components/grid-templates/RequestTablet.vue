<template>
  <td>
    <div class="request-tablet-tempelate">
      <q-icon
        color="light-blue-3"
        name="stay_primary_portrait"
        size="sm"
        v-if="dataItem.EumEsupMobile_TaskStatus === 0"
      >
        <q-tooltip>
          عادی
        </q-tooltip>
      </q-icon>
      <q-icon
        color="grey-8"
        name="stay_primary_portrait"
        size="sm"
        v-else-if="dataItem.EumEsupMobile_TaskStatus === 1"
      >
        <q-tooltip>
          بلاک شده
        </q-tooltip>
      </q-icon>
      <q-icon
        color="amber"
        name="system_update"
        size="sm"
        v-else-if="dataItem.EumEsupMobile_TaskStatus === 2"
      >
        <q-tooltip>
          دانلود شده
        </q-tooltip>
      </q-icon>
      <q-icon
        color="green"
        name="send_to_mobile"
        size="sm"
        v-else-if="dataItem.EumEsupMobile_TaskStatus === 3"
      >
        <q-tooltip>
          آپلود شده
        </q-tooltip>
      </q-icon>
    </div>
  </td>
</template>

<script>
export default {
  name: 'RequestTablet',
  props: {
    dataItem: Object,
    column: Object,
    className: String
  }
}
</script>

<style scoped>
</style>
