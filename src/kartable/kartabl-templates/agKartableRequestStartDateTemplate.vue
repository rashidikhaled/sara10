<template>
  <div class="task-line-items q-pl-xs">
    <div v-for="(task,i) in tasks" :key="i" dir="ltr" class="task-line flex justify-center items-center">
      {{task.TaskStartDate}} {{task.TaskStartTime}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'agKartableRequestStartDateTemplate',
  computed: {
    tasks () {
      const sList = (this.params?.data?.Task || [])
      if (sList.length === 0) return []
      if (!this.params.context.allTaskCollapsed) {
        return sList
      }

      const result = sList.filter(item => item.AllowEdit === 1)

      if (result.length > 0) return [result[0]]
      return [sList[0]]
    }
  }
}
</script>
