<template>
    <div class="task-line-items q-pl-xs">
      <div v-for="(task,i) in tasks" :key="i" class="task-line flex justify-center items-center">
        {{task.TaskStartDate}} {{task.TaskStartTime}}
      </div>
    </div>
</template>

<script>
export default {
  name: 'agKartableRequestStartDateTimeTemplate',
  computed: {
    tasks () {
      const sList = (this.params?.data?.Task || [])
      if (sList.length === 0) return []
      if (this.params.data.showAll) {
        return sList
      }

      const result = sList.filter(item => item.AllowEdit === 1)

      if (result.length > 0) return [result[0]]
      return [sList[0]]
    }
  }
}
</script>
