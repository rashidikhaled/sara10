<template>
  <form-wrapper vertical>
    <div class="row q-col-gutter-y-sm">
      <div class="col-12">
        <text-template
          v-model="newComment"
          :rows="3"
          cdcName="newComment"
          label="توضیحات جدید"
          formKey="c2917194-1969-4ec8-8caa-1a9ac3df18d7"
        />
      </div>
    </div>
    <template #footer>
      <btn-save class="q-mr-sm" label="ذخیره" @click="save"/>
      <btn-cancel label="انصراف" @click="cancel"/>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'DutyCommentNew',
  mixins: [baseFormMixin],
  data: function () {
    return {
      newComment: '',
      result: null
    }
  },
  props: {
    commentResults: Object,
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    async save () {
      this.showLoading()
      this.commentResults.DutyComment = {
        Comments: this.newComment,
        CreateDate: '',
        CreateTime: '',
        CreateUserName: '',
        EumDutyType: 1,
        NidCreateUser: this.getNidUser(),
        NidDutyComments: '00000000-0000-0000-0000-000000000000',
        NidFK: this.commentResults.NidFk
      }
      this.commentResults.NidFk = '00000000-0000-0000-0000-000000000000'
      this.commentResults.DutyCommentList = []
      const payload = {
        pDutyComments: this.commentResults,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      }
      try {
        const { data } = await this.$services.SB.saveDutyComments(payload, {
          config: { District: this.baseNosaziCode.District }
        })
        this.result = this.getResponse(data)
        if (this.result.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.commentResults.NidFk,
            bizCodeTitle: 'CommentNidFk'
          })

          this.$emit('reloadComment')
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    cancel () {
      this.$emit('reloadComment')
    }
  }
}
</script>
