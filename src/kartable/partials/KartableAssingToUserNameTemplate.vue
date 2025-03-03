<template>
  <td>
    <div class="task-line-items q-pl-xs">
      <div v-for="(item,i) in tasks" :key="i" class="task-line" style="font-size: 10px;">
        <div class="row items-center no-wrap q-col-gutter-x-xs full-height" style="max-width: 100%;" :title="item.AssingToUserName">
          <div class="col-auto">
            <user-avatar :src="(item.AssingTo||'') | avatar" :title="item.AssingToUserName || ''" size="26px"/>
          </div>
          <div class="ellipsis-2-lines col">
            {{item.AssingToUserName}}
          </div>
        </div>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'KartableAssingToUserNameTemplate',
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
