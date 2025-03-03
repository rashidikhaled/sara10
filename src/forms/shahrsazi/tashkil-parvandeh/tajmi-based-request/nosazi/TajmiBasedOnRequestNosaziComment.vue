<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-combo
        label="کد نوسازی"
        sourceType="local"
        :options="nosaziCode"
        v-model="code"
      class="col-md-3"
      >
      </safa-combo>
    </div>
    <safa-datatable
      helper="nosaziComment"
      v-model="commentResults.DutyCommentList"
      title="توضیحات"
      height="100%"
      min-height="100px"
      max-height="100%"
    />
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  data: function () {
    return {
      nosaziCode: [],
      code: 0,
      commentResults: { DutyCommentList: [] }
    }
  },
  mixins: [baseFormMixin],
  mounted () {
    let i = 0
    let nosaziCodeArray = this.codeInfoResults.NickNameNids
    nosaziCodeArray.forEach(item => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
    this.comment()
  },
  watch: {
    code () {
      this.comment()
    }
  },
  props: {
    codeInfoResults: Object,
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
    comment () {
      this.showLoading()
      let data = {
        pNid: this.codeInfoResults.NidList[this.code],
        pSysCiDutyType: 1
      }

      this.$services.SB.getDutyComments(data)
        .then(async ({ data }) => {
          this.commentResult = this.getResponse(data)

          if (this.commentResult.success) {
            this.commentResults = this.commentResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })

            await this.log({
              action: this.logActions.view
            })
          }
        })
        .catch(response => {
          this.commentResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
