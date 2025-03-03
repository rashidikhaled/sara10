<template>
  <q-slide-transition>
    <div id="mention-alert" v-if="show && value">
      <!--<div class="ma&#45;&#45;close" title="بستن" @click="show=false">
        <q-icon size="xs" color="grey" name="close"/>
      </div>-->
      <div class="ma--inner">
        <div class="ma--top">
          <div class="ma--avatar q-mr-md">
            <user-avatar size="38px" :src="value.NidUser | avatar"/>
          </div>
          <div class="ma--comment">{{value.Comments}}</div>
        </div>
        <div class="ma--bottom">
          <div class="flex q-gutter-x-sm items-center" style="flex-grow: 1;">
            <label>
              <q-icon name="rate_review" color="primary" size="xs"/>&nbsp;پاسخ شما:</label>
            <input @keyup.enter="sendReplay" :disabled="loading" type="text" class="ma--replay-comment" v-model="replayComment" style="flex-grow: 1" />
            <q-btn color="primary" dense size="sm" style="padding: 0 4px" :disable="!replayComment || loading" label="ارسال پاسخ" @click="sendReplay" />
          </div>
        </div>
      </div>
      <div class="ma--icon">
        <q-icon name="mark_chat_unread"/>
      </div>
    </div>
  </q-slide-transition>
</template>

<script>
import { insertComment } from '../services/task'
import kartableMixin from '../mixins/kartableMixin'

export default {
  name: 'TaskMentionAlert',
  mixins: [kartableMixin],
  props: {
    value: Object
  },
  data () {
    return {
      show: true,
      focusComment: false,
      replayComment: '',
      loading: false
    }
  },
  methods: {
    async sendReplay () {
      if (!this.replayComment) {
        this.showWarning('توضیحات وارد نشده است.')
      }
      try {
        this.loading = true
        let payload = {
          Comments: this.value.Comments,
          NidProc: this.value.NidProc,
          NidComments: 'New',
          IsPublic: this.value.IsPublic,
          MentionNidTask: this.value.MentionNidTask,
          NidUser: this.getNidUser(),
          UserName: this.getUserDisplayName(),
          MentionComment: this.replayComment
        }

        const { data } = await insertComment(payload)

        if (data.success) {
          this.replayComment = ''
          this.show = false
        } else {
        }
        this.handleMsg(data)
      } catch (e) {
        console.log('error', e)
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
  #mention-alert {
    border-bottom: 1px solid #0057b8;
    display: flex;
    align-items: center;
    background-color: #c5e8f5;
    border-top: 4px solid #fcd000;
    width: 100%;

    .ma--inner {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 4px 6px;
      flex-grow: 1;
    }

    .ma--close {
      height: 100%;
      width: 90px;
      min-width: 90px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-right: 10px;

      &:before {
        content: '';
        position: absolute;
        border-left: 1px solid #ccc;
        top: 50%;
        right: 0;
        height: 14px;
        transform: translateY(-50%);
      }
    }

    .ma--icon {
      height: 100%;
      width: 46px;
      min-width: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-left: 10px;
      background-color: #fcd000;
      font-size: 24px;
      color: #0057b8;
    }

    .ma--bottom,
    .ma--top {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 4px;
    }

    .ma--top {
      border-bottom: 1px dashed #88bed2;
    }

    .ma--bottom {
      .ma--replay-comment {
        transition: height .3s ease;

        &:focus {
          transition: height .3s ease;
        }
      }
    }
  }
</style>
