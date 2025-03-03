<template>
  <fit>
    <div class="row q-mb-sm">
      <div class="col-md-3">
        <safa-combo
          label="کد نوسازی"
          sourceType="local"
          :options="nosaziCode"
          v-model="code"
        >
        </safa-combo>
      </div>
    </div>
      <safa-datatable
        helper="nosaziComment"
        v-model="commentResults.DutyCommentList"
        title="توضیحات"
        fit
        height="100%"
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
    codeInfoResults: Object
  },
  methods: {
    comment () {
      this.showLoading()
      let data = {
        pNid: this.codeInfoResults.NidList[this.code],
        pSysCiDutyType: 1
      }

      this.$services.SB.getDutyComments(data)
        .then(({ data }) => {
          this.commentResult = this.getResponse(data)

          if (this.commentResult.success) {
            this.commentResults = this.commentResult.data
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
