<template>
  <td>
    <div>
      <q-icon
        color="light-blue-3"
        name="done"
        size="sm"
        v-if="dataItem.IsActive"
      >
        <q-tooltip>
          فعال
        </q-tooltip>
      </q-icon>
      <q-icon
        color="light-blue-3"
        name="do_not_disturb"
        size="sm"
        v-else-if="!dataItem.IsActive"
      >
        <q-tooltip>
          غیرفعال
        </q-tooltip>
      </q-icon>
      </div>
  </td>
</template>

<script>
export default {
  name: 'AgentStatus',
  props: {
    dataItem: Object,
    column: Object,
    className: String
  }
}
</script>

<style scoped>
</style>
