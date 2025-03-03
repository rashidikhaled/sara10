<template>
  <td>
    <div class="task-line-items q-pl-xs">
      <div v-for="(task,i) in tasks" :key="i" class="task-line ellipsis-2-lines">
        {{task.TaskDesc}}
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'KartableTaskDescTemplate',
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

<style lang="scss">
  .task-line-items{
    .task-line2{
      height: 32px;
      margin-bottom: 5px;
      border-radius: 5px;
      border: 1px solid #eee;
      background-color: #fff;
      position: relative;
      padding: 4px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
</style>
