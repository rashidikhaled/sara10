<template>
  <fit>
    <form-row class="q-mb-sm">
     <form-control>
      <safa-combo
        label="کد نوسازی"
        sourceType="local"
        :options="nosaziCode"
        v-model="code"
        class="col-12 col-sm-4 col-md-3"
      />
     </form-control>
    </form-row>
    <safa-datatable
      helper="dutyComment"
      v-model="commentResults.DutyCommentList"
      :hideHeader="true"
      title="توضیحات"
    />
    <safa-popup
      v-model="isShowModal"
      @hide="isShowModal = false"
      title="اضافه کردن توضیحات"
    >
      <DutyCommentNew
        :formKey="formKey"
        :title="title"
        :name="name"
        :commentResults="commentResults"
        :baseNosaziCode="baseNosaziCode"
        @reloadComment="reloadComment()"
      />
    </safa-popup>
  </fit>
</template>
<script>
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
import DutyCommentNew from "./dutyCommentNew"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      commentResults: { DutyCommentList: [], DutyComment: {} },
      commentResult: null,
      nosaziCode: [],
      code: 0,
      showNewComment: false,
      isShowModal: false
    }
  },
  props: {
    formKey: String,
    title: String,
    name: String,
    results: Object,
    baseNosaziCode: Object
  },
  components: { DutyCommentNew },
  mounted () {
    let i = 0
    let nosaziCodeArray = this.results.NickNameNids
    nosaziCodeArray.forEach(item => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
  },
  watch: {
    // baseNosaziCode () {
    //   this.comment()
    // },
    code () {
      this.comment()
    },
    baseNosaziCode () {
      if (this.tabNumber === 6) {
        this.calcuateHistory()
      }
    }
  },
  methods: {
    comment () {
      /* [Description("نوع عوارض"]
      public enum EumDutyType
      {
        [Description("نوسازی"]
        Renovation = 1,
          [Description("صنفی"]
        Job = 2,
          [Description("زباله"]
        Garbage = 3
      }; */
      let i = 0
      let nosaziCodeArray = this.results.NickNameNids
      nosaziCodeArray.forEach(item => {
        this.nosaziCode.push({ ID: i++, Title: item })
      })
      this.showLoading()
      let data = {
        pNid: this.results.NidJobList[this.code],
        pSysCiDutyType: 2
      }

      this.$services.SB.getDutyComments(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.commentResult = this.getResponse(data)

          if (this.commentResult.success) {
            this.commentResults = this.commentResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    createNewComment () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = false
    },
    reloadComment () {
      this.isShowModal = false
      this.comment()
    }
  }
}
</script>
