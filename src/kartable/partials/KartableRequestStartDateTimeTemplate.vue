<template>
  <td>
    <div class="task-line-items q-pl-xs">
      <div v-for="(task,i) in tasks" :key="i" class="task-line flex justify-center items-center">
        {{task.TaskStartDate}} {{task.TaskStartTime}}
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'KartableRequestStartDateTimeTemplate',
  props: {
    dataItem: Object
  },
  computed: {
    tasks () {
      const sList = (this.dataItem['Task'] || [])
      /* .filter(x => {
        if (this.dataItem['showOwnerTasks']) return true
        return !this.isCitizen(x)
      }) */
      if (sList.length === 0) return []
      if (this.dataItem.showAll) {
        return sList
      }

      const result = sList.filter(item => item.AllowEdit === 1)

      if (result.length > 0) return [result[0]]
      return [sList[0]]
    }
  }
}
</script>
