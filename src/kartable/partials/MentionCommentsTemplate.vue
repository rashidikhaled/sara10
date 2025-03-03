<template>
  <td>
    <div class="mention-comments">
      <div
        class="mnt-cmd q-ma-sm is-mine" :class="{'is--seen': dataItem.IsOpen==='1', 'is--new': dataItem.IsOpen==='0'}"
      >
        <div class="task__cmt_inner">
          <div class="mnt--msg">
            {{ item.Comments }}
            <span class="btn-mnt-more">
              <q-btn icon="more_horiz" round size="sm" dense @click="clickHandle(item)"></q-btn>
            </span>
          </div>
        </div>
        <span class="mnt--avatar">
            <!--<q-avatar size="48px">
              <img
                :src="userImage(item)"
                style="width:50px;height:50px"
              />
            </q-avatar>-->
            <user-avatar :default-src="getDefaultImage(item)" :src="userImage(item.NidUser)" size="36px"/>
          </span>
      </div>
    </div>
  </td>
</template>

<script>
import kartableMixin from '../mixins/kartableMixin'

export default {
  name: 'mention-comments-template',
  mixins: [kartableMixin],
  data () {
    return {
      list: []
    }
  },
  props: {
    field: String,
    dataItem: Object
  },
  computed: {
    item () {
      return this.dataItem || {}
    }
  },
  methods: {
    clickHandle (item) {
      this.$stKartable.dispatch('setSelectedNidTask', item.MentionNidTask)

      /* this.$root.$emit('setForm', 'task', {
         taskMention: this.dataItem
       }) */
      this.$root.$emit('setCommand', 'form')
      this.$store.dispatch('formLauncher/removeForm', 'task')
      this.$store.dispatch('formLauncher/setForm', {
        formKey: 'system',
        formName: 'task',
        title: 'گردش کار',
        props: { taskMention: this.dataItem }
      })
      // this.$router.push('/task')
    },
    userImage (nidUser) {
      // eslint-disable-next-line no-undef
      return `${window.getConfigValue('avatarBaseUrl')}${nidUser}.png`
    }
  }
}
</script>

<style scoped lang="scss">
.mention-comments {
  .task--item {
    padding-left: 16px;

    .task--inner {
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
      background-color: #ecf9ff;
      border: 1px solid #cecece;
      border-left: 7px solid #1d1d1d;
      height: 30px;

      &:before {
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

    &:first-child .task--inner {
      margin-top: 4px;
    }

    &:last-child .task--inner {
      margin-bottom: 4px;
    }

    &:last-child {
      .task--inner:before {
        display: none;
      }
    }

  }
}

.mnt-cmd {
  display: flex;
  justify-content: flex-end;
  width: 100%;

  .mnt-cmd-ispublic {
    align-self: center;
    color: #c76c63;
    display: inline-block;
    border: 1px solid;
    padding: 0 4px;
    border-radius: 10px;
    white-space: nowrap;
  }

  .task__cmt_inner {
    border: 1px solid #ccc;
    position: relative;
    border-radius: 3px;
    margin: 0 10px;
    max-width: 90%;
    min-width: 200px;

    .mnt--msg {
      padding: 4px 30px 4px 10px;
      position: relative;

      .mnt--mention-wrapper {
        display: flex;
        align-items: center;

        .mnt--mention {
          display: flex;
          align-items: center;
          background-color: #f6fbd9;
          border: 1px solid #cdda7a;
          border-radius: 4px;
          margin: 4px 8px;
          min-width: 140px;
          position: relative;
        }
      }
    }

    .btn-mnt-more {
      position: absolute;
      right: 5px;
      top: 5px;
    }

    .mnt--date {
      padding: 0 10px;
      background-color: rgba(57, 97, 97, 0.1);
    }
  }

  &.is-mine {
    flex-direction: row-reverse;

    .task__cmt_inner {
      .mnt--date-wrapper {
        text-align: left;
      }

      .mnt--date {
        border-radius: 0 4px 0 4px;
      }
    }
  }

  &.is--new .task__cmt_inner {
    background-color: #f6fbff;
    border-left: 4px solid #428bca
  }

  &.is--seen .task__cmt_inner {
    background-color: #dedede;
    border-left: 4px solid #bbb;
  }
}
</style>
