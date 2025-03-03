<template>
  <div class="q-ma-md">
    <!-- <div class="form-row"> -->
    <text-template
      label="توضیجات جدید"
      v-model="newComment"
      type="textarea"
      formKey="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    ></text-template>
    <!-- </div> -->
    <div class="row q-gutter-sm q-mt-md">
      <btn-save
        label="ذخیره"
        @click="save"
      />
      <btn-cancel
        label="انصراف"
        @click="cancel"
      />
    </div>
  </div>
</template>
<script>
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      newComment: '',
      saveResult: null
    }
  },
  props: {
    commentResults: Object
  },
  methods: {
    save () {
      this.showLoading()
      this.commentResults.DutyComment = {
        Comments: this.newComment,
        CreateDate: '',
        CreateTime: '',
        CreateUserName: '',
        NidDutyComments: '00000000-0000-0000-0000-000000000000',
        NidFK: this.commentResults.NidFk
      }
      this.commentResults.NidFk = '00000000-0000-0000-0000-000000000000'
      this.commentResults.DutyCommentList = []
      let data = {
        pDutyComments: this.commentResults,
        pUserName: this.getUserDisplayName(),
        pUserCode: this.getNidUser()
      }

      this.$services.SB.saveDutyComments(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.$emit('reloadComment')
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.$emit('reloadComment')
    }
  }
}
</script>
