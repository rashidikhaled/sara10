<template>
  <div class="task-line-items q-pl-xs">
    <div
      v-for="(item, i) in tasks"
      :key="i"
      class="task-line"
      style="font-size: 10px"
    >
      <div
        class="row items-center no-wrap q-col-gutter-x-xs full-height"
        style="max-width: 100%"
        :title="item.CreatedByName"
      >
        <div class="col-auto">
          <user-avatar
            :src="(item.CreatedBy || '') | avatar"
            :title="item.CreatedByName || ''"
            size="26px"
          />
        </div>
        <div class="ellipsis-2-lines col">
          {{ item.CreatedByName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "agKartableCreatedByNameTemplate2",
  computed: {
    tasks () {
      const sList = this.params?.data?.Task || []
      if (sList.length === 0) return []
      if (this.params.data.showAll) {
        return sList
      }

      const result = sList.filter((item) => item.AllowEdit === 1)

      if (result.length > 0) return [result[0]]
      return [sList[0]]
    }
  }
}
</script>
