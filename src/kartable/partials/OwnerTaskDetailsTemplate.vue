<template>
  <div class="fit">
    <div class="owner-task-list" v-if="items.length >0">
      <div :class="{'expanded-box': item.expanded}" :key="i" class="owner-task bg-white q-px-xs"
           v-for="(item,i) in (collapsedAll?[items[0]]: items)">
        <div class="row no-wrap items-start">
          <div class="col-auto">
            <q-icon class="q-mr-xs" style="margin-top: 8px;" color="primary" name="help_center" size="xs"/>
          </div>
          <div class="col">
            <div :class="{'ellipsis': !item.expanded}" :title="item.Comments" class="ot__reason text-black"
                 style="font-size: 11px;">توضیح:&nbsp;{{ item.Comments }}
            </div>
            <div :class="{'ellipsis': !item.expanded}" :title="`${item.StrGroup} > ${item.Caption}`"
                 class="ot__g text-grey-7" style="font-size: 10px;">{{ item.StrGroup }} >
              {{ item.Caption }}
            </div>
          </div>
          <div class="col-auto" style="height: 12px;">
            <q-separator class="grey" vertical/>
          </div>
          <div class="col-auto">
            <q-btn :icon="item.expanded?'expand_less':'expand_more'" @click="item.expanded=!item.expanded" color="grey"
                   dense flat size="sm" style="margin-top: 4px;"/>
          </div>
        </div>
        <q-separator inset spaced="sm" v-if="item.expanded"/>
        <div class="row items-center q-col-gutter-x-sm" v-if="item.expanded">
          <div class="col-auto">
            <user-avatar :src="item.NidUser | avatar" size="22px"/>
          </div>
          <div class="col ellipsis" style="font-size: 11px;" :title="item.FullUserName">
            {{ item.FullUserName }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="items.length>1" class="expand-ot" @click="collapsedAll=!collapsedAll">
      <q-icon :name="collapsedAll?'arrow_drop_down':'arrow_drop_up'" size="xs"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OwnerTaskDetailsTemplate',
  data () {
    return {
      collapsedAll: true
    }
  },
  computed: {
    items () {
      if (!this.params) return []
      const field = this.params.column.colId
      return JSON.parse(this.params.data[field] ?? '[]').map(x => {
        return { ...x, expanded: false }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.owner-task {
  border: 1px solid transparent;
  border-left-width: 3px;
  border-radius: 3px;

  &:not(.expanded-box) {
    height: 34px;
  }

  &:hover {
    border-color: #bbb;
  }

  &.expanded-box {
    padding-top: 4px;
    padding-bottom: 4px;
    border-color: var(--q-color-primary);
  }

  &:not(:last-child) {
    margin-bottom: 4px;
  }
}

.expand-ot {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #777;
  height: 12px;
  border-radius: 2px;
  margin-top: 2px;
  border: 1px solid #ddd;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
