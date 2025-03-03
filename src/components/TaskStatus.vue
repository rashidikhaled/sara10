<template>
  <div class="task-status">
    <div class="task--item" v-for="(item,index) in list" :key="index">
      <div class="task--inner" :style="getCustomStyle(item)" :title="getTaskTitle(item)">
        <div>{{item.TaskTitel}}</div>
        <q-avatar size="28px" v-if="item.notAllowAccess">
          <img :src="`http://dev.safarayaneh.com:7000/Security8/UserImages/e4f32c98-cb86-4907-9c7b-b0a26a5d827a.png`" />
        </q-avatar>
        <q-btn v-else-if="parseInt(item.SwimLineName) !== 1" flat round size="sm" dense icon="more_horiz" @click="$emit('clickMore', item)" />
        <q-icon v-if="parseInt(item.SwimLineName) === 1" name="hourglass_top" size="17px" color="light-blue-4" style="margin-right: 4px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskStatus',
  props: {
    list: Array
  },
  methods: {
    getTaskTitle (item) {
      if (parseInt(item.SwimLineName) === 1) return 'کارتابل شهروند'
      return 'کارتابل شهرداری'
    },
    getCustomStyle (item) {
      const { color, timeColor } = item
      let style = {}

      if (color) {
        style.backgroundColor = color
      }

      if (timeColor) {
        style.borderRightColor = timeColor
      }

      return style
    }
  }
}
</script>

<style scoped lang="scss">
.task-status {
  .task--item {
    padding-left: 16px;

    .task--inner{
      position: relative;
      width: 100%;
      max-width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
      margin: 14px 0;
      padding: 0 10px;
      border-radius: 3px;
      border: 1px solid #cecece;
      border-left: 7px solid #1d1d1d;
      height: 30px;

      &:before{
        content: "";
        width: 15px;
        position: absolute;
        top: 14px;
        height: 45px;
        z-index: 0;
        border: 2px solid #1d1d1d;
        left: -22px;
        border-right: none;
      }
    }

    &:first-child .task--inner{
      margin-top: 4px;
    }

    &:last-child .task--inner{
      margin-bottom: 4px;
    }

    &:last-child{
      .task--inner:before{
        display: none;
      }
    }

  }
}
</style>
